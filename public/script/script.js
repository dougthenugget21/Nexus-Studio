const facts = [
  "Mount Everest grows about 4mm every year!",
  "Earthquakes and volcanoes occur from activity in or below the earth's crust.",
  "About 90% of the volcanic activity on earth occurs in the oceans.",
  "The Sahara Desert used to be a lush rainforest.",
  "The Indian Ocean has the lowest and highest recorded surface salinity levels.",
  "Polar bears live and hunt on the ice of the Arctic Ocean.",
  "New Zealand's Harwood Hole is 600 feet deep. It is a sinkhole located in Abel Tasman National Park.",
  "Around 90% of the world's population lives in the Northern Hemisphere.",
  "The Amazon Rainforest, which is the largest rainforest in the world, is located in South America.",
  "Guadeloupe is believed to have some of the best sites for scuba diving in the world.",
  "The word Himalaya actually means 'abode of snow'. The upper portion of Mount Everest is covered in snow and it never melts.",
  "Volcanoes can create new land when they erupt.",
  "Krill are tiny shrimp-like creatures that live in the freezing water under the Antarctic's ice.",
  "Nauru became the richest nation per capita on Earth thanks to bird droppings.",
  "The Amazon rainforest produces about 20% of Earth's oxygen."
];

const factText = document.getElementById("fact-text");
const generateBtn = document.getElementById("generate-btn");
const progress_section = document.getElementById("progress");
const achievements_section = document.getElementById("achievements");
const href_achievements = document.getElementById("href_achievements");
const href_leaderboard = document.getElementById("href_leaderboard");


generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[randomIndex];
});

document.getElementById("cat_1").addEventListener("click", function xyx(e) {
    e.preventDefault();
    window.location.href = `quiz.html?category=1`;
});

document.getElementById("cat_2").addEventListener("click", function xyx(e) {
    e.preventDefault();
    window.location.href = `quiz.html?category=2`;
});

document.getElementById("cat_3").addEventListener("click", function xyx(e) {
    e.preventDefault();
    window.location.href = `quiz.html?category=3`;
});
document.getElementById("cat_4").addEventListener("click", function xyx(e) {
    e.preventDefault();
    window.location.href = `quiz.html?category=`;
});

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Not logged in, so to redirect
        /*window.location.replace("login.html");*/
        //return;
    }
    const firstName = localStorage.getItem("first_name");

    const profileName = document.getElementById("profile_username");

    if (firstName) {
        profileName.textContent = `Hi, ${firstName}!`;
        progress_section.style.display='block';
        achievements_section.style.display='block';
        href_achievements.style.display='block';
        href_leaderboard.style.display='block';        
    } else {
        profileName.textContent = "Account";
        progress_section.style.display='none';
        achievements_section.style.display='none';
        href_achievements.style.display='none';
        href_leaderboard.style.display='none';
    }
});