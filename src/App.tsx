import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const initialArray = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [grid, setGrid] = React.useState<string[]>([...initialArray]);

  const gridAction = (pos: number) => {
    const newGrid = [...grid];
    if (newGrid[pos] === "") {
      newGrid[pos] = "X";
      if (pos < 8) {
        if (newGrid[pos + 1] !== "X") {
          newGrid[pos + 1] = "O";
        } else {
          for (let index = 0; index < newGrid.length; index++) {
            if (newGrid[index] === "") {
              newGrid[index] = "O";
              break;
            }
          }
        }
      } else {
        if (newGrid[0] === "") {
          newGrid[0] = "O";
        } else {
          for (let index = 0; index < newGrid.length; index++) {
            if (newGrid[index] === "") {
              newGrid[index] = "O";
              break;
            }
          }
        }
      }
      setGrid(newGrid);
    }
    checkGame(newGrid);
  };

  const checkGame = (newGrid: string[]) => {
    // newGrid.map((elem: string | null, index: number) => {
    for (let index = 0; index < newGrid.length; index++) {
      if (index < 3 && newGrid[index] !== "") {
        if (
          newGrid[index] === newGrid[index + 3] &&
          newGrid[index] === newGrid[index + 6]
        ) {
          if (newGrid[index] === "X") {
            alert("user WON");
          } else {
            alert("Machine WON");
          }
          setGrid([...initialArray]);
          break;
        }
        if (index === 0) {
          if (
            newGrid[index] === newGrid[index + 1] &&
            newGrid[index] === newGrid[index + 2]
          ) {
            if (newGrid[index] === "X") {
              alert("user WON");
            } else {
              alert("Machine WON");
            }
            setGrid([...initialArray]);
            break;
          }
          if (
            newGrid[index] === newGrid[index + 4] &&
            newGrid[index] === newGrid[index + 8]
          ) {
            if (newGrid[index] === "X") {
              alert("user WON");
            } else {
              alert("Machine WON");
            }
            setGrid([...initialArray]);
            break;
          }
        }
        if (index === 2) {
          if (
            newGrid[index] === newGrid[index + 2] &&
            newGrid[index] === newGrid[index + 4]
          ) {
            if (newGrid[index] === "X") {
              alert("user WON");
            } else {
              alert("Machine WON");
            }
            setGrid([...initialArray]);
            break;
          }
        }
      }
    }
  };

  return (
    <div className="App">
      <div className="d-flex justify-content-center align-items-center tic-tac-toe">
        <table>
          <tbody>
            <tr>
              <td onClick={() => gridAction(0)}>
                <span>{grid[0]}</span>
              </td>
              <td onClick={() => gridAction(1)}>
                <span>{grid[1]}</span>
              </td>
              <td onClick={() => gridAction(2)}>
                <span>{grid[2]}</span>
              </td>
            </tr>
            <tr>
              <td onClick={() => gridAction(3)}>
                <span>{grid[3]}</span>
              </td>
              <td onClick={() => gridAction(4)}>
                <span>{grid[4]}</span>
              </td>
              <td onClick={() => gridAction(5)}>
                <span>{grid[5]}</span>
              </td>
            </tr>
            <tr>
              <td onClick={() => gridAction(6)}>
                <span>{grid[6]}</span>
              </td>
              <td onClick={() => gridAction(7)}>
                <span>{grid[7]}</span>
              </td>
              <td onClick={() => gridAction(8)}>
                <span>{grid[8]}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
