

export default function Tweet () {
  return (
    <div className='flex w-full border-t-[.3px] p-4 border-gray-200/20'>
      <div className=''>
        <div className='w-12 h-12 bg-violet-900 rounded-full'></div>
      </div>
      <div className='flex flex-col gap-1 w-[calc(100%-66px)] ml-4'>

        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <span className='text-white font-bold'>John Doe</span>
            <span className='text-gray-400'>@johndoe</span>
          </div>
        </div>

        <span className='text-white block'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia delectus fuga iste dolores quibusdam veritatis enim tempora odio 😄 cum aliquam, omnis nisi quae placeat itaque nesciunt provident! Illo, odit incidunt. </span>

        <div className='flex justify-between text-white text-lg'>

          <span className=" hover:bg-[#0d0f8c1a] hover:text-[#6398f1] w-10 h-10 flex items-center justify-center rounded-full">
            <i className="fa-regular fa-comment"></i>
          </span>
          <span className=" hover:bg-[#a309241a] hover:text-[#f54866] w-10 h-10 flex items-center justify-center rounded-full">
            <i className="fa-regular fa-heart" ></i>
          </span>
          <span className=" hover:bg-[#1b9e4b1a] hover:text-[#4ae081] w-10 h-10 flex items-center justify-center rounded-full">
            <i className="fa-solid fa-retweet"></i>
          </span>
        </div>

      </div>
    </div>
  )
}
