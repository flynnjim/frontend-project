import Stack from "@mui/material/Stack";
import HeaderBox from "../styles/headerStyles";
import NavButton from "../styles/NavButton";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  // const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();


  // const handleButtonClick = (buttonName) => {
  //   setActiveButton(buttonName);
  // };

  const currentCategory = location.pathname.split("/").pop(); 
  console.log(currentCategory);
  

  const getButtonStyle = (buttonName) => {
    return currentCategory === buttonName
      ? { backgroundColor: "yellow", borderRadius: "15px" }
      : {};
  };

  return (
    <HeaderBox sx={{ backgroundColor: "#FFF8E3" }}>
      <nav>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "auto", maxWidth: 1000 }}
        >
          <NavButton
            variant="contained"
            sx={getButtonStyle("")}
          >
            <Link to="/">Home</Link>
          </NavButton>

          <NavButton
            variant="contained"
            sx={getButtonStyle("articles")}
          >
            <Link to="/articles">Articles</Link>
          </NavButton>

          <NavButton
            variant="contained"
            sx={getButtonStyle("users")}
          >
            <Link to="/users">Users</Link>
          </NavButton>
        </Stack>
      </nav>
    </HeaderBox>
  );
};

export default Nav;
