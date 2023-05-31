import classes from "./Footer.module.css";
import Card from "../UI/Card";
import { Box } from "@mui/material";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"
import { FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <Box className={classes.footer}>
      <Card>
        <Box className={classes.policy}>
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
            <span>About</span>
            <span>Blog</span>
            <span>FAQ</span>
        </Box>

        <Box className={classes.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur.
        </Box>

        <Box className={classes.icons}>
          <span><BsFacebook/></span>
          <span><BsInstagram/></span>
          <span><BsTwitter/></span>
          <span><FaLinkedin/></span>
        </Box>
      </Card>      
    </Box>
  )
}

export default Footer