import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const initialArray = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [grid, setGrid] = React.useState<string[]>([...initialArray]);

  React.useEffect(() => {
    checkGame(grid);
  }, [grid]);

  const gridAction = (pos: number) => {
    const newGrid = [...grid];
    if (newGrid[pos] === "") {
      newGrid[pos] = "X";
      setGrid(newGrid);
      const gridAfterUser = [...newGrid];
      if (pos < 8) {
        if (gridAfterUser[pos + 1] !== "X") {
          gridAfterUser[pos + 1] = "O";
        } else {
          for (let index = 0; index < gridAfterUser.length; index++) {
            if (gridAfterUser[index] === "") {
              gridAfterUser[index] = "O";
              break;
            }
          }
        }
      } else {
        if (gridAfterUser[0] === "") {
          gridAfterUser[0] = "O";
        } else {
          for (let index = 0; index < gridAfterUser.length; index++) {
            if (gridAfterUser[index] === "") {
              gridAfterUser[index] = "O";
              break;
            }
          }
        }
      }
      setGrid(gridAfterUser);
    }
  };

  const checkWho = (newGrid: string[], type: string) => {
    const user = type === "X" ? "User" : "Machine";
    if (
      newGrid[3] === type &&
      newGrid[3] === newGrid[4] &&
      newGrid[3] === newGrid[5]
    ) {
      alert(`${user} WON`);
      setGrid([...initialArray]);
      return false;
    }
    if (
      newGrid[6] === type &&
      newGrid[6] === newGrid[7] &&
      newGrid[6] === newGrid[8]
    ) {
      alert(`${user} WON`);
      setGrid([...initialArray]);
      return false;
    }
    for (let index = 0; index < newGrid.length; index++) {
      if (index < 3 && newGrid[index] === type) {
        if (
          newGrid[index] === newGrid[index + 3] &&
          newGrid[index] === newGrid[index + 6]
        ) {
          alert(`${user} WON`);
          setGrid([...initialArray]);
          return false;
        }
        if (index === 0) {
          if (
            newGrid[index] === newGrid[index + 1] &&
            newGrid[index] === newGrid[index + 2]
          ) {
            alert(`${user} WON`);
            return false;
          }
          if (
            newGrid[index] === newGrid[index + 4] &&
            newGrid[index] === newGrid[index + 8]
          ) {
            alert(`${user} WON`);
            setGrid([...initialArray]);
            return false;
          }
        }
        if (index === 2) {
          if (
            newGrid[index] === newGrid[index + 2] &&
            newGrid[index] === newGrid[index + 4]
          ) {
            alert(`${user} WON`);
            setGrid([...initialArray]);
            return false;
          }
        }
      }
    }
    return true;
  };
  const checkGame = (newGrid: string[]) => {
    checkWho(newGrid, "X") && checkWho(newGrid, "O");
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
