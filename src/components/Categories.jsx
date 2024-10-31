import HeaderBox from "../styles/headerStyles";
import Stack from "@mui/material/Stack";
import NavButton from "../styles/NavButton";
import { getTopics } from "../../api";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Categories = () => {
  const [topics, setTopics] = useState([]);
  const location = useLocation();


  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);


  const currentCategory = location.pathname.split("/").pop(); 
  

  const getButtonStyle = (buttonName) => {
    return currentCategory === buttonName ? { backgroundColor: 'yellow', borderRadius: '15px', color: 'black' } : { color: 'black' };
  };

  return (
    <HeaderBox>
      <h2>Categories</h2>
      <Stack direction="row" spacing={2} sx={{ width: "auto", maxWidth: 1000 }}>
        {topics.map((topic) => {
          const topicName = topic.slug;
          return (
            <NavButton
              variant="contained"
              key={topicName}
              sx={getButtonStyle(topicName)}
            >
              <Link 
                to={`/categories/${topicName}`} 
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {topicName}
              </Link>
            </NavButton>
          );
        })}
      </Stack>
    </HeaderBox>
  );
};

export default Categories;
