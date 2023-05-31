import { Box } from "@mui/material";
import classes from "./VideoPopup.module.css";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ videoId, show, setShow, setVideo}) => {

  const hidePopup = () => {
      setShow(e => !e);
      setVideo(null)
  }

  return ( 
  <Box className={`${classes.backdrop} ${show && classes.visible}`} onClick={hidePopup}>
    <Box className={classes.videoPlayer}>
      <Box className={classes.closeBtn}>Close</Box>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls width="100%" height="100%"/>
    </Box>
  </Box> 
  );
};

export default VideoPopup;
