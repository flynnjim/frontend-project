import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent";


const ArticleCardTypography = styled(Typography)(({theme}) => ({
        width: '100%',
        textAlign: 'left',
        margin: '5px',
        backgroundColor:
        '#F5EEE6',
        borderRadius: '5px', 
}))
const ArticleHeader = styled(Typography)(({theme}) => ({
        textAlign: 'left'
}))

const ArticleCardContent = styled(CardContent)(({theme}) => ({
        // border: '1px dashed black',
        backgroundColor: '#F3D7CA',
        // borderRadius: '15px'
}))

const ArticleCardAction = styled(CardContent)(({theme}) => ({
    //    border: '1px dashed black',
       backgroundColor: '#C9DABF',
    //    borderRadius: '10px'

}))

const ArticleCardContainer = styled(CardContent)(({theme}) => ({
    width: 350,
    marginBottom: 2,
    color: 'black',
    // borderRadius: '90px',
    // overflow: 'hidden'
}))


export {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader}