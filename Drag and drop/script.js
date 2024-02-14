array = [];
let dropArea = document.getElementsByClassName('drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.getElementById('input-file');
let preview = document.getElementById('preview');

['dragover', 'dragleave', 'drop'].forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);
    dropArea.addEventListener('dragover', function () {
        //CODE
    });
});

function prevDefault(e) {
    e.preventDefault();
}