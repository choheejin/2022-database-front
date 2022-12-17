import { useEffect, useState } from "react";

function Navigation() {
    const [IsLogin, setIsLogin] = useState(0);
    const [User, setUser] = useState('');
    const [IsScroll, setIsScroll] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('db-user_id')) {
            setIsLogin(1);
            setUser(localStorage.getItem('db-user_id'));
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        console.log(scrollPosition);
        if (scrollPosition === 0) {
            setIsScroll(0);
        } else {
            setIsScroll(1);
        }
    };

    return (
        <div className={`${IsScroll === 1 ? 'sticky top-0 z-50 bg-white drop-shadow' : ''} w-full flex justify-center mb-2`}>
            <div className="flex justify-between items-center w-[75%] py-4 px-2">
                <a href="/main" className="flex items-center gap-4">
                    <img className="w-9 h-9 cursor-pointer" src={process.env.REACT_APP_PUBLIC_URL + '/logo.png'} />
                    <div className="cursor-pointer font-bold text-gray-700 flex text-3xl font-cute">고뮤니티</div>
                </a>
                <div>
                    {
                        IsLogin === 1 ? <div className="flex gap-4"> <a className="duration-[0.2s] hover:text-pink-500" href="/my-page">{User}</a> <a href={'/posts/'+User} className="duration-[0.2s] hover:text-blue-500">내 글목록</a> <a href="/posts/write" className="duration-[0.2s] hover:text-blue-500">글 작성하기</a></div> : <a href="/login">로그인 하기</a>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navigation;