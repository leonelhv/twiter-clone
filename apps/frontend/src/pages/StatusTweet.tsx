import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfileCard from "../components/UserProfileCard";
import { useNavigate } from 'react-router-dom';
import { getTweetById } from "../services/tweet.service";
import { Itweet, User } from "../types/tweet";
import ActionsTweet from "../components/ActionsTweet";
import { NewTweet } from "../components/NewTweet";
import ListTweets from "../components/ListTweets";
import { useAppSelector } from "../store/hooks";
import { isLogged as logged } from "../store/user/userSlice";


export default function StatusTweet () {

  const { username, idTweet } = useParams()
  const [tweet, setTweet] = useState<Itweet | null>(null)
  const [infoUser, setInfoUser] = useState<User | null>(null)
  const navigate = useNavigate();

  const isLogged = useAppSelector(logged)

  useEffect(() => {

    getTweetById(idTweet!).then(res => {
      if (username !== res.userId.username) {
        const newUrl = `/${res.userId.username}/status/${idTweet!}`
        window.history.pushState({}, "", newUrl);
      }
      setTweet(res)
      setInfoUser(res.userId)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="text-white">
      <div className=" flex gap-8 items-center px-4">
        <svg onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l14 0"></path>
          <path d="M5 12l6 6"></path>
          <path d="M5 12l6 -6"></path>
        </svg>
        <h1 className="font-extrabold text-xl">Tweet</h1>

      </div>
      <div className='flex justify-between mt-6 px-4'>
        {
          infoUser && <UserProfileCard user={infoUser} disabledSettings />
        }
      </div>
      <div className="mt-6 pb-4 break-words px-4">
        {
          tweet && tweet.content
        }
      </div>
      <div className="py-1 border-y-[0.3px] px-4">
        {tweet && <ActionsTweet infoTweet={tweet} />}
      </div>
      {
        isLogged && <div className="px-4">
          <NewTweet user={infoUser!} reply />
        </div>
      }
      <div className="">
        <ListTweets tweetId={idTweet} />
      </div>
    </div>
  )
}
