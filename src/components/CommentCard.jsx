import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavButton from "../styles/NavButton";
import {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader} from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useState } from "react";
import { deleteComment } from "../../api";
import { FormHelperText } from "@mui/material";



const CommentCard = ({
    article_id,
    author,
    body,
    comment_id,
    created_at,
    votes,
    username,
    handleRemoveContentDisplay
}) => {

    const [deleteLabel, setDeleteLabel] = useState('')
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false)

    const deleteThisComment = () => {
        setDeleteLabel("deleting comment")
        if (username === author) {
            setDeleteButtonDisabled(true)

            deleteComment(comment_id)
                .then(() => {
                    handleRemoveContentDisplay(comment_id)
                })
                .catch((err) => {
                    setDeleteLabel('failed to delete comment')
                })
                .finally(() => {
                    setDeleteButtonDisabled(false)
                })
        } else {
            setDeleteLabel('username does not match, you can only delete your own comments')
        }

    }

    const formatDate = new Date(created_at).toString().split(" ").slice(0, 5).join(" ")

    return (

        <ArticleCardContainer>
            <ArticleCardContent>

                <ArticleHeader gutterBottom variant="body1" component="div">
                    Author: {author}
                </ArticleHeader>

                <ArticleHeader gutterBottom variant="body2" component="div">
                    {formatDate}
                </ArticleHeader>

            </ArticleCardContent>
            
            <ArticleCardContent >
                <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
                    <ArticleHeader gutterBottom variant="body2" component="div">
                        {body}
                    </ArticleHeader>

                    <ArticleCardTypography gutterBottom variant="body2" component="div">
                        votes: {votes}
                    </ArticleCardTypography>
                    
                    <NavButton onClick={deleteThisComment} disabled={deleteButtonDisabled}>
                        Delete comment
                    </NavButton>
                    <FormHelperText sx={{ color: "red" }}>{deleteLabel}</FormHelperText>
                    


                </Box>
            </ArticleCardContent>

        </ArticleCardContainer>
        
      );
}

export default CommentCard