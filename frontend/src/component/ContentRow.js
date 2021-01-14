import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  rows: {
    paddingBottom: "50px",
  },

  rowsTitle: {
    paddingBottom: "40px",
    justifyContent: "space-around",
  },

  image: {
    width: "18vw",
    height: "18vw",
    objectFit: "cover",
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.04,1.04)",
    },
  },
});

function ContentRow(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.rows}>
      <Grid item xs={11} className={classes.rowsTitle}>
        <Typography variant="h5">{props.rowName}</Typography>
      </Grid>
      <Grid item xs={1} className={classes.rowsTitle}>
        <Typography variant="body1">view more</Typography>
      </Grid>
      {props.images.map((image) => (
        <Grid key={image.title} item xs={3}>
          <a href="#">
            <img src={image.url} alt={image.title} className={classes.image} />
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

export default ContentRow;
