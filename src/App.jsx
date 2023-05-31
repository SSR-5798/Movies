import { useEffect, useCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Explores from "./pages/Explores";
import SearchResults from "./pages/searchResult/SearchResults";
import Error from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import fetchFromApi  from "./API/fetchFromApi"
import { useDispatch } from "react-redux";
import { getConfigurationURL, getGenres } from "./store/homeSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: ":mediaType/:id", element: <Details /> },
      { path: "explore/:mediaType", element: <Explores /> },
      { path: "search/:query", element: <SearchResults /> },
    ],
  },
]);


const App = () => {

  const dispatch = useDispatch();

  ////////////////////////////////////////////////////// Genre call
  const genreCall = useCallback(async () => {
    const promises = [];
    let data = [];
    const endpoint = ["movie", "tv"]
    let genreData = {};

    for(const e of endpoint){
      promises.push(fetchFromApi(`genre/${e}/list`))
    }

   data = await Promise.all(promises);

    data.map(({ genres }) => {
        return genres.map(e => {
          return genreData[e.id] = { id: e.id, name:e.name }
        })
    })

   dispatch(getGenres(genreData));
  }, [dispatch])
/////////////////////////////////////////////////////////////////////////
  
  ///////////////////////////////////////////////// UseEffect to execute url configuration
  useEffect(()=> {
     fetchFromApi("configuration").then((data) => {
          const url = {
            backdropImageUrl : data?.images?.base_url + data?.images?.backdrop_sizes[3],
            posterImageUrl : data?.images?.base_url + data?.images?.poster_sizes[6],
            profileImageUrl : data?.images?.base_url + "original"
          }

          return dispatch(getConfigurationURL(url));
        })
  }, [dispatch])
  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////// UseEffect to execute genre configuration
  useEffect(() => {
      genreCall();
  }, [genreCall])
 ///////////////////////////////////////////////////////////////

  return <RouterProvider router={router}/>;
}

export default App;
