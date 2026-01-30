export type Weights = Record<string, number>

export function applyWeights(acc: Record<string, number>, weights: Weights) {
  for (const [k, v] of Object.entries(weights)) {
    acc[k] = (acc[k] ?? 0) + v
  }
}

export function calculateScores(answers: Array<{questionId: string; selectedId: string; weights: Weights}>){
  const scores: Record<string, number> = {}
  for (const a of answers) {
    applyWeights(scores, a.weights)
  }
  return scores
}

// Map primary traits to simple primary values for the prototype
export function determinePrimaries(scores: Record<string, number>){
  const originKeys = Object.keys(scores).filter(k => k.startsWith('origin_'))
  const archeKeys = Object.keys(scores).filter(k => k.startsWith('archetype_'))
  const affinityKeys = Object.keys(scores).filter(k => k.startsWith('affinity_'))
  const teleosKeys = Object.keys(scores).filter(k => k.startsWith('teleos_'))

  const pickMax = (keys: string[]) => keys.length ? keys.reduce((a,b)=> scores[a] >= scores[b] ? a : b) : null

  return {
    primary_origin: pickMax(originKeys),
    primary_archetype: pickMax(archeKeys),
    primary_affinity: pickMax(affinityKeys),
    primary_teleos: pickMax(teleosKeys),
    scores
  }
}
