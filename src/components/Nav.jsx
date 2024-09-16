import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import HeaderBox from "../styles/headerStyles";
import NavButton from "../styles/NavButton";


const Nav = () => {
  return (

      <HeaderBox sx={{backgroundColor: "#FFF8E3"}}>

        <Stack direction="row" spacing={2}
        sx={{ width: 'auto', maxWidth: 1000}}
        >
            <NavButton variant="contained">
              <a href="/homepage">Home</a>
            </NavButton>

            <NavButton variant="contained">
              <a href="/articles">Articles</a>
            </NavButton>

            <NavButton variant="contained">
              <a href="/users">Users</a>
            </NavButton>

        </Stack>

    </HeaderBox>


  );
};

export default Nav;