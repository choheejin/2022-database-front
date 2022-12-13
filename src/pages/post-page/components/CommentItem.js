import {useState} from "react";

export default function CommentItem(props) {
    const [pressUpdate, setPressUpdate] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('db-user_id'));

    return(
        <div className="px-5 py-4 w-full h-full flex flex-col bg-gray-100 pb-6">
            <div className="flex gap-2 mb-4">
                <div className="flex gap-4 w-full items-center justify-center">
                    <div className="font-bold">{props.items.user_id}</div>
                    <div className="text-sm min-w-fit">{props.items.date}</div>
                    {
                        user !== props.items.user_id ?
                            <div className="flex w-full justify-end gap-2">
                                <div onClick={() => setPressUpdate(!pressUpdate)} className="text-sm cursor-pointer">
                                    {pressUpdate ? '수정취소' : '수정'}
                                </div>
                                <div className="text-sm cursor-pointer">삭제</div>
                            </div>
                        :   <div className="flex w-full justify-end gap-2"></div>
                    }
                </div>
            </div>
            {
                pressUpdate === true ?
                    <div className="gap-2 pb-2 mt-3 w-full flex flex-col items-center">
                        <textarea value={props.items.content} className="w-full h-20 border border-gray-200 rounded-md py-1.5 px-2 resize-none focus:outline-none"/>
                        <div className="flex w-full justify-end">
                            <button className="font-bold w-24 justify-center rounded-md py-1 px-2 flex bg-blue-500 hover:bg-blue-400 text-white">수정 완료</button>
                        </div>
                    </div>
                    :  <div className="pl-4 pb-3 border-b border-gray-300 ">{props.items.content}</div>
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