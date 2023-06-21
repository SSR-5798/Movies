import DetailBanner from "../components/details/detailsBanner/DetailBanner";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Cast from "../components/details/cast/Cast";
import VideoSection from "../components/details/videoSection/VideoSection";
import DetailsCarousel from "../components/details/detailsCarousel/DetailsCarousel";

const Details = () => {

const { mediaType, id} = useParams();
const { data, loading } = useFetch(`${mediaType}/${id}`); // details banner
const { data : credits} = useFetch(`${mediaType}/${id}/credits`) // credits
const { data: videos } = useFetch(`${mediaType}/${id}/videos`) // video section
const { data: similarVideos, laoding:similarVideosLoading } = useFetch(`${mediaType}/${id}/similar`) // similar videos
const { data: recommendVideos, laoding:recommendVideosLoading } = useFetch(`${mediaType}/${id}/recommendations`) // recommended videos

  return (
    <>
      <DetailBanner data={data} loading={loading} mediaType={mediaType} crew={credits?.crew} id={videos?.results[0]?.key}/>
      <Cast cast={credits?.cast}/>
      <VideoSection videos={videos}/>
      <DetailsCarousel videos={similarVideos?.results} mediaType={mediaType} loading={similarVideosLoading} 
        heading={`Similar ${mediaType==="movie" ? "Movies" : "TV Shows"}`}/>
      <DetailsCarousel videos={recommendVideos?.results} mediaType={mediaType} loading={recommendVideosLoading} heading="Recommendations"/>
    </>
  )
}

export default Details;