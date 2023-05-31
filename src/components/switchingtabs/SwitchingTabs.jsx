import { useState } from "react";
import { Box } from "@mui/material";
import classes from "./SwitchingTabs.module.css";

const SwitchingTabs = ({ data, onTabChange }) => {
  const [left, setLeft] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const itemClick = (tabName, index) => {
    setLeft(index * 100);
    setSelectedTab(index);

    onTabChange(tabName);
  };

  return (
    <Box className={classes.switchingTabs}>
      <Box className={classes.tabItems}>
        {data.map((tabName, index) => {
          return <span key={tabName}
              className={`${classes.tabItem} ${selectedTab === index && classes.active}`}
              onClick={() => itemClick(tabName, index)}
            >
              {tabName}
            </span>
        })}
        <span className={classes.movingBg} style={{ left: left }}></span>
      </Box>
    </Box>
  );
};

export default SwitchingTabs;
