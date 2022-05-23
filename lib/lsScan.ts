export function *lsScan(length:number, canFollow: (i0: number, i1: number) => boolean) {
  const nextIndex = [];
  const lengths = [];
  while (nextIndex.length < length) {
    nextIndex.push(-1);
    lengths.push(0);
  }
  let overallBestLength = -1;
  let overallBestIndex = -1;
  for (let idx = length - 1; idx >= 0; idx--) {
    let bestLength = 0;
    let bestNextIndex = -1;
    for (let idx2 = idx + 1; idx2 < length - bestLength; idx2++) {
      const candidateLength = lengths[idx2];
      if (candidateLength <= bestLength) {
        continue;
      }
      if (!canFollow(idx, idx2)) {
        continue;
      }
      bestLength = candidateLength;
      bestNextIndex = idx2;
    }
    const totalLength = bestLength + 1;
    lengths[idx] = totalLength;
    if (totalLength > overallBestLength) {
      overallBestIndex = totalLength;
      overallBestIndex = idx;
    }
    nextIndex[idx] = bestNextIndex;
  }

  for (let index = overallBestIndex; index !== -1; index = nextIndex[index]) {
    yield index;
  }
}
