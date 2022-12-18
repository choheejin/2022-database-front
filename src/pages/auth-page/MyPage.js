import axios from "axios";
import { useEffect, useState } from "react";
import { MyBadge, MyStamp } from "./components";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    return await axios.get(
      process.env.REACT_APP_API_URL +
        "/my-page/" +
        localStorage.getItem("db-user_id")
    );
  };

  useEffect(() => {
    if (localStorage.getItem("db-user_id")) {
      getUserInfo().then((response) => {
        setUserInfo(response.data.response);
      });
    }
  }, []);

  console.log("hello");

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-screen flex mt-8 bg-gray-100 px-5 py-3 justify-center border-y-2 border-gray-200 mb-10">
        <div className="w-[70%] flex items-center gap-4">
          <img
            className="w-24 h-24 object-cover object-center rounded-full"
            src={process.env.REACT_APP_PUBLIC_URL + "/images/sample.jpeg"}
          />
          <div>
            <label className="font-bold text-lg">{userInfo.id}</label>
            <div className="flex gap-2 text-sm">
              <label className="text-slate-400">훌륭합니다! 성실하시군요</label>
              {/* <label className="font-semibold">VIP회원</label> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[70%] flex flex-col gap-10 mb-16">
        <div>
          <div className="font-bold mb-4">내 정보</div>
          <div className="w-full flex justify-center">
            <table className="border-collapse border border-gray-200 table-auto w-[90%]">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 py-2 px-2 bg-gray-300">
                    이름
                  </td>
                  <td className="border border-gray-300 w-[45%] px-2">
                    {userInfo.name}
                  </td>
                  <td className="border border-gray-300 px-2 bg-gray-300">
                    성별
                  </td>
                  <td className="border border-gray-300 w-[42%] px-2">
                    {userInfo.gender}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 py-2 px-2 bg-gray-300">
                    사용자id
                  </td>
                  <td colSpan="3" className="border border-gray-300 px-2">
                    {userInfo.id}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 py-2 px-2 bg-gray-300">
                    이메일
                  </td>
                  <td colSpan="3" className="border border-gray-300 px-2">
                    {userInfo.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="font-bold mb-4">획득한 배찌</div>
          <div className="grid grid-cols-9 gap-2">
            <MyBadge />
          </div>
        </div>
        <div>
          <div className="font-bold mb-4">오늘의 출석 냥스탬프</div>
          <div className="grid">
            <MyStamp />
          </div>
        </div>
      </div>
    </div>
  );
}
