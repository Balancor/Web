<?php

function getDatabaseConnection()
{
    $mysql_server_name="localhost:3306";
    $mysql_username="blog"; 
    $mysql_password="guoguo"; 
    $mysql_database="blog";
         
    // 连接到数据库     
    $conn=mysql_connect($mysql_server_name, $mysql_username,     
                        $mysql_password);
    retrun $conn;
}

?>
