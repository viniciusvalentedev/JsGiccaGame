import kaplay from "kaplay";

const k = kaplay({
  width: window.innerWidth,
  height: window.innerHeight,
  letterbox: false,
  stretch: true,
  background: [100, 190, 70],
  touchToMouse: true,
  canvas: document.querySelector("canvas") || undefined,
});

const SW = window.innerWidth;
const SH = window.innerHeight;

// Escala baseada numa resolução de referência de 480x320
const SCALE_X = SW / 480;
const SCALE_Y = SH / 320;
const SC = Math.min(SCALE_X, SCALE_Y);
function fs(size) { return Math.round(size * SC); }

// Fonte pixel art (woff2 direto do CDN do Google Fonts)
k.loadFont(
  "pressstart2p",
  "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivNm4I81.woff2"
);

k.loadSprite("gigi", "sprites/gigi.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    "idle-down":  { from: 0,  to: 0 },
    "walk-down":  { from: 0,  to: 3,  loop: true, speed: 8 },
    "idle-up":    { from: 4,  to: 4 },
    "walk-up":    { from: 4,  to: 7,  loop: true, speed: 8 },
    "idle-left":  { from: 8,  to: 8 },
    "walk-left":  { from: 8,  to: 11, loop: true, speed: 8 },
    "idle-right": { from: 12, to: 12 },
    "walk-right": { from: 12, to: 15, loop: true, speed: 8 },
  },
});

k.loadSprite("grass",           "sprites/grass.png");
k.loadSprite("flower",          "sprites/flower.png");
k.loadSprite("bird",            "sprites/bird.png",            { sliceX: 2, sliceY: 1, anims: { fly:  { from: 0, to: 1, loop: true, speed: 4 } } });
k.loadSprite("butterfly",       "sprites/butterfly.png",       { sliceX: 2, sliceY: 1, anims: { fly:  { from: 0, to: 1, loop: true, speed: 5 } } });
k.loadSprite("bouquet",         "sprites/bouquet.png",         { sliceX: 4, sliceY: 1, anims: { sway: { from: 0, to: 3, loop: true, speed: 4 } } });
k.loadSprite("tree",            "sprites/tree.png",            { sliceX: 2, sliceY: 1, anims: { sway: { from: 0, to: 1, loop: true, speed: 2 } } });
k.loadSprite("vivi",            "sprites/vivi.png",            { sliceX: 4, sliceY: 4, anims: {
  "idle-down":  { from: 0,  to: 0  },
  "walk-down":  { from: 0,  to: 3,  loop: true, speed: 8 },
  "idle-up":    { from: 4,  to: 4  },
  "walk-up":    { from: 4,  to: 7,  loop: true, speed: 8 },
  "idle-left":  { from: 8,  to: 8  },
  "walk-left":  { from: 8,  to: 11, loop: true, speed: 8 },
  "idle-right": { from: 12, to: 12 },
  "walk-right": { from: 12, to: 15, loop: true, speed: 8 },
}});
k.loadSprite("npc_man",         "sprites/npc_man.png",         { sliceX: 4, sliceY: 4, anims: {
  "idle-down":  { from: 0,  to: 0  },
  "walk-down":  { from: 0,  to: 3,  loop: true, speed: 8 },
  "idle-up":    { from: 4,  to: 4  },
  "walk-up":    { from: 4,  to: 7,  loop: true, speed: 8 },
  "idle-left":  { from: 8,  to: 8  },
  "walk-left":  { from: 8,  to: 11, loop: true, speed: 8 },
  "idle-right": { from: 12, to: 12 },
  "walk-right": { from: 12, to: 15, loop: true, speed: 8 },
}});
k.loadSprite("npc_woman",       "sprites/npc_woman.png",       { sliceX: 4, sliceY: 4, anims: {
  "idle-down":  { from: 0,  to: 0  },
  "walk-down":  { from: 0,  to: 3,  loop: true, speed: 8 },
  "idle-up":    { from: 4,  to: 4  },
  "walk-up":    { from: 4,  to: 7,  loop: true, speed: 8 },
  "idle-left":  { from: 8,  to: 8  },
  "walk-left":  { from: 8,  to: 11, loop: true, speed: 8 },
  "idle-right": { from: 12, to: 12 },
  "walk-right": { from: 12, to: 15, loop: true, speed: 8 },
}});
k.loadSprite("ball",            "sprites/ball.png",            { sliceX: 2, sliceY: 1, anims: { spin: { from: 0, to: 1, loop: true, speed: 6 } } });
k.loadSprite("scenario_tiles",  "sprites/scenario_tiles.png",  { sliceX: 8, sliceY: 1 });

// "keyboard" em desktops, "joystick" em dispositivos touch — detectado automaticamente
let controlMode = window.matchMedia("(pointer: coarse)").matches ? "joystick" : "keyboard";

const messages = [
  { text: "Momoris",                          time: 0  },
  { text: "Criado com muito amor por Vivi",        time: 7  },
  { text: "Comemorando 4 anos",                    time: 15 },
  { text: "dos melhores momentos da minha vida",   time: 21 },
  { text: "Tudo que vivo ao seu lado e especial",  time: 30 },
  { text: "Obrigado por existir, Giovanna",        time: 39 },
  { text: "Agora bora jogar!",                     time: 50 },
];

// ── Joystick Virtual ─────────────────────────────────────────────────────
// getBlocked: () => bool — retorna true quando o input deve ser ignorado
function makeVirtualJoystick(getBlocked) {
  const BASE_X = SW - 65;
  const BASE_Y = SH - 70;
  const BASE_R = 44;
  const KNOB_R = 20;

  const ring = k.add([
    k.rect((BASE_R + 6) * 2, (BASE_R + 6) * 2, { radius: BASE_R + 6 }),
    k.pos(BASE_X, BASE_Y), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0.18), k.z(60), k.fixed(),
  ]);
  const base = k.add([
    k.rect(BASE_R * 2, BASE_R * 2, { radius: BASE_R }),
    k.pos(BASE_X, BASE_Y), k.anchor("center"),
    k.color(30, 30, 30), k.opacity(0.45), k.z(61), k.fixed(),
  ]);
  const knob = k.add([
    k.rect(KNOB_R * 2, KNOB_R * 2, { radius: KNOB_R }),
    k.pos(BASE_X, BASE_Y), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0.78), k.z(62), k.fixed(),
  ]);

  let active   = false;
  let prevDown = false;
  let dirX = 0, dirY = 0;

  function tick() {
    if (getBlocked && getBlocked()) {
      if (active) {
        active = false; dirX = 0; dirY = 0;
        knob.pos.x = BASE_X; knob.pos.y = BASE_Y;
      }
      prevDown = false;
      return;
    }
    const down = k.isMouseDown("left");
    const mp   = k.mousePos();
    if (down && !prevDown) {
      if (Math.hypot(mp.x - BASE_X, mp.y - BASE_Y) <= BASE_R * 2.6) {
        active = true;
      }
    }
    if (!down) {
      active = false; dirX = 0; dirY = 0;
      knob.pos.x = BASE_X; knob.pos.y = BASE_Y;
    }
    if (active) {
      const ox = mp.x - BASE_X;
      const oy = mp.y - BASE_Y;
      const d  = Math.hypot(ox, oy);
      const cd = Math.min(d, BASE_R);
      dirX = d > 0 ? ox / d : 0;
      dirY = d > 0 ? oy / d : 0;
      knob.pos.x = BASE_X + dirX * cd;
      knob.pos.y = BASE_Y + dirY * cd;
    }
    prevDown = down;
  }

  function show() { ring.hidden = false; base.hidden = false; knob.hidden = false; }
  function hide() { ring.hidden = true;  base.hidden = true;  knob.hidden = true;  }

  return {
    tick,
    isActive: () => active,
    getDir:   () => ({ x: dirX, y: dirY }),
    show,
    hide,
  };
}

