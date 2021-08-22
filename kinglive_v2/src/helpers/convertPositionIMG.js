export default function convertPositionIMG(position) {
  if (!position)
    return {
      '--x': '0%',
      '--y': '0%',
      '--zoom': '100%',
    }

  return {
    '--x': `-${position?.x}%`,
    '--y': `-${position?.y}%`,
    '--zoom': `${position?.zoom}%`,
  }
}
