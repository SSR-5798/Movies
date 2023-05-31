import { useSelector } from "react-redux";
import { Box } from "@mui/material"
import classes from "./Genre.module.css";

const Genre = ({ genreId, className }) => {
 const { genres } = useSelector((state) => state.home);

  return (
   <Box className={`${classes.genres} ${className ? className : ""}`}>
      {genreId?.map(e => {
        return <Box className={classes.genre} key={e}>
           {genres[e] && genres[e].name}
        </Box>
      })}
   </Box>
  )
}

export default Genre;