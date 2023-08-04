import apiClient from "../axios/apiClient";
import { User } from "../types/user";
import { Response } from "../types/response";
import { Itweet } from "../types/tweet";

interface GetInfoResponse {
  user: User;
  tweets: Itweet[];
}

export async function getInfoUser (username: string): Promise<GetInfoResponse> {
  return apiClient.get<Response<GetInfoResponse>>(`/user/${username}`).then((response) => response.data.result);
}

export async function getRepliesUser (username: string): Promise<Itweet[]> {
  return apiClient.get<Response<Itweet[]>>(`/user/${username}/replies`).then((response) => response.data.result);
}

export async function getLikesUser (username: string): Promise<Itweet[]> {
  return apiClient.get<Response<Itweet[]>>(`/user/${username}/likes`).then((response) => response.data.result);
}