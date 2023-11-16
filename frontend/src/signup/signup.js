// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    // Put your login logic here
    alert('Login submitted!');
  });
  
  // Handle create account form submission
  document.getElementById('createAccountForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    // Validation logic can be added here
    
    // Check if passwords match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Put your account creation logic here
    alert('Account creation submitted!');
  });
  
  // Handle social login buttons
  document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', function() {
      // Replace with actual social login logic
      alert('Continue with ' + this.textContent);
    });
  });
  