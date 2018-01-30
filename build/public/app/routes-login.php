<?php  
	// use login
	use \app\control\Login;
	// use token
	use \app\auth\Token;

	// routes login
	$app->post('/login', function($request, $response) {
		// filter var
		$username = filter_var($request->getParam('username'), FILTER_SANITIZE_STRING);
		$password = filter_var($request->getParam('password'), FILTER_SANITIZE_STRING);
		// instance login
		$login = new Login();
		// set data
		$login->setData($username, $password);
		// login
		$result = $login->login();
		// cek result
		if (!empty($result['message']) && $result['status']) {
			// generate token
			$token = new Token($result['message'][0]);
			// set token
			$result['message'][0]['token'] = $token->generate();
		} 
		// response result as json
		return $response->withJson($result);
	});

	// request token
	$app->post('/token', function() {
		$konsumen = filter_var($request->getParam('konsumen'), FILTER_SANITIZE_STRING);
	});
?>