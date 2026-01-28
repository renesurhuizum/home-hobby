// Brood Bakker App - Uitgebreide versie
class BroodBakkerApp {
    constructor() {
        this.selectedIngredients = new Set();
        this.selectedRecipe = null;
        this.currentScale = 1;
        this.favorites = new Set();
        this.bakHistory = [];
        this.notes = {};
        this.activeTimer = null;
        this.timerIntervals = [];
        this.loadFromStorage();
        this.init();
    }

    // LocalStorage laden
    loadFromStorage() {
        try {
            this.favorites = new Set(JSON.parse(localStorage.getItem('broodBakker_favorites') || '[]'));
            this.bakHistory = JSON.parse(localStorage.getItem('broodBakker_history') || '[]');
            this.notes = JSON.parse(localStorage.getItem('broodBakker_notes') || '{}');
        } catch (e) {
            console.log('Geen opgeslagen data gevonden');
        }
    }

    // Favorieten opslaan
    saveFavorite(recipeId) {
        if (this.favorites.has(recipeId)) {
            this.favorites.delete(recipeId);
        } else {
            this.favorites.add(recipeId);
        }
        localStorage.setItem('broodBakker_favorites', JSON.stringify([...this.favorites]));
    }

    // Bakgeschiedenis opslaan
    saveToHistory(recipeId, recipeName) {
        const entry = {
            recipeId,
            name: recipeName,
            date: new Date().toISOString()
        };
        this.bakHistory.unshift(entry);
        this.bakHistory = this.bakHistory.slice(0, 20);
        localStorage.setItem('broodBakker_history', JSON.stringify(this.bakHistory));
        this.renderHistory();
    }

    // Notities opslaan
    saveNote(recipeId, note) {
        this.notes[recipeId] = note;
        localStorage.setItem('broodBakker_notes', JSON.stringify(this.notes));
    }

    // Notitie ophalen
    getNote(recipeId) {
        return this.notes[recipeId] || '';
    }

    init() {
        this.renderIngredientFilters();
        this.renderRecipes(RECIPES);
        this.renderHistory();
        this.setupEventListeners();
        this.setDefaultBakeTime();
        this.requestNotificationPermission();
    }

    // Vraag notificatie permissie
    async requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
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

