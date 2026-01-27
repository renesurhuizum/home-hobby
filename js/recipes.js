// Brood Recepten Database
const RECIPES = [
    {
        id: 1,
        name: "Wit Brood (Basis)",
        description: "Een klassiek wit brood, perfect voor beginners.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "water", amount: 300, unit: "ml" },
            { name: "gist", amount: 7, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" },
            { name: "suiker", amount: 10, unit: "gram" }
        ],
        steps: [
            { action: "Meng droge ingrediënten", duration: 5 },
            { action: "Voeg water toe en kneed tot soepel deeg", duration: 15 },
            { action: "Eerste rijzing (afgedekt)", duration: 60, type: "rijzen" },
            { action: "Deeg opnieuw kneden en vormen", duration: 10 },
            { action: "Tweede rijzing", duration: 45, type: "rijzen" },
            { action: "Bakken op 220°C", duration: 30, type: "bakken" }
        ],
        totalTime: 165,
        bakingTemp: 220
    },
    {
        id: 2,
        name: "Volkoren Brood",
        description: "Gezond en voedzaam volkoren brood met noten.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "volkorenmeel", amount: 400, unit: "gram" },
            { name: "tarwebloem", amount: 100, unit: "gram" },
            { name: "water", amount: 350, unit: "ml" },
            { name: "gist", amount: 7, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" },
            { name: "honing", amount: 20, unit: "gram" }
        ],
        steps: [
            { action: "Meng bloem, meel en gist", duration: 5 },
            { action: "Voeg water, zout en honing toe", duration: 5 },
            { action: "Kneed 10-15 minuten", duration: 15 },
            { action: "Eerste rijzing", duration: 90, type: "rijzen" },
            { action: "Vorm het brood", duration: 10 },
            { action: "Tweede rijzing", duration: 60, type: "rijzen" },
            { action: "Bakken op 200°C", duration: 40, type: "bakken" }
        ],
        totalTime: 225,
        bakingTemp: 200
    },
    {
        id: 3,
        name: "Focaccia",
        description: "Italiaans platbrood met olijfolie en rozemarijn.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "water", amount: 350, unit: "ml" },
            { name: "gist", amount: 7, unit: "gram" },
            { name: "olijfolie", amount: 50, unit: "ml" },
            { name: "zout", amount: 10, unit: "gram" },
            { name: "rozemarijn", amount: 2, unit: "takjes" }
        ],
        steps: [
            { action: "Meng bloem, gist en water", duration: 5 },
            { action: "Voeg olijfolie en zout toe, kneed", duration: 10 },
            { action: "Eerste rijzing", duration: 60, type: "rijzen" },
            { action: "Strek deeg op bakplaat", duration: 10 },
            { action: "Tweede rijzing", duration: 30, type: "rijzen" },
            { action: "Maak kuiltjes, besprenkel met olie en rozemarijn", duration: 5 },
            { action: "Bakken op 220°C", duration: 25, type: "bakken" }
        ],
        totalTime: 145,
        bakingTemp: 220
    },
    {
        id: 4,
        name: "Zuurdesembrood",
        description: "Authentiek zuurdesembrood met diepe smaak. Vereist actieve zuurdesem starter.",
        difficulty: "Gevorderd",
        ingredients: [
            { name: "tarwebloem", amount: 400, unit: "gram" },
            { name: "volkorenmeel", amount: 100, unit: "gram" },
            { name: "water", amount: 350, unit: "ml" },
            { name: "zuurdesem", amount: 100, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" }
        ],
        steps: [
            { action: "Meng bloem en water (autolyse)", duration: 30, type: "rijzen" },
            { action: "Voeg zuurdesem toe en meng", duration: 10 },
            { action: "Voeg zout toe en kneed", duration: 10 },
            { action: "Bulk fermentatie met stretch & folds", duration: 240, type: "rijzen" },
            { action: "Vorm het brood", duration: 15 },
            { action: "Koude rijzing in koelkast", duration: 480, type: "rijzen" },
            { action: "Bakken in Dutch oven op 250°C", duration: 45, type: "bakken" }
        ],
        totalTime: 830,
        bakingTemp: 250
    },
    {
        id: 5,
        name: "Ciabatta",
        description: "Luchtig Italiaans brood met grote luchtkamers.",
        difficulty: "Gemiddeld",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "water", amount: 400, unit: "ml" },
            { name: "gist", amount: 5, unit: "gram" },
            { name: "zout", amount: 12, unit: "gram" },
            { name: "olijfolie", amount: 30, unit: "ml" }
        ],
        steps: [
            { action: "Meng alle ingrediënten (nat deeg!)", duration: 10 },
            { action: "Stretch & fold elke 30 min (4x)", duration: 120, type: "rijzen" },
            { action: "Laat nog 2 uur rijzen", duration: 120, type: "rijzen" },
            { action: "Verdeel voorzichtig in stukken", duration: 10 },
            { action: "Laatste rijzing", duration: 45, type: "rijzen" },
            { action: "Bakken op 230°C met stoom", duration: 25, type: "bakken" }
        ],
        totalTime: 330,
        bakingTemp: 230
    },
    {
        id: 6,
        name: "Roggebrood",
        description: "Donker, stevig roggebrood met karwijzaad.",
        difficulty: "Gemiddeld",
        ingredients: [
            { name: "roggemeel", amount: 300, unit: "gram" },
            { name: "tarwebloem", amount: 200, unit: "gram" },
            { name: "water", amount: 350, unit: "ml" },
            { name: "gist", amount: 10, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" },
            { name: "karwijzaad", amount: 10, unit: "gram" },
            { name: "stroop", amount: 30, unit: "gram" }
        ],
        steps: [
            { action: "Meng droge ingrediënten", duration: 5 },
            { action: "Voeg water en stroop toe, kneed kort", duration: 10 },
            { action: "Eerste rijzing", duration: 90, type: "rijzen" },
            { action: "Vorm in bakvorm", duration: 10 },
            { action: "Tweede rijzing", duration: 60, type: "rijzen" },
            { action: "Bakken op 180°C", duration: 50, type: "bakken" }
        ],
        totalTime: 225,
        bakingTemp: 180
    },
    {
        id: 7,
        name: "Brioche",
        description: "Rijk, zacht brood met veel boter en eieren.",
        difficulty: "Gevorderd",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "boter", amount: 250, unit: "gram" },
            { name: "eieren", amount: 6, unit: "stuks" },
            { name: "gist", amount: 10, unit: "gram" },
            { name: "suiker", amount: 50, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" },
            { name: "melk", amount: 50, unit: "ml" }
        ],
        steps: [
            { action: "Meng bloem, gist, suiker en eieren", duration: 10 },
            { action: "Kneed en voeg geleidelijk boter toe", duration: 20 },
            { action: "Koelkast rijzing (kan overnacht)", duration: 240, type: "rijzen" },
            { action: "Vorm de brioche", duration: 15 },
            { action: "Laatste rijzing op kamertemperatuur", duration: 90, type: "rijzen" },
            { action: "Bestrijk met ei, bakken op 180°C", duration: 30, type: "bakken" }
        ],
        totalTime: 405,
        bakingTemp: 180
    },
    {
        id: 8,
        name: "Pita Brood",
        description: "Plat brood met een holle pocket, perfect voor vullingen.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 300, unit: "gram" },
            { name: "water", amount: 180, unit: "ml" },
            { name: "gist", amount: 5, unit: "gram" },
            { name: "zout", amount: 5, unit: "gram" },
            { name: "olijfolie", amount: 15, unit: "ml" }
        ],
        steps: [
            { action: "Meng alle ingrediënten", duration: 5 },
            { action: "Kneed tot soepel deeg", duration: 10 },
            { action: "Rijzing", duration: 60, type: "rijzen" },
            { action: "Verdeel in 8 bollen, rol uit", duration: 15 },
            { action: "Kort laten rusten", duration: 15, type: "rijzen" },
            { action: "Bakken op 250°C (zeer kort!)", duration: 5, type: "bakken" }
        ],
        totalTime: 110,
        bakingTemp: 250
    },
    {
        id: 9,
        name: "Speltbrood",
        description: "Licht verteerbaar brood met oergraan spelt.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "speltmeel", amount: 500, unit: "gram" },
            { name: "water", amount: 320, unit: "ml" },
            { name: "gist", amount: 7, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" },
            { name: "honing", amount: 15, unit: "gram" }
        ],
        steps: [
            { action: "Meng droge ingrediënten", duration: 5 },
            { action: "Voeg water en honing toe, kneed kort", duration: 10 },
            { action: "Eerste rijzing (spelt rijst snel!)", duration: 45, type: "rijzen" },
            { action: "Vorm het brood", duration: 10 },
            { action: "Tweede rijzing", duration: 30, type: "rijzen" },
            { action: "Bakken op 200°C", duration: 35, type: "bakken" }
        ],
        totalTime: 135,
        bakingTemp: 200
    },
    {
        id: 10,
        name: "Naan Brood",
        description: "Indiaas flatbread, traditioneel gebakken in tandoor.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 300, unit: "gram" },
            { name: "yoghurt", amount: 100, unit: "gram" },
            { name: "melk", amount: 80, unit: "ml" },
            { name: "gist", amount: 5, unit: "gram" },
            { name: "suiker", amount: 10, unit: "gram" },
            { name: "zout", amount: 5, unit: "gram" },
            { name: "boter", amount: 30, unit: "gram" }
        ],
        steps: [
            { action: "Meng droge ingrediënten", duration: 5 },
            { action: "Voeg yoghurt, melk en gesmolten boter toe", duration: 5 },
            { action: "Kneed tot soepel deeg", duration: 10 },
            { action: "Rijzing", duration: 60, type: "rijzen" },
            { action: "Verdeel en rol uit", duration: 10 },
            { action: "Bak in hete pan of onder grill", duration: 10, type: "bakken" }
        ],
        totalTime: 100,
        bakingTemp: 260
    }
];

// Alle unieke ingrediënten voor de filter
const ALL_INGREDIENTS = [...new Set(
    RECIPES.flatMap(recipe =>
        recipe.ingredients.map(ing => ing.name)
    )
)].sort();

// Ingrediënten categorieën voor betere filtering
const INGREDIENT_CATEGORIES = {
    "Bloem & Meel": ["tarwebloem", "volkorenmeel", "roggemeel", "speltmeel"],
    "Vloeistoffen": ["water", "melk", "olijfolie"],
    "Rijsmiddelen": ["gist", "zuurdesem"],
    "Zoetstoffen": ["suiker", "honing", "stroop"],
    "Zuivel & Eieren": ["boter", "eieren", "yoghurt"],
    "Kruiden & Extras": ["zout", "rozemarijn", "karwijzaad"]
};
