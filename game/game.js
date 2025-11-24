const cells = document.querySelectorAll(".cell");
const spinButton = document.getElementById("spinButton");
const tryButton = document.getElementById("tryButton");
const fortuneText = document.getElementById("fortuneText");

// ======================================
// Fallback Fortune Cookie (🥠 → image kalau ada)
// ======================================
const cookieFallback = "🥠";
const cookieImageURL = "https://i.ibb.co.com/WW9r5CCZ/For-Coo-1.png"; 
// isi "" jika kamu hanya ingin pakai emoji
// contoh: "https://example.com/cookie.png"

// Replace ALL cells default with fallback emoji first
cells.forEach(c => {
  c.innerHTML = cookieFallback;

  if (cookieImageURL) {
    const img = new Image();
    img.src = cookieImageURL;
    img.classList.add("cell-img");

    img.onload = () => {
      c.innerHTML = "";
      c.appendChild(img.cloneNode(true));
    };
  }
});

// ======================================
// Fallback Emoji untuk animal result
// ======================================
const animalFallbacks = [
  "🐈",
  "🦮",
  "🐈‍⬛",
  "🐹",
  "🐩",
  "🦊",
  "🐥",
  "🦇"
];

const animals = [
  "https://i.ibb.co.com/b5YpYmVN/JW-animal-en-2.png",
  "https://i.ibb.co.com/WNngVRv9/JK-animal-en-4.png",
  "https://i.ibb.co.com/vvdFwjtY/JY-animal-en-7.png",
  "https://i.ibb.co.com/RpFWFHfN/HS-animal-en-1.png",
  "https://i.ibb.co.com/Mb6TCyJ/SH-animal-en-5.png",
  "https://i.ibb.co.com/tTw0MLNJ/SN-animal-en-6.png",
  "https://i.ibb.co.com/QjCy7VKt/NK-animal-en-3.png",
  "https://i.ibb.co.com/LdDBF0Rb/engenekancho.png"
];

// Preload images
animals.forEach(src => {
  const img = new Image();
  img.src = src;
});

// ======================================
const fortunes = [
  "ENHYPEN will end the year strong—and so will you.",
  "Your bias would admire you too—kind heart, cool soul.",
  "Someone out there is cheering for you louder than a fanchant.",
  "Even in winter, you’ll bloom—like a cherry blossom in someone’s eyes.",
  "This week might feel blessed-cursed, but the ending is blessed.",
  "This week might feel blessed-cursed, but the ending is blessed.",
  "Save your money… your ‘SEE ENHYPEN LIVE’ arc is loading.",
  "You’ll get good news soon—maybe not tickets, but something that feels like it."
];

let spinning = false;

const spinSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_7e6484b0e0.mp3");
const revealSound = new Audio("https://cdn.pixabay.com/audio/2022/03/09/audio_cfbcb24f1c.mp3");

function isImageURL(value) {
  return value.startsWith("http://") || value.startsWith("https://");
}

// URUTAN SPIN CLOCKWISE SESUAI POSISI GRID
const spinOrder = [0, 1, 2, 5, 8, 7, 6, 3];

// ======================================
function startSpin() {
  if (spinning) return;
  spinning = true;

  spinButton.disabled = true;
  tryButton.disabled = true;

  spinSound.currentTime = 0;
  spinSound.play();

  let steps = 20 + Math.floor(Math.random() * 20);
  let current = 0;

  const interval = setInterval(() => {
    cells.forEach(c => c.classList.remove("highlight"));
    cells[current].classList.add("highlight");

    current = (current + 1) % 8;
    steps--;

    if (steps <= 0) {
      clearInterval(interval);

      const finalIndex = (current - 1 + 8) % 8;
      const finalValue = animals[finalIndex];
      const fallbackEmoji = animalFallbacks[finalIndex];

      revealSound.currentTime = 0;
      revealSound.play();

      // fallback emoji dulu
      cells[finalIndex].innerHTML = fallbackEmoji;

      // lalu replace dengan image kalau berhasil load
      if (isImageURL(finalValue)) {
        const tempImg = new Image();
        tempImg.classList.add("cell-img");
        tempImg.src = finalValue;

        tempImg.onload = () => {
          cells[finalIndex].innerHTML = "";
          cells[finalIndex].appendChild(tempImg);
        };

        tempImg.onerror = () => {
          console.warn("Image failed:", finalValue);
        };
      }

      fortuneText.innerText =
        "Today's Fortune:\n" + fortunes[Math.floor(Math.random() * fortunes.length)];

      tryButton.disabled = false;
      spinning = false;
    }
  }, 120);
}

// ======================================
function resetAll() {
  cells.forEach(c => {
    c.innerHTML = cookieFallback;

    if (cookieImageURL) {
      const img = new Image();
      img.src = cookieImageURL;
      img.classList.add("cell-img");

      img.onload = () => {
        c.innerHTML = "";
        c.appendChild(img.cloneNode(true));
      };
    }

    c.classList.remove("highlight");
  });

  fortuneText.innerText = "Today's Fortune: —";

  spinning = false;
  spinButton.disabled = false;
  tryButton.disabled = true;
}

spinButton.onclick = startSpin;
tryButton.onclick = resetAll;

tryButton.disabled = true;

document.querySelector(".jump-padlet").onclick = () => {
  const iframe = document.querySelector(".padlet-wrapper iframe");
  iframe.scrollIntoView({ behavior: "smooth", block: "end" });
};

