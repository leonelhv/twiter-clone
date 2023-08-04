import { useEffect } from "react";
import Tweet from "./Tweet";
import { getListTweets } from "../services/tweet.service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addArrayTweetToList, selectArrayTweets } from "../store/tweet/tweetSlice";
import { Itweet } from "../types/tweet";
import { isLogged as logged } from "../store/user/userSlice";


interface Props {
  tweetId?: string
  arrTweets?: Itweet[]
}

export default function ListTweets ({ tweetId = "", arrTweets }: Props) {

  const arrayTweets: Itweet[] = useAppSelector(selectArrayTweets)
  const isLogged = useAppSelector(logged)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Array.isArray(arrTweets)) {
      dispatch(addArrayTweetToList(arrTweets))
      return
    } else {
      getListTweets(tweetId).then((res) => {
        dispatch(addArrayTweetToList(res))
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [isLogged, tweetId, arrTweets])

  return (
    <div className="flex flex-col gap-4 w-full">
      {
        arrayTweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)
      }
    </div>
  )
}
