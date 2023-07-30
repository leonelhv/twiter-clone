export interface Response<T> {
  success: boolean;
  status: number;
  result: T;
}