import { IMG_CDN_URL, PHOTO_URL } from "../utils/constants";

const ReviewCard = ({ review, author, isExpanded, setIsExpanded, index }) => {
  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(null);
    } else {
      setIsExpanded(index);
    }
  };

  const characterLimit = 300;
  const isLong = review.length > characterLimit;
  const { username, rating, avatar_path } = author;
  return (
    <div className="md:ml-12 my-4 flex md:text-sm gap-2">
      <div className="p-2 h-fit rounded-lg md:w-1/12 w-1/6 md:text-xs text-[7px] justify-items-center bg-gray-700  ">
        {avatar_path ? (
          <img
            className="rounded-full h-10 w-10 object-cover overflow-hidden mb-[2px]"
            src={IMG_CDN_URL + avatar_path}
            alt="Avatar"
          />
        ) : (
          <img
            className="rounded-full h-10 w-10 object-cover overflow-hidden mb-[2px]"
            src={PHOTO_URL}
            alt="Avatar"
          />
        )}
        <h1 className="md:text-[10px] text-[6px]">{username}</h1>
        {rating && <h1> {rating}/10 ⭐</h1>}
      </div>
      <div className="md:w-11/12 w-5/6 border border-white p-2 rounded-lg overflow-x-scroll scrollbar-hide ">
        {!isExpanded && isLong ? (
          <p className=" ">{review.slice(0, characterLimit)}...</p>
        ) : (
          <p className=" ">{review}</p>
        )}
        {/* Button only shows up when content is above 300 characters  */}
        {isLong && (
          <button
            className="text-gray-400 hover:underline"
            onClick={handleClick}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};
export default ReviewCard;
