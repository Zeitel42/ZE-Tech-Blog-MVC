const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-input-login").value.trim();
  const password = document.querySelector("#password-input-login").value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // console.log(username);
      // If successful, redirect the browser to the profile page
      document.location.replace("/dashboard");
    } else {
      alert("No user found. Get bent.");
    }
  }
};

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);
} else {
  console.log("Form issues");
}
