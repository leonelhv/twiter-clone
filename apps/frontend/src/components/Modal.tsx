import { useState } from "react";
import FormSignUp from "./FormSignUp";
import FormSignIn from "./FormSignIn";


interface ModalProps {
    setIsModalOpen: (value: boolean) => void
}

export default function Modal ({ setIsModalOpen }: ModalProps) {

    const [isLogin, setIsLogin] = useState(false)


    return (

        <div className='fixed inset-0 bg-black bg-opacity-50 z-10 grid place-content-center' onClick={() => setIsModalOpen(false)}>

            <div className="bg-white py-6 px-12 rounded-lg" onClick={(e) => e.stopPropagation()}>
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
