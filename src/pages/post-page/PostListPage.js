import {PostWriter} from "./components";

export default function PostListPage() {
    return(
        <div className="w-full flex justify-center items-center">
            <div className="w-[60%] flex flex-col gap-8">
                <PostWriter name={'작성자'} url={'../../images/sample22.jpeg'} />

            </div>
        </div>


    );
}
