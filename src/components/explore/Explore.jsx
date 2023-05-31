import { useState, useEffect, useCallback } from "react";
import "./Explore.css";
import { Box,Stack } from "@mui/material";
import Card from "../UI/Card";
import {  useParams } from "react-router-dom";
import fetchFromApi from "../../API/fetchFromApi"
import useFetch from "../../hooks/useFetch";
import MovieCard from "../movie-card/MovieCard";
import InfiniteScrollComp from "../infiniteScrollComp/InfiniteScrollComp";
import Select from "react-select";


let filters = {}

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending"},
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {

  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ pageNum, setPageNum ] = useState(1);
  const [ genres, setGenres ] = useState(null)
  const [ sortBy, setSortBy ] = useState(null)
  const { mediaType } = useParams()
  const { data: genreData } = useFetch(`genre/${mediaType}/list`)


  const fetchInitialData = useCallback(async () => {
    
    setLoading(true);
    const resData = await fetchFromApi(`/discover/${mediaType}?page=1`, filters)
    setData(resData)
    setPageNum(page => page+1)
    setLoading(false)

  }, [mediaType])

  useEffect(() => { 
    setPageNum(1);
    fetchInitialData()
    setGenres(null)
    setSortBy(null)    
 }, [fetchInitialData])


 const fetchNextData = async () => {
    const resData = await fetchFromApi(`/discover/${mediaType}?page=${pageNum}`, filters);
    setData(e => {
      if(data?.results){
        return {
          ...e,
          page:pageNum,
          results:e?.results.concat(resData?.results)
        }
      }else{
        setData(e)
      }
    })
    setPageNum(page => page+1)
 }


 const changeHandler = (selectedItems, action) => { 

    if(action.name === "genres"){
      if(action.action !== "clear"){
        setGenres(selectedItems);
        let genreIds = selectedItems?.map(e => e.id)
        filters.with_genres = genreIds.toString() 
      }

      else{
        setGenres(null)
        delete filters.with_genres
      }
    }

    if(action.name === "sortBy"){
      if(action.action !== "clear"){
        setSortBy(selectedItems);
        filters.sort_by = selectedItems.value; 
      }
      else{
        setSortBy(null)
        delete filters.sort_by
      }
    }
    
    if(filters.with_genres === "") delete filters.with_genres;
    
    fetchInitialData()
 }


  return (
    <Box className="explorePage">
        <Card>
            <Stack justifyContent="space-between" alignItems="center" gap="10px" sx={{flexDirection:{xs:"column", md:"row"}, mb:{xs:"15px", md:"30px"}}}>
              <Box className="heading">{`Explore ${mediaType==="movie" ? "Movies" : "TV Shows"}`}</Box>
              <Stack gap="10px" alignItems="center" sx={{flexDirection:{xs:"column", md:"row"}, width:{xs:"100%", md:"auto" }}}>
                <Select
                  isMulti
                  name="genres"
                  value={genres}
                  closeMenuOnSelect={false}
                  options={genreData?.genres} //This will be an array
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={changeHandler}
                  placeholder="Select genres"
                  className="react-select-container genresDD"
                  classNamePrefix="react-select"
                />

                <Select
                  name="sortBy"
                  value={sortBy}
                  closeMenuOnSelect={true}
                  options={sortbyData} //This will be an array
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  isClearable={true}
                  onChange={changeHandler}
                  placeholder="Sort By"
                  className="react-select-container sortbyDD"
                  classNamePrefix="react-select"
                />
              </Stack>
            </Stack>
            
            {data?.results?.length > 0 ? (<InfiniteScrollComp data={data} fetchNextData={fetchNextData} pageNum={pageNum}>
              {!loading && <Stack direction="row" alignItems="center" flexWrap="wrap" mb="50px" 
                                  sx={{ gap: {xs:"10px", md:"20px"}, justifyContent:{xs:"center", md:"flex-start"}}}>
              {data?.results?.map((e,idx) => (
                  <MovieCard key={idx} data={e} endpoint={mediaType} explore={true}/>
              ))}
              </Stack>}
            </InfiniteScrollComp>) :  (<span className="resultNotFound">{!loading && "Sorry, Results not found!"}</span>)} 
        </Card>
    </Box>
  )
}

export default Explore