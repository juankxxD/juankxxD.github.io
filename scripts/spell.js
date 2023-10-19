const words = ['cat', 'spend', 'house', 'cousin'];

if (!localStorage.getItem("user")) {
    window.location.href = '/index.html';
}

const indiceAleatorio = Math.floor(Math.random() * words.length);
const palabraAleatoria = words[indiceAleatorio];

console.log(`Palabra aleatoria: ${palabraAleatoria}`);

const word = document.getElementById('word');

word.innerHTML = `
<p class='text-3xl font-bold text-white underline'>${palabraAleatoria}</p>`

let isRecording = false;
const startButton = document.getElementById('startButton');
const micIcon = document.getElementById('micIcon');
const transcriptionDiv = document.getElementById('transcription');
const audioElement = document.getElementById('audioElement');
const textButton = document.getElementById('buttonText');
const verify = document.getElementById('verify');
let mediaRecorder;
let audioChunks = [];
let recognition; // Declarar recognition aquí

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function () {
                try {
                    console.log('Entre a esta funcion de onstop');
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    startButton.disabled = false;
                    audioElement.src = audioUrl;
                    audioElement.play();

                    // Aquí ya no iniciamos el reconocimiento al detener la grabación
                } catch (e) {
                    console.log('Ha habido algun error: ' + e);
                }
            };

            recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = true;
            recognition.onresult = function (event) {
                console.log('estoy aqui con: ', event);
                const result = event.results[0][0].transcript;
                console.log(result);
                result = result.replaceAll(' ', '');
                transcriptionDiv.textContent = result;
                if (result.split('.')[0].toLowerCase() === palabraAleatoria.toLowerCase()) {
                    console.log('Entre aqui');
                    const jsonString = localStorage.getItem("user");
                    const miObjeto = JSON.parse(jsonString);
                    miObjeto.score += 10;
                    localStorage.setItem('user', JSON.stringify(miObjeto));
                    verify.classList.remove('bg-red-500');
                    verify.classList.add('bg-green-500');
                    verify.innerHTML = `
                    <i class="fas fa-check"></i>`;
                } else {
                    console.log('Entre aqui en el malo');
                    verify.classList.remove('bg-green-500');
                    verify.classList.add('bg-red-500');
                    verify.innerHTML = `
                    <i class="fa-solid fa-xmark"></i>`;
                }
                console.log(result.split('.')[0].toLowerCase());
                console.log(palabraAleatoria);
            };

            startButton.addEventListener('click', function () {
                isRecording = !isRecording;
                if (isRecording) {
                    audioChunks = [];
                    // Si está grabando, cambia el ícono y el texto
                    micIcon.classList.remove('fa-microphone');
                    micIcon.classList.add('fa-microphone-alt');
                    textButton.textContent = 'Detener Captura de Audio';
                    console.log('Llegue aqui cuando prendo micro');
                    mediaRecorder.start();
                    
                    // Iniciar el reconocimiento de voz
                    recognition.start();
                } else {
                    // Si no está grabando, vuelve al ícono y texto originales
                    micIcon.classList.remove('fa-microphone-alt');
                    micIcon.classList.add('fa-microphone');
                    textButton.textContent = 'Iniciar Captura de Audio';
                    console.log('Llegue aqui cuando apago micro');
                    mediaRecorder.stop();
                    
                    // Detener el reconocimiento de voz
                    recognition.stop();
                }
            });
        })
        .catch(function (error) {
            console.error('Error al acceder al micrófono:', error);
        });
} else {
    console.error('El navegador no admite la API MediaStream');
}
