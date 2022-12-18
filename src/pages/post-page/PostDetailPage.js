import '../../customAnimation.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentItem, PostItem, PostWriter } from "./components";
import axios from "axios";

export default function PostDetailPage() {
    const [postData, setPostData] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(false);
    const [posting, setPosting] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const getArticle = async () => {
        if (params.key1 === localStorage.getItem('db-user_id')) {
            return await axios.get(process.env.REACT_APP_API_URL + '/article/user/' + params.key).then(response => {
                setLoading(false);

                if (response.data.status === 200) {
                    setPostData(response.data.response);
                }
            });
        } else {
            return await axios.get(process.env.REACT_APP_API_URL + '/article/non-user/' + params.key).then(response => {
                setLoading(false);

                if (response.data.status === 200) {
                    setPostData(response.data.response);
                }
            });
        }
    };

    const getComments = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/comments/' + params.key).then((response) => {
            if (response.data.status === 200) {
                setComments(response.data.response);
            }
        });
    };

    const postComment = () => {
        axios.post(process.env.REACT_APP_API_URL + '/comment/post', { content: comment, user_id: localStorage.getItem('db-user_id'), article_id: params.key }).then(response => {
            setPosting(!posting);
        })
    };

    const postHistory = () => {
        axios.post(process.env.REACT_APP_API_URL + '/articles/history/post', { user_id: localStorage.getItem('db-user_id'), article_id: params.key }).then(response => {
            if(response.data.status === 501){
                updateHistory();
            }
        });
    }

    const updateHistory = () => {
        axios.put(process.env.REACT_APP_API_URL + '/articles/history/update/' + params.key, { user_id: localStorage.getItem('db-user_id') }).then(response => {
        });
    };

    useEffect(() => {
        if (localStorage.getItem('db-user_id')) {
            postHistory();
        }
    }, [history]);

    useEffect(() => {
        getArticle();
    }, [loading]);

    useEffect(() => {
        getComments();
    }, [posting]);

    const deleteArticle = () => {
        axios.post(process.env.REACT_APP_API_URL + '/article/delete/' + postData.article_id,{},{withCredentials:true, crossorigin: true}).then((response) => {
            if (response.status === 200) {
                alert('게시물 삭제가 완료되었습니다');
                navigate('/');
            }
        }
        );
    };

    return (
        <div className="w-full flex justify-center items-center fadein pb-44">
            <div className="w-[60%] flex flex-col gap-8">

                {/*글내용*/}
                <div className="w-full flex flex-col gap-4 mt-16 mb-20">
                    <div className="font-bold text-4xl">{postData.title}</div>
                    <div className="flex gap-4">
                        <a href={process.env.REACT_APP_PUBLIC_URL+'/posts/'+postData.a_user} className="font-bold">{postData.a_user}</a>
                        <div className="text-sm min-w-fit">{postData.a_date}</div>
                        {
                            localStorage.getItem('db-user_id') === postData.a_user ?
                                <div className="flex w-full justify-end gap-2">
                                    <Link to={`/posts/write`}
                                        state={{ postData }} >
                                        <div className="text-sm cursor-pointer duration-[0.1s] hover:text-blue-500">수정</div>
                                    </Link>
                                    <div onClick={deleteArticle} className="text-sm cursor-pointer duration-[0.1s] hover:text-pink-500">삭제</div>
                                </div>
                                : <div className="flex w-full justify-end gap-2"></div>
                        }
                    </div>
                    <img className="mb-8 w-full h-[300px] object-center object-contain bg-black" src={postData.a_thumbnail}></img>

                    <div className="flex flex-col gap-2 whitespace-pre-wrap">
                        {
                            postData.a_content
                        }
                    </div>
                </div>

                {/*작성자*/}
                <PostWriter name={postData.a_user} url={'profile_cat.png'} />

                {/*이전포스트*/}
                <div className="w-full flex gap-2">
                    {postData.preArticle ?
                        <div onClick={() => { navigate('/post/detail/' + postData.a_user + '/' + postData.preArticle.article_id); setLoading(!loading); setPosting(!posting); setHistory(!history);}}
                            className="flex w-1/2 bg-gray-200 cursor-pointer">
                            <div className="flex px-3 py-3.5 items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.3"
                                    stroke="rgb(59 130 246)" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <div className="text-sm">이전 포스트</div>
                                    <div className="font-bold">{postData.preArticle.title}</div>
                                </div>
                            </div>
                        </div> : <div className="w-1/2"></div>}

                    {postData.nxtArticle ?
                        <div onClick={() => { navigate('/post/detail/' + postData.a_user + '/' + postData.nxtArticle.article_id); setLoading(!loading); setPosting(!posting); setHistory(!history);}}
                            className="flex w-1/2 bg-gray-200 justify-end cursor-pointer">
                            <div className="flex p-2 items-center gap-2">
                                <div className="text-end">
                                    <div className="text-sm">다음 포스트</div>
                                    <div className="font-bold">{postData.nxtArticle.title}</div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.3"
                                    stroke="rgb(59 130 246)" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div> : <div className="w-1/2"></div>}
                </div>

                {/*댓글작성*/}
                <div className="w-full gap-2 flex flex-col">
                    <div className="font-bold">{comments.length} 개의 댓글</div>
                    <textarea onChange={(e) => { setComment(e.target.value); }} value={comment} className="w-full h-32 border border-gray-200 rounded-md py-1.5 px-2 resize-none focus:outline-none" />
                    <div className="flex justify-end">
                        <button onClick={() => { postComment(); setComment(''); }}
                            className="font-bold w-24 justify-center rounded-md py-1 px-2 flex bg-blue-500 hover:bg-blue-400 text-white">댓글 작성</button>
                    </div>
                </div>

                {/*댓글목록*/}
                <div className="mb-10">
                    {
                        comments.map((item) => <CommentItem key={item.comment_id} setPosting={setPosting} posting={posting} items={item} />)
                    }
                </div>

                {/*<div className="grid grid-cols-3 gap-4 mb-36">*/}
                {/*    {*/}
                {/*        n.map((item) => <PostItem item={item} />)*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        </div>
    );
}