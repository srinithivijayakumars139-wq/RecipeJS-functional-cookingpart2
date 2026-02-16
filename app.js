// ORIGINAL DATA (DO NOT MUTATE)
const recipes = [
  { name: "Pasta Alfredo", difficulty: "Easy", time: 20 },
  { name: "Chicken Biryani", difficulty: "Hard", time: 60 },
  { name: "Grilled Sandwich", difficulty: "Easy", time: 10 },
  { name: "Paneer Butter Masala", difficulty: "Medium", time: 40 },
  { name: "Omelette", difficulty: "Easy", time: 5 },
  { name: "Veg Fried Rice", difficulty: "Medium", time: 25 }
];

// STATE
let currentFilter = "all";
let currentSort = null;

// PURE FILTER FUNCTION
function applyFilter(data, filterType) {
  switch (filterType) {
    case "easy":
      return data.filter(recipe => recipe.difficulty === "Easy");

    case "medium":
      return data.filter(recipe => recipe.difficulty === "Medium");

    case "hard":
      return data.filter(recipe => recipe.difficulty === "Hard");

    case "quick":
      return data.filter(recipe => recipe.time < 30);

    default:
      return data;
  }
}

// PURE SORT FUNCTION
function applySort(data, sortType) {
  if (!sortType) return data;

  const sorted = [...data]; // copy to prevent mutation

  if (sortType === "name") {
    return sorted.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortType === "time") {
    return sorted.sort((a, b) =>
      a.time - b.time
    );
  }

  return sorted;
}

// RENDER FUNCTION
function renderRecipes(data) {
  const container = document.getElementById("recipes-container");

  const html = data.map(recipe => `
    <div class="recipe-card">
      <h3>${recipe.name}</h3>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <p><strong>Time:</strong> ${recipe.time} mins</p>
    </div>
  `).join("");

  container.innerHTML = html;
}

// CENTRAL UPDATE FUNCTION
function updateDisplay() {
  const filtered = applyFilter(recipes, currentFilter);
  const sorted = applySort(filtered, currentSort);
  renderRecipes(sorted);
}

// BUTTON HANDLERS
function setFilter(filterType) {
  currentFilter = filterType;
  updateDisplay();
}

function setSort(sortType) {
  currentSort = sortType;
  updateDisplay();
}

// INITIAL LOAD
updateDisplay();
