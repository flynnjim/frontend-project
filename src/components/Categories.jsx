import HeaderBox from "../styles/headerStyles";
import Stack from "@mui/material/Stack";
import NavButton from "../styles/NavButton";
import { getTopics } from "../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Categories = () => {
  const [topics, setTopics] = useState([]);
  const [activeButton, setActiveButton] = useState(null)
 
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }

  const getButtonStyle = (buttonName) => {
    return activeButton === buttonName ? {backgroundColor: 'yellow', borderRadius: 5} : {}
  }

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  return (
    <HeaderBox>
      <h2>categories</h2>
      <Stack direction="row" spacing={2} sx={{ width: "auto", maxWidth: 1000 }}>
        {topics.map((topic) => {
          const topicName = topic.slug;
          return (
            <NavButton
            variant="contained"
            key={topicName}
            onClick={() => handleButtonClick(topicName)}
            sx={getButtonStyle(topicName)}
            >
              <Link to={`/categories/${topicName}`}>{topicName}</Link>
            </NavButton>
          );
        })}
      </Stack>
    </HeaderBox>
  );
};

export default Categories;
