<?php
// action_page.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // prevent direct GET requests
    header('Location: contact.html');
    exit;
}

// 1) Gather & sanitize inputs
$user_email   = filter_input(INPUT_POST, 'email',   FILTER_SANITIZE_EMAIL);
$subject      = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
$message_body = trim($_POST['message']); // you can also sanitize further

// 2) Basic validation
$errors = [];
if (! filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Ongeldig e-mail adres.';
}
if (empty($subject)) {
    $errors[] = 'Onderwerp is verplicht.';
}
if (empty($message_body)) {
    $errors[] = 'Bericht mag niet leeg zijn.';
}

if ($errors) {
    // on error, redirect back with error flag
    header('Location: contact.html?success=0');
    exit;
}

// 3) Prepare the mail
$to      = 'services@ja-motion.com';  // <-- your real recipient
$headers = [
    'From'    => $user_email,
    'Reply-To'=> $user_email,
    'Content-Type' => 'text/plain; charset=UTF-8',
];
$formatted_headers = '';
foreach ($headers as $key => $value) {
    $formatted_headers .= "$key: $value\r\n";
}

// 4) Send it
if (mail($to, $subject, $message_body, $formatted_headers)) {
    header('Location: contact.html?success=1');
} else {
    header('Location: contact.html?success=0');
}
exit;
