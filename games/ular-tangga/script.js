/* =========================================================
   ULAR TANGGA MUSEUM AFFANDI
   GAME LOGIC
   ========================================================= */


/* =========================================================
   GAME STATE
   ========================================================= */

let players = [];

let currentPlayer = 0;

let boardSize = 0;

let cellSize = 0;

let isAnimating = false;


/* =========================================================
   DOM ELEMENT
   ========================================================= */

const boardEl =
  document.getElementById("ut-board");

const hudEl =
  document.getElementById("ut-hud");

const playersEl =
  document.getElementById("players");

const diceEl =
  document.getElementById("dice");

const diceFace =
  document.getElementById("dice-face");

const rollBtn =
  document.getElementById("roll-btn");

const turnText =
  document.getElementById("turn-text");


/* =========================================================
   DICE PIPS
   ========================================================= */

const DICE_FACE_PIPS = {

  1: [
    [50, 50]
  ],

  2: [
    [25, 25],
    [75, 75]
  ],

  3: [
    [25, 25],
    [50, 50],
    [75, 75]
  ],

  4: [
    [25, 25],
    [75, 25],
    [25, 75],
    [75, 75]
  ],

  5: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 75],
    [75, 75]
  ],

  6: [
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75]
  ]

};


/* =========================================================
   RENDER DICE
   ========================================================= */

function renderDiceFace(value) {

  if (!diceFace) {
    return;
  }


  diceFace.innerHTML = "";


  const pips =
    DICE_FACE_PIPS[value] ||
    DICE_FACE_PIPS[1];


  pips.forEach(
    ([x, y]) => {

      const dot =
        document.createElement("span");


      dot.className =
        "dice-dot";


      dot.style.left =
        x + "%";


      dot.style.top =
        y + "%";


      diceFace.appendChild(dot);

    }
  );

}


/* =========================================================
   CELL NUMBER -> ROW / COLUMN
   =========================================================

   Sistem:

   43 44 45 46 47 48 49
   42 41 40 39 38 37 36
   29 30 31 32 33 34 35
   28 27 26 25 24 23 22
   15 16 17 18 19 20 21
   14 13 12 11 10  9  8
    1  2  3  4  5  6  7

   ========================================================= */

function cellNumberToRowCol(n) {

  const idx =
    n - 1;


  const row =
    Math.floor(
      idx / BOARD_COLS
    );


  let colInRow =
    idx % BOARD_COLS;


  if (row % 2 === 1) {

    colInRow =
      BOARD_COLS -
      1 -
      colInRow;

  }


  return {

    row,

    col:
      colInRow

  };

}


/* =========================================================
   CELL CENTER
   ========================================================= */

function cellCenter(n) {

  const {
    row,
    col
  } =
    cellNumberToRowCol(n);


  const x =
    col * cellSize +
    cellSize / 2;


  const y =
    (BOARD_ROWS - 1 - row) *
      cellSize +
    cellSize / 2;


  return {

    x,

    y

  };

}


/* =========================================================
   DEFAULT CELL COLOR
   ========================================================= */

function getClassicCellColor(n) {

  const palette = [

    "#f4ddae",

    "#f8a87c",

    "#c7e5b0",

    "#d7b4e6",

    "#f9bfba",

    "#a9d8d5",

    "#f7d870"

  ];


  const row =
    Math.floor(
      (n - 1) /
      BOARD_COLS
    );


  const col =
    (n - 1) %
    BOARD_COLS;


  const direction =
    row % 2 === 0
      ? col
      : BOARD_COLS -
        1 -
        col;


  return palette[
    (row + direction) %
    palette.length
  ];

}


/* =========================================================
   BUILD BOARD
   ========================================================= */

