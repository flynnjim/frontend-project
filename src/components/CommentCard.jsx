import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavButton from "../styles/NavButton";
import {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader} from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useState } from "react";

const CommentCard = ({
    article_id,
    author,
    body,
    comment_id,
    created_at,
    votes
}) => {

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
                    
                    <Button>
                        Up vote
                    </Button>
                    <Button>
                        Down vote
                    </Button>

                </Box>
            </ArticleCardContent>

        </ArticleCardContainer>
        
      );
}

export default CommentCard