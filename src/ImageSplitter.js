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
            img: 'https://media.istockphoto.com/id/1354441996/photo/image-of-open-antique-book-on-wooden-table-with-glitter-overlay.jpg?b=1&s=170667a&w=0&k=20&c=O_VZbgONe4WTXPOEvwKYezhqFkzAXpr2g-lCdpdj5FU=',
        },
        {
            id: 2,
            img: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',

        },
        {
            id: 3,
            img: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/58025/right-front-three-quarter.jpeg?q=75',
        },
        {
            id: 4,
            img: 'https://media.istockphoto.com/id/535695503/photo/pakistan-monument-islamabad.jpg?s=612x612&w=0&k=20&c=bNqjdf8L-5igcRB89DdMgx0kNOmyeo1J_zzXmoxxl8w='
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
        let randomNu = Math.floor(Math.random() * 4) + 1
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
            // JSON.stringify(localStorage.removeItem('seconds', seconds))
            // JSON.stringify(localStorage.removeItem('min', minutes))
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
            setSeconds(0)
            seconds = 0
            setMinutes(pre => pre + 1)
            clearInterval(interval);
        }
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
            setSeconds(0)
            setMinutes(0)

        }
        return () => clearInterval(interval);
    }, [isActive]);
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
                        alert('WellCome to the AK team')
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
            <h1>Puzzel Game</h1>
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
                            : <p className='btn btn2'>Time  0{minutes.toString()}:{seconds > 9 ? seconds.toString() : '0'.concat(seconds.toString())}</p>)
                    }
                </div>
            </div>

        </div >
    )
}
