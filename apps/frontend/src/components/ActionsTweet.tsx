import { useState } from "react"
import { Itweet } from "../types/tweet"
import { likeToTweet } from "../services/tweet.service"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectArrayTweets, updateArrayTweetToList } from "../store/tweet/tweetSlice"
import { isLogged as logged } from "../store/user/userSlice"

interface Props {
  infoTweet: Itweet
}

export default function ActionsTweet ({ infoTweet }: Props) {

  const [likes, setLikes] = useState<number>(infoTweet.likes)
  const [isLiked, setIsLiked] = useState<boolean>(infoTweet.liked)


  const dispatch = useAppDispatch()
  const isLogged = useAppSelector(logged)
  const tweetsStore = useAppSelector(selectArrayTweets)

  const onLikeToTweet = () => {
    likeToTweet(infoTweet._id).then(res => {
      setLikes(res.likes)
      setIsLiked(res.liked)

      if (tweetsStore.find(tweet => tweet._id === infoTweet._id)) {
        const newTweets = tweetsStore.map(tweet => {
          if (tweet._id === infoTweet._id) {
            return {
              ...tweet,
              likes: res.likes,
              liked: res.liked
            }
          }
          return tweet
        })
        dispatch(updateArrayTweetToList(newTweets))
      }

    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <div className='flex justify-between text-white text-base'>

      <span className=" hover:bg-[#0d0f8c1a] hover:text-[#6398f1] w-10 h-10 flex items-center justify-center rounded-full">
        <i className="fa-regular fa-comment"></i>
      </span>
      <div className="flex  items-center justify-center group" onClick={e => e.preventDefault()}>
        <span className={`w-10 h-10 flex items-center justify-center rounded-full ${isLiked && isLogged ? 'bg-[#a309241a] text-[#f54866]' : 'hover:bg-[#a309241a] group-hover:text-[#f54866]'}`} onClick={onLikeToTweet}>
          <i className="fa-regular fa-heart" ></i>
        </span>
        <span className={`text-xs ${isLiked && isLogged ? 'text-[#f54866]' : ' group-hover:text-[#f54866] text-gray-400 '}`} >{likes}</span>
      </div>
      <span className=" hover:bg-[#1b9e4b1a] hover:text-[#4ae081] w-10 h-10 flex items-center justify-center rounded-full" onClick={e => e.preventDefault()}>
        <i className="fa-solid fa-retweet"></i>
      </span>
    </div>
  )
}
