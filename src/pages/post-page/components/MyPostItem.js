import {useNavigate} from "react-router-dom";

export default function MyPostItem(props) {
    const navigate = new useNavigate();

    const linkToDetail = () => {
        navigate('/post/detail/'+ props.user +'/'+props.item.article_id);
    };

    return (
        <div className="border-b-2 border-gray-200 mt-10 cursor-pointer duration-[0.2s] hover:scale-105"
             onClick={linkToDetail}>
            <img className="h-80 w-full object-center object-cover" src={props.item.thumbnail}></img>
            <div className="px-4 pb-8">
                <div className="font-bold mt-2 text-lg pb-1 pt-2">{props.item.title}</div>
                <div className="text-sm">{props.item.preview}</div>
                <div className="pt-4 flex items-center gap-2">
                    <div className="text-sm">{props.item.date}</div>
                    <div>&middot;</div>
                    <div className="text-sm">{props.item.comment_cnt}개의 댓글</div>
                </div>
            </div>
        </div>
    );
}