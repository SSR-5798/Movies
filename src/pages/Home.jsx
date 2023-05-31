import HeroBanner from "../components/herobanner/HeroBanner";
import Popular from "../components/popular/Popular";
import TopRated from "../components/toprated/TopRated";
import Trending from "../components/trending/Trending";

const Home = () => {
  return <>
    <HeroBanner/>
    <Trending/>
    <Popular/>
    <TopRated/>
  </>
}

export default Home;