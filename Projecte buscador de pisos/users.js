let formulari = document.getElementById("form-user-register");

// Funció per evitar que es faci el submit sense haver comprovat les dades
$('#form-user-register').submit(function (e) {
    e.preventDefault();
});

// Declarar els elements del HTML com a objectes 
let elements = {
    nom: {
        input: document.getElementById('validationNom'),
        error: document.getElementById('feedbackNom'),
    },
    cognoms: {
        input: document.getElementById('validationCognoms'),
        error: document.getElementById('feedbackCognoms'),
    },
    DNI: {
        input: document.getElementById('validationDNI'),
        error: document.getElementById('feedbackDNI'),
    },
    username: {
        input: document.getElementById('validationUsername'),
        error: document.getElementById('feedbackUsername'),
    },
    email: {
        input: document.getElementById('validationEmail'),
        error: document.getElementById('feedbackEmail'),
    },
    phone: {
        input: document.getElementById('validationTelf'),
        error: document.getElementById('feedbackTelf'),
    }
}

// Funció que valida l'element actualment seleccionat
function validarElement(element) {

    // Si l'element no existeix, es surt de la funció
    if (!element) {
        return;
    }

    // Si l'element no té contingut, es posa el border en vermell i surt el missatge d'error
    if (!element.input.value) {
        element.input.style.border = '1px solid red';
        element.error.textContent = 'Aquest camp no pot estar buit';
        $(element.input).removeClass('is-valid').addClass('is-invalid');
        return;
    }

    // Si el camp seleccionat actualment és el del DNI, es fa la comprovació de la seva validesa
    if (elementName === 'DNI') {
        let esValid = validateNIF_NIE(element.input.value);
        if (!esValid) {
            element.input.style.border = '1px solid red';
            element.error.textContent = 'El DNI no és vàlid';
            $(element.input).removeClass('is-valid').addClass('is-invalid');
            return;
        }
    }

    // Si el camp és el del correu electrònic, es comprova la seva validesa també
    if (elementName === 'email') {
        let esValid = validateEmail(element.input.value);
        if (!esValid) {
            element.input.style.border = '1px solid red';
            element.error.textContent = 'El correu no és vàlid';
            $(element.input).removeClass('is-valid').addClass('is-invalid');
            return;
        }
    }

    if (elementName === 'phone') {
        let esValid = validatePhoneNumber(element.input.value);
        if (!esValid) {
            element.input.style.border = '1px solid red';
            element.error.textContent = 'El telèfon no és vàlid';
            $(element.input).removeClass('is-valid').addClass('is-invalid');
            return;
        }
    }

    // En cas de que s'hagin superat les comprovacions, es posa el contorn en verd i es treu el missatge d'error
    element.input.style.border = '1px solid #63b47a';
    element.error.textContent = '';
    $(element.input).removeClass('is-invalid').addClass('is-valid');
}

// Variable que guarda el nom de l'input seleccionat actualment 
let elementName;

// Event que salta cada cop que es tregui el focus d'un dels camps del formulari
formulari.addEventListener("focusout", e => {
    // Declarar l'element actual en una variable 
    elementName = e.target.name;

    // Invocar a la funció que valida els elements
    validarElement(elements[elementName]);
});

// Funció per crear un nom d'usuari a partir dels camps de nom, cognom i DNI
function generarUsername() {

    let nom = document.getElementById('validationNom').value.trim().toLowerCase();
    let cognom = document.getElementById('validationCognoms').value.trim().toLowerCase();
    let dni = document.getElementById('validationDNI').value.trim().toLowerCase();

    // Primera lletra del nom
    nom = nom.charAt(0);

    // Cognoms junts i en minúscula
    cognom = cognom.split(" ").join("");

    // Si el cognom té més de 4 caràcters, es seleccionen els 4 primers, si no, es deixa com esta
    cognom = cognom.length > 4 ? cognom.substring(0, 4) : cognom;

    // Aïllar la inicial del cognom per fer-la majúscula
    let majusCognom = cognom.charAt(0).toUpperCase();

    // Eliminar la inicial del cognom en minúscula
    cognom = cognom.slice(1)

    // Concatenar la inicial en majúscula a la resta del cognom
    cognom = majusCognom + cognom;

    // Bucle per obtenir les posicions imparelles del DNI
    let numerosDNI = '';
    for (let i = 0; i < dni.length; i++) {
        if (i % 2 === 0) {
            numerosDNI += dni.charAt(i);
        }
    }

    // Treure l'últim caràcter que és la lletra
    numerosDNI = numerosDNI.substring(0, numerosDNI.length - 1)

    // Concatenar el nom d'usuari
    let username = nom + cognom + numerosDNI;

    // Mostrar el nom d'usuari al camp del HTML
    document.getElementById('validationUsername').value = username;
}


// Funció per validar el DNI
function validateNIF_NIE(value) {
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
}

// Funció per validar el email
function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}   

// Funció per validar el número de telèfon
function validatePhoneNumber(num) {
    return (/^(?:(?:(?:\+|00)34)|(?:(?:\+|00) 34)?|(34)|(34 ))?[6789]\d{8}$/).test(num);
}