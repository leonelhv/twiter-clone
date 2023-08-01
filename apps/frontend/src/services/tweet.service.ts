import { AxiosResponse } from "axios"
import apiClient from "../axios/apiClient"
import { Itweet } from "../types/tweet";
import { Response } from "../types/response";


interface IlikeToTweet{
    likes:number,
    liked:boolean
}

export async function getListTweets (): Promise<Itweet[]> {
  return apiClient.get('/tweets').then((res: AxiosResponse<Response<Itweet[]>>) => {
    const { result } = res.data
    return result
  })
}


export async function likeToTweet(id:string): Promise<IlikeToTweet>{
    return apiClient.post<Response<IlikeToTweet>>(`/like-to-tweet`, { idTweet:id }).then(res => {
        return res.data.result
    })
}


export async function getTweetById(idTweet:string):Promise<Itweet>{
    return apiClient.get<Response<Itweet>>(`/tweet/${idTweet}`).then(res => {
        return res.data.result
    })
}