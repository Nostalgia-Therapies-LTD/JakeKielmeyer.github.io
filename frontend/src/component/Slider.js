import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../../config/sliderSetting";

class Puzzle extends Component {
  state = {
    puzzleTiles: [],
    tileWidth: 0,
    tileHeight: 0,
    tile: 0,
    fullImg: [],
    refName: " ",
  };

  shufflePieces(pieces) {
    const shuffled = [...pieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }

    return shuffled;
  }

  splitter = (tile, ref, cWidth, cHeight) => {
    const canvas = this.refs.myCanvas;
    const img = document.getElementById(ref);

    // getting image natural size
    let imageWidth = img.naturalWidth;
    let imageHeight = img.naturalHeight;
    // getting tile size
    let tileWidth = parseInt(imageWidth / tile);
    let tileHeight = parseInt(imageHeight / tile);
    // getting canvas size
    let canvasWidth = cWidth;
    let canvasHeight = cHeight;

    this.setState({
      refName: ref,
      tileWidth: canvasWidth,
      tileHeight: canvasHeight,
      tile: tile,
    });

    canvas.width = String(cWidth);
    canvas.height = String(cHeight);
    const ctx = canvas.getContext("2d");

    // creating the puzzle pieces for
    let p = [];
    for (let j = 0; j < tile; j++) {
      for (let i = 0; i < tile; i++) {
        ctx.clearRect(0, 0, imageWidth, imageHeight);
        ctx.drawImage(
          img,
          i * tileWidth,
          j * tileHeight,
          tileWidth,
          tileHeight,
          0,
          0,
          canvasWidth,
          canvasHeight
        );
        p.push(canvas.toDataURL());
      }
    }

    this.setState({ fullImg: [...p] });

    let shuffled = this.shufflePieces(p);

    this.setState({ puzzleTiles: [...shuffled] });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Nav />
        <div
          className="container-fluid p-4 bg-white"
          style={{ minHeight: "100vh" }}
        >
          <h1 className="display-3 text-center pb-5">Puzzle</h1>

          <div className="mb-5 pb-5">
            <Slider {...settings}>
              {images.map((image) => {
                return (
                  <PuzzleCard
                    src={image.src}
                    id={image.id}
                    onClick={this.splitter}
                  />
                );
              })}
            </Slider>
          </div>

          <canvas ref="myCanvas" className="d-none"></canvas>
        </div>
          )