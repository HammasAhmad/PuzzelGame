import React from 'react'

export const ImageSplitter = () => {
    const [input, setInput] = React.useState('')
    const imgArr = [
        'https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-1520x800.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
        'https://static.remove.bg/remove-bg-web/ea3c274e1b7f6fbbfe93fad8b2b13d7ef352f09c/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
        'https://static.remove.bg/remove-bg-web/ea3c274e1b7f6fbbfe93fad8b2b13d7ef352f09c/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
        'https://cdn.searchenginejournal.com/wp-content/uploads/2022/04/reverse-image-search-627b7e49986b0-sej-760x400.png'
    ]
    function images() {
        // the random images
        var randomNumber1 = Math.floor(Math.random() * imgArr.length);
        // get images at randomNumber1
        let selectedImages = imgArr[randomNumber1]
        console.log(selectedImages)
        // // display the images()
        // document.getElementsByClassName("img1")[0].src = 'images/' + selectedImages;
        // console.log('images/' + selectedImages, 'sadasd')
    }
    React.useEffect(() => {
        if (input <= 1 || input === '') {
            setInput('')
            document.getElementById('canvas').classList.add('kk')
        } else {
            document.getElementById('canvas').classList.remove('kk')
        }

    }, [input])
    const handle = (e) => {
        e.preventDefault();
        images()

        const PUZZLE_HOVER_TINT = "#009900";
        const img = new Image();
        const canvas = document.querySelector("#canvas");
        const stage = canvas.getContext("2d");
        let difficulty = input;
        let pieces;
        let puzzleWidth;
        let puzzleHeight;
        let pieceWidth;
        let pieceHeight;
        let currentPiece;
        let currentDropPiece;
        let mouse;
        img.addEventListener("load", onImage, false);
        img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png";

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
            createTitle("Click to Start Puzzle");
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

        function createTitle(msg) {
            stage.fillStyle = "#000000";
            stage.globalAlpha = 0.4;
            stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
            stage.fillStyle = "#FFFFFF";
            stage.globalAlpha = 1;
            stage.textAlign = "center";
            stage.textBaseline = "middle";
            stage.font = "20px Arial";
            stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
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
            document.onpointerdown = shufflePuzzle;
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

    }


    return (
        <div>
            <canvas id="canvas"></canvas>
            <br />
            {/* <label htmlFor="difficulty">Difficulty</label> */}
            {/* <input type="number" value={input} onChange={(e) => {
                if (e.target.value > 5) {
                    return
                } else {
                    setInput(e.target.value)
                }
            }} id="difficulty" /> */}

            <form onSubmit={handle} style={{ margin: '20px 0' }}>
                <input className="input" type="number" value={input} onChange={(e) => {
                    if (e.target.value > 5) {
                        return
                    } else {
                        setInput(e.target.value)
                    }
                }} id="difficulty" />
                <input className="btn" type="submit" value="submit" />
            </form>
        </div>
    )
}
