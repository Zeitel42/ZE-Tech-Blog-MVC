const logout = function () {
  const response = fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Failed to log out");
  }
};

document.querySelector("#logout-link").addEventListener("click", logout);
