import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
const styles = {
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  gridList: {
    flexWrap: "noWrap",
    transform: "translateZ(0)",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
  },
  gridListTile: {
    width: "18rem !important",
    height: "18rem !important",
    marginRight: "5rem",
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.04,1.04)",
    },
  },

  image: {
    objectFit: "cover",
    width: "18rem",
    height: "18rem",
  },
};

function ContentRow(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.images.map((image) => (
          <GridListTile key={image.title} className={classes.gridListTile}>
            <a href={image.href}>
              <img
                src={image.url}
                alt={image.caption}
                className={classes.image}
              />

              <GridListTileBar
                title={image.caption}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(ContentRow);
