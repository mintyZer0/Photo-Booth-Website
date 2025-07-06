// Check if mediaDevices API exists

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log('mediaDevices Exists');
    
}
'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap')
const photoGrid = document.getElementById('photo-grid-style1') 
const errorMsgElement = document.getElementById('spanErrorMsg');
let countdownText = document.getElementById('timer-countdown')
let imagesList = []
let timerLength = 5000

const constraints = {
    video:{
        width: 1280,
        height: 720,
    }
};

async function init(){
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log(stream)
        handleSuccess(stream);
    }
    catch(e){
        errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`;
    }
}

function handleSuccess(stream){
    window.stream = stream;
    video.srcObject = stream;
}
//Load init
init();

// Draw Image
var context = canvas.getContext('2d');
snap.addEventListener("click", function(){
    startTimer(timerLength);
});

function startTimer(timerLength){
    //Start the timer to snap image
    let imageTimer = setTimeout(snapImage, timerLength);
    countdownText.style.display = "flex";
    // Convert timer to seconds and decrement
    let seconds = timerLength/1000;
    countdownText.innerHTML = seconds;
    let countdownTextTimer = setInterval(() => {
        countdownText.innerHTML--;
        // Stop the countdown text
        if (Number(countdownText.innerHTML) <= 0){
            clearInterval(countdownTextTimer)
            countdownText.style.display = "none";
        };
    }, 1000);

}

function snapImage(){
    // Draw the image to canvas
    context.drawImage(video, 0, 0, 100, 100);
    // Convert canvas to image
    var dataURL = canvas.toDataURL('image/png');
    var img = document.createElement('img');
    img.src = dataURL
    imagesList.push(img)
    photoGrid.appendChild(img)
    console.log(imagesList)
}

