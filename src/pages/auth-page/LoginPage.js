import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [userID, setUserID] = new useState('');
    const [password, setPassword] = new useState('');

    const navigate = new useNavigate();

    const submitUserInfo = (e) => {
        e.preventDefault(); 
        
        const data = {
            'id': userID,
            'pw': password
        };

        console.log(userID, password);

        axios.post(process.env.REACT_APP_API_URL + '/login', data).then( response => {
                if (response.status === 200) {
                    alert('로그인에 성공하셨습니다.');
                    navigate('/main');
                }
                else {

                }
            }
        );
};

    return (
      <div className="w-full flex justify-center">
          <div className="w-[75%] flex flex-col items-center mt-32">
              <form onSubmit={(e) =>{submitUserInfo(e)}}
                    className="flex flex-col gap-3 w-2/5">
                  <div className="font-bold text-xl mb-2">로그인하기</div>
                  <input type="text"
                         name="id"
                         className="focus:outline-none border border-gray-300 rounded-sm py-1"
                         onChange={(e) => { setUserID(e.target.value) }}/>
                  <input type="password"
                         name="pw"
                         className="focus:outline-none border border-gray-300 rounded-sm py-1"
                         onChange={(e) => { setPassword(e.target.value)}}/>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1">로그인하기</button>
                  <div className="text-end text-sm">아직 회원이 아니신가요? <a href="/signup" className="text-blue-600 font-bold text-lg">회원가입</a></div>
              </form>
          </div>
      </div>
    );
}

export default LoginPage;