import { useEffect, useState } from "react";
import HeaderTimeLine from "../components/HeaderTimeLine";
import { getInfoUser, getLikesUser, getRepliesUser } from "../services/user.service";
import { useParams } from "react-router-dom";
import { User } from "../types/user";
import { imageStatic } from "../utils/imageStatic";
import { Itweet } from "../types/tweet";
import ListTweets from "../components/ListTweets";

export default function UserProfile () {

  const { username } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [tweets, setTweets] = useState<Itweet[]>([])

  const tabs = [
    { label: 'Tweets' },
    { label: 'Replies' },
    { label: 'Likes' },
  ];

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (activeTab === 0) {
      username && getInfoUser(username).then((res) => {
        setUser(res.user)
        setTweets(res.tweets)
      }).catch((err) => {
        console.log(err)
      })
    }
    if (activeTab === 1) {
      username && getRepliesUser(username).then((res) => {
        setTweets(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    if (activeTab === 2) {
      username && getLikesUser(username).then((res) => {
        setTweets(res)
      }).catch((err) => {
        console.log(err)
      })
    }

  }, [activeTab, user])

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="text-white">
      {
        user && <>
          <HeaderTimeLine title={`${user.name} ${user.lastname}`} />
          <div className="h-52 bg-[#333639] w-full mt-2">
          </div>
          <div className="-mt-20 px-4">
            <div className="bg-black rounded-full w-32 h-32 overflow-hidden border-2 border-black">
              <img src={imageStatic(user.photo)} alt={`Photo perfil by ${user.username}`} />
            </div>
          </div>

          <div className="flex flex-col px-4 mt-4">
            <span className="font-bold text-2xl">{user.name} {user.lastname}</span>
            <span className="text-gray-400">@{user.username}</span>
          </div>

          <div className="px-8 mt-6  border-b-[0.3px] border-gray-400/20">
            <ul className="flex justify-between w-full h-full font-bold text-lg">
              {tabs.map((tab, index) => (
                <li
                  key={index}
                  className={`pt-6 flex flex-col justify-between items-center group `}
                  onClick={() => handleClick(index)}
                >
                  <span className="pb-3 cursor-pointer">{tab.label}</span>
                  {activeTab === index && (
                    <div
                      className="w-[calc(100%+15px)] h-1 rounded-xl bg-violet-900"
                    ></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ListTweets arrTweets={tweets} />
          </div>
        </>
      }
    </div>
  )
}
