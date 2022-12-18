import {useState} from "react";
import axios from "axios";

export default function CommentItem(props) {
    const [pressUpdate, setPressUpdate] = useState(false);
    const [updateContent, setUpdateContent] = useState('');
    const [user, setUser] = useState(localStorage.getItem('db-user_id'));

    const updateComment = () => {
        axios.put(process.env.REACT_APP_API_URL + '/comment/update/' + props.items.comment_id, {content: updateContent}).then(response => {
            if(response.status === 200){
                props.setPosting(!props.posting);
            }
        });
    };

    const deleteComments = () => {
        axios.delete(process.env.REACT_APP_API_URL + '/comment/delete/' + props.items.comment_id).then((response) =>{
                if(response.status === 200){
                    alert('댓글 삭제가 완료되었습니다');
                    props.setPosting(!props.posting);
                }
            }
        );
    };

    return(
        <div className="pt-3 pb-8 px-6 sm:w-full h-full flex flex-col bg-gray-100">
            <div className="flex gap-2 mb-4">
                <div className="flex gap-4 w-full items-center justify-center">
                    <div className="font-bold">{props.items.user_id}</div>
                    <div className="text-sm min-w-fit">{props.items.date}</div>
                    {
                        user === props.items.user_id ?
                            <div className="flex w-full justify-end gap-2">
                                <div onClick={() => setPressUpdate(!pressUpdate)} className="text-sm cursor-pointer">
                                    {pressUpdate ? '수정취소' : '수정'}
                                </div>
                                <div onClick={deleteComments} className="text-sm cursor-pointer">삭제</div>
                            </div>
                        :   <div className="flex w-full justify-end gap-2"></div>
                    }
                </div>
            </div>
            {
                pressUpdate === true ?
                    <div className="gap-2 pb-2 w-full flex flex-col items-center">
                        <textarea   defaultValue={props.items.content}
                                    onChange={(e) => setUpdateContent(e.target.value)}
                                    className="w-full h-20 border border-gray-200 rounded-md py-1.5 px-2 resize-none focus:outline-none"></textarea>
                        <div className="flex w-full justify-end">
                            <button onClick={() => {updateComment(); setPressUpdate(!pressUpdate)}}
                                    className="font-bold w-24 justify-center rounded-md py-1 px-2 flex bg-blue-500 hover:bg-blue-400 text-white">수정 완료</button>
                        </div>
                    </div>
                    :  <div className="">{props.items.content}</div>
            }


            {/*{*/}
            {/*    props.item.map(() =>*/}
            {/*        <div className="px-5 py-4 w-full h-full flex flex-col bg-gray-100 pb-5">*/}
            {/*        <div className="flex gap-2 mb-4">*/}
            {/*            /!*<img className="w-14 h-14 object-center object-cover rounded-full" src="../../images/sample22.jpeg"/>*!/*/}
            {/*            <div className="flex flex-col justify-center">*/}
            {/*                <div className="font-bold">댓글 작성자</div>*/}
            {/*                <div className="text-sm">댓글 작성일자</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*            <div className="pl-4 ">댓글내용</div>*/}
            {/*    </div>)*/}
            {/*}*/}



        </div>
    );
}