<?php
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    include('./config/database.php');
    $username = test_input($_POST['username']);
    $password = test_input($_POST['password']);
    $sql = 'select * from user where username="'.$username.'" and password="'.$password.'";';
    $user = mysqli_query($conn, $sql);
    if(mysqli_num_rows($user) > 0){
        session_start();
        $_SESSION['user'] = $username;
        $_SESSION['authentication'] = 1;
        header("location: ./dashboard.php");
        die();
    }
    else{
        header("location: ./login.php");
        die();
    }
?>