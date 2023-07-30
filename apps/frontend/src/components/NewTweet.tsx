import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "../axios/apiClient";
import { UserState } from "../types/user";
import { imageStatic } from "../utils/imageStatic";
import { useAppDispatch } from "../store/hooks";
import { addTweetToList } from "../store/tweet/tweetSlice";
import { Itweet } from "../types/tweet";
import { Response } from "../types/response";
import { AxiosResponse } from "axios";





const text_default = "what is happening?";

const defaultValues = {
  content: text_default,
}

interface Props {
  user: UserState
}

export const NewTweet = ({ user }: Props) => {
  const [content, setContent] = useState(text_default);



  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = '';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  const handleClick = () => {
    if (content === text_default) {
      setContent("");
    }
  };


  const { register, reset, handleSubmit, formState: { errors } } = useForm<{ content: string }>({
    mode: "onChange",
    defaultValues
  })

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<{ content: string }> = (data) => {
    apiClient.post('/tweet', data).then((res: AxiosResponse<Response<Itweet>>) => {
      const resTweet = res.data.result
      dispatch(addTweetToList(resTweet))
      reset(defaultValues)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="flex w-full mb-4 p-4">
      <div className='w-12 h-12 rounded-full'>
        <img src={imageStatic(user.photo)} alt="" />
      </div>
      <form className="flex flex-col gap-3 w-[calc(100%-66px)] ml-4" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="block outline-none pb-1 text-white bg-transparent resize-none h-auto"
          placeholder={text_default}
          onClick={handleClick}
          onInput={handleInputChange}
          value={content}
          {...register("content", { required: true, maxLength: 280 })}
        />
        {errors.content?.type === 'required' && <span className="text-red-500">This field is required</span>}
        {errors.content?.type === "maxLength" && <span className="text-red-500">Max length exceeded</span>}
        <button className="bg-violet-900 text-white px-3 py-2 rounded-xl self-end">
          Tweet
        </button>
      </form>
    </div>
  );
};
