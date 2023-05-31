import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import classes from "./Header.module.css";
import logo from "../../assets/movix-logo.svg"
import { SearchOutlined, Menu, CloseOutlined } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Card from "../UI/Card";

const Header = () => {

  const [headerStyle, setHeaderStyle] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [lastMaxScroll, setLastMaxScroll] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [enteredtext, setEnteredText] = useState("");

  useEffect(() => {
      window.scrollTo(0,0)
  }, [location])
 
  useEffect(()=>{
    const scrollY = () => {
       if(window.scrollY > 200){
         if(window.scrollY > lastMaxScroll){
             setHeaderStyle("hide");
         }else{
          setHeaderStyle("show")
         }
       }else{
        setHeaderStyle("top")
       }
       setLastMaxScroll(window.scrollY);
    }
     
     window.addEventListener("scroll", scrollY);
    
     return () => window.removeEventListener("scroll", scrollY)
  }, [lastMaxScroll])


  const toggleMenu = () => {
    setMobileMenu(e => !e);
  }

  const openSeachBar = () => {
    setSearchBar(true);
  }

  const closeSearchBar = () => {
    setSearchBar(false);
  }

  const navigateHandler= (mediaType) => {
      setMobileMenu(false);
      navigate(`/explore/${mediaType}`);
  }

  const onChangeHandler = (event) => {
    setEnteredText(event.target.value)
  }

  const submitHandler = (event) => {
    if(event.key === "Enter"){
      navigate(`/search/${enteredtext}`)
      setSearchBar(false);
      setEnteredText("")
    }
  }

  return (
    <header className={`${headerStyle === "top" && classes.top || headerStyle==="show" && classes.show || headerStyle==="hide" && classes.hide} ${mobileMenu ? classes.mobileView : ""}`}>
      <Card className={classes.contentWrapper}>
        <Box className={classes.logo}>
          <Link to="/"><img src={logo} alt=""/></Link> 
        </Box>
        
        <Box className={classes.menuItems} sx={{ display: { xs : "none", md:"flex"} }}>
          <li className={classes.menuItem} onClick={() => navigateHandler("movie")}>Movies</li>
          <li className={classes.menuItem} onClick={() => navigateHandler("tv")}>TV Shows</li>
          <li className={`${classes.menuItem} ${classes.searchIcon}`}><SearchOutlined onClick={openSeachBar}/></li>
        </Box>

        <Box className={classes.mobileMenuItems} sx={{ display : { xs:"flex", md:"none"} }}>
          <SearchOutlined onClick={openSeachBar}/>
          {!mobileMenu ? <Menu onClick={toggleMenu}/> : <CloseOutlined onClick={toggleMenu}/>}
        </Box>

        {searchBar && <Box className={classes.searchBar}>
           <input 
              type="text" 
              placeholder="Search for a movie or TV shows..."
              onChange = {onChangeHandler}
              value={enteredtext}
              onKeyUp={submitHandler}
              />
           <CloseOutlined onClick={closeSearchBar}/>
        </Box>}

      </Card>
    </header>
  )
}

export default Header;