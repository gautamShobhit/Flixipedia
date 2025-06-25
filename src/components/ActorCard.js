import { IMG_CDN_URL } from "../utils/constants";

const ActorCard = ({ actor }) => {
  const { name, profile_path, character } = actor;
  return (
    <div className="w-28 mx-2">
      <img
        className="rounded-lg mb-2"
        src={IMG_CDN_URL + profile_path}
        alt="Profile Picture"
      />
      <h1 className="text-sm text white text-center">{name}</h1>
      <h1 className="text-xs text white text-center">{character}</h1>
    </div>
  );
};
export default ActorCard;
