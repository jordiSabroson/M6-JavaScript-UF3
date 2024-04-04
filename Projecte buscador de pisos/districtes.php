<?php
include "base_de_dades.php";

try {
    $connexio = mysqli_connect(host, username, password, database);
    if ($connexio) {
        $consulta = "SELECT * FROM districtes";

        $districtes = mysqli_query($connexio, $consulta);

        $return = array();

        while ($row = mysqli_fetch_assoc($districtes)) {
            $object = new stdClass();
            $object->id = $row["id"];
            $object->name = $row["name"];
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
