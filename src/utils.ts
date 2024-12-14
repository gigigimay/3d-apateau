export const getBeatDuration = (bpm: number) => {
  const beatsPerSecond = bpm / 60 // Beats per second
  const beatDuration = 1 / beatsPerSecond // Duration of each beat in seconds
  return beatDuration
}

export const getNthBeat = (
  elapsedTime: number,
  bpm: number,
  beatsPerBar = 4
) => {
  const beatDuration = getBeatDuration(bpm)

  // Calculate the total number of beats since the start
  const totalBeats = Math.floor(elapsedTime / beatDuration)

  // Calculate the nth beat within the current bar (1-indexed)
  const nthBeat = (totalBeats % beatsPerBar) + 1

  return nthBeat
}

export const getNthBar = (
  elapsedTime: number,
  bpm: number,
  beatsPerBar = 4
) => {
  const beatDuration = 60 / bpm // Duration of one beat in seconds
  const barDuration = beatDuration * beatsPerBar // Duration of one bar in seconds

  // Calculate the nth bar (1-indexed)
  return Math.floor(elapsedTime / barDuration) + 1
}

export const getBouncingValue = (
  elapsedTime: number,
  BPM: number,
  pauseFraction: number = 0.2
): number => {
  const beatDuration = 60 / BPM // Duration of one beat in seconds
  const bounceDuration = beatDuration * (1 - pauseFraction) // Effective bounce duration

  // Time within the current beat
  const timeInBeat = elapsedTime % beatDuration

  // Check if the time is within the pause phase
  if (timeInBeat >= bounceDuration) {
    return 0 // Pause phase, y = 0
  }

  // Fraction of the way through the bounce
  const fractionOfBounce = timeInBeat / bounceDuration

  // Calculate y using a sine squared function
  return Math.sin(Math.PI * fractionOfBounce) ** 2
}

export const blendModes = [
  'mix-blend-normal',
  'mix-blend-multiply',
  'mix-blend-screen',
  'mix-blend-overlay',
  'mix-blend-darken',
  'mix-blend-lighten',
  'mix-blend-color-dodge',
  'mix-blend-color-burn',
  'mix-blend-hard-light',
  'mix-blend-soft-light',
  'mix-blend-difference',
  'mix-blend-exclusion',
  'mix-blend-hue',
  'mix-blend-saturation',
  'mix-blend-color',
  'mix-blend-luminosity',
  'mix-blend-plus-darker',
  'mix-blend-plus-lighter',
]
