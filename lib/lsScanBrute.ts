export function* lsScanBrute(length: number, canFollow: (i0: number, i1: number) => boolean,
                             start = 0, base = -1) {
  if (start === length) {
    return;
  }

  const skipSequence: number[] = [...lsScanBrute(length, canFollow, start + 1, base)];

  if (base === -1 || canFollow(base, start)) {
    const thisSequence: number[] = [...lsScanBrute(length, canFollow, start + 1, start)];

    if (thisSequence.length + 1 >= skipSequence.length) {
      yield start;
      yield* thisSequence;
      return;
    }
  }
  yield* skipSequence;
}
