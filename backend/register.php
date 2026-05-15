<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST method required.'], 405);
}

$name = trim($_POST['name'] ?? '');
$email = strtolower(trim($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';
$goal = trim($_POST['goal'] ?? 'Healthy lifestyle');

if (strlen($name) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
    json_response(['success' => false, 'message' => 'Please provide a valid name, email, and password.'], 422);
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $pdo->beginTransaction();
    $statement = $pdo->prepare('INSERT INTO users (full_name, email, password_hash, fitness_goal) VALUES (?, ?, ?, ?)');
    $statement->execute([$name, $email, $hash, $goal]);
    $userId = (int) $pdo->lastInsertId();

    $progress = $pdo->prepare('INSERT INTO progress (user_id) VALUES (?)');
    $progress->execute([$userId]);
    $pdo->commit();

    json_response(['success' => true, 'message' => 'Registration successful.', 'user_id' => $userId], 201);
} catch (PDOException $error) {
    $pdo->rollBack();
    json_response(['success' => false, 'message' => 'Email may already be registered.'], 409);
}
