import {MyPostItem, PostWriter} from "./components";
import axios from "axios";
import {useEffect, useState} from "react";

export default function PostListPage() {
    const [postList, setPostList] = useState({});

    const getMyPosts = async () => {
        return await axios.get(process.env.REACT_APP_API_URL + '/articles/user/' + localStorage.getItem('db-user_id')).then((response) => {
            if(response.status === 200) {
                setPostList(response.data.response);
            }
        });
    }

    useEffect(() => {
       getMyPosts();
    }, []);

    return(
        <div className="w-full flex justify-center items-center">
            <div className="w-[55%]  flex flex-col gap-8 mb-20">
                <div className="mt-10">
                    <PostWriter name={localStorage.getItem('db-user_id')} url={'profile_cat.png'} />
                </div>

                <div className="mt-4">
                    {
                        postList.length > 0 ? postList.map(item => <MyPostItem key={item.article_id} item={item} />) : <></>
                    }
                </div>
            </div>
        </div>
    );
}
