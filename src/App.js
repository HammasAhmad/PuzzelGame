// import { useState, useEffect, useRef } from "react";
import { ImageSplitter } from "./ImageSplitter";

function App() {
  // const [input, setInput] = useState('')
  // const [message, setMessage] = useState('')
  // const [randomNum, setRandomNum] = useState(null)
  // const dragItem = useRef();
  // const dragOverItem = useRef();
  // let val = (input * input)
  // const isAscending = (array) => array !== '' ? array?.map((a, i) => a > array[i + 1]).indexOf(true) === -1 : ''
  // function handler(e) {
  //   e.preventDefault()
  //   if (input === '') {
  //     return
  //   } else {
  //     let random = []
  //     for (let i = 0; i < val; i++) {
  //       random.push(i + 1)
  //     }
  //     let newArr = random.sort(() => Math.random() - 0.5)
  //     setRandomNum([...newArr])
  //   }
  // }
  // useEffect(() => {
  //   if (input <= 1 || input === '') {
  //     setRandomNum(null)
  //     setMessage('')
  //   }
  // }, [input])

  // useEffect(() => {
  //   if (isAscending(randomNum) !== true) {
  //     return
  //   } else {
  //     setMessage('welcome to the team')
  //     setRandomNum(null)
  //     setTimeout(() => {
  //       alert('welcome to the team')
  //     }, 300)
  //   }
  // }, [randomNum])

  // function handleDragStart(e, position) {
  //   dragItem.current = position;
  // }
  // function handleDragEnter(e, position) {
  //   dragOverItem.current = position;
  // }

  // function handleDrop() {
  //   const copyListItems = [...randomNum];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current, 1);
  //   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  //   setRandomNum(copyListItems);
  // }

  return (
    // <ImageSplitter />

    <div className="App">
       <div style={{ display: 'flex', justifyContent: 'center' }}>
      </div>
     <div className="w-full h-screen bg  shadow-xl">
        <div style={{ width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handler} style={{ margin: '20px 0' }}>
            <input className="input" type="number" min={1} value={input} onChange={(e) => {
              setInput('')
              if (e.target.value < 6) {
                setInput(e.target.value)
              }
            }} />
            <input className="btn" type="submit" value="submit" />
          </form>
          <h1>Puzzel Game</h1>
          <h3>Put Any number from 2 to 5</h3>


          <div className={
            (input < 3 ? 'main-gridtwo ' : '')
            || (input < 4 ? 'main-grid-three ' : '')
            || (input < 5 ? 'main-grid-four ' : '')
            || (input < 6 ? 'main-grid-five ' : '')
          }>
            {randomNum?.map((item, index) => {
              return <div draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDrop}
                key={index} className='grid-block'>
                {
                  item
                }
              </div>
            })}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
