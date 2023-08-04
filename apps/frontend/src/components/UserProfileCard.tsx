import { useState } from "react";
import { imageStatic } from "../utils/imageStatic";
import { useAppDispatch } from "../store/hooks";
import { logout } from '../store/user/userSlice';
import { removeCookieByString } from "../utils/helpersCookies";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";

interface Props {
  user: User,
  disabledSettings?: boolean
  redirectProfile?: boolean
}

export default function UserProfileCard ({ user, disabledSettings = false, redirectProfile = false }: Props) {

  const [settings, setSettings] = useState(false)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const toogleSettings = () => {
    if (disabledSettings) return
    setSettings(!settings)
  }

  const logoutUser = () => {
    removeCookieByString('user')
    removeCookieByString('token')
    dispatch(logout())
    toogleSettings()
  }

  const goToProfile = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    if (!redirectProfile) return
    navigate(`/${user.username}`)
  }


  return (
    <div className='container mx-auto flex flex-col justify-center relative cursor-default'>
      <div className='flex justify-between' onClick={toogleSettings}>
        <div className='block cursor-pointer' onClick={goToProfile}>
          <div className="flex gap-2">
            <div className='w-12 h-12 rounded-full overflow-hidden'>
              {
                user && <img src={imageStatic(user.photo)} alt="" />
              }
            </div>
            <div className='flex flex-col'>
              <span className={`text-white font-bold ${disabledSettings ? 'hover:underline' : ''}`}>{user.name} {user.lastname}</span>
              <span className='text-gray-400'>@{user.username}</span>
            </div>
          </div>
        </div>
      </div>
      {
        settings && <div className="absolute -top-[130%] bg-black text-white border border-white rounded-xl w-full p-4 h-full flex flex-col justify-center items-start">
          <button className="text-lg font-bold w-full" onClick={logoutUser}>Logout</button>
        </div>
      }
    </div>
  )
}