function buildBoard() {

  boardEl.innerHTML = "";


  /* Ukuran papan */

  boardSize =
    boardEl.clientWidth ||
    780;


  cellSize =
    boardSize /
    BOARD_COLS;


  /* =======================================================
     BUAT 49 CELL
     ======================================================= */

  for (
    let n = 1;
    n <= BOARD_SIZE;
    n++
  ) {

    const {
      row,
      col
    } =
      cellNumberToRowCol(n);


    const cell =
      document.createElement("div");


    cell.className =
      "ut-cell";


    cell.style.width =
      cellSize + "px";


    cell.style.height =
      cellSize + "px";


    cell.style.left =
      col * cellSize + "px";


    cell.style.top =
      (BOARD_ROWS - 1 - row) *
        cellSize +
      "px";


    /* =====================================================
       WARNA DASAR
       ===================================================== */

    cell.style.backgroundColor =
      getClassicCellColor(n);


    /* =====================================================
       FOTO CELL
       ===================================================== */

    if (
      CELL_IMAGES[n]
    ) {

      cell.style.backgroundImage =
        `url("${CELL_IMAGES[n]}")`;

    }


    /* =====================================================
       NOMOR CELL
       ===================================================== */

    const numBadge =
      document.createElement("span");


    numBadge.className =
      "cell-num";


    numBadge.textContent =
      n;


    cell.appendChild(
      numBadge
    );


    /* =====================================================
       SPECIAL CELL
       ===================================================== */

    if (
      n === 1 ||
      n === BOARD_SIZE
    ) {

      cell.classList.add(
        "special-cell"
      );

    }


    /* =====================================================
       LADDER BOTTOM
       ===================================================== */

    if (
      LADDERS[n]
    ) {

      cell.classList.add(
        "ladder-bottom"
      );

    }


    /* =====================================================
       LADDER TOP
       ===================================================== */

    if (
      Object.values(
        LADDERS
      ).includes(n)
    ) {

      cell.classList.add(
        "ladder-top"
      );

    }


    /* =====================================================
       SNAKE TOP
       ===================================================== */

    if (
      SNAKES[n]
    ) {

      cell.classList.add(
        "snake-top"
      );

    }


    /* =====================================================
       SNAKE BOTTOM
       ===================================================== */

    if (
      Object.values(
        SNAKES
      ).includes(n)
    ) {

      cell.classList.add(
        "snake-bottom"
      );

    }


    boardEl.appendChild(
      cell
    );

  }


  /* =======================================================
     CONNECTORS
     ======================================================= */

  drawConnectors(
    LADDERS,
    "ladder"
  );


  drawConnectors(
    SNAKES,
    "snake"
  );


  /* =======================================================
     TOKENS
     ======================================================= */

  renderTokens();

}


/* =========================================================
   SNAKE PALETTES
   ========================================================= */

const SNAKE_PALETTES = [

  {
    dark: "#2f4a1f",
    mid: "#5c8a2e",
    light: "#9fc94d",
    belly: "#e9dfa0"
  },

  {
    dark: "#3a2a12",
    mid: "#8a5a2e",
    light: "#c99a52",
    belly: "#f0e2b8"
  },

  {
    dark: "#1f3d40",
    mid: "#2e7a72",
    light: "#63c6b6",
    belly: "#e6f2df"
  },

  {
    dark: "#3d1f30",
    mid: "#7a2e5a",
    light: "#c65296",
    belly: "#f2dfe9"
  },

  {
    dark: "#2a2a12",
    mid: "#6a6a2e",
    light: "#b0b552",
    belly: "#f2eec0"
  }

];


/* =========================================================
   DRAW CONNECTORS
   ========================================================= */

