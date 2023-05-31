import classes from "./CrewDetails.module.css";
import { Box } from "@mui/material";

const CrewDetails = ({ crew, creator }) => {

  const director = crew?.filter((e) => e.job.toLowerCase() === "director");
  const writer = crew?.filter(e => e.job === "Screenplay" || e.job === "Writer" || e.job === "Story")
  const musicComposer =  crew?.filter((e) => e.job.includes("Music"));
  
  return (
    <>
        {director?.length > 0 && <Box className={classes.info}>
            <Box className={classes.infoItem}>
            <strong>Director:</strong>
            {director?.map((e, idx) => <span key={idx}>{director.length-1 !== idx ? e.name+"," : e.name}</span>)}
            </Box>
        </Box>}

        {writer?.length > 0 && <Box className={classes.info}>
            <Box className={classes.infoItem}>
            <strong>Writer:</strong>
            {writer?.map((e, idx) => <span key={idx}>{writer.length-1 !== idx ? e.name+"," : e.name}</span>)}
            </Box>
        </Box>}

        {creator?.length > 0 && <Box className={classes.info}>
            <Box className={classes.infoItem}>
            <strong>Creator:</strong>
            {creator?.map((e, idx) => <span key={idx}>{creator.length-1 !== idx ? e.name+"," : e.name}</span>)}
            </Box>
        </Box>}

        {musicComposer?.length > 0 && <Box className={classes.info}>
            <Box className={classes.infoItem}>
            <strong>Music Composer:</strong>
            {musicComposer?.map((e, idx) => <span key={idx}>{musicComposer.length-1 !== idx ? e.name+"," : e.name}</span>)}
            </Box>
        </Box>}
    </>
    
  )
}

export default CrewDetails