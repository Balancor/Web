<?php

include_once "server/database_helper.php";
include_once "server/Category.php";

function main(){

	$databaseHelper =  new DatabaseHelper("blog", "guoguo", "blog");

	$pathinfo = explode("/", $_SERVER['PATH_INFO']);

	$location = $pathinfo[1];
	if($location == ''){
		header("Location: index.html");
	} elseif ($location == 'GetCategory') {
		$qresult = $databaseHelper->query("select * from category");
		if(!$qresult){
			error_log("qresult is null " , 3, "log.txt");
		} else {
			while($row = $qresult->fetch()){

				error_log("row: "+json_encode($row), 3, 'log.txt');

//				$c = new Category();
//				$c->id = $row->_id;
//				$c->name = $row->name;
				$results[] = null;
			}
		}

		$ret = json_encode(array("state" => "success",  'categories' => $results));
		error_log("query Result  " + $ret, 3, "log.txt");
		header('Content-Type:application/octet-stream');
		header('Content-Length: ' . strlen($ret));
		echo $ret;
		exit();
	}
	$pdo = null;

}

main();
?>