function drawConnectors(
  map,
  kind
) {

  const svgNS =
    "http://www.w3.org/2000/svg";


  const svg =
    document.createElementNS(
      svgNS,
      "svg"
    );


  svg.setAttribute(
    "class",
    "connector-svg"
  );


  svg.setAttribute(
    "viewBox",
    `0 0 ${boardSize} ${boardSize}`
  );


  svg.setAttribute(
    "preserveAspectRatio",
    "none"
  );


  const defs =
    document.createElementNS(
      svgNS,
      "defs"
    );


  svg.appendChild(
    defs
  );


  let snakeIndex = 0;


  Object.entries(map).forEach(
    ([from, to]) => {

      const a =
        cellCenter(
          Number(from)
        );


      const b =
        cellCenter(
          Number(to)
        );


      const dx =
        b.x - a.x;


      const dy =
        b.y - a.y;


      const length =
        Math.hypot(
          dx,
          dy
        ) || 1;


      const angle =
        Math.atan2(
          dy,
          dx
        ) *
        180 /
        Math.PI;


      const centerX =
        (a.x + b.x) / 2;


      const centerY =
        (a.y + b.y) / 2;


      const group =
        document.createElementNS(
          svgNS,
          "g"
        );


      group.setAttribute(
        "transform",
        `translate(${centerX} ${centerY}) rotate(${angle}) translate(${-centerX} ${-centerY})`
      );


      /* ===================================================
         LADDER
         =================================================== */

      if (
        kind === "ladder"
      ) {

        const railWidth =
          Math.max(
            10,
            Math.min(
              18,
              cellSize * 0.22
            )
          );


        const halfLength =
          length / 2;


        const rungCount =
          Math.max(
            4,
            Math.min(
              9,
              Math.round(
                length / 26
              )
            )
          );


        const railLeft =
          document.createElementNS(
            svgNS,
            "path"
          );


        railLeft.setAttribute(
          "class",
          "connector-rail"
        );


        railLeft.setAttribute(
          "d",
          `M ${centerX - halfLength} ${centerY - railWidth}
           L ${centerX + halfLength} ${centerY - railWidth}`
        );


        const railRight =
          document.createElementNS(
            svgNS,
            "path"
          );


        railRight.setAttribute(
          "class",
          "connector-rail"
        );


        railRight.setAttribute(
          "d",
          `M ${centerX - halfLength} ${centerY + railWidth}
           L ${centerX + halfLength} ${centerY + railWidth}`
        );


        group.appendChild(
          railLeft
        );


        group.appendChild(
          railRight
        );


        for (
          let i = 1;
          i < rungCount;
          i++
        ) {

          const rung =
            document.createElementNS(
              svgNS,
              "path"
            );


          const t =
            i / rungCount;


          const x =
            centerX -
            halfLength +
            t * length;


          rung.setAttribute(
            "class",
            "connector-rung"
          );


          rung.setAttribute(
            "d",
            `M ${x} ${centerY - railWidth}
             L ${x} ${centerY + railWidth}`
          );


          group.appendChild(
            rung
          );

        }

      }


      /* ===================================================
         SNAKE
         =================================================== */

      else {

        drawRealisticSnake(

          svgNS,

          defs,

          group,

          centerX,

          centerY,

          length,

          SNAKE_PALETTES[
            snakeIndex %
            SNAKE_PALETTES.length
          ],

          `snake-grad-${snakeIndex}`

        );


        snakeIndex++;

      }


      svg.appendChild(
        group
      );

    }
  );


  boardEl.appendChild(
    svg
  );

}


/* =========================================================
   SMOOTH PATH
   ========================================================= */

