const dataInitial = [
    {title: 'Spelling', description: 'Practica la pronunciación de cada letra para mejorar tu aprendizaje', src: 'imgs/spelling.jpg', url: '/spell.html', color: 'blue'},
    {title: 'Grammar', description: 'Practica la escritura de las frases', src: 'imgs/grammar.jpg', url: '/grammar.html', color: 'red'},
    {title: 'Pronunciation', description: 'Practica la pronunciación de palabras y los sonidos del idioma de manera correcta y comprensible ', src: 'imgs/pronunciation.jpg', url: '/pronunciation.html', color: 'yellow'},
    {title: 'Vocabulary', description: 'Practica palabras en ingles en sus diferentes tiempos', src: 'imgs/vocabulary.jpg', url: '/vocabulary.html', color: 'green'},
    {title: 'Listening', description: 'Practica escuchando oraciones para entrenar tu oido', src: 'imgs/listening.jpg', url: '/listening.html', color: 'purple'},
]


const container = document.getElementById('container-cards');
const modal = document.getElementById('modal');
dataInitial.forEach((data) => {
    
    const card = document.createElement('a');
    card.classList.add('shadow-md', 'h-[70%]');
    card.href = data.url;
    card.innerHTML = `
    <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700  h-[100%]">
                                <div class="relative mx-4 -mt-6 h-35 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                                    <img src="${data.src}"/>
                                </div>
                                <div class="p-6">
                                  <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  ${data.title}
                                  </h5>
                                  <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                  ${data.description}
                                  </p>
                                </div>
                                <div class="p-6 pt-0">
                                  <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-${data.color}-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    let's go!
                                  </button>
                                </div>
                              </div>`
                              container.appendChild(card);
})

// Verificar localStorage
if (localStorage.getItem("user")) {
  // Si la clave existe, muestra el valor en la consola
  const miDato = localStorage.getItem("user");
  modal.classList.add('hidden')
  console.log( JSON.parse(miDato));
} else {
  // Si la clave no existe, muestra un mensaje de que no hay datos
  console.log("No hay datos en localStorage con la clave 'miDato'");
}
// modal
const radioButtons = document.querySelectorAll('input[name="team"]');
const inputName = document.getElementById('input-name');


const dataUser = {name: '', img: '', team: ''};
function getImageSrc(element) {
  const elementosSeleccionados = document.querySelectorAll('.selected');

  // Eliminar la clase "selected" de todos los elementos seleccionados previamente
  elementosSeleccionados.forEach((elem) => {
      elem.classList.remove('selected');
  });

  // Agregar la clase "selected" al elemento actual
  element.classList.add('selected');
  // Obtiene la URL de la imagen desde el elemento img dentro del div clicado
  const imgElement = element.querySelector('img');
  const imageUrl = imgElement.src;
  
  // Hacer algo con la URL de la imagen, como mostrarla en la consola
  const partes = imageUrl.split("/"); // Dividir la URL en partes usando "/"
const ultimaParte = partes[partes.length - 1]; 
  console.log("URL de la imagen:", ultimaParte);
  dataUser.img = ultimaParte
  console.log(dataUser)
  validatedButton();
  // Puedes realizar otras acciones con la URL de la imagen aquí
}

const buttonUser = document.getElementById('button-user');
const validatedButton = () => {
  if(dataUser.img !== '' &&  dataUser.name !== '' && dataUser.team !== '') {
    buttonUser.removeAttribute('disabled');
  } else {
    buttonUser.disabled = true;
  }
}


radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', function() {
      // Verifica cuál radio button está seleccionado y obtén su valor
      if (radioButton.checked) {
        dataUser.team = radioButton.value;
      }
      validatedButton();
  });
});

inputName.addEventListener('change', function(e) {
  console.log(e.target.value);
  dataUser.name = e.target.value;
  validatedButton()
})

// buttonUser.addEventListener('click', function() {
//   sendData
// })