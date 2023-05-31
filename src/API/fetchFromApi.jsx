import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

  const headers = {
    Authorization: "Bearer " + import.meta.env.VITE_APP_TMDB_TOKEN
  }


const fetchFromAPI = async(url, params) => {
   const { data } = await axios.get(`${BASE_URL}/${url}`, { headers, params});

   return data;
}

export default fetchFromAPI;