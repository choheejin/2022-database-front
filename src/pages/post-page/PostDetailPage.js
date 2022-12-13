import '../../customAnimation.css';
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { CommentItem, PostItem, PostWriter } from "./components";
import axios from "axios";

export default function PostDetailPage() {
    const [pressLike, setPressLike] = useState(true);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    const getComments = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/comments/' + params.key);
    }

    const postComment = () => {
        axios.post(process.env.REACT_APP_API_URL + '/comment/post', {content: comment, user_id: 'dd', article_id: params.key}).then(response => {
            setLoading(true);
        })
    };

    useEffect(() => {
        getComments().then(response => {
            if(response.data.status === 200){
                setComments(response.data.response);
                setLoading(false);
            }
        });
    },[loading]);

    const n = [
        {
            id: 1,
            url: '../../images/sample.jpeg',
            title: '타이틀11',
            content: '11입니다'
        }, {
            id: 2,
            url: '../../images/sample22.jpeg',
            title: '타이틀22',
            content: '22입니다'
        }, {
            id: 3,
            url: '../../images/sample.jpeg',
            title: '타이틀33',
            content: '33입니다'
        }]; // 가데이터

    const data = '노래하며 능히 그들을 있는 따뜻한 역사를 봄날의 있는 것이다. \n 뭇 군영과 내려온 봄바람을 우는 가는 사막이다. 밥을 때에, 천고에 희망의 우리의 듣기만 얼마나 놀이 것이다. 있는 예수는 있음으로써 용감하고 보배를 피다. 청춘이 발휘하기 창공에 남는 아름다우냐? 것은 발휘하기 구하지 더운지라 할지니, 있음으로써 피어나기 너의 몸이 철환하였는가? 인간의 없으면, 이것을 간에 우리 그들의 주며, 피다. 뜨고, 속잎나고, 대고, 남는 듣기만 몸이 이것은 사막이다. 이는 소리다.이것은 힘차게 크고 인간에 발휘하기 군영과 황금시대를 밥을 봄바람이다. 사라지지 주며, 쓸쓸한 아름다우냐? 얼음과 보내는 같으며, 힘차게 피어나기 칼이다.\n';
    const prePost = '001';
    const nextPost = '002';

    return (
        <div className="w-full flex justify-center items-center fadein">
            <div className="w-[60%] flex flex-col gap-8">

                {/*글내용*/}
                <div className="w-full flex flex-col gap-4 mb-20">
                    <div className="mt-16 font-bold text-4xl">타이틀 {params.key}</div>
                    <div className="flex gap-4">
                        <a href="#" className="font-bold">작성자</a>
                        <div className="">작성날짜</div>
                    </div>
                    <img className="w-full h-[450px] object-center object-cover" src='../../images/sample.jpeg'></img>

                    <div className="flex flex-col gap-2">
                        {
                            data.split("\n").map((txt) => (
                                <div>{txt}<br /></div>
                            ))
                        }
                    </div>
                </div>

                {/*좋아요*/}
                <div className="w-full flex justify-center mb-16 cursor-pointer">
                    <div onClick={() => {
                        setPressLike(!pressLike);
                        console.log(pressLike)
                    }}
                        className={`${pressLike === true ? 'bg-blue-500 text-white border-none drop-shadow' : ''} flex gap-0.5 rounded-full justify-center items-center border-2 border-gray-600 mb-10 w-14 h-14`}>
                        {
                            pressLike === true ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                                    className="w-5 h-5">
                                    <path
                                        d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>
                                </svg>
                        }
                        <div>{pressLike === true ? 2 : 1}</div>
                    </div>
                </div>

                {/*작성자*/}
                <PostWriter name={'작성자'} url={'../../images/sample22.jpeg'} />

                {/*이전포스트*/}
                <div className="w-full flex gap-2">
                    {prePost ?
                        <div className="flex w-1/2 bg-gray-200 cursor-pointer">
                            <div className="flex px-3 py-3.5 items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.3"
                                     stroke="rgb(59 130 246)" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <div className="text-sm">이전 포스트</div>
                                    <div className="font-bold">포스트이름입니다.</div>
                                </div>
                            </div>
                        </div> : <div></div>}
                    {nextPost ?
                        <div className="flex w-1/2 bg-gray-200 justify-end cursor-pointer">
                            <div className="flex p-2 items-center gap-2">
                                <div className="text-end">
                                    <div className="text-sm">다음 포스트</div>
                                    <div className="font-bold">포스트이름입니다.</div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.3"
                                     stroke="rgb(59 130 246)" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                        </div> : <div></div>}
                </div>

                {/*댓글작성*/}
                <div className="w-full gap-2 flex flex-col">
                    <div className="font-bold">N개의 댓글</div>
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

                {/*추천게시글*/}
                <div className="grid grid-cols-3 gap-4 mb-36">
                    {
                        n.map((item) => <PostItem item={item} />)
                    }
                </div>
            </div>
        </div>
    );
}