const question = [
    {
        question: 'Choose "Correct" If the sentence is correct and "Incorrect"  if it is not',
        questionType: 'c/i',
        answers: ['A. He jump from the airplane in his game.', 'B. I do my homework in the computer', 'C. We is not allowed to use our cellphones in class'],
        correctAnswer: ['I', 'C', 'I'],
    },
    {
        question: 'Order the following words to create a sentence.',
        questionType: 'order',
        answers: ['Are', 'better', 'than', 'computers', 'play', 'the', 'to', 'cell phones', '?'],
        correctAnswer: 'Are the computers better to play than cell phones?',
    },
    {
        question: ` The A.I. ________ the destruction of a lot of human jobs`,
        otherText: 'Fill in the blank with the correct option.',
        answers: ['A. will be', 'B. had', 'C. were'],
        correctAnswer: 'will be',
    },
    {
        question: 'What is the past tense of the verb "download"?',
        answers: ['A. downloaden', 'B. downloaded', 'C. downloadment', 'D. downloadation'],
        correctAnswer: 'downloaded',
    },
    {
        question: `Which of the following is a plural form of "mouse" (referring to computer hardware)?`,
        answers: ['A. mouses', 'B. mice', 'C. mices', 'D. mousies'],
        correctAnswer: 'mice',
    },
    {
        question: `What is the correct verb tense to use when describing a software update that will happen tomorrow?`,
        answers: ['A. updated', 'B. will update', 'C. updating', 'D. updates'],
        correctAnswer: 'will update',
    },
    {
        question: `Which pronoun should be used when referring to a computer as an inanimate object?`,
        answers: ['A. he', 'B. she', 'C. it', 'D. they'],
        correctAnswer: 'it',
    },
    {
        question: `This ___ my application`,
        otherText: 'Fill in the blank with the correct option.',
        answers: ['A. are', 'B. am', 'C. is', 'D. his'],
        correctAnswer: 'is',
    },
    {
        question: `What __ you think about my phone?`,
        otherText: 'Fill in the blank with the correct option.',
        answers: ['A. did', 'B. will', 'C. would', 'D. do'],
        correctAnswer: 'do',
    },
    {
        question: `Choose the correct sentence`,
        answers: ['A. There is many applications in the Play Store to learn English', 'B. There are many applications in the Play Store  to learn English'],
        correctAnswer: 'There are many applications in the Play Store  to learn English',
    },
    {
        question: `__ there be flying cars in the future?`,
        otherText: 'Fill in the blank with the correct option.',
        answers: ['A. Would', 'B. Will', 'C. Well', 'D. Do'],
        correctAnswer: 'Will',
    },
    {
        question: `Choose the correct sentence`,
        answers: ['A. He have a camera in his house', 'B. He has a camera in his house'],
        correctAnswer: 'He has a camera in his house',
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

questionSelected.textContent = questionAleatoria.question;
let selectedAnswer;
if (questionAleatoria.questionType === 'c/i') {
    selectedAnswer = new Array(questionAleatoria.answers.length);

    questionAleatoria.answers.forEach((item, index) => {
        let [optionNumber, optionValue] = item.split('.')
        optionValue = optionValue.trim()

        const listItem = document.createElement('li');
        const spanNumber = document.createElement('span')
        spanNumber.classList.add('pr-10', 'text-3xl', 'text-white')
        listItem.classList.add('list-none', 'cursor-pointer', 'w-[100%]', 'list-validated', 'flex', 'gap-5');
        const button = document.createElement('button');
        button.classList.add('w-[50%]', 'text-start', 'rounded-xl', 'pl-10', 'bg-gray-100', 'button-validated', 'cursor-text')
        spanNumber.textContent = optionNumber + '.';
        button.textContent = optionValue;
        const div = document.createElement('div')
        div.classList.add('flex', 'gap-5');
        const buttonC = document.createElement('button');
        buttonC.textContent = 'C'
        buttonC.classList.add('rounded-xl', 'w-[30px]', 'bg-gray-100')
        const buttonI = document.createElement('button');
        buttonI.textContent = 'I'
        buttonI.classList.add('rounded-xl', 'w-[30px]', 'bg-gray-100')
        div.appendChild(buttonC);
        div.appendChild(buttonI);
        buttonC.addEventListener('click', () => handleButtonClick(buttonC, index));
        buttonI.addEventListener('click', () => handleButtonClick(buttonI, index));
        listItem.appendChild(spanNumber)
        listItem.appendChild(button);
        listItem.appendChild(div);
        list.appendChild(listItem);
    });

    validated.addEventListener('click', (e) => {
        console.log(selectedAnswer);

        selectedAnswer.forEach((res, i) => {
            document.querySelectorAll('li').forEach((itemLi, index) => {
                if (index === i) {
                    if (res === questionAleatoria.correctAnswer[i]) {
                        showValidatedAnswer(true, itemLi, 3)
                    } else {
                        showValidatedAnswer(false, itemLi)
                    }
                }
            })
            console.log(questionAleatoria.correctAnswer[i])

        })

    })

    function handleButtonClick(button, index) {
        // Obtiene el contenido del botón ("C" o "I")
        const buttonText = button.textContent.trim();

        // Busca el otro botón en el mismo div
        const siblingButton = Array.from(button.parentElement.children).find(
            elem => elem.tagName === 'BUTTON' && elem !== button
        );

        // Si el hermano ya tiene la clase bg-blue-500, quítala
        if (siblingButton.classList.contains('bg-blue-500')) {
            siblingButton.classList.remove('bg-blue-500');
            siblingButton.classList.add('bg-gray-100');
        }

        console.log(index);
        // Almacena el contenido en el array en el orden correspondiente
        selectedAnswer[index] = buttonText;
        button.classList.remove('bg-gray-100');
        button.classList.add('bg-blue-500');

        // Habilita el botón de validación si se han seleccionado respuestas en todos los elementos
        const allAnswersSelected = selectedAnswer.every(answer => answer !== undefined);
        const validatedButton = document.getElementById('validated');
        validatedButton.disabled = !allAnswersSelected;
    }

} else if (questionAleatoria.questionType === 'order') {
    console.log('Entre aqui')
    const containerCards = document.getElementById('container-cards')
    list.classList.add('hidden');
    const divWords = document.createElement('div');
    divWords.classList.add('flex', 'gap-5', 'justify-center')

    const divDrop = document.createElement('div');
    divDrop.classList.add('flex', 'gap-5', 'justify-center')
    divDrop.id = 'place-words';
    questionAleatoria.answers.forEach((item, index) => {
        const divPositionInitial = document.createElement('div');
        divPositionInitial.classList.add('droppable', 'bg-blue-100', 'rounded-md', 'min-w-[50px]', 'droppable')

        const divStartWord = document.createElement('div');
        divStartWord.classList.add('draggable', 'bg-blue-300', 'p-4', 'rounded-md', 'draggable')
        divStartWord.setAttribute('draggable', 'true');
        divStartWord.textContent = item
        divPositionInitial.appendChild(divStartWord);
        divWords.appendChild(divPositionInitial);

        const divPositionEnd = document.createElement('div');
        divPositionEnd.classList.add('droppable', 'bg-blue-100', 'rounded-md', 'min-w-[50px]', 'min-h-[50px]', 'droppable')
        divDrop.appendChild(divPositionEnd);

    })
    containerCards.appendChild(divWords);
    containerCards.appendChild(divDrop);

    const draggableElements = document.querySelectorAll('.draggable');
    const droppableElements = document.querySelectorAll('.droppable');

    draggableElements.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('opacity-50', 'dragging');
            // draggable.classList.add('opacity-50');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('opacity-50');
        });
    });

    let draggedElement = null;

    droppableElements.forEach(droppable => {
        droppable.addEventListener('dragover', e => {
            e.preventDefault();
        });

        droppable.addEventListener('drop', e => {
            e.preventDefault();
            const targetDroppable = e.target;
            console.log(e.target)
            if (targetDroppable.classList.contains('droppable')) {
                if (targetDroppable.children.length > 0) {
                    // Intercambia los elementos
                    const draggable = document.querySelector('.dragging');
                    const temp = targetDroppable.innerHTML;
                    targetDroppable.innerHTML = '';
                    targetDroppable.appendChild(draggable);
                    draggedElement.innerHTML = temp;
                } else {
                    // Mueve la palabra al espacio
                    targetDroppable.appendChild(draggedElement);
                    draggedElement.classList.remove('dragging');
                    draggedElement = null;
                }
            }
            validateDroppableElements();
        });
    });

    draggableElements.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggedElement = draggable;
            draggable.classList.add('opacity-50', 'dragging');
        });
    });

    function validateDroppableElements() {
        // Obtener el elemento con el id "place-words"
        const placeWordsDiv = document.getElementById('place-words');

        if (!placeWordsDiv) {
            console.log('El elemento con el id "place-words" no existe.');
            return;
        }

        // Buscar elementos con la clase "droppable" dentro del div "place-words"
        const droppableElements = placeWordsDiv.querySelectorAll('.droppable');

        // Verificar si hay elementos con la clase "droppable" con hijos
        let hasDroppableWithChildren = false;

        droppableElements.forEach((droppableElement) => {
            if (droppableElement.children.length === 0) {
                hasDroppableWithChildren = true;
            }
        });
        console.log(hasDroppableWithChildren);
        if (hasDroppableWithChildren) {
            validated.disabled = true;
        } else validated.disabled = false;
        return hasDroppableWithChildren;
    }

    validated.addEventListener('click', (e) => {
        let response = '';
        const clasify = document.getElementById('clasify');
        const placeWordsDiv = document.getElementById('place-words');
        const droppableElements = placeWordsDiv.querySelectorAll('.droppable');
        droppableElements.forEach((droppableElement) => {
            if (droppableElement.children[0].textContent === '?') {
                response = response.replace(/\s+$/, '?');
            } else
                response += droppableElement.children[0].textContent + ' '
        });
        console.log(response)
        clasify.classList.remove('hidden');
        clasify.children[0].textContent = response
        if (response === questionAleatoria.correctAnswer) {
            showValidatedAnswer(true, clasify)
        } else {
            showValidatedAnswer(false, clasify)
        }
    })

}

