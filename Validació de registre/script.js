let formulari = document.getElementById("formulari");
let nom = document.getElementById("nom");
let email = document.getElementById("correu");
let emailError = document.getElementById("emailError");
let pass = document.getElementById("contrasenya");
let check = document.getElementById("checkPass");
let confirmPass = document.getElementById("confirmarContra");
let errorPass = document.getElementById("errorPass");
let postal = document.getElementById("postal");
let submit = document.getElementById("submit");
let valid = true;

function validarCamp(camp) {
    if (!camp.value) {
        camp.style.border = '1px solid red';
        return false;
    } else {
        camp.style.border = '1px solid #63b47a';
        return true;
    }
}

formulari.addEventListener("focusout", e => {   
    validarCamp(e.target);

    // Validar que si el camp del nom està buit, es posa el border en vermell. Si té contingut, es posa en verd
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

    if (valid == true) {
        pass.style.border = '1px solid #63b47a';
    } else if (valid == false) {
        pass.style.border = '1px solid red';
    }

    if (comparaContra()) {
        confirmPass.style.border = '1px solid #63b47a';
        errorPass.textContent = '';
    } else {
        confirmPass.style.border = '1px solid red';
        errorPass.textContent = 'Les contrasenyes no coincideixen'
        errorPass.style.color = 'red';
        errorPass.style.fontSize = '90%'
    }

});

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    } else {
        return false;
    }
}

pass.addEventListener("input", function () {
    let lowerCaseLetters = /[a-z]/;
    let upperCaseLetters = /[A-Z]/;
    let numbers = /[0-9]/;
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let contra = pass.value;
    let llarg = document.getElementById("length");
    let minus = document.getElementById("lower");
    let majus = document.getElementById("upper");
    let num = document.getElementById("number");
    let esp = document.getElementById("special");

    valid = true;

    check.removeAttribute("hidden");

    if (!(contra.length >= 8 && contra.length <= 15)) {
        valid = false;
        llarg.style.color = 'red';
    } else {
        llarg.style.color = '#63b47a';
    }

    if (!lowerCaseLetters.test(contra)) {
        valid = false;
        minus.style.color = 'red';
    } else {
        minus.style.color = '#63b47a';
    }

    if (!upperCaseLetters.test(contra)) {
        valid = false;
        majus.style.color = 'red';
    } else {
        majus.style.color = '#63b47a';
    }

    if (!numbers.test(contra)) {
        valid = false;
        num.style.color = 'red';
    } else {
        num.style.color = '#63b47a';
    }

    if (!specialChars.test(contra)) {
        valid = false;
        esp.style.color = 'red';
    } else {
        esp.style.color = '#63b47a';
    }

});

function comparaContra() {
    return pass.value == confirmPass.value;
}

function validarForm() {
    let campValid = true;

    if (!validarCamp(nom)) {
        campValid = false;
    }

    if (validateEmail(email.value)) {
        email.style.border = '1px solid #63b47a';
        emailError.textContent = '';
    } else {
        email.style.border = '1px solid red';
        emailError.textContent = "El correu introduït no és correcte";
        campValid = false;
    }

    if (!validarCamp(pass)) {
        campValid = false;
        pass.style.border = '1px solid red'; 
    }

    if (!comparaContra()) {
        campValid = false;
    }

    return campValid;
}

submit.addEventListener("click", function (e) {
    if (!validarForm()) {
        e.preventDefault();
    }
});