import '../../customAnimation.css';
import { useState } from "react";

export default function PostWritePage({ isVisible }) {

    isVisible(false);

    const [isModified, setIsModified] = useState(false);
    const [isPublic, setIsPublic] = useState(true);

    const onSubmit = () => {

    };

    return (
        <div className="grid grid-cols-2 h-screen fadein">
            <div className={`flex w-full bg-no-repeat bg-center bg-contain h-auto bg-stone-900 bg-[url('sample.jpeg')]`}>
                <div className="flex w-full h-full items-end justify-end px-4 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="white" className="w-6 h-6 cursor-pointer animate-pulse origin-center hover:animate-spin">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
            </div>

            <form className="flex flex-col">
                <input placeholder="제목"
                    className="text-2xl font-bold focus:outline-none bg-transparent pl-8 pt-10 mb-3" />

                <div className="flex w-full pl-8 mb-3 text-sm">
                    <div className="flex items-center mr-36">
                        <div className="pr-5">카테고리</div>
                        <select className="focus:outline-none p-1 border border-gray-200 rounded-sm">
                            <option>일상</option>
                            <option>고민</option>
                            <option>질문</option>
                        </select>
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="pr-5">공개설정</div>
                        <div className="flex gap-4 items-center">
                            <label ><input className="mr-1" type="radio" name="all" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />전체공개</label>
                            <label><input className="mr-1" type="radio" name="none" checked={!isPublic} onChange={() => setIsPublic(!isPublic)} />비공개</label>
                        </div>
                    </div>
                </div>

                <textarea placeholder="본문을 입력해주세요"
                    className="bg-transparent focus:outline-none resize-none h-full pl-8 pt-1 mb-2.5" />
                <div className="flex justify-between items-center bg-stone-700 py-2.5 px-3">
                    <a href="/" className="flex gap-1 text-white font-bold hover:bg-stone-500 rounded-md px-3.5 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
                        나가기
                    </a>
                    <button className="bg-blue-500 hover:bg-blue-400 rounded-md text-white px-4 py-1.5 font-bold">
                        {isModified ? '수정하기' : '작성하기'}</button>
                </div>
            </form>
        </div>
    );
}
