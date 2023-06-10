const screenshortBtn =document.querySelector("#src_btn"),
screenshorPreview =document.querySelector(".src_preview"),
closeBtn = screenshorPreview.querySelector("#close_btn");

const captureScreen =  async () => {
    try{
        // asking permission to use a media input to record current tab
        const stream = await navigator.mediaDevices.getDisplayMedia({
            preferCurrentTab: true
        });
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata",() =>{
            const canvas = document.createElement("canvas");
            const  ctx = canvas.getContext("2d");

            // passing video width & height as canvas width & height
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.play();// playing the video so the drawn image won't be black or blank
            //drawing an image from the captured video stream
            ctx.drawImage(video, 0, 0,canvas.width, canvas.height);
            stream.getVideoTracks()[0].stop(); // terminating first video track of the stream
            // passing canvas data url as svreeenshort preview src
            screenshorPreview.querySelector("img").src = canvas.toDataURL();
            screenshorPreview.classList.add("show");
        });
        video.srcObject = stream; // passing capture atream data as video sourec object
    }catch(error){
        // if image coudn't capture by any reson, then alert the message
            alert("Faild to capture screenshort!");
        }
}


closeBtn.addEventListener("click", () => screenshorPreview.classList.toggle("show"));

screenshortBtn.addEventListener("click",captureScreen)