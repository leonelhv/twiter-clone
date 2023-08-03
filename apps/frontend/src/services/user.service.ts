import apiClient from "../axios/apiClient";
import { User } from "../types/user";
import { Response } from "../types/response";

export function getInfoUser (username: string): Promise<User> {
  return apiClient.get<Response<User>>(`/user/${username}`).then((response) => response.data.result);
}