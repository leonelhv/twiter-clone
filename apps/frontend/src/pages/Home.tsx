import logo from '../assets/logo.svg';
import { NewTweet } from '../components/NewTweet';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { isLogged as logged, selectUser, syncUser } from '../store/user/userSlice';

import AuthBanner from '../components/AuthBanner';
import UserProfileCard from '../components/UserProfileCard';
import ListTweets from '../components/ListTweets';
import { useEffect } from 'react';



export default function Home () {


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
            <div className='px-4'>
              <h2 className='text-white text-2xl font-bold mb-12'>Home</h2>
            </div>
            <div className='my-12 '>
              {isLogged && <NewTweet user={user!} />}
              <ListTweets />
            </div>
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