function smoothPathD(points) {

  if (
    points.length < 3
  ) {

    return points
      .map(
        (p) =>
          `${p.x.toFixed(1)} ${p.y.toFixed(1)}`
      )
      .join(" L ");

  }


  let d =
    `${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;


  for (
    let i = 1;
    i < points.length - 1;
    i++
  ) {

    const midX =
      (
        points[i].x +
        points[i + 1].x
      ) / 2;


    const midY =
      (
        points[i].y +
        points[i + 1].y
      ) / 2;


    d +=
      ` Q ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)}`;

  }


  const last =
    points[
      points.length - 1
    ];


  d +=
    ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;


  return d;

}


/* =========================================================
   REALISTIC SNAKE
   ========================================================= */

function drawRealisticSnake(

  svgNS,

  defs,

  group,

  centerX,

  centerY,

  length,

  palette,

  gradId

) {

  const headX =
    centerX -
    length / 2;


  const tailX =
    centerX +
    length / 2;


  const maxWidth =
    Math.max(
      9,
      Math.min(
        20,
        cellSize * 0.24
      )
    );


  const minWidth =
    maxWidth * 0.34;


  const seed =
    Math.abs(
      Math.round(
        centerX * 3 +
        centerY * 7
      )
    ) % 5;


  const waves =
    1.6 +
    seed * 0.15;


  const amp =
    Math.max(
      14,
      Math.min(
        30,
        cellSize * 0.3
      )
    );


  const steps = 48;

  const centerPts = [];


  /* =======================================================
     CENTER LINE
     ======================================================= */

  for (
    let i = 0;
    i <= steps;
    i++
  ) {

    const t =
      i / steps;


    const x =
      headX +
      t * length;


    const envelope =
      Math.sin(
        Math.PI *
        Math.min(
          1,
          t * 1.08
        )
      ) ** 0.6;


    const y =
      centerY +
      Math.sin(
        t *
        Math.PI *
        2 *
        waves +
        seed
      ) *
      amp *
      envelope;


    const width =
      maxWidth *
        (1 - t) +
      minWidth *
        t;


    centerPts.push({

      x,

      y,

      width

    });

  }


  /* =======================================================
     SMOOTHING
     ======================================================= */

  const smoothed =
    centerPts.map(
      (p, i) => {

        if (
          i === 0 ||
          i ===
            centerPts.length - 1
        ) {

          return p;

        }


        const prev =
          centerPts[
            i - 1
          ];


        const next =
          centerPts[
            i + 1
          ];


        return {

          x:
            p.x * 0.5 +
            prev.x * 0.25 +
            next.x * 0.25,

          y:
            p.y * 0.5 +
            prev.y * 0.25 +
            next.y * 0.25,

          width:
            p.width

        };

      }
    );


  for (
    let pass = 0;
    pass < 2;
    pass++
  ) {

    for (
      let i = 1;
      i < smoothed.length - 1;
      i++
    ) {

      const prev =
        smoothed[
          i - 1
        ];


      const next =
        smoothed[
          i + 1
        ];


      smoothed[i] = {

        x:
          smoothed[i].x *
            0.5 +
          prev.x * 0.25 +
          next.x * 0.25,

        y:
          smoothed[i].y *
            0.5 +
          prev.y * 0.25 +
          next.y * 0.25,

        width:
          smoothed[i].width

      };

    }

  }


  centerPts.length = 0;

  centerPts.push(
    ...smoothed
  );


  /* =======================================================
     BODY EDGES
     ======================================================= */

  const leftEdge = [];

  const rightEdge = [];


  for (
    let i = 0;
    i < centerPts.length;
    i++
  ) {

    const p =
      centerPts[i];


    const prev =
      centerPts[
        Math.max(
          0,
          i - 1
        )
      ];


    const next =
      centerPts[
        Math.min(
          centerPts.length - 1,
          i + 1
        )
      ];


    const dx =
      next.x -
      prev.x;


    const dy =
      next.y -
      prev.y;


    const len =
      Math.hypot(
        dx,
        dy
      ) || 1;


    const nx =
      -dy / len;


    const ny =
      dx / len;


    leftEdge.push({

      x:
        p.x +
        nx *
          (p.width / 2),

      y:
        p.y +
        ny *
          (p.width / 2)

    });


    rightEdge.push({

      x:
        p.x -
        nx *
          (p.width / 2),

      y:
        p.y -
        ny *
          (p.width / 2)

    });

  }


  /* =======================================================
     GRADIENT
     ======================================================= */

  const grad =
    document.createElementNS(
      svgNS,
      "linearGradient"
    );


  grad.setAttribute(
    "id",
    gradId
  );


  grad.setAttribute(
    "x1",
    "0%"
  );


  grad.setAttribute(
    "y1",
    "0%"
  );


  grad.setAttribute(
    "x2",
    "0%"
  );


  grad.setAttribute(
    "y2",
    "100%"
  );


  grad.innerHTML = `

    <stop
      offset="0%"
      stop-color="${palette.light}"
    />

    <stop
      offset="45%"
      stop-color="${palette.mid}"
    />

    <stop
      offset="100%"
      stop-color="${palette.dark}"
    />

  `;


  defs.appendChild(
    grad
  );


  /* =======================================================
     BODY
     ======================================================= */

  const pathData =
    "M " +
    smoothPathD(
      leftEdge
    ) +
    " L " +
    smoothPathD(
      rightEdge
        .slice()
        .reverse()
    ) +
    " Z";


  const body =
    document.createElementNS(
      svgNS,
      "path"
    );


  body.setAttribute(
    "class",
    "connector-snake-body"
  );


  body.setAttribute(
    "d",
    pathData
  );


  body.setAttribute(
    "fill",
    `url(#${gradId})`
  );


  body.setAttribute(
    "stroke",
    palette.dark
  );


  group.appendChild(
    body
  );


  /* =======================================================
     BELLY
     ======================================================= */

  const belly =
    document.createElementNS(
      svgNS,
      "path"
    );


  belly.setAttribute(
    "d",
    "M " +
      smoothPathD(
        centerPts
      )
  );


  belly.setAttribute(
    "class",
    "connector-snake-belly"
  );


  belly.setAttribute(
    "stroke",
    palette.belly
  );


  group.appendChild(
    belly
  );


  /* =======================================================
     SCALES
     ======================================================= */

  const scaleGap =
    Math.max(
      3,
      Math.round(
        steps / 12
      )
    );


  for (
    let i = 2;
    i <
    centerPts.length - 2;
    i += scaleGap
  ) {

    const p =
      centerPts[i];


    const w =
      p.width;


    const scale =
      document.createElementNS(
        svgNS,
        "path"
      );


    scale.setAttribute(
      "class",
      "connector-snake-scale"
    );


    const dir =
      i %
        (scaleGap * 2) <
      scaleGap
        ? 1
        : -1;


    scale.setAttribute(
      "d",
      `M ${(p.x - w * 0.32).toFixed(1)} ${(p.y - dir * w * 0.28).toFixed(1)}
       Q ${p.x.toFixed(1)} ${(p.y + dir * w * 0.42).toFixed(1)}
       ${(p.x + w * 0.32).toFixed(1)} ${(p.y - dir * w * 0.28).toFixed(1)}`
    );


    scale.setAttribute(
      "stroke",
      palette.dark
    );


    group.appendChild(
      scale
    );

  }


  /* =======================================================
     HEAD
     ======================================================= */

  const head =
    centerPts[0];


  const headNext =
    centerPts[2];


  const hdx =
    head.x -
    headNext.x;


  const hdy =
    head.y -
    headNext.y;


  const hlen =
    Math.hypot(
      hdx,
      hdy
    ) || 1;


  const dirX =
    hdx / hlen;


  const dirY =
    hdy / hlen;


  const perpX =
    -dirY;


  const perpY =
    dirX;


  const headW =
    maxWidth * 0.85;


  const headLen =
    maxWidth * 1.15;


  const baseL = {

    x:
      head.x +
      perpX *
        headW *
        0.5,

    y:
      head.y +
      perpY *
        headW *
        0.5

  };


  const baseR = {

    x:
      head.x -
      perpX *
        headW *
        0.5,

    y:
      head.y -
      perpY *
        headW *
        0.5

  };


  const tip = {

    x:
      head.x +
      dirX *
        headLen,

    y:
      head.y +
      dirY *
        headLen

  };


  const cheekL = {

    x:
      head.x +
      dirX *
        headLen *
        0.3 +
      perpX *
        headW *
        0.6,

    y:
      head.y +
      dirY *
        headLen *
        0.3 +
      perpY *
        headW *
        0.6

  };


  const cheekR = {

    x:
      head.x +
      dirX *
        headLen *
        0.3 -
      perpX *
        headW *
        0.6,

    y:
      head.y +
      dirY *
        headLen *
        0.3 -
      perpY *
        headW *
        0.6

  };


  const headPath =
    document.createElementNS(
      svgNS,
      "path"
    );


  headPath.setAttribute(
    "class",
    "connector-head"
  );


  headPath.setAttribute(
    "fill",
    `url(#${gradId})`
  );


  headPath.setAttribute(
    "stroke",
    palette.dark
  );


  headPath.setAttribute(
    "d",
    `M ${baseL.x.toFixed(1)} ${baseL.y.toFixed(1)}
     Q ${cheekL.x.toFixed(1)} ${cheekL.y.toFixed(1)}
     ${tip.x.toFixed(1)} ${tip.y.toFixed(1)}
     Q ${cheekR.x.toFixed(1)} ${cheekR.y.toFixed(1)}
     ${baseR.x.toFixed(1)} ${baseR.y.toFixed(1)}
     Z`
  );


  group.appendChild(
    headPath
  );


  /* =======================================================
     EYES
     ======================================================= */

  [0.62, -0.62].forEach(
    (side) => {

      const ex =
        head.x +
        dirX *
          headLen *
          0.42 +
        perpX *
          headW *
          0.42 *
          side;


      const ey =
        head.y +
        dirY *
          headLen *
          0.42 +
        perpY *
          headW *
          0.42 *
          side;


      const eyeR =
        Math.max(
          3,
          headW * 0.22
        );


      const eyeBg =
        document.createElementNS(
          svgNS,
          "circle"
        );


      eyeBg.setAttribute(
        "class",
        "connector-eye-bg"
      );


      eyeBg.setAttribute(
        "cx",
        ex.toFixed(1)
      );


      eyeBg.setAttribute(
        "cy",
        ey.toFixed(1)
      );


      eyeBg.setAttribute(
        "r",
        eyeR.toFixed(1)
      );


      group.appendChild(
        eyeBg
      );


      const pupil =
        document.createElementNS(
          svgNS,
          "ellipse"
        );


      pupil.setAttribute(
        "class",
        "connector-eye-pupil"
      );


      pupil.setAttribute(
        "cx",
        ex.toFixed(1)
      );


      pupil.setAttribute(
        "cy",
        ey.toFixed(1)
      );


      pupil.setAttribute(
        "rx",
        (eyeR * 0.32).toFixed(1)
      );


      pupil.setAttribute(
        "ry",
        (eyeR * 0.85).toFixed(1)
      );


      group.appendChild(
        pupil
      );

    }
  );


  /* =======================================================
     NOSTRILS
     ======================================================= */

  [0.3, -0.3].forEach(
    (side) => {

      const nx =
        head.x +
        dirX *
          headLen *
          0.92 +
        perpX *
          headW *
          0.18 *
          side;


      const ny =
        head.y +
        dirY *
          headLen *
          0.92 +
        perpY *
          headW *
          0.18 *
          side;


      const nostril =
        document.createElementNS(
          svgNS,
          "circle"
        );


      nostril.setAttribute(
        "class",
        "connector-nostril"
      );


      nostril.setAttribute(
        "cx",
        nx.toFixed(1)
      );


      nostril.setAttribute(
        "cy",
        ny.toFixed(1)
      );


      nostril.setAttribute(
        "r",
        "1.4"
      );


      group.appendChild(
        nostril
      );

    }
  );


  /* =======================================================
     TONGUE
     ======================================================= */

  const tongueBase = {

    x:
      tip.x +
      dirX * 1.5,

    y:
      tip.y +
      dirY * 1.5

  };


  const tongueMid = {

    x:
      tongueBase.x +
      dirX *
        headLen *
        0.4,

    y:
      tongueBase.y +
      dirY *
        headLen *
        0.4

  };


  const forkA = {

    x:
      tongueMid.x +
      dirX *
        headLen *
        0.22 +
      perpX *
        headW *
        0.18,

    y:
      tongueMid.y +
      dirY *
        headLen *
        0.22 +
      perpY *
        headW *
        0.18

  };


  const forkB = {

    x:
      tongueMid.x +
      dirX *
        headLen *
        0.22 -
      perpX *
        headW *
        0.18,

    y:
      tongueMid.y +
      dirY *
        headLen *
        0.22 -
      perpY *
        headW *
        0.18

  };


  const tongue =
    document.createElementNS(
      svgNS,
      "path"
    );


  tongue.setAttribute(
    "class",
    "connector-tongue"
  );


  tongue.setAttribute(
    "d",
    `M ${tongueBase.x.toFixed(1)} ${tongueBase.y.toFixed(1)}
     L ${tongueMid.x.toFixed(1)} ${tongueMid.y.toFixed(1)}
     M ${tongueMid.x.toFixed(1)} ${tongueMid.y.toFixed(1)}
     L ${forkA.x.toFixed(1)} ${forkA.y.toFixed(1)}
     M ${tongueMid.x.toFixed(1)} ${tongueMid.y.toFixed(1)}
     L ${forkB.x.toFixed(1)} ${forkB.y.toFixed(1)}`
  );


  group.appendChild(
    tongue
  );

}


