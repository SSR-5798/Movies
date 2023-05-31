import { useState } from "react";
import classes from "./DetailBanner.module.css";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Img from "../../img-comp/Img"
import Card from "../../UI/Card";
import Genre from "../../genre/Genre";
import CircularRating from "../../circularRating/CircularRating"
import dayjs from "dayjs"
import { PlayIcon } from "../../playIcon/PlayIcon";
import Info from "./Info";
import CrewDetails from "./CrewDetails";
import VideoPopup from "../../videoPopup/VideoPopup";

const DetailBanner = ({ data, loading, mediaType, crew, id }) => {
  
  const [video, setVideo] = useState(null);
  const [show, setShow] = useState(false);
  const { url } = useSelector((state) => state.home);

  const popupShowHandler = () => {
    setShow(e => !e);
    setVideo(id);
  }

  const genre_id = data?.genres.map(e => e.id);

  return (
    <Box className={classes.detailsBanner} sx={{mb:{md:"20px"}, pt:{md:"120px"}, minHeight:{md:"700px"}}}>

      <Box className={classes["backdrop-img"]}>
        <Img className={classes.lazyLoadImageBackground} src={url?.backdropImageUrl + data?.backdrop_path}/>
      </Box>

      <Box className={classes["opacity-layer"]} />

      <VideoPopup videoId={video} show={show} setShow={setShow} setVideo={setVideo}/>

     <Card>
         {!loading ? (<Stack sx={{position: "relative", flexDirection:{xs:"column",md:"row"}, gap:{xs:"25px", md:"50px"}}}>
            <Box className={classes.left}>
               <Box className={classes.posterImg}>
                  <Img className={classes.lazyLoadImageBackground} src={url?.posterImageUrl + data?.poster_path} alt=""/>
               </Box>
            </Box>

            <Box className={classes.right}>
                <Box sx={{fontSize:{xs:"28px", md:"34px"}, lineHeight:{xs:"40px", md:"44px"}}}>
                  {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                </Box>
                <Box className={classes.subtitle} sx={{fontSize:{md:"20px"}, lineHeight:{md:"28px"}}}>{data?.tagline}</Box>
                <Genre className={classes.genres} genreId={genre_id}/>

                <Stack direction="row" gap="20px" alignItems="center" mb={4}>
                  <CircularRating className={classes.circleRating} rating={data?.vote_average?.toFixed(1)} details/>
                  <Box className={classes.playbtn} onClick={popupShowHandler}>
                    <PlayIcon/>
                    <span className={classes.text}>Watch Trailer</span>
                  </Box>
                </Stack>

                <Box className={classes.overview}>
                  <Box className={classes.heading}>Overview</Box>
                  <Box className={classes.description}>{data?.overview}</Box>
                </Box>

                <Info data={data} mediaType={mediaType}/>

                <CrewDetails crew={crew} creator={data?.created_by}/>
            </Box>
        </Stack>) : 
      (
        <Stack className={classes.wrapper} sx={{position: "relative", flexDirection:{xs:"column",md:"row"}, gap:{xs:"25px", md:"50px"}}}>
            <Box className={`${classes.left} skeleton`}></Box>
            <Box className={classes.right}>
              <Box className={`${classes.row} skeleton`}></Box>
              <Box className={`${classes.row} skeleton`}></Box>
              <Box className={`${classes.row} skeleton`}></Box>
              <Box className={`${classes.row} skeleton`}></Box>
              <Box className={`${classes.row} skeleton`}></Box>
              <Box className={`${classes.row} skeleton`}></Box>
            </Box>
        </Stack>
      )}
      </Card>
    </Box>
  );
};

export default DetailBanner;