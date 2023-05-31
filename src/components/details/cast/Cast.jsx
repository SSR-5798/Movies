import { Box } from "@mui/material";
import classes from "./Cast.module.css";
import Card from "../../UI/Card";
import { useSelector } from "react-redux";
import Img from "../../img-comp/Img";
import avatar from "../../../assets/avatar.png"

const Cast = ({ cast }) => {

    const { url } = useSelector((state) => state.home);

  return (
   <Box className={classes.castSection}>
    <Card>
        <Box className={classes.sectionHeading}>Top Cast</Box>
        <Box className = {classes.listItems} sx={{m:{md:0}, p:{md:0}}}>
          {cast?.map(e => {
            return <Box key={e.id} className={classes.listItem}>
               <Box className={classes.profileImg}>
                    <Img className={classes.img} src={`${e?.profile_path ? url?.profileImageUrl + e?.profile_path : avatar}`} alt=""/>
               </Box>

               <Box className={classes.name}>{e?.name}</Box>

               <Box className={classes.character}>{e?.character}</Box>
            </Box>
          })}
        </Box>
    </Card>    
   </Box>
  )
}

export default Cast;