song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songName = "";

function setup () {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function preload()
{
    song1 = loadSound("Everlong song 1.mp3");
    song2 = loadSOund("Girls like you song 2.mp3");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX +" rightWristY = "+ rightWristY);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#00FF00");
    stroke("#00FF00");
    song_name = song1.isPlaying();
    console.log(song_name);
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (song_name == false)
        {
            song1.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "song_name: Everlong song 1";
        }
    }
    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (song_name ==false)
        {
            song2.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "song_name: Girls like you song 2";
        }
    }
}