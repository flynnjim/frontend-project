import { Box } from "@mui/material";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";


const DropDown = ({setArticlesData, setOrder, setCommentCountSelected, commentCountSelected, articlesData, setSortByChosen}) => {

    const handleOrderChange = (event) => {
        const value = event.target.value;
        if (commentCountSelected) {
          if (value === "ASC") {
            const sortedArticles = [...articlesData].sort(
              (a, b) => b.comment_count - a.comment_count
            );
            setArticlesData(sortedArticles);
          } else {
            const sortedArticles = [...articlesData].sort(
              (a, b) => a.comment_count - b.comment_count
            );
            setArticlesData(sortedArticles);
          }
        } else {
          setOrder(value);
        }
      };
    
      const handleSortChange = (event) => {
        if (event.target.value === "comment_count") {
          setCommentCountSelected(true);
          const sortedArticles = [...articlesData].sort(
            (a, b) => b.comment_count - a.comment_count
          );
          setArticlesData(sortedArticles);
        } else {
          setCommentCountSelected(false);
          setSortByChosen(event.target.value);
        }
      };

      return (
    
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  background: "#F5EEE6",
                  borderRadius: '30px',
                  padding: 2,
                  justifyContent: 'center',
                  width: '100%',
                  margin: '10px',
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormHelperText sx={{ color: "black", textAlign: "center" }}>
                    Sort by
                  </FormHelperText>
                  <Select
                    defaultValue=""
                    label="Sort By"
                    onChange={handleSortChange}
                    sx={{
                      width: "200px",
                      marginLeft: "0",
                    }}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"created_at"}>Date</MenuItem>
                    <MenuItem value={"comment_count"}>Comments</MenuItem>
                    <MenuItem value={"votes"}>Votes</MenuItem>
                  </Select>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormHelperText sx={{ color: "black", textAlign: "center" }}>
                    Order
                  </FormHelperText>
                  <Select
                    defaultValue=""
                    label="ascending or descending"
                    onChange={handleOrderChange}
                    sx={{
                      width: "200px",
                      marginLeft: "0",
                    }}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"ASC"}>Ascending</MenuItem>
                    <MenuItem value={"DESC"}>Descending</MenuItem>
                  </Select>
                </Box>
              </Box>
      )
}

export default DropDown