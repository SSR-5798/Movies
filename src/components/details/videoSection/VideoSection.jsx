import { useState } from "react"
import classes from "./VideoSection.module.css";
import { Box } from "@mui/material";
import Card from "../../UI/Card"
import Img from "../../img-comp/Img";
import { PlayIcon } from "../../playIcon/PlayIcon";
import VideoPopup from "../../videoPopup/VideoPopup";


const VideoSection = ({ videos }) => {

  const [video, setVideo] = useState(null);
  const [show, setShow] = useState(false);

  const popupShowHandler = (e) => {
    setShow(e => !e);
    setVideo(e?.key);
  }

  return (
    <Box className={classes.videosSection}>
      <Card>
        <Box className={classes.sectionHeading}>Official Videos</Box>
        <Box className={classes.videos}>
            {videos?.results?.map(e => {
              return (
                <Box key={e.id} className={classes.videoItem} sx={{width:{md:"25%"}}}>
                  <Img className={classes.img} src={`https://img.youtube.com/vi/${e.key}/mqdefault.jpg`} alt=""/>
                  <Box onClick={popupShowHandler.bind(this,e)}><PlayIcon videoSection/></Box>
                  <Box className={classes.title}>{e.name}</Box>    
                </Box>
            )})}
        </Box>
      </Card>

      <VideoPopup videoId={video} show={show} setShow={setShow} setVideo={setVideo}/>
    </Box>
  );
};

export default VideoSection;
