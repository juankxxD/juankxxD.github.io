const question = [
    {
        question: `What was the Disney's first movie?`,
        titleCategorie: 'Movies',
        answers: ['A. Sleeping Beauty', 'B. Snow White', 'C. Betty Boop', 'D. Peter Pan'],
        correctAnswer: 'Snow White',
    },
    {
        question: 'Which one of these movies is from Dreamworks?',
        titleCategorie: 'Movies',
        answers: ['A. Mulan', 'B. Despicable me', 'C. Rio', 'D. Shrek'],
        correctAnswer: 'Shrek',
    },
    {
        question: `Who discovered America?`,
        titleCategorie: 'Important People',
        answers: ['A. Napoleón Bonaparte', 'B. John F. Kennedy', 'C. Cristobal Colon', 'D. Simón Bolívar'],
        correctAnswer: 'Cristobal Colon',
    },
    {
        question: 'Who discovered the gravitation?',
        titleCategorie: 'Important People',
        answers: ['A. Isaac Newton', 'B. Albert Einstein', 'C. Aristoteles', 'D. Platon'],
        correctAnswer: 'Platon',
    },
    {
        question: `What is Michael Jackson most important song?`,
        titleCategorie: 'Music',
        answers: ['A. Billie Jean', 'B. Bad', 'C. Beat it', 'D. Thriller'],
        correctAnswer: 'Thriller',
    },
    {
        question: `What is the song with the most views on YouTube?`,
        titleCategorie: 'Music',
        answers: ['A. Despacito', 'B. Tusa', 'C. Gangnam Style', 'D.Dame tu cosita'],
        correctAnswer: 'Despacito',
    },
    {
        question: `When did the Black Plague start?`,
        titleCategorie: 'Historical Events',
        answers: ['A. 2006', 'B. 1999', 'C. 1346', 'D. 2020'],
        correctAnswer: '1346',
    },
    {
        question: `When did The Second World War end?`,
        titleCategorie: 'Historical Events',
        answers: ['A. 1945', 'B. 1952', 'C. 1949', 'D. 1941'],
        correctAnswer: '1945',
    },
];

if (!localStorage.getItem("user")) {
    window.location.href = '/index.html';
}

const indiceAleatorio = Math.floor(Math.random() * question.length);
const questionAleatoria = question[indiceAleatorio];

const questionSelected = document.getElementById('question');
const clasify  = document.getElementById('clasify');
const list = document.getElementById('list-answer');
const validated = document.getElementById('validated');
let firstResponse = false;
let selectedAnswer;
questionSelected.textContent = questionAleatoria.question;
if(questionAleatoria.titleCategorie) {
    clasify.classList.remove('hidden')
    clasify.querySelector('span').textContent = questionAleatoria.titleCategorie;
}
questionAleatoria.answers.forEach((item, index) => {
    let [optionNumber, optionValue] = item.split('.')
    optionValue = optionValue.trim()

    const listItem = document.createElement('li');
    const spanNumber = document.createElement('span')
    spanNumber.classList.add('pr-10', 'text-3xl', 'text-white')
    listItem.classList.add('list-none', 'cursor-pointer', 'w-[100%]', 'list-validated', 'flex', 'gap-5');
    const button = document.createElement('button');
    button.classList.add('w-[50%]', 'text-start', 'rounded-xl', 'pl-10', 'bg-gray-100', 'button-validated')
    spanNumber.textContent = optionNumber + '.';
    button.textContent = optionValue;

    button.addEventListener('click', () => {
        // Limpiar la selección anterior
        console.log(selectedAnswer);
        if(firstResponse) {
            return;
        }
        validated.removeAttribute('disabled');
        const selectedButton = document.querySelector('.bg-purple-300');
        if (selectedButton) {
            selectedButton.classList.remove('bg-purple-300');
        }

        // Marcar como seleccionado
        button.classList.add('bg-purple-300');

        // Imprimir en la consola el texto seleccionado
        selectedAnswer = index;

    });
    listItem.appendChild(spanNumber)
    listItem.appendChild(button);
    list.appendChild(listItem);
});

validated.addEventListener('click', (e) => {
    const botones = document.querySelectorAll('.list-validated');
    const buttonSelected = botones[selectedAnswer];
    firstResponse = true;
    if (buttonSelected.children[1].textContent === questionAleatoria.correctAnswer) {
        const jsonString  = localStorage.getItem("user");
        console.log(jsonString)
        const miObjeto = JSON.parse(jsonString);
        console.log('no paso aqui')
        miObjeto.score += 10;
        localStorage.setItem('user', JSON.stringify(miObjeto));
        console.log(miObjeto);

        const verifyIcon = document.createElement('div');
        verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-green-500');
        verifyIcon.innerHTML = `
                            <i class="fas fa-check"></i>`
        buttonSelected.appendChild(verifyIcon);
    } else {
        const verifyIcon = document.createElement('div');
        verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-red-500');
        verifyIcon.innerHTML = `
        <i class="fa-solid fa-xmark"></i>`
        buttonSelected.appendChild(verifyIcon);
    }
    console.log(e);
    validated.disabled = true;
})

