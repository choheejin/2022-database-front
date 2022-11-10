import {useState} from "react";

function SignupPage() {
    const [userID, setUserID] = new useState('');
    const [password, setPassword] = new useState('');
    const [confirmPw, setConfirmPw] = new useState('');

    return (
        <div className="w-full flex justify-center">
            <div className="w-[75%] flex flex-col items-center mt-32">
                <form
                      className="flex flex-col gap-3 w-2/5">
                    <div className="font-bold text-xl mb-2">회원 가입하기</div>
                    <input type="text"
                           name="id"
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={(e) => { setUserID(e.target.value) }}/>
                    <input type="password"
                           name="password"
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={(e) => { setPassword(e.target.value)}}/>
                    <input type="password"
                           name="confirmPw"
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={(e) => { setPassword(e.target.value)}}/>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1">회원가입 하기</button>
                    <div className="text-end text-sm">이미 회원이신가요? <a href="/login" className="text-blue-600 font-bold text-lg">로그인 하기</a></div>
                </form>
            </div>
        </div>

    );
}

export default SignupPage;