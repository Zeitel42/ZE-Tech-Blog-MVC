const logout = function () {
  const response = fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/");
    console.log("logged out, mf'r");
  }
};

document.querySelector("#logout-link").addEventListener("click", logout);
