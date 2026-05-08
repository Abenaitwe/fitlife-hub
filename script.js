const recommendations = {
  workout: {
    tag: "Beginner workout",
    title: "20 minute full-body starter routine",
    body: "Warm up for 5 minutes, then complete squats, wall push-ups, lunges, and a light plank. The full project will group workouts by goals such as weight loss, strength, and endurance."
  },
  meal: {
    tag: "Balanced meal",
    title: "Rice, beans, vegetables, and fruit",
    body: "A simple meal idea can combine carbohydrates, proteins, vitamins, fibre, and water. The final nutrition page will include more meal suggestions for students and young adults."
  },
  tip: {
    tag: "Healthy habit",
    title: "Start small and track consistency",
    body: "The website will encourage users to begin with achievable routines, record progress, and build motivation through simple tips instead of complicated fitness advice."
  }
};

const tabs = document.querySelectorAll(".tab");
const output = document.querySelector("#recommendation");

function renderRecommendation(key) {
  const item = recommendations[key];
  output.innerHTML = `
    <span class="tag">${item.tag}</span>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
  `;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
    renderRecommendation(tab.dataset.tab);
  });
});

renderRecommendation("workout");
