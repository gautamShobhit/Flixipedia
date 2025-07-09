import { IMG_CDN_URL } from "../utils/constants";

const ActorCard = ({ actor }) => {
  const { name, profile_path } = actor;
  return (
    <div className="md:w-28 md:mx-2 mx-[3px] w-14">
      <img
        className="rounded-lg mb-2"
        src={IMG_CDN_URL + profile_path}
        alt="Pfp"
      />
      <h1 className="md:text-xs text-[9px] text-center">{name}</h1>
      {/* <h1 className="md:text-xs text-[7px] text-center">( {character} )</h1> */}
    </div>
  );
};
export default ActorCard;
