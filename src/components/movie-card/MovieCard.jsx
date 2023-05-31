import classes from "./MovieCard.module.css";
import { Box } from "@mui/material";
import Img from "../img-comp/Img";
import { useSelector } from "react-redux";
import PosterImage from "../../assets/no-poster.png"
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CircularRating from "../../components/circularRating/CircularRating";
import Genre from "../../components/genre/Genre";

const MovieCard = ({ data, endpoint, explore }) => {

    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate();

    const clickHandler = (id, mediaType) => {
      navigate(`/${mediaType}/${id}`)
    }

  return (
    <Box className={classes.searchItem} sx={{width:{md:"calc(25% - 15px)", lg:"calc(20% - 16px)"}}}> 
      <Box className={classes.posterblock} onClick={clickHandler.bind(this, data?.id, data?.media_type || endpoint)}>
        <Img className={classes.img} src={data?.poster_path ? url?.posterImageUrl + data?.poster_path : PosterImage} alt=""/>

        {explore && <CircularRating className={classes.circleRating} rating={data?.vote_average.toFixed(1)}/>}
      </Box>

      <Box className={classes.name}>{data?.name?.substring(0,20) || data?.original_title?.substring(0,20)}</Box>
      {explore && <Genre className={classes.genres} genreId={data?.genre_ids.slice(0,2)}/>}
      <Box className={classes.date}>{dayjs(data?.first_air_date || data?.release_date).format("MMM DD, YYYY")}</Box>
    </Box>
  )
}

export default MovieCard