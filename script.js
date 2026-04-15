document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Hero Lock & Unlock Mechanism ---
  const invitationBtn = document.getElementById("invitation-btn");
  const namesSection = document.getElementById("names");

  invitationBtn.addEventListener("click", () => {
    // Remove the class that hides scrollbars
    document.body.classList.remove("locked");

    // Smoothly scroll to the next section
    namesSection.scrollIntoView({ behavior: "smooth" });
  });

  // --- 2. Floating Chat Button Visibility ---
  const chatBtn = document.getElementById("chat-btn");
  const heroSection = document.getElementById("hero");

  window.addEventListener("scroll", () => {
    // If the user has scrolled past the hero section, show the button
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 100) {
      chatBtn.classList.add("show");
    } else {
      chatBtn.classList.remove("show");
    }
  });

  // --- 3. Single Number (Days) Countdown ---
  const targetDate = new Date("December 7, 2026 22:30:00").getTime();
  const daysElement = document.getElementById("days-count");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      // Calculate strictly the days
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      daysElement.innerText = days;
    } else {
      daysElement.innerText = "0";
      document.querySelector(".days-label").innerText = "Today is the Day!";
    }
  }

  // Run immediately, then update every hour
  updateCountdown();
  setInterval(updateCountdown, 1000 * 60 * 60);

  // --- 4. 3D Carousel Generation ---
  const carouselContainer = document.getElementById("hotel-carousel");
  const totalImages = 15;
  const angleIncrement = 360 / totalImages;

  // Translate Z calculates how far to push the images out so they form a perfect cylinder
  // Using a 200px width image, this math provides the radius of our 15-sided polygon
  const translateZ = Math.round(200 / 2 / Math.tan(Math.PI / totalImages));

  for (let i = 0; i < totalImages; i++) {
    const item = document.createElement("div");
    item.classList.add("carousel-item");

    // Placeholders. Replace 'https://picsum.photos...' with your actual hotel image URLs
    item.style.backgroundImage = `url('https://picsum.photos/400/500?random=${i + 1}')`;

    // Position them in a 3D circle
    item.style.transform = `rotateY(${i * angleIncrement}deg) translateZ(${translateZ}px)`;

    carouselContainer.appendChild(item);
  }

  // --- 5. Prevent Default on RSVP Form (Optional Template Logic) ---
  document.getElementById("rsvp-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your RSVP!");
  });

  // --- 6. Scroll Animation Observer ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Triggers slightly before it hits the bottom of the screen
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return; // If not in view, do nothing
      } else {
        entry.target.classList.add("active");
        // Optional: Stop observing once revealed so it doesn't animate out and back in
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealOnScroll.observe(el);
  });

  // Trigger the observer on load for the hero section immediately
  setTimeout(() => {
    document.querySelectorAll("#hero .reveal").forEach((el) => {
      el.classList.add("active");
    });
  }, 100);
});
