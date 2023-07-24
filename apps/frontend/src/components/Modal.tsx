import { useState } from "react";

import FormSignUp from "./FormSignUp";
import FormSignIn from "./FormSignIn";

import IconClose from "../assets/close.svg";

interface Props {
    setIsModalOpen: (value: boolean) => void
}

export default function Modal ({ setIsModalOpen }: Props) {

    const [isLogin, setIsLogin] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }


    return (

        <div className='fixed inset-0 bg-black bg-opacity-50 z-10 grid place-content-center'>

            <div className="bg-white w-auto m-auto py-6 px-12 rounded-lg overflow-y-auto">
                <span onClick={closeModal}><img src={IconClose} className="w-8 hover:scale-105 transition-all" /></span>
                {
                    isLogin ? <FormSignIn /> : <FormSignUp />
                }
                <div className="text-grey-dark mt-6 text-center">
                    {isLogin ? 'Don’t have an account? ' : 'Already have an account?'}
                    <span className="no-underline border-b border-blue text-violet-900 ml-1 hover:cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </span>.
                </div>
            </div>
        </div>

    )
}
