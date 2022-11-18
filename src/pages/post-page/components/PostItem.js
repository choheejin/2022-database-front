import {useNavigate} from "react-router-dom";

export default function PostItem(props) {
    const navigate = useNavigate();

    const linkToDetail = () => {
        navigate(`/post/detail/${props.item.id}`);
    }

    return(
        <div className="w-full h-full cursor-pointer flex flex-col gap-2 drop-shadow bg-white rounded-lg"
             onClick={() => {linkToDetail()}}>
            <img className="h-[70%] w-full object-center object-cover" src={props.item.url}></img>
            <div className="px-4">
                <div className="font-bold mt-2">{props.item.title}</div>
                <div>{props.item.content}</div>
            </div>
        </div>
    );
}