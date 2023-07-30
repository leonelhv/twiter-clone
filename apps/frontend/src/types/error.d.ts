export interface Error {
  success: boolean,
  status: number,
  errors?: { [key: string]: string };
}