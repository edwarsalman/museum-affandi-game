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
  3: 14,

  5: 19,

  17: 35,

  26: 38,

  29: 45,

  31: 43,
};

/* =========================================================
   ULAR
   ========================================================= */

const SNAKES = {
  11: 6,

  20: 7,

  27: 4,

  37: 2,

  40: 23,

  47: 28,
};

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

const BOARD_BG = "../../assets/images/ui/Affandi2.jpeg";

/* =========================================================
   FOTO SETIAP CELL
   =========================================================

   Folder:

   assets/
   └── images/
       └── arsitektur/
           └── cells/
               ├── cell1.jpg
               ├── cell2.jpg
               ├── ...
               └── cell49.jpg

   ========================================================= */

const CELL_IMAGES = {};

for (let n = 1; n <= BOARD_SIZE; n++) {
  CELL_IMAGES[n] = `../../assets/images/arsitektur/cells/cell${n}.jpg`;
}

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
