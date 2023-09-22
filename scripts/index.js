const dataInitial = [
    {title: 'Spelling', description: 'Practica la pronunciación de cada letra para mejorar tu aprendizaje', src: 'imgs/spelling.jpg', url: '/spell.html'},
    {title: 'Grammar', description: 'Practica la escritura de las frases', src: 'imgs/grammar.jpg', url: '/spell.html'},
    {title: 'asasas', description: 'asas', src: 'imgs/spelling.jpg', url: '/spell.html'},
    {title: 'asasas', description: 'asass', src: 'imgs/spelling.jpg', url: '/spell.html'},
    {title: 'asasas', description: 'asas', src: 'imgs/spelling.jpg', url: '/spell.html'},
]


const container = document.getElementById('container-cards');

dataInitial.forEach((data) => {
    
    const card = document.createElement('a');
    card.href = data.url;
    card.innerHTML = `
    <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
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
                                  <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    Read More
                                  </button>
                                </div>
                              </div>`
                              container.appendChild(card);
})