/* =========================================================
   TOKEN POSITIONING
   ========================================================= */

function renderTokens() {

  /* Hapus token lama */

  document
    .querySelectorAll(
      ".token"
    )
    .forEach(
      (t) =>
        t.remove()
    );


  /* =======================================================
     UKURAN TOKEN
     ======================================================= */

  const tokenSize =
    Math.max(
      46,
      Math.min(
        82,
        cellSize * 0.62
      )
    );


  /* =======================================================
     KELOMPOK PEMAIN BERDASARKAN POSISI
     ======================================================= */

  const groups =
    new Map();


  players.forEach(
    (p, i) => {

      if (
        !groups.has(
          p.pos
        )
      ) {

        groups.set(
          p.pos,
          []
        );

      }


      groups
        .get(p.pos)
        .push({

          player: p,

          index: i

        });

    }
  );


  /* =======================================================
     RENDER TOKEN SETIAP KELOMPOK
     ======================================================= */

  groups.forEach(
    (group, pos) => {

      group.forEach(
        (
          { player: p },
          localIndex
        ) => {

          const token =
            document.createElement(
              "div"
            );


          token.className =
            "token";


          token.style.setProperty(
            "--token-size",
            tokenSize + "px"
          );


          token.style.backgroundColor =
            p.color;


          token.style.backgroundImage =
            `url("${p.image}")`;


          let posX;

          let posY;


          /* =================================================
             POSISI START
             ================================================= */

          if (
            pos === 0
          ) {

            const spacing =
              tokenSize * 0.72;


            const totalWidth =
              (group.length - 1) *
                spacing +
              tokenSize;


            posX =
              cellSize * 0.5 -
              totalWidth / 2 +
              tokenSize / 2 +
              localIndex *
                spacing;


            posY =
              boardSize -
              cellSize * 0.5;

          }


          /* =================================================
             POSISI DI PAPAN
             ================================================= */

          else {

            const center =
              cellCenter(pos);


            const gap =
              tokenSize * 0.52;


            /* ===============================================
               1 PEMAIN
               =============================================== */

            const layouts = {

              1: [

                [0, 0]

              ],


              /* =============================================
                 2 PEMAIN
                 ============================================= */

              2: [

                [
                  -gap / 2,
                  0
                ],

                [
                  gap / 2,
                  0
                ]

              ],


              /* =============================================
                 3 PEMAIN
                 ============================================= */

              3: [

                [
                  -gap / 2,
                  -gap / 2
                ],

                [
                  gap / 2,
                  -gap / 2
                ],

                [
                  0,
                  gap / 2
                ]

              ],


              /* =============================================
                 4 PEMAIN
                 ============================================= */

              4: [

                [
                  -gap / 2,
                  -gap / 2
                ],

                [
                  gap / 2,
                  -gap / 2
                ],

                [
                  -gap / 2,
                  gap / 2
                ],

                [
                  gap / 2,
                  gap / 2
                ]

              ]

            };


            let offsets =
              layouts[
                group.length
              ];


            /* =============================================
               FALLBACK
               ============================================= */

            if (
              !offsets
            ) {

              const cols =
                Math.ceil(
                  Math.sqrt(
                    group.length
                  )
                );


              const rows =
                Math.ceil(
                  group.length /
                    cols
                );


              offsets =
                group.map(
                  (_, idx) => {

                    const col =
                      idx %
                      cols;


                    const row =
                      Math.floor(
                        idx /
                          cols
                      );


                    return [

                      (
                        col -
                        (cols - 1) /
                          2
                      ) *
                        gap,

                      (
                        row -
                        (rows - 1) /
                          2
                      ) *
                        gap

                    ];

                  }
                );

            }


            const [
              offsetX,
              offsetY
            ] =
              offsets[
                localIndex
              ];


            /* =================================================
               CENTERED TOKEN
               ================================================= */

            posX =
              center.x +
              offsetX;


            posY =
              center.y +
              offsetY;

          }


          /* =================================================
             CSS LEFT / TOP
             ================================================= */

          token.style.left =
            posX -
            tokenSize / 2 +
            "px";


          token.style.top =
            posY -
            tokenSize / 2 +
            "px";


          boardEl.appendChild(
            token
          );

        }
      );

    }
  );

}


