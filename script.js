/* Toggle Logic */
const toggle = document.getElementById("ppToggle");
const nav = document.getElementById("ppNav");
const body = document.body;

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
  body.classList.toggle("no-scroll"); // Scroll band karne ke liye jab menu open ho
});

/* Close menu when clicking a link */
document.querySelectorAll("#ppNav a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    nav.classList.remove("active");
    body.classList.remove("no-scroll");
  });
});

/* Improved Scroll Reveal */
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
// Initial check
reveal();

// hero section scripting
const textPath = document.querySelector("#flowText");
let offset = 0;

function animate() {
  // Speed control: adjust the negative increment for speed customization
  offset -= 0.04;
  textPath.setAttribute("startOffset", offset + "%");

  // Resets seamlessly when the first full text block scrolls out of frame
  if (offset <= -50) {
    offset = 0;
  }
  requestAnimationFrame(animate);
}

// Initialize animation
window.addEventListener("DOMContentLoaded", animate);
// hero section scripting ends here

// welcome   section scripting
const facts = [
  "Little minds explore, imagine, create, learn, grow, and bloom beautifully.",

  "Nature and creativity inspire curiosity, confidence, happiness, and joyful learning.",

  "Every child feels supported, valued, inspired, creative, confident, and completely free.",

  "Playful experiences encourage imagination, confidence, creativity, discovery, and cognitive development.",

  "Beautiful beginnings nurture confidence, creativity, happiness, curiosity, and lifelong learning.",
];

let idx = 0;
const txt = document.getElementById("cText");
let isTransitioning = false;

function next() {
  if (isTransitioning) return;
  idx = (idx + 1) % facts.length;
  update();
}

function prev() {
  if (isTransitioning) return;
  idx = (idx - 1 + facts.length) % facts.length;
  update();
}

function update() {
  isTransitioning = true;
  txt.style.opacity = 0;

  setTimeout(() => {
    txt.innerText = facts[idx];
    txt.style.opacity = 1;
    isTransitioning = false;
  }, 400);
}

// Optional: Auto-play carousel every 8 seconds
setInterval(next, 4000);
// welcome  section scripting ends here

// animation scripting
(function () {
  "use strict";

  const initEnhancedAnimations = () => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    if (!("IntersectionObserver" in window)) {
      animatedElements.forEach((el) => (el.style.opacity = "1"));
      return;
    }

    const observerOptions = {
      threshold: 0.1, // 10% dikhne pe chalega
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
  };

  // Run on Load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEnhancedAnimations);
  } else {
    initEnhancedAnimations();
  }
})();

// book now modal scripting
const modal = document.getElementById("bookingModal");
const bookButtons = document.querySelectorAll(
  ".pp-book, .cta-section .btn-primary",
);
const closeBtn = document.getElementById("closeModal");
const bookingForm = document.querySelector(".booking-form");
const successDiv = document.getElementById("submissionSuccess");

if (modal && bookButtons.length > 0) {
  // Har button ke liye click event listener lagana
  bookButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  if (bookingForm && successDiv) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      bookingForm.style.display = "none";
      successDiv.style.display = "block";
      successDiv.classList.add("animate-zoom-in");

      setTimeout(() => {
        closeModalFunc();
      }, 5000);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeModalFunc();
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
}

function closeModalFunc() {
  const modalEl = document.getElementById("bookingModal");
  const formEl = document.querySelector(".booking-form");
  const successEl = document.getElementById("submissionSuccess");

  if (modalEl) {
    modalEl.style.display = "none";
    document.body.style.overflow = "auto";
  }

  setTimeout(() => {
    if (formEl && successEl) {
      formEl.style.display = "block";
      successEl.style.display = "none";
      formEl.reset();
    }
  }, 500);
}
