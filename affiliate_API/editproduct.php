<?php
    include('./config/session.php');
    include('./config/database.php');
    $data=null;
    $category_sql = "select * from category where active=1;";
    $category_query = mysqli_query($conn, $category_sql);
    if(mysqli_num_rows($category_query)==0){
        header("location: ./editcategory.php?error=1");
        die();
    } 
    $product_sql = "select * from products;";
    $product_query = mysqli_query($conn, $product_sql);
    if(isset($_POST['submit'])){
        if(isset($_POST['id'])){
            $sql = 'update products set name="'.$_POST['name'].'", hostUrl="'.$_POST['url'].'", imageUrl="'.$_POST['imageurl'].'", price='.$_POST['price'].', type='.$_POST['category'].' where id='.$_POST['id'].';';
        }
        else{
            $sql = 'insert into products(name, hostUrl, imageUrl, price, type) values("'.$_POST['name'].'", "'.$_POST['url'].'", "'.$_POST['imageurl'].'", '.$_POST['price'].', "'.$_POST['category'].'");';
        }
        if(mysqli_query($conn, $sql)){
            header('location: ./editproduct.php?message=success');
        }
        else{
            header('location: ./editproduct.php?message=failed');
        }
    }
    if(isset($_GET['query'])){
        if($_GET['query'] == 'edit'){
            $sql = 'select * from products where id='.$_GET['id'].';';
            $sql_query = mysqli_query($conn, $sql);
            $data = mysqli_fetch_assoc($sql_query);
        }
        else{
            $sql = 'delete from products where id='.$_GET['id'].';';
            if(mysqli_query($conn, $sql)){
                header('location: ./editproduct.php?message=success');
            }
            else{
                header('location: ./editproduct.php?message=failed');
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product</title>
    <script>
        function edit(id){
            window.location = window.location.origin + window.location.pathname +'?query=edit&id='+id;
        }

        function del(id){
            window.location = window.location.origin + window.location.pathname +'?query=delete&id='+id;
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
    <form action="" method="post">
        <?php
            if(isset($_GET['query'])){
                if($_GET['query'] == 'edit'){
                    echo '<input type="hidden" name="id" value='.$_GET['id'].'>';
                }
            }
        ?>
        <div class="items">
            <label for="name">Name: </label>
            <input required type="text" name="name" id="name" value=<?php if(isset($data)){echo $data['name'];}?>>
        </div>
        <div class="items">
            <label for="url">URL: </label>
            <input required type="text" name="url" id="url" value=<?php if(isset($data)){echo $data['hostUrl'];}?>>
        </div>
        <div class="items">
            <label for="imageurl">ImageURL: </label>
            <input type="text" name="imageurl" id="imageurl"  value=<?php if(isset($data)){echo $data['imageUrl'];}?>>
        </div>
        <div class="items">
            <label for="price">Price: </label>
            <input type="text" name="price" id="price"  value=<?php if(isset($data)){echo $data['price'];}?>>
        </div>
        <div class="items">
            <label for="category">Category: </label>
            <select name="category" id="category">
            <?php
                while($row = mysqli_fetch_assoc($category_query)){
                    if($row['id'] == $data['type']){
                        echo '<option value="'.$row['id'].'" selected>'.$row['type'].'</option>';
                    }
                    else{
                        echo '<option value="'.$row['id'].'">'.$row['type'].'</option>';
                    }
                }
            ?>
            </select>
        </div>
        <div class="items">
            <input type="submit" value="Submit" name="submit">
        </div>
    </form>

    <div class="table-products">
        <table>
            <tr>
                <td>Product</td>
                <td>Price</td>
            </tr>
            <?php
                while($row = mysqli_fetch_assoc($product_query)){
                    echo '<tr><td>'.$row['name'].'</td><td>'.$row['price'].'</td>
                    <td><button class="btn" onclick="edit('.$row['id'].')">Edit</button></td>
                    <td><button class="btn" onclick="del('.$row['id'].')">Delete</button></td></tr>';
                }
            ?>
        </table>
    </div>
    
</body>
<style>
    form{
        display: flex;
        flex: 1;
        flex-direction: column;
    }
    input,
    select{
        flex:1;
        margin: 10px;
        align-self: flex-end;
    }
    label{
        flex:1;
        margin: 10px;
        align-self: flex-start;
    }
    .items{
        display:flex;
        flex: 1;
        flex-direction: row;
        justify-items: space-evenly;
    }
    td{
        width: 80%;
    }
    table,
    td{
        padding:10px;
        margin:10px;
        border: 1px solid black;
        
    }
    .table-products{
        padding: 20px;
        max-height: 300px;
        overflow-y: scroll;
    }
</style>
    
</html>