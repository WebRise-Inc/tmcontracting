const sampleProjectLocations = [
  "Gatineau, QC J8P 1C2",
  "Ottawa, ON K1V 2J6",
  "Saint-Lambert, QC J4R 2H5",
  "Orleans, ON K1C 7K3",
  "Kanata, ON K2K 1X7",
  "Chelsea, QC J9B 1A3",
  "Aylmer, QC J9H 5B1",
  "Barrhaven, ON K2J 4S3",
  "Hull, QC J8X 3Y7",
  "Nepean, ON K2G 5X1",
] as const

export function getSampleProjectLocation(index: number) {
  return sampleProjectLocations[index % sampleProjectLocations.length]
}
