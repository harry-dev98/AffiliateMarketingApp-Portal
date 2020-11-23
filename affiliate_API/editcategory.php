<?php
    include('./config/session.php');
    include('./config/database.php');
    $category_sql = "select * from category";
    $category_query = mysqli_query($conn, $category_sql);
    if(isset($_GET['query'])){
        $sql = 'update category set active='.$_GET['active'].' where id='.$_GET['id'].';';
        if(mysqli_query($conn, $sql)){
            header('location: ./editcategory.php?message=success');
        }
        else{
            header('location: ./editcategory.php?message=failed');
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category</title>
    <script>
        function changeStatus(id, active){
            active = parseInt(active);
            active = 1 - active;
            window.location = window.location.origin + window.location.pathname + "?query=change&id="+id+"&active="+active;
        }
    </script>
</head>
<body>
    <div style="left:20px;">
        <a href="./dashboard.php">Dashboard</a>
    </div>
    <div >
        <?php
            if(isset($_GET['message'])){
                if($_GET['message'] == 'success'){
                    echo 'Action: Success!!';
                }
                else{
                    echo 'Action: Failed!!';
                }
            }  
        ?>
    </div>
        
    <div class="table-sites">
        <table>
            <tr>
                <td>Name</td>
                <td>Type</td>
            </tr>
            <?php
                while($row = mysqli_fetch_assoc($category_query)){
                    echo '<tr><td>'.$row['name'].'</td><td>'.$row['type'].'</td>';
                    if($row['active'] == 0){
                        echo '<td><button class="btn" onclick=changeStatus('.$row['id'].','.$row['active'].') >Enable</button></td>';
                    }
                    else{
                        echo '<td><button class="btn" onclick=changeStatus('.$row['id'].','.$row['active'].') >Disable</button></td></tr>';
                    }
                }
            ?>
        </table>
    </div>
</body>
<style>
    td{
        width: 50%;
    }
    table,
    td{
        padding:10px;
        margin:10px;
        border: 1px solid black;
        
    }
    .table-sites{
        padding: 20px;
    }
</style>


</html>