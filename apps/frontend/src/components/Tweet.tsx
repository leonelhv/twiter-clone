import { Itweet } from "../types/tweet"
import { imageStatic } from "../utils/imageStatic"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Link } from "react-router-dom";
import ActionsTweet from "./ActionsTweet"

dayjs().format()
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "a minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years"
  }
})



interface Props {
  tweet: Itweet
}

export default function Tweet ({ tweet }: Props) {


  const time = dayjs(tweet.createdAt).fromNow()

  const goToTweet = () => {
    return `/${tweet.userId.username}/status/${tweet._id}`
  }

  return (
    <Link to={goToTweet()} className='pt-7 cursor-pointer border-t-[0.3px] border-gray-200/20'>
      <div className="flex w-full px-4">
        <div className='w-12 h-12 rounded-full'>
          <img src={imageStatic(tweet.userId.photo)} alt="" />
        </div>
        <div className='flex flex-col gap-1 w-[calc(100%-66px)] ml-4'>

          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              <span className='text-white font-bold'>{tweet.userId.name}</span>
              <span className='text-gray-400'>@{tweet.userId.username}</span>
              <span className='text-gray-400 ml-2 text-[14px]'>{time}</span>
            </div>
          </div>

          <span className='text-white block break-words whitespace-pre-line'>{tweet.content}</span>

          <ActionsTweet infoTweet={tweet} />

        </div>
      </div>
    </Link>
  )
}
