import { Box } from "@mui/material";
import classes from "./PageNotFound.module.css";
import Card from "../UI/Card";

const PageNotFound = () => {
    return (
        <Box className={classes.pageNotFound}>
            <Card className={classes.card}>
                <span className={classes.bigText}>404</span>
                <span className={classes.smallText}>Page not found!</span>
            </Card>
        </Box>
    );
};

export default PageNotFound;