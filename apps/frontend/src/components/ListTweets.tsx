import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import apiClient from "../axios/apiClient";
import { AxiosResponse } from "axios";
import { Itweet } from "../types/tweet";


interface Response {
  success: boolean;
  status: number;
  result: Itweet[];
}


export default function ListTweets () {

  const [tweets, setTweets] = useState<Itweet[]>([])


  useEffect(() => {
    apiClient.get('/tweets').then((res: AxiosResponse<Response>) => {
      const { result } = res.data
      setTweets(result)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      {
        tweets.map(data => <Tweet key={data._id} data={data} />)
      }
    </>
  )
}
