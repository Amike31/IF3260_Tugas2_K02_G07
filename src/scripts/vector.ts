const calcVector = (a: number[], b: number[]) => {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
};

const crossProductVector = (a: number[], b: number[]) => {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
};

const normalize = (a: number[]) => {
  const length = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);

  // handle if length is about 0
  if (length < 0.00001) {
    return [0, 0, 0];
  }

  return [a[0] / length, a[1] / length, a[2] / length];
};
