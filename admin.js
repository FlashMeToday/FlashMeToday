document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "Admin.html";
      } else {
        document.getElementById("error").innerText = "Invalid credentials.";
      }
    });