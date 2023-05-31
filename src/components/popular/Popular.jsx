import { useState } from "react";
import { Stack, Box } from "@mui/material";
import Card from "../UI/Card";
import SwitchingTabs from "../switchingtabs/SwitchingTabs";
import classes from "./Popular.module.css";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`${endpoint}/popular`);

  const tabHandler = (tabName) => {
    setEndpoint(tabName === "Movies" ? "movie" : "tv");
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m="30px 0 30px">
        <Box className={classes.popular}>{`What's Popular`}</Box>
        <SwitchingTabs data={["Movies", "TV shows"]} onTabChange={tabHandler} />
      </Stack>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </Card>
  );
};

export default Popular;