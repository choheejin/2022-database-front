import PostItem from "./post-page/components/PostItem";

function MainPage() {
    const n = [
    {
        id: 1,
        url: 'images/sample.jpeg',
        title: '타이틀11',
        content: '11입니다'
    }, {
        id: 2,
        url: 'images/sample22.jpeg',
        title: '타이틀22',
        content: '22입니다'
    }, {
        id: 3,
        url: 'images/sample.jpeg',
        title: '타이틀33',
        content: '33입니다'
    }, {
            id: 4,
            url: 'images/sample22.jpeg',
            title: '타이틀44',
            content: '44입니다'
        },
        {
            id: 5,
            url: 'images/sample.jpeg',
            title: '타이틀55',
            content: '55입니다'
        }]; // 가데이터

    return(
        <div className="w-full flex justify-center">
            <div className="w-[75%] mt-6 grid grid-cols-3 gap-5 items-center justify-center">
                {
                    n.map( (item) => <PostItem item={item} key={item.id}/> )
                }
            </div>
        </div>
    );
}

export default MainPage;