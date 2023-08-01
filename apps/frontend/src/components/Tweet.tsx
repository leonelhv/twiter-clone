import { useState } from "react"
import apiClient from "../axios/apiClient"
import { Itweet } from "../types/tweet"
import { imageStatic } from "../utils/imageStatic"
import { Response } from "../types/response"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
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
    data: Itweet
}

export default function Tweet ({ data }: Props) {

    const [likes, setLikes] = useState<number>(data.likes)
    const [isLiked, setIsLiked] = useState<boolean>(data.liked!)

    const likeToTweet = () => {
        apiClient.post<Response<Itweet>>(`/like-to-tweet`, { idTweet: data._id }).then(res => {
            setLikes(res.data.result.likes)
            setIsLiked(res.data.result.liked!)
        }).catch(err => {
            console.log(err)
        })
    }

    const time = dayjs(data.createdAt).fromNow()

    return (
        <div className='flex w-full border-t-[.3px] p-4 border-gray-200/20 cursor-pointer'>
            <div className='w-12 h-12 rounded-full'>
                <img src={imageStatic(data.userId.photo)} alt="" />
            </div>
            <div className='flex flex-col gap-1 w-[calc(100%-66px)] ml-4'>

                <div className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <span className='text-white font-bold'>{data.userId.name}</span>
                        <span className='text-gray-400'>@{data.userId.username}</span>
                        <span className='text-gray-400 ml-2 text-[14px]'>{time}</span>
                    </div>
                </div>

                <span className='text-white block break-words'>{data.content}</span>

                <div className='flex justify-between text-white text-base'>

                    <span className=" hover:bg-[#0d0f8c1a] hover:text-[#6398f1] w-10 h-10 flex items-center justify-center rounded-full">
                        <i className="fa-regular fa-comment"></i>
                    </span>
                    <div className="flex  items-center justify-center group">
                        <span className={`w-10 h-10 flex items-center justify-center rounded-full ${isLiked ? 'bg-[#a309241a] text-[#f54866]' : 'hover:bg-[#a309241a] group-hover:text-[#f54866]'}`} onClick={likeToTweet}>
                            <i className="fa-regular fa-heart" ></i>
                        </span>
                        <span className={`text-xs ${isLiked ? 'text-[#f54866]' : ' group-hover:text-[#f54866] text-gray-400 '}`}>{likes}</span>
                    </div>
                    <span className=" hover:bg-[#1b9e4b1a] hover:text-[#4ae081] w-10 h-10 flex items-center justify-center rounded-full">
                        <i className="fa-solid fa-retweet"></i>
                    </span>
                </div>

            </div>
        </div>
    )
}
