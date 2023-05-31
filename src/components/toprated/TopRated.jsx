import { useState } from "react";
import { Stack, Box } from "@mui/material";
import SwitchingTabs from "../switchingtabs/SwitchingTabs";
import classes from "./TopRated.module.css";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";
import Card from "../UI/Card";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`${endpoint}/top_rated`);

  const tabHandler = (tabName) => {
    setEndpoint(tabName === "Movies" ? "movie" : "tv");
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m="30px 0 30px">
        <Box className={classes.topRated}>Top Rated</Box>
        <SwitchingTabs data={["Movies", "TV shows"]} onTabChange={tabHandler} />
      </Stack>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </Card>
  );
};

export default TopRated;