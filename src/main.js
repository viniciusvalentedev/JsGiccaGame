import kaplay from "kaplay";

const k = kaplay({
  width: 480,
  height: 320,
  letterbox: true,
  background: [100, 190, 70],
  touchToMouse: true,
  canvas: document.querySelector("canvas") || undefined,
});

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

k.loadSprite("grass",     "sprites/grass.png");
k.loadSprite("flower",    "sprites/flower.png");
k.loadSprite("bird",      "sprites/bird.png",      { sliceX: 2, sliceY: 1, anims: { fly: { from: 0, to: 1, loop: true, speed: 4 } } });
k.loadSprite("butterfly", "sprites/butterfly.png", { sliceX: 2, sliceY: 1, anims: { fly: { from: 0, to: 1, loop: true, speed: 5 } } });
k.loadSprite("bouquet",   "sprites/bouquet.png",   { sliceX: 4, sliceY: 1, anims: { sway: { from: 0, to: 3, loop: true, speed: 4 } } });

const SW = 480;
const SH = 320;

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
  const BASE_X = 65;
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
    k.rect(258, 182, { radius: 16 }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(110, 50, 155),
    k.z(101),
  ]));

  // Fundo do painel
  add(k.add([
    k.rect(250, 174, { radius: 13 }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(32, 8, 52),
    k.z(102),
  ]));

  // Título
  add(k.add([
    k.text("PAUSE", { size: 14, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 - 56),
    k.anchor("center"),
    k.color(210, 185, 255),
    k.z(103),
  ]));

  // Botão Continuar (verde)
  const continueBtn = add(k.add([
    k.rect(210, 40, { radius: 8 }),
    k.pos(SW / 2, SH / 2 + 4),
    k.anchor("center"),
    k.color(45, 160, 65),
    k.area(),
    k.z(103),
  ]));
  add(k.add([
    k.text("Continuar", { size: 9, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 4),
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
    k.rect(210, 40, { radius: 8 }),
    k.pos(SW / 2, SH / 2 + 57),
    k.anchor("center"),
    k.color(185, 42, 52),
    k.area(),
    k.z(103),
  ]));
  add(k.add([
    k.text("Sair ao Menu", { size: 9, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 57),
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
    k.rect(294, 256, { radius: 18 }),
    k.pos(SW / 2, SH / 2 + 10),
    k.anchor("center"),
    k.color(240, 110, 160),
    k.opacity(0.97),
    k.z(4),
  ]);

  // Painel rosado
  k.add([
    k.rect(286, 248, { radius: 15 }),
    k.pos(SW / 2, SH / 2 + 10),
    k.anchor("center"),
    k.color(255, 215, 232),
    k.opacity(0.93),
    k.z(5),
  ]);

  // Título principal
  k.add([
    k.text("Momoris\nGigica", { size: 22, font: "pressstart2p", align: "center", width: 268 }),
    k.pos(SW / 2, SH / 2 - 64),
    k.anchor("center"),
    k.color(170, 28, 88),
    k.z(6),
  ]);

  // Subtítulo
  k.add([
    k.text("4 anos de amor", { size: 8, font: "pressstart2p", align: "center", width: 268 }),
    k.pos(SW / 2, SH / 2 + 14),
    k.anchor("center"),
    k.color(205, 65, 125),
    k.z(6),
  ]);

  // Botão Iniciar
  const startBtn = k.add([
    k.rect(214, 44, { radius: 10 }),
    k.pos(SW / 2, SH / 2 + 74),
    k.anchor("center"),
    k.color(250, 115, 162),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("Iniciar", { size: 12, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 74),
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

  // Botão Selecionar Controles
  const ctrlBtn = k.add([
    k.rect(214, 36, { radius: 10 }),
    k.pos(SW / 2, SH / 2 + 112),
    k.anchor("center"),
    k.color(120, 58, 185),
    k.area(),
    k.z(6),
  ]);
  const ctrlLabel = k.add([
    k.text(
      controlMode === "joystick" ? "Controles: Joystick" : "Controles: Teclado",
      { size: 7, font: "pressstart2p", align: "center", width: 200 }
    ),
    k.pos(SW / 2, SH / 2 + 112),
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
  const MAP_COLS = 40;
  const MAP_ROWS = 40;
  const MAP_W    = MAP_COLS * TSIZE;
  const MAP_H    = MAP_ROWS * TSIZE;
  const SPEED    = 120;
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

  // Pássaros – maioria nasce perto do jogador
  for (let i = 0; i < 5; i++) {
    const near = i < 3;
    const bx   = near ? k.rand(START_X - 300, START_X + 300) : k.rand(100, MAP_W - 100);
    const by   = near ? k.rand(START_Y - 110, START_Y + 90)  : k.rand(100, MAP_H - 100);
    const spd  = k.rand(30, 55);
    const b    = world.add([
      k.sprite("bird", { anim: "fly" }),
      k.pos(bx, by),
      k.scale(2),
      k.z(3),
      { spd },
    ]);
    b.onUpdate(() => {
      b.move(b.spd, 0);
      if (b.pos.x > MAP_W) b.pos.x = 0;
    });
  }

  // Borboletas – maioria nasce perto do jogador
  for (let i = 0; i < 6; i++) {
    const near = i < 4;
    const bx   = near ? k.rand(START_X - 250, START_X + 250) : k.rand(0, MAP_W);
    const by   = near ? k.rand(START_Y - 120, START_Y + 120) : k.rand(100, MAP_H - 100);
    const spd  = k.rand(15, 30);
    const dir  = Math.random() < 0.5 ? 1 : -1;
    const bt   = world.add([
      k.sprite("butterfly", { anim: "fly" }),
      k.pos(bx, by),
      k.scale(2),
      k.z(3),
      { spd, dir },
    ]);
    bt.onUpdate(() => {
      bt.move(bt.spd * bt.dir, Math.sin(k.time() * 2 + bx * 0.01) * 18);
      if (bt.pos.x > MAP_W) bt.pos.x = 0;
      if (bt.pos.x < 0)     bt.pos.x = MAP_W;
    });
  }

  // ── Textos da história ───────────────────────────────────────────────
  const textPositions = [
    { x: SW / 2, y: 34      },   // topo
    { x: SW / 2, y: SH - 52 },   // base
    { x: SW / 2, y: 34      },   // topo
    { x: SW / 2, y: SH - 52 },   // base
    { x: SW / 2, y: 34      },   // topo
    { x: SW / 2, y: SH - 52 },   // base
    { x: SW / 2, y: SH / 2  },   // centro
  ];

  const textBg = k.add([
    k.rect(400, 60, { radius: 12 }),
    k.pos(SW / 2, 34),
    k.anchor("center"),
    k.color(18, 4, 32),
    k.opacity(0),
    k.z(18),
  ]);

  const textLabel = k.add([
    k.text("", { size: 18, align: "center", width: 370 }),
    k.pos(SW / 2, 34),
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
  const MAP_COLS = 40;
  const MAP_ROWS = 40;
  const MAP_W    = MAP_COLS * TSIZE;
  const MAP_H    = MAP_ROWS * TSIZE;
  const SPEED    = 120;
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

  // ── Animais ──────────────────────────────────────────────────────────
  for (let i = 0; i < 5; i++) {
    const bx  = k.rand(100, MAP_W - 100);
    const by  = k.rand(100, MAP_H - 100);
    const spd = k.rand(30, 55);
    const b   = world.add([
      k.sprite("bird", { anim: "fly" }),
      k.pos(bx, by), k.scale(2), k.z(3), { spd },
    ]);
    b.onUpdate(() => { b.move(b.spd, 0); if (b.pos.x > MAP_W) b.pos.x = 0; });
  }

  for (let i = 0; i < 6; i++) {
    const bx  = k.rand(0, MAP_W);
    const by  = k.rand(100, MAP_H - 100);
    const spd = k.rand(15, 30);
    const dir = Math.random() < 0.5 ? 1 : -1;
    const bt  = world.add([
      k.sprite("butterfly", { anim: "fly" }),
      k.pos(bx, by), k.scale(2), k.z(3), { spd, dir },
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
    k.text("\u{1F338} 0/10", { size: 10, font: "pressstart2p" }),
    k.pos(10, 10), k.color(0, 0, 0), k.opacity(0.7), k.z(19), k.fixed(),
  ]);
  const hudLabel = k.add([
    k.text("\u{1F338} 0/10", { size: 10, font: "pressstart2p" }),
    k.pos(8, 8), k.color(255, 255, 255), k.z(20), k.fixed(),
  ]);
  hudLabel.hidden  = true;
  hudShadow.hidden = true;

  function updateHUD() {
    hudLabel.text  = `\u{1F338} ${floresColetadas}/10`;
    hudShadow.text = `\u{1F338} ${floresColetadas}/10`;
  }

  // ── Texto objetivo ────────────────────────────────────────────────────
  const missionObjShadow = k.add([
    k.text("\u{1F338} Colete flores.", { size: 10, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2, SH - 16),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(19), k.fixed(),
  ]);
  const missionObj = k.add([
    k.text("\u{1F338} Colete flores.", { size: 10, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH - 18),
    k.anchor("center"), k.color(255, 215, 0), k.opacity(0), k.z(20), k.fixed(),
  ]);

  // ── Overlay de fade ───────────────────────────────────────────────────
  const fadeOverlay = k.add([
    k.rect(SW, SH), k.pos(0, 0),
    k.color(0, 0, 0), k.opacity(0), k.z(50), k.fixed(),
  ]);

  // ── Caixa de diálogo ─────────────────────────────────────────────────
  const DW = 440;
  const DH = 90;
  const DY = SH - DH / 2 - 12;

  const dialogBorder = k.add([
    k.rect(DW + 4, DH + 4, { radius: 12 }),
    k.pos(SW / 2, DY), k.anchor("center"),
    k.color(255, 105, 180), k.opacity(0.92), k.z(29), k.fixed(),
  ]);
  const dialogBg = k.add([
    k.rect(DW, DH, { radius: 10 }),
    k.pos(SW / 2, DY), k.anchor("center"),
    k.color(18, 4, 32), k.opacity(0.9), k.z(30), k.fixed(),
  ]);
  const dialogName = k.add([
    k.text("Giovanna", { size: 9, font: "pressstart2p" }),
    k.pos(SW / 2 - DW / 2 + 12, DY - DH / 2 - 2),
    k.color(255, 105, 180), k.z(31), k.fixed(),
  ]);
  const dialogText = k.add([
    k.text("", { size: 8, font: "pressstart2p", width: DW - 24, align: "left" }),
    k.pos(SW / 2 - DW / 2 + 12, DY - DH / 2 + 12),
    k.color(255, 245, 255), k.z(31), k.fixed(),
  ]);
  const dialogArrow = k.add([
    k.text("▼", { size: 8, font: "pressstart2p" }),
    k.pos(SW / 2 + DW / 2 - 18, DY + DH / 2 - 14),
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
    k.text("Missão 1: Giovanna", { size: 16, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2, SH / 2 + 2),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(39), k.fixed(),
  ]);
  const titleLabel = k.add([
    k.text("Missão 1: Giovanna", { size: 16, font: "pressstart2p", align: "center" }),
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
    const size  = k.rand(12, 20);
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
  k.tween(0, 4, 0.5, v => { bouquet.scale.x = v; bouquet.scale.y = v; });

  // ── Título ────────────────────────────────────────────────────────────
  const titleShadow = k.add([
    k.text("Meu buquê ficou lindo!", { size: 12, font: "pressstart2p", align: "center", width: 420 }),
    k.pos(SW / 2 + 2, 57),
    k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.z(9), k.fixed(),
  ]);
  const titleLabel = k.add([
    k.text("Meu buquê ficou lindo!", { size: 12, font: "pressstart2p", align: "center", width: 420 }),
    k.pos(SW / 2, 55),
    k.anchor("center"), k.color(204, 34, 119), k.opacity(0), k.z(10), k.fixed(),
  ]);
  k.wait(0.6, () => {
    k.tween(0, 1, 0.4, v => { titleLabel.opacity = v; titleShadow.opacity = v * 0.5; });
  });

  // ── Estatísticas ──────────────────────────────────────────────────────
  const statsLabel = k.add([
    k.text("\u{1F338} +10 flores coletadas", { size: 8, font: "pressstart2p", align: "center", width: 420 }),
    k.pos(SW / 2, 248),
    k.anchor("center"), k.color(255, 110, 180), k.opacity(0), k.z(10), k.fixed(),
  ]);
  k.wait(1.2, () => {
    k.tween(0, 1, 0.4, v => { statsLabel.opacity = v; });
  });

  // ── Botão Próxima Fase ────────────────────────────────────────────────
  const nextBtn = k.add([
    k.rect(222, 40, { radius: 10 }),
    k.pos(SW / 2, 290),
    k.anchor("center"),
    k.color(250, 115, 162),
    k.opacity(0),
    k.area(),
    k.z(10),
    k.fixed(),
  ]);
  const nextLabel = k.add([
    k.text("► Próxima Fase", { size: 10, font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, 290),
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
      k.go("menu");
    });
  });
});

k.go("menu");
