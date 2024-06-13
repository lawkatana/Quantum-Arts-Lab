<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Check if POST variables are set
  if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
    // Sanitize and validate the form data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
        exit;
    }
    
    // Prepare the email content
    $to = 'info@quantumartslab.co.za'; // Replace with your email address
    $email_subject = 'New Form Submission'; // Fixed email subject
    $headers = "From: noreply@quantumartslab.co.za" . "\r\n"; // Use a fixed "From" address
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body content
    $body = "<h2>New Form Submission</h2>";
    $body .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
    $body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $body .= "<p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>";
    $body .= "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
    
    // Send the email
    if(mail($to, $email_subject, $body, $headers)) {
      echo json_encode(['success' => true]);
    } else {
      echo json_encode(['success' => false, 'error' => 'Email failed to send.']);
    }
  } else {
    // Send an error response if POST variables are not set
    echo json_encode(['success' => false, 'error' => 'Form data not submitted properly.']);
  }
}
?>
