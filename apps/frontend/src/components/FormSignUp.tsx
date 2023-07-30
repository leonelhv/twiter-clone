import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "../axios/apiClient";
import { useState } from "react";
import { AxiosError } from "axios";
import { Error } from "../types/error";



type Inputs = {
  name: string
  lastname: string
  username: string
  email: string
  password: string
  confirm_password: string
  phone: string
};



const defaultValues = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: ""
}

type Props = {
  closeModal: () => void
}

export default function FormSignUp ({ closeModal }: Props) {


  const [msgError, setMsgError] = useState<string[]>([])


  const { register, watch, getValues, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    apiClient.post('/register', data).then(() => {
      reset(defaultValues)
      closeModal()
    }).catch((err) => {
      const error = err as AxiosError<Error>;
      if (error.response?.data.errors) {
        const errorArray = Object.values(error.response?.data.errors)
        setMsgError(errorArray)
      }
    })
  }


  return (
    <div className="container">
      <form className="text-black w-full" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
        <div className="flex flex-col items-center mb-4">
          {msgError.map((er, index) => {
            return <span key={index} className="mb-2 text-sm text-red-700">{er}</span>
          })}

        </div>
        <div className="flex gap-4">
          <div className="mb-4">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              placeholder="Name"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors.name?.type === 'required' && <span className="text-sm text-red-700">First name is required</span>}
            {errors.name?.type === 'minLength' && <span className="text-sm text-red-700">First name is too short (min 3)</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              placeholder="Last name"
              {...register("lastname", { required: true, minLength: 3 })}
            />
            {errors.lastname?.type === 'required' && <span className="text-sm text-red-700">Last name is required</span>}
            {errors.lastname?.type === 'minLength' && <span className="text-sm text-red-700">Last name is too short (min 3)</span>}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            placeholder="Username"
            {...register("username", { required: true, minLength: 3 })}
          />
          {errors.username?.type === 'required' && <span className="text-sm text-red-700">Username is required</span>}
          {errors.username?.type === 'minLength' && <span className="text-sm text-red-700">Username is too short (min 3)</span>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email?.type === 'required' && <span className="text-sm text-red-700">Email is required</span>}
          {errors.email?.type === 'pattern' && <span className="text-sm text-red-700">Email is not valid</span>}

        </div>

        <div className="flex gap-4">
          <div className="mb-4">
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && <span className="text-sm text-red-700">Password is required</span>}
            {errors.password?.type === 'minLength' && <span className="text-sm text-red-700">Password is too short (min 6)</span>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded"
              placeholder="Confirm Password"
              {...register("confirm_password", {
                validate: (value) => {
                  return value === watch("password");
                }
              })}
            />
            {watch("confirm_password") !== watch("password") &&
              getValues("confirm_password") ? (
              <span className="text-sm text-red-700">password not match</span>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="tel"
            className="block border border-grey-light w-full p-3 rounded"
            placeholder="Phone"
            {...register("phone", { required: true, minLength: 9, maxLength: 9, pattern: /^[0-9]*$/i })}
          />
          {errors.phone?.type === 'required' && <span className="text-sm text-red-700">Phone is required</span>}
          {errors.phone?.type === 'pattern' && <span className="text-sm text-red-700">Phone is not valid</span>}
          {errors.phone?.type === 'minLength' && <span className="text-sm text-red-700">Phone is too short (min 9)</span>}
          {errors.phone?.type === 'maxLength' && <span className="text-sm text-red-700">Phone is too long (max 9)</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-violet-900 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1 disabled:opacity-50"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
