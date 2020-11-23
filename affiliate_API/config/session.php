<?php
    session_start();
    if(!isset($_SESSION['user'])){
        session_destroy();
        header("location: ./login.php");
        die();
    }
    if($_SESSION['authentication'] != 1){
        session_destroy();
        header("location: ./login.php");
        die();
    }
?>