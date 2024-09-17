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

export const getCurrentArticle = (article_id) => {
  return ncnewsApi
      .get(`/articles/${article_id}`)
      .then(({data}) => {
        // console.log(data);
        return data
      })
}