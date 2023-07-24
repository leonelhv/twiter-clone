import { useRef, useState, useEffect } from "react";

const text_default = "what is happening?";

export const NewTweet = () => {
    const [content, setContent] = useState(text_default);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const newContent = event.currentTarget.value;
        setContent(newContent);
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (e.target.value === "") {
            setContent(text_default);
        }
    };

    const handleClick = () => {
        if (content === text_default) {
            setContent("");
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [content]);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = textareaRef.current.scrollHeight.toString() + "px";
        }
    };

    return (
        <div className="flex w-full">
            <div className="">
                <div className="w-12 h-12 bg-violet-900 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-3 w-[calc(100%-66px)] ml-4">
                <textarea
                    className="block outline-none pb-1 text-white bg-transparent resize-none h-auto"
                    placeholder={text_default}
                    onClick={handleClick}
                    onInput={handleInput}
                    onBlur={handleBlur}
                    value={content}
                    ref={textareaRef}
                />
                <button className="bg-violet-900 text-white px-3 py-2 rounded-xl self-end disabled:opacity-50" disabled={true}>
                    Tweet
                </button>
            </div>
        </div>
    );
};
