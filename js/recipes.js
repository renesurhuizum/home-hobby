// Brood Recepten Database - Uitgebreid met 15 recepten
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
    },
    // 5 NIEUWE RECEPTEN
    {
        id: 11,
        name: "Baguette",
        description: "Knapperig Frans stokbrood met open kruim en krokante korst.",
        difficulty: "Gemiddeld",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "water", amount: 350, unit: "ml" },
            { name: "gist", amount: 5, unit: "gram" },
            { name: "zout", amount: 10, unit: "gram" }
        ],
        steps: [
            { action: "Meng bloem, water en gist", duration: 5 },
            { action: "Autolyse rust", duration: 30, type: "rijzen" },
            { action: "Voeg zout toe en kneed", duration: 10 },
            { action: "Bulk fermentatie met folds elke 45 min", duration: 180, type: "rijzen" },
            { action: "Verdeel in 3 delen en pre-shape", duration: 10 },
            { action: "Rust 20 minuten", duration: 20, type: "rijzen" },
            { action: "Vorm stokbroden en leg op baklinnen", duration: 15 },
            { action: "Finale rijzing", duration: 60, type: "rijzen" },
            { action: "Inkepen en bakken op 240°C met stoom", duration: 25, type: "bakken" }
        ],
        totalTime: 355,
        bakingTemp: 240
    },
    {
        id: 12,
        name: "Challah",
        description: "Gevlochten Joods feestbrood, rijk en zoet met mooie glans.",
        difficulty: "Gemiddeld",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "water", amount: 120, unit: "ml" },
            { name: "eieren", amount: 3, unit: "stuks" },
            { name: "olijfolie", amount: 80, unit: "ml" },
            { name: "suiker", amount: 60, unit: "gram" },
            { name: "gist", amount: 10, unit: "gram" },
            { name: "zout", amount: 8, unit: "gram" }
        ],
        steps: [
            { action: "Meng bloem, gist en suiker", duration: 5 },
            { action: "Voeg eieren, olie en water toe", duration: 5 },
            { action: "Kneed tot glanzend, elastisch deeg", duration: 15 },
            { action: "Eerste rijzing", duration: 90, type: "rijzen" },
            { action: "Verdeel in strengen en vlecht", duration: 20 },
            { action: "Tweede rijzing", duration: 45, type: "rijzen" },
            { action: "Bestrijk met losgeklopt ei", duration: 5 },
            { action: "Bakken op 180°C tot goudbruin", duration: 35, type: "bakken" }
        ],
        totalTime: 220,
        bakingTemp: 180
    },
    {
        id: 13,
        name: "Havermoutbrood",
        description: "Zacht en voedzaam brood met havermout, perfect voor ontbijt.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 400, unit: "gram" },
            { name: "havermout", amount: 100, unit: "gram" },
            { name: "water", amount: 300, unit: "ml" },
            { name: "melk", amount: 50, unit: "ml" },
            { name: "gist", amount: 7, unit: "gram" },
            { name: "zout", amount: 8, unit: "gram" },
            { name: "honing", amount: 30, unit: "gram" },
            { name: "boter", amount: 30, unit: "gram" }
        ],
        steps: [
            { action: "Week havermout in warm water (10 min)", duration: 10 },
            { action: "Meng bloem, gist en zout", duration: 5 },
            { action: "Voeg geweekte havermout, melk, honing en boter toe", duration: 5 },
            { action: "Kneed tot soepel deeg", duration: 10 },
            { action: "Eerste rijzing", duration: 60, type: "rijzen" },
            { action: "Vorm in bakvorm, bestrooi met havervlokken", duration: 10 },
            { action: "Tweede rijzing", duration: 45, type: "rijzen" },
            { action: "Bakken op 190°C", duration: 40, type: "bakken" }
        ],
        totalTime: 185,
        bakingTemp: 190
    },
    {
        id: 14,
        name: "Krentenbollen",
        description: "Zoete broodjes met sappige krenten, heerlijk met boter.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "melk", amount: 250, unit: "ml" },
            { name: "boter", amount: 75, unit: "gram" },
            { name: "suiker", amount: 75, unit: "gram" },
            { name: "gist", amount: 10, unit: "gram" },
            { name: "eieren", amount: 1, unit: "stuks" },
            { name: "zout", amount: 5, unit: "gram" },
            { name: "krenten", amount: 200, unit: "gram" }
        ],
        steps: [
            { action: "Verwarm melk en smelt boter erin", duration: 5 },
            { action: "Meng bloem, gist, suiker en zout", duration: 5 },
            { action: "Voeg melkmengsel en ei toe, kneed", duration: 15 },
            { action: "Voeg krenten toe en kneed door", duration: 5 },
            { action: "Eerste rijzing", duration: 60, type: "rijzen" },
            { action: "Verdeel in 12 bollen", duration: 10 },
            { action: "Tweede rijzing", duration: 30, type: "rijzen" },
            { action: "Bestrijk met ei, bakken op 200°C", duration: 20, type: "bakken" }
        ],
        totalTime: 150,
        bakingTemp: 200
    },
    {
        id: 15,
        name: "Turks Brood (Pide)",
        description: "Zacht, ovaal brood met sesamzaad, perfect bij mezze.",
        difficulty: "Makkelijk",
        ingredients: [
            { name: "tarwebloem", amount: 500, unit: "gram" },
            { name: "water", amount: 300, unit: "ml" },
            { name: "yoghurt", amount: 50, unit: "gram" },
            { name: "olijfolie", amount: 30, unit: "ml" },
            { name: "gist", amount: 7, unit: "gram" },
            { name: "suiker", amount: 10, unit: "gram" },
            { name: "zout", amount: 8, unit: "gram" },
            { name: "sesamzaad", amount: 20, unit: "gram" }
        ],
        steps: [
            { action: "Meng bloem, gist, suiker en zout", duration: 5 },
            { action: "Voeg water, yoghurt en olijfolie toe", duration: 5 },
            { action: "Kneed tot soepel, elastisch deeg", duration: 10 },
            { action: "Eerste rijzing", duration: 60, type: "rijzen" },
            { action: "Verdeel en vorm ovale broden", duration: 15 },
            { action: "Tweede rijzing", duration: 30, type: "rijzen" },
            { action: "Bestrijk met ei en bestrooi met sesam", duration: 5 },
            { action: "Bakken op 220°C", duration: 20, type: "bakken" }
        ],
        totalTime: 150,
        bakingTemp: 220
    }
];

// Alle unieke ingrediënten voor de filter
const ALL_INGREDIENTS = [...new Set(
    RECIPES.flatMap(recipe =>
        recipe.ingredients.map(ing => ing.name)
    )
)].sort();

// Ingrediënten categorieën voor betere filtering - uitgebreid
const INGREDIENT_CATEGORIES = {
    "Bloem & Meel": ["tarwebloem", "volkorenmeel", "roggemeel", "speltmeel", "havermout"],
    "Vloeistoffen": ["water", "melk", "olijfolie"],
    "Rijsmiddelen": ["gist", "zuurdesem"],
    "Zoetstoffen": ["suiker", "honing", "stroop"],
    "Zuivel & Eieren": ["boter", "eieren", "yoghurt"],
    "Kruiden & Extras": ["zout", "rozemarijn", "karwijzaad", "krenten", "sesamzaad"]
};
