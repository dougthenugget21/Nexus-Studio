const facts = [
  "Mount Everest grows about 4mm every year!",
  "The Sahara Desert used to be a lush rainforest.",
  "Around 90% of the world's population lives in the Northern Hemisphere.",
  "Volcanoes can create new land when they erupt.",
  "The Amazon rainforest produces about 20% of Earth's oxygen."
];

const factText = document.getElementById("fact-text");
const generateBtn = document.getElementById("generate-btn");

generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[randomIndex];
});