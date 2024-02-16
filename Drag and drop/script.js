array = [];
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.getElementById('input-file');
let preview = document.getElementById('preview');

dropArea.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

['dragover', 'dragleave', 'drop'].forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);
    dropArea.addEventListener('dragover', dragEnter);
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragover', dragLeave);
    dropArea.addEventListener('dragover', drop);
});

function prevDefault(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');
}
