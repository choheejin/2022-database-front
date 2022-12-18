import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function SignupPage() {
  
    const navigate = new useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        axios
            .post(process.env.REACT_APP_API_URL + '/signup', inputs)
            .then( response => {
                if (response.status === 200) {
                    alert('회원가입에 성공하셨습니다.');
                    navigate( '/login');
                    
                }
                else {
                    alert("회원가입을 다시 시도하세요.");
                    navigate('/signup');
                    //중복있으면?
                }
            })
    };
    return (
        <div className="w-full flex justify-center">
            <div className="w-[75%] flex flex-col items-center mt-32">
                <form onSubmit={(e) => {onSubmit(e)}}
                      className="flex flex-col gap-3 w-2/5">
                    <div className="font-bold text-xl mb-2">회원 가입하기</div>
                    <input type="text"
                           name="id"
                           placeholder="아이디를 작성해주세요."
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={handleChange}/>
                    <input type="password"
                           name="pw"
                           placeholder="패스워드를 작성해주세요."
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={handleChange}/>
                    {/* <input type="password"
                           name="confirmPw"
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={handleChange}/> */}
                    <input type="text"
                           name="name"
                           placeholder="이름을 작성해주세요."
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={handleChange}/>
                    <input type="text"
                           name="gender"
                           placeholder="성별을 선택해주세요"
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={handleChange}/>
                           
                    <input type="text"
                           name="email"
                           placeholder="이메일을 작성해주세요."
                           className="focus:outline-none border border-gray-300 rounded-sm py-1"
                           onChange={handleChange}/>

                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1">회원가입 하기</button>
                    <div className="text-end text-sm">이미 회원이신가요? <a href={process.env.REACT_APP_PUBLIC_URL+"/login"} className="text-blue-600 font-bold text-lg">로그인 하기</a></div>
                </form>
            </div>
        </div>

    );
}