/* =========================================================
   PLAYER PANEL
   ========================================================= */

function renderPlayersPanel() {

  playersEl.innerHTML = "";


  players.forEach(
    (p, i) => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "player-row" +
        (
          i === currentPlayer
            ? " active"
            : ""
        );


      row.innerHTML = `

        <div
          class="player-dot"
          style="
            background-color:${p.color};
            background-image:url('${p.image}');
          "
        ></div>

        <div>
          ${p.name}
        </div>

        <div class="player-pos">
          Kotak ${p.pos}
        </div>

      `;


      playersEl.appendChild(
        row
      );

    }
  );


  if (
    players.length > 0
  ) {

    turnText.textContent =
      `Giliran ${players[currentPlayer].name}`;

  }

}


/* =========================================================
   INITIAL DICE
   ========================================================= */

renderDiceFace(1);


/* =========================================================
   START GAME
   ========================================================= */

function startGame(
  numPlayers
) {

  document
    .getElementById(
      "overlay-start"
    )
    .classList.remove(
      "show"
    );


  players = [];


  for (
    let i = 0;
    i < numPlayers;
    i++
  ) {

    players.push({

      name:
        PLAYER_NAMES[i],

      color:
        PLAYER_COLORS[i],

      image:
        PLAYER_IMAGES[i],

      pos: 0

    });

  }


  currentPlayer = 0;

  isAnimating = false;


  buildBoard();


  renderPlayersPanel();

}


