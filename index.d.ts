type NumberArray = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
];
type Max = 20;
type Numbers = NumberArray[number];

type TrimZeroNumberArray = NumberArray extends [number, ...infer R] ? R : never;
type Increment<N extends Numbers> = TrimZeroNumberArray[N];

type EvenOddInner<N extends Numbers, T extends 'A' | 'B'> = N extends Max
  ? { A: N; B: never }[T]
  : { A: N; B: never }[T] | EvenOddInner<Increment<N>, { A: 'B'; B: 'A' }[T]>;

type Even = EvenOddInner<0, 'A'>;
type Odd = EvenOddInner<0, 'B'>;

export type Range<From extends Numbers, To extends Numbers> = From extends To
  ? From
  : From | Range<Increment<From>, To>;

type TakeInner<
  N extends Numbers,
  Limit extends Numbers,
  Cursor extends Numbers,
  Count extends Numbers,
> = Count extends Limit
  ? never
  : Cursor extends N
  ? Cursor | TakeInner<N, Limit, Increment<Cursor>, Increment<Count>>
  : TakeInner<N, Limit, Increment<Cursor>, Count>;

type Take<N extends Numbers, Limit extends Numbers> = TakeInner<N, Limit, 0, 0>;
