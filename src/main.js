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
k.loadSprite("cena3_bg",         "sprites/cena3_background.png");
k.loadSprite("sprite_poste",     "sprites/sprite_poste.png",     { sliceX: 4, sliceY: 1, anims: { "pulse": { from: 0, to: 3, loop: true, speed: 3 } } });
k.loadSprite("sprite_pilar",     "sprites/sprite_pilar.png",     { sliceX: 4, sliceY: 1, anims: { "light": { from: 0, to: 3, loop: true, speed: 2 } } });
k.loadSprite("sprite_estrela_a", "sprites/sprite_estrela_a.png", { sliceX: 6, sliceY: 1, anims: { "blink": { from: 0, to: 5, loop: true, speed: 4 } } });
k.loadSprite("sprite_estrela_b", "sprites/sprite_estrela_b.png", { sliceX: 6, sliceY: 1, anims: { "blink": { from: 0, to: 5, loop: true, speed: 3 } } });
k.loadSprite("sprite_estrela_c", "sprites/sprite_estrela_c.png", { sliceX: 8, sliceY: 1, anims: { "blink": { from: 0, to: 7, loop: true, speed: 5 } } });
k.loadSprite("recompensa_flores",        "sprites/recompensa_flores.png");
k.loadSprite("recompensa_beijos",        "sprites/recompensa_beijos.png");
k.loadSprite("recompensa_interrogacao",  "sprites/recompensa_interrogacao.png");

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

const recompensasData = [
  { id: "flores",  sprite: "recompensa_flores",       titulo: "Buquê Perfeito",  fase: "Fase 1 — A Surpresa", descricao: "Gigi coletou 10 flores lindas\ne fez o buquê mais fofo do mundo!", desbloqueada: false },
  { id: "beijos",  sprite: "recompensa_beijos",       titulo: "15 Beijos!",      fase: "Fase 4 — A Sintonia", descricao: "Você capturou 15 beijos certeiros!\nQue sintonia perfeita <3",          desbloqueada: false },
  { id: "secret1", sprite: "recompensa_interrogacao", titulo: "???",             fase: "???",                  descricao: "Ainda nao foi descoberta...\nContinue jogando! ✨",                     desbloqueada: false },
  { id: "secret2", sprite: "recompensa_interrogacao", titulo: "???",             fase: "???",                  descricao: "Segredo guardado a 7 chaves.\nVoce vai encontrar! 💕",                  desbloqueada: false },
  { id: "secret3", sprite: "recompensa_interrogacao", titulo: "???",             fase: "???",                  descricao: "Esse segredo e especial...\nNao desista! 🌟",                           desbloqueada: false },
];

let volumeGeral   = 1.0;
let volumeEfeitos = 1.0;
let volumeMusica  = 1.0;
function getEffectsVolume() { return volumeGeral * volumeEfeitos; }

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

// ── Cenário noturno (compartilhado por missao3 e missao4) ────────────────
// Background cena3_bg + estrelas + pilar + poste, todos fixos.
// O background é deslocado SH*0.07 para baixo para revelar mais céu no topo.
function addNightScenery() {
  const bgScale = Math.max(SW / 960, SH / 720);
  const bgX     = SW / 2 - (960 * bgScale) / 2;
  const bgY     = (SH / 2 + SH * 0.15) - (720 * bgScale) / 2;

  k.add([
    k.sprite("cena3_bg"),
    k.pos(SW / 2, SH / 2 + SH * 0.15),
    k.anchor("center"),
    k.scale(bgScale),
    k.z(0), k.fixed(),
  ]);

  // Converte um ponto (px,py) da imagem original (960x720) para a tela
  const bgPos = (px, py) => ({ x: bgX + px * bgScale, y: bgY + py * bgScale });

  // ── Estrelas (na faixa de céu, rows < ~200 da imagem) ──────────────────
  const starPosA = [
    bgPos( 77,  29), bgPos(173,  86), bgPos(307,  50), bgPos(432, 130),
    bgPos(557,  36), bgPos(672, 101), bgPos(787,  58), bgPos(883, 158),
  ];
  starPosA.forEach(({ x, y }, i) => {
    const s = k.add([
      k.sprite("sprite_estrela_a"),
      k.pos(x, y), k.anchor("center"),
      k.scale(1.0), k.z(1), k.fixed(),
    ]);
    k.wait(i * 0.3, () => { s.play("blink"); });
  });

  const starPosB = [
    bgPos(115, 144), bgPos(259, 173), bgPos(480, 187),
    bgPos(624, 158), bgPos(749, 194), bgPos(845, 108),
  ];
  starPosB.forEach(({ x, y }, i) => {
    const s = k.add([
      k.sprite("sprite_estrela_b"),
      k.pos(x, y), k.anchor("center"),
      k.scale(0.8), k.z(1), k.fixed(),
    ]);
    k.wait(i * 0.25, () => { s.play("blink"); });
  });

  const starPosC = [
    bgPos(211, 43), bgPos(403, 86), bgPos(595, 65), bgPos(816, 144),
  ];
  starPosC.forEach(({ x, y }, i) => {
    const s = k.add([
      k.sprite("sprite_estrela_c"),
      k.pos(x, y), k.anchor("center"),
      k.scale(1.2), k.z(1), k.fixed(),
    ]);
    k.wait(i * 0.35, () => { s.play("blink"); });
  });

  // ── Pilar (esquerda do cenário) ────────────────────────────────────────
  const pilar = k.add([
    k.sprite("sprite_pilar"),
    k.pos(bgX + 170 * bgScale, bgY + 265 * bgScale),
    k.anchor("top"),
    k.scale(bgScale * 0.88),
    k.z(6), k.fixed(),
  ]);
  pilar.play("light");

  // ── Poste (direita do cenário) ─────────────────────────────────────────
  const poste = k.add([
    k.sprite("sprite_poste"),
    k.pos(bgX + 600 * bgScale, bgY + 160 * bgScale),
    k.anchor("top"),
    k.scale(bgScale * 0.88),
    k.z(3), k.fixed(),
  ]);
  poste.play("pulse");

  return { bgScale, bgX, bgY, bgPos };
}

