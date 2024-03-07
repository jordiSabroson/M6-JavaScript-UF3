function cambiarCategoria() {
    var categoriaSeleccionada = document.getElementById("cat").value;
    fetch("cat.php")
        .then((response) => response.json())
        .then((data) => {
            categoriaSeleccionada.addEventListener("change", function () {
                var subcategoriaSelect = document.getElementById("subcat");

                // Limpiar las opciones actuales en el segundo select
                subcategoriaSelect.innerHTML = "";

                // Procesar la respuesta JSON y cargar las subcategorías
                data.forEach((subcategoria) => {
                    var option = document.createElement("option");
                    option.text = subcategoria.name;
                    option.value = subcategoria.subId;
                    subcategoriaSelect.add(option);
                });
            })
                .catch((error) => {
                    console.error("Error en la solicitud FETCH:", error);
                });
        });
}