/* =========================================================
   RESET GAME
   ========================================================= */

function resetGame() {

  document
    .getElementById(
      "overlay-win"
    )
    .classList.remove(
      "show"
    );


  document
    .getElementById(
      "overlay-start"
    )
    .classList.add(
      "show"
    );

}


/* =========================================================
   ROLL DICE
   ========================================================= */

async function rollDice() {

  if (
    isAnimating
  ) {

    return;

  }


  isAnimating = true;


  rollBtn.disabled = true;


  diceEl.classList.add(
    "rolling"
  );


  const spins = 12;


  /* =======================================================
     DICE ANIMATION
     ======================================================= */

  for (
    let i = 0;
    i < spins;
    i++
  ) {

    const face =
      1 +
      Math.floor(
        Math.random() * 6
      );


    renderDiceFace(
      face
    );


    await sleep(60);

  }


  diceEl.classList.remove(
    "rolling"
  );


  /* =======================================================
     FINAL DICE
     ======================================================= */

  const finalRoll =
    1 +
    Math.floor(
      Math.random() * 6
    );


  renderDiceFace(
    finalRoll
  );


  /* =======================================================
     MOVE PLAYER
     ======================================================= */

  await movePlayer(
    finalRoll
  );


  rollBtn.disabled =
    false;


  isAnimating =
    false;

}


