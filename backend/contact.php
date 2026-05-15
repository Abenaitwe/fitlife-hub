<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST method required.'], 405);
}

$name = trim($_POST['name'] ?? '');
$email = strtolower(trim($_POST['email'] ?? ''));
$message = trim($_POST['message'] ?? '');

if (strlen($name) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10) {
    json_response(['success' => false, 'message' => 'Please complete all fields correctly.'], 422);
}

$statement = $pdo->prepare('INSERT INTO feedback (full_name, email, message) VALUES (?, ?, ?)');
$statement->execute([$name, $email, $message]);

json_response(['success' => true, 'message' => 'Feedback saved.'], 201);
