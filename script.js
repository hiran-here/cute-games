// THEME
function setTheme(theme) {
  document.body.className = theme;
}
setTheme("blue");

// AVATAR
const avatars = ["🙂", "😴", "✨"];
let avatarIndex = 0;

function changeAvatar() {
  avatarIndex = (avatarIndex + 1) % avatars.length;
  document.getElementById("avatar").innerText = avatars[avatarIndex];
}

// AFFIRMATIONS
const affirmations = [
  "you’re doing better than you think 💙",
  "rest is also progress 🌙",
  "you are enough ✨",
  "slow is still moving 🫧"
];

setInterval(() => {
  const el = document.getElementById("affirmation");
  el.innerText = affirmations[Math.floor(Math.random() * affirmations.length)];
  el.style.opacity = 1;

  setTimeout(() => el.style.opacity = 0, 3000);
}, 5000);

// BUBBLE GAME
let bubbleScore = 0;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = ["🫧", "✨", "💙"][Math.floor(Math.random()*3)];

  bubble.style.left = Math.random() * 90 + "%";

  bubble.onclick = () => {
    bubble.remove();
    bubbleScore++;
    document.getElementById("bubbleScore").innerText = bubbleScore;
  };

  document.getElementById("bubble-area").appendChild(bubble);
  setTimeout(() => bubble.remove(), 5000);
}

// STAR GAME
let player = document.getElementById("player");
let pos = 50;
let starScore = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") pos -= 5;
  if (e.key === "ArrowRight") pos += 5;
  player.style.left = pos + "%";
});

setInterval(() => {
  const star = document.createElement("div");
  star.innerText = "⭐";
  star.style.position = "absolute";
  star.style.left = Math.random() * 90 + "%";
  star.style.top = "0";

  document.getElementById("star-game").appendChild(star);

  let fall = setInterval(() => {
    let top = parseInt(star.style.top);
    star.style.top = top + 5 + "px";

    let playerRect = player.getBoundingClientRect();
    let starRect = star.getBoundingClientRect();

    if (
      starRect.bottom >= playerRect.top &&
      starRect.left < playerRect.right &&
      starRect.right > playerRect.left
    ) {
      star.remove();
      starScore++;
      document.getElementById("starScore").innerText = starScore;
      clearInterval(fall);
    }

    if (top > 200) {
      star.remove();
      clearInterval(fall);
    }
  }, 100);
}, 1000);

// MEMORY GAME
const emojis = ["💙","🌙","✨","🐰","💙","🌙","✨","🐰"];
let shuffled = emojis.sort(() => 0.5 - Math.random());

let first = null;

shuffled.forEach(emoji => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = emoji;

  card.onclick = () => {
    card.innerText = emoji;
    card.classList.add("flipped");

    if (!first) {
      first = card;
    } else {
      if (first.dataset.value === card.dataset.value) {
        first = null;
      } else {
        setTimeout(() => {
          card.innerText = "";
          first.innerText = "";
          card.classList.remove("flipped");
          first.classList.remove("flipped");
          first = null;
        }, 800);
      }
    }
  };

  document.getElementById("memory-game").appendChild(card);
});

// MUSIC
const music = document.getElementById("bgMusic");
const lines = [
  ["are you always this calm?", "or did i just get lucky noticing you 🌙"],
  ["you feel familiar…", "like a song i forgot i loved 🎧"],
  ["not a pickup line but", "you have a really peaceful vibe"],
  ["you’re not even trying", "and still stand out somehow ✨"],
  ["if comfort had a face", "it might look a little like you"],
  ["this isn’t flirting", "just honest observation 🙂"],
  ["you don’t feel loud", "but you stay in people’s mind"],
  ["you’re kind of…", "hard to ignore in a soft way"],
  ["you’re like late night air", "quiet but addictive 🌌"],
  ["not everyone has that", "‘stay a little longer’ energy"]
];

let index = 0;
let showingSecond = false;

const textEl = document.getElementById("jokeText");
const box = document.getElementById("jokeBox");

// typing effect
function typeText(text, i = 0) {
  if (i < text.length) {
    textEl.innerHTML += text.charAt(i);
    setTimeout(() => typeText(text, i + 1), 30);
  }
}

// show next line
function nextLine() {
  textEl.innerHTML = "";

  if (!showingSecond) {
    typeText(lines[index][0]);
    showingSecond = true;
  } else {
    typeText(lines[index][1]);
    showingSecond = false;
    index = (index + 1) % lines.length;
  }
}

// click trigger
box.addEventListener("click", nextLine);

// auto change (makes it feel alive)
setInterval(() => {
  nextLine();
}, 7000);


function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}