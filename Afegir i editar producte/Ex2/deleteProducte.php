<?php

include 'database_info.php';

$response = array();

if (isset($_POST["id"]) && !empty($_POST["id"])) {
    // Create connection
    $conn = new mysqli(host, username, password, database);
    // Check connection
    if ($conn->connect_error) {
        $response['success'] = false;
        $response['message'] = "Connection failed: " . $conn->connect_error;
    } else {
        $sql = "DELETE FROM productes WHERE id=" . $_POST["id"];
        if ($conn->query($sql) === TRUE) {
            $response['success'] = true;
            $response['message'] = "Record deleted successfully";
        } else {
            $response['success'] = false;
            $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
        }
        $conn->close();
    }
} else {
    $response['success'] = false;
    $response['message'] = "ID not provided";
}
echo json_encode($response);
