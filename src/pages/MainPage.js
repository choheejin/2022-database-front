import PostItem from "./post-page/components/PostItem";
import {useState} from "react";

function MainPage() {
    const [tab, setTab] = new useState(1);

    const n = [
    {
        id: 1,
        url: 'images/sample.jpeg',
        title: '타이틀11',
        content: '11입니다'
    }, {
        id: 2,
        url: 'images/sample22.jpeg',
        title: '타이틀22',
        content: '22입니다'
    }, {
        id: 3,
        url: 'images/sample.jpeg',
        title: '타이틀33',
        content: '33입니다'
    }, {
            id: 4,
            url: 'images/sample22.jpeg',
            title: '타이틀44',
            content: '44입니다'
        },
        {
            id: 5,
            url: 'images/sample.jpeg',
            title: '타이틀55',
            content: '55입니다'
        }]; // 가데이터

    return(
        <div className="w-full flex justify-center">
            <div className="w-[75%] mt-3 ">
                <div className="flex gap-2 mb-5 text-lg font-semibold mb-7">
                    <div onClick={() => setTab(1)} className={`px-5 cursor-pointer select-none pb-1 ${tab === 1 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>일상</div>
                    <div onClick={() => setTab(2)} className={`px-5 cursor-pointer select-none pb-1 ${tab === 2 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>고민</div>
                    <div onClick={() => setTab(3)} className={`px-5 cursor-pointer select-none pb-1 ${tab === 3 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>질문</div>
                    <div onClick={() => setTab(4)} className={`px-5 cursor-pointer select-none pb-1  ${tab === 4 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>최근 본 게시글</div>
                </div>

                <div className=" grid grid-cols-3 gap-5 items-center justify-center">
                    {
                        n.map( (item) => <PostItem item={item} key={item.id}/> )
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;