import { UserState } from "../types/user";
import { imageStatic } from "../utils/imageStatic";

interface Props {
  user: UserState
}

export default function UserProfileCard ({ user }: Props) {
  return (
    <div className='container mx-auto flex flex-col justify-center'>
      <div className='flex justify-between'>
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
    </div>
  )
}
