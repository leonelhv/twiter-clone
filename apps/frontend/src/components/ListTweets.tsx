import { useEffect } from "react";
import Tweet from "./Tweet";
import { getListTweets } from "../services/tweet.service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addArrayTweetToList, selectArrayTweets } from "../store/tweet/tweetSlice";
import { Itweet } from "../types/tweet";
import { isLogged as logged } from "../store/user/userSlice";




export default function ListTweets () {

    const arrayTweets: Itweet[] = useAppSelector(selectArrayTweets)
    const isLogged = useAppSelector(logged)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('useEffect ListTweets')
        getListTweets().then((res) => {
            dispatch(addArrayTweetToList(res))
        }).catch((err) => {
            console.log(err)
        })
    }, [isLogged])

    return (
        <>
            {
                arrayTweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />)
            }
        </>
    )
}
