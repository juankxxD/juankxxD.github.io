const question = [
    {
        question: 'my favorite color ___ red',
        answers: ['A. is', 'B. this', 'C. are', 'D. am'],
        correctAnswer: 'A',
    },
    {
        question: 'She ___ going to the store.',
        answers: ['A. is', 'B. this', 'C. are', 'D. am'],
        correctAnswer: 'A',
    },
    {
        question: `I haven't seen him __________`,
        answers: ['A. from ages', 'B. since ages', 'C. for ages', 'D. by ages'],
        correctAnswer: 'C',
    },
    {
        question: 'my mother bought a new book, this is ___ book.',
        answers: ['A. his', 'B. her', 'C. him', 'D. hers'],
        correctAnswer: 'B',
    },
    {
        question: `They ___ arrive late if they don't leave now.`,
        answers: ['A. will', 'B. would'],
        correctAnswer: 'A',
    },
];

if (!localStorage.getItem("user")) {
    window.location.href = '/index.html';
}

let elements = '';
const list = document.getElementById('list-answer');
question.forEach((data, i) => {
    const listFather = document.createElement('li');
    const divQuestion = document.createElement('li');
    divQuestion.id = `question${i + 1}`;
    divQuestion.classList.add('w-[100%]', 'text-3xl',  'text-white');
    divQuestion.textContent = data.question;

    const divContainerUl = document.createElement('li');
    divContainerUl.id = `container-cards`;
    divContainerUl.classList.add('flex', 'flex-wrap', 'gap-10' , 'w-[100%]', 'pt-10' ,'flex-col');


    const ul = document.createElement('ul');
    ul.id = `list-answer`;
    ul.classList.add('list-inside' ,'flex', 'flex-col', 'gap-10' ,'items-center' ,'w-[100%]');
    
    data.answers.forEach((item, index) => {

        let [optionNumber, optionValue] = item.split('.')
        optionValue = optionValue.trim()
        const listItem = document.createElement('li');
        listItem.classList.add('list-none', 'cursor-pointer', 'w-[100%]', 'list-validated', 'flex', 'gap-5');
        const spanNumber = document.createElement('span')
        spanNumber.classList.add('pr-10', 'text-3xl', 'text-white')
        spanNumber.textContent = optionNumber + '.';
        const button = document.createElement('button');
        button.addEventListener('click', () => {
            SelectedOption(button)
        });

        button.dataset.questionId = `question${i + 1}`;
        button.classList.add('w-[50%]', 'text-start', 'rounded-xl', 'pl-10', 'bg-gray-100', 'button-validated')
        button.textContent = optionValue;
        listItem.appendChild(spanNumber)
        listItem.appendChild(button);
        ul.appendChild(listItem);
        
    })
    divContainerUl.appendChild(ul);
    listFather.appendChild(divQuestion);
    listFather.appendChild(divContainerUl);
    document.getElementById('list-order').appendChild(listFather);
})


const questionSelected = document.getElementById('question');

const validated = document.getElementById('validated');
const selectedAnswer = {};
for (let i = 1; i <= question.length; i++) {
    selectedAnswer[`question${i}`] = '';
}


validated.addEventListener('click', () => {
    let index = 0;
    const jsonString = localStorage.getItem("user");
    
    const miObjeto = JSON.parse(jsonString);
    let score = miObjeto.score;
    for (const questionId in selectedAnswer) {
        if (selectedAnswer.hasOwnProperty(questionId)) {
            const answer = selectedAnswer[questionId];
            console.log(`Pregunta: ${questionId}, Respuesta: ${answer}`);
            const buttonSelected = document.getElementById(questionId);
            const ulElement = buttonSelected.nextElementSibling.querySelector('ul');

            if (ulElement) {
                // Encuentra el <li> con el <span> que contiene "C."
                const listItems = ulElement.querySelectorAll('li');
                for (const listItem of listItems) {
                    // Encuentra el <span> dentro del <li>
                    const spanElement = listItem.querySelector('span');

                    // Comprueba si el texto del <span> es "C."
                    if (spanElement && spanElement.textContent.trim() === `${answer}.`) {
                        const verifyIcon = document.createElement('div');
                        if (answer === question[index].correctAnswer) {
                            console.log('todo melo')
                            score += 10;
                            verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-green-500');
                            verifyIcon.innerHTML = `
                            <i class="fas fa-check"></i>`
                        } else {
                            verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-red-500');
                            verifyIcon.innerHTML = `
        <i class="fa-solid fa-xmark"></i>`
                            console.log('Pa la proxima')
                        }


                        // Haz algo con el elemento <li> encontrado, por ejemplo, agregar una clase
                        listItem.appendChild(verifyIcon);
                        break; // Puedes detener la iteración si encontraste "C."
                    }
                }
            }
            console.log(buttonSelected)

        }
        index++;
    }
    console.log(score);
    miObjeto.score = score;
    localStorage.setItem('user', JSON.stringify(miObjeto));
    validated.disabled = true
})


function SelectedOption(e) {
    console.log(e);
    // Obtener el elemento <li> padre del botón clicado
    const listItem = e.closest('ul');
    const spanElement = e.previousElementSibling.textContent.split('.')[0];
    const questionId = e.getAttribute('data-question-id');
    selectedAnswer[e.getAttribute('data-question-id')] = spanElement;
    // Buscar y eliminar la clase 'bg-purple-300' solo dentro del <li> padre
    console.log(listItem)
    const selectedButton = listItem.querySelector('.bg-purple-300');
    if (selectedButton) {
        console.log('No hay ninguno')
        selectedButton.classList.remove('bg-purple-300');
    }
    console.log(selectedAnswer)
    // Marcar como seleccionado el botón clicado
    e.classList.add('bg-purple-300');
    validatedDisableButton();
}

function validatedDisableButton() {
    console.log('entre aqui')
    console.log(validated)
    let responseBool = false
    for (const pregunta in selectedAnswer) {
        if (selectedAnswer[pregunta] === '') {
            responseBool = true;
            break; // Sal del bucle si encuentras una propiedad vacía
        }
    }
    if (!responseBool) {
        validated.removeAttribute('disabled');
    }
}