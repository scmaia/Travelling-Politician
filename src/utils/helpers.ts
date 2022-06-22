export const swap = (arr: number[], indexA: number, indexB: number) => {
  let temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

export const shuffle = (arr: number[], numOftimes: number) => {
  for (let i = 0; i < numOftimes; i++) {
    const indexA = Math.floor(Math.random() * arr.length);
    const indexB = indexA + 1 < arr.length ? indexA + 1 : indexA - 1;
    swap(arr, indexA, indexB);
  }
};

export const pickOne = (list: number[][], probability: number[]) => {
  let index = 0;
  let r = Math.random();
  while (r > 0) {
    r = r - probability[index];
    index++;
  }
  index--;
  return list[index].slice();
};
