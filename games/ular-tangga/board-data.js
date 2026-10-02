/* =========================================================
   DATA PAPAN ULAR TANGGA MUSEUM AFFANDI
   ========================================================= */

/* =========================================================
   UKURAN PAPAN
   ========================================================= */

const BOARD_COLS = 7;
const BOARD_ROWS = 7;
const BOARD_SIZE = BOARD_COLS * BOARD_ROWS;

/*
  7 x 7 = 49 kotak
  Kotak start dianggap sebagai posisi 0
*/

/* =========================================================
   TANGGA
   ========================================================= */

const LADDERS = {
  2: 15,
  5: 21,
  8:24,
  11: 35,
  26: 38,
  29: 45,
};

/* =========================================================
   ULAR
   ========================================================= */

const SNAKES = {
  40: 6,
  27: 4,
  31:43,
  37: 12,
  47: 28,
};

/* =========================================================
   UKURAN TANGGA & TANAMAN MERAMBAT
   1 = ukuran asli, 0.5 = setengah, 0.3 = sangat kecil
   ========================================================= */

const LADDER_SCALE = 0.6;
const VINE_SCALE = 0.6;

/* =========================================================
   FOTO DADU
   ========================================================= */

const DICE_FACES = {
  1: "../../assets/images/dadu/dadu_1_affandi.jpg",
  2: "../../assets/images/dadu/dadu_2_mariati.jpg",
  3: "../../assets/images/dadu/dadu_3_affandi.jpg",
  4: "../../assets/images/dadu/dadu_4_mariati.jpg",
  5: "../../assets/images/dadu/dadu_5_affandi.jpg",
  6: "../../assets/images/dadu/dadu_6_mariati.jpg",
};

/* =========================================================
   BACKGROUND PAPAN
   ========================================================= */

const BOARD_BG = "../../assets/images/arsitektur/museum_bg.jpeg";

/* =========================================================
   KOTAK FOTO (KOTAK KUNING DI DRAFT)
   Kotak-kotak ini menampilkan FOTO/STIKER, bukan teks.
   Semua kotak lain menampilkan teks dari CELL_TEXTS.
   Nama file foto: assets/images/arsitektur/cells/cell{nomor}.jpg
   ========================================================= */

const PHOTO_CELLS = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 49];

/* Keterangan tiap foto (muncul sebagai tooltip / aria-label) */
const CELL_PHOTO_LABELS = {
   2: "Gerbang",
   6:"Tangan",
  10: "Galeri 1",
  18 : "Mobil Affandi",
  22 : "Affandi",
  26: "Kafe Loteng",
  30: "Kartika",
  34: "Galeri 2",
  38: "Karavan",
  42: "Maryati",
  46: "Galeri 3",
  49: "Sosok Affandi, Maryati, dan Kartika",
};

/* Versi Inggris keterangan foto */
const CELL_PHOTO_LABELS_EN = {
  2: "Gate",
  6: "Hand",
  10: "Gallery 1",
  18: "Affandi's Car",
  22: "Affandi",
  26: "Attic Café",
  30: "Kartika",
  34: "Gallery 2",
  38: "Caravan",
  42: "Maryati",
  46: "Gallery 3",
  49: "Affandi, Maryati, and Kartika",
};

const CELL_IMAGES = {};

PHOTO_CELLS.forEach((n) => {
  CELL_IMAGES[n] = `../../assets/images/arsitektur/cells/cell${n}.jpg`;
});

/* =========================================================
   TEKS SETIAP CELL (SEMUA KOTAK SELAIN KOTAK FOTO)
   Sesuai DRAFT ULAR TANGGA
   ========================================================= */

const CELL_TEXTS = {
  1: "START",
  3: "Affandi lahir di Cirebon pada 1907.",
  4: "Daun pisang menyelamatkan hidupnya saat terkena cacar air.",
  5: "Sebelum melukis, Affandi pernah menjadi guru dan menggambar poster film di bioskop.",
  7: "Menikah dengan Maryati pada 1933.",
  8: "Kartika Affandi lahir pada 1934.",
  9: "Profesi melukis pertama Affandi adalah melukis poster bioskop.",
  11: "Tahun 1935, Affandi memutuskan untuk fokus melukis.",
  12: "Pameran pertama pada tahun 1943 di Gedoeng Poetera, Jakarta.",
  13: "Affandi membuat poster perjuangan kemerdekaan berjudul 'BOENG AJOE BOENG'.",
  15: "Memperoleh beasiswa ke India pada 1949.",
  16: "Melanjutkan tur pameran di negara-negara Eropa.",
  17: "Menjadi peserta pertama dari Indonesia di São Paulo Biennale (1952) dan Venice Art Biennale (1954).",
  19: "Affandi merancang rumah dan museum beratap menyerupai daun pisang.",
  20: "Menetap di Yogyakarta dan membangun galeri pertama.",
  21: "Menikahi istri ke-2 pada tahun 1957.",
  23: "Bersama Rubiyem, Affandi memiliki 2 putra dan 1 putri.",
  24: "Pada tahun 1967-1968, Affandi menyelesaikan mural fresco di Jefferson Hall East-West Center, Hawaii AS.",
  25: "Affandi menerima Penghargaan Perdamaian Internasional dari Dag Hammarskjold Foundation dan gelar Maestro.",
  27: "Galeri I Museum Affandi diresmikan pada tahun 1973.",
  28: "Affandi menerima Bintang Jasa Utama pada 1978.",
  29: "Affandi dan Maryati dimakamkan di kompleks Museum Affandi.",
  31: "Maryati meninggal setahun berikutnya pada tahun 1991.",
  32: "Affandi meninggal dunia pada tanggal 23 Mei 1990.",
  33: "Galeri II diresmikan pada 9 Juni 1988.",
  35: "Pada usia 80 tahun (1987), Affandi menggelar pameran retrospektif di Gedung Pameran Seni Rupa, Jakarta.",
  36: "Museum Affandi menyimpan lebih dari 300 koleksi.",
  37: "Galeri III diresmikan pada 18 Mei 2000.",
  39: "Galeri I berisi pameran retrospektif dan peninggalan barang pribadi Affandi.",
  40: "Galeri II berisi pameran karya perjalanan penting Affandi.",
  41: "Galeri III berisi karya milik keluarga, termasuk karya Maryati, Kartika Affandi, dan anggota keluarga lainnya.",
  43: "Museum Affandi menyimpan lebih dari 300 koleksi.",
  44: "Jalan Affandi di Yogyakarta diresmikan pada 20 Mei 2007 dalam rangka memperingati 100 tahun usia Affandi.",
  45: "Karya-karya Affandi masih terus mengikuti pameran termasuk di Jepang, Singapura, hingga Belanda.",
  47: "Saat ini, Kartika Affandi berusia 92 tahun dan masih aktif berkarya.",
  48: "Kartika Affandi menerima penghargaan Anugerah Puspa Bangsa KOMPAS TV pada tahun 2026.",
};

