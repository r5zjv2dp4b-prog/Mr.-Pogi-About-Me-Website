// Mr. Renren — interactive portfolio

const body = document.body;
const themeToggle = document.getElementById("themeToggle");

// ------------------------------
// Theme toggle
// ------------------------------
const savedTheme = localStorage.getItem("renren-theme");
if (savedTheme === "dark") {
    body.dataset.theme = "dark";
    themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
    const isDark = body.dataset.theme === "dark";

    if (isDark) {
        delete body.dataset.theme;
        themeToggle.textContent = "☀";
        localStorage.setItem("renren-theme", "light");
    } else {
        body.dataset.theme = "dark";
        themeToggle.textContent = "☾";
        localStorage.setItem("renren-theme", "dark");
    }
});

// ------------------------------
// Mobile navigation
// ------------------------------
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ------------------------------
// Scroll reveal animations
// ------------------------------
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => observer.observe(element));

// ------------------------------
// Active navigation link
// ------------------------------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));

            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add("active");
        }
    });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));

// ------------------------------
// Random fun facts
// ------------------------------
const facts = [
    "I'm extroverted, but I can get shy easily.",
    "Sports are one of my favorite ways to spend my time.",
    "Math is one of my strongest academic interests.",
    "I enjoy bonding with my friends.",
    "My favorite color is purple.",
    "I enjoy both competitive sports and online games.",
    "I want to travel to different places in the future.",
    "I want to pursue Accountancy in college."
];

const factText = document.getElementById("factText");
const factButton = document.getElementById("factButton");

factButton.addEventListener("click", () => {
    let nextFact;
    do {
        nextFact = facts[Math.floor(Math.random() * facts.length)];
    } while (nextFact === factText.textContent && facts.length > 1);

    factText.style.opacity = "0";

    setTimeout(() => {
        factText.textContent = nextFact;
        factText.style.opacity = "1";
    }, 180);
});

// ------------------------------
// Mini quiz
// ------------------------------
const quizButtons = document.querySelectorAll("#quizOptions button");
const quizResult = document.getElementById("quizResult");

quizButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.answer === "correct") {
            quizResult.textContent = "Correct! Accounting is the goal. 🎯";
        } else {
            quizResult.textContent = "Not quite! Try again. 😄";
        }
    });
});

// ------------------------------
// Contact form
// ------------------------------
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thanks! Your message was received by this demo form. 💜";
    contactForm.reset();
});

// ------------------------------
// Back to top
// ------------------------------
document.getElementById("backTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
