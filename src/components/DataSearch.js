import React, { useState } from "react";

function DataSearch() {
    return (
        <div>
            <div className={`float-right w-[25%] focus:outline-none border-[1px] border-blue-500 rounded-md p-1 m-1 mb-6`}>
                <table>
                    <tr>
                        <td>
                            <div className="flex w-full h-full items-end justify-end p-1 mx-1">
                                <img className="w-[1em] h-[1em] opacity-50 object-cover object-center" src={process.env.REACT_APP_PUBLIC_URL + '/images/search_icon.png'} />
                            </div>
                        </td>

                        <td>
                            <input type="text"
                                name="id"
                                placeholder="검색어를 입력하세요"
                                className={`w-full p-1 m-1 text-sm`}
                                onChange={(e) => { }} />
                        </td>
                    </tr>
                </table>

            </div>
            <div className="clear-right"></div>
        </div >
    );
}

export default DataSearch;