/* =========================================================
   VERSI INGGRIS TEKS SETIAP CELL (kunci = nomor kotak sama
   dengan CELL_TEXTS di atas)
   ========================================================= */

const CELL_TEXTS_EN = {
  1: "START",
  3: "Affandi was born in Cirebon in 1907.",
  4: "A banana leaf saved his life when he had chickenpox.",
  5: "Before painting, Affandi worked as a teacher and drew movie posters for cinemas.",
  7: "Married Maryati in 1933.",
  8: "Kartika Affandi was born in 1934.",
  9: "Affandi's first painting job was painting cinema posters.",
  11: "In 1935, Affandi decided to focus on painting.",
  12: "His first exhibition was held in 1943 at Gedoeng Poetera, Jakarta.",
  13: "Affandi created an independence struggle poster titled 'BOENG AJOE BOENG'.",
  15: "Received a scholarship to India in 1949.",
  16: "Continued an exhibition tour across European countries.",
  17: "Became the first Indonesian participant at the São Paulo Biennale (1952) and the Venice Art Biennale (1954).",
  19: "Affandi designed a house and museum with a roof resembling a banana leaf.",
  20: "Settled in Yogyakarta and built his first gallery.",
  21: "Married his second wife in 1957.",
  23: "With Rubiyem, Affandi had 2 sons and 1 daughter.",
  24: "In 1967-1968, Affandi completed a fresco mural at Jefferson Hall, East-West Center, Hawaii, USA.",
  25: "Affandi received the International Peace Award from the Dag Hammarskjold Foundation and the title of Maestro.",
  27: "Gallery I of Museum Affandi was inaugurated in 1973.",
  28: "Affandi received the Bintang Jasa Utama (Star of Great Service) in 1978.",
  29: "Affandi and Maryati are buried in the Museum Affandi complex.",
  31: "Maryati passed away the following year, in 1991.",
  32: "Affandi passed away on May 23, 1990.",
  33: "Gallery II was inaugurated on June 9, 1988.",
  35: "At the age of 80 (1987), Affandi held a retrospective exhibition at the Fine Arts Exhibition Building, Jakarta.",
  36: "Museum Affandi holds more than 300 works in its collection.",
  37: "Gallery III was inaugurated on May 18, 2000.",
  39: "Gallery I features a retrospective exhibition and Affandi's personal belongings.",
  40: "Gallery II features works from Affandi's important journeys.",
  41: "Gallery III features works owned by the family, including works by Maryati, Kartika Affandi, and other family members.",
  43: "Museum Affandi holds more than 300 works in its collection.",
  44: "Jalan Affandi (Affandi Street) in Yogyakarta was inaugurated on May 20, 2007, to commemorate Affandi's 100th birthday.",
  45: "Affandi's works continue to be exhibited, including in Japan, Singapore, and the Netherlands.",
  47: "Today, Kartika Affandi is 92 years old and still actively creating art.",
  48: "Kartika Affandi received the Anugerah Puspa Bangsa award from KOMPAS TV in 2026.",
};

/* Pilih teks sesuai bahasa aktif (dipakai script.js) */
function getCellText(n) {
  const en = typeof window.getLang === "function" && window.getLang() === "en";
  return (en ? CELL_TEXTS_EN[n] : CELL_TEXTS[n]) || CELL_TEXTS[n] || "";
}

function getPhotoLabel(n) {
  const en = typeof window.getLang === "function" && window.getLang() === "en";
  return (en ? CELL_PHOTO_LABELS_EN[n] : CELL_PHOTO_LABELS[n]) || CELL_PHOTO_LABELS[n] || "";
}

/* =========================================================
   WARNA UTAMA TEMA PAPAN
   ========================================================= */

const THEME_GREEN = "#3A644E";
const THEME_YELLOW = "#E8AE21";
const THEME_RED = "#9B3737";

/* =========================================================
   WARNA PEMAIN
   ========================================================= */

const PLAYER_COLORS = ["#8C3B2E", "#5C6B4E", "#D9A441", "#2A4B5C"];

/* =========================================================
   NAMA PEMAIN
   ========================================================= */

const PLAYER_NAMES = ["Maryati", "Affandi1", "Kartika", "Affandi2"];

/* =========================================================
   FOTO PEMAIN
   ========================================================= */

const PLAYER_IMAGES = [
  "../../assets/images/ui/Maryati.jpeg",
  "../../assets/images/ui/Affandi1.jpeg",
  "../../assets/images/ui/Kartika.jpeg",
  "../../assets/images/ui/Affandi2.jpeg",
];