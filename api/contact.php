<?php
if ( $_REQUEST["zbname__4"] == 'zbemail' ) {
	$result = processForm();
	$response = array( 'data' => 'success', 'result' => $result); 
} else {
	$response = array( 'data' => 'fail', 'req' => $_REQUEST["zbname__4"]); 
}

echo json_encode($response);

function processForm () {
	$email = "jason@zestybytes.com";
	$message = "The following information was submitted from the form on your website:\n";
	$message .= "Name: ".$_REQUEST["Name__1"]."\n\n";
	$message .= "Email: ".$_REQUEST["Email__2"]."\n\n";
	$message .= "Message: ".$_REQUEST["Message__3"]."\n\n";
	$message .= "zbname: ".$_REQUEST["zbname__4"]."\n\n";
	// $headers2 = "MIME-Version: 1.0\r\n"
	// ."Content-type: text/html; charset=iso-8859-1\r\n"
	// ."Content-Transfer-Encoding: 8bit\r\n"
	// ."From: =?UTF-8?B?".base64_encode(".$email.")."?= <".$email.">\r\n"
	// ."Reply-To: ".$email."\r\n"
	// ."X-Mailer: PHP/".phpversion();
	// return mail( $email, "Form Submission from your zesty website", $message, $headers2 );
	return mail( $email, "Form Submission from your zesty website", $message );
}

?>
