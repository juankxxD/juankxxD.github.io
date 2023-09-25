const question = [
    {
        question: 'Which is the correct definition of the word "benevolent"?',
        answers: ['A. Sad', 'B. Kind and generous', 'C. Fast', 'D. Warm'],
        correctAnswer: 'Kind and generous',
    },
    {
        question: 'Choose the word that is a synonym for "happy"',
        answers: ['A. Angry', 'B. Joyful', 'C. Confused', 'D. Sad'],
        correctAnswer: 'Joyful',
    },
    {
        question: `What is the correct translation of the word "elephant" to Spanish?`,
        answers: ['A. Elefante', 'B. Elección', 'C. Eléctrico', 'D. Elemento'],
        correctAnswer: 'Elefante',
    },
    {
        question: 'Select the word that is an antonym of "small"',
        answers: ['A. Little', 'B. Tiny', 'C. Big', 'D. Miniature'],
        correctAnswer: 'Big',
    },
    {
        question: `What is the word used to describe someone who is an expert in bird observation?`,
        answers: ['A. Botanist', 'B. Astronomer', 'C. Ornithologist', 'D. Geologist'],
        correctAnswer: 'Ornithologist',
    },
];

const indiceAleatorio = Math.floor(Math.random() * question.length);
const questionAleatoria = question[indiceAleatorio];

const questionSelected = document.getElementById('question');
const list = document.getElementById('list-answer');
const validated = document.getElementById('validated');
let selectedAnswer;
questionSelected.textContent = questionAleatoria.question;

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

validated.addEventListener('click', () => {
    const botones = document.querySelectorAll('.list-validated');
    const buttonSelected = botones[selectedAnswer];
    if (buttonSelected.children[1].textContent === questionAleatoria.correctAnswer) {
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
})

