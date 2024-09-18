import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavButton from "../styles/NavButton";
import {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader} from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { voteComment } from "../../api";
import HeaderBox from "../styles/headerStyles";
import TextField from "@mui/material/TextField";
import { addComment } from "../../api";
import { FormHelperText } from "@mui/material";

const ArticleCard = ({
    article_img_url,
    author,
    comment_count,
    created_at,
    title,
    topic,
    article_id,
    body,
    votes
}) => {

  
  const formatDate = new Date(created_at).toString().split(" ").slice(0, 5).join(" ")


    const [articleComments, setArticleComments] = useState([])
    const [displayComments, setDisplayComments] = useState(false)
    const [buttonDisplay, setButtonDisplay] = useState('Display Comments')
    const [commentsFound, setCommentsFound] = useState(true)
    const [isLoadingComments, setIsLoadingComments] = useState(false)
    const [currentVotes, setCurrentVotes] = useState(votes)
    const [buttonVoteDisabled, setButtonVoteDisabled] = useState(false)
    const [commentFormOpen, setCommentFormOpen] = useState(false)
    const [usernameForm, setUsernameForm] = useState('')
    const [commentBodyForm, setCommentBodyForm] = useState('')
    const [errorSubmitting, setErrorSubmitting] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)
    const [usernameLabel, setUsernameLabel] = useState('')
    const [commentBodyLabel, setCommentBodyLabel] = useState('')
    const [successfulCommentPost, setSuccessfulCommentPost] = useState(false)


    const submitComment = () => {
      setSuccessfulCommentPost(false)
      setErrorSubmitting(false)

      if (!usernameForm && !commentBodyForm) {
        setUsernameLabel('fill in username')
        setCommentBodyLabel('fill in comment text')
      } else if (!usernameForm ) {
        setUsernameLabel('fill in username')
      } else if (!commentBodyForm) {
        setCommentBodyLabel('fill in comment text')
      } else {

        setSubmitButtonDisabled(true)
        
        addComment(article_id, usernameForm, commentBodyForm)
        .then((response) => {   
          setErrorSubmitting(false)
          setSuccessfulCommentPost(true)
          setCommentBodyForm("")
          setUsernameForm("")
        })
        .catch((err) => {
          setErrorSubmitting(true)
        })
        .finally(() => {
          setSubmitButtonDisabled(false)
        })
      }
    }

    const handleCommentBodyChange = (event) => {
      setCommentBodyLabel('')
      setSuccessfulCommentPost(false)
      setCommentBodyForm(event.target.value)

    }

    const handleUserNamechange = (event) => {
      setUsernameLabel('')
      setSuccessfulCommentPost(false)
      setUsernameForm(event.target.value)
      
    }

  const openCommentForm = () => {
      setCommentFormOpen(!commentFormOpen)
  }

 
  const addVote = () => {
    setButtonVoteDisabled(true)
    const updatedVotes = currentVotes + 1
    setCurrentVotes(updatedVotes)

      voteComment(article_id)
        .then((response) => {
        })
        .catch((err) => {
          setCurrentVotes(currentVotes)
        })
        .finally(() => {
          setButtonVoteDisabled(false)
        })
  }


    const getArticleComments = () => {
      setIsLoadingComments(true)

        getComments(article_id)
          .then((response) => {
  
            setCommentsFound(true)
            setArticleComments(response)
            setDisplayComments(!displayComments)
            setButtonDisplay(buttonDisplay === "Hide comments" ? 'Display Comments': "Hide comments" )
              
              
          })
          .catch((err) => {
            setCommentsFound(false)
          })
          .finally(() => {
            setIsLoadingComments(false)
          })
 
      
    }

      return (

    <ArticleCardContainer body={body}>
        <ArticleCardContent>
        <ArticleHeader gutterBottom variant="body2" component="div">
         Topic: {topic}
        </ArticleHeader>
        <ArticleHeader gutterBottom variant="h5" component="div">
          {title}
        </ArticleHeader>
        </ArticleCardContent>
        
      <CardMedia sx={{ aspectRatio: 1 / 1, }} image={article_img_url} />

      <ArticleCardContent >
        <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>

        <ArticleCardTypography gutterBottom variant="body2" component="div" >
          written by {author}
        </ArticleCardTypography>
        <ArticleCardTypography gutterBottom variant="body2" component="div">
         Comments: {comment_count}
        </ArticleCardTypography>
        <ArticleCardTypography gutterBottom variant="body2" component="div" >
          Time created: {formatDate}
        </ArticleCardTypography>
        <ArticleCardTypography gutterBottom variant="body2" component="div" >
          Votes: {currentVotes}
        </ArticleCardTypography>
        </Box>
      </ArticleCardContent>

      {body === undefined ? (
          <ArticleCardAction>
          <Button sx={{backgroundColor: '#F5EEE6'}}>
            <a href={`/articles/${article_id}`}>See more details
            </a>
          </Button>
        </ArticleCardAction>
          )
          :
          (
            <>
              <ArticleCardContent>
                <ArticleHeader gutterBottom variant="body2" component="div">
                  {body}
                </ArticleHeader>
              </ArticleCardContent>

              <ArticleCardAction>
                <NavButton onClick={getArticleComments} disabled={isLoadingComments}>
                {buttonDisplay}
                </NavButton>
                <NavButton onClick={addVote} disabled={buttonVoteDisabled}>
                 Vote article
                </NavButton>
                <NavButton onClick={openCommentForm} disabled={false}>
                 Write Comment
                </NavButton>
               
              </ArticleCardAction>

              {commentFormOpen? (
                <>
                <HeaderBox sx={{display: 'flex', flexDirection: 'column'}} component="form" noValidate autoComplete="off">

                  <h1>comment form</h1>
                  <TextField
                    required
                    id="user-name-input"
                    label="user name"
                    value={usernameForm}
                    onChange={handleUserNamechange}
                  />
                  <FormHelperText sx={{ color: "red" }}>{usernameLabel}</FormHelperText>
                  <TextField
                    required
                    id="body-input"
                    label="comment text"
                    value={commentBodyForm}
                    onChange={handleCommentBodyChange}
                    multiline
                    maxRows={5}
                  />
                  <FormHelperText sx={{ color: "red" }}>{commentBodyLabel}</FormHelperText>

                  {errorSubmitting? (
                    <ArticleCardTypography gutterBottom variant="body2" component="div" >
                    Error submitting form, check username is correct and try again
                  </ArticleCardTypography>
                  ): null}
                  {successfulCommentPost? (
                    <ArticleCardTypography gutterBottom variant="body2" component="div" >
                    Your comment was successfully posted
                  </ArticleCardTypography>
                  ): null}
                </HeaderBox>

                <HeaderBox>
                  <NavButton onClick={submitComment} disabled={submitButtonDisabled}>
                 Submit comment
                </NavButton>
                </HeaderBox>
                </>
              ): null}
              {!commentsFound? (

              <ArticleCardTypography gutterBottom variant="body2" component="div" >
                no comments found
              </ArticleCardTypography>
              ): null}

            {isLoadingComments ? (
            <ArticleCardTypography gutterBottom variant="body2" component="div">
              Loading comments...
            </ArticleCardTypography>
          ) : null}

              {displayComments && commentsFound ? (
                <>
                <ul id="item-list" >
        {articleComments.map((comment) => {
            return (
                <li  key={comment.comment_id}>
                    <CommentCard
                    article_id={comment.article_id}
                    author={comment.author}
                    comment_count={comment.comment_count}
                    body={comment.body}
                    comment_id={comment.comment_id}
                    created_at={comment.created_at}
                    votes={comment.votes}
                    />
                </li>
            )
        })}
    </ul>
                </>
              ): (
                null
              )}
            </>
          )
      }
    </ArticleCardContainer>
    
  );
}

export default ArticleCard;