    // Render bakgeschiedenis
    renderHistory() {
        const container = document.getElementById('history-list');
        if (!container) return;

        if (this.bakHistory.length === 0) {
            container.innerHTML = '<p class="no-history">Je hebt nog geen brood gebakken. Selecteer een recept om te beginnen!</p>';
            return;
        }

        container.innerHTML = this.bakHistory.slice(0, 5).map(entry => {
            const date = new Date(entry.date);
            const formattedDate = date.toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            return `
                <div class="history-item" data-id="${entry.recipeId}">
                    <span class="history-name">${entry.name}</span>
                    <span class="history-date">${formattedDate}</span>
                </div>
            `;
        }).join('');

        // Event listeners voor geschiedenis items
        container.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const recipe = RECIPES.find(r => r.id === parseInt(item.dataset.id));
                if (recipe) this.showRecipeDetail(recipe);
            });
        });
    }

    // Render recepten grid
    renderRecipes(recipes) {
        const grid = document.getElementById('recipes-grid');
        grid.innerHTML = '';

        if (recipes.length === 0) {
            grid.innerHTML = '<p class="no-results">Geen recepten gevonden. Probeer andere filters of zoektermen.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const isFavorite = this.favorites.has(recipe.id);
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${recipe.id}" title="Favoriet">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
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

            // Favoriet knop
            const favBtn = card.querySelector('.favorite-btn');
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.saveFavorite(recipe.id);
                this.renderRecipes(this.getFilteredRecipes());
            });

            // Recept detail
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('favorite-btn')) {
                    this.showRecipeDetail(recipe);
                }
            });

            grid.appendChild(card);
        });
    }

    // Gefilterde recepten ophalen
    getFilteredRecipes() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const difficulty = document.getElementById('difficulty-filter')?.value || '';
        const maxTime = parseInt(document.getElementById('time-filter')?.value) || Infinity;
        const showFavoritesOnly = document.getElementById('favorites-filter')?.checked || false;

        return RECIPES.filter(recipe => {
            // Zoekterm filter
            if (searchTerm && !recipe.name.toLowerCase().includes(searchTerm)
                && !recipe.description.toLowerCase().includes(searchTerm)) {
                return false;
            }

            // Moeilijkheid filter
            if (difficulty && recipe.difficulty !== difficulty) {
                return false;
            }

            // Tijd filter
            if (recipe.totalTime > maxTime) {
                return false;
            }

            // Favorieten filter
            if (showFavoritesOnly && !this.favorites.has(recipe.id)) {
                return false;
            }

            // Ingrediënten filter
            if (this.selectedIngredients.size > 0) {
                const recipeIngredients = recipe.ingredients.map(i => i.name);
                if (!recipeIngredients.every(ing => this.selectedIngredients.has(ing))) {
                    return false;
                }
            }

            return true;
        });
    }

    // Filter recepten
    filterRecipes() {
        const filtered = this.getFilteredRecipes();

        // Sorteer op basis van hoeveel ingrediënten overeenkomen
        if (this.selectedIngredients.size > 0) {
            filtered.sort((a, b) => {
                const matchA = a.ingredients.filter(i => this.selectedIngredients.has(i.name)).length;
                const matchB = b.ingredients.filter(i => this.selectedIngredients.has(i.name)).length;
                return matchB - matchA;
            });
        }

        this.renderRecipes(filtered);
    }

    // Willekeurig recept (Verras me!)
    showRandomRecipe() {
        const available = this.getFilteredRecipes();
        if (available.length === 0) {
            alert('Geen recepten beschikbaar met de huidige filters!');
            return;
        }
        const random = available[Math.floor(Math.random() * available.length)];
        this.showRecipeDetail(random);
    }

    // Toon recept detail in modal
    showRecipeDetail(recipe) {
        this.selectedRecipe = recipe;
        this.currentScale = 1;
        const modal = document.getElementById('recipe-modal');
        const detail = document.getElementById('recipe-detail');
        const isFavorite = this.favorites.has(recipe.id);
        const note = this.getNote(recipe.id);

        detail.innerHTML = `
            <div class="recipe-header">
                <h2>${recipe.name}</h2>
                <button class="favorite-btn-large ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                    ${isFavorite ? '❤️ Favoriet' : '🤍 Favoriet maken'}
                </button>
            </div>
            <p class="description">${recipe.description}</p>

            <div class="recipe-info">
                <span class="difficulty ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</span>
                <span>⏱️ Totale tijd: ${this.formatDuration(recipe.totalTime)}</span>
                <span>🌡️ Baktemperatuur: ${recipe.bakingTemp}°C</span>
            </div>

            <h3>Ingrediënten</h3>
            <div class="scale-controls">
                <span>Portie:</span>
                <button class="scale-btn ${this.currentScale === 0.5 ? 'active' : ''}" data-scale="0.5">½×</button>
                <button class="scale-btn ${this.currentScale === 1 ? 'active' : ''}" data-scale="1">1×</button>
                <button class="scale-btn ${this.currentScale === 1.5 ? 'active' : ''}" data-scale="1.5">1½×</button>
                <button class="scale-btn ${this.currentScale === 2 ? 'active' : ''}" data-scale="2">2×</button>
            </div>
            <ul class="ingredients-list-detail" id="scaled-ingredients">
                ${this.renderScaledIngredients(recipe, this.currentScale)}
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

            <h3>Jouw Notities</h3>
            <textarea id="recipe-notes" placeholder="Schrijf hier je eigen tips en opmerkingen...">${note}</textarea>
            <button id="save-note-btn" class="btn btn-secondary">Notitie opslaan</button>

            <div class="modal-actions">
                <button id="print-recipe-btn" class="btn btn-secondary">🖨️ Print recept</button>
                <button id="plan-recipe-btn" class="btn btn-primary">📅 Plan dit recept</button>
            </div>
        `;

        modal.classList.remove('hidden');

        // Event listeners
        this.setupModalEventListeners(recipe);
    }

    // Render geschaalde ingrediënten
    renderScaledIngredients(recipe, scale) {
        return recipe.ingredients.map(i => {
            const scaledAmount = i.amount * scale;
            const displayAmount = scaledAmount % 1 === 0 ? scaledAmount : scaledAmount.toFixed(1);
            return `
                <li>
                    <span class="amount">${displayAmount} ${i.unit}</span>
                    <span class="name">${i.name}</span>
                </li>
            `;
        }).join('');
    }

    // Setup modal event listeners
    setupModalEventListeners(recipe) {
        // Favoriet knop in modal
        const favBtn = document.querySelector('.favorite-btn-large');
        if (favBtn) {
            favBtn.addEventListener('click', () => {
                this.saveFavorite(recipe.id);
                const isFavorite = this.favorites.has(recipe.id);
                favBtn.className = `favorite-btn-large ${isFavorite ? 'active' : ''}`;
                favBtn.innerHTML = isFavorite ? '❤️ Favoriet' : '🤍 Favoriet maken';
                this.renderRecipes(this.getFilteredRecipes());
            });
        }

        // Schaal knoppen
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentScale = parseFloat(btn.dataset.scale);
                document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('scaled-ingredients').innerHTML =
                    this.renderScaledIngredients(recipe, this.currentScale);
            });
        });

        // Notitie opslaan
        document.getElementById('save-note-btn')?.addEventListener('click', () => {
            const note = document.getElementById('recipe-notes').value;
            this.saveNote(recipe.id, note);
            alert('Notitie opgeslagen!');
        });

        // Print knop
        document.getElementById('print-recipe-btn')?.addEventListener('click', () => {
            window.print();
        });

        // Plan knop
        document.getElementById('plan-recipe-btn')?.addEventListener('click', () => {
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
        this.activeTimer = timeline;
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
            <div class="timer-controls">
                <button id="start-timer-btn" class="btn btn-primary">🔔 Start Timer & Notificaties</button>
                <button id="stop-timer-btn" class="btn btn-secondary hidden">⏹️ Stop Timer</button>
                <button id="add-to-history-btn" class="btn btn-secondary">✅ Markeer als gebakken</button>
            </div>
            <div id="active-countdown" class="hidden">
                <div class="countdown-display">
                    <span class="countdown-label">Volgende stap over:</span>
                    <span class="countdown-time" id="countdown-time">--:--</span>
                </div>
            </div>
            <div class="timeline-steps">
                ${timeline.steps.map((step, index) => `
                    <div class="timeline-step ${step.type} ${this.isCurrentStep(step, now) ? 'current' : ''} ${step.endTime < now ? 'past' : ''}" data-index="${index}">
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

        // Timer event listeners
        document.getElementById('start-timer-btn')?.addEventListener('click', () => {
            this.startTimer(timeline);
        });

        document.getElementById('stop-timer-btn')?.addEventListener('click', () => {
            this.stopTimer();
        });

        document.getElementById('add-to-history-btn')?.addEventListener('click', () => {
            this.saveToHistory(timeline.recipe.id, timeline.recipe.name);
            alert('Toegevoegd aan je bakgeschiedenis!');
        });
    }

    // Start timer met notificaties
    startTimer(timeline) {
        const now = new Date();

        document.getElementById('start-timer-btn').classList.add('hidden');
        document.getElementById('stop-timer-btn').classList.remove('hidden');
        document.getElementById('active-countdown').classList.remove('hidden');

        // Plan notificaties voor elke stap
        timeline.steps.forEach((step, index) => {
            const timeUntilStart = step.startTime - now;

            if (timeUntilStart > 0) {
                const timerId = setTimeout(() => {
                    this.sendNotification(`Stap ${index + 1}`, step.action);
                    this.playSound();
                    this.highlightStep(index);
                }, timeUntilStart);
                this.timerIntervals.push(timerId);
            }
        });

        // Update countdown elke seconde
        const countdownInterval = setInterval(() => {
            this.updateCountdown(timeline);
        }, 1000);
        this.timerIntervals.push(countdownInterval);

        this.updateCountdown(timeline);
    }

    // Update countdown display
    updateCountdown(timeline) {
        const now = new Date();
        const countdownEl = document.getElementById('countdown-time');

        // Vind de volgende stap
        const nextStep = timeline.steps.find(step => step.startTime > now);

        if (nextStep) {
            const diff = nextStep.startTime - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (hours > 0) {
                countdownEl.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        } else {
            countdownEl.textContent = 'Klaar!';
        }

        // Update step highlighting
        document.querySelectorAll('.timeline-step').forEach((el, index) => {
            const step = timeline.steps[index];
            el.classList.toggle('current', this.isCurrentStep(step, now));
            el.classList.toggle('past', step.endTime < now);
        });
    }

    // Stop timer
    stopTimer() {
        this.timerIntervals.forEach(id => clearTimeout(id));
        this.timerIntervals.forEach(id => clearInterval(id));
        this.timerIntervals = [];

        document.getElementById('start-timer-btn')?.classList.remove('hidden');
        document.getElementById('stop-timer-btn')?.classList.add('hidden');
        document.getElementById('active-countdown')?.classList.add('hidden');
    }

    // Stuur browser notificatie
    sendNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`🍞 Brood Bakker: ${title}`, {
                body: body,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍞</text></svg>',
                requireInteraction: true
            });
        }
    }

    // Speel geluid
    playSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }

    // Highlight stap
    highlightStep(index) {
        document.querySelectorAll('.timeline-step').forEach((el, i) => {
            if (i === index) {
                el.classList.add('highlight');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
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
            document.getElementById('search-input').value = '';
            document.getElementById('difficulty-filter').value = '';
            document.getElementById('time-filter').value = '';
            document.getElementById('favorites-filter').checked = false;
            this.renderRecipes(RECIPES);
        });

        // Zoekbalk - live zoeken
        document.getElementById('search-input')?.addEventListener('input', () => {
            this.filterRecipes();
        });

        // Filters - live filteren
        document.getElementById('difficulty-filter')?.addEventListener('change', () => {
            this.filterRecipes();
        });

        document.getElementById('time-filter')?.addEventListener('change', () => {
            this.filterRecipes();
        });

        document.getElementById('favorites-filter')?.addEventListener('change', () => {
            this.filterRecipes();
        });

        // Verras me knop
        document.getElementById('random-btn')?.addEventListener('click', () => {
            this.showRandomRecipe();
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
