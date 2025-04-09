export function cosineSimilarity(arr1: string[], arr2: string[]): number {
  // Create a set of all unique words across both arrays
  const allWords = new Set([...arr1, ...arr2]);

  // Convert both arrays into vectors based on the set of unique words
  const vector1 = Array.from(allWords).map(word => arr1.includes(word) ? 1 : 0);
  const vector2 = Array.from(allWords).map(word => arr2.includes(word) ? 1 : 0);

  // Compute the cosine similarity formula
  const dotProduct = vector1.reduce((sum: number, val, i) => sum + (val * vector2[i]), 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum: number, val) => sum + (val * val), 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum: number, val) => sum + (val * val), 0));

  // If either magnitude is 0, return 0 similarity
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}
