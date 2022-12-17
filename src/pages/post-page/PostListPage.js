import {MyPostItem, PostWriter} from "./components";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function PostListPage() {
    const [postList, setPostList] = useState({});

    const params = useParams();

    const getMyPosts = async () => {
        const user = localStorage.getItem('db-user_id');
        if(params.key === user){
            return await axios.get(process.env.REACT_APP_API_URL + '/articles/user/' + params.key).then((response) => {
                if(response.status === 200) {
                    setPostList(response.data.response);
                }
            });
        } else {
            return await axios.get(process.env.REACT_APP_API_URL + '/articles/non-user/' + params.key).then((response) => {
                if(response.status === 200) {
                    setPostList(response.data.response);
                }
            });
        }
    }

    useEffect(() => {
       getMyPosts();
    }, []);

    return(
        <div className="w-full flex flex-col justify-center items-center">
            <div className="mt-10 w-[60%]">
                <PostWriter name={params.key} url={'profile_cat.png'} />
            </div>
            <div className="w-[55%]  flex flex-col gap-8 mb-20">
                <div className="mt-16">
                    {
                        postList.length > 0 ? postList.map(item => <MyPostItem key={item.article_id} user={params.key} item={item} />) : <></>
                    }
                </div>
            </div>
        </div>
    );
}
