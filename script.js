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
        happyFacedetected();
  }, 1000)
});

function happyFacedetected() {
  let currentScore = parseInt(document.getElementById('score').innerText);
  if (currentScore == maxScore) {
    snackNotif(firstLaugh[parseInt(Math.random() * firstLaugh.length)]);
  }
  else
    snackNotif(Laugh[parseInt(Math.random() * Laugh.length)]);

  // New score
  var new_score = currentScore - current_score_degrade_constant;

  // Next degrade value
  current_score_degrade_constant = current_score_degrade_constant * scoringMetadata.score_degrade_exponential_factor

  if (new_score <= 0) {
    snackNotif('Game over !!!', 5000);
    document.getElementById('playlist-ready').innerHTML = 'Game over !!!'
    document.getElementById('challenge').load()
    document.getElementById('challenge').pause()
    document.getElementById('start-challenge').disabled = false;
    document.getElementById('score').innerHTML = 0

     var new_element = video.cloneNode(true);
     old_element.parentNode.replaceChild(new_element, video);
  }

  document.getElementById('score').innerHTML = new_score;
}

document.getElementById('reveal_face').onclick = function () {
  if (document.getElementById('reveal_face').checked)
    document.getElementById('video').classList.remove('hide-video');
  else
    document.getElementById('video').classList.add('hide-video');
}
