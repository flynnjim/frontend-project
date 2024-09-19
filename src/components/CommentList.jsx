import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavButton from "../styles/NavButton";
import {
  ArticleCardTypography,
  ArticleCardContent,
  ArticleCardAction,
  ArticleCardContainer,
  ArticleHeader,
} from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { voteArticle } from "../../api";
import HeaderBox from "../styles/headerStyles";
import TextField from "@mui/material/TextField";
import { addComment } from "../../api";
import { FormHelperText } from "@mui/material";
import CommentForm from "./CommentForm";

const CommentList = ({
  articleComments,
  successfulDeletedComment,
  isLoadingComments,
  displayComments,
  commentsFound,
  username,
  handleRemoveContentDisplay,
}) => {
  return (
    <>
      {!commentsFound && (
        <ArticleCardTypography gutterBottom variant="body2" component="div">
          No comments found
        </ArticleCardTypography>
      )}

      {isLoadingComments && (
        <ArticleCardTypography gutterBottom variant="body2" component="div">
          Loading comments...
        </ArticleCardTypography>
      )}

      {displayComments && commentsFound && (
        <>
          {successfulDeletedComment && (
            <ArticleCardTypography gutterBottom variant="body2" component="div">
              Comment was successfully deleted
            </ArticleCardTypography>
          )}

          <ul id="item-list">
            {articleComments.map((comment) => (
              <li key={comment.comment_id}>
                <CommentCard
                  article_id={comment.article_id}
                  author={comment.author}
                  comment_count={comment.comment_count}
                  body={comment.body}
                  comment_id={comment.comment_id}
                  created_at={comment.created_at}
                  votes={comment.votes}
                  username={username}
                  handleRemoveContentDisplay={handleRemoveContentDisplay}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CommentList;
