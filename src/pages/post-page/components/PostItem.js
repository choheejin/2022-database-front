import { useNavigate } from "react-router-dom";

export default function PostItem(props) {
    const navigate = useNavigate();

    const linkToDetail = () => {
        navigate(`/post/detail/${props.item.article_id}`);
    }

    return (
        <div className="w-full h-full cursor-pointer flex flex-col gap-2 drop-shadow bg-white rounded-lg
        translate-y-0 duration-[0.2s] hover:translate-y-[-0.3em]"
            onClick={() => { linkToDetail() }}>
            <img className="h-[300px] rounded-t-lg w-full object-center object-cover" src={props.item.thumbnail}></img>
            <div className="px-4">
                <div className="font-bold mt-2">{props.item.title}</div>
                <div className="mb-5">{props.item.preview}</div>
            </div>
        </div>
    );
}