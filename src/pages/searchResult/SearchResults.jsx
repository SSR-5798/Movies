import { useState, useEffect } from "react";
import classes from "./SearchResults.module.css";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import fetchFromAPI from "../../API/fetchFromApi";
import Card from "../../components/UI/Card";
import MovieCard from "../../components/movie-card/MovieCard";
import InfiniteScrollComp from "../../components/infiniteScrollComp/InfiniteScrollComp";


const SearchResults = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();

  // Once the page gets loaded for the very first time, this function should get executed
  useEffect(() => {
     const fetchInitialData = async () => {
       setLoading(true);
       setPageNum(1)
       const resData = await fetchFromAPI(`search/multi?query=${query}&page=${1}`)
       setData(resData)
       setPageNum(page => page+1)
       setLoading(false)
     }

     fetchInitialData()
  }, [query])


  const fetchNextData  = async () => {
   
    const resData = await fetchFromAPI(`search/multi?query=${query}&page=${pageNum}`);
    setData(prevData => {
      return {
        ...prevData,
        results : prevData?.results.concat(resData?.results)
      }
    })
    setPageNum(page => page+1) 
  }

  return (
    <Box className={classes.searchPage}>
      {!loading && <Card>
          <Box className={classes["search-heading"]}>{`Search Results of '${query}'`}</Box>
          {data?.results?.length > 0 ? (<InfiniteScrollComp data={data} fetchNextData={fetchNextData} pageNum={pageNum}>
            <Stack 
              direction="row" alignItems="center" flexWrap="wrap" mb="50px" 
              sx={{ gap: {xs: "10px", md: "20px"}, justifyContent:{xs:"center", md:"flex-start"}}}
              >
              {data?.results?.map((e, idx) => (
                <MovieCard key={idx} data={e} />
              ))}
            </Stack>
          </InfiniteScrollComp>) : (<span className={classes.resultNotFound}>Sorry, Results not found!</span>)}
      </Card>}
    </Box>
  );
};

export default SearchResults;
