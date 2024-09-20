import Stack from "@mui/material/Stack";
import HeaderBox from "../styles/headerStyles";
import NavButton from "../styles/NavButton";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {

  const [activeButton, setActiveButton] = useState(null)
 

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }

  const getButtonStyle = (buttonName) => {
    return activeButton === buttonName ? {backgroundColor: 'yellow', borderRadius: 5} : {}
  }

  return (

      <HeaderBox sx={{backgroundColor: "#FFF8E3"}}>

        <Stack direction="row" spacing={2}
        sx={{ width: 'auto', maxWidth: 1000}}
        >
            <NavButton
            variant="contained" 
            onClick={() => handleButtonClick('home')}
            sx={getButtonStyle('home')}
            >
              <Link to="/">Home</Link>
            </NavButton>

            <NavButton
            variant="contained" 
            onClick={() => handleButtonClick('articles')}
            sx={getButtonStyle('articles')}
            >
              <Link to="/articles">Articles</Link>
            </NavButton>

            <NavButton
            variant="contained" 
            onClick={() => handleButtonClick('users')}
            sx={getButtonStyle('users')}
            >
              <Link to="/users">Users</Link>
            </NavButton>

        </Stack>

    </HeaderBox>


  );
};

export default Nav;