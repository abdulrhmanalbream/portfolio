import { useMemo } from 'react'
import {
  HERO_CONTENT,
  PROJECTS,
  METRICS,
  SKILL_CATEGORIES,
  TIMELINE_LOGS,
} from '../data'
import { useLanguage } from './LanguageContext'
import { UI } from './translations'
import { toArabicDigits } from './digits'
import {
  HERO_AR,
  PROJECTS_AR,
  METRICS_AR,
  SKILLS_AR,
  TIMELINE_AR,
} from './content.ar'

// Merges the English source data (data.ts — the single source of truth, also
// consumed untouched by the terminal) with the Arabic prose overlay. Only the
// fields present in the *_AR maps are overridden; everything else (ids, tech,
// status, numbers, readouts) stays English in both languages.
export function useContent() {
  const { lang } = useLanguage()

  return useMemo(() => {
    const ui = UI[lang] ?? UI.en

    if (lang !== 'ar') {
      return {
        HERO_CONTENT,
        PROJECTS,
        METRICS,
        SKILL_CATEGORIES,
        TIMELINE_LOGS,
        ui,
        n: (x) => x, // digit localizer — identity in English
      }
    }

    const conv = toArabicDigits

    return {
      HERO_CONTENT: {
        ...HERO_CONTENT,
        lines: HERO_AR.lines,
        cta: HERO_CONTENT.cta.map((c, i) => ({
          ...c,
          label: HERO_AR.cta[i] ?? c.label,
        })),
      },
      PROJECTS: PROJECTS.map((p) => ({
        ...p,
        category: PROJECTS_AR[p.id]?.category ?? p.category,
        description: conv(PROJECTS_AR[p.id]?.description ?? p.description),
        screenshots: p.screenshots?.map((s, i) => ({
          ...s,
          alt: PROJECTS_AR[p.id]?.screenshots?.[i] ?? s.alt,
        })),
      })),
      METRICS: METRICS.map((m) => ({
        ...m,
        code: METRICS_AR[m.id]?.code,
        label: METRICS_AR[m.id]?.label ?? m.label,
        value: conv(m.value),
        subValue: conv(METRICS_AR[m.id]?.subValue ?? m.subValue),
        readouts: (METRICS_AR[m.id]?.readouts ?? m.readouts).map((r) => ({
          ...r,
          value: conv(r.value),
        })),
      })),
      SKILL_CATEGORIES: SKILL_CATEGORIES.map((c) => ({
        ...c,
        categoryName: SKILLS_AR[c.id]?.categoryName ?? c.categoryName,
        skills: c.skills.map((s) => ({
          ...s,
          name: SKILLS_AR[c.id]?.skills?.[s.name] ?? s.name,
        })),
      })),
      TIMELINE_LOGS: TIMELINE_LOGS.map((l) => ({
        ...l,
        category: TIMELINE_AR[l.id]?.category ?? l.category,
        event: TIMELINE_AR[l.id]?.event ?? l.event,
        details: conv(TIMELINE_AR[l.id]?.details ?? l.details),
        timestamp: conv(l.timestamp),
      })),
      ui,
      n: conv,
    }
  }, [lang])
}
