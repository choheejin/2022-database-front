import PostItem from "./post-page/components/PostItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

function MainPage() {
    const [tab, setTab] = new useState(1);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [items, setItems] = useState(6);
    const [User, setUser] = useState("");
    const params = useParams();

    const getArticles = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/articles/' + tab + '/user/' + localStorage.getItem('db-user_id'));
    }

    const getSearch = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/articles/' + tab + '/search/' + search);
    }

    const getHistory = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/articles/history/' + User);
    }

    const handlePageChange = (page) => { setPage(page); };

    const checkUser = () => {
        const token = localStorage.getItem('db-user_id');
        // console.log(token);
        if (token) {
            setUser(token);
        } else {
            setUser('');
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        if (tab === 4) {
            getHistory().then(response => {
                if (response.data.status === 200) {
                    setArticles(response.data.response);
                }
            });
        }
        else {
            getArticles().then(response => {
                if (response.data.status === 200) {
                    setArticles(response.data.response);
                    // console.log(response.data.response);
                }
            });
        }
    }, [tab]);

    useEffect(() => {
        // console.log(search);
        getSearch().then(response => {
            if (response.data.status === 200) {
                setArticles(response.data.response);
                // console.log(response.data.response);
            }
        });

        if (search == "") { // 검색창 비웠을 시, 원래 보던 tab 보여줌
            getArticles().then(response => {
                if (response.data.status === 200) {
                    setArticles(response.data.response);
                    // console.log(response.data.response);
                }
            });
        }
    }, [search]);

    const PaginationBox = styled.div`
    .pagination { display: flex; justify-content: center; margin-top: 3em;}
    ul { list-style: none; padding: 0; }
    ul.pagination li {
      display: inline-block;
      width: 2em;
      height: 2em;
      border-radius: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem; 
      margin: 0.2em;
    }
    ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
    ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
    ul.pagination li a { text-decoration: none; color: #3B82F6; font-size: 1em; }
    ul.pagination li.active a { color: white; }
    ul.pagination li.active { background-color: #3B82F6; }
    ul.pagination li:hover { border: solid 1px #3B82F6; }
    ul.pagination li a.active { color: blue; }
  `

    return (
        <div className="w-full flex justify-center">
            <div className="w-[75%] mt-3 mb-32">
                <div className="flex gap-2 mb-3 text-lg font-semibold mb-7">
                    <div onClick={() => setTab(1)} className={`px-5 cursor-pointer select-none pb-1 ${tab === 1 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>일상</div>
                    <div onClick={() => setTab(2)} className={`px-5 cursor-pointer select-none pb-1 ${tab === 2 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>고민</div>
                    <div onClick={() => setTab(3)} className={`px-5 cursor-pointer select-none pb-1 ${tab === 3 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>질문</div>
                    {
                        User !== '' ? <div onClick={() => setTab(4)} className={`px-5 cursor-pointer select-none pb-1  ${tab === 4 ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}>최근 본 게시글</div> : <div></div>
                    }
                </div>

                {/* 검색창 */}
                <div>
                    <div className={`float-right w-[25%] focus:outline-none border-[1.5px] border-gray-400 rounded-full px-1 py-0.5 mb-8`}
                        onSubmit={(e) => { getSearch(); }}>
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
                                        className={`w-full px-1 py-0.5 m-1 text-sm bg-transparent focus:outline-none`}
                                        onChange={(e) => { setSearch(e.target.value); }} value={search} />
                                </td>
                            </tr>
                        </table>

                    </div>
                    <div className="clear-right"></div>
                </div >

                <div className=" grid grid-cols-3 gap-5 items-center justify-center">
                    {
                        // articles.map((item) => <PostItem item={item} key={item.article_id} />)
                    }
                    {
                        articles.slice(
                            items * (page - 1),
                            items * (page - 1) + items
                        ).map((v, i) => {
                            return (
                                <div className="w-full h-full" key={i}>
                                    <PostItem item={v} key={v.article_id} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="clear-right"></div>

                <div>
                    <PaginationBox>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={items}
                            totalItemsCount={articles.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}>
                        </Pagination>
                    </PaginationBox>
                </div>
            </div>
        </div >
    );
}

export default MainPage;