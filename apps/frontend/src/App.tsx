import { useState } from 'react';
import logo from './assets/logo.svg';
import Modal from './components/Modal';
import { NewTweet } from './components/NewTweet';
import Tweet from './components/Tweet';

function App () {

    const [isModalOpen, setIsModalOpen] = useState(false)


    return (
        <>
            <div className='bg-black min-h-screen'>
                <div className='container mx-auto'>
                    <div className=''>
                        <div className='flex justify-between h-full'>
                            <div className=' w-3/12 p-4'>
                                <img src={logo} className='w-10 h-10' alt="" />
                            </div>
                            <div className=' w-1/2 p-4'>
                                <h2 className='text-white text-2xl font-bold mb-12'>Home</h2>
                                <NewTweet />
                                <div className='my-12'>
                                    <Tweet />
                                </div>
                            </div>
                            <div className=' w-3/12 p-4'>

                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='container mx-auto h-full flex flex-col justify-center'>
                            <div className='flex justify-between'>
                                <div className=' w-3/12 p-4 flex gap-2'>

                                    <div className='w-12 h-12 bg-violet-900 rounded-full'></div>
                                    <div className='flex flex-col'>
                                        <span className='text-white font-bold'>John Doe</span>
                                        <span className='text-gray-400'>@johndoe</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='text-white bg-violet-900 fixed z-0 bottom-0 w-full'>
                    <div className='flex justify-between container mx-auto p-6 py-4'>
                        <div>
                            <p className='text-2xl'>Don’t miss what’s happening</p>
                            <p className='text-gray-400'>People on Twitter are the first to know.</p>
                        </div>
                        <div className='flex items-center'>
                            <button className='border border-white px-3 py-2 rounded-2xl hover:bg-white hover:text-black' onClick={() => setIsModalOpen(true)}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        </>
    )
}

export default App
