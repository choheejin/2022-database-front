import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

function LoginPage(props) {
  const [userID, setUserID] = new useState("");
  const [password, setPassword] = new useState("");
  const [isSubmit, setIsSubmit] = new useState(false);

  const navigate = new useNavigate();

  const submitUserInfo = (e) => {
    setIsSubmit(true);

    e.preventDefault();
    const logindata = {
      id: userID,
      pw: password,
    };
    console.log(userID, password);

    console.log(
      window.sessionStorage.getItem("id")
    );
    axios
      .post(process.env.REACT_APP_API_URL + "/login", logindata)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("db-user_id", logindata.id);
          alert("로그인에 성공하셨습니다.");
          props.setIsLogin(true);
          navigate("/");
        } else {
        }
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[75%] flex flex-col items-center mt-32">
        <form
          onSubmit={(e) => {
            submitUserInfo(e);
          }}
          className="flex flex-col gap-3 w-2/5"
        >
          <div className="font-bold text-xl mb-2">로그인하기</div>
          <input
            type="text"
            name="id"
            className={`focus:outline-none border-2 rounded-sm py-1  ${
              isSubmit & (userID === "") ? "border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => {
              setUserID(e.target.value);
              setIsSubmit(false);
            }}
          />
          <input
            type="password"
            name="pw"
            className={`focus:outline-none border-2 rounded-sm py-1  ${
              isSubmit & (password === "")
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsSubmit(false);
            }}
          />
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1">
            로그인하기
          </button>
          <div className="text-end text-sm">
            아직 회원이 아니신가요?{" "}
            <a href={process.env.REACT_APP_PUBLIC_URL+"/signup"} className="text-blue-600 font-bold text-lg">
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
