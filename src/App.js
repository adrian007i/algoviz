import './App.css';
import { Navbar, Button, Container, ThemeProvider } from 'react-bootstrap';
import Bar from "./Bar"
import React, { useState, useEffect } from 'react'; 

function App() {

  // state to keep track of the array and sort type
  const [sort_type, setSortType] = useState("bubble");
  const [values, setValues] = useState([]);

  // creates an array on page load
  useEffect(() => {
    if (values.length != 100) {
      populateArray(100)
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


  const sort = async () => { 

    if(sort_type === "bubble")
      console.log(await bubble());
  }


  async function bubble() {

    let values = document.getElementsByClassName("bar");

    for (let i = 0; i < values.length; i++) {

      for (let j = 0; j < values.length - (i + 1); j++) { 
        let j1 = values[j];
        let j2 = values[j+1];

        j1.style.background = "#74EE66"; 
        j2.style.background = "#74EE66"; 

        let j1_height = parseInt(j1.style.height);
        let j2_height = parseInt(j2.style.height);
 
        if (j1_height > j2_height) {  
          let tmp = j1_height;
          let tmp2 = j2_height; 
          j1.style.height = tmp2+"px";
          j2.style.height = tmp+"px";
          // animate order change
          // await sleep(1000) 
          // j1.style.background = "#F; 
          // j2.style.background = "#74EE66";  
        }
        console.log("cycle");
 
 
        
        await sleep(.01) 

        j1.style.background = "#eee"; 
        j2.style.background = "#eee"; 
      } 
      console.log("sq");   
    }
 
    return "Bubble Sorted!"
  } 

  async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

  return (
    <div className="App" id="dark">

      {/* <label class="switch">
        <input type="checkbox" checked />
        <div class="slider"></div>
      </label> */}
      <Navbar bg="dark" variant="dark">

        <div id="sort_buttons">
          <Button variant="primary" className={sort_type === "bubble" ? 'active' : ''} onClick={() => setSortType("bubble")}>Bubble</Button>{' '}
          <Button variant="primary" className={sort_type === "select" ? 'active' : ''} onClick={() => setSortType("select")}>Selection</Button>{' '}
          <Button variant="primary" className={sort_type === "insert" ? 'active' : ''} onClick={() => setSortType("insert")}>Insertion</Button>{' '}
          <Button variant="primary" className={sort_type === "merge" ? 'active' : ''} onClick={() => setSortType("merge")}>Merge</Button>{' '}
          <Button variant="primary" className={sort_type === "quick" ? 'active' : ''} onClick={() => setSortType("quick")}>Quick</Button>{' '}
        </div>
        <div id="slider">
          <Button variant="success" onClick={() => populateArray(100)}>SHUFFLE</Button>{' '}
          <Button variant="success" onClick={sort} >SORT</Button>{' '}
          {/* <input type="range" min="5" max="100" value="99" id="myRange"/>  */}
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
