import { useRef, useState } from "react"


const text_default = "what is happening?"

export const NewTweet = () => {

    const [content, setContent] = useState(text_default)
    const spanRef = useRef<HTMLSpanElement>(null)


    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        const { key } = event;
        if (key !== 'Enter' && key !== 'Escape') {
            event.preventDefault();
            const newContent = content + key;
            setContent(newContent);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
        if (e.target.textContent === "") {
            setContent(text_default)
        }
    }

    const handleClick = () => {
        if (content === text_default) {
            setContent("")
        }
    }


    return (
        <div className='flex w-full'>
            <div className=''>
                <div className='w-12 h-12 bg-violet-900 rounded-full'></div>
            </div>
            <div className='flex flex-col gap-3 w-[calc(100%-66px)] ml-4'>


                <span ref={spanRef} contentEditable="true" suppressContentEditableWarning={true} className={` block outline-none pb-1 ${content !== text_default ? 'text-white' : 'text-gray-200/40'}`} onClick={handleClick} onKeyDown={handleKeyDown} onBlur={handleBlur}>{content}</span>


                <button className='bg-violet-900 text-white px-3 py-2 rounded-xl self-end disabled:opacity-50' disabled={true}>Tweet</button>
            </div>
        </div >
    )
}
