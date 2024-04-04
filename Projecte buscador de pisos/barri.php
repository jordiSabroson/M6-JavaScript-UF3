<?php
include "base_de_dades.php";

try {
    $connexio = mysqli_connect(host, username, password, database);
    if ($connexio) {
        $districte = $_POST["dis"];
        $query = "SELECT * FROM barris WHERE id_districte = $districte;";
        $barris = mysqli_query($connexio, $query);

        // Afegir els resultats de la consulta a un array
        $return = array();

        while ($row = mysqli_fetch_assoc($barris)) {
            $object = new stdClass();
            $object->id = $row["id"];
            $object->name = $row["name"];
            $object->id_districte = $row["id_districte"];
            array_push($return, $object);
        }

        echo json_encode($return);
    } else {
        echo "La connexió no ha funcionat";
    }
} catch (PDOException $e) {
    echo "Error de connexió en " . database;
} finally {
    mysqli_close($connexio);
}
