const question = [
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/Keyboard.jpg',
        answers: ['A. Mouse.', 'B. Keyboard', 'C. Screen'],
        correctAnswer: 'Keyboard',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/cellphone.jpg',
        answers: ['A. Cell phone', 'B. Tablet', 'C. Earphones'],
        correctAnswer: 'Cell phone',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/aristoteles.jpg',
        answers: ['A. Albert Einstein', 'B. Gabriel García Márquez', 'C. Aristóteles'],
        correctAnswer: 'Aristóteles',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/whale.jpg',
        answers: ['A. Dolphin', 'B. Horse', 'C. Whale'],
        correctAnswer: 'Whale',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/tv.jpg',
        answers: ['A. TV', 'B. Cabin', 'C. fridge'],
        correctAnswer: 'TV',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/Airfryer.jpg',
        answers: ['A. Microwave', 'B. Washing machine', 'C. Air fryer'],
        correctAnswer: 'Air fryer',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/Unitedkingdom.jpg',
        answers: ['A. USA', 'B. France', 'C. England', 'D. United kingdom'],
        correctAnswer: 'United kingdom',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/blue.jpg',
        answers: ['A. Blue', 'B. green', 'C. yellow'],
        correctAnswer: 'Blue',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/Headphones.jpg',
        answers: ['A. Wristwatch', 'B. Headphones', 'C. Earrings'],
        correctAnswer: 'Headphones',
    },
    {
        question: 'You have to guess which option correctly describes the image.',
        questionType: 'image',
        srcImge: 'imgs/Winter.jpg',
        answers: ['A. Spring', 'B. Autumn', 'C. Winter'],
        correctAnswer: 'Winter',
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
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['R', 'E', 'H', 'E', 'A', 'T', 'C'],
        correctAnswer: 'TEACHER',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['L', 'G', 'A', 'N', 'A', 'G', 'U', 'E'],
        correctAnswer: 'LANGUAGE',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['H', 'E', 'L', 'T', 'O', 'G', 'T', 'O', 'S', 'I', 'C', 'N'],
        correctAnswer: 'TECHNOLOGIST',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['R', 'A', 'C', 'E', 'R', 'E'],
        correctAnswer: 'CAREER',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['N', 'N', 'O', 'I', 'T', 'A', 'V', 'E'],
        correctAnswer: 'INNOVATE',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['L', 'C', 'E', 'L'],
        correctAnswer: 'CELL',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['S', 'N', 'D', 'U', 'T', 'E', 'T'],
        correctAnswer: 'STUDENT',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['L', 'A', 'B', 'C', 'K'],
        correctAnswer: 'BLACK',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['M', 'A', 'U', 'H', 'E', 'G', 'B', 'R', 'R'],
        correctAnswer: 'HAMBURGER',
    },
    {
        question: 'Order the following letters to create a word.',
        questionType: 'order',
        answers: ['N', 'G', 'E', 'E', 'I', 'N', 'E', 'R'],
        correctAnswer: 'ENGINEER',
    },

];
if (!localStorage.getItem("user")) {
    window.location.href = '/index.html';
}

const image = document.getElementById('question-image');

const indiceAleatorio = Math.floor(Math.random() * question.length);
const questionAleatoria = question[indiceAleatorio];

const questionSelected = document.getElementById('question');
const list = document.getElementById('list-answer');
const validated = document.getElementById('validated');
let selectedAnswer;
questionSelected.textContent = questionAleatoria.question;
if (questionAleatoria.questionType === 'order') {
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
            response += droppableElement.children[0].textContent
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

} else {
    selectedAnswer = 'primero';
    if (questionAleatoria.questionType === 'image') {
        image.children[0].src = questionAleatoria.srcImge;
        image.classList.remove('hidden');
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

    validated.addEventListener('click', (e) => {
        const botones = document.querySelectorAll('.list-validated');
        const buttonSelected = botones[selectedAnswer];
        if (buttonSelected.children[1].textContent === questionAleatoria.correctAnswer) {

            const jsonString = localStorage.getItem("user");
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
}

const showValidatedAnswer = (isCorrect, node, score = 10) => {
    console.log(parseFloat(score));
    if (isCorrect) {
        const jsonString = localStorage.getItem("user");
        const miObjeto = JSON.parse(jsonString);
        if (score !== 10) {
            miObjeto.score = parseFloat(miObjeto.score + score).toFixed(2);
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