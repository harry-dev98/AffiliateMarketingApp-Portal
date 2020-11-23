<?php
    include("config/database.php");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET");
    header("Access-Control-Max-Age: 3600");
    $type = $_GET['query'];
    $_alldata = array();
    if($type == 'ads'){
        $sql = "select * from ads;";
        $query = mysqli_query($conn, $sql);
        if(mysqli_num_rows($query)>0){
            $data = array();
            while($row = mysqli_fetch_assoc($query)){
                $data[] = $row;
            }
            $_alldata['ads'] = $data;
        }
    }
    else{
        if($_GET['category'] == 0){
            $sql = "select * from sites;";
        }
        else{
            $sql = "select * from sites where type = ".$_GET['category'].";";
        }
        $query = mysqli_query($conn, $sql);
        if(mysqli_num_rows($query)>0){
            $data = array();
            while($row = mysqli_fetch_assoc($query)){
                $data[] = $row;
            }
            $_alldata['sites'] = $data;
        }
        if($_GET['category'] == 0){
            $sql = "select * from products;";
        }
        else{
            $sql = "select * from products where type = ".$_GET['category'].";";
        }
        $query = mysqli_query($conn, $sql);
        if(mysqli_num_rows($query)>0){
            $data = array();
            while($row = mysqli_fetch_assoc($query)){
                $data[] = $row;
            }
            $_alldata['products'] = $data;
        }
        if($type == 'all'){
            $sql = "select * from category where active = 1;";
            $query = mysqli_query($conn, $sql);
            if(mysqli_num_rows($query)>0){
                $data = array();
                while($row = mysqli_fetch_assoc($query)){
                    $data[] = $row;
                }
                $_alldata['categories'] = $data;
            }
        }
    }
    echo json_encode(array('data'=>$_alldata));
    $conn->close();
?>
