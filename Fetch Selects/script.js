let catSelect = document.getElementById("cat");
let subcatSelect = document.getElementById("subcat");

fetch("categoria.php")
    .then((response) => response.json())
    .then((data) => {
        let options = "";

        // Per cada fila del JSON, creem un element HTML en forma d'string amb els valors ID i name
        data.forEach(categoria => {
            options += `<option id="categoria" value="${categoria.id}">${categoria.name}</option>`;
        });

        // Agafem l'string concatenat amb els elements HTML i el posem al innerHTML
        catSelect.innerHTML = options;
    })
    .catch(error => console.log("Error: ", error));

// Amb l'eventListener, cada cop que canviem de categoria es dispara el següent codi
catSelect.addEventListener("change", function () {
    // Netejar el select de subcategories perquè no s'acumulin
    subcatSelect.innerHTML = "";

    // Recuperar la opció seleccionada
    let opcioActual = this.options[catSelect.selectedIndex];

    // Creem el formData i afegim el valor seleccionat
    let formData = new FormData();
    formData.append("cat1", opcioActual.value);

    // Opcions per a la solicitud FETCH
    let options = {
        method: 'POST',
        body: formData
    }

    // Solicitud FETCH al fitxer php
    fetch("subcategoria.php", options)
        .then((response) => response.json())
        .then((data) => {
            let opcions = "";
            data.forEach(subcategoria => {
                opcions += `<option id="subcategoria" value="${subcategoria.id}">${subcategoria.name}</option>`;
            });
            subcatSelect.innerHTML = opcions;
        })
        .catch((error) => {
            console.log("Error en la solicitud FETCH:", error);
        });
})

