import { useState, useEffect } from "react";
import classes from "./HeroBanner.module.css";
import Card from "../UI/Card";
import { Box, Stack } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import Img from "../img-comp/Img";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const HeroBanner = () => {

  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);
  const [background, setBackground] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      const index = Math.floor(Math.random() * 20);
      setBackground(`${url?.backdropImageUrl + data?.results?.[index]?.backdrop_path}`);
  }, [data, url])

  function clickHandler() {
    if (enteredText.trim().length === 0) {
      return;
    }

    navigate(`/search/${enteredText}`);
    setEnteredText("")
  }

  return (
    <Box className={classes.heroBanner} sx={{ height: { xs: "400px", md: "700px" } }}>
      {!loading && <Box className={classes["backdrop-img"]}>
          <Img className={classes["lazy-load-image-background"]} src={background}/>
        </Box>}

        <Box className={classes["opacity-layer"]} />

        <Card>
          <Stack className={classes.heroBannerContent}>
            <Box sx={{ fontSize: { xs: "50px", md: "90px" }, fontWeight: "700", mb: { xs: "10px", md: "0" } }}>
              Welcome.
            </Box>

            <Box className={classes.subTitle} sx={{ fontSize: { md: "24px" } }}>
              {" "}
              Millions of movies, TV shows and people to discover. Explore now.
            </Box>

            <Box className={classes.searchInput}>
              <input
                type="text"
                placeholder="Search for a movie or TV shows"
                onChange={(e) => setEnteredText(e.target.value)}
                value={enteredText}
              />
              <button onClick={clickHandler}>Search</button>
            </Box>
          </Stack>
        </Card>
    </Box>
  );
};

export default HeroBanner;
