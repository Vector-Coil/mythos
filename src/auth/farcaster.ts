// Placeholder Farcaster auth hook for the mini-app.
// In production, integrate Farcaster SDK / OAuth flow.

export async function authenticateWithFarcaster(): Promise<{id:string; name:string; token:string}> {
  // This is a stub for demo — real implementation will involve Farcaster flow
  return new Promise((resolve) => {
    setTimeout(()=> resolve({ id: 'farcaster_mock', name: 'Farcaster User', token: 'mock-token' }), 400)
  })
}
