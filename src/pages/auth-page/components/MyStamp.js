export default function MyStamp (props){
    return (
        <div className="flex flex-col gap-2">
            <img className="w-16 h-16 object-center object-cover" src={process.env.REACT_APP_PUBLIC_URL + '/images/stamp.png'}/>
            <label className="text-sm">2022.11.28</label>
        </div>
    );
};