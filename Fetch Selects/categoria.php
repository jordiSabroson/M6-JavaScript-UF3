<?php
include "base_de_dades.php";

try {
    // Variable que guarda la connexió a la BBDD
    $connexio = mysqli_connect(host, username, password, database);

    // Si la connexió és correcta, es segueix executant el codi
    if ($connexio) {

        // SELECT a la base de dades de la taula Categories
        $query = "SELECT * FROM Categories;";

        // El mètode mysqli query executa la petició 
        $cats = mysqli_query($connexio, $query);

        // Afegir els resultats de la consulta a un array
        $return = array();

        // Mentre hi hagi files a la petició s'executa el while que agafa els valors i els ajunta en un array
        while ($row = mysqli_fetch_assoc($cats)) {
            $object = new stdClass();
            $object->id = $row["id"];
            $object->name = $row["name"];
            array_push($return, $object);
        }
        
        // Un cop tenim l'array amb el contingut de la taula Categories, ho passem a JSON i ho retornem
        echo json_encode($return);
    } else {

    }
} catch (PDOException $e) {
    echo "Error de connexió en " . database;
} finally {
    mysqli_close($connexio);
}
?> 
