import { useNavigate } from "react-router-dom";


interface Props {
  title: string
}

export default function HeaderTimeLine ({ title }: Props) {

  const navigate = useNavigate();
  return (
    <div className="flex gap-8 items-center px-4 text-white">
      <i className="fa-solid fa-arrow-left text-xl cursor-pointer" onClick={() => navigate(-1)}></i>
      <h1 className="font-extrabold text-xl">{title}</h1>
    </div>
  )
}