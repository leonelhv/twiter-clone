import { useState } from "react";

import { imageStatic } from "../utils/imageStatic";
import { useAppDispatch } from "../store/hooks";
import { logout } from '../store/user/userSlice';
import Cookies from "universal-cookie";
import { User } from "../types/tweet";
import { UserState } from "../types/user";

interface Props {
    user: User | UserState,
    disabledSettings?: boolean
}

export default function UserProfileCard ({ user, disabledSettings = false }: Props) {

    const [settings, setSettings] = useState(false)
    const cookies = new Cookies()
    const dispatch = useAppDispatch()
    const toogleSettings = () => {
        if (disabledSettings) return
        setSettings(!settings)
    }

    const logoutUser = () => {
        localStorage.removeItem('user')
        cookies.remove('token')
        dispatch(logout())
        toogleSettings()
    }

    return (
        <div className='container mx-auto flex flex-col justify-center relative'>
            <div className='flex justify-between cursor-pointer' onClick={toogleSettings}>
                <div className='flex gap-2'>
                    <div className='w-12 h-12 rounded-full'>
                        {
                            user && <img src={imageStatic(user.photo)} alt="" />
                        }
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-white font-bold'>{user.name}</span>
                        <span className='text-gray-400'>@{user.username}</span>
                    </div>
                </div>
            </div>
            {
                settings && <div className="absolute -top-[130%] text-white border border-white rounded-xl w-full p-4 h-full flex flex-col justify-center items-start">
                    <button className="text-lg font-bold w-full" onClick={logoutUser}>Logout</button>
                </div>
            }
        </div>
    )
}
