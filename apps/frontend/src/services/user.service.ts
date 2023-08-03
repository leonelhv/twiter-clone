import apiClient from "../axios/apiClient";
import { User } from "../types/user";
import { Response } from "../types/response";
import { Itweet } from "../types/tweet";

interface GetInfoResponse {
  user: User;
  tweets: Itweet[];
}

export function getInfoUser (username: string): Promise<GetInfoResponse> {
  return apiClient.get<Response<GetInfoResponse>>(`/user/${username}`).then((response) => response.data.result);
}