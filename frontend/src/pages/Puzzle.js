import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//import mui stuff
import Grid from "@material-ui/core/Grid";

const shufflePieces = (pieces) => {
  const shuffled = [...pieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = tmp;
  }
  return shuffled;
};

function Puzzle(props) {
  const { puzzlePiecesProps } = props;
  const puzzlePieces = puzzlePiecesProps.pieces;
  const puzzleBackground = puzzlePiecesProps.background;

  const puzzlePiecesLength = puzzlePieces.length === 16 ? 98 : 48;

  const puzzleTilesUnshuffled = puzzlePieces.map((puzzlePiece, index) => ({
    id: `${index}`,
    content: `${puzzlePiece}`,
  }));

  const puzzleTiles = shufflePieces(puzzleTilesUnshuffled);

  const solveTiles = puzzlePieces.map((puzzlePiece, index) => ({
    id: `${index} + ${puzzlePieces.length}`,
    content: null,
  }));

  const handleDragEnd = (result) => {
    //handling dropping puzzle piece outside the boards
    if (result.destination === null) return;

    //get destination board
    const destination = result.destination.droppableId.startsWith("solve")
      ? solveTiles[result.destination.index]
      : puzzleTiles[result.destination.index];

    //get source board
    const source = result.source.droppableId.startsWith("solve")
      ? solveTiles[result.source.index]
      : puzzleTiles[result.source.index];

    //handling droping a piece in an non-empty box
    if (destination.content !== null) return;

    //swapping the image contents between source and destination
    destination.content = source.content;
    source.content = null;
  };

  return (
    <div
      id="puzzle"
      style={{
        textAlign: "center",
        // minHeight: "100vh",
      }}
    >
      <Grid
        container
        justify="center"
        style={{ display: puzzleTiles.length <= null ? "none" : "" }}
      >
        <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          <Grid item sm={6} xs={12}>
            <div
              style={{
                marginTop: 80,
                margin: "auto",
                width: 400,
                height: 400,
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: "grey",
                outline: "8px solid #0f499d",
              }}
            >
              {puzzleTiles.map((tile, index) => (
                <Droppable droppableId={"puzzle" + tile.id} key={tile.id}>
                  {(provided, snapshot) => (
                    <div
                      key={tile.id}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        width: puzzlePiecesLength,
                        height: puzzlePiecesLength,
                        display: "flex",
                        flexWrap: "wrap",
                        border: "1px solid white",
                        backgroundColor: snapshot.isDraggingOver
                          ? "aliceblue"
                          : null,
                      }}
                    >
                      <Draggable
                        key={tile.id}
                        draggableId={tile.id}
                        index={index}
                        isDragDisabled={!tile.content}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              width: puzzlePiecesLength,
                              height: puzzlePiecesLength,
                              backgroundImage: `url(${tile.content}`,
                              ...provided.draggableProps.style,
                            }}
                          ></div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </Grid>

          {/* Solve Board */}
          <Grid item sm={6} xs={12}>
            <div
              style={{
                marginTop: 80,
                margin: "auto",
                width: 400,
                height: 400,
                display: "flex",
                flexWrap: "wrap",
                backgroundImage: `url(${puzzleBackground})`,
                outline: "8px solid #0f499d",
              }}
            >
              {solveTiles.map((tile, index) => (
                <Droppable droppableId={"solve" + tile.id} key={tile.id}>
                  {(provided, snapshot) => (
                    <div
                      key={tile.id}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      draggable={false}
                      style={{
                        width: puzzlePiecesLength,
                        height: puzzlePiecesLength,
                        display: "flex",
                        flexWrap: "wrap",
                        border: "1px solid white",
                        backgroundColor: snapshot.isDraggingOver
                          ? "aliceblue"
                          : null,
                      }}
                    >
                      <Draggable
                        key={tile.id}
                        draggableId={tile.id}
                        index={index}
                        isDragDisabled={!tile.content}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              width: puzzlePiecesLength,
                              height: puzzlePiecesLength,
                              backgroundImage: `url(${tile.content}`,
                              ...provided.draggableProps.style,
                            }}
                          ></div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </Grid>
        </DragDropContext>
      </Grid>
    </div>
  );
}

export default Puzzle;
