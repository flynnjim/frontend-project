import { getComments } from "../../api";
import { useState } from "react";
import { voteArticle } from "../../api";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import VoteArticle from "./VoteArticle";
import ArticleContent from "./ArticleContent";
import Trending from "./Trending";
import { useEffect } from "react";

const WholeArticlePage = ({
  selectedUser,
  article_img_url,
  author,
  comment_count,
  created_at,
  title,
  article_id,
  body,
  votes,
}) => {
  const [articleComments, setArticleComments] = useState([]);
  const [displayComments, setDisplayComments] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("View Comments");
  const [commentsFound, setCommentsFound] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [buttonVoteDisabled, setButtonVoteDisabled] = useState(false);
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [successfulDeletedComment, setSuccessfulDeletedComment] =
    useState(false);
  const [voteFailed, setVoteFailed] = useState(false);
  const [voteFailedMessage, setVoteFailedMessage] = useState("");
  const [commentsNotLoaded, setCommentsNotLoaded] = useState(true);

  const username = selectedUser;

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
            buttonDisplay === "Hide Comments"
              ? "View Comments"
              : "Hide Comments"
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
        buttonDisplay === "Hide Comments" ? "View Comments" : "Hide Comments"
      );
    }
  };

  const handleNewComment = (newComment) => {
    setArticleComments((comments) => [newComment, ...comments]);
  };

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

  const width = useWindowWidth();
  const isSmall = width < 768;
  const isMedium = width >= 768 && width < 1024;
  const isLarge = width >= 1024;

  return (
    <section className="rounded-lg overflow-hidden bg-bgcolor p-4 grid grid-cols-1 lg:grid-cols-[1fr,200px] lg:gap-40">
      <div className="">
        <ArticleContent
          title={title}
          article_img_url={article_img_url}
          author={author}
          comment_count={comment_count}
          created_at={created_at}
          currentVotes={currentVotes}
          voteFailed={voteFailed}
          voteFailedMessage={voteFailedMessage}
          body={body}
          addVote={addVote}
          isLarge={isLarge}
        />

        <VoteArticle
          body={body}
          getArticleComments={getArticleComments}
          isLoadingComments={isLoadingComments}
          buttonDisplay={buttonDisplay}
          openCommentForm={openCommentForm}
          created_at={created_at}
          currentVotes={currentVotes}
          comment_count={comment_count}
          voteFailed={voteFailed}
          voteFailedMessage={voteFailedMessage}
          addVote={addVote}
        />

        <CommentForm
          commentFormOpen={commentFormOpen}
          article_id={article_id}
          handleNewComment={handleNewComment}
          username={username}
        />

        <CommentList
          articleComments={articleComments}
          successfulDeletedComment={successfulDeletedComment}
          isLoadingComments={isLoadingComments}
          displayComments={displayComments}
          commentsFound={commentsFound}
          username={username}
          handleRemoveContentDisplay={handleRemoveContentDisplay}
          selectedUser={selectedUser}
        />
      </div>
      <div className="">
        <Trending />
      </div>
    </section>
  );
};

export default WholeArticlePage;
