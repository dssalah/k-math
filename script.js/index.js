

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Set H & W of canvas to match viewport
canvas.width = innerWidth;
canvas.height = innerHeight;
//Get access to the sprite sheet
const answerbot = new Image();
answerbot.src = "/images/Robots.png";
answerbot.onload = loadImages;
//NEW CHARACTER (cow)
const cow = new Image();
cow.src = "/images/cow-char3.png";
cow.onload = loadImages;
// 8 columns 1 row
let cols = 8;
let rows = 1;
// slices
let answerbotWidth = answerbot.width / cols;
let answerbotHeight = answerbot.height / rows;
// NEW CHAR
let cowWidth = cow.width / cols;
let cowHeight = cow.height / rows;


// AND ACTION (so animation PLAYS)
let totalFrames = 8; //number of framers 
let currentFrame = 0;
// Updates position
let srcX = 0;
let srcY = 0;
let cowPosX = srcX;
let cowPosY = srcY;

//Records number of invocations of animate
let framesDrawn = 0;

// Increased image retains resolution
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


function resizeImage(imageWidth, imageHeight) {
  let scaleFactor = 4;
  let midXPos = innerWidth / 2 - (imageWidth * scaleFactor) / 2;
  let midYPos = innerHeight / 2 - (imageHeight * scaleFactor) / 2;
  ctx.translate(midXPos, midYPos);
  ctx.scale(scaleFactor, scaleFactor);
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears contents of previous frame
  requestAnimationFrame(animate); //each new canvas frame will call this function

  currentFrame = currentFrame % totalFrames; // sets cycle & loops animation
  srcX = currentFrame * answerbotWidth; //Src postion
  cowPosX = currentFrame * cowWidth;

  ctx.save();
  resizeImage(answerbotHeight, answerbotWidth);
  //Starting point ----> Ending point
  // image, scrX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
  ctx.drawImage(answerbot, srcX, srcY, answerbotWidth, answerbotHeight, 10, -72, answerbotWidth, answerbotHeight);
  //ctx.globalAlpha = 0.5;

  ctx.drawImage(cow, cowPosX, cowPosY, cowWidth, cowHeight, -171, -11, cowWidth, cowHeight);
  ctx.restore();

  framesDrawn++;
  if (framesDrawn >= 15) {
    currentFrame++; //increments frame so new one is displayed
    framesDrawn = 0;

  }


}


//So the canvas can't be rendered before the image
let numOfImages = 2;
function loadImages() {
  if (--numOfImages > 0) return;
  animate();
}

loadImages(); // Call the loadImages function to start loading images





const playButtonImg = document.getElementById("play-button");
const messageImg = document.getElementById("message");

playButtonImg.addEventListener("click", function () {
  // Hide the button
  playButtonImg.style.display = "none";


  // Show the welcome image
  messageImg.style.display = "inline-block";
  messageImg.style.top = "-150px"; // Adjust top property to position the image
  messageImg.style.left = "0px"; // Adjust left property to position the image

  // Delay for 5 seconds and then hide the welcome image
  setTimeout(() => {
    messageImg.style.display = "none";

    // Insert first image after the welcome image
    const img1 = document.createElement("img");
    img1.src = "/images/3.png";
    img1.alt = "Image 3";
    img1.style.position = "relative"; // Set position to relative
    img1.style.zIndex = "6"; // Set z-index of image 1
    img1.style.top = "-250px"; // Adjust top property to position the image
    img1.style.left = "-50px"; // Adjust left property to position the image
    img1.style.display = "inline-block"

    messageImg.after(img1);

    // Delay for 1 second and then insert second image
    setTimeout(() => {
      const img2 = document.createElement("img");
      img2.src = "/images/1.png";
      img2.alt = "Image 1";
      img2.style.position = "relative"; // Set position to relative
      img2.style.zIndex = "6"; // Set z-index of image 1
      img2.style.top = "-210px"; // Adjust top property to position the image
      img2.style.left = "-50px"; // Adjust left property to position the image
      img1.style.display = "inline-block"

      img1.after(img2);
      img1.remove();



      // Delay for 1 second and then start the game
      setTimeout(() => {
        const gameContainer = document.getElementById("game");
        gameContainer.style.visibility = "visible";
        const gamecontainer = document.getElementById("game-info");
        gamecontainer.style.visibility = "visible";

        img2.remove();
        playGame();



      }, 3000);
    }, 3000);
  }, 3000);


});





document.getElementById("my-canvas").classList.add("neon-border");
