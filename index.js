let audioContext
let mic
let pitch

async function setup() {
  audioContext = new AudioContext()
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  })
  startPitch(stream, audioContext)
}
setup()

function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection('./model/', audioContext, stream, modelLoaded)
}

function modelLoaded() {
  document.querySelector('#status').textContent = 'Model Loaded'
  getPitch()
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      console.log(frequency)
      document.querySelector('#result').textContent = frequency
    } else {
      document.querySelector('#result').textContent = 'No pitch detected'
    }
    getPitch()
  })
}

window.addEventListener('click', async function () {
  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }
  console.log('audioContext :>> ', audioContext.state)
})

// window.addEventListener('click', async function () {
//   if (audioContext.state === 'suspended') {
//     await audioContext.resume()
//   }
// })
// console.log(audioContext.state)
// const audioContext = new AudioContext()

// const modelURL = './model'
// let pitchDetection
// let micStream
// let source

// start()

// async function start() {
//   micStream = await navigator.mediaDevices.getUserMedia({
//     audio: {
//       echoCancellation: false,
//       autoGainControl: false,
//       noiseSuppression: false,
//       latency: 0,
//     },
//   })
//   window.addEventListener('click', async function () {
//     if (audioContext.state === 'suspended') {
//       await audioContext.resume()
//     }
//     console.log(audioContext.state)
//   })

//   source = audioContext.createMediaStreamSource(micStream)
//   pitchDetection = ml5.pitchDetection(
//     modelURL,
//     audioContext,
//     source,
//     modelLoaded
//   )
//   console.log('here 1')
// }

// function modelLoaded() {
//   console.log('model loaded', pitchDetection)
//   getPitch()
// }

// function getPitch() {
//   pitchDetection.getPitch((err, frequency) => {
//     console.log(frequency, err)
//     // document.querySelector('#result').textContent = frequency;
//     // } else {
//     // document.querySelector('#result').textContent = 'No pitch detected';
//   })
// }
// getPitch()

// // setTimeout(() => {
// //   console.log("here 2")
// //   console.log(pitchDetection.getPitch((err, freq) => console.log))
// // }, 1000)