// ── Overlay de Pause ─────────────────────────────────────────────────────
// Retorna uma função que destrói o overlay quando chamada
function makePauseOverlay(onResume) {
  const objs = [];
  const add  = (obj) => { objs.push(obj); return obj; };

  // Escurecimento
  add(k.add([
    k.rect(SW, SH),
    k.pos(0, 0),
    k.color(18, 0, 38),
    k.opacity(0.76),
    k.z(100),
  ]));

  // Borda do painel
  add(k.add([
    k.rect(258 * SC, 182 * SC, { radius: 16 * SC }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(110, 50, 155),
    k.z(101),
  ]));

  // Fundo do painel
  add(k.add([
    k.rect(250 * SC, 174 * SC, { radius: 13 * SC }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(32, 8, 52),
    k.z(102),
  ]));

  // Título
  add(k.add([
    k.text("PAUSE", { size: fs(14), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 - 56 * SC),
    k.anchor("center"),
    k.color(210, 185, 255),
    k.z(103),
  ]));

  // Botão Continuar (verde)
  const continueBtn = add(k.add([
    k.rect(210 * SC, 40 * SC, { radius: 8 * SC }),
    k.pos(SW / 2, SH / 2 + 4 * SC),
    k.anchor("center"),
    k.color(45, 160, 65),
    k.area(),
    k.z(103),
  ]));
  add(k.add([
    k.text("Continuar", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 4 * SC),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(104),
  ]));

  continueBtn.onHover(() => { continueBtn.color = k.rgb(65, 190, 85); });
  continueBtn.onHoverEnd(() => { continueBtn.color = k.rgb(45, 160, 65); });
  continueBtn.onClick(() => {
    objs.forEach(o => o.destroy());
    onResume();
  });

  // Botão Sair (vermelho)
  const exitBtn = add(k.add([
    k.rect(210 * SC, 40 * SC, { radius: 8 * SC }),
    k.pos(SW / 2, SH / 2 + 57 * SC),
    k.anchor("center"),
    k.color(185, 42, 52),
    k.area(),
    k.z(103),
  ]));
  add(k.add([
    k.text("Sair ao Menu", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 57 * SC),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(104),
  ]));

  exitBtn.onHover(() => { exitBtn.color = k.rgb(215, 60, 72); });
  exitBtn.onHoverEnd(() => { exitBtn.color = k.rgb(185, 42, 52); });
  exitBtn.onClick(() => { k.go("menu"); });

  return () => objs.forEach(o => o.destroy());
}

// ── Cena: MENU ───────────────────────────────────────────────────────────
k.scene("menu", () => {
  const TILE  = 16;
  const SCALE = 2;
  const TSIZE = TILE * SCALE;
  const COLS  = Math.ceil(SW / TSIZE) + 1;
  const ROWS  = Math.ceil(SH / TSIZE) + 1;

  // Fundo de grama e flores
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isFlower = Math.random() < 0.15;
      k.add([
        k.sprite(isFlower ? "flower" : "grass"),
        k.pos(col * TSIZE, row * TSIZE),
        k.scale(SCALE),
        k.z(0),
      ]);
    }
  }

  // Borboletas decorativas nos cantos
  const cornerSpawns = [
    { x: 40,      y: 40       },
    { x: SW - 40, y: 40       },
    { x: 40,      y: SH - 40  },
    { x: SW - 40, y: SH - 40  },
    { x: SW / 2,  y: 20       },
  ];
  cornerSpawns.forEach(({ x, y }) => {
    const spd = k.rand(18, 32);
    const dir = x < SW / 2 ? 1 : -1;
    const bt  = k.add([
      k.sprite("butterfly", { anim: "fly" }),
      k.pos(x, y),
      k.scale(1.6),
      k.z(1),
      { spd, dir, ox: x },
    ]);
    bt.onUpdate(() => {
      bt.move(bt.spd * bt.dir, Math.sin(k.time() * 2 + bt.ox * 0.01) * 14);
      if (bt.pos.x > SW + 24) bt.pos.x = -24;
      if (bt.pos.x < -24)     bt.pos.x = SW + 24;
      if (bt.pos.y > SH + 24) bt.pos.y = -24;
      if (bt.pos.y < -24)     bt.pos.y = SH + 24;
    });
  });

  // Borda do painel (rosa mais escuro)
  k.add([
    k.rect(SW * 0.62, SH * 0.82, { radius: 18 }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(240, 110, 160),
    k.opacity(0.97),
    k.z(4),
  ]);

  // Painel rosado
  k.add([
    k.rect(SW * 0.60, SH * 0.80, { radius: 15 }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(255, 215, 232),
    k.opacity(0.93),
    k.z(5),
  ]);

  // Título principal
  k.add([
    k.text("Momoris\nGigica", { size: fs(22), font: "pressstart2p", align: "center", width: SW * 0.55 }),
    k.pos(SW / 2, SH * 0.22),
    k.anchor("center"),
    k.color(170, 28, 88),
    k.z(6),
  ]);

  // Subtítulo
  k.add([
    k.text("4 anos de amor", { size: fs(8), font: "pressstart2p", align: "center", width: SW * 0.55 }),
    k.pos(SW / 2, SH * 0.40),
    k.anchor("center"),
    k.color(205, 65, 125),
    k.z(6),
  ]);

  // Botão Iniciar
  const startBtn = k.add([
    k.rect(SW * 0.44, SH * 0.11, { radius: 10 }),
    k.pos(SW / 2, SH * 0.52),
    k.anchor("center"),
    k.color(250, 115, 162),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("Iniciar", { size: fs(12), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH * 0.52),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);

  startBtn.onHover(() => {
    startBtn.color = k.rgb(255, 75, 130);
    document.body.style.cursor = "pointer";
  });
  startBtn.onHoverEnd(() => {
    startBtn.color = k.rgb(250, 115, 162);
    document.body.style.cursor = "default";
  });
  startBtn.onClick(() => { k.go("abertura"); });

  // Botão Selecionar Fase
  const faseBtn = k.add([
    k.rect(SW * 0.44, SH * 0.10, { radius: 10 }),
    k.pos(SW / 2, SH * 0.65),
    k.anchor("center"),
    k.color(250, 155, 80),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("Selecionar Fase", { size: fs(8), font: "pressstart2p", align: "center", width: SW * 0.40 }),
    k.pos(SW / 2, SH * 0.65),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);
  faseBtn.onHover(() => {
    faseBtn.color = k.rgb(255, 175, 60);
    document.body.style.cursor = "pointer";
  });
  faseBtn.onHoverEnd(() => {
    faseBtn.color = k.rgb(250, 155, 80);
    document.body.style.cursor = "default";
  });
  faseBtn.onClick(() => { k.go("selecionar_fase"); });

  // Botão Selecionar Controles
  const ctrlBtn = k.add([
    k.rect(SW * 0.44, SH * 0.09, { radius: 10 }),
    k.pos(SW / 2, SH * 0.77),
    k.anchor("center"),
    k.color(120, 58, 185),
    k.area(),
    k.z(6),
  ]);
  const ctrlLabel = k.add([
    k.text(
      controlMode === "joystick" ? "Controles: Joystick" : "Controles: Teclado",
      { size: fs(7), font: "pressstart2p", align: "center", width: SW * 0.40 }
    ),
    k.pos(SW / 2, SH * 0.77),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);
  ctrlBtn.onHover(() => {
    ctrlBtn.color = k.rgb(148, 78, 215);
    document.body.style.cursor = "pointer";
  });
  ctrlBtn.onHoverEnd(() => {
    ctrlBtn.color = k.rgb(120, 58, 185);
    document.body.style.cursor = "default";
  });
  ctrlBtn.onClick(() => {
    controlMode = controlMode === "keyboard" ? "joystick" : "keyboard";
    ctrlLabel.text = controlMode === "joystick" ? "Controles: Joystick" : "Controles: Teclado";
  });
});

// ── Cena: ABERTURA (jogo principal) ──────────────────────────────────────
k.scene("abertura", () => {
  const TILE     = 16;
  const SCALE    = 2;
  const TSIZE    = TILE * SCALE;
  const MAP_COLS = Math.max(40, Math.ceil(SW / TSIZE) + 4);
  const MAP_ROWS = Math.max(40, Math.ceil(SH / TSIZE) + 4);
  const MAP_W    = MAP_COLS * TSIZE;
  const MAP_H    = MAP_ROWS * TSIZE;
  const SPEED    = 180;
  const MARGIN   = 16;

  const world = k.add([k.pos(0, 0)]);

  // Grama e flores
  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      const isFlower = Math.random() < 0.12;
      world.add([
        k.sprite(isFlower ? "flower" : "grass"),
        k.pos(col * TSIZE, row * TSIZE),
        k.scale(SCALE),
        k.z(0),
      ]);
    }
  }

  const START_X = MAP_W / 2;
  const START_Y = MAP_H / 2;

  const gigi = world.add([
    k.sprite("gigi", { anim: "idle-down" }),
    k.pos(START_X, START_Y),
    k.anchor("center"),
    k.scale(2.2),
    k.z(2),
  ]);

  // Câmera inicializada na posição correta
  world.pos.x = Math.min(0, Math.max(SW - MAP_W, SW / 2 - START_X));
  world.pos.y = Math.min(0, Math.max(SH - MAP_H, SH / 2 - START_Y));

  // Árvores espalhadas
  const NUM_TREES_AB = 28;
  const MIN_TREE_DIST_AB = TSIZE * 4;
  const treePositionsAB = [];
  let treeAttemptsAB = 0;
  while (treePositionsAB.length < NUM_TREES_AB && treeAttemptsAB < 5000) {
    treeAttemptsAB++;
    const tx = Math.floor(k.rand(2, MAP_COLS - 2)) * TSIZE;
    const ty = Math.floor(k.rand(2, MAP_ROWS - 2)) * TSIZE;
    if (Math.hypot(tx - MAP_W / 2, ty - MAP_H / 2) < TSIZE * 6) continue;
    let ok = true;
    for (const p of treePositionsAB) {
      if (Math.hypot(tx - p.x, ty - p.y) < MIN_TREE_DIST_AB) { ok = false; break; }
    }
    if (!ok) continue;
    treePositionsAB.push({ x: tx, y: ty });
  }
  treePositionsAB.forEach(({ x, y }) => {
    world.add([
      k.sprite("tree", { anim: "sway" }),
      k.pos(x, y), k.anchor("bot"), k.scale(8), k.z(3),
    ]);
  });

  // Pássaros espalhados por todo o mapa
  for (let i = 0; i < 10; i++) {
    const bx  = k.rand(100, MAP_W - 100);
    const by  = k.rand(100, MAP_H - 100);
    const spd = k.rand(50, 90);
    const b   = world.add([
      k.sprite("bird", { anim: "fly" }),
      k.pos(bx, by), k.scale(2), k.z(4), { spd },
    ]);
    b.onUpdate(() => {
      b.move(b.spd, 0);
      if (b.pos.x > MAP_W) b.pos.x = 0;
    });
  }

  // Borboletas espalhadas por todo o mapa
  for (let i = 0; i < 14; i++) {
    const bx  = k.rand(0, MAP_W);
    const by  = k.rand(100, MAP_H - 100);
    const spd = k.rand(25, 50);
    const dir = Math.random() < 0.5 ? 1 : -1;
    const bt  = world.add([
      k.sprite("butterfly", { anim: "fly" }),
      k.pos(bx, by), k.scale(2), k.z(4), { spd, dir },
    ]);
    bt.onUpdate(() => {
      bt.move(bt.spd * bt.dir, Math.sin(k.time() * 2 + bx * 0.01) * 18);
      if (bt.pos.x > MAP_W) bt.pos.x = 0;
      if (bt.pos.x < 0)     bt.pos.x = MAP_W;
    });
  }

  // ── Textos da história ───────────────────────────────────────────────
  const textPositions = [
    { x: SW / 2, y: 34 * SC       },   // topo
    { x: SW / 2, y: SH - 52 * SC  },   // base
    { x: SW / 2, y: 34 * SC       },   // topo
    { x: SW / 2, y: SH - 52 * SC  },   // base
    { x: SW / 2, y: 34 * SC       },   // topo
    { x: SW / 2, y: SH - 52 * SC  },   // base
    { x: SW / 2, y: SH / 2        },   // centro
  ];

  const textBg = k.add([
    k.rect(400 * SC, 60 * SC, { radius: 12 * SC }),
    k.pos(SW / 2, 34 * SC),
    k.anchor("center"),
    k.color(18, 4, 32),
    k.opacity(0),
    k.z(18),
  ]);

  const textLabel = k.add([
    k.text("", { size: fs(18), align: "center", width: 370 * SC }),
    k.pos(SW / 2, 34 * SC),
    k.anchor("center"),
    k.color(255, 235, 255),
    k.opacity(0),
    k.z(20),
  ]);

  let msgVer = 0;

  messages.forEach((msg, i) => {
    k.wait(msg.time, () => {
      const ver = ++msgVer;
      const p   = textPositions[i];

      textLabel.text    = msg.text;
      textLabel.pos.x   = p.x;
      textLabel.pos.y   = p.y;
      textBg.pos.x      = p.x;
      textBg.pos.y      = p.y;
      textLabel.opacity = 0;
      textBg.opacity    = 0;

      k.tween(0, 1, 0.8, (v) => {
        if (msgVer !== ver) return;
        textLabel.opacity = v;
        textBg.opacity    = v * 0.82;
      });

      k.wait(5.8, () => {
        if (msgVer !== ver) return;
        k.tween(1, 0, 0.8, (v) => {
          if (msgVer !== ver) return;
          textLabel.opacity = v;
          textBg.opacity    = v * 0.82;
        });
      });
    });
  });

  // Transição para missao1 após os textos da história terminarem
  k.wait(57, () => { k.go("missao1"); });

  // ── Pause ────────────────────────────────────────────────────────────
  let paused       = false;
  let destroyPause = null;
  const joystick   = controlMode === "joystick" ? makeVirtualJoystick(() => paused) : null;

  k.onKeyPress("escape", () => {
    if (paused) {
      if (destroyPause) { destroyPause(); destroyPause = null; }
      paused = false;
    } else {
      paused = true;
      destroyPause = makePauseOverlay(() => {
        paused       = false;
        destroyPause = null;
        document.body.style.cursor = "default";
      });
    }
  });

  // ── Controles ────────────────────────────────────────────────────────
  let lastFace = "down";

  k.onKeyDown("left",  () => { if (paused) return; gigi.move(-SPEED, 0); gigi.play("walk-left");  lastFace = "left";  });
  k.onKeyDown("right", () => { if (paused) return; gigi.move( SPEED, 0); gigi.play("walk-right"); lastFace = "right"; });
  k.onKeyDown("up",    () => { if (paused) return; gigi.move(0, -SPEED); gigi.play("walk-up");    lastFace = "up";    });
  k.onKeyDown("down",  () => { if (paused) return; gigi.move(0,  SPEED); gigi.play("walk-down");  lastFace = "down";  });

  k.onKeyRelease(() => {
    if (!k.isKeyDown("left") && !k.isKeyDown("right") &&
        !k.isKeyDown("up")   && !k.isKeyDown("down")) {
      gigi.play(`idle-${lastFace}`);
    }
  });

  k.onUpdate(() => {
    if (paused) return;

    // Joystick virtual
    if (joystick) {
      joystick.tick();
      if (joystick.isActive()) {
        const { x: jx, y: jy } = joystick.getDir();
        if (Math.abs(jx) > 0.15 || Math.abs(jy) > 0.15) {
          gigi.move(jx * SPEED, jy * SPEED);
          if (Math.abs(jx) >= Math.abs(jy)) {
            gigi.play(jx > 0 ? "walk-right" : "walk-left");
            lastFace = jx > 0 ? "right" : "left";
          } else {
            gigi.play(jy > 0 ? "walk-down" : "walk-up");
            lastFace = jy > 0 ? "down" : "up";
          }
        } else {
          gigi.play("idle-" + lastFace);
        }
      }
    }

    // Limita dentro do mapa
    gigi.pos.x = Math.max(MARGIN, Math.min(MAP_W - MARGIN, gigi.pos.x));
    gigi.pos.y = Math.max(MARGIN, Math.min(MAP_H - MARGIN, gigi.pos.y));

    // Câmera suave
    const targetX = Math.min(0, Math.max(SW - MAP_W, SW / 2 - gigi.pos.x));
    const targetY = Math.min(0, Math.max(SH - MAP_H, SH / 2 - gigi.pos.y));
    world.pos.x = k.lerp(world.pos.x, targetX, 8 * k.dt());
    world.pos.y = k.lerp(world.pos.y, targetY, 8 * k.dt());
  });
});

// ── Cena: MISSÃO 1 ───────────────────────────────────────────────────────
k.scene("missao1", () => {
  const TILE     = 16;
  const SCALE    = 2;
  const TSIZE    = TILE * SCALE;
  const MAP_COLS = Math.max(40, Math.ceil(SW / TSIZE) + 4);
  const MAP_ROWS = Math.max(40, Math.ceil(SH / TSIZE) + 4);
  const MAP_W    = MAP_COLS * TSIZE;
  const MAP_H    = MAP_ROWS * TSIZE;
  const SPEED    = 180;
  const MARGIN   = 16;

  // ── Estado ───────────────────────────────────────────────────────────
  let gameInputBlocked = true;
  let paused           = false;
  let destroyPause     = null;
  let dialogActive     = false;
  let dialogIndex      = 0;
  let currentFullText  = "";
  let currentCharIdx   = 0;
  let typingDone       = false;
  let typingHandle     = null;
  let arrowVisible     = false;
  let arrowTimer       = 0;
  let completionMode   = false;
  let floresColetadas  = 0;
  const flowerObjects  = [];

  // ── Joystick virtual ─────────────────────────────────────────────────
  const joystick = controlMode === "joystick"
    ? makeVirtualJoystick(() => gameInputBlocked || paused)
    : null;
  if (joystick) joystick.hide(); // visível só após os diálogos

  // ── Mundo ────────────────────────────────────────────────────────────
  const world = k.add([k.pos(0, 0)]);

  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      world.add([
        k.sprite(Math.random() < 0.08 ? "flower" : "grass"),
        k.pos(col * TSIZE, row * TSIZE),
        k.scale(SCALE),
        k.z(0),
      ]);
    }
  }

  const START_X = MAP_W / 2;
  const START_Y = MAP_H / 2;

  world.pos.x = Math.min(0, Math.max(SW - MAP_W, SW / 2 - START_X));
  world.pos.y = Math.min(0, Math.max(SH - MAP_H, SH / 2 - START_Y));

  // ── Gigi ─────────────────────────────────────────────────────────────
  const gigi = world.add([
    k.sprite("gigi", { anim: "idle-down" }),
    k.pos(START_X, START_Y),
    k.anchor("center"),
    k.scale(2.2),
    k.z(2),
  ]);

  // ── Árvores espalhadas ────────────────────────────────────────────────
  const NUM_TREES = 32;
  const MIN_TREE_DIST = TSIZE * 4;
  const treePositions = [];
  let treeAttempts = 0;
  while (treePositions.length < NUM_TREES && treeAttempts < 5000) {
    treeAttempts++;
    const tx = Math.floor(k.rand(2, MAP_COLS - 2)) * TSIZE;
    const ty = Math.floor(k.rand(2, MAP_ROWS - 2)) * TSIZE;
    const distCenter = Math.hypot(tx - START_X, ty - START_Y);
    if (distCenter < TSIZE * 6) continue;
    let ok = true;
    for (const p of treePositions) {
      if (Math.hypot(tx - p.x, ty - p.y) < MIN_TREE_DIST) { ok = false; break; }
    }
    if (!ok) continue;
    treePositions.push({ x: tx, y: ty });
  }
  treePositions.forEach(({ x, y }) => {
    world.add([
      k.sprite("tree", { anim: "sway" }),
      k.pos(x, y), k.anchor("bot"), k.scale(8), k.z(3),
    ]);
  });

  // ── Animais ──────────────────────────────────────────────────────────
  for (let i = 0; i < 10; i++) {
    const bx  = k.rand(100, MAP_W - 100);
    const by  = k.rand(100, MAP_H - 100);
    const spd = k.rand(50, 90);
    const b   = world.add([
      k.sprite("bird", { anim: "fly" }),
      k.pos(bx, by), k.scale(2), k.z(4), { spd },
    ]);
    b.onUpdate(() => { b.move(b.spd, 0); if (b.pos.x > MAP_W) b.pos.x = 0; });
  }

  for (let i = 0; i < 14; i++) {
    const bx  = k.rand(0, MAP_W);
    const by  = k.rand(100, MAP_H - 100);
    const spd = k.rand(25, 50);
    const dir = Math.random() < 0.5 ? 1 : -1;
    const bt  = world.add([
      k.sprite("butterfly", { anim: "fly" }),
      k.pos(bx, by), k.scale(2), k.z(4), { spd, dir },
    ]);
    bt.onUpdate(() => {
      bt.move(bt.spd * bt.dir, Math.sin(k.time() * 2 + bx * 0.01) * 18);
      if (bt.pos.x > MAP_W) bt.pos.x = 0;
      if (bt.pos.x < 0)     bt.pos.x = MAP_W;
    });
  }

  // ── Áudio (Web Audio API) ─────────────────────────────────────────────
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function playTypingSound() {
    try {
      const ctx  = getAudioCtx();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800 + Math.random() * 400;
      osc.type = "square";
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  function playCollectSound() {
    try {
      const ctx  = getAudioCtx();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  // ── HUD flores ───────────────────────────────────────────────────────
  const hudShadow = k.add([
    k.text("\u{1F338} 0/10", { size: fs(10), font: "pressstart2p" }),
    k.pos(10 * SC, 10 * SC), k.color(0, 0, 0), k.opacity(0.7), k.z(19), k.fixed(),
  ]);
  const hudLabel = k.add([
    k.text("\u{1F338} 0/10", { size: fs(10), font: "pressstart2p" }),
    k.pos(8 * SC, 8 * SC), k.color(255, 255, 255), k.z(20), k.fixed(),
  ]);
  hudLabel.hidden  = true;
  hudShadow.hidden = true;

  function updateHUD() {
    hudLabel.text  = `\u{1F338} ${floresColetadas}/10`;
    hudShadow.text = `\u{1F338} ${floresColetadas}/10`;
  }

  // ── Texto objetivo ────────────────────────────────────────────────────
  const missionObjShadow = k.add([
    k.text("\u{1F338} Colete flores.", { size: fs(10), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH - 16 * SC),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(19), k.fixed(),
  ]);
  const missionObj = k.add([
    k.text("\u{1F338} Colete flores.", { size: fs(10), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH - 18 * SC),
    k.anchor("center"), k.color(255, 215, 0), k.opacity(0), k.z(20), k.fixed(),
  ]);

  // ── Overlay de fade ───────────────────────────────────────────────────
  const fadeOverlay = k.add([
    k.rect(SW, SH), k.pos(0, 0),
    k.color(0, 0, 0), k.opacity(0), k.z(50), k.fixed(),
  ]);

  // ── Caixa de diálogo ─────────────────────────────────────────────────
  const DW = 440 * SC;
  const DH = 90 * SC;
  const DY = SH - DH / 2 - 10 * SC;

  const dialogBorder = k.add([
    k.rect(DW + 4 * SC, DH + 4 * SC, { radius: 12 * SC }),
    k.pos(SW / 2, DY), k.anchor("center"),
    k.color(255, 105, 180), k.opacity(0.92), k.z(29), k.fixed(),
  ]);
  const dialogBg = k.add([
    k.rect(DW, DH, { radius: 10 * SC }),
    k.pos(SW / 2, DY), k.anchor("center"),
    k.color(18, 4, 32), k.opacity(0.9), k.z(30), k.fixed(),
  ]);
  const dialogName = k.add([
    k.text("Giovanna", { size: fs(9), font: "pressstart2p" }),
    k.pos(SW / 2 - DW / 2 + 12 * SC, DY - DH / 2 + 10 * SC),
    k.color(255, 105, 180), k.z(31), k.fixed(),
  ]);
  const dialogText = k.add([
    k.text("", { size: fs(8), font: "pressstart2p", width: DW - 24 * SC, align: "left" }),
    k.pos(SW / 2 - DW / 2 + 12 * SC, DY - DH / 2 + 26 * SC),
    k.color(255, 245, 255), k.z(31), k.fixed(),
  ]);
  const dialogArrow = k.add([
    k.text("▼", { size: fs(8), font: "pressstart2p" }),
    k.pos(SW / 2 + DW / 2 - 18 * SC, DY + DH / 2 - 14 * SC),
    k.color(255, 255, 255), k.opacity(0), k.z(31), k.fixed(),
  ]);

  function setDialogVisible(v) {
    dialogBorder.hidden = !v;
    dialogBg.hidden     = !v;
    dialogName.hidden   = !v;
    dialogText.hidden   = !v;
    dialogArrow.hidden  = !v;
    dialogActive        = v;
  }
  setDialogVisible(false);

  // ── Sistema de digitação ──────────────────────────────────────────────
  function typeText(fullText) {
    currentFullText     = fullText;
    currentCharIdx      = 0;
    typingDone          = false;
    arrowVisible        = false;
    arrowTimer          = 0;
    dialogArrow.opacity = 0;
    dialogText.text     = "";

    function step() {
      if (currentCharIdx >= fullText.length) {
        typingDone   = true;
        arrowVisible = true;
        return;
      }
      dialogText.text = fullText.slice(0, currentCharIdx + 1);
      playTypingSound();
      currentCharIdx++;
      typingHandle = k.wait(0.03, step);
    }
    step();
  }

  const normalTexts = [
    "Aiai, mais um dia...",
    "Estou triste...",
    "Meu sonho era ganhar um buquê de flores lindas e um anel.",
    "Ninguém pode me dar...",
    "Mas tudo bem, esse campo está cheio de flores lindas.",
  ];
  const completionText = "Que flores lindas!";

  function advanceDialog() {
    if (!dialogActive) return;
    if (!typingDone) {
      if (typingHandle) { typingHandle.cancel(); typingHandle = null; }
      dialogText.text     = currentFullText;
      typingDone          = true;
      arrowVisible        = true;
      return;
    }
    arrowVisible        = false;
    arrowTimer          = 0;
    dialogArrow.opacity = 0;

    if (completionMode) {
      setDialogVisible(false);
      k.tween(0, 1, 1.5, v => { fadeOverlay.opacity = v; });
      k.wait(1.6, () => { k.go("menu"); });
      return;
    }

    dialogIndex++;
    if (dialogIndex >= normalTexts.length) {
      setDialogVisible(false);
      k.tween(0, 1, 0.5, v => {
        missionObj.opacity       = v;
        missionObjShadow.opacity = v * 0.6;
      });
      hudLabel.hidden  = false;
      hudShadow.hidden = false;
      if (joystick) joystick.show();
      spawnFlowers();
      gameInputBlocked = false;
    } else {
      typeText(normalTexts[dialogIndex]);
    }
  }

  // ── Flores coletáveis ─────────────────────────────────────────────────
  function spawnFlowers() {
    const MIN_DIST  = 3 * TSIZE;
    const MIN_CTR   = 5 * TSIZE;
    const positions = [];
    let   attempts  = 0;

    while (positions.length < 10 && attempts < 3000) {
      attempts++;
      const fx = k.rand(TSIZE * 3, MAP_W - TSIZE * 3);
      const fy = k.rand(TSIZE * 3, MAP_H - TSIZE * 3);
      if (Math.hypot(fx - START_X, fy - START_Y) < MIN_CTR) continue;
      let ok = true;
      for (const p of positions) {
        if (Math.hypot(fx - p.x, fy - p.y) < MIN_DIST) { ok = false; break; }
      }
      if (!ok) continue;
      positions.push({ x: fx, y: fy });
    }

    for (const p of positions) {
      const f = world.add([
        k.sprite("flower"),
        k.pos(p.x, p.y),
        k.anchor("center"),
        k.scale(2),
        k.z(1),
      ]);
      f._collected = false;
      flowerObjects.push(f);
    }
  }

  function collectFlower(f) {
    f._collected = true;
    playCollectSound();
    floresColetadas++;
    updateHUD();

    k.tween(2, 3.4, 0.08, v => { f.scale.x = v; f.scale.y = v; });
    k.wait(0.09, () => {
      k.tween(3.4, 0, 0.12, v => { f.scale.x = v; f.scale.y = v; });
      k.wait(0.13, () => { f.destroy(); });
    });

    if (floresColetadas >= 10) {
      gameInputBlocked = true;
      if (joystick) joystick.hide();
      k.wait(0.4, () => { k.go("celebracao1"); });
    }
  }

  // ── Controles ─────────────────────────────────────────────────────────
  let lastFace = "down";

  k.onKeyDown("left",  () => { if (gameInputBlocked || paused) return; gigi.move(-SPEED, 0); gigi.play("walk-left");  lastFace = "left";  });
  k.onKeyDown("right", () => { if (gameInputBlocked || paused) return; gigi.move( SPEED, 0); gigi.play("walk-right"); lastFace = "right"; });
  k.onKeyDown("up",    () => { if (gameInputBlocked || paused) return; gigi.move(0, -SPEED); gigi.play("walk-up");    lastFace = "up";    });
  k.onKeyDown("down",  () => { if (gameInputBlocked || paused) return; gigi.move(0,  SPEED); gigi.play("walk-down");  lastFace = "down";  });

  k.onKeyRelease(() => {
    if (!k.isKeyDown("left") && !k.isKeyDown("right") &&
        !k.isKeyDown("up")   && !k.isKeyDown("down")) {
      gigi.play(`idle-${lastFace}`);
    }
  });

  k.onKeyPress("space",  () => { advanceDialog(); });
  k.onKeyPress("return", () => { advanceDialog(); });
  k.onClick(() => { advanceDialog(); });

  k.onKeyPress("escape", () => {
    if (paused) {
      if (destroyPause) { destroyPause(); destroyPause = null; }
      paused = false;
    } else {
      paused = true;
      destroyPause = makePauseOverlay(() => {
        paused = false; destroyPause = null;
        document.body.style.cursor = "default";
      });
    }
  });

  // ── Loop de atualização ───────────────────────────────────────────────
  k.onUpdate(() => {
    if (paused) return;

    if (arrowVisible) {
      arrowTimer += k.dt();
      dialogArrow.opacity = Math.sin(arrowTimer * 6) > 0 ? 1 : 0;
    }

    if (!gameInputBlocked) {
      // Joystick virtual
      if (joystick) {
        joystick.tick();
        if (joystick.isActive()) {
          const { x: jx, y: jy } = joystick.getDir();
          if (Math.abs(jx) > 0.15 || Math.abs(jy) > 0.15) {
            gigi.move(jx * SPEED, jy * SPEED);
            if (Math.abs(jx) >= Math.abs(jy)) {
              gigi.play(jx > 0 ? "walk-right" : "walk-left");
              lastFace = jx > 0 ? "right" : "left";
            } else {
              gigi.play(jy > 0 ? "walk-down" : "walk-up");
              lastFace = jy > 0 ? "down" : "up";
            }
          } else if (!k.isKeyDown("left") && !k.isKeyDown("right") &&
                     !k.isKeyDown("up")   && !k.isKeyDown("down")) {
            gigi.play("idle-" + lastFace);
          }
        }
      }

      gigi.pos.x = Math.max(MARGIN, Math.min(MAP_W - MARGIN, gigi.pos.x));
      gigi.pos.y = Math.max(MARGIN, Math.min(MAP_H - MARGIN, gigi.pos.y));

      for (const f of flowerObjects) {
        if (f._collected) continue;
        if (gigi.pos.dist(f.pos) < 26) collectFlower(f);
      }
    }

    const tx = Math.min(0, Math.max(SW - MAP_W, SW / 2 - gigi.pos.x));
    const ty = Math.min(0, Math.max(SH - MAP_H, SH / 2 - gigi.pos.y));
    world.pos.x = k.lerp(world.pos.x, tx, 8 * k.dt());
    world.pos.y = k.lerp(world.pos.y, ty, 8 * k.dt());
  });

  // ── Sequência inicial: título → diálogo ──────────────────────────────
  const titleShadow = k.add([
    k.text("Missão 1: Introdução", { size: fs(16), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(39), k.fixed(),
  ]);
  const titleLabel = k.add([
    k.text("Missão 1: Introdução", { size: fs(16), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"), k.color(255, 255, 255), k.opacity(0), k.z(40), k.fixed(),
  ]);

  k.tween(0, 1, 0.6, v => { titleLabel.opacity = v; titleShadow.opacity = v * 0.6; });
  k.wait(2.4, () => {
    k.tween(1, 0, 0.6, v => { titleLabel.opacity = v; titleShadow.opacity = v * 0.6; });
    k.wait(0.65, () => {
      titleLabel.destroy();
      titleShadow.destroy();
      dialogIndex = 0;
      setDialogVisible(true);
      typeText(normalTexts[0]);
    });
  });
});

// ── Cena: CELEBRAÇÃO 1 ───────────────────────────────────────────────────
k.scene("celebracao1", () => {
  // Fundo rosa claro cobrindo toda a tela
  k.add([
    k.rect(SW + 4, SH + 4),
    k.pos(-2, -2),
    k.color(255, 220, 235),
    k.z(0),
    k.fixed(),
  ]);

  // ── Som de celebração ─────────────────────────────────────────────────
  try {
    const ctx   = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.17;
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t);
      osc.stop(t + 0.15);
    });
  } catch (e) {}

  // ── Partículas caindo ─────────────────────────────────────────────────
  const particleEmojis = ["\u{1F338}", "\u{1F495}", "\u{1F338}", "\u{1F495}", "✨"];
  k.loop(0.28, () => {
    const emoji = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
    const size  = k.rand(12, 20) * SC;
    const px    = k.rand(10, SW - 10);
    const spd   = k.rand(60, 120);
    const p     = k.add([
      k.text(emoji, { size }),
      k.pos(px, -22),
      k.z(3),
      k.fixed(),
      { spd },
    ]);
    p.onUpdate(() => {
      p.pos.y += p.spd * k.dt();
      if (p.pos.y > SH + 22) p.destroy();
    });
  });

  // ── Buquê centralizado ────────────────────────────────────────────────
  const bouquet = k.add([
    k.sprite("bouquet", { anim: "sway" }),
    k.pos(SW / 2, SH / 2 + 10),
    k.anchor("center"),
    k.scale(0),
    k.z(5),
    k.fixed(),
  ]);
  k.tween(0, 16, 2, v => { bouquet.scale.x = v; bouquet.scale.y = v; });

  // ── Título ────────────────────────────────────────────────────────────
  const titleShadow = k.add([
    k.text("Meu buquê ficou lindo!", { size: fs(12), font: "pressstart2p", align: "center", width: 420 * SC }),
    k.pos(SW / 2 + 2 * SC, 57 * SC),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(9), k.fixed(),
  ]);
  const titleLabel = k.add([
    k.text("Meu buquê ficou lindo!", { size: fs(12), font: "pressstart2p", align: "center", width: 420 * SC }),
    k.pos(SW / 2, 55 * SC),
    k.anchor("center"), k.color(204, 34, 119), k.opacity(0), k.z(10), k.fixed(),
  ]);
  k.wait(0.6, () => {
    k.tween(0, 1, 0.4, v => { titleLabel.opacity = v; titleShadow.opacity = v * 0.5; });
  });

  // ── Estatísticas ──────────────────────────────────────────────────────
  const statsLabel = k.add([
    k.text("\u{1F338} +10 flores coletadas", { size: fs(8), font: "pressstart2p", align: "center", width: 420 * SC }),
    k.pos(SW / 2, 248 * SC),
    k.anchor("center"), k.color(255, 110, 180), k.opacity(0), k.z(10), k.fixed(),
  ]);
  k.wait(1.2, () => {
    k.tween(0, 1, 0.4, v => { statsLabel.opacity = v; });
  });

  // ── Botão Próxima Fase ────────────────────────────────────────────────
  const nextBtn = k.add([
    k.rect(222 * SC, 40 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, 290 * SC),
    k.anchor("center"),
    k.color(250, 115, 162),
    k.opacity(0),
    k.area(),
    k.z(10),
    k.fixed(),
  ]);
  const nextLabel = k.add([
    k.text("► Próxima Fase", { size: fs(10), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, 290 * SC),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.opacity(0),
    k.z(11),
    k.fixed(),
  ]);
  k.wait(2.5, () => {
    k.tween(0, 1, 0.4, v => { nextBtn.opacity = v; nextLabel.opacity = v; });
    nextBtn.onHover(() => {
      nextBtn.color = k.rgb(255, 75, 130);
      document.body.style.cursor = "pointer";
    });
    nextBtn.onHoverEnd(() => {
      nextBtn.color = k.rgb(250, 115, 162);
      document.body.style.cursor = "default";
    });
    nextBtn.onClick(() => {
      document.body.style.cursor = "default";
      k.go("missao2");
    });
  });
});

// ── Cena: SELECIONAR FASE ────────────────────────────────────────────────
k.scene("selecionar_fase", () => {
  const TILE  = 16;
  const SCALE = 2;
  const TSIZE = TILE * SCALE;
  const COLS  = Math.ceil(SW / TSIZE) + 1;
  const ROWS  = Math.ceil(SH / TSIZE) + 1;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isFlower = Math.random() < 0.15;
      k.add([
        k.sprite(isFlower ? "flower" : "grass"),
        k.pos(col * TSIZE, row * TSIZE),
        k.scale(SCALE),
        k.z(0),
      ]);
    }
  }

  const cornerSpawns = [
    { x: 40,      y: 40      },
    { x: SW - 40, y: 40      },
    { x: 40,      y: SH - 40 },
    { x: SW - 40, y: SH - 40 },
  ];
  cornerSpawns.forEach(({ x, y }) => {
    const spd = k.rand(18, 32);
    const dir = x < SW / 2 ? 1 : -1;
    const bt  = k.add([
      k.sprite("butterfly", { anim: "fly" }),
      k.pos(x, y), k.scale(1.6), k.z(1),
      { spd, dir, ox: x },
    ]);
    bt.onUpdate(() => {
      bt.move(bt.spd * bt.dir, Math.sin(k.time() * 2 + bt.ox * 0.01) * 14);
      if (bt.pos.x > SW + 24) bt.pos.x = -24;
      if (bt.pos.x < -24)     bt.pos.x = SW + 24;
    });
  });

  // Borda do painel
  k.add([
    k.rect(280 * SC, 290 * SC, { radius: 18 * SC }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(240, 110, 160),
    k.opacity(0.97),
    k.z(4),
  ]);

  // Painel rosado
  k.add([
    k.rect(272 * SC, 282 * SC, { radius: 15 * SC }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(255, 215, 232),
    k.opacity(0.93),
    k.z(5),
  ]);

  // Título
  k.add([
    k.text("Selecionar\nFase", { size: fs(16), font: "pressstart2p", align: "center", width: 252 * SC }),
    k.pos(SW / 2, SH / 2 - 100 * SC),
    k.anchor("center"),
    k.color(170, 28, 88),
    k.z(6),
  ]);

  // Botão Fase 1
  const fase1Btn = k.add([
    k.rect(230 * SC, 44 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, SH / 2 - 28 * SC),
    k.anchor("center"),
    k.color(250, 115, 162),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("Fase 1: A Surpresa", { size: fs(8), font: "pressstart2p", align: "center", width: 215 * SC }),
    k.pos(SW / 2, SH / 2 - 28 * SC),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);
  fase1Btn.onHover(() => {
    fase1Btn.color = k.rgb(255, 75, 130);
    document.body.style.cursor = "pointer";
  });
  fase1Btn.onHoverEnd(() => {
    fase1Btn.color = k.rgb(250, 115, 162);
    document.body.style.cursor = "default";
  });
  fase1Btn.onClick(() => {
    document.body.style.cursor = "default";
    k.go("missao1");
  });

  // Botão Fase 2
  const fase2Btn = k.add([
    k.rect(230 * SC, 44 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, SH / 2 + 28 * SC),
    k.anchor("center"),
    k.color(100, 160, 255),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("Fase 2: O Campinho", { size: fs(8), font: "pressstart2p", align: "center", width: 215 * SC }),
    k.pos(SW / 2, SH / 2 + 28 * SC),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);
  fase2Btn.onHover(() => {
    fase2Btn.color = k.rgb(130, 190, 255);
    document.body.style.cursor = "pointer";
  });
  fase2Btn.onHoverEnd(() => {
    fase2Btn.color = k.rgb(100, 160, 255);
    document.body.style.cursor = "default";
  });
  fase2Btn.onClick(() => {
    document.body.style.cursor = "default";
    k.go("missao2");
  });

  // Botão Voltar
  const voltarBtn = k.add([
    k.rect(230 * SC, 36 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, SH / 2 + 100 * SC),
    k.anchor("center"),
    k.color(130, 130, 145),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("< Voltar", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 100 * SC),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);
  voltarBtn.onHover(() => {
    voltarBtn.color = k.rgb(160, 160, 175);
    document.body.style.cursor = "pointer";
  });
  voltarBtn.onHoverEnd(() => {
    voltarBtn.color = k.rgb(130, 130, 145);
    document.body.style.cursor = "default";
  });
  voltarBtn.onClick(() => {
    document.body.style.cursor = "default";
    k.go("menu");
  });
});

// ── Cena: MISSÃO 2 – O CAMPINHO ─────────────────────────────────────────
k.scene("missao2", () => {
  const TILE     = 16;
  const SCALE    = 2;
  const TSIZE    = TILE * SCALE;   // 32px por tile
  const MAP_COLS = 60;
  const MAP_ROWS = 40;
  const MAP_W    = MAP_COLS * TSIZE;  // 1920
  const MAP_H    = MAP_ROWS * TSIZE;  // 1280
  const SPEED    = 180;
  const MARGIN   = 20;
  const MID_COL  = MAP_COLS / 2;      // 30 — coluna divisória
  const MID_X    = MID_COL * TSIZE;   // 960 — divide campo / área de lazer

  // Campo de futebol em tiles (dentro da metade esquerda)
  // Limites em pixels no espaço do mundo
  const FL = 2 * TSIZE,  FR = 28 * TSIZE;   // col 2..28  → x 64..896
  const FT = 2 * TSIZE,  FB = 38 * TSIZE;   // row 2..38  → y 64..1216
  const GOAL_H    = 6 * TSIZE;               // 192px
  const GOAL_MID  = (FT + FB) / 2;
  const GT        = GOAL_MID - GOAL_H / 2;
  const GB        = GOAL_MID + GOAL_H / 2;
  const GOAL_DEPTH = 2 * TSIZE;              // 64px

  let goals           = 0;
  let goalLocked      = false;
  let paused          = false;
  let destroyPause    = null;
  let phase           = "playing";  // "playing" | "mid5" | "cutscene" | "exit"
  let lastFace        = "right";
  const ballVel       = { x: 0, y: 0 };
  let meetX           = 0;
  let meetY           = 0;
  let cutsceneStarted = false;
  let cutsceneReached = false;
  let exitTriggered   = false;

  // ── Introdução cinemática ────────────────────────────────────────────────
  let introFinished = false;

  const introOverlay = k.add([
    k.rect(SW, SH), k.pos(0, 0),
    k.color(0, 0, 0), k.opacity(1),
    k.z(90), k.fixed(),
  ]);

  const introText1 = k.add([
    k.text("4 de marco de 2022", { size: fs(14), font: "pressstart2p" }),
    k.pos(SW / 2, SH / 2 - 30 * SC),
    k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0),
    k.z(91), k.fixed(),
  ]);

  const introText2 = k.add([
    k.text("Associacao Atletica Caldense", { size: fs(10), font: "pressstart2p", width: 380 * SC, align: "center" }),
    k.pos(SW / 2, SH / 2 + 20 * SC),
    k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0),
    k.z(91), k.fixed(),
  ]);

  const introText3 = k.add([
    k.text("Vivi estava jogando futebol e", { size: fs(10), font: "pressstart2p", width: 380 * SC, align: "center" }),
    k.pos(SW / 2, SH / 2 - 20 * SC),
    k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0),
    k.z(91), k.fixed(),
  ]);

  const introText4 = k.add([
    k.text("Gigi estava passeando", { size: fs(10), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 20 * SC),
    k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0),
    k.z(91), k.fixed(),
  ]);

  k.wait(0,    () => k.tween(0, 1, 0.8, v => { introText1.opacity = v; }));
  k.wait(1.5,  () => k.tween(0, 1, 0.8, v => { introText2.opacity = v; }));
  k.wait(5.0,  () => {
    k.tween(1, 0, 0.6, v => { introText1.opacity = v; });
    k.tween(1, 0, 0.6, v => { introText2.opacity = v; });
  });
  k.wait(6.5,  () => k.tween(0, 1, 0.8, v => { introText3.opacity = v; }));
  k.wait(8.0,  () => k.tween(0, 1, 0.8, v => { introText4.opacity = v; }));
  k.wait(12.0, () => {
    k.tween(1, 0, 0.6, v => { introText3.opacity = v; });
    k.tween(1, 0, 0.6, v => { introText4.opacity = v; });
    k.tween(1, 0, 1.0, v => { introOverlay.opacity = v; });
  });
  k.wait(13.5, () => {
    if (introOverlay.exists()) introOverlay.destroy();
    if (introText1.exists())   introText1.destroy();
    if (introText2.exists())   introText2.destroy();
    if (introText3.exists())   introText3.destroy();
    if (introText4.exists())   introText4.destroy();
    introFinished = true;
  });

  // ── Joystick virtual ─────────────────────────────────────────────────────
  const joystick = controlMode === "joystick"
    ? makeVirtualJoystick(() => paused || phase !== "playing")
    : null;

  // ── Mundo ────────────────────────────────────────────────────────────────
  const world = k.add([k.pos(0, 0)]);

  // ── Tilemap com scenario_tiles ────────────────────────────────────────────
  // Campo (metade esquerda): frame 0 = grama do campo
  // Linha horizontal (meio vertical do campo): frame 1
  // Linha vertical (meio horizontal do campo): frame 2
  // Cruzamento dessas linhas: frame 3
  // Área de lazer (metade direita): frames 4/5 em xadrez
  // Piscina (bloco fixo na metade direita): frames 6/7 animados

  const MID_ROW   = Math.floor(MAP_ROWS / 2);  // 20
  const MID_FIELD_COL = Math.floor(MID_COL / 2);  // 15 — meio do campo

  // Cols e rows da piscina (em tiles, dentro da metade direita)
  const POOL_COL_START = MID_COL + 4;   // col 34
  const POOL_COL_END   = MID_COL + 10;  // col 40
  const POOL_ROW_START = 14;
  const POOL_ROW_END   = 20;

  const waterTiles = [];  // referências para animar

  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      const isRight = col >= MID_COL;
      const isPool  = isRight
        && col >= POOL_COL_START && col < POOL_COL_END
        && row >= POOL_ROW_START && row < POOL_ROW_END;

      let frame;
      if (isPool) {
        frame = (col + row) % 2 === 0 ? 6 : 7;
      } else if (!isRight) {
        // Campo de futebol
        const isMidRow = row === MID_ROW;
        const isMidCol = col === MID_FIELD_COL;
        if (isMidRow && isMidCol) frame = 3;
        else if (isMidRow)        frame = 1;
        else if (isMidCol)        frame = 2;
        else                      frame = 0;
      } else {
        // Área de lazer — xadrez bege
        frame = (col + row) % 2 === 0 ? 4 : 5;
      }

      const tile = world.add([
        k.sprite("scenario_tiles", { frame }),
        k.pos(col * TSIZE, row * TSIZE),
        k.scale(SCALE),
        k.z(0),
      ]);
      if (isPool) waterTiles.push(tile);
    }
  }

  // Anima tiles de água alternando frame 6/7 a cada 0.5s
  let waterFrame = 0;
  k.loop(0.5, () => {
    waterFrame = waterFrame === 0 ? 1 : 0;
    waterTiles.forEach(t => { t.frame = waterFrame === 0 ? 6 : 7; });
  });

  // ── Marcações do campo (rects sobre o tilemap) ────────────────────────────
  const addLine = (x, y, w, h) => world.add([
    k.rect(w, h), k.pos(x, y),
    k.color(255, 255, 255), k.opacity(0.45), k.z(1),
  ]);
  // Borda do campo
  addLine(FL, FT, FR - FL, 3);
  addLine(FL, FB, FR - FL, 3);
  addLine(FL, FT, 3, FB - FT);
  addLine(FR, FT, 3, FB - FT);

  // Gol esquerdo (vermelho – NPC defende a goleira de Vivi)
  world.add([k.rect(GOAL_DEPTH, GOAL_H), k.pos(FL - GOAL_DEPTH, GT), k.color(220, 60, 60), k.opacity(0.55), k.z(1)]);
  addLine(FL - GOAL_DEPTH, GT, GOAL_DEPTH, 3);
  addLine(FL - GOAL_DEPTH, GB, GOAL_DEPTH, 3);

  // Gol direito (azul – Vivi tenta marcar aqui)
  world.add([k.rect(GOAL_DEPTH, GOAL_H), k.pos(FR, GT), k.color(60, 90, 220), k.opacity(0.55), k.z(1)]);
  addLine(FR, GT, GOAL_DEPTH, 3);
  addLine(FR, GB, GOAL_DEPTH, 3);

  // Círculo central
  world.add([
    k.circle(3 * TSIZE), k.pos((FL + FR) / 2, GOAL_MID), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0.08), k.z(1),
  ]);

  // ── Bola ─────────────────────────────────────────────────────────────────
  const BALL_START_X = (FL + FR) / 2;
  const ball = world.add([
    k.sprite("ball"),
    k.pos(BALL_START_X, GOAL_MID),
    k.anchor("center"),
    k.scale(4),
    k.z(4),
  ]);
  ball.play("spin");

  // ── Player (Vivi) ─────────────────────────────────────────────────────────
  const START_X = FL + (FR - FL) * 0.25;
  const vivi = world.add([
    k.sprite("vivi"),
    k.pos(START_X, GOAL_MID),
    k.anchor("center"), k.scale(8), k.z(2),
  ]);
  vivi.play("idle-right");

  // ── NPC adversário ────────────────────────────────────────────────────────
  const npcMan = world.add([
    k.sprite("npc_man"),
    k.pos(FR - 4 * TSIZE, GOAL_MID),
    k.anchor("center"), k.scale(8), k.z(2),
  ]);
  npcMan.play("idle-left");
  let npcJitter = 0;

  // ── Gigi (passeando na área de lazer) ─────────────────────────────────────
  const POOL_WORLD_Y = POOL_ROW_START * TSIZE;
  const gigiNpc = world.add([
    k.sprite("gigi"),
    k.pos(MID_X + 8 * TSIZE, POOL_WORLD_Y - 2 * TSIZE),
    k.anchor("center"), k.scale(2.2), k.z(2),
  ]);
  gigiNpc.play("walk-right");
  let gigiDir = 1, gigiTimer = k.rand(2, 4);

  // ── NPC Woman (passeando na área de lazer) ────────────────────────────────
  // WATCH_POS_X: beira do campo (direita do campo) onde elas param para assistir
  const WATCH_POS_X = MID_X + TSIZE;
  let watchingField = false;
  const npcWoman = world.add([
    k.sprite("npc_woman"),
    k.pos(MID_X + 16 * TSIZE, POOL_WORLD_Y + 3 * TSIZE),
    k.anchor("center"), k.scale(8), k.z(2),
  ]);
  npcWoman.play("walk-left");
  let womanDir = -1, womanTimer = k.rand(2, 4);

  // Posição inicial da câmera
  world.pos.x = Math.min(0, Math.max(SW - MAP_W, SW / 2 - START_X));
  world.pos.y = Math.min(0, Math.max(SH - MAP_H, SH / 2 - GOAL_MID));

  // ── Fade overlay (cinemática final) ──────────────────────────────────────
  const fadeOverlay = k.add([
    k.rect(SW, SH), k.pos(0, 0),
    k.color(0, 0, 0), k.opacity(0),
    k.z(80), k.fixed(),
  ]);

  // ── Áudio ────────────────────────────────────────────────────────────────
  let audioCtx = null;
  const getAudioCtx = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  };
  function playGoalSound() {
    try {
      const ctx = getAudioCtx();
      [440, 550, 660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine"; osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.12;
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.start(t); osc.stop(t + 0.22);
      });
    } catch (e) {}
  }
  function playNpcGoalSound() {
    try {
      const ctx = getAudioCtx(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }
  function playWhistle() {
    try {
      const ctx = getAudioCtx(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  // ── HUD ─────────────────────────────────────────────────────────────────
  k.add([
    k.rect(168 * SC, 30 * SC, { radius: 6 * SC }),
    k.pos(8 * SC, 8 * SC),
    k.color(0, 0, 0), k.opacity(0.55), k.z(20), k.fixed(),
  ]);
  const hudShadow = k.add([
    k.text("Gols: 0/10", { size: fs(10), font: "pressstart2p" }),
    k.pos(13 * SC + 1, 15 * SC + 1),  
    k.color(0, 0, 0), k.opacity(0.7), k.z(20), k.fixed(),
  ]);
  const hudLabel = k.add([
    k.text("Gols: 0/10", { size: fs(10), font: "pressstart2p" }),
    k.pos(13 * SC, 15 * SC),
    k.color(255, 255, 255), k.z(21), k.fixed(),
  ]);
  function updateHUD() {
    hudLabel.text  = `Gols: ${goals}/10`;
    hudShadow.text = `Gols: ${goals}/10`;
  }

  // ── Texto objetivo ────────────────────────────────────────────────────────
  const missionObjShadow = k.add([
    k.text("Faça gols para impressionar ela", { size: fs(10), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH - 16 * SC),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(19), k.fixed(),
  ]);
  const missionObj = k.add([
    k.text("Faça gols para impressionar ela", { size: fs(10), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH - 18 * SC),
    k.anchor("center"), k.color(255, 215, 0), k.opacity(0), k.z(20), k.fixed(),
  ]);
  k.wait(13.5, () => k.tween(0, 1, 0.8, v => { missionObj.opacity = v; missionObjShadow.opacity = v; }));
  k.wait(17.5, () => k.tween(1, 0, 0.8, v => { missionObj.opacity = v; missionObjShadow.opacity = v; }));

  // ── Balão de fala ────────────────────────────────────────────────────────
  function showBubble(worldObj, text, duration) {
    const bg = k.add([
      k.rect(200 * SC, 40 * SC, { radius: 7 * SC }),
      k.pos(0, 0), k.anchor("center"),
      k.color(255, 255, 255), k.opacity(0.93), k.z(50), k.fixed(),
    ]);
    const txt = k.add([
      k.text(text, { size: fs(7), font: "pressstart2p", align: "center", width: 185 * SC }),
      k.pos(0, 0), k.anchor("center"),
      k.color(20, 20, 20), k.z(51), k.fixed(),
    ]);
    const tick = k.onUpdate(() => {
      if (!worldObj.exists()) return;
      const sx = worldObj.pos.x + world.pos.x;
      const sy = worldObj.pos.y + world.pos.y - 52 * SC;
      bg.pos.x  = sx; bg.pos.y  = sy;
      txt.pos.x = sx; txt.pos.y = sy;
    });
    k.wait(duration ?? 3, () => {
      tick.cancel();
      k.tween(0.93, 0, 0.3, v => { bg.opacity = v; txt.opacity = v; },
        () => { if (bg.exists()) bg.destroy(); if (txt.exists()) txt.destroy(); });
    });
  }

  // ── Reset bola e personagens ao centro ───────────────────────────────────
  function resetToCenter() {
    ball.pos.x  = BALL_START_X;
    ball.pos.y  = GOAL_MID;
    ballVel.x   = 0;
    ballVel.y   = 0;
    vivi.pos.x  = START_X;
    vivi.pos.y  = GOAL_MID;
    npcMan.pos.x = FR - 4 * TSIZE;
    npcMan.pos.y = GOAL_MID;
    vivi.play("idle-right");
    npcMan.play("idle-left");
  }

  // ── Gol marcado pelo Vivi (goleira direita) ───────────────────────────────
  function onViviGoal() {
    if (goalLocked) return;
    goalLocked = true;
    goals++;
    updateHUD();
    playWhistle();
    playGoalSound();
    showBubble(vivi, "GOL!", 2.5);

    if (goals >= 10) {
      phase           = "cutscene";
      cutsceneStarted = false;
      cutsceneReached = false;
      meetX           = gigiNpc.pos.x - 3 * TSIZE;
      meetY           = gigiNpc.pos.y;
      vivi.play("idle-right");
      // Delay de 1s para o som de gol terminar antes de Vivi começar a andar
      k.wait(1, () => { cutsceneStarted = true; });
    } else if (goals === 5) {
      phase = "mid5";
      watchingField = true;
      showBubble(gigiNpc, "Olha so que golaço!", 3);
      k.wait(0.9, () => { showBubble(npcWoman, "Vai, Vivi! ♥", 3); });
      k.wait(1, () => { resetToCenter(); });
      k.wait(4, () => { phase = "playing"; goalLocked = false; });
    } else {
      k.wait(1, () => { resetToCenter(); goalLocked = false; });
    }
  }

  // ── Gol marcado pelo NPC (goleira esquerda) ───────────────────────────────
  function onNpcGoal() {
    if (goalLocked) return;
    goalLocked = true;
    goals = Math.max(0, goals - 1);
    updateHUD();
    playWhistle();
    playNpcGoalSound();
    showBubble(npcMan, "Ponto pra mim!", 2.5);
    k.wait(1, () => { resetToCenter(); goalLocked = false; });
  }

  // ── Pause ────────────────────────────────────────────────────────────────
  k.onKeyPress("escape", () => {
    if (phase === "cutscene" || phase === "exit") return;
    if (paused) {
      if (destroyPause) { destroyPause(); destroyPause = null; }
      paused = false;
    } else {
      paused = true;
      destroyPause = makePauseOverlay(() => {
        paused = false; destroyPause = null;
        document.body.style.cursor = "default";
      });
    }
  });

  // ── Loop principal ───────────────────────────────────────────────────────
  k.onUpdate(() => {
    if (!introFinished) return;
    if (paused) return;
    const dt = k.dt();

    // Movimento do player
    if (phase === "playing") {
      let dx = 0, dy = 0;
      if (controlMode === "keyboard") {
        if (k.isKeyDown("left")  || k.isKeyDown("a")) dx = -1;
        if (k.isKeyDown("right") || k.isKeyDown("d")) dx =  1;
        if (k.isKeyDown("up")    || k.isKeyDown("w")) dy = -1;
        if (k.isKeyDown("down")  || k.isKeyDown("s")) dy =  1;
      }
      if (joystick) {
        joystick.tick();
        if (joystick.isActive()) {
          const { x: jx, y: jy } = joystick.getDir();
          if (Math.abs(jx) > 0.15) dx = jx;
          if (Math.abs(jy) > 0.15) dy = jy;
        }
      }

      if (dx !== 0 || dy !== 0) {
        const len = Math.hypot(dx, dy) || 1;
        const ndx = dx / len, ndy = dy / len;
        vivi.pos.x += ndx * SPEED * dt;
        vivi.pos.y += ndy * SPEED * dt;
        if (Math.abs(dx) >= Math.abs(dy)) {
          vivi.play(dx > 0 ? "walk-right" : "walk-left");
          lastFace = dx > 0 ? "right" : "left";
        } else {
          vivi.play(dy > 0 ? "walk-down" : "walk-up");
          lastFace = dy > 0 ? "down" : "up";
        }
        // Chutar bola se perto
        if (Math.hypot(vivi.pos.x - ball.pos.x, vivi.pos.y - ball.pos.y) < 36) {
          ballVel.x = ndx * 340;
          ballVel.y = ndy * 340;
        }
      } else {
        if (joystick) joystick.tick();
        vivi.play("idle-" + lastFace);
      }

      // Limita Vivi à metade esquerda do mapa
      vivi.pos.x = Math.max(MARGIN, Math.min(MID_X - MARGIN, vivi.pos.x));
      vivi.pos.y = Math.max(MARGIN, Math.min(MAP_H - MARGIN, vivi.pos.y));
    }

    // Física da bola (roda em "playing" e "mid5")
    if (phase === "playing" || phase === "mid5") {
      if (!goalLocked) {
        ball.pos.x += ballVel.x * dt;
        ball.pos.y += ballVel.y * dt;
      }
      const frict = Math.pow(0.92, dt * 60);
      ballVel.x  *= frict;
      ballVel.y  *= frict;

      // Paredes superior/inferior do campo
      if (ball.pos.y < FT) { ball.pos.y = FT; ballVel.y *= -0.6; }
      if (ball.pos.y > FB) { ball.pos.y = FB; ballVel.y *= -0.6; }

      if (!goalLocked) {
        // Parede esquerda — exceto abertura do gol esquerdo (NPC)
        if (ball.pos.x < FL - GOAL_DEPTH) {
          // Gol do NPC
          if (ball.pos.y > GT && ball.pos.y < GB) {
            onNpcGoal();
          } else {
            ball.pos.x = FL - GOAL_DEPTH; ballVel.x *= -0.5;
          }
        } else if (ball.pos.x < FL && (ball.pos.y < GT || ball.pos.y > GB)) {
          ball.pos.x = FL; ballVel.x *= -0.5;
        }

        // Parede direita — exceto abertura do gol direito (Vivi)
        if (ball.pos.x > FR + GOAL_DEPTH) {
          // Gol do Vivi
          if (ball.pos.y > GT && ball.pos.y < GB) {
            onViviGoal();
          } else {
            ball.pos.x = FR + GOAL_DEPTH; ballVel.x *= -0.5;
          }
        } else if (ball.pos.x > FR && (ball.pos.y < GT || ball.pos.y > GB)) {
          ball.pos.x = FR; ballVel.x *= -0.5;
        }
      }

      // Impede bola de cruzar para a área de lazer
      if (ball.pos.x > MID_X) { ball.pos.x = MID_X; ballVel.x *= -0.5; }

      // ── IA do NPC ──────────────────────────────────────────────────────────
      if (phase === "playing" && !goalLocked) {
        npcJitter += dt;
        const jX = Math.sin(npcJitter * 7.4) * 12;
        const jY = Math.cos(npcJitter * 5.2) * 8;

        // Estratégia: bola no lado esquerdo → correr para a bola para interceptar
        //             bola no lado direito  → posicionar-se entre bola e gol esquerdo
        const ballInNpcSide = ball.pos.x > (FL + FR) / 2;
        let tgtX, tgtY;
        if (ballInNpcSide) {
          // Bola no lado do NPC: ir buscar para chutar em direção ao gol do Vivi
          tgtX = ball.pos.x + jX;
          tgtY = ball.pos.y + jY;
        } else {
          // Bola no lado de Vivi: posicionar entre bola e gol esquerdo para interceptar
          tgtX = (ball.pos.x + FL) / 2 + jX;
          tgtY = ball.pos.y + jY;
        }

        const nnX = tgtX - npcMan.pos.x;
        const nnY = tgtY - npcMan.pos.y;
        const nd  = Math.hypot(nnX, nnY) || 1;
        if (nd > 10) {
          npcMan.pos.x += (nnX / nd) * 120 * dt;
          npcMan.pos.y += (nnY / nd) * 120 * dt;
          npcMan.play(nnX > 0 ? "walk-right" : "walk-left");
        } else {
          npcMan.play("idle-left");
        }
        npcMan.pos.x = Math.max(FL, Math.min(MID_X - MARGIN, npcMan.pos.x));
        npcMan.pos.y = Math.max(FT, Math.min(FB, npcMan.pos.y));

        // NPC chuta em direção ao gol esquerdo (goleira do Vivi) quando próximo
        const npcBallDist = Math.hypot(npcMan.pos.x - ball.pos.x, npcMan.pos.y - ball.pos.y);
        if (npcBallDist < 24) {
          // Mirar no gol esquerdo com alguma variação
          const aimX = FL - GOAL_DEPTH / 2;
          const aimY = GOAL_MID + k.rand(-GOAL_H * 0.3, GOAL_H * 0.3);
          const kd   = Math.hypot(aimX - ball.pos.x, aimY - ball.pos.y) || 1;
          ballVel.x  = ((aimX - ball.pos.x) / kd) * 280;
          ballVel.y  = ((aimY - ball.pos.y) / kd) * 280;
        }
      }
    }

    // ── Cinemática: Vivi caminha até Gigi ────────────────────────────────────
    if (phase === "cutscene" && cutsceneStarted && !cutsceneReached) {
      const cdx   = meetX - vivi.pos.x;
      const cdy   = meetY - vivi.pos.y;
      const cdist = Math.hypot(cdx, cdy);
      if (cdist > 12) {
        vivi.pos.x += (cdx / cdist) * 120 * dt;
        vivi.pos.y += (cdy / cdist) * 120 * dt;
        if (Math.abs(cdx) >= Math.abs(cdy)) {
          vivi.play(cdx > 0 ? "walk-right" : "walk-left");
        } else {
          vivi.play(cdy > 0 ? "walk-down" : "walk-up");
        }
      } else {
        cutsceneReached = true;
        vivi.pos.x = meetX;
        vivi.pos.y = meetY;
        vivi.play("idle-right");
        showBubble(vivi,    "Vamos lá",                    2.2);
        k.wait(2.4,  () => { showBubble(gigiNpc,  "Onde? rs",                       2.2); });
        k.wait(4.8,  () => { showBubble(npcWoman, "Para de ser boba,\nGiovanna!", 2.8); });
        k.wait(7.8,  () => { showBubble(gigiNpc,  "Tá bom kkkk ❤️",                 2.2); });
        k.wait(10.4, () => { phase = "exit"; });
      }
    }

    // ── Saída: Vivi e Gigi caminham juntos para a direita ────────────────────
    if (phase === "exit") {
      vivi.pos.x    += 280 * dt;
      gigiNpc.pos.x += 280 * dt;
      vivi.play("walk-right");
      gigiNpc.play("walk-right");
      if (!exitTriggered && vivi.pos.x + world.pos.x > SW + 100) {
        exitTriggered = true;
        k.tween(0, 1, 1.2, v => { fadeOverlay.opacity = v; },
          () => { k.go("menu"); });
      }
    }

    // Gigi: passeando / indo ver o jogo (bloqueado durante cutscene e exit)
    if (phase !== "cutscene" && phase !== "exit") {
      if (watchingField) {
        if (gigiNpc.pos.x > WATCH_POS_X + 4) {
          gigiNpc.pos.x -= 65 * dt;
          gigiNpc.play("walk-left");
        } else {
          gigiNpc.pos.x = WATCH_POS_X;
          gigiNpc.play("idle-left");
        }
      } else {
        gigiTimer -= dt;
        if (gigiTimer <= 0) {
          gigiDir   *= -1;
          gigiTimer  = k.rand(2, 5);
          gigiNpc.play(gigiDir > 0 ? "walk-right" : "walk-left");
        }
        gigiNpc.pos.x += gigiDir * 55 * dt;
        gigiNpc.pos.x  = Math.max(MID_X + TSIZE, Math.min(MAP_W - 3 * TSIZE, gigiNpc.pos.x));
      }
    }

    // NPC Woman: passeando / indo ver o jogo (fica parada durante cutscene e exit)
    if (phase !== "cutscene" && phase !== "exit") {
      if (watchingField) {
        const wWatchX = WATCH_POS_X + 3 * TSIZE;
        if (npcWoman.pos.x > wWatchX + 4) {
          npcWoman.pos.x -= 50 * dt;
          npcWoman.play("walk-left");
        } else {
          npcWoman.pos.x = wWatchX;
          npcWoman.play("idle-left");
        }
      } else {
        womanTimer -= dt;
        if (womanTimer <= 0) {
          womanDir   *= -1;
          womanTimer  = k.rand(2, 4);
          npcWoman.play(womanDir > 0 ? "walk-right" : "walk-left");
        }
        npcWoman.pos.x += womanDir * 45 * dt;
        npcWoman.pos.x  = Math.max(MID_X + TSIZE, Math.min(MAP_W - 3 * TSIZE, npcWoman.pos.x));
      }
    }

    // Câmera suave seguindo Vivi
    const tgtX = Math.min(0, Math.max(SW - MAP_W, SW / 2 - vivi.pos.x));
    const tgtY = Math.min(0, Math.max(SH - MAP_H, SH / 2 - vivi.pos.y));
    world.pos.x = k.lerp(world.pos.x, tgtX, 8 * dt);
    world.pos.y = k.lerp(world.pos.y, tgtY, 8 * dt);
  });

  k.onKeyRelease(() => {
    if (!k.isKeyDown("left") && !k.isKeyDown("right") &&
        !k.isKeyDown("up")   && !k.isKeyDown("down") &&
        !k.isKeyDown("a")    && !k.isKeyDown("d") &&
        !k.isKeyDown("w")    && !k.isKeyDown("s")) {
      if (phase === "playing") vivi.play("idle-" + lastFace);
    }
  });
});

k.go("menu");
