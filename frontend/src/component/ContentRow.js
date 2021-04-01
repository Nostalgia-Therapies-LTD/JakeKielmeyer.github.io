import withStyles from "@material-ui/core/styles/withStyles";
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
      transform: "scale(1.04,1.01)",
    },
  },

  image: {
    objectFit: "cover",
    width: "17.8rem",
    height: "17.6rem",
    boxSizing:"border-box",
    border: "2px solid rgba(245, 245, 245, 0.76)",
    borderRadius: "2%",
    boxShadow: "0 4px 8px 0",
    
  },

  }


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
                style={{textAlign:"center"}}
              />
            </a>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(ContentRow);
