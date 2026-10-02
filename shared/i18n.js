/* ===========================================================
   i18n - Terjemahan Indonesia (ID) <-> Inggris (EN)
   -----------------------------------------------------------
   Cara pakai:
   - HTML statis : <span data-i18n="kunci"></span>
                   data-i18n-html  -> boleh berisi tag (mis. <br>)
                   data-i18n-title / data-i18n-aria -> atribut title / aria-label
   - JavaScript  : t("kunci", { param: nilai })   -> teks sesuai bahasa aktif
                   loc({ id: "...", en: "..." })  -> pilih teks dari objek dua bahasa
                   onLanguageChange(fn)           -> jalankan fn saat bahasa diganti
   - Tambah teks baru: tambahkan kunci yang sama di DICT.id dan DICT.en.
   Bahasa terakhir dipilih disimpan, jadi tetap sama saat pindah game.
   =========================================================== */

(function () {
  const STORAGE_KEY = "museum-affandi-lang";
  const SUPPORTED = ["id", "en"];

  const DICT = {
    id: {
      /* ---- umum ---- */
      "common.mainMenu": "Menu Utama",
      "common.backMenu": "← Menu Utama",
      "common.backToMenu": "Kembali ke Menu",
      "common.congrats": "Selamat!",
      "common.painting": "Lukisan",
      "common.time": "Waktu",
      "common.play": "Mainkan ›",
      "common.paintings5": "5 Lukisan",
      "common.langLabel": "Pilih bahasa",
      "audio.on": "Suara aktif",
      "audio.off": "Suara mati",
      "audio.toggle": "Ganti suara",
      "voice.greeting":
        "Haiii gengs! Selamat datang di game Affandi! Siap-siap buat seru-seruan sambil kenalan sama Museum Affandi, tempatnya keren banget buat ngelihat karya dan sejarah seni yang kece ini!",

      /* ---- menu utama ---- */
      "title.home": "Museum Affandi - Wahana Interaktif",
      "home.brandSub": "Wahana Interaktif Layar Sentuh",
      "home.badge": "Museum Affandi Experience",
      "home.heading": "Game seru buat kenal<br />karya dari Maestro",
      "home.intro": "Jelajahi Museum Affandi lewat permainan yang santai, edukatif.",
      "home.start": "Mulai Petualangan",
      "home.stat1": "Game seru",
      "home.stat2": "Interaktif",
      "home.stat3": "Fun",
      "home.stat3sub": "Untuk semua usia",
      "home.banner1": "✨ Karya Affandi",
      "home.banner2": "🎨 Budaya & Seni",
      "home.banner3": "🧩 Permainan Seru",
      "home.card1.title": "Cari Perbedaan",
      "home.card1.desc":
        "Temukan titik perbedaan di antara dua versi lukisan Affandi sebelum waktu habis.",
      "home.card2.title": "Puzzle Lukisan",
      "home.card2.desc":
        "Susun kembali potongan lukisan Affandi menjadi gambar yang utuh.",
      "home.card3.title": "Ular Tangga Museum",
      "home.card3.desc":
        "Jelajahi arsitektur Museum Affandi lewat papan ular tangga yang seru dan menyenangkan.",
      "home.card3.badge": "2-4 Pemain",
      "idle.title": "Sentuh Layar untuk Mulai",
      "idle.sub": "Museum Affandi — Wahana Interaktif",

      /* ---- cari perbedaan ---- */
      "title.fd": "Cari Perbedaan - Museum Affandi",
      "fd.found": "Ditemukan",
      "fd.coordinate": "Koordinat",
      "fd.title": "Temukan Perbedaannya",
      "fd.winTitle": "Lukisan Selesai!",
      "fd.winDefault": "Kamu menemukan semua perbedaan.",
      "fd.winText": "Kamu menemukan semua {n} perbedaan dalam {time}.",
      "fd.replay": "Ulangi",
      "fd.next": "Lanjut ›",
      "fd.timeUpTitle": "Waktu Habis",
      "fd.timeUpText": "Jangan menyerah, coba lagi!",
      "fd.tryAgain": "Coba Lagi",
      "fd.finishText": "Kamu berhasil menyelesaikan semua 5 lukisan Affandi.",

      /* ---- puzzle ---- */
      "title.pz": "Puzzle Lukisan - Museum Affandi",
      "pz.moves": "Gerakan",
      "pz.title": "Susun Lukisan Affandi",
      "pz.reference": "Referensi gambar:",
      "pz.difficulty": "Tingkat kesulitan",
      "pz.easy": "Mudah 3×3",
      "pz.medium": "Sedang 4×4",
      "pz.hard": "Sulit 5×5",
      "pz.reshuffle": "Acak Ulang",
      "pz.winTitle": "Selesai!",
      "pz.winDefault": "Lukisan berhasil disusun.",
      "pz.winText": "Selesai dalam {moves} gerakan, {time}.",
      "pz.replay": "Ulangi",
      "pz.nextPainting": "Lukisan Berikutnya ›",
      "pz.finishText": "Kamu berhasil menyusun semua 5 lukisan Affandi.",

      /* ---- ular tangga ---- */
      "title.ut": "Ular Tangga Museum Affandi",
      "ut.title": "Ular Tangga Museum Affandi",
      "ut.dice": "Dadu",
      "ut.roll": "Lempar Dadu",
      "ut.turnDefault": "Giliran Pemain 1",
      "ut.turn": "Giliran {name}",
      "ut.square": "Kotak {pos}",
      "ut.overshoot":
        "{name} mendapatkan {steps}, tetapi melebihi kotak akhir. Giliran berpindah.",
      "ut.extraTurn": "{name} mendapat angka 6! Lempar dadu sekali lagi.",
      "ut.ladder": "{name} naik tangga ke kotak {pos}!",
      "ut.snake": "{name} tersangkut tanaman merambat, turun ke kotak {pos}.",
      "ut.winTitleDefault": "Pemain Menang!",
      "ut.winTitle": "{name} Menang!",
      "ut.winText": "{name} berhasil mencapai kotak {size} dan memenangkan permainan!",
      "ut.playAgain": "Main Lagi",
      "ut.startTitle": "Ular Tangga Museum",
      "ut.startText": "Pilih jumlah pemain untuk mulai bermain.",
      "ut.players2": "2 Pemain",
      "ut.players3": "3 Pemain",
      "ut.players4": "4 Pemain"
    },

    en: {
      /* ---- common ---- */
      "common.mainMenu": "Main Menu",
      "common.backMenu": "← Main Menu",
      "common.backToMenu": "Back to Menu",
      "common.congrats": "Congratulations!",
      "common.painting": "Painting",
      "common.time": "Time",
      "common.play": "Play ›",
      "common.paintings5": "5 Paintings",
      "common.langLabel": "Choose language",
      "audio.on": "Sound on",
      "audio.off": "Sound off",
      "audio.toggle": "Toggle sound",
      "voice.greeting":
        "Hiii everyone! Welcome to the Affandi game! Get ready for some fun while getting to know Museum Affandi, an awesome place to see the art and history of this amazing artist!",

      /* ---- home ---- */
      "title.home": "Museum Affandi - Interactive Attraction",
      "home.brandSub": "Touchscreen Interactive Attraction",
      "home.badge": "Museum Affandi Experience",
      "home.heading": "Fun games to get to know<br />the works of the Maestro",
      "home.intro": "Explore Museum Affandi through relaxed, educational games.",
      "home.start": "Start the Adventure",
      "home.stat1": "Fun games",
      "home.stat2": "Interactive",
      "home.stat3": "Fun",
      "home.stat3sub": "For all ages",
      "home.banner1": "✨ Affandi's Works",
      "home.banner2": "🎨 Culture & Art",
      "home.banner3": "🧩 Fun Games",
      "home.card1.title": "Spot the Difference",
      "home.card1.desc":
        "Find the differences between two versions of an Affandi painting before time runs out.",
      "home.card2.title": "Painting Puzzle",
      "home.card2.desc":
        "Put the pieces of an Affandi painting back together into a complete picture.",
      "home.card3.title": "Museum Snakes & Ladders",
      "home.card3.desc":
        "Explore the architecture of Museum Affandi on a fun snakes and ladders board.",
      "home.card3.badge": "2-4 Players",
      "idle.title": "Touch the Screen to Start",
      "idle.sub": "Museum Affandi — Interactive Attraction",

      /* ---- spot the difference ---- */
      "title.fd": "Spot the Difference - Museum Affandi",
      "fd.found": "Found",
      "fd.coordinate": "Coordinates",
      "fd.title": "Find the Differences",
      "fd.winTitle": "Painting Complete!",
      "fd.winDefault": "You found all the differences.",
      "fd.winText": "You found all {n} differences in {time}.",
      "fd.replay": "Replay",
      "fd.next": "Next ›",
      "fd.timeUpTitle": "Time's Up",
      "fd.timeUpText": "Don't give up, try again!",
      "fd.tryAgain": "Try Again",
      "fd.finishText": "You completed all 5 Affandi paintings.",

      /* ---- puzzle ---- */
      "title.pz": "Painting Puzzle - Museum Affandi",
      "pz.moves": "Moves",
      "pz.title": "Assemble the Affandi Painting",
      "pz.reference": "Reference image:",
      "pz.difficulty": "Difficulty",
      "pz.easy": "Easy 3×3",
      "pz.medium": "Medium 4×4",
      "pz.hard": "Hard 5×5",
      "pz.reshuffle": "Reshuffle",
      "pz.winTitle": "Done!",
      "pz.winDefault": "The painting has been assembled.",
      "pz.winText": "Finished in {moves} moves, {time}.",
      "pz.replay": "Replay",
      "pz.nextPainting": "Next Painting ›",
      "pz.finishText": "You assembled all 5 Affandi paintings.",

      /* ---- snakes & ladders ---- */
      "title.ut": "Museum Affandi Snakes & Ladders",
      "ut.title": "Museum Affandi Snakes & Ladders",
      "ut.dice": "Dice",
      "ut.roll": "Roll the Dice",
      "ut.turnDefault": "Player 1's Turn",
      "ut.turn": "{name}'s Turn",
      "ut.square": "Square {pos}",
      "ut.overshoot":
        "{name} rolled {steps}, but that goes past the final square. The turn passes.",
      "ut.extraTurn": "{name} rolled a 6! Roll again.",
      "ut.ladder": "{name} climbed a ladder to square {pos}!",
      "ut.snake": "{name} got tangled in a vine and slid down to square {pos}.",
      "ut.winTitleDefault": "Player Wins!",
      "ut.winTitle": "{name} Wins!",
      "ut.winText": "{name} reached square {size} and won the game!",
      "ut.playAgain": "Play Again",
      "ut.startTitle": "Museum Snakes & Ladders",
      "ut.startText": "Choose the number of players to start.",
      "ut.players2": "2 Players",
      "ut.players3": "3 Players",
      "ut.players4": "4 Players"
    }
  };

  /* ---------- penyimpanan pilihan bahasa ---------- */
  function readSaved() {
    // 1) dari alamat halaman (?lang=en) -> paling andal untuk file://
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (SUPPORTED.includes(q)) return q;
    } catch (e) {}
    try {
      const ss = sessionStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(ss)) return ss;
    } catch (e) {}
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(v)) return v;
    } catch (e) {}
    // cadangan jika localStorage diblokir di file://
    const m = /(?:^|;)museumLang=(id|en)(?:;|$)/.exec(window.name || "");
    return m ? m[1] : null;
  }

  function writeSaved(l) {
    try {
      sessionStorage.setItem(STORAGE_KEY, l);
    } catch (e) {}
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch (e) {}
    window.name = "museumLang=" + l;
  }

  let lang = readSaved() || "id";
  writeSaved(lang);
  const listeners = [];

  /* ---------- API ---------- */
  function t(key, params) {
    const table = DICT[lang] || DICT.id;
    let s = table[key];
    if (s === undefined) s = DICT.id[key];
    if (s === undefined) return key;
    if (params) {
      s = s.replace(/\{(\w+)\}/g, (m, k) => (params[k] !== undefined ? params[k] : m));
    }
    return s;
  }

  function loc(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[lang] !== undefined ? v[lang] : v.id !== undefined ? v.id : "";
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.dataset.i18nTitle);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
  }

  function refreshToggle() {
    const box = document.getElementById("lang-toggle");
    if (!box) return;
    box.setAttribute("aria-label", t("common.langLabel"));
    box.querySelectorAll("button[data-lang]").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLanguage(next) {
    if (!SUPPORTED.includes(next) || next === lang) return;
    lang = next;
    writeSaved(lang);
    applyStatic();
    refreshToggle();
    listeners.forEach((fn) => {
      try {
        fn(lang);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function buildToggle() {
    if (document.getElementById("lang-toggle")) return;
    const box = document.createElement("div");
    box.id = "lang-toggle";
    box.className = "lang-toggle";
    box.setAttribute("role", "group");
    box.innerHTML =
      '<span class="lang-globe" aria-hidden="true">🌐</span>' +
      '<button type="button" data-lang="id">ID</button>' +
      '<button type="button" data-lang="en">EN</button>';
    box.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-lang]");
      if (b) setLanguage(b.dataset.lang);
    });
    document.body.appendChild(box);
    refreshToggle();
  }

  window.t = t;
  window.loc = loc;
  window.getLang = () => lang;
  window.setLanguage = setLanguage;
  window.onLanguageChange = (fn) => listeners.push(fn);

  function init() {
    applyStatic();
    buildToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
