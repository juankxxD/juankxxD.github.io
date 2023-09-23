const dataInitial = [
    {title: 'Spelling', description: 'Practica la pronunciación de cada letra para mejorar tu aprendizaje', src: 'imgs/spelling.jpg', url: '/spell.html', color: 'blue'},
    {title: 'Grammar', description: 'Practica la escritura de las frases', src: 'imgs/grammar.jpg', url: '/grammar.html', color: 'red'},
    {title: 'Pronunciation', description: 'Practica la pronunciación de palabras y los sonidos del idioma de manera correcta y comprensible ', src: 'imgs/pronunciation.jpg', url: '/pronunciation.html', color: 'yellow'},
    {title: 'Vocabulary', description: 'Practica palabras en ingles en sus diferentes tiempos', src: 'imgs/vocabulary.jpg', url: '/vocabulary.html', color: 'green'},
]


const container = document.getElementById('container-cards');

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


