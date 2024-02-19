let array = [];
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector('.drop-area h2');
let button = document.querySelector('.drop-area button');
let input = document.getElementById('input-file');
let preview = document.getElementById('preview');

['dragover', 'dragleave', 'drop'].forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);
    dropArea.addEventListener('dragenter', dragEnter);
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragleave', dragLeave);
    dropArea.addEventListener('drop', drop);
});

button.addEventListener("click", function (e) {
    e.preventDefault();
    input.click();
});

function prevDefault(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.target.classList.add('active');
    dragDropText.textContent = "Drop to upload files";
}

function dragOver(e) {
    e.target.classList.add('active');
}

function dragLeave(e) {
    e.target.classList.remove('active');
    dragDropText.textContent = "Drag & Drop files";
}

function drop(e) {
    e.target.classList.remove('active');
    dragDropText.textContent = "Drag & Drop files";

    // Recollir els fitxers deixats anar
    let fitxers = Array.from(e.dataTransfer.files)

    array = array.concat(fitxers);

    showFiles();
}

function showFiles() {
    if (array.length > 0) {
        array.forEach(element => {
            processFile()
        });
    }
}

function processFile(file, index) {
    let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    let docType = file.type;
}

