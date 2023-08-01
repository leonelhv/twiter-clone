import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { isLogged as logged, selectUser, syncUser } from '../store/user/userSlice';
import { useEffect } from "react";
import UserProfileCard from "../components/UserProfileCard";
import logo from '../assets/logo.svg';
import { NewTweet } from "../components/NewTweet";
import ListTweets from "../components/ListTweets";
import AuthBanner from "../components/AuthBanner";

export default function MainLayout () {

  const isLogged = useAppSelector(logged)
  const user = useAppSelector(selectUser)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(syncUser())
  }, [isLogged])

  return (
    <>


      <div className='bg-black'>
        <div className='flex justify-between min-h-screen container mx-auto'>
          <div className='w-3/12 p-4 flex flex-col'>
            <img src={logo} className='w-10 h-10' alt="" />
            <div className='flex-1'></div>
            {
              isLogged && <UserProfileCard user={user!} />
            }
          </div>
          <div className='w-1/2 py-4 max-h-screen overflow-y-scroll scrollbar-hide border-x-[0.3px] border-gray-200/20'>
            <Outlet />
          </div>
          <div className=' w-3/12 p-4'>

          </div>
        </div>
      </div>

      {
        !isLogged && <AuthBanner />
      }

    </>
  )
}
