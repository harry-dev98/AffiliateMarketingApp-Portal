<?php
    include('./config/session.php');
    include('./config/database.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <div class="container">
        <div class="btn-container">
            <div class="btn">
                <a href="./editsite.php">Add Sites</a>
            </div>
            <div class="btn">
                <a href="./editproduct.php">Add Products</a>
            </div>   
            <div class="btn">
                <a href="./editad.php">Add Ads</a>
            </div>      
            <div class="btn">
                <a href="./editcategory.php">Modify Categories</a>
            </div>   
        </div>
    </div>
</body>
<style>
    .container{
        display: flex;
        flex: 1;
        justify-content: center;
        margin: 20px;
        padding: 10px;
    }
    .btn-container{
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 15%;
        width: 60%;
        justify-content: center;
        background-color: 'black';
    }
    .btn{
        align-content: center;
        padding: 10px;
        margin: 20px;
        width: 100%;
        height: 100%;
    }
</style>

</html>
