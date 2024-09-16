import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const typographySX = {
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    backgroundColor:
    '#F5EEE6',
    borderRadius: 0.8,

}

function ArticleCard({
    article_img_url,
    author,
    comment_count,
    created_at,
    title,
    topic
}) {
    
      return (
    <Card sx={{
        width: 410,
        marginBottom: 2,
        }}
        >

        <CardContent sx={{border: '1px dashed black', backgroundColor: '#F3D7CA'}}>
        <Typography gutterBottom variant="body2" component="div" sx={{textAlign: 'left',}}>
         Topic: {topic}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'left'}}>
          {title}
        </Typography>
        </CardContent>
        
      <CardMedia sx={{ aspectRatio: 1 / 1 }} image={article_img_url} />

      <CardContent sx={{border: '1px dashed black', backgroundColor: '#F3D7CA'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

        <Typography gutterBottom variant="body2" component="div" sx={typographySX}>
          written by {author}
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={typographySX}>
         Comments: {comment_count}
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={typographySX}>
          Time created: {created_at}
        </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{border: '1px dashed black', backgroundColor: '#C9DABF'}}>
        <Button sx={{backgroundColor: '#F5EEE6'}}>More detail</Button>
      </CardActions>
    </Card>
  );
}

export default ArticleCard;