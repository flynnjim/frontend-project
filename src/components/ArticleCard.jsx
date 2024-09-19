import { ArticleCardContainer } from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useState } from "react";
import { voteArticle } from "../../api";
import { addComment } from "../../api";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import ArticleContentComponent from "./ArticleContentComponent";
import ArticleCardActionComponent from "./ArticleCardActionComponent";

const ArticleCard = ({
  article_img_url,
  author,
  comment_count,
  created_at,
  title,
  topic,
  article_id,
  body,
  votes,
}) => {
  const [articleComments, setArticleComments] = useState([]);
  const [displayComments, setDisplayComments] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("Display Comments");
  const [commentsFound, setCommentsFound] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [buttonVoteDisabled, setButtonVoteDisabled] = useState(false);
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [usernameForm, setUsernameForm] = useState("");
  const [commentBodyForm, setCommentBodyForm] = useState("");
  const [errorSubmitting, setErrorSubmitting] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [usernameLabel, setUsernameLabel] = useState("");
  const [commentBodyLabel, setCommentBodyLabel] = useState("");
  const [successfulCommentPost, setSuccessfulCommentPost] = useState(false);
  const [successfulDeletedComment, setSuccessfulDeletedComment] =
    useState(false);
  const [voteFailed, setVoteFailed] = useState(false);
  const [voteFailMessage, setVoteFailedMessage] = useState("");
  const [commentsNotLoaded, setCommentsNotLoaded] = useState(true);

  const username = "grumpy19";

  const handleRemoveContentDisplay = (delete_comment_id) => {
    setSuccessfulDeletedComment(true);
    setArticleComments((currentArticleComments) =>
      currentArticleComments.filter((comment) => {
        return comment.comment_id !== delete_comment_id;
      })
    );
    setTimeout(() => {
      setSuccessfulDeletedComment(false);
    }, 3000);
  };

  const submitComment = () => {
    setSuccessfulCommentPost(false);
    setErrorSubmitting(false);

    if (!usernameForm && !commentBodyForm) {
      setUsernameLabel("fill in username");
      setCommentBodyLabel("fill in comment text");
    } else if (!usernameForm) {
      setUsernameLabel("fill in username");
    } else if (!commentBodyForm) {
      setCommentBodyLabel("fill in comment text");
    } else {
      setSubmitButtonDisabled(true);

      addComment(article_id, usernameForm, commentBodyForm)
        .then((response) => {
          setErrorSubmitting(false);
          setSuccessfulCommentPost(true);
          setCommentBodyForm("");
          setUsernameForm("");

          const newComment = response.data[0];
          setArticleComments((comments) => [newComment, ...comments]);
        })
        .catch((err) => {
          setErrorSubmitting(true);
        })
        .finally(() => {
          setSubmitButtonDisabled(false);
          setTimeout(() => {
            setSuccessfulCommentPost(false);
          }, 5000);
        });
    }
  };

  const handleCommentBodyChange = (event) => {
    setCommentBodyLabel("");
    setSuccessfulCommentPost(false);
    setCommentBodyForm(event.target.value);
  };

  const handleUserNamechange = (event) => {
    setUsernameLabel("");
    setSuccessfulCommentPost(false);
    setUsernameForm(event.target.value);
  };

  const openCommentForm = () => {
    setCommentFormOpen(!commentFormOpen);
  };

  const addVote = () => {
    setButtonVoteDisabled(true);
    const updatedVotes = currentVotes + 1;
    setCurrentVotes(updatedVotes);

    voteArticle(article_id)
      .then((response) => {
        setVoteFailedMessage("");
        setVoteFailed(false);
      })
      .catch((err) => {
        setCurrentVotes(currentVotes);
        setVoteFailedMessage("failed to add vote");
        setVoteFailed(true);
      })
      .finally(() => {
        setButtonVoteDisabled(false);
      });
  };

  const getArticleComments = () => {
    if (commentsNotLoaded) {
      setIsLoadingComments(true);

      getComments(article_id)
        .then((response) => {
          setCommentsFound(true);
          setArticleComments(response);
          setCommentsNotLoaded(false);
          setDisplayComments(!displayComments);
          setButtonDisplay(
            buttonDisplay === "Hide comments"
              ? "Display Comments"
              : "Hide comments"
          );
        })
        .catch((err) => {
          setCommentsFound(false);
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    } else {
      setCommentsFound(true);
      setDisplayComments(!displayComments);
      setButtonDisplay(
        buttonDisplay === "Hide comments" ? "Display Comments" : "Hide comments"
      );
    }
  };

  return (
    <ArticleCardContainer body={body}>
      
      <ArticleContentComponent
        topic={topic}
        title={title}
        article_img_url={article_img_url}
        author={author}
        comment_count={comment_count}
        created_at={created_at}
        currentVotes={currentVotes}
        voteFailed={voteFailed}
      />

      <ArticleCardActionComponent
        body={body}
        article_id={article_id}
        getArticleComments={getArticleComments}
        isLoadingComments={isLoadingComments}
        buttonDisplay={buttonDisplay}
        addVote={addVote}
        buttonVoteDisabled={buttonVoteDisabled}
        openCommentForm={openCommentForm}
      />

      <CommentForm
        commentFormOpen={commentFormOpen}
        usernameForm={usernameForm}
        commentBodyForm={commentBodyForm}
        handleUserNamechange={handleUserNamechange}
        handleCommentBodyChange={handleCommentBodyChange}
        submitComment={submitComment}
        submitButtonDisabled={submitButtonDisabled}
        errorSubmitting={errorSubmitting}
        successfulCommentPost={successfulCommentPost}
        usernameLabel={usernameLabel}
        commentBodyLabel={commentBodyLabel}
      />

      <CommentList
        articleComments={articleComments}
        successfulDeletedComment={successfulDeletedComment}
        isLoadingComments={isLoadingComments}
        displayComments={displayComments}
        commentsFound={commentsFound}
        username={username}
        handleRemoveContentDisplay={handleRemoveContentDisplay}
      />
    </ArticleCardContainer>
  );
};

export default ArticleCard;
