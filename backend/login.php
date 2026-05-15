<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'POST method required.'], 405);
}

$email = strtolower(trim($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';

$statement = $pdo->prepare('SELECT id, full_name, email, password_hash, fitness_goal FROM users WHERE email = ?');
$statement->execute([$email]);
$user = $statement->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    json_response(['success' => false, 'message' => 'Invalid email or password.'], 401);
}

json_response([
    'success' => true,
    'message' => 'Login successful.',
    'user' => [
        'id' => $user['id'],
        'name' => $user['full_name'],
        'email' => $user['email'],
        'goal' => $user['fitness_goal'],
    ],
]);
