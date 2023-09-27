const question = [
    {
        question: 'Which is the correct definition of the word "benevolent"?',
        answers: ['A. Sad', 'B. Kind and generous', 'C. Fast', 'D. Warm'],
        correctAnswer: 'B',
    },
    {
        question: 'Choose the word that is a synonym for "happy"',
        answers: ['A. Angry', 'B. Joyful', 'C. Confused', 'D. Sad'],
        correctAnswer: 'B',
    },
    {
        question: `What is the correct translation of the word "elephant" to Spanish?`,
        answers: ['A. Elefante', 'B. Elección', 'C. Eléctrico', 'D. Elemento'],
        correctAnswer: 'A',
    },
    {
        question: 'Select the word that is an antonym of "small"',
        answers: ['A. Little', 'B. Tiny', 'C. Big', 'D. Miniature'],
        correctAnswer: 'C',
    },
    {
        question: `What is the word used to describe someone who is an expert in bird observation?`,
        answers: ['A. Botanist', 'B. Astronomer', 'C. Ornithologist', 'D. Geologist'],
        correctAnswer: 'C',
    },
];

if (!localStorage.getItem("user")) {
    window.location.href = '/index.html';
}

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
console.log(selectedAnswer);

validated.addEventListener('click', () => {
    let index = 0;
    const jsonString = localStorage.getItem("user");
    
    const miObjeto = JSON.parse(jsonString);
    let score = miObjeto.score;
    for (const questionId in selectedAnswer) {
        if (selectedAnswer.hasOwnProperty(questionId)) {
            const answer = selectedAnswer[questionId];
            
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
                            
                            score += 10;
                            verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-green-500');
                            verifyIcon.innerHTML = `
                            <i class="fas fa-check"></i>`
                        } else {
                            verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-red-500');
                            verifyIcon.innerHTML = `
        <i class="fa-solid fa-xmark"></i>`
                            
                        }


                        // Haz algo con el elemento <li> encontrado, por ejemplo, agregar una clase
                        listItem.appendChild(verifyIcon);
                        break; // Puedes detener la iteración si encontraste "C."
                    }
                }
            }
            

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
    
    const selectedButton = listItem.querySelector('.bg-purple-300');
    if (selectedButton) {
        
        selectedButton.classList.remove('bg-purple-300');
    }
    
    // Marcar como seleccionado el botón clicado
    e.classList.add('bg-purple-300');
    validatedDisableButton();
}

function validatedDisableButton() {
    
    
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
