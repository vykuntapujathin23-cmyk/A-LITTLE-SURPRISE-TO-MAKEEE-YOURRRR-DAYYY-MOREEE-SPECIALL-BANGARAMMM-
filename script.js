const letters = [
  {icon:"💕", title:"you're happy", desc:"A little letter to celebrate with you.", text:"Harshitha, seeing you happy is one of my favorite things in the world.\n\nWhatever made you smile today, I hope you hold onto that feeling. I hope you always remember that there is someone who will happily celebrate every little bit of happiness with you. ♡"},
  {icon:"🤍", title:"you're sad", desc:"For the days when you need comfort.", text:"Harshitha, you don't have to pretend that everything is okay.\n\nOn the difficult days, take your time and breathe. Remember the two people who met in school and somehow became something so special. I'm here for you, even on the days when words aren't enough."},
  {icon:"🌙", title:"you feel lonely", desc:"A reminder that you're never truly alone.", text:"Even when I'm not beside you, I hope this little letter reminds you that Jathin is thinking about you.\n\nWe started with school memories, but I hope we keep creating memories together for a very, very long time. You are never alone in this."},
  {icon:"😴", title:"you're exhausted", desc:"You don't have to be strong all the time.", text:"Harshitha, rest. You don't have to accomplish everything today.\n\nYou've done enough. Close your eyes, breathe slowly, and remember that you have someone who wants to see you smile, not just succeed."},
  {icon:"😡", title:"you're angry", desc:"It's okay to feel what you feel.", text:"It's okay to feel angry, Harshitha. Your feelings are real, and you're still deeply loved.\n\nTake a breath. Be kind to yourself. And when the moment passes, remember that one of the things I treasure most is simply being with you."},
  {icon:"🫂", title:"you need love", desc:"A little extra love, just for you.", text:"Harshitha, you are enough.\n\nYou are loved. You are special to me not because of what you do, but because of who you are. From the time we met in school to every moment we've shared since, you have become one of the most precious parts of my life."},
  {icon:"🎁", title:"you need a surprise", desc:"Because you deserve something unexpected.", text:"Here is your little surprise, Harshitha: I still smile when I think about the day you proposed to me. ♡\n\nOf all the memories we've made, that day will always have a special place in my heart. Being with you and spending time together is my favorite memory — and I hope we have countless more."}
];

const grid = document.getElementById("letterGrid");
grid.innerHTML = letters.map((l,i)=>`
  <button class="letter-card" onclick="openLetter(${i})">
    <div class="card-icon">${l.icon}</div>
    <h3>When ${l.title}</h3>
    <p>${l.desc}</p>
  </button>
`).join("");

function openLetter(i){
  const l = letters[i];
  document.getElementById("modalIcon").textContent = l.icon;
  document.getElementById("modalTitle").textContent = "Open when " + l.title;
  document.getElementById("modalText").textContent = l.text;
  document.getElementById("letterModal").classList.add("open");
  document.getElementById("letterModal").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeLetter(){
  document.getElementById("letterModal").classList.remove("open");
  document.getElementById("letterModal").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLetter()});

function toggleMusic(){
  if(bgMusic.paused){
    bgMusic.play().then(()=>{
      musicToggle.textContent = "♫ Playing";
      musicToggle.classList.add("playing");
    }).catch(()=>{});
  }else{
    bgMusic.pause();
    musicToggle.textContent = "♫ Music";
    musicToggle.classList.remove("playing");
  }
}


// Automatic music + romantic entry screen
const bgMusic = document.getElementById("bgMusic");
const entryScreen = document.getElementById("entryScreen");
const siteContent = document.getElementById("siteContent");
const musicToggle = document.getElementById("musicToggle");

function revealSite() {
  if (!entryScreen || !siteContent) return;
  entryScreen.classList.add("hide");
  siteContent.classList.add("visible");
  document.body.classList.remove("locked");
  setTimeout(() => entryScreen.remove(), 800);
}

function markMusicPlaying() {
  if (musicToggle) {
    musicToggle.textContent = "♫ Playing";
    musicToggle.classList.add("playing");
  }
}

function enterSite() {
  if (!bgMusic) {
    revealSite();
    return;
  }
  bgMusic.play().then(() => {
    markMusicPlaying();
    revealSite();
  }).catch(() => {
    // A user click normally unlocks audio; reveal the site even if playback fails.
    revealSite();
  });
}

window.addEventListener("load", () => {
  if (!bgMusic) {
    revealSite();
    return;
  }

  // Try immediately. If the browser blocks sound autoplay,
  // the entry screen remains and the visitor can tap once.
  bgMusic.play().then(() => {
    markMusicPlaying();
    revealSite();
  }).catch(() => {
    // Browser autoplay policy blocked audio; wait for the tap.
  });
});


/* GitHub Pages music fix */
(function () {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  music.loop = true;
  music.preload = "auto";

  const tryPlay = () => {
    const p = music.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  // Browsers block autoplay until the visitor interacts with the page.
  ["click", "touchstart", "keydown"].forEach(evt => {
    document.addEventListener(evt, tryPlay, { once: true, passive: true });
  });

  // If the page already has a music button, support common IDs/classes.
  const selectors = [
    "#musicBtn", "#musicButton", "#playMusic", "#musicToggle",
    ".music-btn", ".music-button", "[data-music-toggle]"
  ];

  let button = null;
  for (const selector of selectors) {
    button = document.querySelector(selector);
    if (button) break;
  }

  if (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      if (music.paused) {
        tryPlay();
      } else {
        music.pause();
      }
    });
  }
})();
