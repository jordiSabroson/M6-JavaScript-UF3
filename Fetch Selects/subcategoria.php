<?php
include "base_de_dades.php";

try {
    $connexio = mysqli_connect(host, username, password, database);
    if ($connexio) {
        $cat = $_POST["cat1"];
        $query = "SELECT * FROM Subcategories WHERE catId = $cat;";
        $subcats = mysqli_query($connexio, $query);

        // Afegir els resultats de la consulta a un array
        $return = array();

        while ($row = mysqli_fetch_assoc($subcats)) {
            $object = new stdClass();
            $object->subId = $row["subId"];
            $object->name = $row["name"];
            $object->catId = $row["catId"];
            array_push($return, $object);
        }
        
        echo json_encode($return);
    } else {

    }
} catch (PDOException $e) {
    echo "Error de connexió en " . database;
} finally {
    mysqli_close($connexio);
}

