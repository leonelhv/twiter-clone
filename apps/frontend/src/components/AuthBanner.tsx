import { useState } from "react"
import Modal from "./Modal"
import FormSignUp from "./FormSignUp"
import FormSignIn from "./FormSignIn"

const forms = {
  signup: "FormSignUp",
  signin: "FormSignIn"
}

function AuthBanner () {


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nameForm, setNameForm] = useState('')


  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = (nameForm: string) => {
    setIsModalOpen(true)
    setNameForm(nameForm)
  }
  return (
    <>
      <div className='text-white bg-violet-900 fixed z-0 bottom-0 w-full'>
        <div className='flex justify-between container mx-auto p-6 py-4'>
          <div>
            <p className='text-2xl'>Don’t miss what’s happening</p>
            <p className='text-gray-400'>People on Twitter are the first to know.</p>
          </div>
          <div className='flex items-center gap-4'>
            <button className='border border-white px-3 py-2 rounded-2xl hover:bg-white hover:text-black' onClick={() => openModal(forms.signup)}>Sign Up</button>
            <button className='border bg-white text-black border-white px-3 py-2 rounded-2xl' onClick={() => openModal(forms.signin)}>Sign In</button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal}>
        {nameForm === forms.signup && <FormSignUp closeModal={closeModal} />}
        {nameForm === forms.signin && <FormSignIn closeModal={closeModal} />}
      </Modal>}
    </>
  )
}

export default AuthBanner