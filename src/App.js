import { useState, useEffect, useRef } from "react";
import './app.css'

function App() {
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [randomNum, setRandomNum] = useState(null)
  const dragItem = useRef();
  const dragOverItem = useRef();
  let val = (input * input)
  console.log(message)
  const isAscending = (array) => array !== '' ? array?.map((a, i) => a > array[i + 1]).indexOf(true) === -1 : ''
  function handler(e) {
    e.preventDefault()
    if (input === '') {
      return
    } else {
      let random = []
      for (let i = 0; i < val; i++) {
        random.push(i + 1)
      }
      let newArr = random.sort(() => Math.random() - 0.5)
      setRandomNum([...newArr])
    }
  }
  useEffect(() => {
    if (input <= 1 || input === '') {
      setMessage('')
      setRandomNum(null)
    }
    setMessage('')
  }, [input])

  useEffect(() => {
    if (isAscending(randomNum) !== true) {
      setMessage('')
    } else {
      setMessage('welcome to the team')
      alert(message)
    }
  })

  function handleDragStart(e, position) {
    dragItem.current = position;
  }
  function handleDragEnter(e, position) {
    dragOverItem.current = position;
  }

  function handleDrop() {
    const copyListItems = [...randomNum];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setRandomNum(copyListItems);
  }

  return (
    <div className="App">
      <form onSubmit={handler} style={{ margin: '20px 0' }}>
        <input className="input" type="number" min={2} value={input} onChange={(e) => {
          if (e.target.value < 6) {
            setInput(e.target.value)
          }
        }} />
        <input className="btn" type="submit" value="submit" />
      </form>
      <h1>Puzzel Game</h1>


      <div className={
        (input < 3 ? 'main-gridtwo ' : '')
        || (input < 4 ? 'main-grid-three ' : '')
        || (input < 5 ? 'main-grid-four ' : '')
        || (input < 6 ? 'main-grid-five ' : '')
      }>
        {randomNum?.map((item, index) => {
          return <div draggable
            // onDragStart={(e) => handleDragStart(e, i)}
            // onDragEnter={(e) => handleDragEnter(e, i)}
            // onDragOver={(e) => handleDragOver(e, i)}
            // onDragEnd={(e) => handleDrop(e, i)}
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
  );
}

export default App;
