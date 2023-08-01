import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfileCard from "../components/UserProfileCard";
import { useNavigate } from 'react-router-dom';
import { getTweetById } from "../services/tweet.service";
import { Itweet, User } from "../types/tweet";
import ActionsTweet from "../components/ActionsTweet";


export default function StatusTweet () {

    const { username, idTweet } = useParams()
    const [tweet, setTweet] = useState<Itweet | null>(null)
    const [infoUser, setInfoUser] = useState<User | null>(null)
    const navigate = useNavigate();


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
        <div className="px-4 text-white">
            <div className=" flex gap-8 items-center">
                <svg onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l14 0"></path>
                    <path d="M5 12l6 6"></path>
                    <path d="M5 12l6 -6"></path>
                </svg>
                <h1 className="font-extrabold text-xl">Tweet</h1>

            </div>
            <div className='flex justify-between mt-6'>
                {
                    infoUser && <UserProfileCard user={infoUser} />
                }
            </div>
            <div className="mt-6">
                {
                    tweet && tweet.content
                }
            </div>
            <div>
                {tweet && <ActionsTweet infoTweet={tweet} />}
            </div>
        </div>
    )
}
