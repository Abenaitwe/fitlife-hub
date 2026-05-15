const plans = {
  beginner: [
    "5 minute warm up walk",
    "3 sets of 12 bodyweight squats",
    "3 sets of 10 wall push-ups",
    "20 second plank",
    "5 minute stretch"
  ],
  intermediate: [
    "8 minute jog or skipping",
    "4 sets of 15 squats",
    "3 sets of 12 push-ups",
    "3 sets of 12 lunges per leg",
    "40 second plank"
  ],
  advanced: [
    "10 minute cardio warm up",
    "5 sets of 20 jump squats",
    "4 sets of 15 push-ups",
    "4 sets of 12 burpees",
    "60 second plank hold"
  ]
};

const mealPlans = {
  energy: [
    "Breakfast: oats, banana, and milk",
    "Lunch: rice, beans, avocado, and vegetables",
    "Snack: groundnuts and fruit",
    "Dinner: sweet potatoes, fish, greens, and water"
  ],
  strength: [
    "Breakfast: eggs, chapati, and fruit",
    "Lunch: posho, beans, vegetables, and water",
    "Snack: yoghurt or milk",
    "Dinner: chicken, rice, greens, and fruit"
  ],
  balance: [
    "Breakfast: millet porridge and banana",
    "Lunch: matooke, groundnut sauce, greens, and water",
    "Snack: mango or orange",
    "Dinner: rice, peas, vegetables, and water"
  ]
};

function getUsers() {
  return JSON.parse(localStorage.getItem("fitlifeUsers") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("fitlifeUsers", JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem("fitlifeSession") || "null");
}

function saveSession(user) {
  localStorage.setItem("fitlifeSession", JSON.stringify(user));
}

function showMessage(id, text, isError = false) {
  const node = document.getElementById(id);
  if (!node) return;
  node.textContent = text;
  node.classList.toggle("error", isError);
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

function setupPlanTabs(selector, data, outputId) {
  const tabs = document.querySelectorAll(selector);
  const output = document.getElementById(outputId);
  if (!tabs.length || !output) return;

  function render(key) {
    output.innerHTML = data[key].map((item) => `<li>${item}</li>`).join("");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      render(tab.dataset.plan || tab.dataset.meal);
    });
  });

  render(tabs[0].dataset.plan || tabs[0].dataset.meal);
}

function setupTimer() {
  const display = document.getElementById("timerDisplay");
  const start = document.getElementById("timerStart");
  const reset = document.getElementById("timerReset");
  const select = document.getElementById("timerMinutes");
  if (!display || !start || !reset || !select) return;

  let seconds = Number(select.value) * 60;
  let interval = null;

  function render() {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    display.textContent = `${mins}:${secs}`;
  }

  function stop() {
    clearInterval(interval);
    interval = null;
    start.textContent = "Start";
  }

  select.addEventListener("change", () => {
    stop();
    seconds = Number(select.value) * 60;
    render();
  });

  start.addEventListener("click", () => {
    if (interval) {
      stop();
      return;
    }
    start.textContent = "Pause";
    interval = setInterval(() => {
      seconds = Math.max(0, seconds - 1);
      render();
      if (seconds === 0) stop();
    }, 1000);
  });

  reset.addEventListener("click", () => {
    stop();
    seconds = Number(select.value) * 60;
    render();
  });

  render();
}

function setupAuth() {
  const register = document.getElementById("registerForm");
  const login = document.getElementById("loginForm");

  if (register) {
    register.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(register);
      const name = form.get("name").trim();
      const email = form.get("email").trim().toLowerCase();
      const password = form.get("password");
      const goal = form.get("goal");

      if (name.length < 3) return showMessage("registerMessage", "Please enter a full name.", true);
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showMessage("registerMessage", "Please enter a valid email.", true);
      if (password.length < 6) return showMessage("registerMessage", "Password must be at least 6 characters.", true);

      const users = getUsers();
      if (users.some((user) => user.email === email)) {
        return showMessage("registerMessage", "That email is already registered. Please log in.", true);
      }

      const user = { name, email, password, goal, workouts: 0, meals: 0, minutes: 0 };
      users.push(user);
      saveUsers(users);
      saveSession({ email, name, goal });
      register.reset();
      showMessage("registerMessage", "Account created. You can now open your dashboard.");
    });
  }

  if (login) {
    login.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(login);
      const email = form.get("email").trim().toLowerCase();
      const password = form.get("password");
      const user = getUsers().find((item) => item.email === email && item.password === password);

      if (!user) return showMessage("loginMessage", "Invalid email or password.", true);

      saveSession({ email: user.email, name: user.name, goal: user.goal });
      showMessage("loginMessage", "Login successful. Open the dashboard to view progress.");
    });
  }
}

