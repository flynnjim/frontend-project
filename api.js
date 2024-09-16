import axios from "axios";
const ncnewsApi = axios.create({
  baseURL: "https://backend-project-fmoa.onrender.com/api",
});

export const getAllArticles = () => {
    return ncnewsApi
        .get("/articles")
        .then(({data}) => {
            return data
        })
}