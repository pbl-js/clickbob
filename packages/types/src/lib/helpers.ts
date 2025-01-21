export type Omit2<
  T,
  K extends keyof T | (string & object) | (number & object) | (symbol | object)
> = { [P in Exclude<keyof T, K>]: T[P] };
