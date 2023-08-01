import { NewTweet } from '../components/NewTweet';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { isLogged as logged, selectUser, syncUser } from '../store/user/userSlice';
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
        <div className='w-full h-full'>
            <div className='px-4'>
                <h2 className='text-white text-2xl font-bold mb-12'>Home</h2>
            </div>
            <div className='my-12 '>
                {isLogged && <NewTweet user={user!} />}
                <ListTweets />
            </div>
        </div>
    )
}
