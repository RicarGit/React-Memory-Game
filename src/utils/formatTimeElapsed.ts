export const formatTimeElapsed = (time: number) => {
  let minutes = Math.floor(time / 60)
  time -= (minutes * 60)

  let formatedSeconds = `${time < 10 ? '0' + time : time}`
  let formatedMinutes = `${minutes < 10 ? '0' + minutes : minutes} `

  return `${formatedMinutes}:${formatedSeconds} `
}