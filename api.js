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
        return data
      })
}

export const getComments = (article_id) => {
  
  return ncnewsApi
      .get(`/articles/${article_id}/comments`)
      .then(({data}) => {
        return data
      })

}

export const voteComment = (article_id) => {
  
  return ncnewsApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then((response) => {

    })
}

export const addComment = (article_id, username, commentBody) => {


  return ncnewsApi
    .post(`/articles/${article_id}/comments`, {author: username, body: commentBody})
    .then((response) => {
      return response
    })
}

export const deleteComment = (comment_id) => {
  
  return ncnewsApi
    .delete(`/comments/${comment_id}`,)
    .then((response) => {
      return response
    })
}