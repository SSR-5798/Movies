import { Box } from '@mui/material'
import classes from "./Info.module.css"
import dayjs from "dayjs"

const Info = ({ data, mediaType }) => {

    const simplifiedTime = (mins) => {
        const hours = mins/60;
        const minutes = mins%60;
    
        return parseInt(hours)+"h "+minutes+"m"
    }


  return (
    <Box className={classes.info}>
    <Box className={classes.infoItem}>
      <strong>Status:</strong>
      <span>{data?.status}</span>
    </Box>

    {mediaType ==="movie" && <Box className={classes.infoItem}>
      <strong>Release Date:</strong> 
      <span>{dayjs(data?.release_date).format("MMM DD, YYYY")}</span>
    </Box>}

    {mediaType === "movie" && <Box className={classes.infoItem}>
      <strong>Runtime:</strong>
      <span>{simplifiedTime(data?.runtime)}</span>
    </Box>}

    {mediaType === "tv" && <Box className={classes.infoItem}>
      <strong>No of Episodes:</strong> 
      <span>{data?.number_of_episodes}</span>
    </Box>}

    {mediaType === "tv" && <Box className={classes.infoItem}>
      <strong>No of Seasons:</strong> 
      <span>{data?.number_of_seasons}</span>
    </Box>}
  </Box>
  )
}

export default Info