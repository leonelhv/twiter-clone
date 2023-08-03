interface Props {
  closeModal: () => void
  children?: React.ReactNode
}

export default function Modal ({ closeModal, children }: Props) {


  return (

    <div className='fixed inset-0 bg-black bg-opacity-50 z-10 grid place-content-center'>
      <div className="bg-white w-auto m-auto py-6 px-12 rounded-lg overflow-y-auto">
        <span onClick={closeModal}>
          <i className="fa-solid fa-xmark text-black text-2xl cursor-pointer hover:scale-105"></i>
        </span>
        {children}
      </div>
    </div>

  )
}
