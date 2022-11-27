export default function MyBadge (props) {
  return (
      <div className="rounded-full border border-gray-200 w-fit p-4">
          <img className="w-16 h-16 object-cover object-center" src={process.env.REACT_APP_PUBLIC_URL+'/images/badge1.png'} />
      </div>
  );
};