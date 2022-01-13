import './App.css';
import { Navbar, Button, Container, ThemeProvider } from 'react-bootstrap';
import Bar from "./Bar"
import React, { useState, useEffect } from 'react';

function App() {

  // state to keep track of the array and sort type
  const [sort_type, setSortType] = useState("bubble");
  const [values, setValues] = useState([]);
  const [disable, setDisable] = React.useState(false);
  const [speed, setSpeed] = React.useState(98);

  // creates an array on page load
  useEffect(() => {
    const vw = Math.ceil(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 11)
    if (values.length != vw) {
      populateArray(vw); 
    }
  });

  // generates a new random array
  const populateArray = (n) => {

    let values = new Array(n);
    for (let i = 0; i < n; i++) {
      values[i] = Math.ceil(Math.random() * 100) + 1
    }
    setValues(values)
  }

  const shuffle = () => {

    let elements = document.getElementsByClassName("bar");
    for (var i = 0; i < elements.length; i++)  elements[i].style.backgroundColor = "#eee";
    populateArray(Math.ceil(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 11))
  }

  const sort = async () => {

    setDisable(true)
    if (sort_type === "bubble")
      console.log(await bubble());

    else if (sort_type === "select")
      console.log(await selection());

    else if (sort_type === "insert")
      console.log(await insertion());

    setDisable(false)
  }

  async function bubble() {

    let values = document.getElementsByClassName("bar");

    for (let i = 0; i < values.length; i++) {

      for (let j = 0; j < values.length - (i + 1); j++) {
        let j1 = values[j];
        let j2 = values[j + 1];

        j1.style.background = "#0d6efd";
        j2.style.background = "#0d6efd";
        await sleep((100.01 - speed) * 10)

        let j1_height = parseInt(j1.style.height);
        let j2_height = parseInt(j2.style.height);

        if (j1_height > j2_height) {
          let tmp = j1_height;
          let tmp2 = j2_height;
          j1.style.height = tmp2 + "px";
          j2.style.height = tmp + "px";
          j1.style.background = "#FB1818";
          j2.style.background = "#FB1818";
          await sleep((100.01 - speed) * 10)
        }

        j1.style.background = "#eee";
        j2.style.background = "#eee";
      }
      values[values.length - (i + 1)].style.background = "#74EE66"
    }

    return "Bubble Sorted!"
  }

  async function selection() {
    let values = document.getElementsByClassName("bar");

    for (let i = 0; i < values.length - 1; i++) {
      let min = [parseInt(values[i].innerHTML), i];
      values[i].style.background = "#FB1818";


      for (let j = i + 1; j < values.length; j++) {
        values[j].style.background = "#0d6efd";
        let jValue = parseInt(values[j].innerHTML);
        await sleep((100.01 - speed) * 10);

        // update min
        if (jValue < min[0]) {
          values[min[1]].style.background = "#eee";
          min = [jValue, j];
          values[j].style.background = "#FB1818";
        } else {
          values[j].style.background = "#eee";
        }

      }

      values[i].style.background = "#eee";
      // swap values 
      values[min[1]].style.height = (parseInt(values[i].innerHTML) * 3) + "px";
      values[min[1]].innerHTML = values[i].innerHTML;
      values[min[1]].style.background = "#eee";

      values[i].style.height = min[0] * 3 + "px";
      values[i].innerHTML = min[0];
      values[i].style.background = "#74EE66";
    }

    values[values.length - 1].style.background = "#74EE66";

    return "Selection Sort Complete"
  }

  async function insertion() {
    let values = document.getElementsByClassName("bar");

   

    for (let i = 0; i < values.length -1; i++) {   

      values[i].style.background = "#74EE66";
      values[i+1].style.background = "#74EE66";

      if(parseInt(values[i+1].innerHTML) <  parseInt(values[i].innerHTML)){ 

        // loop to find appropriate spot
        for (let j = i+1; j >= 1; j--) { 
          
          values[j].style.background = "red";
          await sleep((100.01 - speed) * 10);
          let j0 = parseInt(values[j-1].innerHTML); 
          let j1 = parseInt(values[j].innerHTML);

          // values[j].style.background = "rgb(255, 165, 0);";
          // values[j-1].style.background = "rgb(255, 165, 0);";
  
          if(j1 < j0){  
            values [j].innerHTML = j0;
            values [j].style.height = (j0 * 3)+"px";
            values[j-1].innerHTML = j1; 
            values [j-1].style.height = (j1 * 3)+"px"; 
            values[j].style.background = "#74EE66"; 
          }
          else{
            values[j].style.background = "#74EE66";
            break;
          }
        }
      }  
    }
    return "Insertion sort completed!"
  }

  async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }

  return (
    <div className="App" id="dark">

      <Navbar bg="dark" variant="dark">

        <div id="sort_buttons">
          <Button variant="primary" className={sort_type === "bubble" ? 'active' : ''} onClick={() => setSortType("bubble")}>Bubble</Button>{' '}
          <Button variant="primary" className={sort_type === "select" ? 'active' : ''} onClick={() => setSortType("select")}>Selection</Button>{' '}
          <Button variant="primary" className={sort_type === "insert" ? 'active' : ''} onClick={() => setSortType("insert")}>Insertion</Button>{' '}
          <Button variant="primary" className={sort_type === "merge" ? 'active' : ''} onClick={() => setSortType("merge")}>Merge</Button>{' '}
          <Button variant="primary" className={sort_type === "quick" ? 'active' : ''} onClick={() => setSortType("quick")}>Quick</Button>{' '}
        </div>
        <div id="slider">
          <input type="range" id="speed" name="volume" min="1" max="100" defaultValue={speed} onChange={(e) => setSpeed(e.target.value)} disabled={disable} />
          <label htmlFor="volume" id="range_label">Speed</label>
          <Button variant="success" onClick={sort} disabled={disable}  >SORT</Button>{' '}
          <Button variant="success" disabled={disable} onClick={shuffle}>SHUFFLE</Button>{' '}


        </div>
      </Navbar>

      <div id="bars">
        {values.map((el, i) =>
          <Bar class="bar" value={el} key={i} id={i} />
        )}
      </div>
    </div>
  );
}

export default App;
