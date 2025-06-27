import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBg from "./VideoBg";
//import { useEffect, useState } from "react";

const MainContainer = () => {
  //Since we need to build a vdo title and a vdo bg
  const movies = useSelector((store) => store.movies?.upcomingMovies);
  //There could be case when "movies" is empty
  //AKA early return -> It prevents our code fetchinh movies when it is null
  if (!movies) return;

  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const mainMovie = movies[dayOfMonth % 20];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="overflow-x-hidden">
      <VideoTitle title={original_title} overview={overview} id={id} />
      <VideoBg movieId={id} />
    </div>
  );
};
export default MainContainer;
