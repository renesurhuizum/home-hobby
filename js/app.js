// Brood Bakker App
class BroodBakkerApp {
    constructor() {
        this.selectedIngredients = new Set();
        this.selectedRecipe = null;
        this.init();
    }

    init() {
        this.renderIngredientFilters();
        this.renderRecipes(RECIPES);
        this.setupEventListeners();
        this.setDefaultBakeTime();
    }

    // Render ingrediënten filters per categorie
    renderIngredientFilters() {
        const container = document.getElementById('ingredient-filters');
        container.innerHTML = '';

        for (const [category, ingredients] of Object.entries(INGREDIENT_CATEGORIES)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'ingredient-category';

            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);

            const ingredientsList = document.createElement('div');
            ingredientsList.className = 'ingredients-list';

            ingredients.forEach(ingredient => {
                const label = document.createElement('label');
                label.className = 'ingredient-checkbox';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = ingredient;
                checkbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.selectedIngredients.add(ingredient);
                    } else {
                        this.selectedIngredients.delete(ingredient);
                    }
                });

                const span = document.createElement('span');
                span.textContent = ingredient;

                label.appendChild(checkbox);
                label.appendChild(span);
                ingredientsList.appendChild(label);
            });

            categoryDiv.appendChild(ingredientsList);
            container.appendChild(categoryDiv);
        }
    }

    // Render recepten grid
    renderRecipes(recipes) {
        const grid = document.getElementById('recipes-grid');
        grid.innerHTML = '';

        if (recipes.length === 0) {
            grid.innerHTML = '<p class="no-results">Geen recepten gevonden met de geselecteerde ingrediënten. Probeer meer ingrediënten te selecteren.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <h3>${recipe.name}</h3>
                <p class="description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="difficulty ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
                    <span class="time">⏱️ ${this.formatDuration(recipe.totalTime)}</span>
                </div>
                <div class="ingredients-preview">
                    ${recipe.ingredients.slice(0, 4).map(i => `<span class="ingredient-tag">${i.name}</span>`).join('')}
                    ${recipe.ingredients.length > 4 ? `<span class="ingredient-tag more">+${recipe.ingredients.length - 4}</span>` : ''}
                </div>
            `;
            card.addEventListener('click', () => this.showRecipeDetail(recipe));
            grid.appendChild(card);
        });
    }

    // Filter recepten op basis van geselecteerde ingrediënten
    filterRecipes() {
        if (this.selectedIngredients.size === 0) {
            this.renderRecipes(RECIPES);
            return;
        }

        const filtered = RECIPES.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(i => i.name);
            // Check of alle recept ingrediënten in de selectie zitten
            return recipeIngredients.every(ing => this.selectedIngredients.has(ing));
        });

        // Sorteer op basis van hoeveel ingrediënten overeenkomen
        filtered.sort((a, b) => {
            const matchA = a.ingredients.filter(i => this.selectedIngredients.has(i.name)).length;
            const matchB = b.ingredients.filter(i => this.selectedIngredients.has(i.name)).length;
            return matchB - matchA;
        });

        this.renderRecipes(filtered);
    }

    // Toon recept detail in modal
    showRecipeDetail(recipe) {
        this.selectedRecipe = recipe;
        const modal = document.getElementById('recipe-modal');
        const detail = document.getElementById('recipe-detail');

        detail.innerHTML = `
            <h2>${recipe.name}</h2>
            <p class="description">${recipe.description}</p>

            <div class="recipe-info">
                <span class="difficulty ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
                <span>⏱️ Totale tijd: ${this.formatDuration(recipe.totalTime)}</span>
                <span>🌡️ Baktemperatuur: ${recipe.bakingTemp}°C</span>
            </div>

            <h3>Ingrediënten</h3>
            <ul class="ingredients-list-detail">
                ${recipe.ingredients.map(i => `
                    <li>
                        <span class="amount">${i.amount} ${i.unit}</span>
                        <span class="name">${i.name}</span>
                    </li>
                `).join('')}
            </ul>

            <h3>Bereidingswijze</h3>
            <ol class="steps-list">
                ${recipe.steps.map(step => `
                    <li class="${step.type || 'action'}">
                        ${step.action}
                        <span class="step-duration">(${step.duration} min)</span>
                    </li>
                `).join('')}
            </ol>

            <button id="plan-recipe-btn" class="btn btn-primary">Plan dit recept</button>
        `;

        modal.classList.remove('hidden');

        // Event listener voor plan knop
        document.getElementById('plan-recipe-btn').addEventListener('click', () => {
            this.showPlanningSection();
        });
    }

    // Toon planning sectie
    showPlanningSection() {
        document.getElementById('recipe-modal').classList.add('hidden');
        document.getElementById('planning-section').classList.remove('hidden');
        document.getElementById('planning-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Stel standaard baktijd in (morgen om 12:00)
    setDefaultBakeTime() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(12, 0, 0, 0);

        const input = document.getElementById('bake-time');
        input.value = tomorrow.toISOString().slice(0, 16);
    }

    // Bereken en toon de tijdlijn
    calculateTimeline() {
        if (!this.selectedRecipe) {
            alert('Selecteer eerst een recept!');
            return;
        }

        const bakeTimeInput = document.getElementById('bake-time');
        const finishTime = new Date(bakeTimeInput.value);

        if (isNaN(finishTime.getTime())) {
            alert('Voer een geldige tijd in!');
            return;
        }

        const timeline = this.generateTimeline(this.selectedRecipe, finishTime);
        this.renderTimeline(timeline);
    }

    // Genereer tijdlijn met stappen
    generateTimeline(recipe, finishTime) {
        const steps = [];
        let currentTime = new Date(finishTime);

        // Werk terug vanaf het einde
        const reversedSteps = [...recipe.steps].reverse();

        reversedSteps.forEach(step => {
            const endTime = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() - step.duration);
            const startTime = new Date(currentTime);

            steps.unshift({
                action: step.action,
                duration: step.duration,
                type: step.type || 'action',
                startTime: startTime,
                endTime: endTime
            });
        });

        return {
            recipe: recipe,
            startTime: steps[0].startTime,
            finishTime: finishTime,
            steps: steps
        };
    }

    // Render de tijdlijn
    renderTimeline(timeline) {
        const container = document.getElementById('timeline');

        const now = new Date();
        const startInPast = timeline.startTime < now;

        container.innerHTML = `
            <div class="timeline-header">
                <h3>${timeline.recipe.name}</h3>
                ${startInPast ? '<p class="warning">⚠️ Let op: Je moet al begonnen zijn! Kies een later tijdstip.</p>' : ''}
                <p class="timeline-summary">
                    Start: <strong>${this.formatTime(timeline.startTime)}</strong> |
                    Klaar: <strong>${this.formatTime(timeline.finishTime)}</strong>
                </p>
            </div>
            <div class="timeline-steps">
                ${timeline.steps.map((step, index) => `
                    <div class="timeline-step ${step.type} ${this.isCurrentStep(step, now) ? 'current' : ''} ${step.endTime < now ? 'past' : ''}">
                        <div class="step-time">
                            <span class="start">${this.formatTime(step.startTime)}</span>
                            <span class="duration">${step.duration} min</span>
                        </div>
                        <div class="step-content">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-info">
                                <span class="step-action">${step.action}</span>
                                ${step.type === 'rijzen' ? '<span class="step-type-badge rijzen">🍞 Rijzen</span>' : ''}
                                ${step.type === 'bakken' ? '<span class="step-type-badge bakken">🔥 Bakken</span>' : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="timeline-footer">
                <p>🎉 Om <strong>${this.formatTime(timeline.finishTime)}</strong> is je ${timeline.recipe.name} klaar!</p>
            </div>
        `;
    }

    // Check of een stap nu actief is
    isCurrentStep(step, now) {
        return now >= step.startTime && now <= step.endTime;
    }

    // Format tijd naar leesbare string
    formatTime(date) {
        const options = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('nl-NL', options);
    }

    // Format duur in minuten naar uren en minuten
    formatDuration(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}u ${mins}min` : `${hours} uur`;
    }

    // Setup alle event listeners
    setupEventListeners() {
        // Filter knop
        document.getElementById('filter-btn').addEventListener('click', () => {
            this.filterRecipes();
        });

        // Reset knop
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.selectedIngredients.clear();
            document.querySelectorAll('#ingredient-filters input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            this.renderRecipes(RECIPES);
        });

        // Modal sluiten
        document.querySelector('.close-btn').addEventListener('click', () => {
            document.getElementById('recipe-modal').classList.add('hidden');
        });

        // Modal sluiten bij klikken buiten modal
        document.getElementById('recipe-modal').addEventListener('click', (e) => {
            if (e.target.id === 'recipe-modal') {
                document.getElementById('recipe-modal').classList.add('hidden');
            }
        });

        // Planning berekenen
        document.getElementById('calculate-btn').addEventListener('click', () => {
            this.calculateTimeline();
        });

        // ESC toets om modal te sluiten
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('recipe-modal').classList.add('hidden');
            }
        });
    }
}

// Start de app wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    new BroodBakkerApp();
});