// ── Funções globais de UI ────────────────────────────────────────────────
function abrirRecompensas() {
  const recompObjs = [];
  const add = (o) => { recompObjs.push(o); return o; };

  const bg = add(k.add([k.rect(SW, SH), k.pos(0,0), k.color(0,0,0), k.opacity(0.75), k.z(80), k.fixed()]));

  const PW = SW * 0.88, PH = SH * 0.82;
  add(k.add([k.rect(PW + 8*SC, PH + 8*SC, { radius: 18 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(240,110,160), k.z(81), k.fixed()]));
  add(k.add([k.rect(PW, PH, { radius: 15 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(255,215,232), k.opacity(0.97), k.z(82), k.fixed()]));

  add(k.add([
    k.text("Recompensas", { size: fs(14), font: "pressstart2p", align: "center" }),
    k.pos(SW/2, SH/2 - PH/2 + 22*SC), k.anchor("center"),
    k.color(170,28,88), k.z(83), k.fixed(),
  ]));

  function fechar() { recompObjs.forEach(o => { if (o.exists()) o.destroy(); }); }

  // Botão X
  const xBtn = add(k.add([
    k.rect(28*SC, 28*SC, { radius: 6*SC }),
    k.pos(SW/2 + PW/2 - 6*SC, SH/2 - PH/2 + 6*SC), k.anchor("topright"),
    k.color(200,60,80), k.area(), k.z(83), k.fixed(),
  ]));
  add(k.add([k.text("X", { size: fs(9), font: "pressstart2p" }), k.pos(SW/2 + PW/2 - 6*SC - 14*SC, SH/2 - PH/2 + 6*SC + 14*SC), k.anchor("center"), k.color(255,255,255), k.z(84), k.fixed()]));
  xBtn.onHover(() => { xBtn.color = k.rgb(230,80,100); document.body.style.cursor = "pointer"; });
  xBtn.onHoverEnd(() => { xBtn.color = k.rgb(200,60,80); document.body.style.cursor = "default"; });
  xBtn.onClick(() => { document.body.style.cursor = "default"; fechar(); });

  // Grade de ícones (5 recompensas lado a lado)
  const iconSize = 56 * SC;
  const iconSpacing = (PW - 5 * iconSize) / 6;
  const iconY = SH/2 - 10*SC;
  recompensasData.forEach((r, i) => {
    const ix = SW/2 - PW/2 + iconSpacing + iconSize/2 + i * (iconSize + iconSpacing);
    const iconBg = add(k.add([
      k.rect(iconSize, iconSize, { radius: 10*SC }),
      k.pos(ix, iconY), k.anchor("center"),
      k.color(...(r.desbloqueada ? [200,160,220] : [80,60,100])),
      k.area(), k.z(83), k.fixed(),
    ]));
    const sprScale = (48 * SC) / 64;
    add(k.add([k.sprite(r.sprite), k.pos(ix, iconY), k.anchor("center"), k.scale(sprScale), k.z(84), k.fixed()]));
    add(k.add([
      k.text(r.desbloqueada ? r.titulo : "???", { size: fs(6), font: "pressstart2p", align: "center", width: iconSize + 8*SC }),
      k.pos(ix, iconY + iconSize/2 + 8*SC), k.anchor("center"),
      k.color(80,30,60), k.z(83), k.fixed(),
    ]));
    iconBg.onHover(() => { iconBg.color = k.rgb(...(r.desbloqueada ? [220,180,240] : [100,80,120])); document.body.style.cursor = "pointer"; });
    iconBg.onHoverEnd(() => { iconBg.color = k.rgb(...(r.desbloqueada ? [200,160,220] : [80,60,100])); document.body.style.cursor = "default"; });
    iconBg.onClick(() => { document.body.style.cursor = "default"; abrirDetalheRecompensa(r, recompObjs); });
  });

  add(k.add([
    k.text("Clique em uma recompensa para ver detalhes", { size: fs(6), font: "pressstart2p", align: "center", width: PW - 20*SC }),
    k.pos(SW/2, SH/2 + PH/2 - 18*SC), k.anchor("center"),
    k.color(180,100,140), k.z(83), k.fixed(),
  ]));
}

function abrirDetalheRecompensa(r, parentObjs) {
  const detObjs = [];
  const add = (o) => { detObjs.push(o); return o; };

  const DW = SW * 0.70, DH = SH * 0.55;
  add(k.add([k.rect(DW + 8*SC, DH + 8*SC, { radius: 18 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(240,110,160), k.z(90), k.fixed()]));
  add(k.add([k.rect(DW, DH, { radius: 15 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(255,215,232), k.opacity(0.97), k.z(91), k.fixed()]));

  function fecharDet() { detObjs.forEach(o => { if (o.exists()) o.destroy(); }); }

  const sprScale = (80 * SC) / 64;
  add(k.add([k.sprite(r.sprite), k.pos(SW/2, SH/2 - DH/2 + 52*SC), k.anchor("center"), k.scale(sprScale), k.z(92), k.fixed()]));
  add(k.add([k.text(r.titulo, { size: fs(12), font: "pressstart2p", align: "center", width: DW - 20*SC }), k.pos(SW/2, SH/2 - DH/2 + 110*SC), k.anchor("center"), k.color(170,28,88), k.z(92), k.fixed()]));
  add(k.add([k.text(r.fase, { size: fs(7), font: "pressstart2p", align: "center", width: DW - 20*SC }), k.pos(SW/2, SH/2 - DH/2 + 140*SC), k.anchor("center"), k.color(120,60,100), k.z(92), k.fixed()]));
  add(k.add([k.text(r.descricao, { size: fs(7), font: "pressstart2p", align: "center", width: DW - 30*SC }), k.pos(SW/2, SH/2 - DH/2 + 180*SC), k.anchor("center"), k.color(60,30,50), k.z(92), k.fixed()]));
  if (r.desbloqueada) {
    add(k.add([k.text("✓ Desbloqueada!", { size: fs(7), font: "pressstart2p", align: "center" }), k.pos(SW/2, SH/2 + DH/2 - 64*SC), k.anchor("center"), k.color(50,160,70), k.z(92), k.fixed()]));
  }

  const fechBtn = add(k.add([k.rect(160*SC, 36*SC, { radius: 8*SC }), k.pos(SW/2, SH/2 + DH/2 - 24*SC), k.anchor("center"), k.color(250,115,162), k.area(), k.z(92), k.fixed()]));
  add(k.add([k.text("Fechar", { size: fs(9), font: "pressstart2p", align: "center" }), k.pos(SW/2, SH/2 + DH/2 - 24*SC), k.anchor("center"), k.color(255,255,255), k.z(93), k.fixed()]));
  fechBtn.onHover(() => { fechBtn.color = k.rgb(255,75,130); document.body.style.cursor = "pointer"; });
  fechBtn.onHoverEnd(() => { fechBtn.color = k.rgb(250,115,162); document.body.style.cursor = "default"; });
  fechBtn.onClick(() => { document.body.style.cursor = "default"; fecharDet(); });
}

function abrirCreditos() {
  const credObjs = [];
  const add = (o) => { credObjs.push(o); return o; };

  add(k.add([k.rect(SW, SH), k.pos(0,0), k.color(0,0,0), k.opacity(0.65), k.z(89), k.fixed()]));

  const CW = SW * 0.72, CH = SH * 0.80;
  const panelTop    = SH / 2 - CH / 2;
  const panelBottom = SH / 2 + CH / 2;

  add(k.add([k.rect(CW + 8*SC, CH + 8*SC, { radius: 18 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(240,110,160), k.z(90), k.fixed()]));
  add(k.add([k.rect(CW, CH, { radius: 15 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(255,215,232), k.opacity(0.97), k.z(91), k.fixed()]));

  function fechar() { credObjs.forEach(o => { if (o.exists()) o.destroy(); }); }

  // ── Cabeçalho fixo (não rola) ──────────────────────────────────────────
  const HEADER_H = 46 * SC;
  add(k.add([k.text("Créditos", { size: fs(14), font: "pressstart2p", align: "center" }), k.pos(SW/2, panelTop + 20*SC), k.anchor("center"), k.color(170,28,88), k.z(92), k.fixed()]));
  add(k.add([k.rect(CW * 0.85, 2*SC), k.pos(SW/2, panelTop + HEADER_H - 2*SC), k.anchor("center"), k.color(240,110,160), k.z(92), k.fixed()]));

  // ── Botão Fechar fixo (não rola) ──────────────────────────────────────
  const FOOTER_H   = 52 * SC;
  const fechBtnY   = panelBottom - FOOTER_H / 2;
  const fechBtn    = add(k.add([k.rect(160*SC, 36*SC, { radius: 8*SC }), k.pos(SW/2, fechBtnY), k.anchor("center"), k.color(250,115,162), k.area(), k.z(95), k.fixed()]));
  add(k.add([k.text("Fechar", { size: fs(9), font: "pressstart2p", align: "center" }), k.pos(SW/2, fechBtnY), k.anchor("center"), k.color(255,255,255), k.z(96), k.fixed()]));
  fechBtn.onHover(() => { fechBtn.color = k.rgb(255,75,130); document.body.style.cursor = "pointer"; });
  fechBtn.onHoverEnd(() => { fechBtn.color = k.rgb(250,115,162); document.body.style.cursor = "default"; });
  fechBtn.onClick(() => { document.body.style.cursor = "default"; fechar(); });

  // ── Área de conteúdo rolável ──────────────────────────────────────────
  const clipTop    = panelTop + HEADER_H;
  const clipBottom = panelBottom - FOOTER_H;
  const visibleH   = clipBottom - clipTop;

  // Conteúdo: array de { obj, relY } onde relY é relativo ao início do conteúdo
  const scrollItems = [];
  const SCROLL_STEP = 30 * SC;
  let scrollY = 0;

  let relY = 0;  // cursor vertical relativo
  function addContent(obj, height) {
    scrollItems.push({ obj, relY });
    relY += height;
  }

  // Cria cada bloco de conteúdo (posição Y será calculada pelo applyScroll)
  const txt1 = add(k.add([k.text("Feito com muito amor por\nVinicius\npara sua linda\nGiovanna 💕", { size: fs(7), font: "pressstart2p", align: "center", width: CW - 28*SC }), k.pos(SW/2, 0), k.anchor("center"), k.color(80,30,60), k.z(92), k.fixed()]));
  addContent(txt1, 68*SC);

  const sep1 = add(k.add([k.rect(CW * 0.85, 2*SC), k.pos(SW/2, 0), k.anchor("center"), k.color(240,110,160), k.z(92), k.fixed()]));
  addContent(sep1, 16*SC);

  const sub1 = add(k.add([k.text("Desenvolvido com", { size: fs(7), font: "pressstart2p", align: "center" }), k.pos(SW/2, 0), k.anchor("center"), k.color(120,60,100), k.z(92), k.fixed()]));
  addContent(sub1, 22*SC);

  const tech = add(k.add([k.text("KAPLAY — Game Engine\nVite — Build Tool\nJavaScript — Linguagem\nWeb Audio API — Sons\nPython + Pillow — Sprites\nGoogle Fonts — Press Start 2P", { size: fs(6), font: "pressstart2p", align: "center", width: CW - 28*SC }), k.pos(SW/2, 0), k.anchor("center"), k.color(100,50,80), k.z(92), k.fixed()]));
  addContent(tech, 86*SC);

  const sep2 = add(k.add([k.rect(CW * 0.85, 2*SC), k.pos(SW/2, 0), k.anchor("center"), k.color(240,110,160), k.z(92), k.fixed()]));
  addContent(sep2, 16*SC);

  const sub2 = add(k.add([k.text("Assistência de IA", { size: fs(7), font: "pressstart2p", align: "center" }), k.pos(SW/2, 0), k.anchor("center"), k.color(120,60,100), k.z(92), k.fixed()]));
  addContent(sub2, 22*SC);

  const iaText = add(k.add([k.text("Claude (Anthropic)\nRoteiro, código e sprites\ngerados com ajuda de IA", { size: fs(6), font: "pressstart2p", align: "center", width: CW - 28*SC }), k.pos(SW/2, 0), k.anchor("center"), k.color(100,50,80), k.z(92), k.fixed()]));
  addContent(iaText, 50*SC);

  const sep3 = add(k.add([k.rect(CW * 0.85, 2*SC), k.pos(SW/2, 0), k.anchor("center"), k.color(240,110,160), k.z(92), k.fixed()]));
  addContent(sep3, 16*SC);

  const footer = add(k.add([k.text("Momoris Gigica © 2025\n4 anos de amor 💕", { size: fs(6), font: "pressstart2p", align: "center", width: CW - 28*SC }), k.pos(SW/2, 0), k.anchor("center"), k.color(160,100,140), k.z(92), k.fixed()]));
  addContent(footer, 32*SC);

  const totalContentH = relY;
  const maxScroll     = Math.max(0, totalContentH - visibleH + 16*SC);

  function applyScroll() {
    for (const item of scrollItems) {
      const absY = clipTop + item.relY - scrollY + 16*SC;
      item.obj.pos.y = absY;
      item.obj.hidden = absY < clipTop + 4*SC || absY > clipBottom - 4*SC;
    }
  }
  applyScroll();

  // ── Botões de rolagem ▲▼ (fixos, lado direito do painel) ──────────────
  const scrollBtnX = SW / 2 + CW / 2 - 18 * SC;
  const scrollBtnS = 24 * SC;

  const upBtn = add(k.add([k.rect(scrollBtnS, scrollBtnS, { radius: 5*SC }), k.pos(scrollBtnX, clipTop + 20*SC), k.anchor("center"), k.color(200,80,120), k.area(), k.z(94), k.fixed()]));
  add(k.add([k.text("▲", { size: fs(8), font: "pressstart2p" }), k.pos(scrollBtnX, clipTop + 20*SC), k.anchor("center"), k.color(255,255,255), k.z(95), k.fixed()]));
  upBtn.onHover(() => { upBtn.color = k.rgb(230,100,140); document.body.style.cursor = "pointer"; });
  upBtn.onHoverEnd(() => { upBtn.color = k.rgb(200,80,120); document.body.style.cursor = "default"; });
  upBtn.onClick(() => { scrollY = Math.max(0, scrollY - SCROLL_STEP); applyScroll(); });

  const dnBtn = add(k.add([k.rect(scrollBtnS, scrollBtnS, { radius: 5*SC }), k.pos(scrollBtnX, clipBottom - 20*SC), k.anchor("center"), k.color(200,80,120), k.area(), k.z(94), k.fixed()]));
  add(k.add([k.text("▼", { size: fs(8), font: "pressstart2p" }), k.pos(scrollBtnX, clipBottom - 20*SC), k.anchor("center"), k.color(255,255,255), k.z(95), k.fixed()]));
  dnBtn.onHover(() => { dnBtn.color = k.rgb(230,100,140); document.body.style.cursor = "pointer"; });
  dnBtn.onHoverEnd(() => { dnBtn.color = k.rgb(200,80,120); document.body.style.cursor = "default"; });
  dnBtn.onClick(() => { scrollY = Math.min(maxScroll, scrollY + SCROLL_STEP); applyScroll(); });
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

  // Botão troféu (canto superior direito)
  const trofeuBtn = k.add([
    k.rect(36 * SC, 36 * SC, { radius: 8 * SC }),
    k.pos(SW - 18 * SC, 18 * SC), k.anchor("topright"),
    k.color(180, 130, 40), k.area(), k.z(8), k.fixed(),
  ]);
  k.add([
    k.text("🏆", { size: fs(14) }),
    k.pos(SW - 18 * SC - 18 * SC, 18 * SC + 18 * SC), k.anchor("center"),
    k.z(9), k.fixed(),
  ]);
  trofeuBtn.onHover(() => { trofeuBtn.color = k.rgb(210,160,60); document.body.style.cursor = "pointer"; });
  trofeuBtn.onHoverEnd(() => { trofeuBtn.color = k.rgb(180,130,40); document.body.style.cursor = "default"; });
  trofeuBtn.onClick(() => { abrirRecompensas(); });

  // Botão configurações (canto superior esquerdo)
  const configBtn = k.add([
    k.rect(36*SC, 36*SC, { radius: 8*SC }),
    k.pos(18*SC, 18*SC), k.anchor("topleft"),
    k.color(80,80,100), k.area(), k.z(8), k.fixed(),
  ]);
  k.add([k.text("⚙", { size: fs(14) }), k.pos(18*SC + 18*SC, 18*SC + 18*SC), k.anchor("center"), k.z(9), k.fixed()]);
  configBtn.onHover(() => { configBtn.color = k.rgb(110,110,130); document.body.style.cursor = "pointer"; });
  configBtn.onHoverEnd(() => { configBtn.color = k.rgb(80,80,100); document.body.style.cursor = "default"; });
  configBtn.onClick(() => { document.body.style.cursor = "default"; k.go("configuracoes"); });
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
      gain.gain.setValueAtTime(0.05 * getEffectsVolume(), ctx.currentTime);
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
      gain.gain.setValueAtTime(0.3 * getEffectsVolume(), ctx.currentTime);
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
      gain.gain.setValueAtTime(0.3 * getEffectsVolume(), t);
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
  recompensasData.find(r => r.id === "flores").desbloqueada = true;
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
    k.rect(280 * SC, 368 * SC, { radius: 18 * SC }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(240, 110, 160),
    k.opacity(0.97),
    k.z(4),
  ]);

  // Painel rosado
  k.add([
    k.rect(272 * SC, 360 * SC, { radius: 15 * SC }),
    k.pos(SW / 2, SH / 2),
    k.anchor("center"),
    k.color(255, 215, 232),
    k.opacity(0.93),
    k.z(5),
  ]);

  // Título
  k.add([
    k.text("Selecionar\nFase", { size: fs(16), font: "pressstart2p", align: "center", width: 252 * SC }),
    k.pos(SW / 2, SH / 2 - 122 * SC),
    k.anchor("center"),
    k.color(170, 28, 88),
    k.z(6),
  ]);

  // Paginação de fases
  const fasesData = [
    { label: "Fase 1: A Surpresa", scene: "missao1", color: [250, 115, 162] },
    { label: "Fase 2: O Campinho", scene: "missao2", color: [100, 160, 255] },
    { label: "Fase 3: O Beijo",    scene: "missao3", color: [140,  80, 180] },
    { label: "Fase 4: A Sintonia", scene: "missao4", color: [180,  60,  80] },
  ];
  const FASES_POR_PAGINA = 3;
  let paginaAtual = 0;

  function renderFases() {
    k.get("fase-btn").forEach(o => o.destroy());

    const inicio = paginaAtual * FASES_POR_PAGINA;
    const slice = fasesData.slice(inicio, inicio + FASES_POR_PAGINA);

    slice.forEach((fase, i) => {
      const base = fase.color;
      const hover = [Math.min(255, base[0] + 25), Math.min(255, base[1] + 25), Math.min(255, base[2] + 25)];
      const y = SH / 2 - 60 * SC + i * 52 * SC;
      const btn = k.add([
        k.rect(230 * SC, 40 * SC, { radius: 10 * SC }),
        k.pos(SW / 2, y),
        k.anchor("center"),
        k.color(base[0], base[1], base[2]),
        k.area(),
        k.z(6),
        "fase-btn",
      ]);
      k.add([
        k.text(fase.label, { size: fs(8), font: "pressstart2p", align: "center", width: 215 * SC }),
        k.pos(SW / 2, y),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.z(7),
        "fase-btn",
      ]);
      btn.onHover(() => { btn.color = k.rgb(hover[0], hover[1], hover[2]); document.body.style.cursor = "pointer"; });
      btn.onHoverEnd(() => { btn.color = k.rgb(base[0], base[1], base[2]); document.body.style.cursor = "default"; });
      btn.onClick(() => { document.body.style.cursor = "default"; k.go(fase.scene); });
    });

    // Área de navegação: 48*SC abaixo do slot 3 (SH/2 + 44*SC)
    const NAV_Y = SH / 2 + 92 * SC;

    // Seta "< Ant"
    if (paginaAtual > 0) {
      const antBtn = k.add([
        k.rect(80 * SC, 30 * SC, { radius: 6 * SC }),
        k.pos(SW / 2 - 72 * SC, NAV_Y),
        k.anchor("center"),
        k.color(80, 80, 110),
        k.area(),
        k.z(6),
        "fase-btn",
      ]);
      k.add([
        k.text("< Ant", { size: fs(7), font: "pressstart2p", align: "center" }),
        k.pos(SW / 2 - 72 * SC, NAV_Y),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.z(7),
        "fase-btn",
      ]);
      antBtn.onHover(() => { antBtn.color = k.rgb(110, 110, 140); document.body.style.cursor = "pointer"; });
      antBtn.onHoverEnd(() => { antBtn.color = k.rgb(80, 80, 110); document.body.style.cursor = "default"; });
      antBtn.onClick(() => { document.body.style.cursor = "default"; paginaAtual--; renderFases(); });
    }

    // Seta "Prox >"
    if ((paginaAtual + 1) * FASES_POR_PAGINA < fasesData.length) {
      const proxBtn = k.add([
        k.rect(80 * SC, 30 * SC, { radius: 6 * SC }),
        k.pos(SW / 2 + 72 * SC, NAV_Y),
        k.anchor("center"),
        k.color(80, 80, 110),
        k.area(),
        k.z(6),
        "fase-btn",
      ]);
      k.add([
        k.text("Prox >", { size: fs(7), font: "pressstart2p", align: "center" }),
        k.pos(SW / 2 + 72 * SC, NAV_Y),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.z(7),
        "fase-btn",
      ]);
      proxBtn.onHover(() => { proxBtn.color = k.rgb(110, 110, 140); document.body.style.cursor = "pointer"; });
      proxBtn.onHoverEnd(() => { proxBtn.color = k.rgb(80, 80, 110); document.body.style.cursor = "default"; });
      proxBtn.onClick(() => { document.body.style.cursor = "default"; paginaAtual++; renderFases(); });
    }

    // Indicador de página — centralizado entre as setas
    k.add([
      k.text(`${paginaAtual + 1} / ${Math.ceil(fasesData.length / FASES_POR_PAGINA)}`, { size: fs(7), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, NAV_Y),
      k.anchor("center"),
      k.color(180, 150, 210),
      k.z(8),
      "fase-btn",
    ]);
  }

  // Botão Voltar (sempre visível) — 42*SC abaixo da área de navegação
  const voltarBtn = k.add([
    k.rect(230 * SC, 34 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, SH / 2 + 136 * SC),
    k.anchor("center"),
    k.color(130, 130, 145),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("< Voltar", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 136 * SC),
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

  renderFases();
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
    k.text("4 de março de 2022", { size: fs(14), font: "pressstart2p" }),
    k.pos(SW / 2, SH / 2 - 30 * SC),
    k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0),
    k.z(91), k.fixed(),
  ]);

  const introText2 = k.add([
    k.text("Associação Atlética Caldense", { size: fs(10), font: "pressstart2p", width: 380 * SC, align: "center" }),
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
        gain.gain.setValueAtTime(0.22 * getEffectsVolume(), t);
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
      gain.gain.setValueAtTime(0.3 * getEffectsVolume(), ctx.currentTime);
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
      gain.gain.setValueAtTime(0.28 * getEffectsVolume(), ctx.currentTime);
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
          () => { k.go("missao3"); });
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

// ── Cena: MISSÃO 3 – O ENCONTRO ─────────────────────────────────────────
k.scene("missao3", () => {
  // ── Estado ───────────────────────────────────────────────────────────────
  let arrivedAtPillar = false;
  let inKissScene     = false;
  let paused          = false;
  let destroyPause    = null;
  let dialogActive    = false;
  let dialogIndex     = 0;
  let currentFullText = "";
  let currentCharIdx  = 0;
  let typingDone      = false;
  let typingHandle    = null;
  let arrowVisible    = false;
  let arrowTimer      = 0;

  // ── Áudio (Web Audio API) ────────────────────────────────────────────────
  let audioCtx3 = null;
  function getAudioCtx3() {
    if (!audioCtx3) audioCtx3 = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx3;
  }
  function playTypingSound() {
    try {
      const ctx  = getAudioCtx3();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800 + Math.random() * 400;
      osc.type = "square";
      gain.gain.setValueAtTime(0.05 * getEffectsVolume(), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // ── Fade de entrada ──────────────────────────────────────────────────────
  const entryFade = k.add([
    k.rect(SW, SH), k.pos(0, 0),
    k.color(0, 0, 0), k.opacity(1),
    k.z(60), k.fixed(),
  ]);
  k.tween(1, 0, 1.0, v => { entryFade.opacity = v; }, () => { entryFade.destroy(); });

  // ── Cenário noturno (background + estrelas + pilar + poste) ───────────────
  addNightScenery();

  // ── Personagens ───────────────────────────────────────────────────────────
  const ENTRY_X       = -60;
  const ENTRY_Y       = SH * 0.72;
  const MEET_X        = SW * 0.42;
  const GIGI_OFFSET_X = 220;

  // Vivi entra pela esquerda — z(5) o deixa na frente da Gigi e de todo o cenário
  const vivi = k.add([
    k.sprite("vivi"),
    k.pos(ENTRY_X, ENTRY_Y),
    k.anchor("center"),
    k.scale(14),
    k.z(5), k.fixed(),
  ]);
  vivi.play("walk-right");

  const gigi = k.add([
    k.sprite("gigi"),
    k.pos(ENTRY_X + GIGI_OFFSET_X, ENTRY_Y),
    k.anchor("center"),
    k.scale(3.5),
    k.z(4), k.fixed(),
  ]);
  gigi.play("walk-right");

  // ── Caixa de diálogo ──────────────────────────────────────────────────────
  const DW          = 460 * SC;
  const DH          = 100 * SC;
  const DY          = SH - DH / 2 - 150 * SC;
  const PORTRAIT_CX = SW / 2 - DW / 2 + 50 * SC;
  const TEXT_X      = SW / 2 - DW / 2 + 100 * SC;

  const dialogBorder = k.add([
    k.rect(DW + 4 * SC, DH + 4 * SC, { radius: 12 * SC }),
    k.pos(SW / 2, DY), k.anchor("center"),
    k.color(255, 105, 180), k.opacity(0.92),
    k.z(29), k.fixed(),
  ]);

  const dialogBg = k.add([
    k.rect(DW, DH, { radius: 10 * SC }),
    k.pos(SW / 2, DY), k.anchor("center"),
    k.color(18, 4, 32), k.opacity(0.92),
    k.z(30), k.fixed(),
  ]);

  const portraitBorder = k.add([
    k.rect(84 * SC, 84 * SC, { radius: 4 * SC }),
    k.pos(PORTRAIT_CX, DY), k.anchor("center"),
    k.color(255, 105, 180),
    k.z(31), k.fixed(),
  ]);

  const portraitFill = k.add([
    k.rect(80 * SC, 80 * SC, { radius: 3 * SC }),
    k.pos(PORTRAIT_CX, DY), k.anchor("center"),
    k.color(30, 8, 48),
    k.z(32), k.fixed(),
  ]);

  const portraitScaleVivi = (80 * SC * 0.7) / 16;
  const portraitScaleGigi = (80 * SC * 0.20) / 16;
  const portraitVivi = k.add([
    k.sprite("vivi", { frame: 0 }),
    k.pos(PORTRAIT_CX, DY), k.anchor("center"),
    k.scale(portraitScaleVivi),
    k.z(33), k.fixed(),
  ]);

  const portraitGigi = k.add([
    k.sprite("gigi", { frame: 0 }),
    k.pos(PORTRAIT_CX, DY), k.anchor("center"),
    k.scale(portraitScaleGigi),
    k.z(33), k.fixed(),
  ]);

  const dialogName = k.add([
    k.text("", { size: fs(8), font: "pressstart2p" }),
    k.pos(TEXT_X, DY - DH / 2 + 14 * SC),
    k.color(255, 105, 180),
    k.z(34), k.fixed(),
  ]);

  const dialogText = k.add([
    k.text("", { size: fs(7), font: "pressstart2p", width: DW - 110 * SC, align: "left" }),
    k.pos(TEXT_X, DY - DH / 2 + 30 * SC),
    k.color(255, 245, 255),
    k.z(34), k.fixed(),
  ]);

  const dialogArrow = k.add([
    k.text("▼", { size: fs(8), font: "pressstart2p" }),
    k.pos(SW / 2 + DW / 2 - 16 * SC, DY + DH / 2 - 14 * SC),
    k.color(255, 255, 255), k.opacity(0),
    k.z(34), k.fixed(),
  ]);

  function setDialogVisible(v) {
    dialogBorder.hidden   = !v;
    dialogBg.hidden       = !v;
    portraitBorder.hidden = !v;
    portraitFill.hidden   = !v;
    portraitVivi.hidden   = !v;
    portraitGigi.hidden   = !v;
    dialogName.hidden     = !v;
    dialogText.hidden     = !v;
    dialogArrow.hidden    = !v;
    dialogActive          = v;
  }
  setDialogVisible(false);

  // ── Sistema de digitação ──────────────────────────────────────────────────
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

  // ── Dados do diálogo ──────────────────────────────────────────────────────
  const dialogs = [
    { speaker: "vivi", name: "Vivi",     text: "Tudo certo?" },
    { speaker: "gigi", name: "Giovanna", text: "To muito nervosa kkkk, nao sei se isso vai dar certo." },
    { speaker: "vivi", name: "Vivi",     text: "Fica tranquila." },
    { speaker: "vivi", name: "Vivi",     text: "Confia em mim." },
    { speaker: "vivi", name: "Vivi",     text: "Voce e muito linda, quero muito isso." },
  ];

  // ── Lógica do diálogo ─────────────────────────────────────────────────────
  function showDialog(index) {
    const d = dialogs[index];
    setDialogVisible(true);
    dialogName.text     = d.name;
    portraitVivi.hidden = d.speaker !== "vivi";
    portraitGigi.hidden = d.speaker !== "gigi";
    typeText(d.text);
  }

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
    dialogIndex++;
    if (dialogIndex >= dialogs.length) {
      setDialogVisible(false);
      startKissScene();
    } else {
      showDialog(dialogIndex);
    }
  }

  // ── Fim da missao3: aproximação e transição para a missao4 ────────────────
  function startKissScene() {
    inKissScene = true;
    vivi.play("walk-left");
    gigi.play("walk-right");
    k.wait(0.4, () => {
      vivi.play("idle-right");
      gigi.play("idle-left");
      // Fade to black suave; ao final segue direto para a missao4
      const fadeOut = k.add([
        k.rect(SW, SH), k.pos(0, 0),
        k.color(0, 0, 0), k.opacity(0),
        k.z(70), k.fixed(),
      ]);
      k.tween(0, 1, 0.8, v => { fadeOut.opacity = v; })
        .onEnd(() => { k.go("missao4"); });
    });
  }

  // ── Controles ─────────────────────────────────────────────────────────────
  k.onKeyPress("space",  () => { advanceDialog(); });
  k.onKeyPress("return", () => { advanceDialog(); });
  k.onClick(() => { advanceDialog(); });

  k.onKeyPress("escape", () => {
    if (!arrivedAtPillar || inKissScene) return;
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

  // ── Loop principal ────────────────────────────────────────────────────────
  k.onUpdate(() => {
    if (paused) return;

    if (arrowVisible) {
      arrowTimer += k.dt();
      dialogArrow.opacity = Math.sin(arrowTimer * 6) > 0 ? 1 : 0;
    }

    if (!arrivedAtPillar) {
      vivi.pos.x += 110 * k.dt();
      gigi.pos.x += 110 * k.dt();
      if (vivi.pos.x >= MEET_X) {
        arrivedAtPillar = true;
        vivi.pos.x = MEET_X;
        gigi.pos.x = MEET_X + GIGI_OFFSET_X;
        vivi.play("idle-right");
        gigi.play("idle-left");
        k.wait(0.5, () => {
          dialogIndex = 0;
          showDialog(dialogIndex);
        });
      }
    }
  });
});

// ── Cena: MISSÃO 4 – A SINTONIA (minigame dos emojis) ───────────────────
k.scene("missao4", () => {
  // ── Estado ───────────────────────────────────────────────────────────────
  let acertos        = 0;
  let erros          = 0;
  let paused         = false;
  let destroyPause   = null;
  let gameEnded      = false;   // true ao vencer ou perder
  let spawnLoop      = null;    // handle do k.loop (para cancelar)
  let defeatHandlers = [];      // handlers do diálogo de derrota (para cancelar)

  // ── Áudio (Web Audio API) ─────────────────────────────────────────────────
  let audioCtx4 = null;
  function getAudioCtx4() {
    if (!audioCtx4) audioCtx4 = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx4;
  }
  function playHitSound() {
    try {
      const ctx = getAudioCtx4(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = 880;            // sino agudo e suave
      gain.gain.setValueAtTime(0.2 * getEffectsVolume(), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(); osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }
  function playErrorSound() {
    try {
      const ctx = getAudioCtx4(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "square"; osc.frequency.value = 220;          // grave e seco
      gain.gain.setValueAtTime(0.18 * getEffectsVolume(), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }
  function playWinSound() {
    try {
      const ctx = getAudioCtx4();
      [523, 659, 784, 1047].forEach((freq, i) => {            // acorde ascendente
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine"; osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.15;
        gain.gain.setValueAtTime(0.25 * getEffectsVolume(), t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t); osc.stop(t + 0.3);
      });
    } catch (e) {}
  }
  function playTypingSound() {
    try {
      const ctx = getAudioCtx4(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 800 + Math.random() * 400;
      osc.type = "square";
      gain.gain.setValueAtTime(0.05 * getEffectsVolume(), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start(); osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // ── Cenário (o mesmo da missao3) ───────────────────────────────────────────
  addNightScenery();

  // ── Vivi e Gigi: decorativos, parados no canto inferior, atrás dos emojis ──
  const CHAR_Y = SH * 0.72;
  const vivi = k.add([
    k.sprite("vivi"), k.pos(SW * 0.36, CHAR_Y),
    k.anchor("center"), k.scale(16), k.z(4), k.fixed(),
  ]);
  vivi.play("idle-right");
  const gigi = k.add([
    k.sprite("gigi"), k.pos(SW * 0.43 + 34, CHAR_Y),
    k.anchor("center"), k.scale(4), k.z(4), k.fixed(),
  ]);
  gigi.play("idle-left");

  // ── HUD: barra de progresso de beijos (esquerda) ──────────────────────────
  const BAR_W = 200 * SC, BAR_H = 14 * SC;
  const BAR_X = 16 * SC,  BAR_Y = 30 * SC;
  const hitsLabel = k.add([
    k.text("Beijos: 0/15", { size: fs(8), font: "pressstart2p" }),
    k.pos(BAR_X, 12 * SC), k.color(255, 255, 255), k.z(41), k.fixed(), "hud",
  ]);
  k.add([   // fundo cinza escuro da barra
    k.rect(BAR_W, BAR_H, { radius: 3 * SC }),
    k.pos(BAR_X, BAR_Y), k.color(40, 40, 48), k.z(40), k.fixed(), "hud",
  ]);
  const barFill = k.add([
    k.rect(1, BAR_H, { radius: 3 * SC }),
    k.pos(BAR_X, BAR_Y), k.color(255, 105, 180), k.z(41), k.fixed(), "hud",
  ]);
  function updateBar() {
    hitsLabel.text = `Beijos: ${acertos}/15`;
    const t = Math.min(1, acertos / 15);
    barFill.width = Math.max(1, BAR_W * t);
    // gradiente de rosa (255,105,180) -> vermelho (220,60,60)
    barFill.color = k.rgb(
      Math.round(255 + (220 - 255) * t),
      Math.round(105 + ( 60 - 105) * t),
      Math.round(180 + ( 60 - 180) * t),
    );
  }

  // ── HUD: vidas (direita) ──────────────────────────────────────────────────
  k.add([
    k.text("Vidas:", { size: fs(8), font: "pressstart2p" }),
    k.pos(SW - 16 * SC, 12 * SC), k.anchor("topright"),
    k.color(255, 255, 255), k.z(41), k.fixed(), "hud",
  ]);
  const hearts = [];
  for (let i = 0; i < 3; i++) {
    hearts.push(k.add([
      k.text("❤️", { size: fs(14) }),
      k.pos(SW - 16 * SC - (2 - i) * 30 * SC, 30 * SC), k.anchor("top"),
      k.z(41), k.fixed(), "hud",
    ]));
  }
  function updateLives() {
    for (let i = 0; i < 3; i++) {
      hearts[i].text = (i < 3 - erros) ? "❤️" : "\u{1F494}";  // ❤️ / 💔
    }
  }

  // ── Texto flutuante (partícula de feedback) ────────────────────────────────
  function floatText(x, y, txt, col, rise, dur) {
    const p = k.add([
      k.text(txt, { size: fs(12), font: "pressstart2p" }),
      k.pos(x, y), k.anchor("center"),
      k.color(col[0], col[1], col[2]), k.opacity(1), k.z(16), k.fixed(),
    ]);
    if (rise) k.tween(y, y - 30 * SC, dur, v => { p.pos.y = v; });
    k.tween(1, 0, dur, v => { p.opacity = v; });
    k.wait(dur, () => { if (p.exists()) p.destroy(); });
  }

  // ── Spawn de um emoji ──────────────────────────────────────────────────────
  function spawnEmoji() {
    const r = Math.random();
    let isCorrect, char;
    if (r < 0.4)      { isCorrect = true;  char = "\u{1F48B}"; }    // 💋 beijo
    else if (r < 0.65) { isCorrect = true;  char = "❤️"; } // ❤️ coração
    else              { isCorrect = false; char = "\u{1F445}"; }    // 👅 língua

    // 15% das línguas vêm em vermelho escuro (armadilha visual); penaliza igual
    const isTrap = !isCorrect && Math.random() < 0.15;

    const maxSpeed  = 260 + (acertos / 15) * 80;   // dificuldade cresce com o progresso
    const vy        = k.rand(140, maxSpeed) * SC;    // velocidade de queda dos emojis
    const amplitude = k.rand(15, 35) * SC;          // oscilação lateral
    const swaySpeed = k.rand(1.6, 3.2);             // suave e individual
    const phase     = k.rand(0, Math.PI * 2);
    const edge      = amplitude + SW * 0.05;        // mantém o emoji dentro da tela
    const x         = k.rand(edge, SW - edge);

    const e = k.add([
      k.text(char, { size: fs(28) }),
      k.pos(x, -40), k.anchor("center"),
      k.area(), k.z(10), k.fixed(), "femoji",
      { vy, amplitude, swaySpeed, phase, baseX: x, isCorrect, clicked: false },
    ]);
    if (isTrap) e.color = k.rgb(150, 30, 40);

    e.onUpdate(() => {
      if (paused || gameEnded) return;
      e.pos.y += e.vy * k.dt();
      e.pos.x  = e.baseX + Math.sin(k.time() * e.swaySpeed + e.phase) * e.amplitude;
      if (e.pos.y > SH + 40) e.destroy();   // saiu por baixo: descarta sem penalizar
    });

    e.onClick(() => {
      if (paused || gameEnded || e.clicked) return;
      e.clicked = true;
      if (e.isCorrect) {
        acertos++;
        updateBar();
        playHitSound();
        floatText(e.pos.x, e.pos.y, "✨ +1", [255, 240, 120], true, 0.5);
        e.destroy();
        if (acertos >= 15) onWin();
      } else {
        erros++;
        updateLives();
        playErrorSound();
        floatText(e.pos.x, e.pos.y, "✖", [230, 60, 60], false, 0.4);
        e.destroy();
        if (erros >= 3) onGameOver();
      }
    });
  }

  function startSpawning() {
    if (gameEnded) return;
    spawnLoop = k.loop(0.8, () => {
      if (paused || gameEnded) return;   // pausa suspende o spawn
      spawnEmoji();
    });
  }

  function stopGame() {
    gameEnded = true;
    if (spawnLoop) { spawnLoop.cancel(); spawnLoop = null; }
    k.get("femoji").forEach(o => o.destroy());
  }

  // ── Vitória ────────────────────────────────────────────────────────────────
  function onWin() {
    if (gameEnded) return;
    stopGame();
    playWinSound();
    recompensasData.find(r => r.id === "beijos").desbloqueada = true;
    const fade = k.add([
      k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0),
      k.opacity(0), k.z(70), k.fixed(),
    ]);
    k.tween(0, 1, 1.2, v => { fade.opacity = v; })
      .onEnd(() => { k.go("menu"); });   // TODO: trocar para k.go("missao5") quando existir
  }

  // ── Derrota ──────────────────────────────────────────────────────────────────
  function onGameOver() {
    if (gameEnded) return;
    stopGame();
    const fade = k.add([
      k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0),
      k.opacity(0), k.z(70), k.fixed(),
    ]);
    k.tween(0, 1, 0.8, v => { fade.opacity = v; })
      .onEnd(() => { showDefeatScene(fade); });
  }

  // ── Sub-cena de derrota: mesmo cenário + diálogo + Game Over ─────────────────
  function showDefeatScene(fade) {
    k.get("hud").forEach(o => { o.hidden = true; });

    // Vivi e Gigi no centro, parados, de frente um para o outro
    vivi.pos.x = SW / 2 - 42 * SC; vivi.pos.y = SH * 0.5; vivi.play("idle-right");
    gigi.pos.x = SW / 2 + 42 * SC; gigi.pos.y = SH * 0.5; gigi.play("idle-left");

    // Revela o cenário (preto -> transparente) e inicia o diálogo
    k.tween(1, 0, 0.6, v => { fade.opacity = v; })
      .onEnd(() => { if (fade.exists()) fade.destroy(); startDefeatDialog(); });
  }

  function startDefeatDialog() {
    const defeatDialogs = [
      { speaker: "vivi", name: "Vivi",     text: "vc beijou meu queixo?" },
      { speaker: "gigi", name: "Giovanna", text: "kkkk desculpa." },
    ];

    // Caixa de diálogo — mesmo estilo da missao3 (retrato, nome, digitação, seta)
    const DW = 460 * SC, DH = 100 * SC;
    const DY = SH - DH / 2 - 12 * SC;
    const PORTRAIT_CX = SW / 2 - DW / 2 + 50 * SC;
    const TEXT_X      = SW / 2 - DW / 2 + 100 * SC;

    const dBorder = k.add([k.rect(DW + 4 * SC, DH + 4 * SC, { radius: 12 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(255, 105, 180), k.opacity(0.92), k.z(80), k.fixed()]);
    const dBg     = k.add([k.rect(DW, DH, { radius: 10 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(18, 4, 32), k.opacity(0.92), k.z(81), k.fixed()]);
    const pBorder = k.add([k.rect(84 * SC, 84 * SC, { radius: 4 * SC }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.color(255, 105, 180), k.z(82), k.fixed()]);
    const pFill   = k.add([k.rect(80 * SC, 80 * SC, { radius: 3 * SC }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.color(30, 8, 48), k.z(83), k.fixed()]);
    const pScaleVivi = (80 * SC * 0.7) / 16;
    const pScaleGigi = (80 * SC * 0.20) / 16;
    const pVivi   = k.add([k.sprite("vivi", { frame: 0 }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.scale(pScaleVivi), k.z(84), k.fixed()]);
    const pGigi   = k.add([k.sprite("gigi", { frame: 0 }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.scale(pScaleGigi), k.z(84), k.fixed()]);
    const dName   = k.add([k.text("", { size: fs(8), font: "pressstart2p" }), k.pos(TEXT_X, DY - DH / 2 + 14 * SC), k.color(255, 105, 180), k.z(85), k.fixed()]);
    const dText   = k.add([k.text("", { size: fs(7), font: "pressstart2p", width: DW - 110 * SC, align: "left" }), k.pos(TEXT_X, DY - DH / 2 + 30 * SC), k.color(255, 245, 255), k.z(85), k.fixed()]);
    const dArrow  = k.add([k.text("▼", { size: fs(8), font: "pressstart2p" }), k.pos(SW / 2 + DW / 2 - 16 * SC, DY + DH / 2 - 14 * SC), k.color(255, 255, 255), k.opacity(0), k.z(85), k.fixed()]);
    const box = [dBorder, dBg, pBorder, pFill, pVivi, pGigi, dName, dText, dArrow];

    let dIndex = 0, fullText = "", charIdx = 0, typingDone = false, typingHandle = null;
    let arrowVisible = false, arrowTimer = 0, dialogDone = false;

    function typeText(t) {
      fullText = t; charIdx = 0; typingDone = false;
      arrowVisible = false; arrowTimer = 0; dArrow.opacity = 0; dText.text = "";
      function step() {
        if (charIdx >= t.length) { typingDone = true; arrowVisible = true; return; }
        dText.text = t.slice(0, charIdx + 1);
        playTypingSound();
        charIdx++;
        typingHandle = k.wait(0.03, step);
      }
      step();
    }

    function show(i) {
      const d = defeatDialogs[i];
      dName.text   = d.name;
      pVivi.hidden = d.speaker !== "vivi";
      pGigi.hidden = d.speaker !== "gigi";
      typeText(d.text);
    }

    function advance() {
      if (dialogDone) return;
      if (!typingDone) {
        if (typingHandle) { typingHandle.cancel(); typingHandle = null; }
        dText.text = fullText; typingDone = true; arrowVisible = true;
        return;
      }
      arrowVisible = false; arrowTimer = 0; dArrow.opacity = 0;
      dIndex++;
      if (dIndex >= defeatDialogs.length) {
        dialogDone = true;
        box.forEach(o => o.destroy());
        showGameOverScreen();
      } else {
        show(dIndex);
      }
    }

    const arrowTick = k.onUpdate(() => {
      if (arrowVisible) {
        arrowTimer += k.dt();
        dArrow.opacity = Math.sin(arrowTimer * 6) > 0 ? 1 : 0;
      }
    });
    const h1 = k.onKeyPress("space",  advance);
    const h2 = k.onKeyPress("return", advance);
    const h3 = k.onClick(advance);
    defeatHandlers = [arrowTick, h1, h2, h3];

    show(0);
  }

  function showGameOverScreen() {
    defeatHandlers.forEach(h => h.cancel());
    defeatHandlers = [];

    // Fundo semi-transparente sobre o cenário
    k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0.72), k.z(86), k.fixed()]);
    k.add([
      k.text("GAME OVER", { size: fs(20), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.36), k.anchor("center"),
      k.color(220, 60, 60), k.z(87), k.fixed(),
    ]);
    k.add([
      k.text("Tente de novo!", { size: fs(9), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.5), k.anchor("center"),
      k.color(255, 255, 255), k.z(87), k.fixed(),
    ]);
    const retryBtn = k.add([
      k.rect(264 * SC, 44 * SC, { radius: 10 * SC }),
      k.pos(SW / 2, SH * 0.64), k.anchor("center"),
      k.color(200, 70, 90), k.area(), k.z(87), k.fixed(),
    ]);
    k.add([
      k.text("Tentar Novamente", { size: fs(9), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.64), k.anchor("center"),
      k.color(255, 255, 255), k.z(88), k.fixed(),
    ]);
    retryBtn.onHover(() => { retryBtn.color = k.rgb(225, 95, 115); document.body.style.cursor = "pointer"; });
    retryBtn.onHoverEnd(() => { retryBtn.color = k.rgb(200, 70, 90); document.body.style.cursor = "default"; });
    retryBtn.onClick(() => { document.body.style.cursor = "default"; k.go("missao4"); });
  }

  // ── Pause (escape) — só durante o jogo ativo ────────────────────────────────
  k.onKeyPress("escape", () => {
    if (gameEnded) return;
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

  // ── Título da fase → inicia o spawn após o fade out ─────────────────────────
  const titleShadow = k.add([
    k.text("Missão 4: A Sintonia", { size: fs(16), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC), k.anchor("center"),
    k.color(0, 0, 0), k.opacity(0), k.z(45), k.fixed(),
  ]);
  const titleLabel = k.add([
    k.text("Missão 4: A Sintonia", { size: fs(16), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0), k.z(46), k.fixed(),
  ]);
  k.tween(0, 1, 0.6, v => { titleLabel.opacity = v; titleShadow.opacity = v * 0.6; });
  k.wait(2.6, () => {
    k.tween(1, 0, 0.6, v => { titleLabel.opacity = v; titleShadow.opacity = v * 0.6; })
      .onEnd(() => {
        if (titleLabel.exists())  titleLabel.destroy();
        if (titleShadow.exists()) titleShadow.destroy();
        startSpawning();
      });
  });

  updateBar();
  updateLives();
});

// ── Cena: CONFIGURAÇÕES ──────────────────────────────────────────────────
k.scene("configuracoes", () => {
  // Mesmo fundo do menu
  const TILE = 16, SCALE = 2, TSIZE = TILE * SCALE;
  const COLS = Math.ceil(SW / TSIZE) + 1, ROWS = Math.ceil(SH / TSIZE) + 1;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      k.add([k.sprite(Math.random() < 0.15 ? "flower" : "grass"), k.pos(col * TSIZE, row * TSIZE), k.scale(SCALE), k.z(0)]);
    }
  }

  // Painel
  k.add([k.rect(SW * 0.62 + 4, SH * 0.84 + 4, { radius: 18 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(240,110,160), k.opacity(0.97), k.z(4)]);
  k.add([k.rect(SW * 0.62, SH * 0.84, { radius: 15 }), k.pos(SW/2, SH/2), k.anchor("center"), k.color(255,215,232), k.opacity(0.93), k.z(5)]);

  // Título + botão Créditos na mesma linha do topo
  const PANEL_W = SW * 0.62;
  const PANEL_TOP = SH / 2 - SH * 0.42;
  const TITULO_Y  = PANEL_TOP + 28 * SC;

  k.add([
    k.text("Configurações", { size: fs(14), font: "pressstart2p", align: "center", width: PANEL_W * 0.65 }),
    k.pos(SW / 2 - PANEL_W * 0.08, TITULO_Y), k.anchor("center"),
    k.color(170, 28, 88), k.z(6),
  ]);

  // Botão Créditos — dentro do painel, canto superior direito
  const creditosBtn = k.add([
    k.rect(80 * SC, 24 * SC, { radius: 6 * SC }),
    k.pos(SW / 2 + PANEL_W / 2 - 14 * SC, TITULO_Y), k.anchor("right"),
    k.color(100, 58, 155), k.area(), k.z(7),
  ]);
  k.add([
    k.text("Créditos", { size: fs(7), font: "pressstart2p", align: "center", width: 78 * SC }),
    k.pos(SW / 2 + PANEL_W / 2 - 14 * SC - 40 * SC, TITULO_Y), k.anchor("center"),
    k.color(255, 255, 255), k.z(8),
  ]);
  creditosBtn.onHover(() => { creditosBtn.color = k.rgb(130, 80, 185); document.body.style.cursor = "pointer"; });
  creditosBtn.onHoverEnd(() => { creditosBtn.color = k.rgb(100, 58, 155); document.body.style.cursor = "default"; });
  creditosBtn.onClick(() => { document.body.style.cursor = "default"; abrirCreditos(); });

  // ── Sliders de volume ─────────────────────────────────────────────────────
  // Layout horizontal: [Label 65*SC] [gap] [- btn 22*SC] [gap] [barra 110*SC] [gap] [+ btn 22*SC] [gap] [% fs(6)]
  // Todos alinhados ao centro vertical da mesma linha Y
  const sliders = [
    { label: "Geral",   get: () => volumeGeral,   set: (v) => { volumeGeral   = v; } },
    { label: "Efeitos", get: () => volumeEfeitos, set: (v) => { volumeEfeitos = v; } },
    { label: "Musica",  get: () => volumeMusica,  set: (v) => { volumeMusica  = v; } },
  ];

  const PL      = SW / 2 - PANEL_W / 2;    // borda esquerda do painel
  const LBL_W   = 65 * SC;
  const BTN_S   = 22 * SC;
  const BAR_N   = 110 * SC;
  const BAR_H   = 12 * SC;
  const GAP_S   = 8 * SC;
  const INNER_L = PL + 18 * SC;            // margem interna esquerda

  const lX  = INNER_L;                              // label: âncora left
  const mCX = lX + LBL_W + GAP_S + BTN_S / 2;      // centro do botão -
  const bLX = mCX + BTN_S / 2 + GAP_S;             // barra: âncora left
  const pCX = bLX + BAR_N + GAP_S + BTN_S / 2;     // centro do botão +
  const vLX = pCX + BTN_S / 2 + GAP_S;             // valor: âncora left

  const ROW_START_Y = SH / 2 - 50 * SC;
  const ROW_STEP    = 55 * SC;

  sliders.forEach((s, i) => {
    const y = ROW_START_Y + i * ROW_STEP;

    k.add([
      k.text(s.label, { size: fs(8), font: "pressstart2p" }),
      k.pos(lX, y), k.anchor("left"),
      k.color(170, 28, 88), k.z(6),
    ]);

    k.add([k.rect(BAR_N, BAR_H, { radius: 4 * SC }), k.pos(bLX, y), k.anchor("left"), k.color(200, 150, 180), k.z(6)]);
    const barFill = k.add([k.rect(Math.max(1, BAR_N * s.get()), BAR_H, { radius: 4 * SC }), k.pos(bLX, y), k.anchor("left"), k.color(250, 115, 162), k.z(7)]);
    const valLabel = k.add([k.text(`${Math.round(s.get() * 100)}%`, { size: fs(6), font: "pressstart2p" }), k.pos(vLX, y), k.anchor("left"), k.color(120, 60, 100), k.z(6)]);

    function update() {
      barFill.width = Math.max(1, BAR_N * s.get());
      valLabel.text = `${Math.round(s.get() * 100)}%`;
    }

    const minusBtn = k.add([k.rect(BTN_S, BTN_S, { radius: 4 * SC }), k.pos(mCX, y), k.anchor("center"), k.color(200, 80, 120), k.area(), k.z(7)]);
    k.add([k.text("-", { size: fs(10), font: "pressstart2p" }), k.pos(mCX, y), k.anchor("center"), k.color(255, 255, 255), k.z(8)]);
    minusBtn.onHover(() => { minusBtn.color = k.rgb(230, 100, 140); document.body.style.cursor = "pointer"; });
    minusBtn.onHoverEnd(() => { minusBtn.color = k.rgb(200, 80, 120); document.body.style.cursor = "default"; });
    minusBtn.onClick(() => { s.set(Math.max(0, Math.round((s.get() - 0.1) * 10) / 10)); update(); });

    const plusBtn = k.add([k.rect(BTN_S, BTN_S, { radius: 4 * SC }), k.pos(pCX, y), k.anchor("center"), k.color(200, 80, 120), k.area(), k.z(7)]);
    k.add([k.text("+", { size: fs(10), font: "pressstart2p" }), k.pos(pCX, y), k.anchor("center"), k.color(255, 255, 255), k.z(8)]);
    plusBtn.onHover(() => { plusBtn.color = k.rgb(230, 100, 140); document.body.style.cursor = "pointer"; });
    plusBtn.onHoverEnd(() => { plusBtn.color = k.rgb(200, 80, 120); document.body.style.cursor = "default"; });
    plusBtn.onClick(() => { s.set(Math.min(1, Math.round((s.get() + 0.1) * 10) / 10)); update(); });
  });

  // Botão Voltar
  const voltarBtn = k.add([k.rect(SW * 0.44, SH * 0.10, { radius: 10 }), k.pos(SW/2, SH/2 + SH*0.34), k.anchor("center"), k.color(250,115,162), k.area(), k.z(6)]);
  k.add([k.text("< Voltar", { size: fs(10), font: "pressstart2p", align: "center" }), k.pos(SW/2, SH/2 + SH*0.34), k.anchor("center"), k.color(255,255,255), k.z(7)]);
  voltarBtn.onHover(() => { voltarBtn.color = k.rgb(255,75,130); document.body.style.cursor = "pointer"; });
  voltarBtn.onHoverEnd(() => { voltarBtn.color = k.rgb(250,115,162); document.body.style.cursor = "default"; });
  voltarBtn.onClick(() => { document.body.style.cursor = "default"; k.go("menu"); });
});

k.go("menu");
