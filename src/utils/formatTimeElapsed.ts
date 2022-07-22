export const formatTimeElapsed = (seconds: number) => {
  if (!seconds) {
    return ''
  }

  const minutes = Math.floor(seconds / 60)
  seconds -= (minutes * 60)

  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds
  const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${formatedMinutes}:${formatedSeconds}`
}