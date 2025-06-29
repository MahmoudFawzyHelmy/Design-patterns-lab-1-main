interface SequenceResult<T> {
  value: T;
  completed: boolean;
}

interface NumberSequence {
  next(): SequenceResult<number>;
}

export function createNumberSequence(
  startValue: number,
  endValue: number,
  increment: number = 1
): NumberSequence {
  let currentValue = startValue;

  return {
    next(): SequenceResult<number> {
      if ((increment > 0 && currentValue <= endValue) || (increment < 0 && currentValue >= endValue)) {
        const result = { value: currentValue, completed: false };
        currentValue += increment;
        return result;
      } else {
        return { value: NaN, completed: true };
      }
    },
  };
}

console.log("sequence generator");

const ascendingSequence = createNumberSequence(1, 10, 2);
let sequenceResult = ascendingSequence.next();
while (!sequenceResult.completed) {
  console.log(sequenceResult.value); // 1, 3, 5, 7, 9
  sequenceResult = ascendingSequence.next();
}

console.log("_________________");
const descendingSequence = createNumberSequence(10, 0, -3);
sequenceResult = descendingSequence.next();
while (!sequenceResult.completed) {
  console.log(sequenceResult.value); // 10, 7, 4, 1
  sequenceResult = descendingSequence.next();
}
console.log("_________________");
