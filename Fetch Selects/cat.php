<?php
include "base_de_dades.php";

try{
    $connexio = mysqli_connect(host, database, username, password);
    if ($connexio) {
        $cat = $_POST["cat"];
        $query = "SELECT name FROM subcategories WHERE catId = '$cat'";
        $subcats = mysqli_query($connexio, $query);

        // Afegir els resultats de la consulta a un array
        $return = array();
        $object = new stdClass();
        $object->name = $row["name"];
        $object->subId = $row["subId"];

        $return[] = $object;

        echo json_encode($return);
    } else {

    }
} catch (PDOException $e) {
    echo "Error de connexió en " . database;
} finally {
    mysqli_close($connect);
}

