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
      // setValues([100,50])
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

  // shuffles a new array
  const shuffle = () => {

    let elements = document.getElementsByClassName("bar");
    for (var i = 0; i < elements.length; i++)  elements[i].style.backgroundColor = "#eee";
    populateArray(Math.ceil(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 11))
  }

  // On click of sort button
  const sort = async () => {

    let values = document.getElementsByClassName("bar");

    setDisable(true)
    if (sort_type === "bubble")
      console.log(await bubble(values));

    else if (sort_type === "select")
      console.log(await selection(values));

    else if (sort_type === "insert")
      console.log(await insertion(values));
    else if (sort_type === "merge")
      console.log(await mergeSort(values));

    setDisable(false)
  }

  // bubble sort algorithm
  async function bubble(values) {
 
    for (let i = 0; i < values.length; i++) {

      for (let j = 0; j < values.length - (i + 1); j++) {
        let j1 = values[j];
        let j2 = values[j + 1];

        // focus color of first n & n+1 blocks
        j1.style.background = "#0d6efd";
        j2.style.background = "#0d6efd";
        await sleep((100.01 - speed) * 10)

        let j1_height = parseInt(j1.style.height);
        let j2_height = parseInt(j2.style.height);

        // checks if block n is greater that block n+1.  If so, swap
        if (j1_height > j2_height) {
          let tmp = j1_height;
          let tmp2 = j2_height;
          j1.style.height = tmp2 + "px";
          j2.style.height = tmp + "px";
          j1.style.background = "#FB1818";
          j2.style.background = "#FB1818";
          await sleep((100.01 - speed) * 10)
        }

        // change back block to default background
        j1.style.background = "#eee";
        j2.style.background = "#eee";
      }
      // update the block as solved
      values[values.length - (i + 1)].style.background = "#74EE66"
    }
    return "Bubble Sorted!"
  }

  // selection sort algorithm
  async function selection(values) { 

    for (let i = 0; i < values.length - 1; i++) {

      // default the min the the ith bar.  Here we store the index and value
      let min = [parseInt(values[i].innerHTML), i];
      values[i].style.background = "#FB1818";

      // loop the rest of the array to find if there is a smaller value than the default min
      for (let j = i + 1; j < values.length; j++) {
        values[j].style.background = "#0d6efd";
        let jValue = parseInt(values[j].innerHTML);
        await sleep((100.01 - speed) * 10);

        // if a min is found. update the min
        if (jValue < min[0]) {
          values[min[1]].style.background = "#eee";
          min = [jValue, j];
          values[j].style.background = "#FB1818";
        } else {
          values[j].style.background = "#eee";
        }

      }

      values[i].style.background = "#eee";
      // swap the ith value with the min value we found in the inner loop
      values[min[1]].style.height = (parseInt(values[i].innerHTML) * 3) + "px";
      values[min[1]].innerHTML = values[i].innerHTML;
      values[min[1]].style.background = "#eee";

      values[i].style.height = min[0] * 3 + "px";
      values[i].innerHTML = min[0];
      values[i].style.background = "#74EE66";
    }
    // by default the last value will be sorted so we just set this block to sorted
    values[values.length - 1].style.background = "#74EE66";

    return "Selection Sort Complete"
  }

  // insertion sort algorithm
  async function insertion(values) { 

    for (let i = 0; i < values.length - 1; i++) {

      values[i].style.background = "#74EE66";
      values[i + 1].style.background = "#74EE66";

      // if the 1+ith value is less than the ith item
      if (parseInt(values[i + 1].innerHTML) < parseInt(values[i].innerHTML)) {

        // loop to find appropriate spot
        for (let j = i + 1; j >= 1; j--) {

          values[j].style.background = "red";
          await sleep((100.01 - speed) * 10);
          let j0 = parseInt(values[j - 1].innerHTML);
          let j1 = parseInt(values[j].innerHTML);

          // if element at position j-1 is greater than element at positon j. we swap
          if (j1 < j0) {
            values[j].innerHTML = j0;
            values[j].style.height = (j0 * 3) + "px";
            values[j - 1].innerHTML = j1;
            values[j - 1].style.height = (j1 * 3) + "px";
            values[j].style.background = "#74EE66";
          }
          else {
            // the appropriate spot was found so we break out of the inner loop.
            values[j].style.background = "#74EE66";
            break;
          }
        }
      }
    }
    return "Insertion sort completed!"
  }

  async function  mergeSort(values) {

    if (values.length < 2)
      return values; 
    
    const firstHalf =   Array.prototype.slice.call(values,  0, Math.ceil(values.length / 2));
    const secondHalf =  Array.prototype.slice.call(values,  -Math.floor(values.length / 2)); 

    // only used for the animation, not part of the algorithm
    for (var i = 0; i < firstHalf.length; i++)  firstHalf[i].style.backgroundColor = "#eee";
    for (var i = 0; i < secondHalf.length; i++)  secondHalf[i].style.backgroundColor = "#000";
    await sleep((100.01 - speed) * 10)

    let merge = await mergeArrays(await mergeSort(firstHalf), await mergeSort(secondHalf)) ;  

    // await sleep((100.01 - speed) * 10)
    // only used for the animation, not part of the algorithm
    for (var i = 0; i < merge.length; i++)  { 
      values[i].style.height = (parseInt(merge[i].innerHTML) * 3)+"px"; 
      values[i].style.innerHTML = merge[i].innerHTML;  
      values[i].style.background ="rgb(116, 238, 102)"
    }   
    return merge;
  }

  async function mergeArrays(array1, array2) {
 
    let merged = [];

    // merge sorted arrays
    while (array1.length + array2.length != 0) {
      if (!array1[0]) {
        merged = merged.concat(array2);
        break;
      }
      else if (!array2[0]) {
        merged = merged.concat(array1);
        break;
      }
      else {  
        if (parseInt(array1[0].innerHTML) < parseInt(array2[0].innerHTML)) {
          merged.push(array1[0]);
          array1 = array1.slice(1);  
        } else {
          merged.push(array2[0]);
          array2 = array2.slice(1);
        }
        
      }
    }

    // // not necessary for the algorithm.  Only used for visualization
    // for (let i = 0; i < merged.length; i++) {
    //   merged.style.height = merged;
      
    // }

    return merged

  }

  // used to delay the loops to show the animation on the bars
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
