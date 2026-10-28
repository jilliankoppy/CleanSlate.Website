const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

menuToggle?.addEventListener("click", () => {
  const opening =
    menuToggle.getAttribute("aria-expanded") !== "true";

  menuToggle.setAttribute(
    "aria-expanded",
    String(opening)
  );

  navigation.classList.toggle("open", opening);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});

/* Menu category filters */

const filterButtons =
  document.querySelectorAll(".filter-button");

const menuCards =
  document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;

      item.classList.toggle("active", active);

      item.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

    menuCards.forEach((card) => {
      const shouldHide =
        selected !== "all" &&
        card.dataset.category !== selected;

      card.classList.toggle(
        "is-hidden",
        shouldHide
      );
    });
  });
});

/* Cafe mood recommendations */

const recommendations = {
  energized: {
    icon: "⚡",
    title: "Cold brew + avocado toast",
    copy:
      "A crisp caffeine boost paired with a fresh, satisfying bite."
  },

  cozy: {
    icon: "☕",
    title: "Apple cardamom latte",
    copy:
      "A warm latte with a house-made syrup and your choice of milk."
  },

  refreshed: {
    icon: "🥤",
    title: "Grateful Green smoothie",
    copy:
      "Fruit, greens and plant-based ingredients blended into a bright reset."
  },

  hungry: {
    icon: "🥑",
    title: "Avocado toast + matcha",
    copy:
      "A gluten-free cafe pairing that is colorful, clean and filling."
  }
};

const moodButtons =
  document.querySelectorAll(
    ".mood-buttons button"
  );

const recommendation =
  document.querySelector("#recommendation");

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    moodButtons.forEach((item) => {
      item.classList.toggle(
        "active",
        item === button
      );
    });

    const result =
      recommendations[button.dataset.mood];

    recommendation.classList.add("pop");

    window.setTimeout(() => {
      recommendation.innerHTML = `
        <p class="recommendation-label">
          Your pairing
        </p>

        <div
          class="recommendation-icon"
          aria-hidden="true"
        >
          ${result.icon}
        </div>

        <h3>${result.title}</h3>

        <p>${result.copy}</p>
      `;

      recommendation.classList.remove("pop");
    }, 180);
  });
});

/* Scroll reveal effects */

const revealObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );
        }
      });
    },
    {
      threshold: 0.12
    }
  );

document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    revealObserver.observe(element);
  });

/* Automatically update footer year */

document.querySelector("#year").textContent =
  new Date().getFullYear();
