let formulari = document.getElementById("formulari");
let nom = document.getElementById("nom");
let email = document.getElementById("correu");
let emailError = document.getElementById("emailError");
let pass = document.getElementById("contrasenya");
let confirmPass = document.getElementById("confirmarContra");
let postal = document.getElementById("postal");
let submit = document.getElementById("submit");

formulari.addEventListener("focusout", e => {
    // Validar que si el camp està buit, es posa el border en vermell. Si té contingut, es posa en verd
    if (!e.target.value) {
        e.target.style.border = '1px solid red';
    } else {
        e.target.style.border = '1px solid #63b47a';
    }

    // S'utilitza la funció validateEmail per comprovar que el correu sigui vàlid. Si no ho és, es mostra un missatge
    if (e.target === email) {
        if (validateEmail(email.value)) {
            email.style.border = '1px solid #63b47a';
            emailError.textContent = '';
        } else {
            e.target.style.border = '1px solid red';
            emailError.textContent = "El correu introduït no és correcte";
        }
    }
});

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

pass.addEventListener("input", function() {
    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
});

// submit.addEventListener('click', e => {
//     e.preventDefault();
//     validarNom();
// })