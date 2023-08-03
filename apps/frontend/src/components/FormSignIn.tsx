import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "../axios/apiClient";
import { AxiosResponse } from "axios";
import { useState } from "react";


import { useAppDispatch } from "../store/hooks";
import { syncUser } from "../store/user/userSlice";
import { saveCookies } from "../utils/helpersCookies";
import { User } from "../types/user";

type Inputs = {
  email: string
  password: string
}

interface Response {
  success: boolean,
  status: number,
  result: User;
}

interface Props {
  closeModal: () => void
}

export default function FormSignIn ({ closeModal }: Props) {


  const { register, reset, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const [msgError, setMsgError] = useState<string>()

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    apiClient.post('/login', data).then((res: AxiosResponse<Response>) => {
      const { result } = res.data
      saveCookies('user', result)
      dispatch(syncUser())
      reset()
      closeModal()
    }).catch(() => {
      setMsgError("Credentials are not valid")
    })
  }


  return (
    <div className="container max-w-sm mx-auto">
      <form className=" text-black w-full" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-3xl text-center">Sign In</h1>
        {
          msgError && <p className="text-sm text-red-700 text-center mb-2">{msgError}</p>
        }
        <div>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email?.type === 'required' && <span className="text-sm text-red-700">Email is required</span>}
          {errors.email?.type === 'pattern' && <span className="text-sm text-red-700">Email is not valid</span>}
        </div>

        <div>
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === 'required' && <span className="text-sm text-red-700">Password is required</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-violet-900 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        >Login</button>

      </form>

    </div>
  )
}
