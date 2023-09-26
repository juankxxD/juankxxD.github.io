const question = [
    {
        question: 'my favorite color ___ red',
        answers: ['A. is', 'B. this', 'C. are', 'D. am'],
        correctAnswer: 'is',
    },
    {
        question: 'She ___ going to the store.',
        answers: ['A. is', 'B. this', 'C. are', 'D. am'],
        correctAnswer: 'is',
    },
    {
        question: `I haven't seen him __________`,
        answers: ['A. from ages', 'B. since ages', 'C. for ages', 'D. by ages'],
        correctAnswer: 'for ages',
    },
    {
        question: 'my mother bought a new book, this is ___ book.',
        answers: ['A. his', 'B. her', 'C. him', 'D. hers'],
        correctAnswer: 'her',
    },
    {
        question: `They ___ arrive late if they don't leave now.`,
        answers: ['A. will', 'B. would'],
        correctAnswer: 'will',
    },
];

if (!localStorage.getItem("user")) {
    window.location.href = '/index.html';
}

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
})