/* =========================================================
   SLEEP
   ========================================================= */

function sleep(ms) {

  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        ms
      )
  );

}


/* =========================================================
   MOVE PLAYER
   ========================================================= */

async function movePlayer(
  steps
) {

  const p =
    players[
      currentPlayer
    ];


  const target =
    p.pos +
    steps;


  /* =======================================================
     JIKA MELEBIHI 49
     ======================================================= */

  if (
    target >
    BOARD_SIZE
  ) {

    turnText.textContent =
      `${p.name} mendapatkan ${steps}, tetapi melebihi kotak akhir. Giliran berpindah.`;


    currentPlayer =
      (
        currentPlayer + 1
      ) %
      players.length;


    renderPlayersPanel();


    return;

  }


  /* =======================================================
     GERAK SATU PER SATU
     ======================================================= */

  for (
    let s =
      p.pos + 1;
    s <= target;
    s++
  ) {

    p.pos =
      s;


    renderTokens();


    renderPlayersPanel();


    await sleep(
      220
    );

  }


  /* =======================================================
     LADDER
     ======================================================= */

  if (
    LADDERS[p.pos]
  ) {

    await sleep(
      300
    );


    p.pos =
      LADDERS[p.pos];


    turnText.textContent =
      `${p.name} naik tangga ke kotak ${p.pos}!`;


    renderTokens();


    renderPlayersPanel();

  }


  /* =======================================================
     SNAKE
     ======================================================= */

  else if (
    SNAKES[p.pos]
  ) {

    await sleep(
      300
    );


    p.pos =
      SNAKES[p.pos];


    turnText.textContent =
      `${p.name} terserang ular, turun ke kotak ${p.pos}.`;


    renderTokens();


    renderPlayersPanel();

  }


  /* =======================================================
     WIN
     ======================================================= */

  if (
    p.pos ===
    BOARD_SIZE
  ) {

    setTimeout(
      () => {

        document
          .getElementById(
            "win-title"
          )
          .textContent =
          `${p.name} Menang!`;


        document
          .getElementById(
            "win-text"
          )
          .textContent =
          `${p.name} berhasil mencapai kotak ${BOARD_SIZE} dan memenangkan permainan!`;


        document
          .getElementById(
            "overlay-win"
          )
          .classList.add(
            "show"
          );

      },
      300
    );


    return;

  }


  /* =======================================================
     NEXT PLAYER
     ======================================================= */

  currentPlayer =
    (
      currentPlayer + 1
    ) %
    players.length;


  renderPlayersPanel();

}


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      players.length
    ) {

      buildBoard();

    }

  }
);