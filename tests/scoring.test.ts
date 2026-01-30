import { describe, it, expect } from 'vitest'
import { calculateScores, determinePrimaries } from '../src/lib/scoring'

describe('scoring engine', () => {
  it('applies weights and selects primaries', () => {
    const answers = [
      { questionId: 'G_01_DAWN', selectedId: 'D', weights: { origin_void: 10, affinity_lunar: 3 } },
      { questionId: 'Q4_MASK', selectedId: 'C', weights: { affinity_lunar: 8 } },
      { questionId: 'Q14_LEGACY', selectedId: 'C', weights: { teleos_apotheosis: 10 } }
    ]

    const scores = calculateScores(answers)
    const prim = determinePrimaries(scores)

    expect(prim.primary_origin).toBe('origin_void')
    expect(prim.primary_affinity).toBe('affinity_lunar')
    expect(prim.primary_teleos).toBe('teleos_apotheosis')
  })
})
