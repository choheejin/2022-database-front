import {useState} from "react";

export default function CommentItem(props) {
    const [pressReCmt, setPressReCmt] = useState(false);

    return(
        <div className="px-5 py-4 w-full h-full flex flex-col bg-gray-100 pb-6">
            <div className="flex gap-2 mb-4">
                <img className="w-14 h-14 object-center object-cover rounded-full" src="../../images/sample22.jpeg"/>
                <div className="flex flex-col justify-center">
                    <div className="font-bold">댓글 작성자</div>
                    <div className="text-sm">댓글 작성일자</div>
                </div>
            </div>
            <div className="pl-4 pb-3 border-b border-gray-300 ">댓글내용</div>

            {
                props.item.map(() =>
                    <div className="px-5 py-4 w-full h-full flex flex-col bg-gray-100 pb-5">
                    <div className="flex gap-2 mb-4">
                        <img className="w-14 h-14 object-center object-cover rounded-full" src="../../images/sample22.jpeg"/>
                        <div className="flex flex-col justify-center">
                            <div className="font-bold">댓글 작성자</div>
                            <div className="text-sm">댓글 작성일자</div>
                        </div>
                    </div>
                        <div className="pl-4 ">댓글내용</div>
                </div>)
            }

            {
                pressReCmt === true ?
                    <div className="pl-8">
                        <div onClick={() => setPressReCmt(!pressReCmt)} className="cursor-pointer gap-2 pb-2 w-fit flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                 stroke="rgb(59 130 246)" className="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <div className="text-sm font-bold">숨기기</div>
                        </div>
                        <textarea className="w-full h-32 border border-gray-200 rounded-md py-1.5 px-2 resize-none focus:outline-none"/>
                        <div className="flex justify-end">
                            <button className="font-bold w-24 justify-center rounded-md py-1 px-2 flex bg-blue-500 hover:bg-blue-400 text-white">댓글 작성</button>
                        </div>
                    </div>
                :
                    <div className="pl-8">
                       <div onClick={() => setPressReCmt(!pressReCmt)} className="cursor-pointer gap-2 w-fit flex items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="rgb(59 130 246)" className="w-5 h-5">
                               <path stroke-linecap="round" stroke-linejoin="round"
                                     d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                           </svg>
                           <div className="text-sm font-bold">대댓글 작성하기</div>
                       </div>
                   </div>
            }

        </div>
    );
}