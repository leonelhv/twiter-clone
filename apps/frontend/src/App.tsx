import logo from './assets/logo.svg';

function App () {


    return (
        <div className='bg-black min-h-screen'>
            <div className='container mx-auto'>
                <div className='flex justify-between'>
                    <div className='border w-3/12 p-4'>
                        <img src={logo} className='w-10 h-10' alt="" />
                    </div>
                    <div className='border w-1/2 p-4'>
                        <h2 className='text-white text-2xl font-bold'>Home</h2>
                        <div className='mt-12 flex w-full'>
                            <div className=''>
                                <img src="https://i.pravatar.cc/80" className='rounded-full w-[66px]' alt="" />
                            </div>
                            <div className='flex flex-col gap-3 w-[calc(100%-66px)] ml-4'>
                                <span contentEditable="true" className='text-white block border-b outline-none pb-1'></span>
                                <button className='bg-violet-900 text-white px-3 py-2 rounded-xl self-end'>Tweet</button>
                            </div>
                        </div>
                    </div>
                    <div className='border w-3/12 p-4'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
