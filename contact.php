<?php
/**
 * GoalMiners Contact Form Mailer
 * Sends contact form submissions to info@goalminers.com
 */

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit;
}

// Sanitize & validate inputs
$name    = trim(strip_tags($_POST["name"]    ?? ""));
$email   = trim(strip_tags($_POST["email"]   ?? ""));
$subject = trim(strip_tags($_POST["subject"] ?? ""));
$message = trim(strip_tags($_POST["message"] ?? ""));

$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "A valid email address is required.";
}
if (empty($subject)) {
    $errors[] = "Subject is required.";
}
if (empty($message)) {
    $errors[] = "Message is required.";
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => implode(" ", $errors)]);
    exit;
}

// Build the email
$to          = "info@goalminers.com";
$emailSubject = "GoalMiners Contact: " . $subject;

$body  = "You have received a new message via the GoalMiners website contact form.\n\n";
$body .= "------------------------------------\n";
$body .= "Name    : " . $name . "\n";
$body .= "Email   : " . $email . "\n";
$body .= "Subject : " . $subject . "\n";
$body .= "------------------------------------\n\n";
$body .= $message . "\n\n";
$body .= "------------------------------------\n";
$body .= "Sent from: goalminers.com\n";

// Headers
$headers  = "From: GoalMiners Website <noreply@goalminers.com>\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send
$sent = mail($to, $emailSubject, $body, $headers);

if ($sent) {
    echo json_encode([
        "success" => true,
        "message" => "Thank you! Your message has been sent. We will get back to you shortly."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Sorry, there was a problem sending your message. Please try again or email us directly at info@goalminers.com."
    ]);
}
