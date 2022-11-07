import React from 'react'

export const ImageSplitter = () => {
    const [input, setInput] = React.useState('')
    const [imga, setImg] = React.useState('')
    const [disable, setDisAble] = React.useState(false)
    const [seconds, setSeconds] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);
    const imgArr = [
        {
            id: 1,
            img: 'https://pixabay.com/get/gfe44f948f47da3a3749bd009fa26f254128dfaa5cffa411585ed061fd2d4800ac5a1f097dc6e270ccddd801dfb0f8cecf17e4f1c2e74e78aa7e3f20baaa57658c56d77dae041d95e813842b9aaf6d276_640.jpg',
        },
        {
            id: 2,
            img: 'https://pixabay.com/get/g286833db14e433a9fbdb589a14381c13ce723c1004301ffe0934642f0a91057818b93c42df8a9e148f5facd5f9c65f43b95c164cd0c4997f2e3d50fd06e011c505671d6c72d0b0008977882c36d6f560_640.jpg',

        },
        {
            id: 3,
            img: 'https://pixabay.com/get/g03758e112c08e3c27524a0865c3871e4224b3b1baa170dd41645661d8135034034f080762fd8f5ef351810779141d96199325fbae71e8a265874663b86da532c1254089b7d077ddcae44079b1cc89efb_640.jpg',
        },
        {
            id: 4,
            img: 'https://pixabay.com/get/ga03001c34d2146c8d05415fe1348bd7ee94235fff7b3c92ba326a9b911a2bfd6b606c609942793d243e643bbdb4a6d7f4762c385abb5f204c87bea728c1a6ac2656cdbe865b7075dfbe970556df8b6ac_640.jpg'
        },
        {
            id: 5,
            img: 'https://pixabay.com/get/g2cea037a912475cfd8202ad6436f3cffaec1f58344746db584e14d2b3e32e9d70533e2c51f54b83f9b92eb38c3bc311568293a3e7670f8fa504fa0655875bf214b7caaee4ba69b8f66c4488c741665e9_640.jpg'
        },


    ]

    const PUZZLE_HOVER_TINT = "#009900";
    let img = new Image()
    const canvas = document.querySelector("#canvas");
    const stage = canvas?.getContext("2d");
    let difficulty = input;
    let pieces;
    let puzzleWidth;
    let puzzleHeight;
    let pieceWidth;
    let pieceHeight;
    let currentPiece;
    let currentDropPiece;
    let mouse;
    function images() {
        setImg('')
        let randomNu = Math.floor(Math.random() * 5) + 1
        let i = imgArr.find((it) => {
            if (it.id == randomNu) {
                return it
            }
        })
        if (i !== undefined) {
            setImg(i)
        }
    }
    React.useEffect(() => {
        if (input <= 1 || input === '') {
            setInput('')
            setImg('')
            setDisAble(false)
            document.getElementById('canvas').classList.add('kk')
        }
    }, [input])

    function reset() {
        setInput('')
        setImg('')
        setDisAble(false)
        window.location.replace('/')
        document.getElementById('canvas').classList.add('kk')
    }
    React.useEffect(() => {
        let interval;
        if (seconds > 59) {
            clearInterval(interval);
            setSeconds(0)
            setMinutes(pre => pre + 1)
        }
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);
    React.useEffect(() => {
        img.src = ''
        images()
    }, [localStorage.getItem('seconds')])
    var handle = (e) => {
        e.preventDefault();
        document.getElementById('canvas').classList.remove('kk')
        images()
        if (input === '') {
            alert('Please Enter A Number from 2 to 5')
            window.location.replace('/')
        } else {

            img.addEventListener("load", onImage, false);
            img.src = imga?.img
            function initPuzzle() {
                pieces = [];
                mouse = {
                    x: 0,
                    y: 0
                };
                currentPiece = null;
                currentDropPiece = null;
                stage.drawImage(
                    img,
                    0,
                    0,
                    puzzleWidth,
                    puzzleHeight,
                    0,
                    0,
                    puzzleWidth,
                    puzzleHeight
                );
                // createTitle("Click to Start Puzzle");
                buildPieces();
            }

            function setCanvas() {
                canvas.width = puzzleWidth;
                canvas.height = puzzleHeight;
                canvas.style.border = "1px solid black";
            }

            function onImage() {
                pieceWidth = Math.floor(img.width / difficulty);
                pieceHeight = Math.floor(img.height / difficulty);
                puzzleWidth = pieceWidth * difficulty;
                puzzleHeight = pieceHeight * difficulty;
                setCanvas();
                initPuzzle();
            }

            function buildPieces() {
                let i;
                let piece;
                let xPos = 0;
                let yPos = 0;
                for (i = 0; i < difficulty * difficulty; i++) {
                    piece = {};
                    piece.sx = xPos;
                    piece.sy = yPos;
                    pieces.push(piece);
                    xPos += pieceWidth;
                    if (xPos >= puzzleWidth) {
                        xPos = 0;
                        yPos += pieceHeight;
                    }
                }
                document.getElementById('click').onclick = shufflePuzzle;
            }

            function shufflePuzzle() {
                pieces = shuffleArray(pieces);
                stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
                let xPos = 0;
                let yPos = 0;
                for (const piece of pieces) {
                    piece.xPos = xPos;
                    piece.yPos = yPos;
                    stage.drawImage(
                        img,
                        piece.sx,
                        piece.sy,
                        pieceWidth,
                        pieceHeight,
                        xPos,
                        yPos,
                        pieceWidth,
                        pieceHeight
                    );
                    stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
                    xPos += pieceWidth;
                    if (xPos >= puzzleWidth) {
                        xPos = 0;
                        yPos += pieceHeight;
                    }
                }
                document.onpointerdown = onPuzzleClick;
            }

            function checkPieceClicked() {
                for (const piece of pieces) {
                    if (
                        mouse.x < piece.xPos ||
                        mouse.x > piece.xPos + pieceWidth ||
                        mouse.y < piece.yPos ||
                        mouse.y > piece.yPos + pieceHeight
                    ) {
                        //PIECE NOT HIT
                    } else {
                        return piece;
                    }
                }
                return null;
            }

            function updatePuzzle(e) {
                currentDropPiece = null;
                if (e.layerX || e.layerX == 0) {
                    mouse.x = e.layerX - canvas.offsetLeft;
                    mouse.y = e.layerY - canvas.offsetTop;
                } else if (e.offsetX || e.offsetX == 0) {
                    mouse.x = e.offsetX - canvas.offsetLeft;
                    mouse.y = e.offsetY - canvas.offsetTop;
                }
                stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
                for (const piece of pieces) {
                    if (piece == currentPiece) {
                        continue;
                    }
                    stage.drawImage(
                        img,
                        piece.sx,
                        piece.sy,
                        pieceWidth,
                        pieceHeight,
                        piece.xPos,
                        piece.yPos,
                        pieceWidth,
                        pieceHeight
                    );
                    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
                    if (currentDropPiece == null) {
                        if (
                            mouse.x < piece.xPos ||
                            mouse.x > piece.xPos + pieceWidth ||
                            mouse.y < piece.yPos ||
                            mouse.y > piece.yPos + pieceHeight
                        ) {
                            //NOT OVER
                        } else {
                            currentDropPiece = piece;
                            stage.save();
                            stage.globalAlpha = 0.4;
                            stage.fillStyle = PUZZLE_HOVER_TINT;
                            stage.fillRect(
                                currentDropPiece.xPos,
                                currentDropPiece.yPos,
                                pieceWidth,
                                pieceHeight
                            );
                            stage.restore();
                        }
                    }
                }
                stage.save();
                stage.globalAlpha = 0.6;
                stage.drawImage(
                    img,
                    currentPiece.sx,
                    currentPiece.sy,
                    pieceWidth,
                    pieceHeight,
                    mouse.x - pieceWidth / 2,
                    mouse.y - pieceHeight / 2,
                    pieceWidth,
                    pieceHeight
                );
                stage.restore();
                stage.strokeRect(
                    mouse.x - pieceWidth / 2,
                    mouse.y - pieceHeight / 2,
                    pieceWidth,
                    pieceHeight
                );
            }

            function onPuzzleClick(e) {
                if (e.layerX || e.layerX === 0) {
                    mouse.x = e.layerX - canvas.offsetLeft;
                    mouse.y = e.layerY - canvas.offsetTop;
                } else if (e.offsetX || e.offsetX === 0) {
                    mouse.x = e.offsetX - canvas.offsetLeft;
                    mouse.y = e.offsetY - canvas.offsetTop;
                }
                currentPiece = checkPieceClicked();
                if (currentPiece !== null) {
                    stage.clearRect(
                        currentPiece.xPos,
                        currentPiece.yPos,
                        pieceWidth,
                        pieceHeight
                    );
                    stage.save();
                    stage.globalAlpha = 0.9;
                    stage.drawImage(
                        img,
                        currentPiece.sx,
                        currentPiece.sy,
                        pieceWidth,
                        pieceHeight,
                        mouse.x - pieceWidth / 2,
                        mouse.y - pieceHeight / 2,
                        pieceWidth,
                        pieceHeight
                    );
                    stage.restore();
                    document.onpointermove = updatePuzzle;
                    document.onpointerup = pieceDropped;
                }
            }

            function gameOver() {
                document.onpointerdown = null;
                document.onpointermove = null;
                document.onpointerup = null;


                // setTimeout(() => {
                // alert('welcome to ak team')
                // }, 500)
                // initPuzzle();
                setInput('')
            }

            function pieceDropped(e) {
                document.onpointermove = null;
                document.onpointerup = null;
                if (currentDropPiece !== null) {
                    let tmp = {
                        xPos: currentPiece.xPos,
                        yPos: currentPiece.yPos
                    };
                    currentPiece.xPos = currentDropPiece.xPos;
                    currentPiece.yPos = currentDropPiece.yPos;
                    currentDropPiece.xPos = tmp.xPos;
                    currentDropPiece.yPos = tmp.yPos;
                }
                resetPuzzleAndCheckWin();
            }

            function resetPuzzleAndCheckWin() {
                stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
                let gameWin = true;
                for (let piece of pieces) {
                    stage.drawImage(
                        img,
                        piece.sx,
                        piece.sy,
                        pieceWidth,
                        pieceHeight,
                        piece.xPos,
                        piece.yPos,
                        pieceWidth,
                        pieceHeight
                    );
                    stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
                    if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
                        gameWin = false;
                    }
                }
                if (gameWin) {
                    setTimeout(gameOver, 500);
                    setTimeout(() => {
                        alert('WelCome to the AK team')
                    }, 600);
                    setSeconds(pre => localStorage.setItem('seconds', JSON.stringify(pre)))
                    setMinutes(pre => localStorage.setItem('min', JSON.stringify(pre)))
                    setTimeout(() => {
                        window.location.replace('/')
                    }, 800);
                    setIsActive(false)
                }
            }

            function shuffleArray(o) {
                for (
                    var j, x, i = o.length;
                    i;
                    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
                );
                return o;
            }

            function updateDifficulty(e) {
                difficulty = e.target.value;
                pieceWidth = Math.floor(img.width / difficulty);
                pieceHeight = Math.floor(img.height / difficulty);
                puzzleWidth = pieceWidth * difficulty;
                puzzleHeight = pieceHeight * difficulty;
                gameOver();
            }
            document.querySelector("#difficulty").oninput = updateDifficulty;
            setDisAble(true)
        }
    }


    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: '0' }}>
            {
                localStorage.getItem("seconds") && <div className='btn timer'>
                    Last Time (0{localStorage.getItem('min')}m:{localStorage.getItem('seconds') >= 10 ? localStorage.getItem('seconds') : '0'.concat(localStorage.getItem('seconds'))}s)
                </div>
            }
            <h1>Puzzle Game</h1>
            <h3>Put Any number from 2 to 5</h3>
            <form onSubmit={handle} style={{ margin: '20px 0' }}>
                <input className="input" type="number" value={input} onChange={(e) => {
                    setInput('')
                    if (e.target.value === '') {
                        window.location.replace('/')

                    }
                    if (e.target.value > 5) {
                        return
                    } else {
                        setInput(e.target.value)
                    }
                }} id="difficulty" />
                {disable ? '' : <input className="btn" type="submit" value="submit" />
                }
            </form>
            <div >
                <canvas width={400} height={400} id="canvas"></canvas>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        disable && (!isActive ?
                            <>
                                <button id="click" className='btn btn2' onClick={() => {
                                    setIsActive(true)
                                }}>Start The Puzzel</button>
                                <button className='btn btn2' onClick={reset}>Reset</button>
                            </>
                            : <>
                                <p className='btn btn2'>Time  0{minutes.toString()}:{seconds > 9 ? seconds.toString() : '0'.concat(seconds.toString())}</p>
                                <button className='btn btn2' onClick={reset}>Reset</button>
                            </>)
                    }
                </div>
            </div>

        </div >
    )
}
