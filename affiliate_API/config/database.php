<?php

$servername = "localhost";
$username = "examday";
$pass = "examday";
$db="API";
// $username = "u842801317_API";
// $pass = "api@API123";
// $db="API";

$conn = mysqli_connect($servername, $username, $pass, $db);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
date_default_timezone_set("Asia/Calcutta");
?>