<?php

function main(){
	error_log("router.php\r\n", 3, './log.txt');
    $mysql_server_name='mysql:host=localhost;dbname=blog;port=3306';
    $mysql_username="blog"; 
    $mysql_password="guoguo"; 
         
    $pdo = new PDO($mysql_server_name,$mysql_username, $mysql_password);
	$pdo->exec('set names utf8');


	$pathinfo = explode("/", $_SERVER['PATH_INFO']);

	$location = $pathinfo[1];
	if($location == ''){
		header("Location: http://localhost/index.html");
	} elseif ($location == 'GetCategory') {
		error_log("router.php:: GetCategory\r\n", 3, './log.txt');
		$qresult = $pdo->query("select name from category");
		if(!qresult){

		} else {
			while($row = $qresult->fetch()){
				$results[] = $row[0];
			}
		}
		
		$ret = json_encode($results);

		header('Content-Type:application/octet-stream');
		header('Content-Length: ' . strlen($ret));
		echo $ret;
		exit();
	}
	$pdo = null;

}

main();
?>