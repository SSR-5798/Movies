import { useRef } from "react";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Carousel.module.css";
import CircularRating from "../circularRating/CircularRating";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import Genre from "../genre/Genre";
import {useNavigate} from "react-router-dom";
import PosterFallback from "../../assets/no-poster.png"

const Carousel = ({ data, loading, endpoint, heading }) => {
  const { url } = useSelector((state) => state.home);
  const containerRef = useRef();

  const navigate = useNavigate();  

  const direction = (dir) => {
    const {current:container} = containerRef;
    const scrollAmount = dir === "left" ? container?.scrollLeft - container?.offsetWidth + 20 : container?.scrollLeft + container?.offsetWidth + 20;

    container?.scrollTo({
      left:scrollAmount,
      behavior:"smooth",
    })
  }

  const skeletonItem = () => {
    return (
      <Box className={classes.skeletonItem} sx={{ width: { md: "calc(25% - 15px)", lg: "calc(20% - 16px)" }}}>
        <Box className={`${classes.posterBlock} skeleton`}></Box>
        <Box className={classes.textBlock}>
          <Box className={`${classes.title} skeleton`}></Box>
          <Box className={`${classes.date} skeleton`}></Box>
        </Box>
      </Box>
    )
  }


  return (
   <Box className={classes.carousel}>
      <Card className={classes.card}>
        <BsFillArrowLeftCircleFill className={`${classes.carouselLeftNav} ${classes.arrow}`} onClick={() => direction("left")}/>
        <BsFillArrowRightCircleFill className={`${classes.carouselRightNav} ${classes.arrow}`} onClick={() => direction("right")}/>

        {heading && <Box className={classes.carouselTitle}>{heading}</Box>}

        {!loading ? <Stack
          className={classes.carouselItems}
          ref={containerRef}
          direction="row"
          sx={{
            gap: { xs: "10px", md: "20px" },
            overflow: { md: "hidden" },
            m: { md: 0 },
            p: { md: 0 },
          }}
        >
          {data?.map((e) => {
            return (
              <Box key={e?.id} className={classes.carouselItem} sx={{ width: { md: "calc(25% - 15px)", lg: "calc(20% - 16px)" }}}>
                <Box className={classes.posterBlock}>
                  <img
                    src={e?.poster_path ? url.posterImageUrl + e?.poster_path : PosterFallback}
                    alt=""
                    className={classes["lazy-load-image-background"]}
                    onClick={() => navigate(`/${e.media_type || endpoint}/${e.id}`)}
                  />
                  {e?.poster_path && <CircularRating
                    className={classes.circleRating}
                    rating={e?.vote_average.toFixed(1)}
                  />}

                  <Box className={classes.genres} sx={{display:{md:"flex"}, justifyContent:{md:"flex-end"}, flexFlow:{md:"wrap"}}}>
                    <Genre className={classes.genres} genreId ={e?.genre_ids.slice(0,2)}/>
                  </Box>
                </Box>

                <Box className={classes.textBlock}>
                  <Box className={classes.title} sx={{fontSize:{ xs:"16px", md:"20px"}, mb:{xs:"20px", md:"10px"}}}>{e?.title?.substring(0,20) || e?.name?.substring(0,20)}</Box>
                  {e?.poster_path && <Box className={classes.date}>{dayjs(e?.release_date || e?.first_air_date).format("MMM D, YYYY")}</Box>}
                </Box>
              </Box>
            );
          })}
        </Stack> 
        
        : 
        
        (<Box className={classes.loadingSkeleton}  sx={{ gap: { xs: "10px", md: "20px" }, overflow: { md: "hidden" }, m: { md: 0 }, p: { md: 0 }}}>
          
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          
        </Box>)}
      </Card>
    </Box>
  );
};

export default Carousel;
