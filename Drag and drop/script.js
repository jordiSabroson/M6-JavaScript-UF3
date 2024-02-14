array = [];
let dropArea = document.getElementsByClassName('drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.getElementById('input-file');
let preview = document.getElementById('preview');

dropArea.addEventListener(evt, prevDefault);
function prevDefault(e) {
    e.preventDefault();
}