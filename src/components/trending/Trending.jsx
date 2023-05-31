import { useState } from "react";
import { Stack, Box } from "@mui/material";
import SwitchingTabs from "../switchingtabs/SwitchingTabs";
import classes from "./Trending.module.css";
import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";
import Card from "../UI/Card";

const Trending = () => {
  const [timePeriod, setTimePeriod] = useState("day");

  const { data, loading } = useFetch(`trending/all/${timePeriod}`);

  const tabHandler = (tabName) => {
    setTimePeriod(tabName === "Day" ? "day" : "week");
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m="30px 0 30px">
        <Box className={classes.title}>Trending</Box>
        <SwitchingTabs data={["Day", "Week"]} onTabChange={tabHandler} />
      </Stack>
      <Carousel data={data?.results} loading={loading} endpoint={timePeriod}/>
    </Card>
  );
};

export default Trending;
