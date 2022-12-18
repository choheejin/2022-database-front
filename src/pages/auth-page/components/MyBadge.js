import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MyBadge(props) {
  // const [value, onChange] = useState(new Date());
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyAttendance = async () => {
    return await axios.get(
      process.env.REACT_APP_API_URL +
        "/mybadge/" +
        localStorage.getItem("db-user_id")
    );
  };

  useEffect(() => {
    getMyAttendance().then((response) => {
      setLoading(true);
      setAttendanceList(response.data.response);
    });
  }, []);

  return (
    <>
      <div className="bg-gray-200 rounded-lg border-solid border-[1px] border-gray-400">
        {loading ? (
          <div className="flex p-3 gap-5">
            {attendanceList ? (
              attendanceList.map((list, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    className="w-16 object-center object-cover"
                    src={process.env.PUBLIC_URL + "/images/badge1.png"}
                  />
                  <label className="text-sm font-bold drop-shadow-lg">
                    {list.badge_detail}
                  </label>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import moment from "moment/moment";
// import "react-calendar/dist/Calendar.css"; // css import

// export default function MyStamp(props) {
//   const [value, onChange] = useState(new Date());n

//   return (
//     <div>
//       <Calendar onChange={onChange} value={value} />
//       <div className="text-gray-500 mt-4">
//         {moment(value).format("YYYY년 MM월 DD일")}
//       </div>
//     </div>
//   );
// }
