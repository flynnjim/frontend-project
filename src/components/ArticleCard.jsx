import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavButton from "../styles/NavButton";
import {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader} from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { voteComment } from "../../api";

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
               
              </ArticleCardAction>
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