import axios from "axios";
const BACKEND_API = import.meta.env.VITE_BACKEND_API_URL;

const ncnewsApi = axios.create({
  baseURL: BACKEND_API,
});

export const getAllArticles = (category, sort, order_chosen) => {
  return ncnewsApi

    .get("/articles", {
      params: {
        topic_query: category,
        sort_by: sort,
        order: order_chosen,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

export const getCurrentArticle = (article_id) => {
  return ncnewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getComments = (article_id) => {
  return ncnewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const voteArticle = (article_id) => {
  return ncnewsApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then((response) => {
      return response;
    });
};

export const addComment = (article_id, username, commentBody) => {
  return ncnewsApi
    .post(`/articles/${article_id}/comments`, {
      author: username,
      body: commentBody,
    })
    .then((response) => {
      return response;
    });
};

export const deleteComment = (comment_id) => {
  return ncnewsApi.delete(`/comments/${comment_id}`).then((response) => {
    return response;
  });
};

export const getTopics = () => {
  return ncnewsApi.get("/topics").then(({ data }) => {
    return data;
  });
};

export const getUsers = () => {
  return ncnewsApi.get("/users").then(({data}) => {
    return data
  })
}