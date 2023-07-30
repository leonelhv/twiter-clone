import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const text_default = "what is happening?";


export const NewTweet = () => {
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


  const { register, reset, handleSubmit, formState: { errors } } = useForm<{ content: string }>()

  const onSubmit: SubmitHandler<{ content: string }> = (data) => {
    console.log(data)
    // reset()
  }

  return (
    <div className="flex w-full mb-4 p-4">
      <div className="">
        <div className="w-12 h-12 bg-violet-900 rounded-full"></div>
      </div>
      <form className="flex flex-col gap-3 w-[calc(100%-66px)] ml-4" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="block outline-none pb-1 text-white bg-transparent resize-none h-auto"
          placeholder={text_default}
          onClick={handleClick}
          onInput={handleInputChange}
          value={content}
          {...register("content", { required: true })}
        />
        <button className="bg-violet-900 text-white px-3 py-2 rounded-xl self-end disabled:opacity-50" disabled={true}>
          Tweet
        </button>
      </form>
    </div>
  );
};
