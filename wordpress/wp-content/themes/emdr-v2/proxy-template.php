<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type');

// Template Name: Proxy

$api_url = $_SERVER['HTTP_HOST'].'/api';

$params = $_POST;

unset($params['api_type']);

if( isset($_POST['api_type']) && isset($_POST['action'])) {
	
	$ch = curl_init();
	if($_POST['api_type']=="POST") {
		
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_POST, 1);
		/*
		$post = array();
		foreach($params as $key=>$value) {
			if($key=="parameters") {
				$arr = json_decode(stripslashes($params[$key]));
				
				$post[$key] = json_encode($arr);
			}
			else {
				$post[$key] = $value;
			}
			
		}
		*/
		$post = http_build_query($params);
		
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	}
	elseif($_POST['api_type']=="GET") {
		$query = "?";
		foreach($params as $key=>$value) {
			$query .= $key.'='.$value.'&';
		}
		curl_setopt($ch, CURLOPT_URL, $api_url.$query);
	}
	curl_setopt($ch, CURLOPT_TIMEOUT, 5000);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	
	$result = array();
	try{
		$data = curl_exec($ch);
		
		curl_close($ch);
		
		$data = json_decode($data, true);
		
		if(isset($data['error'])) {
			$result = array("status"=>"error", "errorMsg"=>$data['error']);
		}
		else {
			$result = array("status"=>"succ", "data"=>$data);
		}
	}
	catch(Exception $e) {
		$result = array("status"=>"error", "errorMsg"=>$e->getMessage());
	}
}
else {
	$result = array("status"=>"error", "errorMsg"=>"No request has been sent");
}

echo json_encode($result);

exit;
