export const meditationQuotes = [
    "Peace begins with a pause.",
    "Let your mind settle like water.",
    "Soft steps still move you forward.",
    "You are allowed to rest.",
    "Exhale what you no longer need.",
    "Choose calm, even if it’s small.",
    "A quiet moment is powerful.",
    "You’re doing better than you think.",
    "Gentleness is strength too.",
    "Slow is still progress.",
    "Peace is a direction, not a destination.",
    "Let today be lighter than yesterday.",
    "Relax your shoulders and breathe.",
    "You don’t have to fix everything right now.",
    "Be kind to the person you are becoming.",
    "Even the sky isn’t calm all the time.",
    "You matter, even on quiet days.",
    "Small joys count too.",
    "You’re allowed to start again."
];
export function getRandomQuote() {
    return meditationQuotes[Math.floor(Math.random() * meditationQuotes.length)];
}