else {
    selectedAnswer = 'primero';
    if(questionAleatoria.otherText) {
        const clasify = document.getElementById('clasify1');
        clasify.textContent = questionAleatoria.otherText
        clasify.classList.remove('hidden');
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
            console.log(validated.disabled)
            if (selectedAnswer !== 'primero' && validated.disabled) {
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

    validated.addEventListener('click', () => {
        const botones = document.querySelectorAll('.list-validated');
        const buttonSelected = botones[selectedAnswer];
        if (buttonSelected.children[1].textContent === questionAleatoria.correctAnswer) {
            showValidatedAnswer(true, buttonSelected)
        } else {
            showValidatedAnswer(false, buttonSelected)
        }
    })


}

const showValidatedAnswer = (isCorrect, node, score = 10) => {
    console.log(parseFloat(score));
    if (isCorrect) {
        const jsonString = localStorage.getItem("user");
        const miObjeto = JSON.parse(jsonString);
        if(score !== 10) {
            miObjeto.score += Math.floor(score);
        } else miObjeto.score += 10;
        localStorage.setItem('user', JSON.stringify(miObjeto));
        const verifyIcon = document.createElement('div');
        verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-green-500');
        verifyIcon.innerHTML = `
                                <i class="fas fa-check"></i>`
        node.appendChild(verifyIcon);
    } else {
        const verifyIcon = document.createElement('div');
        verifyIcon.classList.add('flex', 'justify-center', 'items-center', 'rounded-full', 'text-white', 'h-[25px]', 'w-[25px]', 'bg-red-500');
        verifyIcon.innerHTML = `
            <i class="fa-solid fa-xmark"></i>`
        node.appendChild(verifyIcon);
    }
    validated.disabled = true;
}   