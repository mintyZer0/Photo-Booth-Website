// Check if mediaDevices API exists

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log('mediaDevices Exists');
    
}
'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap')
const errorMsgElement = document.getElementById('spanErrorMsg');
var imagesList = []

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
    context.drawImage(video, 0, 0, 640, 480)
});
