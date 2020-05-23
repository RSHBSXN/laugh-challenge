var firstLaugh = [
  'You laughed! :P',
  'Nooooooo! You Laughed!!'
];

var Laugh = [
  'lol :D You laughed again',
  'You laughed?! :P '
];

var noLaugh = [
  'Stone face!!',
  'Nice!'
];

const video = document.getElementById('video');
var scorePlayer = false;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),

]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
}

startVideo();

video.addEventListener('play', () => {

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video,
      new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions()
    if (detections[0].expressions.happy > scoringMetadata.laugh_detection_model_threshold)
      if (scorePlayer)
        happyFacedetected();
  }, 1000)
});

function happyFacedetected() {
  let currentScore = parseInt(document.getElementById('score').innerText);
<<<<<<< HEAD
  if (currentScore == 0) {
    showNotificationAlert(firstLaugh[parseInt(Math.random() * firstLaugh.length)], false);
=======
  if (currentScore == maxScore) {
    snackNotif(firstLaugh[parseInt(Math.random() * firstLaugh.length)]);
>>>>>>> 2f3f164b7b92701670f6b8d571c0dd893691b22a
  }
  else
    showNotificationAlert(Laugh[parseInt(Math.random() * firstLaugh.length)], true);

  document.getElementById('score').innerHTML = currentScore - (scoringMetadata.score_degrade_constant * scoringMetadata.score_degrade_exponential_factor);
}

document.getElementById('reveal_face').onclick = function () {
  if (document.getElementById('reveal_face').checked)
    document.getElementById('video').classList.remove('hide-video');
  else
    document.getElementById('video').classList.add('hide-video');
<<<<<<< HEAD
}
=======
}
>>>>>>> 2f3f164b7b92701670f6b8d571c0dd893691b22a
