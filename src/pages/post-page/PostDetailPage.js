import '../../customAnimation.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { CommentItem, PostItem, PostWriter } from "./components";
import axios from "axios";

export default function PostDetailPage() {
    const [postData, setPostData] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const getArticle = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/article/' + params.key).then(response => {
            if(response.data.status === 200) {
                setPostData(response.data.response);
            }
        });
    };

    const getComments = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/comments/' + params.key);
    };

    const postComment = () => {
        axios.post(process.env.REACT_APP_API_URL + '/comment/post', {content: comment, user_id: 'dd', article_id: params.key}).then(response => {
            setLoading(true);
        })
    };

    useEffect(() => {
        getArticle().then(() => {
            setLoading(false);
        });

        getComments().then(response => {
            if(response.data.status === 200){
                setComments(response.data.response);
                setLoading(false);
            }
        });
    },[loading]);

    return (
        <div className="w-full flex justify-center items-center fadein">
            <div className="w-[60%] flex flex-col gap-8">

                {/*글내용*/}
                <div className="w-full flex flex-col gap-4 mb-20">
                    <div className="mt-16 font-bold text-4xl">{postData.title}</div>
                    <div className="flex gap-4">
                        <a href="#" className="font-bold">{postData.a_user}</a>
                        <div className="">{postData.a_date}</div>
                    </div>
                    <img className="mb-8 w-full h-[300px] object-center object-contain bg-black" src={postData.a_thumbnail}></img>

                    <div className="flex flex-col gap-2 whitespace-pre-wrap">
                        {
                           postData.a_content
                        }
                    </div>
                </div>

                {/*작성자*/}
                <PostWriter name={'작성자'} url={'../../images/sample22.jpeg'} />

                {/*이전포스트*/}
                <div className="w-full flex gap-2">
                    {postData.preArticle ?
                        <div className="flex w-1/2 bg-gray-200 cursor-pointer">
                            <div onClick={() => {navigate('/post/detail/'+postData.preArticle.article_id); setLoading(true);}}
                                 className="flex px-3 py-3.5 items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.3"
                                     stroke="rgb(59 130 246)" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <div className="text-sm">이전 포스트</div>
                                    <div className="font-bold">{postData.preArticle.title}</div>
                                </div>
                            </div>
                        </div> : <div className="w-1/2"></div>}

                    {postData.nxtArticle ?
                        <div className="flex w-1/2 bg-gray-200 justify-end cursor-pointer">
                            <div onClick={() => {navigate('/post/detail/'+postData.nxtArticle.article_id); setLoading(true);}}
                                 className="flex p-2 items-center gap-2">
                                <div className="text-end">
                                    <div className="text-sm">다음 포스트</div>
                                    <div className="font-bold">{postData.nxtArticle.title}</div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.3"
                                     stroke="rgb(59 130 246)" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </div> : <div className="w-1/2"></div>}
                </div>

                {/*댓글작성*/}
                <div className="w-full gap-2 flex flex-col">
                    <div className="font-bold">{comments.length} 개의 댓글</div>
                    <textarea onChange={(e) => {setComment(e.target.value);}} value={comment} className="w-full h-32 border border-gray-200 rounded-md py-1.5 px-2 resize-none focus:outline-none" />
                    <div className="flex justify-end">
                        <button onClick={postComment}
                                className="font-bold w-24 justify-center rounded-md py-1 px-2 flex bg-blue-500 hover:bg-blue-400 text-white">댓글 작성</button>
                    </div>
                </div>

                {/*댓글목록*/}
                <div className="mb-10">
                    {
                        comments.map((item) => <CommentItem key={item.comment_id} items={item}/>)
                    }
                </div>

                {/*/!*추천게시글*!/*/}
                {/*<div className="grid grid-cols-3 gap-4 mb-36">*/}
                {/*    {*/}
                {/*        n.map((item) => <PostItem item={item} />)*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </div>
    );
}