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
            });
        });

        draggableElements.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggedElement = draggable;
                draggable.classList.add('opacity-50', 'dragging');
            });
        });
