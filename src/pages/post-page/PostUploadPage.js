import '../../customAnimation.css';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PostUploadPage({ isVisible }) {

    isVisible(false);

    const [isModified, setIsModified] = useState(false);
    const [isPublic, setIsPublic] = useState(1);

    // title, category, content
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(1); // article_type
    const [content, setContent] = useState(""); // 본문

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = new useNavigate();

    // cat image == thumbnail
    const sample = "https://cataas.com//cat/y1sAMOXPczgTIVR1";
    const [mainCat, setMaincat] = useState(sample);
    const bg_url = "url(" + mainCat + ")";

    const onSubmit = () => {

    };

    const fetchCat = async () => {
        const OPEN_API_DOMAIN = "https://cataas.com";
        const response = await fetch(`${OPEN_API_DOMAIN}/cat?json=true`);
        const responseJson = await response.json();
        return `${OPEN_API_DOMAIN}/${responseJson.url}`;
    };

    async function updateMainCat() {
        const newCat = await fetchCat();
        setMaincat(newCat);
        console.log(newCat);
    }

    const handleChangeCategory = (e) => {
        setCategory(Number(e.target.value));
        // console.log(e.target.value);
    }

    // const getContent = async () => {
    //     // 수정하기 기능 구현 시 사용
    //     return await axios.get(process.env.REACT_APP_API_URL + '/posts/write/update' + params.key);
    // }

    const postContent = () => {
        // 넘겨줘야 할 것: title, thumbnail, content, is_public, user_id, type_id
        axios.post(process.env.REACT_APP_API_URL + '/article/post', { title: title, thumbnail: mainCat, content: content, is_public: isPublic, user_id: 'dd', type_id: category }).then(response => {
            setLoading(true);
            navigate('/');
        })
    }

    // useEffect(() => {
    //     getContent().then(response => {
    //         if (response.data.status === 200) {
    //             setContent(response.data.response);
    //             setLoading(false);
    //         }
    //     });
    // }, [loading]);

    return (
        <div className="grid grid-cols-2 h-screen fadein">
            <div className="flex w-full bg-no-repeat bg-center bg-contain h-auto bg-stone-900"
                style={{ backgroundImage: `${bg_url}` }}>
                <div className="flex w-full h-full items-end justify-end px-4 py-4"
                    onClick={() => updateMainCat()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="white" className="w-6 h-6 cursor-pointer w-6 h-6 cursor-pointer animate-pulse origin-center hover:animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>
            </div>

            <form className="flex flex-col">
                <input placeholder="제목"
                    name="title"
                    onChange={(e) => { setTitle(e.target.value); }} value={title}
                    className="text-2xl font-bold focus:outline-none bg-transparent pl-8 pt-10 mb-3" />

                <div className="flex w-full pl-8 mb-3 text-sm">
                    <div className="flex items-center mr-36">
                        <div className="pr-5">카테고리</div>
                        <select onChange={handleChangeCategory} value={category} className="focus:outline-none p-1 border border-gray-200 rounded-sm">
                            <option value="1">일상</option>
                            <option value="2">고민</option>
                            <option value="3">질문</option>
                        </select>
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="pr-5">공개설정</div>
                        <div className="flex gap-4 items-center">
                            <label ><input className="mr-1" type="radio" name="all" checked={isPublic} onChange={() => setIsPublic(1)} />전체공개</label>
                            <label><input className="mr-1" type="radio" name="none" checked={!isPublic} onChange={() => setIsPublic(0)} />비공개</label>
                        </div>
                    </div>
                </div>

                <textarea placeholder="본문을 입력해주세요"
                    name="content"
                    onChange={(e) => { setContent(e.target.value); }} value={content}
                    className="bg-transparent focus:outline-none resize-none h-full pl-8 pt-1 mb-2.5" />
                <div className="flex justify-between items-center bg-stone-700 py-2.5 px-3">
                    <a href="/" className="flex gap-1 text-white font-bold hover:bg-stone-500 rounded-md px-3.5 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
                        나가기
                    </a>
                    <button onClick={postContent}
                        type="button"
                        className="bg-blue-500 hover:bg-blue-400 rounded-md text-white px-4 py-1.5 font-bold">
                        {isModified ? '수정하기' : '작성하기'}</button>
                </div>
            </form>
        </div>
    );
}
