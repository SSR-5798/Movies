import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner"
import classes from "./InfiniteScroll.module.css"

const InfiniteScrollComp = ({ children, data, fetchNextData, pageNum }) => {
  
    const loadingIndicator = () => {
      return <Box sx={{display:"flex", justifyContent:"center"}}>
        <ColorRing/>
      </Box>
    }
  
    return <InfiniteScroll
      dataLength={data?.results?.length || []}
      next={fetchNextData}
      hasMore={pageNum <= data?.total_pages}
      loader={loadingIndicator()}
      endMessage={
        <Box className={classes.showMessage}>
          <strong>Yay! You have seen it all</strong>
        </Box>
      }
    >
      {children}
    </InfiniteScroll>
};

  
export default InfiniteScrollComp;
