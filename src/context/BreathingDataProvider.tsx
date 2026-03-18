import { useEffect, useState, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  BreathingDataContext,
  type Metrics,
  type Row
} from './BreathingDataContext';

export const BreathingDataProvider = ({ children }: { children: ReactNode }) => {
  const PAGE_SIZE = 5000;

  const [rawData, setRawData] = useState<Row[]>([]);
  const [cleanedData, setCleanedData] = useState<Array<{ t_min: number; [key: string]: number | null }>>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<Record<string, Metrics>>({});
  const [latestOnly, setLatestOnly] = useState(false);

  const isFetchingRef = useRef(false);
  const hasStateColumnRef = useRef(true);
  const latestDateColumnRef = useRef<string | null>('time');

  const fetchAllRows = useCallback(async (participantId?: string, withState = true) => {
    const ascending = participantId ? true : false;
    const allRows: Row[] = [];
    let from = 0;

    while (true) {
      const to = from + PAGE_SIZE - 1;
      const scope = participantId ? `participant=${participantId}` : 'all-participants';
      console.log(`[BreathingDataProvider] fetch batch (${scope}, withState=${withState}, range=${from}-${to})`);

      const query = participantId
        ? (withState
            ? supabase
                .from('breath_debug')
            .select('t_sec, norm, breath_state, participant_id')
                .eq('participant_id', participantId)
                .order('t_sec', { ascending })
                .range(from, to)
            : supabase
                .from('breath_debug')
                .select('t_sec, norm, participant_id')
                .eq('participant_id', participantId)
                .order('t_sec', { ascending })
                .range(from, to))
        : (withState
            ? supabase
                .from('breath_debug')
            .select('t_sec, norm, breath_state, participant_id')
                .order('t_sec', { ascending })
                .range(from, to)
            : supabase
                .from('breath_debug')
                .select('t_sec, norm, participant_id')
                .order('t_sec', { ascending })
                .range(from, to));

      const { data, error } = await query;

      if (error) {
        return { data: null, error };
      }

      const batch = ((data ?? []) as Array<Row & { breath_state?: string }>).map((row) => ({
        ...row,
        state: row.state ?? row.breath_state,
      }));
      allRows.push(...batch);

      if (batch.length < PAGE_SIZE) {
        break;
      }

      from += PAGE_SIZE;
    }

    return { data: allRows, error: null };
  }, [PAGE_SIZE]);

  const selectRows = useCallback(async (participantId?: string) => {
    const scope = participantId ? `participant=${participantId}` : 'all-participants';
    console.log(`[BreathingDataProvider] fetch rows start (${scope}, withState=${hasStateColumnRef.current})`);

    if (hasStateColumnRef.current) {
      const withState = await fetchAllRows(participantId, true);

      if (!withState.error) {
        console.log(`[BreathingDataProvider] fetch rows success (${scope}, withState=true, rows=${withState.data?.length ?? 0})`);
        return withState;
      }

      console.error(`[BreathingDataProvider] fetch rows error (${scope}, withState=true):`, withState.error);

      if (withState.error.message.toLowerCase().includes('state')) {
        // Remember schema capability and stop requesting `state` going forward.
        console.warn('[BreathingDataProvider] state column not available, switching to fetch without state');
        hasStateColumnRef.current = false;
      } else {
        return withState;
      }
    }

    const withoutState = await fetchAllRows(participantId, false);

    if (withoutState.error) {
      console.error(`[BreathingDataProvider] fetch rows error (${scope}, withState=false):`, withoutState.error);
    } else {
      console.log(`[BreathingDataProvider] fetch rows success (${scope}, withState=false, rows=${withoutState.data?.length ?? 0})`);
    }

    return withoutState;
  }, [fetchAllRows]);

  const resolveLatestParticipantId = useCallback(async () => {
    const dateCandidates = ['time', 'created_at', 'date', 'timestamp', 'inserted_at', 't_sec'];

    const tryColumn = async (col: string) => {
      switch (col) {
        case 'time':
          return supabase
            .from('breath_debug')
            .select('participant_id, time')
            .order('time', { ascending: false })
            .limit(1)
            .maybeSingle();
        case 'created_at':
          return supabase
            .from('breath_debug')
            .select('participant_id, created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
        case 'date':
          return supabase
            .from('breath_debug')
            .select('participant_id, date')
            .order('date', { ascending: false })
            .limit(1)
            .maybeSingle();
        case 'timestamp':
          return supabase
            .from('breath_debug')
            .select('participant_id, timestamp')
            .order('timestamp', { ascending: false })
            .limit(1)
            .maybeSingle();
        case 'inserted_at':
          return supabase
            .from('breath_debug')
            .select('participant_id, inserted_at')
            .order('inserted_at', { ascending: false })
            .limit(1)
            .maybeSingle();
        case 't_sec':
          return supabase
            .from('breath_debug')
            .select('participant_id, t_sec')
            .order('t_sec', { ascending: false })
            .limit(1)
            .maybeSingle();
        default:
          return {
            data: null,
            error: { message: `Unsupported column: ${col}` },
          };
      }
    };

    if (latestDateColumnRef.current) {
      const col = latestDateColumnRef.current;
      const { data, error } = await tryColumn(col);

      if (!error) {
        return data?.participant_id ?? null;
      }

      if (error.message.toLowerCase().includes(col.toLowerCase())) {
        latestDateColumnRef.current = null;
      } else {
        console.error('[BreathingDataProvider] failed to resolve latest participant:', error);
        return null;
      }
    }

    for (const col of dateCandidates) {
      const { data, error } = await tryColumn(col);

      if (!error) {
        latestDateColumnRef.current = col;
        console.log(`[BreathingDataProvider] latest participant resolved using '${col}'`);
        return data?.participant_id ?? null;
      }
    }

    console.error('[BreathingDataProvider] could not resolve latest participant: no usable date/timestamp column found');
    return null;
  }, []);

  function computeMetrics(rows: Row[]): Metrics {
    const normalizeState = (state?: string) => {
      const value = state?.trim().toLowerCase() ?? '';
      if (value.includes('inhale') || value.includes('inhal') || value === 'in') return 'inhale';
      if (value.includes('exhale') || value.includes('exhal') || value === 'out') return 'exhale';
      return value;
    };

    let enInhalacion = false;
    let inicio = 0;
    let maxDepth = 0;

    let breaths = 0;
    const depths: number[] = [];
    let inhaleStarts = 0;
    let lastInhaleStart = -Infinity;
    let inhaleLabelCount = 0;
    let exhaleLabelCount = 0;

    for (const r of rows) {
      const estado = normalizeState(r.state);

      if (estado === 'inhale') {
        inhaleLabelCount++;
        if (!enInhalacion) {
          enInhalacion = true;
          inicio = r.t_sec;
          maxDepth = r.norm;

          // Fallback: count starts of inhale blocks when exhale transitions are absent.
          if (r.t_sec - lastInhaleStart >= 1.0) {
            inhaleStarts++;
            lastInhaleStart = r.t_sec;
          }
        } else {
          maxDepth = Math.max(maxDepth, r.norm);
        }
      }

      if (estado === 'exhale' && enInhalacion) {
        exhaleLabelCount++;
        const dur = r.t_sec - inicio;
        if (dur >= 1.0) {
          breaths++;
          depths.push(maxDepth);
        }
        enInhalacion = false;
      } else if (estado === 'exhale') {
        exhaleLabelCount++;
      }
    }

    if (breaths === 0 && inhaleStarts > 0) {
      breaths = inhaleStarts;
      if (depths.length === 0) {
        console.warn('[BreathingDataProvider] using inhale-start fallback for breaths', {
          inhaleLabelCount,
          exhaleLabelCount,
          inhaleStarts,
          rows: rows.length,
        });
      }
    }

    const bpm = breaths / 7;
    const compliance = Math.max(0, 100 - (Math.abs(breaths - 42) / 42) * 100);
    const meanDepth =
      depths.length > 0 ? depths.reduce((a, b) => a + b, 0) / depths.length : 0;

    return { breaths, bpm, compliance, meanDepth };
  }

  useEffect(() => {
    const updateData = async () => {
      if (isFetchingRef.current) {
        console.log('[BreathingDataProvider] fetch skipped (already in progress)');
        return;
      }

      console.log(`[BreathingDataProvider] updateData start (latestOnly=${latestOnly})`);
      isFetchingRef.current = true;

      try {
        let data: Row[] = [];

        if (latestOnly) {
          console.log('[BreathingDataProvider] fetch latest participant start');
          const latestParticipantId = await resolveLatestParticipantId();
          console.log('[BreathingDataProvider] fetch latest participant success:', latestParticipantId);

          if (!latestParticipantId) {
            console.log('[BreathingDataProvider] no latest participant found');
            setRawData([]);
            setCleanedData([]);
            setParticipants([]);
            setMetrics({});
            return;
          }

          const { data: latestData, error: latestDataError } = await selectRows(latestParticipantId);

          if (latestDataError) {
            console.error('Failed to fetch latest participant rows:', latestDataError);
            return;
          }

          data = latestData ?? [];
        } else {
          const { data: allData, error: allDataError } = await selectRows();

          if (allDataError) {
            console.error('Failed to fetch all participants rows:', allDataError);
            return;
          }

          data = (allData ?? []).sort((a, b) => a.t_sec - b.t_sec);
        }

        console.log(`[BreathingDataProvider] updateData success (rows=${data.length})`);

        setRawData(data);

        const uniqueParticipants = Array.from(
          new Set(data.map(d => d.participant_id).filter(Boolean))
        ).sort();

        setParticipants(uniqueParticipants);

        const byTime = new Map<number, { t_min: number; [key: string]: number | null }>();

        data.forEach((row) => {
          const tMin = Math.round((row.t_sec / 60) * 100) / 100;
          if (!byTime.has(tMin)) {
            byTime.set(tMin, { t_min: tMin });
          }

          const point = byTime.get(tMin);
          if (point) {
            point[`participant_${row.participant_id}`] = row.norm;
          }
        });

        const transformed = Array.from(byTime.values()).sort((a, b) => a.t_min - b.t_min);

        transformed.forEach((point) => {
          uniqueParticipants.forEach((pid) => {
            const key = `participant_${pid}`;
            if (!(key in point)) {
              point[key] = null;
            }
          });
        });

        setCleanedData(transformed);

        const grouped: Record<string, Row[]> = {};
        data.forEach(r => {
          if (!grouped[r.participant_id]) grouped[r.participant_id] = [];
          grouped[r.participant_id].push(r);
        });

        const computed: Record<string, Metrics> = {};
        Object.entries(grouped).forEach(([pid, rows]) => {
          computed[pid] = computeMetrics(rows);
        });

        setMetrics(computed);
      } finally {
        console.log('[BreathingDataProvider] updateData end');
        isFetchingRef.current = false;
      }
    };

    updateData();
    const interval = setInterval(updateData, 5000);

    return () => clearInterval(interval);
  }, [latestOnly, resolveLatestParticipantId, selectRows]);

  return (
    <BreathingDataContext.Provider
      value={{ rawData, cleanedData, participants, metrics, latestOnly, setLatestOnly }}
    >
      {children}
    </BreathingDataContext.Provider>
  );
};
