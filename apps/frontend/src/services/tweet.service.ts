import { AxiosResponse } from "axios"
import apiClient from "../axios/apiClient"
import { Itweet } from "../types/tweet";
import { Response } from "../types/response";

export async function getListTweets (): Promise<Itweet[]> {
  return apiClient.get('/tweets').then((res: AxiosResponse<Response<Itweet[]>>) => {
    const { result } = res.data
    return result
  })
}