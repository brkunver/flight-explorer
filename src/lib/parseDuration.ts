export default function parseDuration(durationString: string): number | null {
  if (!durationString.trim()) {
    return null
  }

  // Saat ve dakika bilgilerini ayıklama
  const match = durationString.match(/(\d+)h\s*(\d+)?m?/)

  if (!match) {
    return null
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0
  const minutes = match[2] ? parseInt(match[2], 10) : 0

  const totalMinutes = hours * 60 + minutes

  return totalMinutes
}
