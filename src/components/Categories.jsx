import HeaderBox from "../styles/headerStyles";
import Stack from "@mui/material/Stack";
import NavButton from "../styles/NavButton";
import { getTopics } from "../../api";
import { useEffect, useState } from "react";

const Categories = () => {
  const [topics, setTopics] = useState([]);

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
            <NavButton variant="contained" key={topicName}>
              <a href={`/categories/${topicName}`}>{topicName}</a>
            </NavButton>
          );
        })}
      </Stack>
    </HeaderBox>
  );
};

export default Categories;
