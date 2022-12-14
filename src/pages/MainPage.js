import PostItem from "./post-page/components/PostItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MainPage() {
    const [tab, setTab] = new useState(1);
    const [articles, setArticles] = useState([]);
    const params = useParams();

    const getArticles = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/articles/' + tab);
    }

    useEffect(() => {
        getArticles().then(response => {
            if (response.data.status === 200) {
                setArticles(response.data.response);
            }
        });
    }, [tab]);

    return (
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
                        articles.map((item) => <PostItem item={item} key={item.article_id} />)
                    }
                </div>
            </div>
        </div >
    );
}

export default MainPage;