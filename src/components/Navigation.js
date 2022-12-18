import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Navigation(props) {
    const [User, setUser] = useState("");
    const [IsScroll, setIsScroll] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, [props.isLogin]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const checkUser = () => {
        const token = localStorage.getItem('db-user_id');
        console.log(token);
        if(token){
            setUser(token);
        } else {
            setUser('');
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition === 0) {
            setIsScroll(0);
        } else {
            setIsScroll(1);
        }
    };

    return (
        <div className={`${IsScroll === 1 ? 'sticky top-0 z-50 bg-white drop-shadow' : ''} w-full flex justify-center mb-2`}>
            <div className="flex justify-between items-center w-[75%] py-4 px-2">
                <a href={process.env.REACT_APP_PUBLIC_URL+"/"} className="flex items-center gap-4">
                    <img className="w-9 h-9 cursor-pointer" src={process.env.REACT_APP_PUBLIC_URL + '/logo.png'} />
                    <div className="cursor-pointer font-bold text-gray-700 flex text-3xl font-cute">고뮤니티</div>
                </a>
                <div>
                    {
                        User !== ''?
                            <div className="flex gap-4"> <a className="duration-[0.2s] hover:text-pink-500" href={process.env.REACT_APP_PUBLIC_URL+"/my-page"}>{User}</a> <a href={process.env.REACT_APP_PUBLIC_URL+'/posts/'+User} className="duration-[0.2s] hover:text-blue-500">내 글목록</a> <a href={process.env.REACT_APP_PUBLIC_URL+"/posts/write"} className="duration-[0.2s] hover:text-blue-500">글 작성하기</a><a className="cursor-pointer" onClick={() => { localStorage.clear(); setUser(''); props.setIsLogin(false); navigate('/');}}>로그아웃</a></div>
                            : <a href={process.env.REACT_APP_PUBLIC_URL+'/login'}>로그인 하기</a>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navigation;