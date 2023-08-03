import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfileCard from "../components/UserProfileCard";
import { getTweetById } from "../services/tweet.service";
import { Itweet } from "../types/tweet";
import ActionsTweet from "../components/ActionsTweet";
import { NewTweet } from "../components/NewTweet";
import ListTweets from "../components/ListTweets";
import { useAppSelector } from "../store/hooks";
import { isLogged as logged } from "../store/user/userSlice";
import HeaderTimeLine from "../components/HeaderTimeLine";
import { User } from "../types/user";


export default function StatusTweet () {

  const { username, idTweet } = useParams()
  const [tweet, setTweet] = useState<Itweet | null>(null)
  const [infoUser, setInfoUser] = useState<User | null>(null)


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
      <HeaderTimeLine title="Tweet" />
      <div className='flex justify-between mt-6 px-4'>
        {
          infoUser && <UserProfileCard user={infoUser} disabledSettings redirectProfile />
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
