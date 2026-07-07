import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
import Login from "./Login";
import MovieInfo from "./MovieInfo";
import Watchlist from "./Watchlist";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
      children: [
        {
          path: "/browse/movie/:movieId",
          element: <MovieInfo />,
        },
      ],
    },
    {
      path: "/watchlist", // 2. Add the new route here!
      element: <Watchlist />,
    },
  ]);

  return (
    <div className="bg-black font-euclid overflow-x-hidden">
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
