<?php

include 'database_info.php';


if (isset($_GET["id"]) && !empty($_GET["id"])) {
    // Create connection
    $conn = new mysqli(host, username, password, database);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "DELETE FROM productes WHERE id=" . $_GET["id"];

    echo $sql;

    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

header('Location: ex1Llistat.php');