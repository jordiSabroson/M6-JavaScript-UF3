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

    if (!array.includes(fitxers)) {
        array = array.concat(fitxers);
    } else {
        alert("Aquest fitxer ja l'has pujat");
    }
    

    showFiles();
}

function showFiles() {
    preview.innerHTML = "";
    if (array.length > 0) {
        array.forEach((file, index) => {
            processFile(file, index);
        });
    }
}

function processFile(file, index) {
    let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    let docType = file.type;

    // Comprovar que el fitxer tingui una extensió vàlida
    if (!validExtensions.includes(docType)) {
        alert("Tipus de fitxer no vàlid! Formats admesos: jpeg, jpg, png, gif");

        // Si no és vàlid, es treu de l'array
        array.splice(index, 1);
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        let prev = `<div class="previewImage">
                        <img src="${reader.result}"/>
                        <span>${file.name}</span>
                        <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn">c</span>
                    </div>`;

        preview.insertAdjacentHTML("beforeend", prev);
    }
}

function removeBtn(index) {
    array.splice(index, 1);

    showFiles();
}

button.addEventListener("click", function (e) {
    e.preventDefault();
    input.click();
});

input.addEventListener("change", function(){
    let selectedFiles = input.files;

    array = array.concat(Array.from(selectedFiles));

    showFiles();

    input.value = null;
});