function setupDashboard() {
  const welcome = document.getElementById("dashboardWelcome");
  if (!welcome) return;

  const session = getSession();
  const users = getUsers();
  const user = session ? users.find((item) => item.email === session.email) : null;

  if (!user) {
    welcome.textContent = "Please register or log in to view your progress dashboard.";
    document.querySelectorAll("[data-dashboard]").forEach((item) => item.style.display = "none");
    return;
  }

  welcome.textContent = `Welcome back, ${user.name}. Your current goal is ${user.goal}.`;
  document.getElementById("workoutCount").textContent = user.workouts;
  document.getElementById("mealCount").textContent = user.meals;
  document.getElementById("minuteCount").textContent = user.minutes;
  document.getElementById("workoutBar").style.setProperty("--value", `${Math.min(user.workouts * 14, 100)}%`);
  document.getElementById("mealBar").style.setProperty("--value", `${Math.min(user.meals * 14, 100)}%`);

  document.getElementById("addWorkout").addEventListener("click", () => updateProgress(user.email, "workouts", 1));
  document.getElementById("addMeal").addEventListener("click", () => updateProgress(user.email, "meals", 1));
  document.getElementById("addMinutes").addEventListener("click", () => updateProgress(user.email, "minutes", 15));
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("fitlifeSession");
    location.reload();
  });
}

function updateProgress(email, field, amount) {
  const users = getUsers();
  const user = users.find((item) => item.email === email);
  if (!user) return;
  user[field] += amount;
  saveUsers(users);
  location.reload();
}

function setupContact() {
  const contact = document.getElementById("contactForm");
  const list = document.getElementById("feedbackList");
  if (!contact || !list) return;

  function render() {
    const items = JSON.parse(localStorage.getItem("fitlifeFeedback") || "[]");
    list.innerHTML = items.length
      ? items.map((item) => `<li><strong>${item.name}</strong><span>${item.message}</span></li>`).join("")
      : "<li>No feedback submitted yet.</li>";
  }

  contact.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(contact);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const message = form.get("message").trim();

    if (name.length < 3) return showMessage("contactMessage", "Please enter your full name.", true);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showMessage("contactMessage", "Please enter a valid email.", true);
    if (message.length < 10) return showMessage("contactMessage", "Message should be at least 10 characters.", true);

    const items = JSON.parse(localStorage.getItem("fitlifeFeedback") || "[]");
    items.unshift({ name, email, message });
    localStorage.setItem("fitlifeFeedback", JSON.stringify(items.slice(0, 5)));
    contact.reset();
    showMessage("contactMessage", "Thank you. Your feedback has been recorded for the demo.");
    render();
  });

  render();
}

function setupPhpDemo() {
  const register = document.getElementById("phpRegisterForm");
  const contact = document.getElementById("phpContactForm");

  async function postForm(form, endpoint, messageId) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
    });
    const data = await response.json();
    showMessage(messageId, data.message || "Request completed.", !data.success);
  }

  if (register) {
    const email = document.getElementById("phpEmail");
    email.value = `demo${Date.now()}@fitlife.test`;
    register.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        await postForm(register, "backend/register.php", "phpRegisterMessage");
      } catch (error) {
        showMessage("phpRegisterMessage", "Could not reach PHP. Start Apache and MySQL in XAMPP, then open through localhost.", true);
      }
    });
  }

  if (contact) {
    const email = document.getElementById("phpContactEmail");
    email.value = `visitor${Date.now()}@fitlife.test`;
    contact.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        await postForm(contact, "backend/contact.php", "phpContactMessage");
      } catch (error) {
        showMessage("phpContactMessage", "Could not reach PHP. Start Apache and MySQL in XAMPP, then open through localhost.", true);
      }
    });
  }
}

setupNavigation();
setupPlanTabs("[data-plan]", plans, "workoutOutput");
setupPlanTabs("[data-meal]", mealPlans, "mealOutput");
setupTimer();
setupAuth();
setupDashboard();
setupContact();
setupPhpDemo();
