import { useEffect, useState } from "react";
import HeaderTimeLine from "../components/HeaderTimeLine";
import { getInfoUser } from "../services/user.service";
import { useParams } from "react-router-dom";
import { User } from "../types/user";
import { imageStatic } from "../utils/imageStatic";

export default function UserProfile () {

  const { username } = useParams();

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    console.log(username)
    username && getInfoUser(username).then((res) => {
      setUser(res)
    }).catch((err) => {
      console.log(err)
    })
  }, [username])


  return (
    <div className="text-white">
      {
        user && <>
          <HeaderTimeLine title={`${user.name} ${user.lastname}`} />
          <div className="h-52 bg-[#333639] w-full mt-2">
          </div>
          <div className="-mt-20 px-4">
            <div className="bg-black p-1 rounded-full w-32">
              <img src={imageStatic(user.photo)} alt={`Photo perfil by ${user.username}`} />
            </div>
          </div>

          <div className="flex flex-col px-4 mt-4">
            <span className="font-bold text-2xl">{user.name} {user.lastname}</span>
            <span className="text-gray-400">@{user.username}</span>
          </div>
        </>
      }
    </div>
  )
}
