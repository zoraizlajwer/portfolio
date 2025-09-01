// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  // toggle the 'light' class (dark is default in CSS)
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

// GitHub button
const githubBtn = document.getElementById("github-btn");
githubBtn.addEventListener("click", () => {
  window.open("https://github.com/ZoraizLajwer"); // replace with your GitHub profile/repo
});
