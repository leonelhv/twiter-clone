import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "../axios/apiClient";
import { UserState } from "../types/user";
import { imageStatic } from "../utils/imageStatic";
import { useAppDispatch } from "../store/hooks";
import { addTweetToList } from "../store/tweet/tweetSlice";
import { Itweet } from "../types/tweet";
import { Response } from "../types/response";
import { AxiosResponse } from "axios";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const defaultValues = {
    content: "",
}

interface Props {
    user: UserState
}

const maxContentLength = 280

export const NewTweet = ({ user }: Props) => {
    const [content, setContent] = useState("");
    const [porcent, setPorcent] = useState(0);



    const { register, handleSubmit, formState: { isValid } } = useForm<{ content: string }>({
        mode: "onChange",
        defaultValues
    })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<{ content: string }> = (data) => {
        apiClient.post('/tweet', data).then((res: AxiosResponse<Response<Itweet>>) => {
            const resTweet = res.data.result
            dispatch(addTweetToList(resTweet))
            setContent("");
            refTextArea.current!.style.height = "auto";
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const progressBarColors = () => {

        let pathColor = 'rgb(29, 161, 242)'
        let textColor = 'white'

        if (porcent <= 80) {
            pathColor = `rgb(76,29,149)`
        } else if (porcent > 80 && porcent < 100) {
            pathColor = `rgb(255, 159, 64)`
        } else if (porcent >= 100) {
            pathColor = `rgb(239, 68, 68)`
            textColor = 'rgb(239, 68, 68)'
        }

        return { pathColor, textColor }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        setContent(textarea.value);
        const calcPorcent = Math.ceil((textarea.value.length / maxContentLength) * 100);
        setPorcent(calcPorcent);
    };

    const refTextArea = useRef<HTMLTextAreaElement | null>(null)
    const { ref, ...rest } = register("content", { required: true, maxLength: maxContentLength, onChange: handleOnChange });

    return (
        <div className="flex w-full mb-4 p-4">
            <div className='w-12 h-12 rounded-full'>
                <img src={imageStatic(user.photo)} alt="" />
            </div>
            <form className="flex flex-col gap-3 w-[calc(100%-66px)] ml-4" onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    className="block outline-none pb-1 text-white bg-transparent resize-none h-auto"
                    placeholder="What is happening?"
                    onInput={handleInputChange}
                    value={content}
                    {...rest}
                    ref={(e) => {
                        ref(e)
                        refTextArea.current = e
                    }}
                />

                <div className="flex gap-4 items-center justify-end">


                    <div className="w-8 flex items-center">

                        <CircularProgressbar value={porcent} text={`${porcent >= 80 ? 100 - porcent : ''}`} styles={buildStyles({
                            textSize: '32px',
                            textColor: progressBarColors().textColor,
                            pathColor: progressBarColors().pathColor,
                        })} />
                    </div>


                    <button className="bg-violet-900 text-white px-3 py-2 rounded-xl self-end disabled:opacity-50" disabled={!isValid}>
                        Tweet
                    </button>
                </div>
            </form>
        </div>
    );
};
