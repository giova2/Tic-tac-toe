import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Grid, Tr, Td } from "./styled/styledGrid";
import Swal from "sweetalert2";

const initialArray: string[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function App() {
  const [grid, setGrid] = React.useState<string[][]>([
    [...initialArray[0]],
    [...initialArray[1]],
    [...initialArray[2]],
  ]);

  React.useEffect(() => {
    checkGame(grid);
  }, [grid]);

  const gridAction = (posX: number, posY: number) => {
    const newGrid: string[][] = [];
    grid.map((row: string[], index: number) => (newGrid[index] = [...row]));
    if (newGrid[posX][posY] === "") {
      newGrid[posX][posY] = "X";
      setGrid(newGrid);
      const gridAfterUser = [[...newGrid[0]], [...newGrid[1]], [...newGrid[2]]];
      if (posX < 2 && gridAfterUser[posX + 1][posY] === "") {
        gridAfterUser[posX + 1][posY] = "O";
      } else {
        let flagX = true;
        for (let indexX = 0; indexX < 3; indexX++) {
          if (flagX) {
            for (let indexY = 0; indexY < 3; indexY++) {
              if (gridAfterUser[indexX][indexY] === "") {
                gridAfterUser[indexX][indexY] = "O";
                flagX = false;
                break;
              }
            }
          }
        }
      }
      setGrid(gridAfterUser);
    }
  };

  const weHaveAWinner = (user: string) => {
    const body =
      user === "User"
        ? Swal.fire("Congrats!", `${user} WON`, "success")
        : Swal.fire("Try again!", `${user} WON`, "warning");
    setGrid([[...initialArray[0]], [...initialArray[1]], [...initialArray[2]]]);
  };

  const gameDraw = () => {
    Swal.fire("Game finished", "is a DRAW", "info");
    setGrid([[...initialArray[0]], [...initialArray[1]], [...initialArray[2]]]);
  };

  const checkWho = (newGrid: string[][], type: string) => {
    const user = type === "X" ? "User" : "Machine";
    const countingV = [0, 0, 0];
    let diagonalDesc = 0;
    let countMoves = 0;
    for (let indexX = 0; indexX < 3; indexX++) {
      let countingH = 0;
      //for each loop we will have same row different column, then, if we count 3 occurrences of the same type, we have a horizontal tic tac toe
      for (let indexY = 0; indexY < 3; indexY++) {
        if (newGrid[indexX][indexY] === type) {
          countingH++;
          if (indexX === indexY) {
            //it means that we have an element at the diagonal
            diagonalDesc++;
          }
          countingV[indexY]++;
        }
        countMoves =
          newGrid[indexX][indexY] === "" ? countMoves : countMoves + 1;
      }
      if (countingH === 3) {
        //tictactoe horizontal
        weHaveAWinner(user);
        return false;
      }
    }
    if (
      newGrid[2][0] === type &&
      newGrid[1][1] === type &&
      newGrid[0][2] === type
    ) {
      //tictactoe diagonal superior
      weHaveAWinner(user);
      return false;
    }
    if (diagonalDesc === 3) {
      //tictactoe diagonal inferior
      weHaveAWinner(user);
      return false;
    }
    for (let indexV = 0; indexV < 3; indexV++) {
      if (countingV[indexV] === 3) {
        // tictactoe vertical
        weHaveAWinner(user);
        return false;
      }
    }
    if (countMoves === 9) {
      gameDraw();
      return false;
    }
    return true;
  };

  const checkGame = (newGrid: string[][]) => {
    checkWho(newGrid, "X") && checkWho(newGrid, "O");
    console.log({ grid });
  };

  return (
    <div className="App">
      <div className="d-flex justify-content-center align-items-center tic-tac-toe">
        <Grid>
          <tbody>
            <Tr>
              <Td onClick={() => gridAction(0, 0)}>
                <span>{grid[0][0]}</span>
              </Td>
              <Td onClick={() => gridAction(0, 1)}>
                <span>{grid[0][1]}</span>
              </Td>
              <Td onClick={() => gridAction(0, 2)}>
                <span>{grid[0][2]}</span>
              </Td>
            </Tr>
            <Tr>
              <Td onClick={() => gridAction(1, 0)}>
                <span>{grid[1][0]}</span>
              </Td>
              <Td onClick={() => gridAction(1, 1)}>
                <span>{grid[1][1]}</span>
              </Td>
              <Td onClick={() => gridAction(1, 2)}>
                <span>{grid[1][2]}</span>
              </Td>
            </Tr>
            <Tr>
              <Td onClick={() => gridAction(2, 0)}>
                <span>{grid[2][0]}</span>
              </Td>
              <Td onClick={() => gridAction(2, 1)}>
                <span>{grid[2][1]}</span>
              </Td>
              <Td onClick={() => gridAction(2, 2)}>
                <span>{grid[2][2]}</span>
              </Td>
            </Tr>
          </tbody>
        </Grid>
      </div>
    </div>
  );
}

export default App;
