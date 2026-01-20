<?php
// Prevent HTML error output from breaking JSON
error_reporting(E_ALL);
ini_set('display_errors', 0); 

$host = '127.0.0.1'; // Use IP to avoid localhost resolution issues
$user = 'root';
$pass = 'AliefL215';
$db_name = 'smartagri_db';

try {
    $conn = new mysqli($host, $user, $pass, $db_name);
    
    if ($conn->connect_error) {
        throw new Exception($conn->connect_error);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}
?>