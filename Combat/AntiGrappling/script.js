document.getElementById('easy-level').addEventListener('click', function() {
    document.getElementById('easy-mode').classList.remove('hidden');
    document.getElementById('advanced-mode').classList.add('hidden');
});

document.getElementById('advanced-level').addEventListener('click', function() {
    document.getElementById('advanced-mode').classList.remove('hidden');
    document.getElementById('easy-mode').classList.add('hidden');
});

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const dropTargets = document.querySelectorAll('.drop-target');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            setTimeout(() => draggable.classList.add('invisible'), 0);
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging', 'invisible');
        });
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', e => {
            e.preventDefault();
        });

        target.addEventListener('drop', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                const existingChild = target.querySelector('.draggable');
                if (existingChild) {
                    draggable.parentNode.appendChild(existingChild);
                }
                target.appendChild(draggable);
                draggable.classList.remove('dragging', 'invisible');
            }
        });
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeDraggableSteps() {
    const correctOrder = [
        "Abaissez votre centre de gravité",
        "Décidez du niveau de défense à utiliser",
        "Établir quel membre est libre",
        "Choisissez une cible",
        "Sélectionnez une technique de frappe",
        "Frappez pour assoupir votre agresseur",
        "Libérez-vous de la saisie, si nécessaire",
        "Attaque avec une combinaison de techniques",
        "Évaluer les dommages",
        "Évadez-vous ou attaquez à nouveau"
    ];

    const steps = correctOrder.map(step => `<li draggable="true" class="draggable">${step}</li>`);
    shuffle(steps);
    const draggableStepsContainer = document.getElementById('draggable-steps');
    draggableStepsContainer.innerHTML = steps.join('');
    setupDragAndDrop();
}

function initializeDropTargets() {
    const dropZone = document.getElementById('drop-zone');
    dropZone.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        dropZone.innerHTML += `<li class="drop-target"><span class="number">${i}.</span></li>`;
    }
}

document.getElementById('validate-easy').addEventListener('click', function() {
    const correctOrder = [
        "Abaissez votre centre de gravité",
        "Décidez du niveau de défense à utiliser",
        "Établir quel membre est libre",
        "Choisissez une cible",
        "Sélectionnez une technique de frappe",
        "Frappez pour assoupir votre agresseur",
        "Libérez-vous de la saisie, si nécessaire",
        "Attaque avec une combinaison de techniques",
        "Évaluer les dommages",
        "Évadez-vous ou attaquez à nouveau"
    ];

    const dropTargets = document.querySelectorAll('.drop-target');

    dropTargets.forEach((target, index) => {
        const draggable = target.querySelector('.draggable');
        const content = draggable ? draggable.textContent.trim() : '';

        target.classList.remove('correct', 'incorrect');

        if (content === correctOrder[index]) {
            target.classList.add('correct');
        } else if (content) {
            target.classList.add('incorrect');
        }
    });

    if (!document.getElementById('restart-button')) {
        const restartButton = document.createElement('button');
        restartButton.id = 'restart-button';
        restartButton.classList.add('button');
        restartButton.textContent = "Recommencer";

        restartButton.addEventListener('click', () => {
            initializeDropTargets();
            initializeDraggableSteps();
            document.querySelector('.order-column').style.backgroundColor = '#292929';
            restartButton.remove();
        });

        document.querySelector('.content').appendChild(restartButton);
    }
});

document.getElementById('validate-advanced').addEventListener('click', function() {
    const correctOrder = [
        "Abaissez votre centre de gravité",
        "Décidez du niveau de défense à utiliser",
        "Établir quel membre est libre",
        "Choisissez une cible",
        "Sélectionnez une technique de frappe",
        "Frappez pour assoupir votre agresseur",
        "Libérez-vous de la saisie, si nécessaire",
        "Attaque avec une combinaison de techniques",
        "Évaluer les dommages",
        "Évadez-vous ou attaquez à nouveau"
    ];

    const inputFields = document.querySelectorAll('.advanced-input');

    inputFields.forEach((input, index) => {
        const userInput = input.value.trim();
        const feedback = document.createElement('span');
        feedback.style.marginLeft = '10px';

        if (userInput === correctOrder[index]) {
            feedback.textContent = "Bonne réponse";
            feedback.style.color = 'green';
        } else {
            feedback.textContent = ` Réponse correcte : ${correctOrder[index]}`;
            feedback.style.color = 'red';
        }

        // Remove previous feedback if exists
        if (input.nextSibling) {
            input.nextSibling.remove();
        }

        // Append new feedback
        input.parentNode.appendChild(feedback);
    });

    // Add restart button for advanced level
    if (!document.getElementById('restart-advanced-button')) {
        const restartAdvancedButton = document.createElement('button');
        restartAdvancedButton.id = 'restart-advanced-button';
        restartAdvancedButton.classList.add('button');
        restartAdvancedButton.textContent = "Recommencer";

        restartAdvancedButton.addEventListener('click', () => {
            inputFields.forEach(input => {
                input.value = '';
                if (input.nextSibling) {
                    input.nextSibling.remove(); // Remove feedback
                }
            });
            restartAdvancedButton.remove();
        });

        document.querySelector('.content').appendChild(restartAdvancedButton);
    }
});

// Initialisation au chargement de la page
initializeDropTargets();
initializeDraggableSteps();
