console.log("Personal profile website loaded successfully.");

const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(`Navigating to ${link.textContent}`);
  });
});
