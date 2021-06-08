import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { useHistory } from "react-router";

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
    boxSizing: "border-box",
    border: "2px solid rgba(245, 245, 245, 0.76)",
    borderRadius: "2%",
    boxShadow: "0 4px 8px 0",
  },

  title: {
    overflow: "hidden",
    fontSize: "1.3rem",
    lineHeight: "24px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  titleBar: {
    left: "2px",
    right: "2px",
    bottom: "2px",
    height: "4em",
    display: "flex",
    position: "absolute",
    background: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    fontFamily: "KOW, sans-serif",
    border: "2%",
    transition: "height .7s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .9)",
      height: "98.5%",
    },
  },
};

function ContentRow(props) {
  const history = useHistory();
  const { classes } = props;
  return (
    <div className={classes.row}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.images.map((image) => (
          <GridListTile key={image.title} className={classes.gridListTile}>
            {/* <a href={image.href}> */}
            {/* <a onClick={history.push(`/${image.href}`)}> */}
            <img
              src={image.url}
              alt={image.caption}
              className={classes.image}
              onClick={() =>
                history.push({
                  pathname: `/${image.href}`,
                  genreDash: `${image.caption}`,
                })
              }
            />

            <GridListTileBar
              title={image.caption}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              style={{ textAlign: "center" }}
            />
            {/* </a> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(ContentRow);
