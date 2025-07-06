// Check if mediaDevices API exists

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log('mediaDevices Exists');
    
}
'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const canvasHD = document.getElementById('canvas-HD')
const snap = document.getElementById('snap')
const photoGrid = document.getElementById('photo-grid-style1') 
const errorMsgElement = document.getElementById('spanErrorMsg');
let countdownText = document.getElementById('timer-countdown')
let imagesList = []
let timerLength = 1000

const constraints = {
    video:{
        width: {
            min: 1280,
            ideal: 1920,
            max: 3480
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 2160,
        }
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

// Function to get camera Dimensions
function getCameraResolution(video){
    return new Promise((resolve) => {
        video.addEventListener('loadeddata', 
        resolve({
            width: video.videoWidth,
            height: video.videoHeight
            })
        );
    });
};

 function storeHDImages(width, height) {
    const contextHD = canvasHD.getContext('2d');
    contextHD.drawImage(video, 0, 0, width, height);
    const dataURL = canvasHD.toDataURL('image/png');
    imagesList.push(dataURL);
}

 async function snapImage(){
    try {
        // Get camera resolution
        camera = await getCameraResolution(video)
        // Set canvas sizes
        canvas.width = 100;
        canvas.height = 100;
        canvasHD.width = camera.width;    
        canvasHD.height = camera.height;
        // Store the hd image in array
        storeHDImages(canvasHD.width, canvasHD.height);
        let context = canvas.getContext('2d');
        context.drawImage(video, 
            (video.offsetWidth - 100) / 2, (video.offsetHeight- 100) / 2,
            300, 300,
            0, 0,
            100, 100 
        );
        // Convert canvas to image
        let dataURL = canvas.toDataURL('image/png');
        let img = document.createElement('img');
        img.src = dataURL;
        // img.style.width = "100px";
        // img.style.height = "100px";
        photoGrid.appendChild(img);
        
    } catch (error) {
        console.log(error);   
        throw error;
    }

}

