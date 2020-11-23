<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <div class="container">
        <form action="./setusersession.php" method="post">
            <div class="items">
                <label for="username">Username: </label>
                <input type="text" name="username" id="username">
            </div>
            <div class="items">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password">
            </div>
            <div class="items">
                <label for="submit"></label>
                <input type="submit" name="submit" value="Submit">
            </div>
        </form>
    </div>
</body>
<style>
    .container{
        display: flex;
        justify-content: center;
        flex: 1;
        padding: 10px;
        margin: 20px;
    }
    .items{
        display: flex;
        justify-content: space-between;
        margin: 20px;
    }
    input{
        margin: 10px;
    }
    label{
        margin: 10px;
    }
</style>
</html>