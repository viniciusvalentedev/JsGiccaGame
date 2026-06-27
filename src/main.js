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
k.loadSprite("obs_pedra",    "sprites/obs_pedra.png");
k.loadSprite("obs_galho",    "sprites/obs_galho.png");
k.loadSprite("obs_cachorro", "sprites/obs_cachorro.png", {
  sliceX: 4, sliceY: 1,
  anims: { run: { from: 0, to: 3, loop: true, speed: 8 } }
});
k.loadSprite("obs_acai", "sprites/obs_acai.png", {
  sliceX: 4, sliceY: 1,
  anims: { ride: { from: 0, to: 3, loop: true, speed: 6 } }
});
k.loadSprite("obs_ciclista", "sprites/obs_ciclista.png", {
  sliceX: 4, sliceY: 1,
  anims: { ride: { from: 0, to: 3, loop: true, speed: 10 } }
});

// "keyboard" em desktops, "joystick" em dispositivos touch — detectado automaticamente
let controlMode = window.matchMedia("(pointer: coarse)").matches ? "joystick" : "keyboard";

const messages = [
  { text: "Momores",                          time: 0  },
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
function getMusicVolume()   { return volumeGeral * volumeMusica; }

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

  const footer = add(k.add([k.text("Momores Gigica © 2026\n4 anos de amor 💕", { size: fs(6), font: "pressstart2p", align: "center", width: CW - 28*SC }), k.pos(SW/2, 0), k.anchor("center"), k.color(160,100,140), k.z(92), k.fixed()]));
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
  // ── Áudio do menu ──────────────────────────────────────────────────────────
  let menuActx = null;
  function menuCtx() { if (!menuActx) menuActx = new (window.AudioContext || window.webkitAudioContext)(); return menuActx; }
  function playHover() {
    try {
      const c = menuCtx(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.06 * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.07);
      o.start(); o.stop(c.currentTime + 0.08);
    } catch (e) {}
  }
  function playClick() {
    try {
      const c = menuCtx(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = "triangle"; o.frequency.value = 440;
      o.frequency.exponentialRampToValueAtTime(880, c.currentTime + 0.10);
      g.gain.setValueAtTime(0.10 * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
      o.start(); o.stop(c.currentTime + 0.13);
    } catch (e) {}
  }
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [523,0,659,784,880,784,659,0,523,587,698,880,784,659,523,0];
    const DUR = 0.15;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "triangle"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

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
    k.text("Momores\nGigica", { size: fs(22), font: "pressstart2p", align: "center", width: SW * 0.55 }),
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
    playHover();
  });
  startBtn.onHoverEnd(() => {
    startBtn.color = k.rgb(250, 115, 162);
    document.body.style.cursor = "default";
  });
  startBtn.onClick(() => { playClick(); k.go("abertura"); });

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
    playHover();
  });
  faseBtn.onHoverEnd(() => {
    faseBtn.color = k.rgb(250, 155, 80);
    document.body.style.cursor = "default";
  });
  faseBtn.onClick(() => { playClick(); k.go("selecionar_fase"); });

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
    playHover();
  });
  ctrlBtn.onHoverEnd(() => {
    ctrlBtn.color = k.rgb(120, 58, 185);
    document.body.style.cursor = "default";
  });
  ctrlBtn.onClick(() => {
    playClick();
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
  trofeuBtn.onHover(() => { trofeuBtn.color = k.rgb(210,160,60); document.body.style.cursor = "pointer"; playHover(); });
  trofeuBtn.onHoverEnd(() => { trofeuBtn.color = k.rgb(180,130,40); document.body.style.cursor = "default"; });
  trofeuBtn.onClick(() => { playClick(); abrirRecompensas(); });

  // Botão configurações (canto superior esquerdo)
  const configBtn = k.add([
    k.rect(36*SC, 36*SC, { radius: 8*SC }),
    k.pos(18*SC, 18*SC), k.anchor("topleft"),
    k.color(80,80,100), k.area(), k.z(8), k.fixed(),
  ]);
  k.add([k.text("⚙", { size: fs(14) }), k.pos(18*SC + 18*SC, 18*SC + 18*SC), k.anchor("center"), k.z(9), k.fixed()]);
  configBtn.onHover(() => { configBtn.color = k.rgb(110,110,130); document.body.style.cursor = "pointer"; playHover(); });
  configBtn.onHoverEnd(() => { configBtn.color = k.rgb(80,80,100); document.body.style.cursor = "default"; });
  configBtn.onClick(() => { document.body.style.cursor = "default"; playClick(); k.go("configuracoes"); });
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

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [392,440,494,587,494,440,392,0,440,523,587,523,440,392,0,0];
    const DUR = 0.44;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "triangle"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

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
    { label: "Fase 5: A Subida",   scene: "subida",  color: [240, 140,  50] },
    { label: "Fase 6: O Pedido",   scene: "pedido",  color: [ 90, 160, 220] },
    { label: "Fase 7: Os Fogos",   scene: "fogos",          color: [230, 180,  40] },
    { label: "Fase 8: A Batalha", scene: "dialogo_batalha", color: [220,  80, 140] },
    { label: "Fim ❤️",           scene: "final",           color: [255, 215,  60] },
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
      antBtn.onClick(() => { document.body.style.cursor = "default"; paginaAtual--; k.wait(0, renderFases); });
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
      proxBtn.onClick(() => { document.body.style.cursor = "default"; paginaAtual++; k.wait(0, renderFases); });
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

  // Botão Mini-games — entre a área de navegação e o Voltar
  const MINIGAMES_Y = SH / 2 + 124 * SC;
  const miniBase  = [120, 80, 180];
  const miniHover = [Math.min(255, miniBase[0] + 25), Math.min(255, miniBase[1] + 25), Math.min(255, miniBase[2] + 25)];
  const minigamesBtn = k.add([
    k.rect(230 * SC, 34 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, MINIGAMES_Y),
    k.anchor("center"),
    k.color(miniBase[0], miniBase[1], miniBase[2]),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("Mini-games", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, MINIGAMES_Y),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(7),
  ]);
  minigamesBtn.onHover(() => {
    minigamesBtn.color = k.rgb(miniHover[0], miniHover[1], miniHover[2]);
    document.body.style.cursor = "pointer";
  });
  minigamesBtn.onHoverEnd(() => {
    minigamesBtn.color = k.rgb(miniBase[0], miniBase[1], miniBase[2]);
    document.body.style.cursor = "default";
  });
  minigamesBtn.onClick(() => {
    document.body.style.cursor = "default";
    k.go("selecionar_minigame");
  });

  // Botão Voltar (sempre visível) — abaixo do botão Mini-games
  const voltarBtn = k.add([
    k.rect(230 * SC, 34 * SC, { radius: 10 * SC }),
    k.pos(SW / 2, SH / 2 + 160 * SC),
    k.anchor("center"),
    k.color(130, 130, 145),
    k.area(),
    k.z(6),
  ]);
  k.add([
    k.text("< Voltar", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH / 2 + 160 * SC),
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

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [523,523,659,784,659,523,587,659,784,880,784,659,523,587,659,523];
    const DUR = 0.16;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "square"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

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

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [440,0,0,0,523,0,0,0,659,0,0,0,523,0,440,0];
    const DUR = 0.50;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "sine"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

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
  let spawnLoop       = null;    // handle do k.loop (para cancelar)
  let defeatHandlers  = [];      // handlers do diálogo de derrota (para cancelar)
  let victoryHandlers = [];      // handlers do diálogo de vitória (para cancelar)

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

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [440,0,0,0,523,0,0,0,659,0,0,0,523,0,440,0];
    const DUR = 0.50;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "sine"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

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
    k.tween(0, 1, 0.8, v => { fade.opacity = v; })
      .onEnd(() => { showVictoryScene(fade); });
  }

  // ── Sub-cena de vitória: mesmo cenário + diálogo ──────────────────────────
  function showVictoryScene(fade) {
    k.get("hud").forEach(o => { o.hidden = true; });

    vivi.pos.x = SW / 2 - 42 * SC; vivi.pos.y = SH * 0.5; vivi.play("idle-right");
    gigi.pos.x = SW / 2 + 42 * SC; gigi.pos.y = SH * 0.5; gigi.play("idle-left");

    k.tween(1, 0, 0.6, v => { fade.opacity = v; })
      .onEnd(() => { if (fade.exists()) fade.destroy(); startVictoryDialog(); });
  }

  function startVictoryDialog() {
    const victoryDialogs = [
      { speaker: "vivi", name: "Vivi",     text: ". . .",                         type: "fala"  },
      { speaker: "gigi", name: "Giovanna", text: ". . .",                         type: "fala"  },
      { speaker: "vivi", name: "Vivi",     text: "Isso foi muito bom.",            type: "fala"  },
      { speaker: "vivi", name: "Vivi",     text: "Estou sem palavras",             type: "fala"  },
      { speaker: "gigi", name: "Giovanna", text: "*tímida*",                       type: "pensa" },
      { speaker: "vivi", name: "Vivi",     text: "Me apaixonei",                   type: "pensa" },
      { speaker: "vivi", name: "Vivi",     text: "Vou me casar com essa mulher.",  type: "pensa" },
      { speaker: "gigi", name: "Giovanna", text: "MEU DEEEEUSSSS EU TE AMOOOOO!", type: "pensa" },
      { speaker: "gigi", name: "Giovanna", text: "Kkkk, você é engraçado.",        type: "fala"  },
    ];

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
      const d = victoryDialogs[i];
      if (d.type === "pensa") {
        dName.text    = d.name + " pensa:";
        dName.color   = k.rgb(180, 140, 255);
        dText.color   = k.rgb(210, 200, 255);
        dBorder.color = k.rgb(140, 90, 220);
      } else {
        dName.text    = d.name;
        dName.color   = k.rgb(255, 105, 180);
        dText.color   = k.rgb(255, 245, 255);
        dBorder.color = k.rgb(255, 105, 180);
      }
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
      if (dIndex >= victoryDialogs.length) {
        dialogDone = true;
        victoryHandlers.forEach(h => h.cancel());
        victoryHandlers = [];
        box.forEach(o => o.destroy());
        const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(86), k.fixed()]);
        k.tween(0, 1, 1.2, v => { fade.opacity = v; })
          .onEnd(() => { k.go("intro_subida"); });
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
    victoryHandlers = [arrowTick, h1, h2, h3];

    show(0);
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

// ── Cena: INTRO SUBIDA – cinemática antes da fase 5 ─────────────────────
k.scene("intro_subida", () => {
  const overlay = k.add([
    k.rect(SW, SH), k.pos(0, 0),
    k.color(0, 0, 0), k.opacity(1),
    k.z(90), k.fixed(),
  ]);

  // ── Bloco 1: narrativa ────────────────────────────────────────────────────
  const txt1 = k.add([
    k.text("Depois desse dia nada foi\nigual na vida deles.", {
      size: fs(11), font: "pressstart2p", width: 400 * SC, align: "center",
    }),
    k.pos(SW / 2, SH / 2 - 22 * SC), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0), k.z(91), k.fixed(),
  ]);

  const txt2 = k.add([
    k.text("Os dois ficaram apaixonados.", {
      size: fs(10), font: "pressstart2p", width: 400 * SC, align: "center",
    }),
    k.pos(SW / 2, SH / 2 + 26 * SC), k.anchor("center"),
    k.color(200, 180, 255), k.opacity(0), k.z(91), k.fixed(),
  ]);

  k.wait(0.5, () => k.tween(0, 1, 0.8, v => { txt1.opacity = v; }));
  k.wait(2.2, () => k.tween(0, 1, 0.8, v => { txt2.opacity = v; }));
  k.wait(5.5, () => {
    k.tween(1, 0, 0.6, v => { txt1.opacity = v; });
    k.tween(1, 0, 0.6, v => { txt2.opacity = v; });
  });

  // ── Bloco 2: data e local ─────────────────────────────────────────────────
  const txt3 = k.add([
    k.text("28 de junho de 2022  18:21", {
      size: fs(12), font: "pressstart2p", width: 440 * SC, align: "center",
    }),
    k.pos(SW / 2, SH / 2 - 20 * SC), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0), k.z(91), k.fixed(),
  ]);

  const txt4 = k.add([
    k.text("Trilha do Cristo", {
      size: fs(10), font: "pressstart2p", align: "center",
    }),
    k.pos(SW / 2, SH / 2 + 22 * SC), k.anchor("center"),
    k.color(200, 200, 200), k.opacity(0), k.z(91), k.fixed(),
  ]);

  k.wait(7.0, () => k.tween(0, 1, 0.8, v => { txt3.opacity = v; }));
  k.wait(8.6, () => k.tween(0, 1, 0.8, v => { txt4.opacity = v; }));
  k.wait(12.5, () => {
    k.tween(1, 0, 0.6, v => { txt3.opacity = v; });
    k.tween(1, 0, 0.6, v => { txt4.opacity = v; });
  });
  k.wait(13.5, () => { k.go("subida"); });
});

// ── Cena: SUBIDA – A RAMPA DO CRISTO (minigame estilo Dino) ──────────────
k.scene("subida", () => {
  // ── Estado ───────────────────────────────────────────────────────────────
  let paused       = false;
  let destroyPause = null;
  let gameEnded    = false;
  let started      = false;   // true após a introdução; libera spawn e cronômetro
  let elapsed      = 0;
  let erros        = 0;       // colisões sofridas (3 = derrota)
  let invulnTimer  = 0;       // janela de invencibilidade após apanhar
  let spawnTimer   = 0;
  let nextSpawn    = k.rand(1.3, 2.1);

  const SURVIVE_TIME = 35;            // segundos para vencer
  const GROUND_Y     = SH * 0.74;     // linha do chão (pés dos personagens)

  // ── Áudio (Web Audio API) ─────────────────────────────────────────────────
  let actx = null;
  function ctxA() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); return actx; }
  function beep(freq, type, dur, vol, slideTo) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.setValueAtTime(freq, c.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
      g.gain.setValueAtTime(vol * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.start(); o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  function playJump()  { beep(520, "sine",   0.12, 0.16, 880); }
  function playHit()   { beep(200, "square", 0.20, 0.20); }
  function playBark()  { beep(300, "square", 0.08, 0.18, 190); k.wait(0.11, () => beep(280, "square", 0.08, 0.18, 170)); }
  function playPop()   { beep(900, "square", 0.06, 0.12); }
  function playFail()  { beep(420, "sawtooth", 0.5, 0.2, 70); }
  function playWin()   {
    try {
      const c = ctxA();
      [523, 659, 784, 1047].forEach((f, i) => {
        const o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "sine"; o.frequency.value = f;
        const t = c.currentTime + i * 0.14;
        g.gain.setValueAtTime(0.25 * getEffectsVolume(), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.start(t); o.stop(t + 0.3);
      });
    } catch (e) {}
  }

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [330,392,440,494,659,587,494,440,392,330,440,494,659,587,494,330];
    const DUR = 0.12;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "sawtooth"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

  // ── Céu em degradê (dia → por do sol laranja) ─────────────────────────────
  const SKY_BANDS = 8;
  const bandH = GROUND_Y / SKY_BANDS;
  const skyBands = [];
  for (let i = 0; i < SKY_BANDS; i++) {
    skyBands.push(k.add([
      k.rect(SW, bandH + 2), k.pos(0, i * bandH),
      k.color(0, 0, 0), k.z(0), k.fixed(),
    ]));
  }
  const lerpN = (a, b, t) => a + (b - a) * t;
  function setSky(p) {
    const dayTop = [120, 180, 255], dayBot = [205, 232, 255];
    const sunTop = [ 60,  40, 110], sunBot = [255, 150,  60];
    const top = dayTop.map((c, i) => lerpN(c, sunTop[i], p));
    const bot = dayBot.map((c, i) => lerpN(c, sunBot[i], p));
    skyBands.forEach((b, i) => {
      const t = SKY_BANDS > 1 ? i / (SKY_BANDS - 1) : 0;
      b.color = k.rgb(
        Math.round(lerpN(top[0], bot[0], t)),
        Math.round(lerpN(top[1], bot[1], t)),
        Math.round(lerpN(top[2], bot[2], t)),
      );
    });
  }
  setSky(0);

  // ── Sol ────────────────────────────────────────────────────────────────────
  const SUN_TOP = GROUND_Y - 150 * SC;
  const SUN_BOT = GROUND_Y -  18 * SC;
  const sun = k.add([
    k.circle(40 * SC), k.pos(SW * 0.70, SUN_TOP), k.anchor("center"),
    k.color(255, 240, 180), k.opacity(0.95), k.z(1), k.fixed(),
  ]);

  // ── Morros distantes (parallax lento) ──────────────────────────────────────
  const hills = [];
  for (let i = 0; i < 4; i++) {
    const r = k.rand(90, 150) * SC;
    hills.push(k.add([
      k.circle(r), k.pos((i / 4) * (SW + 200 * SC), GROUND_Y + r * 0.5), k.anchor("center"),
      k.color(90, 70, 120), k.opacity(0.85), k.z(1), k.fixed(),
    ]));
  }

  // ── Chão (trilha de montanha) ──────────────────────────────────────────────
  k.add([k.rect(SW, SH - GROUND_Y + 2), k.pos(0, GROUND_Y), k.color(120, 90, 60), k.z(2), k.fixed()]);
  k.add([k.rect(SW, 3 * SC), k.pos(0, GROUND_Y), k.color(150, 115, 75), k.z(3), k.fixed()]);

  // Tracinhos na superfície → dão a sensação de movimento
  const dashes = [];
  for (let i = 0; i < 16; i++) {
    dashes.push(k.add([
      k.rect(28 * SC, 5 * SC, { radius: 2 * SC }),
      k.pos(k.rand(0, SW), GROUND_Y + k.rand(14 * SC, (SH - GROUND_Y) - 10 * SC)),
      k.color(95, 70, 45), k.opacity(0.7), k.z(3), k.fixed(),
    ]));
  }

  // ── Vivi e Gigi: parados no centro/esquerda, apenas pulando ────────────────
  const VIVI_SCALE = 8, GIGI_SCALE = 2.2;   // proporção do projeto (vivi ~3.6x gigi)
  const CHAR_X = SW * 0.30;
  const vivi = k.add([
    k.sprite("vivi"), k.pos(CHAR_X, GROUND_Y), k.anchor("bot"),
    k.scale(VIVI_SCALE), k.opacity(1), k.z(6), k.fixed(),
  ]);
  vivi.play("walk-right");
  const gigi = k.add([
    k.sprite("gigi"), k.pos(CHAR_X, GROUND_Y), k.anchor("bot"),
    k.scale(GIGI_SCALE), k.opacity(1), k.z(6), k.fixed(),
  ]);
  gigi.play("walk-right");

  // Posiciona os dois lado a lado, centrados em CHAR_X
  const viviW = (vivi.width  || 10) * VIVI_SCALE;
  const viviH = (vivi.height || 10) * VIVI_SCALE;
  const gigiW = (gigi.width  || 10) * GIGI_SCALE;
  const gigiH = (gigi.height || 10) * GIGI_SCALE;
  const GAP   = 6 * SC;
  const pairW = viviW + GAP + gigiW;
  const pairH = Math.max(viviH, gigiH);
  const pairLeft = CHAR_X - pairW / 2;
  vivi.pos.x = pairLeft + viviW / 2;
  gigi.pos.x = pairLeft + viviW + GAP + gigiW / 2;

  // ── Pulo (controla os DOIS personagens ao mesmo tempo) ─────────────────────
  const GRAVITY = 2800 * SC;
  const JUMP_V  = 800  * SC;
  let vy = 0, jumpOffset = 0, onGround = true;
  function jump() {
    if (paused || gameEnded) return;
    if (onGround) { vy = JUMP_V; onGround = false; playJump(); }
  }
  k.onKeyPress("space", jump);
  k.onMousePress("left", jump);   // toque na tela (touchToMouse) e clique

  // ── Velocidade do mundo (cresce com o tempo) ───────────────────────────────
  const BASE_SPEED   = 280 * SC;
  const SPEED_GROWTH =   9 * SC;   // por segundo
  const worldSpeed = () => BASE_SPEED + elapsed * SPEED_GROWTH;

  // ── HUD: vidas (canto superior direito) ────────────────────────────────────
  const hearts = [];
  for (let i = 0; i < 3; i++) {
    hearts.push(k.add([
      k.text("❤️", { size: fs(14) }),
      k.pos(SW - 16 * SC - (2 - i) * 30 * SC, 14 * SC), k.anchor("top"),
      k.z(41), k.fixed(), "hud",
    ]));
  }
  function updateLives() {
    for (let i = 0; i < 3; i++) hearts[i].text = (i < 3 - erros) ? "❤️" : "\u{1F494}";
  }
  updateLives();

  // ── HUD: barra de progresso (canto superior esquerdo) ──────────────────────
  const PB_W = 200 * SC, PB_H = 12 * SC, PB_X = 16 * SC, PB_Y = 30 * SC;
  k.add([k.text("⛰️ Rampa do Cristo", { size: fs(7), font: "pressstart2p" }), k.pos(PB_X, 12 * SC), k.color(255, 255, 255), k.z(41), k.fixed(), "hud"]);
  k.add([k.rect(PB_W, PB_H, { radius: 3 * SC }), k.pos(PB_X, PB_Y), k.color(40, 40, 48), k.z(40), k.fixed(), "hud"]);
  const pbFill = k.add([k.rect(1, PB_H, { radius: 3 * SC }), k.pos(PB_X, PB_Y), k.color(120, 220, 120), k.z(41), k.fixed(), "hud"]);
  function updateProgress() {
    const t = Math.min(1, elapsed / SURVIVE_TIME);
    pbFill.width = Math.max(1, PB_W * t);
  }

  // ── Texto flutuante de feedback ────────────────────────────────────────────
  function floatText(x, y, txt, col) {
    const p = k.add([
      k.text(txt, { size: fs(14), font: "pressstart2p" }),
      k.pos(x, y), k.anchor("center"),
      k.color(col[0], col[1], col[2]), k.opacity(1), k.z(16), k.fixed(),
    ]);
    k.tween(y, y - 30 * SC, 0.5, v => { p.pos.y = v; });
    k.tween(1, 0, 0.5, v => { p.opacity = v; });
    k.wait(0.5, () => { if (p.exists()) p.destroy(); });
  }

  // ── Obstáculos ─────────────────────────────────────────────────────────────
  // mul = tamanho relativo à altura dos personagens (mantém proporção em qualquer tela)
  const obstacleTypes = [
    { sprite: "obs_pedra",    scale: 9,   speedMul: 1.0, sound: null,   anim: null   },
    { sprite: "obs_galho",    scale: 9,   speedMul: 1.0, sound: null,   anim: null   },
    { sprite: "obs_cachorro", scale: 7,   speedMul: 1.0, sound: "bark", anim: "run"  },
    { sprite: "obs_acai",     scale: 10, speedMul: 1.0, sound: "pop",  anim: "ride" },
    { sprite: "obs_ciclista", scale: 10,   speedMul: 1.5, sound: null,   anim: "ride" },
  ];
  function spawnObstacle() {
    const def = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const ob = k.add([
      k.sprite(def.sprite),
      k.pos(SW + 50 * SC, GROUND_Y), k.anchor("bot"),
      k.scale(def.scale),
      k.z(5), k.fixed(), "subida-ob",
      { speedMul: def.speedMul, hitDone: false },
    ]);
    if (def.anim) ob.play(def.anim);
    if (def.sound === "bark") playBark();
    if (def.sound === "pop")  playPop();
    return ob;
  }

  // ── AABB ───────────────────────────────────────────────────────────────────
  const overlap = (a, b) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  function charBox() {
    const w = pairW * 0.62, h = pairH * 0.78;          // caixa generosa (justa para o jogador)
    const bottom = GROUND_Y - jumpOffset;
    return { x: CHAR_X - w / 2, y: bottom - h, w, h };
  }
  function obBox(ob) {
  const w = ob.width  * ob.scale.x * 0.60;
  const h = ob.height * ob.scale.y * 0.4;
  return { x: ob.pos.x - w / 2, y: ob.pos.y - ob.height * ob.scale.y, w, h };
}

  function loseLife(ob) {
    erros++;
    updateLives();
    playHit();
    invulnTimer = 1.0;
    floatText(ob.pos.x, GROUND_Y - pairH * 0.7, "\u{1F4A5}", [255, 120, 80]);
    if (erros >= 3) onDeath();
  }

  // ── Derrota: mensagem cômica rápida → reinicia o minigame ──────────────────
  function onDeath() {
    if (gameEnded) return;
    gameEnded = true;
    playFail();
    k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0.5), k.z(59), k.fixed()]);
    k.add([
      k.text("Vish... \u{1F635}", { size: fs(20), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.42), k.anchor("center"),
      k.color(255, 90, 90), k.z(60), k.fixed(),
    ]);
    k.add([
      k.text("Bora de novo!", { size: fs(9), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.55), k.anchor("center"),
      k.color(255, 255, 255), k.z(60), k.fixed(),
    ]);
    k.wait(1.5, () => { k.go("subida"); });
  }

  // ── Vitória: fade suave → cena pedido ──────────────────────────────────────
  function goNext() {
    // "pedido" ainda não existe: cai no menu até a cena ser criada.
    k.go("pedido");
  }
  function onWin() {
    if (gameEnded) return;
    gameEnded = true;
    playWin();
    const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(70), k.fixed()]);
    k.tween(0, 1, 1.2, v => { fade.opacity = v; }).onEnd(() => { goNext(); });
  }

  // ── Pause (escape) ─────────────────────────────────────────────────────────
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

  // ── Introdução ─────────────────────────────────────────────────────────────
  const introBg = k.add([k.rect(SW, 78 * SC), k.pos(SW / 2, SH * 0.30), k.anchor("center"), k.color(18, 4, 32), k.opacity(0), k.z(44), k.fixed()]);
  const introTxt = k.add([
    k.text("Ajude Vivi e Gigi a subirem a\nRampa do Cristo!", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.82 }),
    k.pos(SW / 2, SH * 0.30), k.anchor("center"),
    k.color(255, 245, 255), k.opacity(0), k.z(45), k.fixed(),
  ]);
  k.tween(0, 1, 0.5, v => { introTxt.opacity = v; introBg.opacity = v * 0.7; });
  k.wait(3.5, () => {
    k.tween(1, 0, 0.5, v => { introTxt.opacity = v; introBg.opacity = v * 0.7; })
      .onEnd(() => { introTxt.destroy(); introBg.destroy(); started = true; });
  });

  // ── Loop principal ─────────────────────────────────────────────────────────
  k.onUpdate(() => {
    if (paused || gameEnded) return;
    const dt = k.dt();

    // Pulo (sincronizado nos dois)
    if (!onGround) {
      jumpOffset += vy * dt;
      vy -= GRAVITY * dt;
      if (jumpOffset <= 0) { jumpOffset = 0; vy = 0; onGround = true; }
    }
    vivi.pos.y = GROUND_Y - jumpOffset;
    gigi.pos.y = GROUND_Y - jumpOffset;

    // Piscar durante a invencibilidade
    if (invulnTimer > 0) {
      invulnTimer -= dt;
      const bl = Math.sin(k.time() * 30) > 0 ? 1 : 0.4;
      vivi.opacity = bl; gigi.opacity = bl;
    } else {
      vivi.opacity = 1; gigi.opacity = 1;
    }

    // Cenário sempre rola (mesmo durante a introdução)
    const spd = worldSpeed();
    const p = Math.min(1, elapsed / SURVIVE_TIME);
    dashes.forEach(d => {
      d.pos.x -= spd * dt;
      if (d.pos.x < -40 * SC) {
        d.pos.x = SW + k.rand(0, 60 * SC);
        d.pos.y = GROUND_Y + k.rand(14 * SC, (SH - GROUND_Y) - 10 * SC);
      }
    });
    hills.forEach(h => {
      h.pos.x -= spd * 0.25 * dt;
      if (h.pos.x < -h.radius) h.pos.x = SW + h.radius;
      h.color = k.rgb(Math.round(90 - 45 * p), Math.round(70 - 40 * p), Math.round(120 - 55 * p));
    });
    setSky(p);
    sun.pos.y  = lerpN(SUN_TOP, SUN_BOT, p);
    sun.color  = k.rgb(255, Math.round(240 - 120 * p), Math.round(180 - 130 * p));

    if (!started) return;

    // Cronômetro / progresso
    elapsed += dt;
    updateProgress();

    // Spawn de obstáculos (intervalo encurta com o tempo)
    spawnTimer += dt;
    if (spawnTimer >= nextSpawn) {
      spawnObstacle();
      spawnTimer = 0;
      nextSpawn = Math.max(0.8, k.rand(1.3, 2.1) - elapsed * 0.015);
    }

    // Move obstáculos + colisão
    const cb = charBox();
    k.get("subida-ob").forEach(ob => {
      ob.pos.x -= spd * ob.speedMul * dt;
      if (ob.pos.x < -60 * SC) { ob.destroy(); return; }
      if (!ob.hitDone && invulnTimer <= 0 && overlap(cb, obBox(ob))) {
        ob.hitDone = true;
        loseLife(ob);
      }
    });

    // Vitória
    if (elapsed >= SURVIVE_TIME) onWin();
  });
});

// ── Cena: PEDIDO – Rampa do Cristo, pôr do sol ───────────────────────────
k.scene("pedido", () => {
  // ── Constantes ────────────────────────────────────────────────────────────
  const GROUND_Y = SH * 0.62;
  let paused = false, destroyPause = null, sceneEnded = false;

  // ── Áudio – Web Audio API ─────────────────────────────────────────────────
  let actx = null;
  function ctxA() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    return actx;
  }
  function beep(freq, type, dur, vol, t0) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.value = freq;
      const st = t0 ?? c.currentTime;
      g.gain.setValueAtTime(vol * getEffectsVolume(), st);
      g.gain.exponentialRampToValueAtTime(0.001, st + dur);
      o.start(st); o.stop(st + dur);
    } catch (e) {}
  }
  function playTypingSound() { beep(800 + Math.random() * 400, "square", 0.04, 0.05); }
  function playConfirm() {
    try {
      const c = ctxA();
      [523, 659, 784, 1047].forEach((f, i) => {
        const t = c.currentTime + i * 0.14;
        beep(f, "sine", 0.3, 0.25, t);
      });
    } catch (e) {}
  }
  function playEscape() { beep(800, "sawtooth", 0.18, 0.14, null); beep(400, "sawtooth", 0.14, 0.10, null); }

  // ── Melodia romântica em loop (Can't Help Falling in Love) ────────────────
  let melodyHandle = null;
  const NOTES = [261, 330, 392, 440, 392, 330, 261];
  function playMelodyNote(idx) {
    if (sceneEnded) return;
    const freq = NOTES[idx % NOTES.length];
    beep(freq, "sine", 0.45, 0.08);
    melodyHandle = k.wait(0.52, () => playMelodyNote(idx + 1));
  }
  playMelodyNote(0);

  // ── Céu (pôr do sol fixo, p=1) ────────────────────────────────────────────
  const SKY_BANDS = 8;
  const bandH = GROUND_Y / SKY_BANDS;
  const sunTop_c = [60,  40, 110], sunBot_c = [255, 150, 60];
  for (let i = 0; i < SKY_BANDS; i++) {
    const t = SKY_BANDS > 1 ? i / (SKY_BANDS - 1) : 0;
    k.add([
      k.rect(SW, bandH + 2), k.pos(0, i * bandH),
      k.color(
        Math.round(sunTop_c[0] + (sunBot_c[0] - sunTop_c[0]) * t),
        Math.round(sunTop_c[1] + (sunBot_c[1] - sunTop_c[1]) * t),
        Math.round(sunTop_c[2] + (sunBot_c[2] - sunTop_c[2]) * t),
      ),
      k.z(0), k.fixed(),
    ]);
  }

  // ── Sol com halo e pulso ───────────────────────────────────────────────────
  const SUN_Y = GROUND_Y - 30 * SC;
  const halo = k.add([
    k.circle(62 * SC), k.pos(SW * 0.68, SUN_Y), k.anchor("center"),
    k.color(255, 200, 100), k.opacity(0.30), k.z(1), k.fixed(),
  ]);
  const sun = k.add([
    k.circle(55 * SC), k.pos(SW * 0.68, SUN_Y), k.anchor("center"),
    k.color(255, 160, 60), k.opacity(0.95), k.z(2), k.fixed(),
  ]);
  k.onUpdate(() => {
    if (sceneEnded) return;
    const r = (53 + Math.sin(k.time() * 1.5) * 2) * SC;
    sun.radius  = r;
    halo.radius = r + 8 * SC;
  });

  // ── Morros (silhueta escura) ───────────────────────────────────────────────
  [[SW * 0.10, 130], [SW * 0.30, 110], [SW * 0.55, 145], [SW * 0.80, 120]].forEach(([x, r]) => {
    k.add([
      k.circle(r * SC), k.pos(x, GROUND_Y + r * SC * 0.5), k.anchor("center"),
      k.color(40, 25, 55), k.z(1), k.fixed(),
    ]);
  });

  // ── Chão ──────────────────────────────────────────────────────────────────
  k.add([k.rect(SW, SH - GROUND_Y + 2), k.pos(0, GROUND_Y), k.color(120, 90, 60), k.z(2), k.fixed()]);
  k.add([k.rect(SW, 3 * SC), k.pos(0, GROUND_Y), k.color(150, 115, 75), k.z(3), k.fixed()]);

  // ── Estrelas sprite (padrão missao3) ──────────────────────────────────────
  const skyH = GROUND_Y;
  const starPosA = [
    { x: SW * 0.08, y: skyH * 0.08 }, { x: SW * 0.18, y: skyH * 0.24 },
    { x: SW * 0.32, y: skyH * 0.14 }, { x: SW * 0.45, y: skyH * 0.36 },
    { x: SW * 0.58, y: skyH * 0.10 }, { x: SW * 0.70, y: skyH * 0.28 },
    { x: SW * 0.82, y: skyH * 0.16 }, { x: SW * 0.92, y: skyH * 0.44 },
  ];
  starPosA.forEach(({ x, y }, i) => {
    const s = k.add([k.sprite("sprite_estrela_a"), k.pos(x, y), k.anchor("center"), k.scale(1.0), k.z(1), k.fixed()]);
    k.wait(i * 0.3, () => { s.play("blink"); });
  });

  const starPosB = [
    { x: SW * 0.12, y: skyH * 0.40 }, { x: SW * 0.27, y: skyH * 0.48 },
    { x: SW * 0.50, y: skyH * 0.52 }, { x: SW * 0.65, y: skyH * 0.44 },
    { x: SW * 0.78, y: skyH * 0.54 }, { x: SW * 0.88, y: skyH * 0.30 },
  ];
  starPosB.forEach(({ x, y }, i) => {
    const s = k.add([k.sprite("sprite_estrela_b"), k.pos(x, y), k.anchor("center"), k.scale(0.8), k.z(1), k.fixed()]);
    k.wait(i * 0.25, () => { s.play("blink"); });
  });

  const starPosC = [
    { x: SW * 0.22, y: skyH * 0.12 }, { x: SW * 0.42, y: skyH * 0.24 },
    { x: SW * 0.62, y: skyH * 0.18 }, { x: SW * 0.85, y: skyH * 0.40 },
  ];
  starPosC.forEach(({ x, y }, i) => {
    const s = k.add([k.sprite("sprite_estrela_c"), k.pos(x, y), k.anchor("center"), k.scale(1.2), k.z(1), k.fixed()]);
    k.wait(i * 0.35, () => { s.play("blink"); });
  });

  // ── Estrelinhas ★ (aparecem gradualmente com o diálogo) ───────────────────
  const STAR_POSITIONS = [
    [SW * 0.08, SH * 0.06], [SW * 0.22, SH * 0.12], [SW * 0.40, SH * 0.05],
    [SW * 0.58, SH * 0.10], [SW * 0.72, SH * 0.04], [SW * 0.85, SH * 0.15],
    [SW * 0.15, SH * 0.22], [SW * 0.92, SH * 0.08],
  ];
  const stars = STAR_POSITIONS.map((pos, i) => {
    const s = k.add([
      k.text("★", { size: fs(10) }),
      k.pos(pos[0], pos[1]), k.anchor("center"),
      k.color(255, 240, 180), k.opacity(0), k.z(1), k.fixed(),
    ]);
    s.onUpdate(() => {
      if (s.opacity > 0) s.opacity = Math.max(s.opacity, 0.4 + Math.sin(k.time() * 2 + i) * 0.35);
    });
    return s;
  });
  let starsRevealed = 0;
  function revealNextStars() {
    const toReveal = Math.min(2, stars.length - starsRevealed);
    for (let i = 0; i < toReveal; i++) {
      const s = stars[starsRevealed + i];
      k.tween(0, 0.75, 1.2, v => { s.opacity = v; });
    }
    starsRevealed += toReveal;
  }

  // ── Personagens ───────────────────────────────────────────────────────────
  const VIVI_X = SW * 0.45, GIGI_X = SW * 0.52;
  const vivi = k.add([
    k.sprite("vivi"), k.pos(VIVI_X, GROUND_Y), k.anchor("bot"),
    k.scale(9), k.z(6), k.fixed(),
  ]);
  vivi.play("idle-right");

  const gigi = k.add([
    k.sprite("gigi"), k.pos(GIGI_X, GROUND_Y), k.anchor("bot"),
    k.scale(2.2), k.z(6), k.fixed(),
  ]);
  gigi.play("idle-left");

  // ── Tremor de nervosismo em Vivi ──────────────────────────────────────────
  let viviShaking = true;
  let viviBaseX = VIVI_X;
  k.onUpdate(() => {
    if (viviShaking) vivi.pos.x = viviBaseX + k.rand(-0.4, 0.4) * SC;
  });

  // ── Suor flutuante ────────────────────────────────────────────────────────
  let sweatActive = true;
  k.loop(1.1, () => {
    if (!sweatActive) return;
    const sw = k.add([
      k.text("💧", { size: fs(9) }),
      k.pos(VIVI_X + k.rand(-14, 14) * SC, GROUND_Y - 20 * SC), k.anchor("center"),
      k.opacity(1), k.z(8), k.fixed(),
    ]);
    k.tween(sw.pos.y, sw.pos.y - 28 * SC, 0.8, v => { sw.pos.y = v; });
    k.tween(1, 0, 0.8, v => { sw.opacity = v; });
    k.wait(0.85, () => { if (sw.exists()) sw.destroy(); });
  });

  // ── Texto flutuante genérico ──────────────────────────────────────────────
  function floatMsg(txt, col) {
    const p = k.add([
      k.text(txt, { size: fs(9), font: "pressstart2p", align: "center", width: 300 * SC }),
      k.pos(SW / 2, SH * 0.34), k.anchor("center"),
      k.color(col[0], col[1], col[2]), k.opacity(1), k.z(50), k.fixed(),
    ]);
    k.tween(SH * 0.34, SH * 0.28, 0.7, v => { p.pos.y = v; });
    k.tween(1, 0, 0.9, v => { p.opacity = v; });
    k.wait(0.95, () => { if (p.exists()) p.destroy(); });
  }

  // ── Caixa de diálogo (padrão missao3/4) ──────────────────────────────────
  const DW = 460 * SC, DH = 100 * SC;
  const DY = SH - DH / 2 - 12 * SC;
  const PORTRAIT_CX = SW / 2 - DW / 2 + 50 * SC;
  const TEXT_X      = SW / 2 - DW / 2 + 100 * SC;

  const dBorder = k.add([k.rect(DW + 4 * SC, DH + 4 * SC, { radius: 12 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(255, 105, 180), k.opacity(0.92), k.z(29), k.fixed()]);
  const dBg     = k.add([k.rect(DW, DH, { radius: 10 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(18, 4, 32), k.opacity(0.92), k.z(30), k.fixed()]);
  const pBorder = k.add([k.rect(84 * SC, 84 * SC, { radius: 4 * SC }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.color(255, 105, 180), k.z(31), k.fixed()]);
  const pFill   = k.add([k.rect(80 * SC, 80 * SC, { radius: 3 * SC }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.color(30, 8, 48), k.z(32), k.fixed()]);
  const pScaleVivi = (80 * SC * 0.7) / 16;
  const pScaleGigi = (80 * SC * 0.20) / 16;
  const pVivi   = k.add([k.sprite("vivi", { frame: 0 }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.scale(pScaleVivi), k.z(33), k.fixed()]);
  const pGigi   = k.add([k.sprite("gigi", { frame: 0 }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.scale(pScaleGigi), k.z(33), k.fixed()]);
  const dName   = k.add([k.text("", { size: fs(8), font: "pressstart2p" }), k.pos(TEXT_X, DY - DH / 2 + 14 * SC), k.color(255, 105, 180), k.z(34), k.fixed()]);
  const dText   = k.add([k.text("", { size: fs(7), font: "pressstart2p", width: DW - 110 * SC, align: "left" }), k.pos(TEXT_X, DY - DH / 2 + 30 * SC), k.color(255, 245, 255), k.z(34), k.fixed()]);
  const dArrow  = k.add([k.text("▼", { size: fs(8), font: "pressstart2p" }), k.pos(SW / 2 + DW / 2 - 16 * SC, DY + DH / 2 - 14 * SC), k.color(255, 255, 255), k.opacity(0), k.z(34), k.fixed()]);
  const dialogBox = [dBorder, dBg, pBorder, pFill, pVivi, pGigi, dName, dText, dArrow];
  let dialogActive = false;

  function setDialogVisible(v) {
    dialogBox.forEach((o, i) => { o.hidden = !v; });
    dialogActive = v;
  }
  setDialogVisible(false);

  // ── Sistema de digitação ──────────────────────────────────────────────────
  let fullText = "", charIdx = 0, typingDone = false, typingHandle = null;
  let arrowVisible = false, arrowTimer = 0;

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

  k.onUpdate(() => {
    if (arrowVisible) {
      arrowTimer += k.dt();
      dArrow.opacity = Math.sin(arrowTimer * 6) > 0 ? 1 : 0;
    }
  });

  // ── Dados dos diálogos ────────────────────────────────────────────────────
  const dialogs = [
    { speaker: "vivi", name: "Vivi",     text: "O por do sol ta muito lindo ne" },
    { speaker: "gigi", name: "Giovanna", text: "sim..." },
    { speaker: "vivi", name: "Vivi",     text: "Gi." },
    { speaker: "gigi", name: "Giovanna", text: "Oi?" },
    { speaker: "vivi", name: "Vivi",     text: "Deixa eu te fazer uma pergunta." },
    { speaker: "gigi", name: "Giovanna", text: ". . ." },
  ];
  let dialogIndex = 0, dialogDone = false;
  let dialogHandlers = [];

  function showDialog(i) {
    const d = dialogs[i];
    // Revelar estrelas a cada 2 falas
    if (i > 0 && i % 2 === 0) revealNextStars();
    // Vivi vira para Gigi na fala "Gi."
    if (d.text === "Gi.") { viviShaking = false; vivi.pos.x = viviBaseX; vivi.play("idle-right"); }
    // Parar suor a partir da pergunta
    if (d.text === "Deixa eu te fazer uma pergunta.") sweatActive = false;
    dName.text = d.name;
    setDialogVisible(true);
    pVivi.hidden = d.speaker !== "vivi";
    pGigi.hidden = d.speaker !== "gigi";
    typeText(d.text);
  }

  function advanceDialog() {
    if (paused || dialogDone || !dialogActive) return;
    if (!typingDone) {
      if (typingHandle) { typingHandle.cancel(); typingHandle = null; }
      dText.text = fullText; typingDone = true; arrowVisible = true;
      return;
    }
    arrowVisible = false; arrowTimer = 0; dArrow.opacity = 0;
    dialogIndex++;
    if (dialogIndex >= dialogs.length) {
      dialogDone = true;
      dialogHandlers.forEach(h => h.cancel());
      // Fade out da caixa
      dialogBox.forEach(o => k.tween(o.opacity ?? 1, 0, 0.4, v => { o.opacity = v; }));
      k.wait(0.45, () => { dialogBox.forEach(o => { if (o.exists()) o.destroy(); }); });
      k.wait(1.05, showProposa);
    } else {
      showDialog(dialogIndex);
    }
  }

  const h1 = k.onKeyPress("space",  advanceDialog);
  const h2 = k.onKeyPress("return", advanceDialog);
  const h3 = k.onClick(advanceDialog);
  dialogHandlers = [h1, h2, h3];

  // Inicia o diálogo após um pequeno delay
  k.wait(0.5, () => { showDialog(0); });

  // ── Pause ─────────────────────────────────────────────────────────────────
  k.onKeyPress("escape", () => {
    if (sceneEnded) return;
    if (paused) {
      if (destroyPause) { destroyPause(); destroyPause = null; }
      paused = false;
    } else {
      paused = true;
      destroyPause = makePauseOverlay(() => { paused = false; destroyPause = null; });
    }
  });

  // ── A Pergunta ────────────────────────────────────────────────────────────
  function showProposa() {
    // Última revelação de estrelas
    while (starsRevealed < stars.length) revealNextStars();

    const PROP_Y1 = SH * 0.36, PROP_Y2 = SH * 0.48;
    const mkShadow = (txt, y, size) => k.add([
      k.text(txt, { size: fs(size), font: "pressstart2p", align: "center", width: SW * 0.85 }),
      k.pos(SW / 2 + 2 * SC, y + 2 * SC), k.anchor("center"),
      k.color(0, 0, 0), k.opacity(0), k.z(38), k.fixed(),
    ]);
    const mkLabel = (txt, y, size, col) => k.add([
      k.text(txt, { size: fs(size), font: "pressstart2p", align: "center", width: SW * 0.85 }),
      k.pos(SW / 2, y), k.anchor("center"),
      k.color(col[0], col[1], col[2]), k.opacity(0), k.z(39), k.fixed(),
    ]);

    const sh1 = mkShadow("Giovanna,", PROP_Y1, 13);
    const lb1 = mkLabel ("Giovanna,", PROP_Y1, 13, [255, 255, 255]);

    // Digita linha 1
    let c1 = 0, full1 = "Giovanna,";
    sh1.text = ""; lb1.text = "";
    sh1.opacity = 1; lb1.opacity = 1;
    function typeLine1() {
      if (c1 >= full1.length) { k.wait(0.8, typeLine2); return; }
      sh1.text = full1.slice(0, c1 + 1);
      lb1.text = full1.slice(0, c1 + 1);
      playTypingSound(); c1++;
      k.wait(0.05, typeLine1);
    }
    typeLine1();

    const sh2 = mkShadow("voce quer namorar comigo?", PROP_Y2, 11);
    const lb2 = mkLabel ("voce quer namorar comigo?", PROP_Y2, 11, [255, 255, 255]);
    sh2.text = ""; lb2.text = "";
    sh2.opacity = 0; lb2.opacity = 0;

    function typeLine2() {
      sh2.opacity = 1; lb2.opacity = 1;
      let c2 = 0; const full2 = "voce quer namorar comigo?";
      function step() {
        if (c2 >= full2.length) { k.wait(0.5, showButtons.bind(null, lb1, sh1, lb2, sh2)); return; }
        sh2.text = full2.slice(0, c2 + 1);
        lb2.text = full2.slice(0, c2 + 1);
        playTypingSound(); c2++;
        k.wait(0.045, step);
      }
      step();
    }

    function showButtons(l1, s1, l2, s2) {
      // Botão SIM
      const simBtn = k.add([k.rect(140 * SC, 50 * SC, { radius: 10 * SC }), k.pos(SW / 2 - 90 * SC, SH * 0.64), k.anchor("center"), k.color(60, 180, 80), k.scale(0), k.area(), k.z(40), k.fixed()]);
      const simLbl = k.add([k.text("SIM", { size: fs(11), font: "pressstart2p", align: "center" }), k.pos(SW / 2 - 90 * SC, SH * 0.64), k.anchor("center"), k.color(255, 255, 255), k.scale(0), k.z(41), k.fixed()]);
      k.tween(0, 1, 0.25, v => { simBtn.scale.x = v; simBtn.scale.y = v; simLbl.scale.x = v; simLbl.scale.y = v; });

      // Botão NÃO
      let naoClicks = 0;
      const naoBtn = k.add([k.rect(140 * SC, 50 * SC, { radius: 10 * SC }), k.pos(SW / 2 + 90 * SC, SH * 0.64), k.anchor("center"), k.color(200, 60, 60), k.scale(0), k.area(), k.z(40), k.fixed()]);
      const naoLbl = k.add([k.text("NÃO", { size: fs(11), font: "pressstart2p", align: "center" }), k.pos(SW / 2 + 90 * SC, SH * 0.64), k.anchor("center"), k.color(255, 255, 255), k.scale(0), k.z(41), k.fixed()]);
      k.wait(0.1, () => {
        k.tween(0, 1, 0.25, v => { naoBtn.scale.x = v; naoBtn.scale.y = v; naoLbl.scale.x = v; naoLbl.scale.y = v; });
      });

      simBtn.onHover(() => { simBtn.color = k.rgb(80, 210, 100); document.body.style.cursor = "pointer"; });
      simBtn.onHoverEnd(() => { simBtn.color = k.rgb(60, 180, 80); document.body.style.cursor = "default"; });

      naoBtn.onHover(() => { naoBtn.color = k.rgb(230, 80, 80); document.body.style.cursor = "pointer"; });
      naoBtn.onHoverEnd(() => { naoBtn.color = k.rgb(200, 60, 60); document.body.style.cursor = "default"; });

      const MARGIN = 40 * SC;
      const naoMsgs  = ["Tem certeza...?", "Pensa bem...", "Realmente???", "Nao faz isso...", "Socorro!", "Para!!!", "Nao é assim!", "Por favor...", "NAOOOOO"];
      const btnLabels = ["NAO", "Certeza?", "Hmm...", "Nao...", "Nao!", "PARA!", "NAO!!!", "POR FAVOR", "NAOOOOO"];

      function safeNaoPos() {
        const bx = k.rand(MARGIN, SW - MARGIN - naoBtn.width * naoBtn.scale.x);
        const by = k.rand(MARGIN, SH - MARGIN - naoBtn.height * naoBtn.scale.y);
        // evita sobrepor o SIM
        if (Math.abs(bx - simBtn.pos.x) < 120 * SC && Math.abs(by - simBtn.pos.y) < 60 * SC) return safeNaoPos();
        return { x: bx, y: by };
      }

      naoBtn.onClick(() => {
        naoClicks++;
        const msgIdx = Math.min(naoClicks - 1, naoMsgs.length - 1);
        floatMsg(naoMsgs[msgIdx], [255, 220, 80]);
        naoLbl.text = btnLabels[Math.min(naoClicks, btnLabels.length - 1)];

        if (naoClicks >= 3) playEscape();

        const pos = safeNaoPos();
        if (naoClicks <= 4) {
          const dur = [0.6, 0.5, 0.35, 0.25][naoClicks - 1] ?? 0.25;
          if (naoClicks === 2) naoBtn.angle = 180;
          if (naoClicks === 3) { naoBtn.scale.x = 0.85; naoBtn.scale.y = 0.85; naoLbl.scale.x = 0.85; naoLbl.scale.y = 0.85; }
          if (naoClicks === 4) {
            let blinks = 0;
            const bl = k.loop(0.08, () => { naoBtn.hidden = !naoBtn.hidden; naoLbl.hidden = !naoLbl.hidden; if (++blinks >= 6) { bl.cancel(); naoBtn.hidden = false; naoLbl.hidden = false; k.tween(naoBtn.pos.x, pos.x, dur, v => { naoBtn.pos.x = v; naoLbl.pos.x = v; }); k.tween(naoBtn.pos.y, pos.y, dur, v => { naoBtn.pos.y = v; naoLbl.pos.y = v; }); } });
            return;
          }
          k.tween(naoBtn.pos.x, pos.x, dur, v => { naoBtn.pos.x = v; naoLbl.pos.x = v; });
          k.tween(naoBtn.pos.y, pos.y, dur, v => { naoBtn.pos.y = v; naoLbl.pos.y = v; });
        } else {
          // Teleporte caótico
          const ang = k.rand(-45, 45);
          const sc  = k.rand(0.5, 0.8);
          naoBtn.pos.x = pos.x; naoBtn.pos.y = pos.y;
          naoLbl.pos.x = pos.x; naoLbl.pos.y = pos.y;
          naoBtn.angle = ang;   naoLbl.angle = ang;
          naoBtn.scale.x = sc;  naoBtn.scale.y = sc;
          naoLbl.scale.x = sc;  naoLbl.scale.y = sc;
        }
      });

      // ── Confirmar SIM ────────────────────────────────────────────────────
      simBtn.onClick(() => {
        document.body.style.cursor = "default";
        sceneEnded = true;
        if (melodyHandle) melodyHandle.cancel();
        playConfirm();

        // Esconde NÃO
        naoBtn.destroy(); naoLbl.destroy();

        // SIM cresce e some
        k.tween(1, 1.3, 0.3, v => { simBtn.scale.x = v; simBtn.scale.y = v; simLbl.scale.x = v; simLbl.scale.y = v; });
        k.wait(0.32, () => k.tween(1, 0, 0.3, v => { simBtn.opacity = v; simLbl.opacity = v; }));

        // Pergunta some
        [l1, s1, l2, s2].forEach(o => { if (o.exists()) k.tween(1, 0, 0.4, v => { o.opacity = v; }); });

        // Personagens se olham
        vivi.play("idle-right"); gigi.play("idle-left");

        // Partículas de coração
        const EMOJIS = ["💛", "❤️", "✨"];
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2 + k.rand(-0.3, 0.3);
          const speed = k.rand(80, 160) * SC;
          const p = k.add([
            k.text(EMOJIS[i % EMOJIS.length], { size: fs(k.rand(10, 18)) }),
            k.pos(SW / 2, SH * 0.55), k.anchor("center"),
            k.opacity(1), k.z(50), k.fixed(),
            { vx: Math.cos(angle) * speed, vy: -Math.abs(Math.sin(angle) * speed) - 30 * SC },
          ]);
          p.onUpdate(() => {
            p.pos.x += p.vx * k.dt();
            p.pos.y += p.vy * k.dt();
            p.vy    += 120 * SC * k.dt();
          });
          k.tween(1, 0, 1.2, v => { p.opacity = v; });
          k.wait(1.25, () => { if (p.exists()) p.destroy(); });
        }

        // Fade e transição
        k.wait(1.5, () => {
          const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(70), k.fixed()]);
          k.tween(0, 1, 1.0, v => { fade.opacity = v; }).onEnd(() => {
            try { k.go("fogos"); } catch (e) { k.go("menu"); }
          });
        });
      });
    }
  }
});

// ── Cena: FOGOS – celebração do SIM ─────────────────────────────────────
k.scene("fogos", () => {
  const GROUND_Y = SH * 0.62;
  let paused = false, destroyPause = null, sceneEnded = false;
  let canContinue = false;   // libera input de saída após 18s

  // ── Áudio ────────────────────────────────────────────────────────────────
  let actx = null;
  function ctxA() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    return actx;
  }
  function beep(freq, type, dur, vol, t0) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.value = freq;
      const st = t0 ?? c.currentTime;
      g.gain.setValueAtTime(vol * getEffectsVolume(), st);
      g.gain.exponentialRampToValueAtTime(0.001, st + dur);
      o.start(st); o.stop(st + dur);
    } catch (e) {}
  }

  // Som de explosão: ruído via buffers + pitch descendente
  function playBoom() {
    try {
      const c = ctxA();
      // pitch descendente
      const o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = "sawtooth";
      const baseF = k.rand(200, 600);
      o.frequency.setValueAtTime(baseF, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(30, c.currentTime + 0.25);
      g.gain.setValueAtTime(0.15 * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25);
      o.start(); o.stop(c.currentTime + 0.25);
      // noise burst
      const bufSize = c.sampleRate * 0.12;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource(), ng = c.createGain();
      src.buffer = buf; src.connect(ng); ng.connect(c.destination);
      ng.gain.setValueAtTime(0.12 * getEffectsVolume(), c.currentTime);
      ng.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
      src.start();
    } catch (e) {}
  }

  // Melodia eufórica em loop (sequência suave ascendente)
  let melodyHandle = null;
  const MEL = [523, 659, 784, 880, 1047, 880, 784, 659, 523, 392, 440, 523];
  function playMel(i) {
    if (sceneEnded) return;
    beep(MEL[i % MEL.length], "sine", 0.38, 0.07);
    melodyHandle = k.wait(0.42, () => playMel(i + 1));
  }
  playMel(0);

  // ── Céu (pôr do sol, p=1, igual à cena pedido) ───────────────────────────
  const SKY_BANDS = 8;
  const bandH = GROUND_Y / SKY_BANDS;
  const sunTop_c = [60, 40, 110], sunBot_c = [255, 150, 60];
  for (let i = 0; i < SKY_BANDS; i++) {
    const t = i / (SKY_BANDS - 1);
    k.add([
      k.rect(SW, bandH + 2), k.pos(0, i * bandH),
      k.color(
        Math.round(sunTop_c[0] + (sunBot_c[0] - sunTop_c[0]) * t),
        Math.round(sunTop_c[1] + (sunBot_c[1] - sunTop_c[1]) * t),
        Math.round(sunTop_c[2] + (sunBot_c[2] - sunTop_c[2]) * t),
      ),
      k.z(0), k.fixed(),
    ]);
  }

  // Sol
  const SUN_Y = GROUND_Y - 30 * SC;
  const halo = k.add([k.circle(62 * SC), k.pos(SW * 0.68, SUN_Y), k.anchor("center"), k.color(255, 200, 100), k.opacity(0.30), k.z(1), k.fixed()]);
  const sun  = k.add([k.circle(55 * SC), k.pos(SW * 0.68, SUN_Y), k.anchor("center"), k.color(255, 160, 60),  k.opacity(0.95), k.z(2), k.fixed()]);
  k.onUpdate(() => {
    if (sceneEnded) return;
    const r = (53 + Math.sin(k.time() * 1.5) * 2) * SC;
    sun.radius = r; halo.radius = r + 8 * SC;
  });

  // Morros
  [[SW * 0.10, 130], [SW * 0.30, 110], [SW * 0.55, 145], [SW * 0.80, 120]].forEach(([x, r]) => {
    k.add([k.circle(r * SC), k.pos(x, GROUND_Y + r * SC * 0.5), k.anchor("center"), k.color(40, 25, 55), k.z(1), k.fixed()]);
  });

  // Chão
  k.add([k.rect(SW, SH - GROUND_Y + 2), k.pos(0, GROUND_Y), k.color(120, 90, 60), k.z(2), k.fixed()]);
  k.add([k.rect(SW, 3 * SC), k.pos(0, GROUND_Y), k.color(150, 115, 75), k.z(3), k.fixed()]);

  // Estrelas sprite (todas visíveis desde o início, opacity=1)
  const skyH = GROUND_Y;
  [
    { spr: "sprite_estrela_a", scale: 1.0, delay: 0.3,  pos: [
      [SW*0.08,skyH*0.08],[SW*0.18,skyH*0.24],[SW*0.32,skyH*0.14],[SW*0.45,skyH*0.36],
      [SW*0.58,skyH*0.10],[SW*0.70,skyH*0.28],[SW*0.82,skyH*0.16],[SW*0.92,skyH*0.44],
    ]},
    { spr: "sprite_estrela_b", scale: 0.8, delay: 0.25, pos: [
      [SW*0.12,skyH*0.40],[SW*0.27,skyH*0.48],[SW*0.50,skyH*0.52],
      [SW*0.65,skyH*0.44],[SW*0.78,skyH*0.54],[SW*0.88,skyH*0.30],
    ]},
    { spr: "sprite_estrela_c", scale: 1.2, delay: 0.35, pos: [
      [SW*0.22,skyH*0.12],[SW*0.42,skyH*0.24],[SW*0.62,skyH*0.18],[SW*0.85,skyH*0.40],
    ]},
  ].forEach(({ spr, scale, delay, pos }) => {
    pos.forEach(([x, y], i) => {
      const s = k.add([k.sprite(spr), k.pos(x, y), k.anchor("center"), k.scale(scale), k.opacity(1), k.z(1), k.fixed()]);
      k.wait(i * delay, () => { s.play("blink"); });
    });
  });

  // ── Personagens ───────────────────────────────────────────────────────────
  const VIVI_X = SW * 0.46, GIGI_X = SW * 0.52;
  const vivi = k.add([k.sprite("vivi"), k.pos(VIVI_X, GROUND_Y), k.anchor("bot"), k.scale(9), k.z(6), k.fixed()]);
  vivi.play("idle-right");
  const gigi = k.add([k.sprite("gigi"), k.pos(GIGI_X, GROUND_Y), k.anchor("bot"), k.scale(2.2), k.z(6), k.fixed()]);
  gigi.play("idle-left");

  // Coraçãozinho flutuando entre eles a cada 1s
  function spawnHeart() {
    if (sceneEnded) return;
    const h = k.add([ 
      k.text("❤️", { size: fs(14) }),
      k.pos((VIVI_X + GIGI_X) / 2, GROUND_Y - 60 * SC), k.anchor("center"),
      k.opacity(1), k.z(8), k.fixed(),
    ]);
    k.tween(h.pos.y, h.pos.y - 50 * SC, 1.0, v => { h.pos.y = v; });
    k.tween(1, 0, 1.0, v => { h.opacity = v; });
    k.wait(1.05, () => { if (h.exists()) h.destroy(); });
  }
  k.wait(1.0, () => {
    spawnHeart();
    k.loop(2.0, () => { spawnHeart(); });
  });

  // ── Sistema de fogos de artifício ─────────────────────────────────────────
  const PALETA = [
    [255, 220,  50],   // dourado
    [255, 100, 180],   // rosa
    [ 80, 220, 255],   // ciano
    [100, 255, 120],   // verde
    [255, 255, 255],   // branco
    [255, 160,  50],   // laranja
  ];

  function explode(x, y, cor, sizeMul) {
    const count = Math.round(k.rand(18, 28) * sizeMul);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + k.rand(-0.2, 0.2);
      const spd   = k.rand(60, 180) * SC * sizeMul;
      const dur   = k.rand(0.6, 1.2);
      const isStar = Math.random() < 0.20;
      let p;
      if (isStar) {
        p = k.add([
          k.text("★", { size: fs(8) }),
          k.pos(x, y), k.anchor("center"),
          k.color(cor[0], cor[1], cor[2]), k.opacity(1), k.z(14), k.fixed(),
          { vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd, rot: k.rand(1, 3) * (Math.random() < 0.5 ? 1 : -1) },
        ]);
      } else {
        p = k.add([
          k.rect(4 * SC, 4 * SC, { radius: 1 * SC }),
          k.pos(x, y), k.anchor("center"),
          k.color(cor[0], cor[1], cor[2]), k.opacity(1), k.z(14), k.fixed(),
          { vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd, rot: k.rand(1, 3) * (Math.random() < 0.5 ? 1 : -1) },
        ]);
      }
      p.onUpdate(() => {
        p.pos.x += p.vx * k.dt();
        p.pos.y += p.vy * k.dt();
        p.vy    += 80 * SC * k.dt();   // gravidade leve
        p.angle += p.rot;
      });
      k.tween(1, 0, dur, v => { p.opacity = v; });
      k.wait(dur + 0.05, () => { if (p.exists()) p.destroy(); });
    }
  }

  function launchRocket() {
    if (sceneEnded || paused) return;
    const rx      = k.rand(SW * 0.05, SW * 0.95);
    const targetY = k.rand(SH * 0.08, SH * 0.50);
    const cor     = PALETA[Math.floor(Math.random() * PALETA.length)];
    const spd     = (SH - targetY) / k.rand(0.5, 0.9);  // pixels por segundo

    // Foguete move via onUpdate — sem loop aninhado
    const rocket = k.add([
      k.rect(4 * SC, 6 * SC, { radius: 1 * SC }),
      k.pos(rx, SH), k.anchor("bot"),
      k.color(255, 230, 160), k.opacity(1), k.z(13), k.fixed(),
      { trailTimer: 0, spd, targetY, cor, done: false },
    ]);

    rocket.onUpdate(() => {
      if (rocket.done) return;
      rocket.pos.y -= rocket.spd * k.dt();

      // Rastro segue a posição atual do foguete
      rocket.trailTimer += k.dt();
      if (rocket.trailTimer >= 0.045) {
        rocket.trailTimer = 0;
        const tr = k.add([
          k.rect(3 * SC, 3 * SC, { radius: 1 * SC }),
          k.pos(rocket.pos.x, rocket.pos.y + 4 * SC), k.anchor("center"),
          k.color(255, 200, 100), k.opacity(0.65), k.z(12), k.fixed(),
        ]);
        k.tween(0.65, 0, 0.14, v => { if (tr.exists()) tr.opacity = v; });
        k.wait(0.15, () => { if (tr.exists()) tr.destroy(); });
      }

      // Chegou ao alvo: explode e se destrói
      if (rocket.pos.y <= rocket.targetY) {
        rocket.done = true;
        const px = rocket.pos.x, py = rocket.pos.y;
        const rCor = rocket.cor;
        if (rocket.exists()) rocket.destroy();
        playBoom();
        explode(px, py, rCor, 1.0);
        if (Math.random() < 0.30) {
          k.wait(0.15, () => { explode(px + k.rand(-20, 20) * SC, py + k.rand(-15, 15) * SC, rCor, 0.55); });
        }
      }
    });
  }

  // Spawn de foguetes em loop com intervalo fixo — cancela após 18s
  const rocketLoop = k.loop(0.8, () => { launchRocket(); });

  // ── Texto comemorativo ────────────────────────────────────────────────────
  const simShad = k.add([
    k.text("SIM!!!", { size: fs(20), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH * 0.22 + 2 * SC), k.anchor("center"),
    k.color(0, 0, 0), k.opacity(0), k.scale(1), k.z(16), k.fixed(),
  ]);
  const simLbl = k.add([
    k.text("SIM!!!", { size: fs(20), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH * 0.22), k.anchor("center"),
    k.color(255, 220, 50), k.opacity(0), k.scale(1), k.z(17), k.fixed(),
  ]);
  k.wait(1.0, () => {
    simShad.opacity = 1; simLbl.opacity = 1;
    simLbl.scale.x = 0; simLbl.scale.y = 0;
    simShad.scale.x = 0; simShad.scale.y = 0;
    k.tween(0, 1.2, 0.2, v => { simLbl.scale.x = v; simLbl.scale.y = v; simShad.scale.x = v; simShad.scale.y = v; });
    k.wait(0.22, () => k.tween(1.2, 1.0, 0.12, v => { simLbl.scale.x = v; simLbl.scale.y = v; simShad.scale.x = v; simShad.scale.y = v; }));
  });

  const dateShad = k.add([
    k.text("28 de junho de 2022", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH * 0.30 + 2 * SC), k.anchor("center"),
    k.color(0, 0, 0), k.opacity(0), k.scale(1), k.z(16), k.fixed(),
  ]);
  const dateLbl = k.add([
    k.text("28 de junho de 2022", { size: fs(9), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH * 0.30), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0), k.scale(1), k.z(17), k.fixed(),
  ]);
  k.wait(1.8, () => { dateShad.opacity = 1; dateLbl.opacity = 1; });

  // Pulso suave nos textos
  k.onUpdate(() => {
    if (simLbl.opacity < 0.5) return;
    const p = 1.0 + Math.sin(k.time() * 2) * 0.04;
    simLbl.scale.x = p; simLbl.scale.y = p;
    simShad.scale.x = p; simShad.scale.y = p;
    dateLbl.scale.x = p; dateLbl.scale.y = p;
    dateShad.scale.x = p; dateShad.scale.y = p;
  });

  // ── Prompt de saída após 12s ──────────────────────────────────────────────
  let promptVisible = false;
  const contShad = k.add([
    k.text("Toque para continuar...", { size: fs(8), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH * 0.88 + 2 * SC), k.anchor("center"),
    k.color(0, 0, 0), k.opacity(0), k.z(16), k.fixed(),
  ]);
  const contLbl = k.add([
    k.text("Toque para continuar...", { size: fs(8), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2, SH * 0.88), k.anchor("center"),
    k.color(255, 255, 255), k.opacity(0), k.z(17), k.fixed(),
  ]);
  k.wait(18, () => {
    rocketLoop.cancel();
    canContinue = true;
    promptVisible = true;
  });
  k.onUpdate(() => {
    if (!promptVisible) return;
    const op = 0.5 + Math.sin(k.time() * 4) * 0.5;
    contLbl.opacity = op; contShad.opacity = op * 0.7;
  });

  function goNext() {
    if (!canContinue || sceneEnded) return;
    sceneEnded = true;
    if (melodyHandle) melodyHandle.cancel();
    promptVisible = false;
    const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(70), k.fixed()]);
    k.tween(0, 1, 1.0, v => { fade.opacity = v; }).onEnd(() => {
      k.go("dialogo_batalha");
    });
  }

  k.onKeyPress("space",  goNext);
  k.onKeyPress("return", goNext);
  k.onMousePress("left", goNext);

  // ── Pause ─────────────────────────────────────────────────────────────────
  k.onKeyPress("escape", () => {
    if (sceneEnded) return;
    if (paused) {
      if (destroyPause) { destroyPause(); destroyPause = null; }
      paused = false;
    } else {
      paused = true;
      destroyPause = makePauseOverlay(() => { paused = false; destroyPause = null; });
    }
  });
});

// ── Cena: DIÁLOGO ANTES DA BATALHA ───────────────────────────────────────
k.scene("dialogo_batalha", () => {
  let dialogIndex = 0, dialogActive = false;

  // fundo de grama
  const TILE = 16, TSCALE = 2, TSIZE = TILE * TSCALE;
  const COLS = Math.ceil(SW / TSIZE) + 1, ROWS = Math.ceil(SH / TSIZE) + 1;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      k.add([k.sprite(Math.random() < 0.12 ? "flower" : "grass"), k.pos(c * TSIZE, r * TSIZE), k.scale(TSCALE), k.z(0)]);

  // fade de entrada
  const entryFade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(1), k.z(60), k.fixed()]);
  k.tween(1, 0, 1.0, v => { entryFade.opacity = v; }).onEnd(() => { if (entryFade.exists()) entryFade.destroy(); });

  // personagens frente a frente
  const CHAR_Y = SH * 0.50;
  const vivi = k.add([k.sprite("vivi"), k.pos(SW * 0.20, CHAR_Y), k.anchor("center"), k.scale(8.5), k.z(5), k.fixed()]);
  vivi.play("idle-right");
  const gigi = k.add([k.sprite("gigi"), k.pos(SW * 0.80, CHAR_Y), k.anchor("center"), k.scale(2.2), k.z(4), k.fixed()]);
  gigi.play("idle-left");

  // áudio de digitação
  let actx = null;
  function ctxA() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); return actx; }
  function beep(freq, type, dur, vol) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.start(); o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  function playTypingSound() { beep(800 + Math.random() * 400, "square", 0.04, 0.05); }

  // caixa de diálogo
  const DW = 460 * SC, DH = 100 * SC;
  const DY = SH - DH / 2 - 10 * SC;
  const PORTRAIT_CX = SW / 2 - DW / 2 + 50 * SC;
  const TEXT_X      = SW / 2 - DW / 2 + 100 * SC;

  const dlgBorder = k.add([k.rect(DW + 4 * SC, DH + 4 * SC, { radius: 12 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(255, 105, 180), k.opacity(0.92), k.z(29), k.fixed()]);
  const dlgBg     = k.add([k.rect(DW, DH, { radius: 10 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(18, 4, 32), k.opacity(0.92), k.z(30), k.fixed()]);
  const prtBorder = k.add([k.rect(84 * SC, 84 * SC, { radius: 4 * SC }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.color(255, 105, 180), k.z(31), k.fixed()]);
  const prtFill   = k.add([k.rect(80 * SC, 80 * SC, { radius: 3 * SC }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.color(30, 8, 48), k.z(32), k.fixed()]);
  const pScaleV   = (80 * SC * 0.7) / 16;
  const pScaleG   = (80 * SC * 0.20) / 16;
  const prtVivi   = k.add([k.sprite("vivi", { frame: 0 }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.scale(pScaleV), k.z(33), k.fixed()]);
  const prtGigi   = k.add([k.sprite("gigi", { frame: 0 }), k.pos(PORTRAIT_CX, DY), k.anchor("center"), k.scale(pScaleG), k.z(33), k.fixed()]);
  const dlgName   = k.add([k.text("", { size: fs(8), font: "pressstart2p" }), k.pos(TEXT_X, DY - DH / 2 + 14 * SC), k.color(255, 105, 180), k.z(34), k.fixed()]);
  const dlgText   = k.add([k.text("", { size: fs(7), font: "pressstart2p", width: DW - 110 * SC, align: "left" }), k.pos(TEXT_X, DY - DH / 2 + 30 * SC), k.color(255, 245, 255), k.z(34), k.fixed()]);
  const dlgArrow  = k.add([k.text("▼", { size: fs(8), font: "pressstart2p" }), k.pos(SW / 2 + DW / 2 - 16 * SC, DY + DH / 2 - 14 * SC), k.color(255, 255, 255), k.opacity(0), k.z(34), k.fixed()]);

  const dlgAll = [dlgBorder, dlgBg, prtBorder, prtFill, dlgName, dlgText, dlgArrow];
  function setDlgVis(v) { dlgAll.forEach(o => { o.hidden = !v; }); dialogActive = v; }
  setDlgVis(false);
  prtVivi.hidden = true;
  prtGigi.hidden = true;

  let fullText = "", charIdx = 0, typingDone = false, typingHandle = null;
  let arrowVisible = false, arrowTimer = 0;

  // linhas de diálogo
  const dialogs = [
    { speaker: "vivi", name: "Vivi",     text: "Mooor, te amo deixa eu te beijar" },
    { speaker: "gigi", name: "Giovanna", text: "Sai pra lá zezinho" },
    { speaker: "vivi", name: "Vivi",     text: "vem cá por favor" },
    { speaker: "gigi", name: "Giovanna", text: "saaaiii" },
    { speaker: "vivi", name: "Vivi",     text: "eu vou te pegar e te encher de beijos hahaha" },
    { speaker: "gigi", name: "Giovanna", text: "chega perto de mim pra você ver." },
    { speaker: "gigi", name: "Giovanna", text: "saaaiiiiiiiii" },
  ];

  function typeText(t) {
    fullText = t; charIdx = 0; typingDone = false;
    arrowVisible = false; arrowTimer = 0; dlgArrow.opacity = 0; dlgText.text = "";
    function step() {
      if (charIdx >= t.length) { typingDone = true; arrowVisible = true; return; }
      dlgText.text = t.slice(0, charIdx + 1);
      playTypingSound();
      charIdx++;
      typingHandle = k.wait(0.03, step);
    }
    step();
  }

  function showDlg(i) {
    const d = dialogs[i];
    setDlgVis(true);
    dlgName.text   = d.name;
    prtVivi.hidden = d.speaker !== "vivi";
    prtGigi.hidden = d.speaker !== "gigi";
    typeText(d.text);
  }

  function advanceDlg() {
    if (!dialogActive) return;
    if (!typingDone) {
      if (typingHandle) { typingHandle.cancel(); typingHandle = null; }
      dlgText.text = fullText; typingDone = true; arrowVisible = true;
      return;
    }
    arrowVisible = false; arrowTimer = 0; dlgArrow.opacity = 0;
    dialogIndex++;
    if (dialogIndex >= dialogs.length) {
      setDlgVis(false);
      const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(70), k.fixed()]);
      k.tween(0, 1, 0.8, v => { fade.opacity = v; }).onEnd(() => { k.go("minigame_beijo"); });
    } else {
      showDlg(dialogIndex);
    }
  }

  k.onUpdate(() => {
    if (!arrowVisible) return;
    arrowTimer += k.dt();
    dlgArrow.opacity = Math.sin(arrowTimer * 6) > 0 ? 1 : 0;
  });

  k.onKeyPress("space",  advanceDlg);
  k.onKeyPress("return", advanceDlg);
  k.onClick(advanceDlg);
  k.onKeyPress("escape", () => k.go("menu"));

  k.wait(1.1, () => showDlg(0));
});

// ── Cena: MINIGAME DO BEIJO ──────────────────────────────────────────────
k.scene("minigame_beijo", () => {

  // ── Constantes ───────────────────────────────────────────────────────────
  const TILE = 16, TSCALE = 2, TSIZE = TILE * TSCALE;
  const SPEED       = 180 * SC;
  const MARGIN      = 20 * SC;
  const SWING_RANGE = 55 * SC;
  const SWING_DUR   = 0.15;
  const SWING_CD    = 0.4;
  const KISS_DIST   = 22 * SC;

  // ── Estado ───────────────────────────────────────────────────────────────
  let paused = false, destroyPause = null, gameEnded = false;
  let inputBlocked = true;
  let beijos = 0;
  let waveNum = 0;
  let waveEnemies = [];
  let waveSpawnDone = false;
  let bossHp = 3;
  let swingActive = false, swingCooldown = 0, swingTimer = 0;
  let lastFace = "down";
  let currentAnim = "idle-down";
  let dlgIdx = 0, dlgDone = false, dlgHandle = null, dlgFull = "";
  let dlgArrowTimer = 0, dlgArrowVis = false;

  // ── Áudio ────────────────────────────────────────────────────────────────
  let actx = null;
  function ctxA() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    return actx;
  }
  function beepSnd(freq, type, dur, vol, freqEnd) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.value = freq;
      if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + dur);
      g.gain.setValueAtTime(vol * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.start(); o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  function playKiss()    { beepSnd(150, "sine",   0.30, 0.18); }
  function playHit()     { beepSnd(400, "square", 0.15, 0.20, 200); }
  function playDefeated(){ beepSnd(200, "sine",   0.25, 0.15, 600); }
  function playVictory() {
    try {
      const c = ctxA();
      [523, 659, 784, 1047].forEach((f, i) => {
        const t = c.currentTime + i * 0.13;
        const o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.20 * getEffectsVolume(), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        o.start(t); o.stop(t + 0.25);
      });
    } catch (e) {}
  }
  function playBossDefeat() {
    try {
      const c = ctxA();
      [392, 523, 659, 784].forEach((f, i) => {
        const t = c.currentTime + i * 0.12;
        const o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.25 * getEffectsVolume(), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.start(t); o.stop(t + 0.3);
      });
    } catch (e) {}
  }

  // ── Fundo de tiles ───────────────────────────────────────────────────────
  const COLS = Math.ceil(SW / TSIZE) + 1;
  const ROWS = Math.ceil(SH / TSIZE) + 1;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      k.add([k.sprite(Math.random() < 0.08 ? "flower" : "grass"), k.pos(col * TSIZE, row * TSIZE), k.scale(TSCALE), k.z(0)]);
    }
  }

  // ── Gigi (jogador) ───────────────────────────────────────────────────────
  const gigi = k.add([k.sprite("gigi"), k.pos(SW / 2, SH / 2), k.anchor("center"), k.scale(2.2), k.z(5)]);
  gigi.play("idle-down");

  function setGigiAnim(name) {
    if (currentAnim === name) return;
    currentAnim = name;
    gigi.play(name);
  }

  // ── Taco de beisebol ─────────────────────────────────────────────────────
  const bat = k.add([k.rect(6 * SC, 30 * SC), k.pos(SW / 2, SH / 2), k.anchor("center"), k.color(139, 90, 43), k.scale(1), k.rotate(0), k.z(4)]);

  // ── Joystick virtual ─────────────────────────────────────────────────────
  const joystick = controlMode === "joystick"
    ? makeVirtualJoystick(() => inputBlocked || paused)
    : null;

  // ── HUD ──────────────────────────────────────────────────────────────────
  const hudKissSh = k.add([k.text("\u{1F48B} 0/5", { size: fs(9), font: "pressstart2p" }), k.pos(11 * SC, 11 * SC), k.color(0, 0, 0), k.opacity(0.6), k.z(20), k.fixed()]);
  const hudKiss   = k.add([k.text("\u{1F48B} 0/5", { size: fs(9), font: "pressstart2p" }), k.pos( 9 * SC,  9 * SC), k.color(255, 150, 200), k.z(21), k.fixed()]);
  const hudOndaSh = k.add([k.text("Onda: 1/3", { size: fs(9), font: "pressstart2p" }), k.pos(SW - 11 * SC, 11 * SC), k.anchor("right"), k.color(0, 0, 0), k.opacity(0.6), k.z(20), k.fixed()]);
  const hudOnda   = k.add([k.text("Onda: 1/3", { size: fs(9), font: "pressstart2p" }), k.pos(SW -  9 * SC,  9 * SC), k.anchor("right"), k.color(255, 240, 100), k.z(21), k.fixed()]);
  const bossHpLbl = k.add([k.text("Vida: ❤❤❤", { size: fs(9), font: "pressstart2p", align: "center" }), k.pos(SW / 2, 10 * SC), k.anchor("top"), k.color(255, 100, 120), k.z(21), k.fixed()]);
  bossHpLbl.hidden = true;

  function updateHUD() {
    const wl = Math.min(waveNum + 1, 3);
    hudKiss.text = hudKissSh.text = `\u{1F48B} ${beijos}/5`;
    hudOnda.text = hudOndaSh.text = `Onda: ${wl}/3`;
  }
  function updateBossHud() {
    bossHpLbl.text = "Vida: " + "❤".repeat(bossHp) + "⬛".repeat(3 - bossHp);
  }

  // ── Diálogo pós-vitória ──────────────────────────────────────────────────
  const DW = 400 * SC, DH = 80 * SC, DY = SH - DH / 2 - 10 * SC;
  const dlgBorder = k.add([k.rect(DW + 4 * SC, DH + 4 * SC, { radius: 10 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(255, 105, 180), k.opacity(0.92), k.z(50), k.fixed()]);
  const dlgBg     = k.add([k.rect(DW,           DH,          { radius:  8 * SC }), k.pos(SW / 2, DY), k.anchor("center"), k.color(18, 4, 32),     k.opacity(0.90), k.z(51), k.fixed()]);
  const dlgName   = k.add([k.text("", { size: fs(8), font: "pressstart2p" }),                    k.pos(SW / 2 - DW / 2 + 10 * SC, DY - DH / 2 +  8 * SC), k.color(255, 105, 180), k.z(52), k.fixed()]);
  const dlgText   = k.add([k.text("", { size: fs(7), font: "pressstart2p", width: DW - 20 * SC }), k.pos(SW / 2 - DW / 2 + 10 * SC, DY - DH / 2 + 24 * SC), k.color(255, 245, 255), k.z(52), k.fixed()]);
  const dlgArrow  = k.add([k.text("▼", { size: fs(7), font: "pressstart2p" }),              k.pos(SW / 2 + DW / 2 - 14 * SC, DY + DH / 2 - 12 * SC), k.color(255, 255, 255), k.opacity(0), k.z(52), k.fixed()]);
  const dlgAll = [dlgBorder, dlgBg, dlgName, dlgText, dlgArrow];
  function setDlgVis(v) { dlgAll.forEach(o => { o.hidden = !v; }); }
  setDlgVis(false);

  const victoryDlgs = [
    { name: "Giovanna", text: "Chega de beijos por hoje!" },
    { name: "Vivi",     text: "Impossivel." },
    { name: "Giovanna", text: "*ri*" },
  ];

  function typeDlg(text) {
    dlgFull = text; dlgText.text = ""; dlgDone = false;
    dlgArrowVis = false; dlgArrow.opacity = 0;
    let i = 0;
    function step() {
      if (i >= text.length) { dlgDone = true; dlgArrowVis = true; return; }
      dlgText.text = text.slice(0, i + 1);
      beepSnd(800 + Math.random() * 400, "square", 0.03, 0.04);
      i++;
      dlgHandle = k.wait(0.03, step);
    }
    step();
  }

  function showDlg(i) {
    dlgName.text = victoryDlgs[i].name;
    setDlgVis(true);
    typeDlg(victoryDlgs[i].text);
  }

  function advanceDlg() {
    if (dlgBorder.hidden) return;
    if (!dlgDone) {
      if (dlgHandle) dlgHandle.cancel();
      dlgText.text = dlgFull; dlgDone = true; dlgArrowVis = true;
      return;
    }
    dlgArrowVis = false; dlgArrow.opacity = 0;
    dlgIdx++;
    if (dlgIdx >= victoryDlgs.length) {
      setDlgVis(false);
      const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(80), k.fixed()]);
      k.tween(0, 1, 1.0, v => { fade.opacity = v; }).onEnd(() => {
        k.go("final");
      });
    } else {
      showDlg(dlgIdx);
    }
  }

  // ── Sistema de inimigos ──────────────────────────────────────────────────
  function spawnEnemy(speed, scale, isBoss) {
    const side = Math.floor(Math.random() * 4);
    let sx, sy;
    if      (side === 0) { sx = k.rand(30 * SC, SW - 30 * SC); sy = -30 * SC; }
    else if (side === 1) { sx = k.rand(30 * SC, SW - 30 * SC); sy = SH + 30 * SC; }
    else if (side === 2) { sx = -30 * SC;      sy = k.rand(30 * SC, SH - 30 * SC); }
    else                 { sx = SW + 30 * SC;  sy = k.rand(30 * SC, SH - 30 * SC); }

    const hCount = isBoss ? 3 : 1;
    const heartObjs = [];
    for (let h = 0; h < hCount; h++) {
      heartObjs.push(k.add([
        k.text("💗", { size: fs(isBoss ? 10 : 8) }),
        k.pos(sx, sy - 30 * SC), k.anchor("center"), k.scale(1), k.z(7),
      ]));
    }

    const enemy = k.add([
      k.sprite("vivi"), k.pos(sx, sy), k.anchor("center"), k.scale(scale), k.z(5),
      { spd: speed, hp: isBoss ? 3 : 1, isBoss, heartObjs, dying: false, kissInvul: 0 },
    ]);
    enemy.play("idle-down");

    enemy.onUpdate(() => {
      if (enemy.dying || gameEnded || !enemy.exists()) return;
      const ex = enemy.pos.x, ey = enemy.pos.y;
      const n = enemy.heartObjs.length;
      enemy.heartObjs.forEach((h, i) => {
        if (h.exists()) {
          h.pos.x = ex + (i - (n - 1) / 2) * 18 * SC;
          h.pos.y = ey - (isBoss ? 42 : 28) * SC;
        }
      });

      if (enemy.kissInvul > 0) {
        enemy.kissInvul -= k.dt();
        enemy.opacity = Math.sin(k.time() * 20) > 0 ? 1 : 0.3;
        return;
      }
      enemy.opacity = 1;

      const dx = gigi.pos.x - ex, dy = gigi.pos.y - ey;
      const dist = Math.hypot(dx, dy);
      if (dist > 0) {
        enemy.pos.x += (dx / dist) * enemy.spd * k.dt();
        enemy.pos.y += (dy / dist) * enemy.spd * k.dt();
        if (Math.abs(dx) >= Math.abs(dy)) {
          enemy.play(dx > 0 ? "walk-right" : "walk-left");
        } else {
          enemy.play(dy > 0 ? "walk-down" : "walk-up");
        }
      }

      if (dist < KISS_DIST) receiveKiss(enemy);
    });

    return enemy;
  }

  function receiveKiss(enemy) {
    if (gameEnded || !enemy.exists() || enemy.kissInvul > 0) return;
    enemy.kissInvul = 1.2;
    beijos++;
    updateHUD();
    playKiss();

    const dx = enemy.pos.x - gigi.pos.x, dy = enemy.pos.y - gigi.pos.y;
    const d  = Math.hypot(dx, dy) || 1;
    k.tween(enemy.pos.x, Math.max(30 * SC, Math.min(SW - 30 * SC, enemy.pos.x + (dx / d) * 100 * SC)), 0.3, v => { if (enemy.exists()) enemy.pos.x = v; });
    k.tween(enemy.pos.y, Math.max(30 * SC, Math.min(SH - 30 * SC, enemy.pos.y + (dy / d) * 100 * SC)), 0.3, v => { if (enemy.exists()) enemy.pos.y = v; });

    const fl = k.add([k.text("💋", { size: fs(14) }), k.pos(gigi.pos.x, gigi.pos.y - 20 * SC), k.anchor("center"), k.z(10), k.fixed()]);
    k.tween(1, 0, 0.5, v => { if (fl.exists()) fl.opacity = v; });
    k.wait(0.5, () => { if (fl.exists()) fl.destroy(); });

    if (beijos >= 5) triggerDefeat();
  }

  function hitEnemy(enemy) {
    if (!enemy.exists() || enemy.dying || enemy.kissInvul > 0) return;
    playHit();

    if (enemy.isBoss) {
      enemy.hp--;
      bossHp = enemy.hp;
      updateBossHud();
      const h = enemy.heartObjs.pop();
      if (h && h.exists()) {
        k.tween(1, 0, 0.2, v => { if (h.exists()) h.opacity = v; });
        k.wait(0.2, () => { if (h.exists()) h.destroy(); });
      }
      if (enemy.hp <= 0) {
        eliminateEnemy(enemy, true);
      } else {
        enemy.kissInvul = 0.5;
        const dx = enemy.pos.x - gigi.pos.x, dy = enemy.pos.y - gigi.pos.y;
        const d = Math.hypot(dx, dy) || 1;
        k.tween(enemy.pos.x, enemy.pos.x + (dx / d) * 80 * SC, 0.2, v => { if (enemy.exists()) enemy.pos.x = v; });
        k.tween(enemy.pos.y, enemy.pos.y + (dy / d) * 80 * SC, 0.2, v => { if (enemy.exists()) enemy.pos.y = v; });
      }
    } else {
      eliminateEnemy(enemy, false);
    }
  }

  function eliminateEnemy(enemy, isBoss) {
    if (!enemy.exists() || enemy.dying) return;
    enemy.dying = true;
    enemy.heartObjs.forEach(h => { if (h.exists()) h.destroy(); });
    enemy.heartObjs = [];

    for (let i = 0; i < 5; i++) {
      const ang0 = (i / 5) * Math.PI * 2;
      const ex0 = enemy.pos.x, ey0 = enemy.pos.y;
      const s = k.add([
        k.text("★", { size: fs(8) }), k.pos(ex0, ey0),
        k.anchor("center"), k.color(255, 220, 50), k.scale(1), k.z(9),
        { ang: ang0, r: 0, ex: ex0, ey: ey0 },
      ]);
      s.onUpdate(() => { s.ang += 4 * k.dt(); s.r = Math.min(s.r + 100 * SC * k.dt(), 40 * SC); s.pos.x = s.ex + Math.cos(s.ang) * s.r; s.pos.y = s.ey + Math.sin(s.ang) * s.r; });
      k.tween(1, 0, 0.4, v => { if (s.exists()) s.opacity = v; });
      k.wait(0.4, () => { if (s.exists()) s.destroy(); });
    }

    if (isBoss) {
      playBossDefeat();
      bossHpLbl.hidden = true;
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2;
        const spd = k.rand(80, 160) * SC;
        const hh = k.add([
          k.text("💗", { size: fs(10) }), k.pos(enemy.pos.x, enemy.pos.y),
          k.anchor("center"), k.scale(1), k.z(8),
          { vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd },
        ]);
        hh.onUpdate(() => { hh.pos.x += hh.vx * k.dt(); hh.pos.y += hh.vy * k.dt(); });
        k.tween(1, 0, 0.6, v => { if (hh.exists()) hh.opacity = v; });
        k.wait(0.6, () => { if (hh.exists()) hh.destroy(); });
      }
    } else {
      playDefeated();
    }

    const tx = enemy.pos.x < SW / 2 ? -60 * SC : SW + 60 * SC;
    const ty = enemy.pos.y < SH / 2 ? -60 * SC : SH + 60 * SC;
    k.tween(enemy.pos.x, tx, 0.3, v => { if (enemy.exists()) enemy.pos.x = v; });
    k.tween(enemy.pos.y, ty, 0.3, v => { if (enemy.exists()) enemy.pos.y = v; });
    k.wait(0.32, () => {
      if (enemy.exists()) enemy.destroy();
      waveEnemies = waveEnemies.filter(e => e !== enemy);
      k.wait(0.05, checkWaveDone);
    });
  }

  function checkWaveDone() {
    if (gameEnded || !waveSpawnDone) return;
    const alive = waveEnemies.filter(e => e.exists() && !e.dying);
    if (alive.length === 0) {
      waveEnemies = [];
      if (waveNum >= 2) {
        triggerVictory();
      } else {
        waveNum++;
        updateHUD();
        k.wait(0.5, () => showWaveBanner(waveNum + 1, () => startWave(waveNum)));
      }
    }
  }

  // ── Ondas ────────────────────────────────────────────────────────────────
  function startWave(wn) {
    waveSpawnDone = false;
    const cfgs = [
      { count: 3, speed: 70  * SC, scale: 8, interval: 1.5, boss: false },
      { count: 5, speed: 100 * SC, scale: 8, interval: 1.0, boss: false },
      { count: 1, speed: 55  * SC, scale: 12, interval: 0,   boss: true  },
    ];
    const cfg = cfgs[wn];
    if (cfg.boss) { bossHpLbl.hidden = false; bossHp = 3; updateBossHud(); }

    let spawned = 0;
    function doSpawn() {
      if (gameEnded) return;
      const e = spawnEnemy(cfg.speed, cfg.scale, cfg.boss);
      waveEnemies.push(e);
      spawned++;
      if (spawned < cfg.count) {
        k.wait(cfg.interval, doSpawn);
      } else {
        waveSpawnDone = true;
        k.wait(0.1, checkWaveDone);
      }
    }
    doSpawn();
  }

  function showWaveBanner(num, onDone) {
    inputBlocked = true;
    const tx  = `Onda ${num}!`;
    const sh  = k.add([k.text(tx, { size: fs(16), font: "pressstart2p", align: "center" }), k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC), k.anchor("center"), k.scale(0), k.color(0, 0, 0), k.z(30), k.fixed()]);
    const lbl = k.add([k.text(tx, { size: fs(16), font: "pressstart2p", align: "center" }), k.pos(SW / 2,           SH / 2),           k.anchor("center"), k.scale(0), k.color(255, 220, 50), k.z(31), k.fixed()]);
    k.tween(0, 1.1, 0.2, v => { lbl.scale.x = v; lbl.scale.y = v; sh.scale.x = v; sh.scale.y = v; });
    k.wait(0.22, () => k.tween(1.1, 1.0, 0.1, v => { lbl.scale.x = v; lbl.scale.y = v; sh.scale.x = v; sh.scale.y = v; }));
    k.wait(2.0, () => {
      k.tween(1, 0, 0.2, v => { lbl.opacity = v; sh.opacity = v; });
      k.wait(0.22, () => {
        if (lbl.exists()) lbl.destroy();
        if (sh.exists())  sh.destroy();
        inputBlocked = false;
        if (onDone) onDone();
      });
    });
  }

  // ── Vitória / Derrota ─────────────────────────────────────────────────────
  function triggerDefeat() {
    if (gameEnded) return;
    gameEnded = true; inputBlocked = true;
    const lbl = k.add([k.text("Vivi ganhou hoje... 💋", { size: fs(9), font: "pressstart2p", align: "center", width: SW * 0.7 }), k.pos(SW / 2, SH / 2), k.anchor("center"), k.color(255, 100, 150), k.z(40), k.fixed()]);
    k.wait(1.5, () => { if (lbl.exists()) lbl.destroy(); k.go("minigame_beijo"); });
  }

  function triggerVictory() {
    if (gameEnded) return;
    gameEnded = true; inputBlocked = true;
    playVictory();

    const vsh = k.add([k.text("Gigi venceu! 🏆", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.8 }), k.pos(SW / 2 + 2 * SC, SH / 2 - 18 * SC), k.anchor("center"), k.scale(0), k.color(0, 0, 0), k.z(39), k.fixed()]);
    const vlb = k.add([k.text("Gigi venceu! 🏆", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.8 }), k.pos(SW / 2,           SH / 2 - 20 * SC), k.anchor("center"), k.scale(0), k.color(255, 220, 50), k.z(40), k.fixed()]);
    k.tween(0, 1.1, 0.25, v => { vlb.scale.x = v; vlb.scale.y = v; vsh.scale.x = v; vsh.scale.y = v; });
    k.wait(0.27, () => k.tween(1.1, 1.0, 0.12, v => { vlb.scale.x = v; vlb.scale.y = v; vsh.scale.x = v; vsh.scale.y = v; }));

    for (let i = 0; i < 12; i++) {
      k.wait(i * 0.12, () => {
        if (gameEnded) {
          const vy = -k.rand(40, 90) * SC;
          const hh = k.add([k.text("💗", { size: fs(k.rand(8, 14)) }), k.pos(k.rand(0, SW), k.rand(0, SH)), k.anchor("center"), k.scale(1), k.z(25), k.fixed(), { vy }]);
          hh.onUpdate(() => { hh.pos.y += hh.vy * k.dt(); });
          k.tween(1, 0, 1.0, v => { if (hh.exists()) hh.opacity = v; });
          k.wait(1.0, () => { if (hh.exists()) hh.destroy(); });
        }
      });
    }

    k.wait(1.2, () => { dlgIdx = 0; showDlg(0); });
  }

  // ── Swing do taco ────────────────────────────────────────────────────────
  function doSwing() {
    if (inputBlocked || paused || swingActive || swingCooldown > 0 || gameEnded) return;
    swingActive = true; swingTimer = 0;

    k.wait(SWING_DUR * 0.5, () => {
      if (gameEnded) return;
      const dirs = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
      const [dx, dy] = dirs[lastFace] || [0, 1];
      const cx = gigi.pos.x + dx * SWING_RANGE * 0.6;
      const cy = gigi.pos.y + dy * SWING_RANGE * 0.6;
      waveEnemies.forEach(e => {
        if (!e.exists() || e.dying || e.kissInvul > 0) return;
        if (Math.hypot(e.pos.x - cx, e.pos.y - cy) < SWING_RANGE) hitEnemy(e);
      });
    });

    k.wait(SWING_DUR, () => { swingActive = false; swingTimer = 0; swingCooldown = SWING_CD; });
  }

  // ── Controles ────────────────────────────────────────────────────────────
  k.onKeyDown("left",  () => { if (inputBlocked || paused) return; gigi.move(-SPEED, 0); setGigiAnim("walk-left");  lastFace = "left";  });
  k.onKeyDown("right", () => { if (inputBlocked || paused) return; gigi.move( SPEED, 0); setGigiAnim("walk-right"); lastFace = "right"; });
  k.onKeyDown("up",    () => { if (inputBlocked || paused) return; gigi.move(0, -SPEED); setGigiAnim("walk-up");    lastFace = "up";    });
  k.onKeyDown("down",  () => { if (inputBlocked || paused) return; gigi.move(0,  SPEED); setGigiAnim("walk-down");  lastFace = "down";  });
  k.onKeyDown("a",     () => { if (inputBlocked || paused) return; gigi.move(-SPEED, 0); setGigiAnim("walk-left");  lastFace = "left";  });
  k.onKeyDown("d",     () => { if (inputBlocked || paused) return; gigi.move( SPEED, 0); setGigiAnim("walk-right"); lastFace = "right"; });
  k.onKeyDown("w",     () => { if (inputBlocked || paused) return; gigi.move(0, -SPEED); setGigiAnim("walk-up");    lastFace = "up";    });
  k.onKeyDown("s",     () => { if (inputBlocked || paused) return; gigi.move(0,  SPEED); setGigiAnim("walk-down");  lastFace = "down";  });

  k.onKeyRelease(() => {
    const any = k.isKeyDown("left") || k.isKeyDown("right") || k.isKeyDown("up")   || k.isKeyDown("down") ||
                k.isKeyDown("a")    || k.isKeyDown("d")     || k.isKeyDown("w")     || k.isKeyDown("s");
    if (!any && !inputBlocked) setGigiAnim("idle-" + lastFace);
  });

  k.onKeyPress("space",  () => { if (!dlgBorder.hidden) { advanceDlg(); return; } doSwing(); });
  k.onKeyPress("return", () => { if (!dlgBorder.hidden) { advanceDlg(); return; } });
  k.onMousePress("left", () => { if (!dlgBorder.hidden) { advanceDlg(); return; } doSwing(); });

  k.onKeyPress("escape", () => {
    if (gameEnded) return;
    if (paused) { if (destroyPause) { destroyPause(); destroyPause = null; } paused = false; }
    else        { paused = true; destroyPause = makePauseOverlay(() => { paused = false; destroyPause = null; }); }
  });

  // ── Loop principal ───────────────────────────────────────────────────────
  k.onUpdate(() => {
    if (paused || gameEnded) return;

    gigi.pos.x = Math.max(MARGIN, Math.min(SW - MARGIN, gigi.pos.x));
    gigi.pos.y = Math.max(MARGIN, Math.min(SH - MARGIN, gigi.pos.y));

    if (!inputBlocked) {
      const any = k.isKeyDown("left") || k.isKeyDown("right") || k.isKeyDown("up")   || k.isKeyDown("down") ||
                  k.isKeyDown("a")    || k.isKeyDown("d")     || k.isKeyDown("w")     || k.isKeyDown("s");
      if (joystick) {
        joystick.tick();
        if (joystick.isActive()) {
          const { x: jx, y: jy } = joystick.getDir();
          if (Math.abs(jx) > 0.15 || Math.abs(jy) > 0.15) {
            gigi.move(jx * SPEED, jy * SPEED);
            if (Math.abs(jx) >= Math.abs(jy)) { setGigiAnim(jx > 0 ? "walk-right" : "walk-left"); lastFace = jx > 0 ? "right" : "left"; }
            else                               { setGigiAnim(jy > 0 ? "walk-down"  : "walk-up");   lastFace = jy > 0 ? "down"  : "up";   }
          } else if (!any) { setGigiAnim("idle-" + lastFace); }
        } else if (!any) { setGigiAnim("idle-" + lastFace); }
      } else if (!any) { setGigiAnim("idle-" + lastFace); }
    }

    if (swingCooldown > 0) swingCooldown -= k.dt();
    if (swingActive) swingTimer = Math.min(swingTimer + k.dt(), SWING_DUR);

    const faceAngles = { right: -90, down: 0, left: 90, up: 180 };
    const foff       = { right: [18 * SC, 0], left: [-18 * SC, 0], up: [0, -18 * SC], down: [0, 18 * SC] };
    const [fox, foy] = foff[lastFace] || [0, 18 * SC];
    bat.pos.x = gigi.pos.x + fox;
    bat.pos.y = gigi.pos.y + foy;
    bat.angle = (faceAngles[lastFace] || 0) + (swingActive ? (swingTimer / SWING_DUR) * 90 - 30 : 0);

    if (dlgArrowVis) {
      dlgArrowTimer += k.dt();
      dlgArrow.opacity = Math.sin(dlgArrowTimer * 6) > 0 ? 1 : 0;
    }
  });

  // ── Sequência inicial ────────────────────────────────────────────────────
  const tsh = k.add([k.text("A Batalha", { size: fs(14), font: "pressstart2p", align: "center" }), k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC), k.anchor("center"), k.scale(0), k.color(0, 0, 0),     k.z(40), k.fixed()]);
  const tlb = k.add([k.text("A Batalha", { size: fs(14), font: "pressstart2p", align: "center" }), k.pos(SW / 2,           SH / 2),           k.anchor("center"), k.scale(0), k.color(255, 220, 50), k.z(41), k.fixed()]);
  k.tween(0, 1.1, 0.25, v => { tlb.scale.x = v; tlb.scale.y = v; tsh.scale.x = v; tsh.scale.y = v; });
  k.wait(0.27, () => k.tween(1.1, 1.0, 0.12, v => { tlb.scale.x = v; tlb.scale.y = v; tsh.scale.x = v; tsh.scale.y = v; }));
  k.wait(2.2, () => {
    k.tween(1, 0, 0.3, v => { tlb.opacity = v; tsh.opacity = v; });
    k.wait(0.35, () => {
      if (tlb.exists()) tlb.destroy();
      if (tsh.exists()) tsh.destroy();
      showWaveBanner(1, () => startWave(0));
    });
  });
});

// ── Cena: CHALLENGE – O CAMPINHO (cópia de missao2, dificuldade aumentada) ─
k.scene("challenge_campinho", () => {
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

  // Dificuldade aumentada
  const GOALS_TO_WIN  = 14;            // era 10
  const BALL_SPEED_MUL = 1.6;          // velocidade da bola ×1.6
  const GK_SPEED_MUL   = 1.5;          // velocidade do goleiro ×1.5
  const GK_HITBOX_MUL  = 1.2;          // hitbox do goleiro +20%

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
    k.anchor("center"), k.scale(8 * GK_HITBOX_MUL), k.z(2),
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

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [523,523,659,784,659,523,587,659,784,880,784,659,523,587,659,523];
    const DUR = 0.16;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "square"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

  // ── HUD ─────────────────────────────────────────────────────────────────
  k.add([
    k.rect(168 * SC, 30 * SC, { radius: 6 * SC }),
    k.pos(8 * SC, 8 * SC),
    k.color(0, 0, 0), k.opacity(0.55), k.z(20), k.fixed(),
  ]);
  const hudShadow = k.add([
    k.text(`Gols: 0/${GOALS_TO_WIN}`, { size: fs(10), font: "pressstart2p" }),
    k.pos(13 * SC + 1, 15 * SC + 1),
    k.color(0, 0, 0), k.opacity(0.7), k.z(20), k.fixed(),
  ]);
  const hudLabel = k.add([
    k.text(`Gols: 0/${GOALS_TO_WIN}`, { size: fs(10), font: "pressstart2p" }),
    k.pos(13 * SC, 15 * SC),
    k.color(255, 255, 255), k.z(21), k.fixed(),
  ]);
  function updateHUD() {
    hudLabel.text  = `Gols: ${goals}/${GOALS_TO_WIN}`;
    hudShadow.text = `Gols: ${goals}/${GOALS_TO_WIN}`;
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

    if (goals >= GOALS_TO_WIN) {
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
          ballVel.x = ndx * 340 * BALL_SPEED_MUL;
          ballVel.y = ndy * 340 * BALL_SPEED_MUL;
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

        const ballInNpcSide = ball.pos.x > (FL + FR) / 2;
        let tgtX, tgtY;
        if (ballInNpcSide) {
          tgtX = ball.pos.x + jX;
          tgtY = ball.pos.y + jY;
        } else {
          tgtX = (ball.pos.x + FL) / 2 + jX;
          tgtY = ball.pos.y + jY;
        }

        const nnX = tgtX - npcMan.pos.x;
        const nnY = tgtY - npcMan.pos.y;
        const nd  = Math.hypot(nnX, nnY) || 1;
        if (nd > 10) {
          npcMan.pos.x += (nnX / nd) * 120 * GK_SPEED_MUL * dt;
          npcMan.pos.y += (nnY / nd) * 120 * GK_SPEED_MUL * dt;
          npcMan.play(nnX > 0 ? "walk-right" : "walk-left");
        } else {
          npcMan.play("idle-left");
        }
        npcMan.pos.x = Math.max(FL, Math.min(MID_X - MARGIN, npcMan.pos.x));
        npcMan.pos.y = Math.max(FT, Math.min(FB, npcMan.pos.y));

        // NPC chuta em direção ao gol esquerdo (goleira do Vivi) quando próximo
        const npcBallDist = Math.hypot(npcMan.pos.x - ball.pos.x, npcMan.pos.y - ball.pos.y);
        if (npcBallDist < 24 * GK_HITBOX_MUL) {
          const aimX = FL - GOAL_DEPTH / 2;
          const aimY = GOAL_MID + k.rand(-GOAL_H * 0.3, GOAL_H * 0.3);
          const kd   = Math.hypot(aimX - ball.pos.x, aimY - ball.pos.y) || 1;
          ballVel.x  = ((aimX - ball.pos.x) / kd) * 280 * BALL_SPEED_MUL;
          ballVel.y  = ((aimY - ball.pos.y) / kd) * 280 * BALL_SPEED_MUL;
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

// ── Cena: CHALLENGE – A SINTONIA (cópia de missao4, dificuldade aumentada) ─
k.scene("challenge_sintonia", () => {
  // ── Dificuldade aumentada ──────────────────────────────────────────────────
  const HITS_TO_WIN     = 20;    // era 15
  const FALL_SPEED_MUL  = 1.6;   // velocidade de queda dos emojis ×1.6
  const CLICK_WINDOW_MUL = 0.7;  // janela de clique reduzida em 30%
  const BAD_CHANCE       = Math.min(0.95, 0.35 * 1.4);  // prob. de emoji ruim +40% (~0.49)

  // ── Estado ───────────────────────────────────────────────────────────────
  let acertos        = 0;
  let erros          = 0;
  let paused         = false;
  let destroyPause   = null;
  let gameEnded      = false;   // true ao vencer ou perder
  let spawnLoop       = null;    // handle do k.loop (para cancelar)

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

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [440,0,0,0,523,0,0,0,659,0,0,0,523,0,440,0];
    const DUR = 0.50;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "sine"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

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
    k.text(`Beijos: 0/${HITS_TO_WIN}`, { size: fs(8), font: "pressstart2p" }),
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
    hitsLabel.text = `Beijos: ${acertos}/${HITS_TO_WIN}`;
    const t = Math.min(1, acertos / HITS_TO_WIN);
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
  // Limite vertical em que o emoji deixa de ser clicável (janela reduzida).
  const CLICK_LIMIT_Y = SH * (0.40 + 0.60 * CLICK_WINDOW_MUL);
  function spawnEmoji() {
    const r = Math.random();
    let isCorrect, char;
    // Probabilidade de emoji ruim aumentada (BAD_CHANCE); o resto fica para os bons,
    // mantendo a proporção original beijo:coração de 0.40:0.25.
    const goodRange = 1 - BAD_CHANCE;
    const beijoCut  = goodRange * (0.40 / 0.65);
    if (r < beijoCut)        { isCorrect = true;  char = "\u{1F48B}"; }    // 💋 beijo
    else if (r < goodRange)  { isCorrect = true;  char = "❤️"; }           // ❤️ coração
    else                     { isCorrect = false; char = "\u{1F445}"; }    // 👅 língua

    // 15% das línguas vêm em vermelho escuro (armadilha visual); penaliza igual
    const isTrap = !isCorrect && Math.random() < 0.15;

    const maxSpeed  = (260 + (acertos / HITS_TO_WIN) * 80) * FALL_SPEED_MUL;   // queda ×1.6
    const vy        = k.rand(140 * FALL_SPEED_MUL, maxSpeed) * SC;    // velocidade de queda dos emojis
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
      // Janela de clique reduzida: após CLICK_LIMIT_Y o emoji escurece e não conta mais
      if (!e.clicked && e.pos.y > CLICK_LIMIT_Y) { e.clicked = true; e.opacity = 0.35; }
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
        if (acertos >= HITS_TO_WIN) onWin();
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

  // ── Vitória → fade para preto → menu ───────────────────────────────────────
  function onWin() {
    if (gameEnded) return;
    stopGame();
    playWinSound();
    const fade = k.add([
      k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0),
      k.opacity(0), k.z(70), k.fixed(),
    ]);
    k.tween(0, 1, 0.8, v => { fade.opacity = v; })
      .onEnd(() => { k.go("menu"); });
  }

  // ── Derrota → fade para preto → menu ───────────────────────────────────────
  function onGameOver() {
    if (gameEnded) return;
    stopGame();
    const fade = k.add([
      k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0),
      k.opacity(0), k.z(70), k.fixed(),
    ]);
    k.tween(0, 1, 0.8, v => { fade.opacity = v; })
      .onEnd(() => { k.go("menu"); });
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
    k.text("Desafio: A Sintonia", { size: fs(16), font: "pressstart2p", align: "center" }),
    k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC), k.anchor("center"),
    k.color(0, 0, 0), k.opacity(0), k.z(45), k.fixed(),
  ]);
  const titleLabel = k.add([
    k.text("Desafio: A Sintonia", { size: fs(16), font: "pressstart2p", align: "center" }),
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

// ── Cena: CHALLENGE – A SUBIDA (cópia de subida, dificuldade aumentada) ────
k.scene("challenge_subida", () => {
  // ── Estado ───────────────────────────────────────────────────────────────
  let paused       = false;
  let destroyPause = null;
  let gameEnded    = false;
  let started      = false;   // true após a introdução; libera spawn e cronômetro
  let elapsed      = 0;
  let erros        = 0;       // colisões sofridas (3 = derrota)
  let invulnTimer  = 0;       // janela de invencibilidade após apanhar
  let spawnTimer   = 0;

  // ── Dificuldade aumentada ──────────────────────────────────────────────────
  const SPAWN_INTERVAL_MUL = 0.7;   // intervalo de spawn 30% mais curto
  const SPEED_MUL          = 1.5;   // velocidade inicial ×1.5
  const ACCEL_MUL          = 1.4;   // aceleração ×1.4

  let nextSpawn    = k.rand(1.3, 2.1) * SPAWN_INTERVAL_MUL;

  const SURVIVE_TIME = 28;            // segundos para vencer (era 35)
  const GROUND_Y     = SH * 0.74;     // linha do chão (pés dos personagens)

  // ── Áudio (Web Audio API) ─────────────────────────────────────────────────
  let actx = null;
  function ctxA() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); return actx; }
  function beep(freq, type, dur, vol, slideTo) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.setValueAtTime(freq, c.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
      g.gain.setValueAtTime(vol * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.start(); o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  function playJump()  { beep(520, "sine",   0.12, 0.16, 880); }
  function playHit()   { beep(200, "square", 0.20, 0.20); }
  function playBark()  { beep(300, "square", 0.08, 0.18, 190); k.wait(0.11, () => beep(280, "square", 0.08, 0.18, 170)); }
  function playPop()   { beep(900, "square", 0.06, 0.12); }
  function playFail()  { beep(420, "sawtooth", 0.5, 0.2, 70); }
  function playWin()   {
    try {
      const c = ctxA();
      [523, 659, 784, 1047].forEach((f, i) => {
        const o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "sine"; o.frequency.value = f;
        const t = c.currentTime + i * 0.14;
        g.gain.setValueAtTime(0.25 * getEffectsVolume(), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.start(t); o.stop(t + 0.3);
      });
    } catch (e) {}
  }

  // ── Trilha sonora ──────────────────────────────────────────────────────────
  try {
    const bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bgmGain = bgmCtx.createGain();
    bgmGain.gain.value = getMusicVolume() * 0.18;
    bgmGain.connect(bgmCtx.destination);
    const NOTES = [330,392,440,494,659,587,494,440,392,330,440,494,659,587,494,330];
    const DUR = 0.12;
    let bgmIdx = 0, bgmTimer = 0;
    k.onUpdate(() => {
      bgmTimer += k.dt();
      if (bgmTimer >= DUR) {
        bgmTimer = 0;
        const f = NOTES[bgmIdx % NOTES.length]; bgmIdx++;
        if (f > 0) {
          try {
            const o = bgmCtx.createOscillator(), g = bgmCtx.createGain();
            o.connect(g); g.connect(bgmGain);
            o.type = "sawtooth"; o.frequency.value = f;
            g.gain.setValueAtTime(1, bgmCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, bgmCtx.currentTime + DUR * 0.9);
            o.start(bgmCtx.currentTime); o.stop(bgmCtx.currentTime + DUR * 0.9);
          } catch (e) {}
        }
      }
    });
  } catch (e) {}

  // ── Céu em degradê (dia → por do sol laranja) ─────────────────────────────
  const SKY_BANDS = 8;
  const bandH = GROUND_Y / SKY_BANDS;
  const skyBands = [];
  for (let i = 0; i < SKY_BANDS; i++) {
    skyBands.push(k.add([
      k.rect(SW, bandH + 2), k.pos(0, i * bandH),
      k.color(0, 0, 0), k.z(0), k.fixed(),
    ]));
  }
  const lerpN = (a, b, t) => a + (b - a) * t;
  function setSky(p) {
    const dayTop = [120, 180, 255], dayBot = [205, 232, 255];
    const sunTop = [ 60,  40, 110], sunBot = [255, 150,  60];
    const top = dayTop.map((c, i) => lerpN(c, sunTop[i], p));
    const bot = dayBot.map((c, i) => lerpN(c, sunBot[i], p));
    skyBands.forEach((b, i) => {
      const t = SKY_BANDS > 1 ? i / (SKY_BANDS - 1) : 0;
      b.color = k.rgb(
        Math.round(lerpN(top[0], bot[0], t)),
        Math.round(lerpN(top[1], bot[1], t)),
        Math.round(lerpN(top[2], bot[2], t)),
      );
    });
  }
  setSky(0);

  // ── Sol ────────────────────────────────────────────────────────────────────
  const SUN_TOP = GROUND_Y - 150 * SC;
  const SUN_BOT = GROUND_Y -  18 * SC;
  const sun = k.add([
    k.circle(40 * SC), k.pos(SW * 0.70, SUN_TOP), k.anchor("center"),
    k.color(255, 240, 180), k.opacity(0.95), k.z(1), k.fixed(),
  ]);

  // ── Morros distantes (parallax lento) ──────────────────────────────────────
  const hills = [];
  for (let i = 0; i < 4; i++) {
    const r = k.rand(90, 150) * SC;
    hills.push(k.add([
      k.circle(r), k.pos((i / 4) * (SW + 200 * SC), GROUND_Y + r * 0.5), k.anchor("center"),
      k.color(90, 70, 120), k.opacity(0.85), k.z(1), k.fixed(),
    ]));
  }

  // ── Chão (trilha de montanha) ──────────────────────────────────────────────
  k.add([k.rect(SW, SH - GROUND_Y + 2), k.pos(0, GROUND_Y), k.color(120, 90, 60), k.z(2), k.fixed()]);
  k.add([k.rect(SW, 3 * SC), k.pos(0, GROUND_Y), k.color(150, 115, 75), k.z(3), k.fixed()]);

  // Tracinhos na superfície → dão a sensação de movimento
  const dashes = [];
  for (let i = 0; i < 16; i++) {
    dashes.push(k.add([
      k.rect(28 * SC, 5 * SC, { radius: 2 * SC }),
      k.pos(k.rand(0, SW), GROUND_Y + k.rand(14 * SC, (SH - GROUND_Y) - 10 * SC)),
      k.color(95, 70, 45), k.opacity(0.7), k.z(3), k.fixed(),
    ]));
  }

  // ── Vivi e Gigi: parados no centro/esquerda, apenas pulando ────────────────
  const VIVI_SCALE = 8, GIGI_SCALE = 2.2;   // proporção do projeto (vivi ~3.6x gigi)
  const CHAR_X = SW * 0.30;
  const vivi = k.add([
    k.sprite("vivi"), k.pos(CHAR_X, GROUND_Y), k.anchor("bot"),
    k.scale(VIVI_SCALE), k.opacity(1), k.z(6), k.fixed(),
  ]);
  vivi.play("walk-right");
  const gigi = k.add([
    k.sprite("gigi"), k.pos(CHAR_X, GROUND_Y), k.anchor("bot"),
    k.scale(GIGI_SCALE), k.opacity(1), k.z(6), k.fixed(),
  ]);
  gigi.play("walk-right");

  // Posiciona os dois lado a lado, centrados em CHAR_X
  const viviW = (vivi.width  || 10) * VIVI_SCALE;
  const viviH = (vivi.height || 10) * VIVI_SCALE;
  const gigiW = (gigi.width  || 10) * GIGI_SCALE;
  const gigiH = (gigi.height || 10) * GIGI_SCALE;
  const GAP   = 6 * SC;
  const pairW = viviW + GAP + gigiW;
  const pairH = Math.max(viviH, gigiH);
  const pairLeft = CHAR_X - pairW / 2;
  vivi.pos.x = pairLeft + viviW / 2;
  gigi.pos.x = pairLeft + viviW + GAP + gigiW / 2;

  // ── Pulo (controla os DOIS personagens ao mesmo tempo) ─────────────────────
  const GRAVITY = 2800 * SC;
  const JUMP_V  = 800  * SC;
  let vy = 0, jumpOffset = 0, onGround = true;
  function jump() {
    if (paused || gameEnded) return;
    if (onGround) { vy = JUMP_V; onGround = false; playJump(); }
  }
  k.onKeyPress("space", jump);
  k.onMousePress("left", jump);   // toque na tela (touchToMouse) e clique

  // ── Velocidade do mundo (cresce com o tempo) ───────────────────────────────
  const BASE_SPEED   = 280 * SC * SPEED_MUL;        // velocidade inicial ×1.5
  const SPEED_GROWTH =   9 * SC * ACCEL_MUL;        // aceleração ×1.4
  const worldSpeed = () => BASE_SPEED + elapsed * SPEED_GROWTH;

  // ── HUD: vidas (canto superior direito) ────────────────────────────────────
  const hearts = [];
  for (let i = 0; i < 3; i++) {
    hearts.push(k.add([
      k.text("❤️", { size: fs(14) }),
      k.pos(SW - 16 * SC - (2 - i) * 30 * SC, 14 * SC), k.anchor("top"),
      k.z(41), k.fixed(), "hud",
    ]));
  }
  function updateLives() {
    for (let i = 0; i < 3; i++) hearts[i].text = (i < 3 - erros) ? "❤️" : "\u{1F494}";
  }
  updateLives();

  // ── HUD: barra de progresso (canto superior esquerdo) ──────────────────────
  const PB_W = 200 * SC, PB_H = 12 * SC, PB_X = 16 * SC, PB_Y = 30 * SC;
  k.add([k.text("⛰️ Rampa do Cristo", { size: fs(7), font: "pressstart2p" }), k.pos(PB_X, 12 * SC), k.color(255, 255, 255), k.z(41), k.fixed(), "hud"]);
  k.add([k.rect(PB_W, PB_H, { radius: 3 * SC }), k.pos(PB_X, PB_Y), k.color(40, 40, 48), k.z(40), k.fixed(), "hud"]);
  const pbFill = k.add([k.rect(1, PB_H, { radius: 3 * SC }), k.pos(PB_X, PB_Y), k.color(120, 220, 120), k.z(41), k.fixed(), "hud"]);
  function updateProgress() {
    const t = Math.min(1, elapsed / SURVIVE_TIME);
    pbFill.width = Math.max(1, PB_W * t);
  }

  // ── Texto flutuante de feedback ────────────────────────────────────────────
  function floatText(x, y, txt, col) {
    const p = k.add([
      k.text(txt, { size: fs(14), font: "pressstart2p" }),
      k.pos(x, y), k.anchor("center"),
      k.color(col[0], col[1], col[2]), k.opacity(1), k.z(16), k.fixed(),
    ]);
    k.tween(y, y - 30 * SC, 0.5, v => { p.pos.y = v; });
    k.tween(1, 0, 0.5, v => { p.opacity = v; });
    k.wait(0.5, () => { if (p.exists()) p.destroy(); });
  }

  // ── Obstáculos ─────────────────────────────────────────────────────────────
  // mul = tamanho relativo à altura dos personagens (mantém proporção em qualquer tela)
  const obstacleTypes = [
    { sprite: "obs_pedra",    scale: 9,   speedMul: 1.0, sound: null,   anim: null   },
    { sprite: "obs_galho",    scale: 9,   speedMul: 1.0, sound: null,   anim: null   },
    { sprite: "obs_cachorro", scale: 7,   speedMul: 1.0, sound: "bark", anim: "run"  },
    { sprite: "obs_acai",     scale: 10, speedMul: 1.0, sound: "pop",  anim: "ride" },
    { sprite: "obs_ciclista", scale: 10,   speedMul: 1.7, sound: null,   anim: "ride" },
  ];
  function spawnObstacle() {
    const def = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const ob = k.add([
      k.sprite(def.sprite),
      k.pos(SW + 50 * SC, GROUND_Y), k.anchor("bot"),
      k.scale(def.scale),
      k.z(5), k.fixed(), "subida-ob",
      { speedMul: def.speedMul, hitDone: false },
    ]);
    if (def.anim) ob.play(def.anim);
    if (def.sound === "bark") playBark();
    if (def.sound === "pop")  playPop();
    return ob;
  }

  // ── AABB ───────────────────────────────────────────────────────────────────
  const overlap = (a, b) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  function charBox() {
    const w = pairW * 0.62, h = pairH * 0.78;          // caixa generosa (justa para o jogador)
    const bottom = GROUND_Y - jumpOffset;
    return { x: CHAR_X - w / 2, y: bottom - h, w, h };
  }
  function obBox(ob) {
  const w = ob.width  * ob.scale.x * 0.60;
  const h = ob.height * ob.scale.y * 0.4;
  return { x: ob.pos.x - w / 2, y: ob.pos.y - ob.height * ob.scale.y, w, h };
}

  function loseLife(ob) {
    erros++;
    updateLives();
    playHit();
    invulnTimer = 1.0;
    floatText(ob.pos.x, GROUND_Y - pairH * 0.7, "\u{1F4A5}", [255, 120, 80]);
    if (erros >= 3) onDeath();
  }

  // ── Derrota: mensagem cômica rápida → fade para preto → menu ───────────────
  function onDeath() {
    if (gameEnded) return;
    gameEnded = true;
    playFail();
    k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0.5), k.z(59), k.fixed()]);
    k.add([
      k.text("Vish... \u{1F635}", { size: fs(20), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.42), k.anchor("center"),
      k.color(255, 90, 90), k.z(60), k.fixed(),
    ]);
    k.add([
      k.text("Bora de novo!", { size: fs(9), font: "pressstart2p", align: "center" }),
      k.pos(SW / 2, SH * 0.55), k.anchor("center"),
      k.color(255, 255, 255), k.z(60), k.fixed(),
    ]);
    const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(70), k.fixed()]);
    k.wait(1.2, () => {
      k.tween(0, 1, 0.8, v => { fade.opacity = v; }).onEnd(() => { k.go("menu"); });
    });
  }

  // ── Vitória: fade suave → menu ──────────────────────────────────────────────
  function onWin() {
    if (gameEnded) return;
    gameEnded = true;
    playWin();
    const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(70), k.fixed()]);
    k.tween(0, 1, 1.2, v => { fade.opacity = v; }).onEnd(() => { k.go("menu"); });
  }

  // ── Pause (escape) ─────────────────────────────────────────────────────────
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

  // ── Introdução ─────────────────────────────────────────────────────────────
  const introBg = k.add([k.rect(SW, 78 * SC), k.pos(SW / 2, SH * 0.30), k.anchor("center"), k.color(18, 4, 32), k.opacity(0), k.z(44), k.fixed()]);
  const introTxt = k.add([
    k.text("Ajude Vivi e Gigi a subirem a\nRampa do Cristo!", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.82 }),
    k.pos(SW / 2, SH * 0.30), k.anchor("center"),
    k.color(255, 245, 255), k.opacity(0), k.z(45), k.fixed(),
  ]);
  k.tween(0, 1, 0.5, v => { introTxt.opacity = v; introBg.opacity = v * 0.7; });
  k.wait(3.5, () => {
    k.tween(1, 0, 0.5, v => { introTxt.opacity = v; introBg.opacity = v * 0.7; })
      .onEnd(() => { introTxt.destroy(); introBg.destroy(); started = true; });
  });

  // ── Loop principal ─────────────────────────────────────────────────────────
  k.onUpdate(() => {
    if (paused || gameEnded) return;
    const dt = k.dt();

    // Pulo (sincronizado nos dois)
    if (!onGround) {
      jumpOffset += vy * dt;
      vy -= GRAVITY * dt;
      if (jumpOffset <= 0) { jumpOffset = 0; vy = 0; onGround = true; }
    }
    vivi.pos.y = GROUND_Y - jumpOffset;
    gigi.pos.y = GROUND_Y - jumpOffset;

    // Piscar durante a invencibilidade
    if (invulnTimer > 0) {
      invulnTimer -= dt;
      const bl = Math.sin(k.time() * 30) > 0 ? 1 : 0.4;
      vivi.opacity = bl; gigi.opacity = bl;
    } else {
      vivi.opacity = 1; gigi.opacity = 1;
    }

    // Cenário sempre rola (mesmo durante a introdução)
    const spd = worldSpeed();
    const p = Math.min(1, elapsed / SURVIVE_TIME);
    dashes.forEach(d => {
      d.pos.x -= spd * dt;
      if (d.pos.x < -40 * SC) {
        d.pos.x = SW + k.rand(0, 60 * SC);
        d.pos.y = GROUND_Y + k.rand(14 * SC, (SH - GROUND_Y) - 10 * SC);
      }
    });
    hills.forEach(h => {
      h.pos.x -= spd * 0.25 * dt;
      if (h.pos.x < -h.radius) h.pos.x = SW + h.radius;
      h.color = k.rgb(Math.round(90 - 45 * p), Math.round(70 - 40 * p), Math.round(120 - 55 * p));
    });
    setSky(p);
    sun.pos.y  = lerpN(SUN_TOP, SUN_BOT, p);
    sun.color  = k.rgb(255, Math.round(240 - 120 * p), Math.round(180 - 130 * p));

    if (!started) return;

    // Cronômetro / progresso
    elapsed += dt;
    updateProgress();

    // Spawn de obstáculos (intervalo encurta com o tempo)
    spawnTimer += dt;
    if (spawnTimer >= nextSpawn) {
      spawnObstacle();
      spawnTimer = 0;
      nextSpawn = Math.max(0.8 * SPAWN_INTERVAL_MUL, (k.rand(1.3, 2.1) - elapsed * 0.015) * SPAWN_INTERVAL_MUL);
    }

    // Move obstáculos + colisão
    const cb = charBox();
    k.get("subida-ob").forEach(ob => {
      ob.pos.x -= spd * ob.speedMul * dt;
      if (ob.pos.x < -60 * SC) { ob.destroy(); return; }
      if (!ob.hitDone && invulnTimer <= 0 && overlap(cb, obBox(ob))) {
        ob.hitDone = true;
        loseLife(ob);
      }
    });

    // Vitória
    if (elapsed >= SURVIVE_TIME) onWin();
  });
});

// ── Cena: CHALLENGE – A BATALHA (cópia de minigame_beijo, dificuldade +) ───
k.scene("challenge_batalha", () => {

  // ── Constantes ───────────────────────────────────────────────────────────
  const TILE = 16, TSCALE = 2, TSIZE = TILE * TSCALE;
  const SPEED       = 180 * SC;
  const MARGIN      = 20 * SC;
  const SWING_RANGE = 55 * SC;
  const SWING_DUR   = 0.15;
  const SWING_CD    = 0.4;
  const KISS_DIST   = 22 * SC;

  // ── Dificuldade aumentada ──────────────────────────────────────────────────
  const ENEMY_SPEED_MUL = 1.5;   // velocidade dos inimigos (beijos) ×1.5
  const SPAWN_RATE_MUL  = 0.7;   // intervalo de spawn 30% mais curto
  const DEFEAT_LIMIT    = 4;     // o jogador "perde uma vida": 5 -> 4 beijos sofridos
  // +5 hits para vencer: ondas com mais inimigos (3->5, 5->8; chefe inalterado)

  // ── Estado ───────────────────────────────────────────────────────────────
  let paused = false, destroyPause = null, gameEnded = false;
  let inputBlocked = true;
  let beijos = 0;
  let waveNum = 0;
  let waveEnemies = [];
  let waveSpawnDone = false;
  let bossHp = 3;
  let swingActive = false, swingCooldown = 0, swingTimer = 0;
  let lastFace = "down";
  let currentAnim = "idle-down";

  // ── Áudio ────────────────────────────────────────────────────────────────
  let actx = null;
  function ctxA() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    return actx;
  }
  function beepSnd(freq, type, dur, vol, freqEnd) {
    try {
      const c = ctxA(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = type; o.frequency.value = freq;
      if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + dur);
      g.gain.setValueAtTime(vol * getEffectsVolume(), c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
      o.start(); o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  function playKiss()    { beepSnd(150, "sine",   0.30, 0.18); }
  function playHit()     { beepSnd(400, "square", 0.15, 0.20, 200); }
  function playDefeated(){ beepSnd(200, "sine",   0.25, 0.15, 600); }
  function playVictory() {
    try {
      const c = ctxA();
      [523, 659, 784, 1047].forEach((f, i) => {
        const t = c.currentTime + i * 0.13;
        const o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.20 * getEffectsVolume(), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        o.start(t); o.stop(t + 0.25);
      });
    } catch (e) {}
  }
  function playBossDefeat() {
    try {
      const c = ctxA();
      [392, 523, 659, 784].forEach((f, i) => {
        const t = c.currentTime + i * 0.12;
        const o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.25 * getEffectsVolume(), t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        o.start(t); o.stop(t + 0.3);
      });
    } catch (e) {}
  }

  // ── Fundo de tiles ───────────────────────────────────────────────────────
  const COLS = Math.ceil(SW / TSIZE) + 1;
  const ROWS = Math.ceil(SH / TSIZE) + 1;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      k.add([k.sprite(Math.random() < 0.08 ? "flower" : "grass"), k.pos(col * TSIZE, row * TSIZE), k.scale(TSCALE), k.z(0)]);
    }
  }

  // ── Gigi (jogador) ───────────────────────────────────────────────────────
  const gigi = k.add([k.sprite("gigi"), k.pos(SW / 2, SH / 2), k.anchor("center"), k.scale(2.2), k.z(5)]);
  gigi.play("idle-down");

  function setGigiAnim(name) {
    if (currentAnim === name) return;
    currentAnim = name;
    gigi.play(name);
  }

  // ── Taco de beisebol ─────────────────────────────────────────────────────
  const bat = k.add([k.rect(6 * SC, 30 * SC), k.pos(SW / 2, SH / 2), k.anchor("center"), k.color(139, 90, 43), k.scale(1), k.rotate(0), k.z(4)]);

  // ── Joystick virtual ─────────────────────────────────────────────────────
  const joystick = controlMode === "joystick"
    ? makeVirtualJoystick(() => inputBlocked || paused)
    : null;

  // ── HUD ──────────────────────────────────────────────────────────────────
  const hudKissSh = k.add([k.text(`\u{1F48B} 0/${DEFEAT_LIMIT}`, { size: fs(9), font: "pressstart2p" }), k.pos(11 * SC, 11 * SC), k.color(0, 0, 0), k.opacity(0.6), k.z(20), k.fixed()]);
  const hudKiss   = k.add([k.text(`\u{1F48B} 0/${DEFEAT_LIMIT}`, { size: fs(9), font: "pressstart2p" }), k.pos( 9 * SC,  9 * SC), k.color(255, 150, 200), k.z(21), k.fixed()]);
  const hudOndaSh = k.add([k.text("Onda: 1/3", { size: fs(9), font: "pressstart2p" }), k.pos(SW - 11 * SC, 11 * SC), k.anchor("right"), k.color(0, 0, 0), k.opacity(0.6), k.z(20), k.fixed()]);
  const hudOnda   = k.add([k.text("Onda: 1/3", { size: fs(9), font: "pressstart2p" }), k.pos(SW -  9 * SC,  9 * SC), k.anchor("right"), k.color(255, 240, 100), k.z(21), k.fixed()]);
  const bossHpLbl = k.add([k.text("Vida: ❤❤❤", { size: fs(9), font: "pressstart2p", align: "center" }), k.pos(SW / 2, 10 * SC), k.anchor("top"), k.color(255, 100, 120), k.z(21), k.fixed()]);
  bossHpLbl.hidden = true;

  function updateHUD() {
    const wl = Math.min(waveNum + 1, 3);
    hudKiss.text = hudKissSh.text = `\u{1F48B} ${beijos}/${DEFEAT_LIMIT}`;
    hudOnda.text = hudOndaSh.text = `Onda: ${wl}/3`;
  }
  function updateBossHud() {
    bossHpLbl.text = "Vida: " + "❤".repeat(bossHp) + "⬛".repeat(3 - bossHp);
  }

  // ── Sistema de inimigos ──────────────────────────────────────────────────
  function spawnEnemy(speed, scale, isBoss) {
    const side = Math.floor(Math.random() * 4);
    let sx, sy;
    if      (side === 0) { sx = k.rand(30 * SC, SW - 30 * SC); sy = -30 * SC; }
    else if (side === 1) { sx = k.rand(30 * SC, SW - 30 * SC); sy = SH + 30 * SC; }
    else if (side === 2) { sx = -30 * SC;      sy = k.rand(30 * SC, SH - 30 * SC); }
    else                 { sx = SW + 30 * SC;  sy = k.rand(30 * SC, SH - 30 * SC); }

    const hCount = isBoss ? 3 : 1;
    const heartObjs = [];
    for (let h = 0; h < hCount; h++) {
      heartObjs.push(k.add([
        k.text("💗", { size: fs(isBoss ? 10 : 8) }),
        k.pos(sx, sy - 30 * SC), k.anchor("center"), k.scale(1), k.z(7),
      ]));
    }

    const enemy = k.add([
      k.sprite("vivi"), k.pos(sx, sy), k.anchor("center"), k.scale(scale), k.z(5),
      { spd: speed, hp: isBoss ? 3 : 1, isBoss, heartObjs, dying: false, kissInvul: 0 },
    ]);
    enemy.play("idle-down");

    enemy.onUpdate(() => {
      if (enemy.dying || gameEnded || !enemy.exists()) return;
      const ex = enemy.pos.x, ey = enemy.pos.y;
      const n = enemy.heartObjs.length;
      enemy.heartObjs.forEach((h, i) => {
        if (h.exists()) {
          h.pos.x = ex + (i - (n - 1) / 2) * 18 * SC;
          h.pos.y = ey - (isBoss ? 42 : 28) * SC;
        }
      });

      if (enemy.kissInvul > 0) {
        enemy.kissInvul -= k.dt();
        enemy.opacity = Math.sin(k.time() * 20) > 0 ? 1 : 0.3;
        return;
      }
      enemy.opacity = 1;

      const dx = gigi.pos.x - ex, dy = gigi.pos.y - ey;
      const dist = Math.hypot(dx, dy);
      if (dist > 0) {
        enemy.pos.x += (dx / dist) * enemy.spd * k.dt();
        enemy.pos.y += (dy / dist) * enemy.spd * k.dt();
        if (Math.abs(dx) >= Math.abs(dy)) {
          enemy.play(dx > 0 ? "walk-right" : "walk-left");
        } else {
          enemy.play(dy > 0 ? "walk-down" : "walk-up");
        }
      }

      if (dist < KISS_DIST) receiveKiss(enemy);
    });

    return enemy;
  }

  function receiveKiss(enemy) {
    if (gameEnded || !enemy.exists() || enemy.kissInvul > 0) return;
    enemy.kissInvul = 1.2;
    beijos++;
    updateHUD();
    playKiss();

    const dx = enemy.pos.x - gigi.pos.x, dy = enemy.pos.y - gigi.pos.y;
    const d  = Math.hypot(dx, dy) || 1;
    k.tween(enemy.pos.x, Math.max(30 * SC, Math.min(SW - 30 * SC, enemy.pos.x + (dx / d) * 100 * SC)), 0.3, v => { if (enemy.exists()) enemy.pos.x = v; });
    k.tween(enemy.pos.y, Math.max(30 * SC, Math.min(SH - 30 * SC, enemy.pos.y + (dy / d) * 100 * SC)), 0.3, v => { if (enemy.exists()) enemy.pos.y = v; });

    const fl = k.add([k.text("💋", { size: fs(14) }), k.pos(gigi.pos.x, gigi.pos.y - 20 * SC), k.anchor("center"), k.z(10), k.fixed()]);
    k.tween(1, 0, 0.5, v => { if (fl.exists()) fl.opacity = v; });
    k.wait(0.5, () => { if (fl.exists()) fl.destroy(); });

    if (beijos >= DEFEAT_LIMIT) triggerDefeat();
  }

  function hitEnemy(enemy) {
    if (!enemy.exists() || enemy.dying || enemy.kissInvul > 0) return;
    playHit();

    if (enemy.isBoss) {
      enemy.hp--;
      bossHp = enemy.hp;
      updateBossHud();
      const h = enemy.heartObjs.pop();
      if (h && h.exists()) {
        k.tween(1, 0, 0.2, v => { if (h.exists()) h.opacity = v; });
        k.wait(0.2, () => { if (h.exists()) h.destroy(); });
      }
      if (enemy.hp <= 0) {
        eliminateEnemy(enemy, true);
      } else {
        enemy.kissInvul = 0.5;
        const dx = enemy.pos.x - gigi.pos.x, dy = enemy.pos.y - gigi.pos.y;
        const d = Math.hypot(dx, dy) || 1;
        k.tween(enemy.pos.x, enemy.pos.x + (dx / d) * 80 * SC, 0.2, v => { if (enemy.exists()) enemy.pos.x = v; });
        k.tween(enemy.pos.y, enemy.pos.y + (dy / d) * 80 * SC, 0.2, v => { if (enemy.exists()) enemy.pos.y = v; });
      }
    } else {
      eliminateEnemy(enemy, false);
    }
  }

  function eliminateEnemy(enemy, isBoss) {
    if (!enemy.exists() || enemy.dying) return;
    enemy.dying = true;
    enemy.heartObjs.forEach(h => { if (h.exists()) h.destroy(); });
    enemy.heartObjs = [];

    for (let i = 0; i < 5; i++) {
      const ang0 = (i / 5) * Math.PI * 2;
      const ex0 = enemy.pos.x, ey0 = enemy.pos.y;
      const s = k.add([
        k.text("★", { size: fs(8) }), k.pos(ex0, ey0),
        k.anchor("center"), k.color(255, 220, 50), k.scale(1), k.z(9),
        { ang: ang0, r: 0, ex: ex0, ey: ey0 },
      ]);
      s.onUpdate(() => { s.ang += 4 * k.dt(); s.r = Math.min(s.r + 100 * SC * k.dt(), 40 * SC); s.pos.x = s.ex + Math.cos(s.ang) * s.r; s.pos.y = s.ey + Math.sin(s.ang) * s.r; });
      k.tween(1, 0, 0.4, v => { if (s.exists()) s.opacity = v; });
      k.wait(0.4, () => { if (s.exists()) s.destroy(); });
    }

    if (isBoss) {
      playBossDefeat();
      bossHpLbl.hidden = true;
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2;
        const spd = k.rand(80, 160) * SC;
        const hh = k.add([
          k.text("💗", { size: fs(10) }), k.pos(enemy.pos.x, enemy.pos.y),
          k.anchor("center"), k.scale(1), k.z(8),
          { vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd },
        ]);
        hh.onUpdate(() => { hh.pos.x += hh.vx * k.dt(); hh.pos.y += hh.vy * k.dt(); });
        k.tween(1, 0, 0.6, v => { if (hh.exists()) hh.opacity = v; });
        k.wait(0.6, () => { if (hh.exists()) hh.destroy(); });
      }
    } else {
      playDefeated();
    }

    const tx = enemy.pos.x < SW / 2 ? -60 * SC : SW + 60 * SC;
    const ty = enemy.pos.y < SH / 2 ? -60 * SC : SH + 60 * SC;
    k.tween(enemy.pos.x, tx, 0.3, v => { if (enemy.exists()) enemy.pos.x = v; });
    k.tween(enemy.pos.y, ty, 0.3, v => { if (enemy.exists()) enemy.pos.y = v; });
    k.wait(0.32, () => {
      if (enemy.exists()) enemy.destroy();
      waveEnemies = waveEnemies.filter(e => e !== enemy);
      k.wait(0.05, checkWaveDone);
    });
  }

  function checkWaveDone() {
    if (gameEnded || !waveSpawnDone) return;
    const alive = waveEnemies.filter(e => e.exists() && !e.dying);
    if (alive.length === 0) {
      waveEnemies = [];
      if (waveNum >= 2) {
        triggerVictory();
      } else {
        waveNum++;
        updateHUD();
        k.wait(0.5, () => showWaveBanner(waveNum + 1, () => startWave(waveNum)));
      }
    }
  }

  // ── Ondas ────────────────────────────────────────────────────────────────
  function startWave(wn) {
    waveSpawnDone = false;
    const cfgs = [
      { count: 5, speed: 70  * SC * ENEMY_SPEED_MUL, scale: 8, interval: 1.5 * SPAWN_RATE_MUL, boss: false },
      { count: 8, speed: 100 * SC * ENEMY_SPEED_MUL, scale: 8, interval: 1.0 * SPAWN_RATE_MUL, boss: false },
      { count: 1, speed: 55  * SC * ENEMY_SPEED_MUL, scale: 12, interval: 0,                    boss: true  },
    ];
    const cfg = cfgs[wn];
    if (cfg.boss) { bossHpLbl.hidden = false; bossHp = 3; updateBossHud(); }

    let spawned = 0;
    function doSpawn() {
      if (gameEnded) return;
      const e = spawnEnemy(cfg.speed, cfg.scale, cfg.boss);
      waveEnemies.push(e);
      spawned++;
      if (spawned < cfg.count) {
        k.wait(cfg.interval, doSpawn);
      } else {
        waveSpawnDone = true;
        k.wait(0.1, checkWaveDone);
      }
    }
    doSpawn();
  }

  function showWaveBanner(num, onDone) {
    inputBlocked = true;
    const tx  = `Onda ${num}!`;
    const sh  = k.add([k.text(tx, { size: fs(16), font: "pressstart2p", align: "center" }), k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC), k.anchor("center"), k.scale(0), k.color(0, 0, 0), k.z(30), k.fixed()]);
    const lbl = k.add([k.text(tx, { size: fs(16), font: "pressstart2p", align: "center" }), k.pos(SW / 2,           SH / 2),           k.anchor("center"), k.scale(0), k.color(255, 220, 50), k.z(31), k.fixed()]);
    k.tween(0, 1.1, 0.2, v => { lbl.scale.x = v; lbl.scale.y = v; sh.scale.x = v; sh.scale.y = v; });
    k.wait(0.22, () => k.tween(1.1, 1.0, 0.1, v => { lbl.scale.x = v; lbl.scale.y = v; sh.scale.x = v; sh.scale.y = v; }));
    k.wait(2.0, () => {
      k.tween(1, 0, 0.2, v => { lbl.opacity = v; sh.opacity = v; });
      k.wait(0.22, () => {
        if (lbl.exists()) lbl.destroy();
        if (sh.exists())  sh.destroy();
        inputBlocked = false;
        if (onDone) onDone();
      });
    });
  }

  // ── Vitória / Derrota → fade para preto → menu ─────────────────────────────
  function triggerDefeat() {
    if (gameEnded) return;
    gameEnded = true; inputBlocked = true;
    const lbl = k.add([k.text("Vivi ganhou hoje... 💋", { size: fs(9), font: "pressstart2p", align: "center", width: SW * 0.7 }), k.pos(SW / 2, SH / 2), k.anchor("center"), k.color(255, 100, 150), k.z(40), k.fixed()]);
    const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(80), k.fixed()]);
    k.wait(1.2, () => {
      if (lbl.exists()) lbl.destroy();
      k.tween(0, 1, 1.0, v => { fade.opacity = v; }).onEnd(() => { k.go("menu"); });
    });
  }

  function triggerVictory() {
    if (gameEnded) return;
    gameEnded = true; inputBlocked = true;
    playVictory();

    const vsh = k.add([k.text("Gigi venceu! 🏆", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.8 }), k.pos(SW / 2 + 2 * SC, SH / 2 - 18 * SC), k.anchor("center"), k.scale(0), k.color(0, 0, 0), k.z(39), k.fixed()]);
    const vlb = k.add([k.text("Gigi venceu! 🏆", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.8 }), k.pos(SW / 2,           SH / 2 - 20 * SC), k.anchor("center"), k.scale(0), k.color(255, 220, 50), k.z(40), k.fixed()]);
    k.tween(0, 1.1, 0.25, v => { vlb.scale.x = v; vlb.scale.y = v; vsh.scale.x = v; vsh.scale.y = v; });
    k.wait(0.27, () => k.tween(1.1, 1.0, 0.12, v => { vlb.scale.x = v; vlb.scale.y = v; vsh.scale.x = v; vsh.scale.y = v; }));

    for (let i = 0; i < 12; i++) {
      k.wait(i * 0.12, () => {
        if (gameEnded) {
          const vy = -k.rand(40, 90) * SC;
          const hh = k.add([k.text("💗", { size: fs(k.rand(8, 14)) }), k.pos(k.rand(0, SW), k.rand(0, SH)), k.anchor("center"), k.scale(1), k.z(25), k.fixed(), { vy }]);
          hh.onUpdate(() => { hh.pos.y += hh.vy * k.dt(); });
          k.tween(1, 0, 1.0, v => { if (hh.exists()) hh.opacity = v; });
          k.wait(1.0, () => { if (hh.exists()) hh.destroy(); });
        }
      });
    }

    const fade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(0), k.z(80), k.fixed()]);
    k.wait(2.0, () => {
      k.tween(0, 1, 1.0, v => { fade.opacity = v; }).onEnd(() => { k.go("menu"); });
    });
  }

  // ── Swing do taco ────────────────────────────────────────────────────────
  function doSwing() {
    if (inputBlocked || paused || swingActive || swingCooldown > 0 || gameEnded) return;
    swingActive = true; swingTimer = 0;

    k.wait(SWING_DUR * 0.5, () => {
      if (gameEnded) return;
      const dirs = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
      const [dx, dy] = dirs[lastFace] || [0, 1];
      const cx = gigi.pos.x + dx * SWING_RANGE * 0.6;
      const cy = gigi.pos.y + dy * SWING_RANGE * 0.6;
      waveEnemies.forEach(e => {
        if (!e.exists() || e.dying || e.kissInvul > 0) return;
        if (Math.hypot(e.pos.x - cx, e.pos.y - cy) < SWING_RANGE) hitEnemy(e);
      });
    });

    k.wait(SWING_DUR, () => { swingActive = false; swingTimer = 0; swingCooldown = SWING_CD; });
  }

  // ── Controles ────────────────────────────────────────────────────────────
  k.onKeyDown("left",  () => { if (inputBlocked || paused) return; gigi.move(-SPEED, 0); setGigiAnim("walk-left");  lastFace = "left";  });
  k.onKeyDown("right", () => { if (inputBlocked || paused) return; gigi.move( SPEED, 0); setGigiAnim("walk-right"); lastFace = "right"; });
  k.onKeyDown("up",    () => { if (inputBlocked || paused) return; gigi.move(0, -SPEED); setGigiAnim("walk-up");    lastFace = "up";    });
  k.onKeyDown("down",  () => { if (inputBlocked || paused) return; gigi.move(0,  SPEED); setGigiAnim("walk-down");  lastFace = "down";  });
  k.onKeyDown("a",     () => { if (inputBlocked || paused) return; gigi.move(-SPEED, 0); setGigiAnim("walk-left");  lastFace = "left";  });
  k.onKeyDown("d",     () => { if (inputBlocked || paused) return; gigi.move( SPEED, 0); setGigiAnim("walk-right"); lastFace = "right"; });
  k.onKeyDown("w",     () => { if (inputBlocked || paused) return; gigi.move(0, -SPEED); setGigiAnim("walk-up");    lastFace = "up";    });
  k.onKeyDown("s",     () => { if (inputBlocked || paused) return; gigi.move(0,  SPEED); setGigiAnim("walk-down");  lastFace = "down";  });

  k.onKeyRelease(() => {
    const any = k.isKeyDown("left") || k.isKeyDown("right") || k.isKeyDown("up")   || k.isKeyDown("down") ||
                k.isKeyDown("a")    || k.isKeyDown("d")     || k.isKeyDown("w")     || k.isKeyDown("s");
    if (!any && !inputBlocked) setGigiAnim("idle-" + lastFace);
  });

  k.onKeyPress("space",  () => { doSwing(); });
  k.onMousePress("left", () => { doSwing(); });

  k.onKeyPress("escape", () => {
    if (gameEnded) return;
    if (paused) { if (destroyPause) { destroyPause(); destroyPause = null; } paused = false; }
    else        { paused = true; destroyPause = makePauseOverlay(() => { paused = false; destroyPause = null; }); }
  });

  // ── Loop principal ───────────────────────────────────────────────────────
  k.onUpdate(() => {
    if (paused || gameEnded) return;

    gigi.pos.x = Math.max(MARGIN, Math.min(SW - MARGIN, gigi.pos.x));
    gigi.pos.y = Math.max(MARGIN, Math.min(SH - MARGIN, gigi.pos.y));

    if (!inputBlocked) {
      const any = k.isKeyDown("left") || k.isKeyDown("right") || k.isKeyDown("up")   || k.isKeyDown("down") ||
                  k.isKeyDown("a")    || k.isKeyDown("d")     || k.isKeyDown("w")     || k.isKeyDown("s");
      if (joystick) {
        joystick.tick();
        if (joystick.isActive()) {
          const { x: jx, y: jy } = joystick.getDir();
          if (Math.abs(jx) > 0.15 || Math.abs(jy) > 0.15) {
            gigi.move(jx * SPEED, jy * SPEED);
            if (Math.abs(jx) >= Math.abs(jy)) { setGigiAnim(jx > 0 ? "walk-right" : "walk-left"); lastFace = jx > 0 ? "right" : "left"; }
            else                               { setGigiAnim(jy > 0 ? "walk-down"  : "walk-up");   lastFace = jy > 0 ? "down"  : "up";   }
          } else if (!any) { setGigiAnim("idle-" + lastFace); }
        } else if (!any) { setGigiAnim("idle-" + lastFace); }
      } else if (!any) { setGigiAnim("idle-" + lastFace); }
    }

    if (swingCooldown > 0) swingCooldown -= k.dt();
    if (swingActive) swingTimer = Math.min(swingTimer + k.dt(), SWING_DUR);

    const faceAngles = { right: -90, down: 0, left: 90, up: 180 };
    const foff       = { right: [18 * SC, 0], left: [-18 * SC, 0], up: [0, -18 * SC], down: [0, 18 * SC] };
    const [fox, foy] = foff[lastFace] || [0, 18 * SC];
    bat.pos.x = gigi.pos.x + fox;
    bat.pos.y = gigi.pos.y + foy;
    bat.angle = (faceAngles[lastFace] || 0) + (swingActive ? (swingTimer / SWING_DUR) * 90 - 30 : 0);
  });

  // ── Sequência inicial ────────────────────────────────────────────────────
  const tsh = k.add([k.text("Desafio: A Batalha", { size: fs(14), font: "pressstart2p", align: "center", width: SW * 0.8 }), k.pos(SW / 2 + 2 * SC, SH / 2 + 2 * SC), k.anchor("center"), k.scale(0), k.color(0, 0, 0),     k.z(40), k.fixed()]);
  const tlb = k.add([k.text("Desafio: A Batalha", { size: fs(14), font: "pressstart2p", align: "center", width: SW * 0.8 }), k.pos(SW / 2,           SH / 2),           k.anchor("center"), k.scale(0), k.color(255, 220, 50), k.z(41), k.fixed()]);
  k.tween(0, 1.1, 0.25, v => { tlb.scale.x = v; tlb.scale.y = v; tsh.scale.x = v; tsh.scale.y = v; });
  k.wait(0.27, () => k.tween(1.1, 1.0, 0.12, v => { tlb.scale.x = v; tlb.scale.y = v; tsh.scale.x = v; tsh.scale.y = v; }));
  k.wait(2.2, () => {
    k.tween(1, 0, 0.3, v => { tlb.opacity = v; tsh.opacity = v; });
    k.wait(0.35, () => {
      if (tlb.exists()) tlb.destroy();
      if (tsh.exists()) tsh.destroy();
      showWaveBanner(1, () => startWave(0));
    });
  });
});

// ── Cena: SELECIONAR MINI-GAME ───────────────────────────────────────────
k.scene("selecionar_minigame", () => {
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
    k.text("Mini-games", { size: fs(16), font: "pressstart2p", align: "center", width: 252 * SC }),
    k.pos(SW / 2, SH / 2 - 122 * SC),
    k.anchor("center"),
    k.color(170, 28, 88),
    k.z(6),
  ]);

  // Botões dos mini-games
  const minigamesData = [
    { label: "O Campinho", scene: "challenge_campinho", color: [100, 160, 255] },
    { label: "A Sintonia", scene: "challenge_sintonia", color: [180,  60,  80] },
    { label: "A Subida",   scene: "challenge_subida",   color: [240, 140,  50] },
    { label: "A Batalha",  scene: "challenge_batalha",  color: [220,  80, 140] },
  ];

  minigamesData.forEach((mg, i) => {
    const base  = mg.color;
    const hover = [Math.min(255, base[0] + 25), Math.min(255, base[1] + 25), Math.min(255, base[2] + 25)];
    const y = SH / 2 - 70 * SC + i * 52 * SC;
    const btn = k.add([
      k.rect(230 * SC, 40 * SC, { radius: 10 * SC }),
      k.pos(SW / 2, y),
      k.anchor("center"),
      k.color(base[0], base[1], base[2]),
      k.area(),
      k.z(6),
    ]);
    k.add([
      k.text(mg.label, { size: fs(8), font: "pressstart2p", align: "center", width: 215 * SC }),
      k.pos(SW / 2, y),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(7),
    ]);
    btn.onHover(() => { btn.color = k.rgb(hover[0], hover[1], hover[2]); document.body.style.cursor = "pointer"; });
    btn.onHoverEnd(() => { btn.color = k.rgb(base[0], base[1], base[2]); document.body.style.cursor = "default"; });
    btn.onClick(() => { document.body.style.cursor = "default"; k.go(mg.scene); });
  });

  // Botão Voltar
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
    k.go("selecionar_fase");
  });
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

// ── Cena: FINAL ──────────────────────────────────────────────────────────────
k.scene("final", () => {

  // ── Música (until_i_found_you.mp3) ───────────────────────────────────────
  let musicCtx = null, musicGain = null, musicSource = null, sceneGone = false;
  (function initMusic() {
    try {
      musicCtx = new (window.AudioContext || window.webkitAudioContext)();
      musicGain = musicCtx.createGain();
      musicGain.gain.value = volumeGeral * volumeMusica * 0.7;
      musicGain.connect(musicCtx.destination);
      fetch("/audio/until_i_found_you.mp3")
        .then(r => r.arrayBuffer())
        .then(b => musicCtx.decodeAudioData(b))
        .then(decoded => {
          if (sceneGone) return;
          musicSource = musicCtx.createBufferSource();
          musicSource.buffer = decoded;
          musicSource.loop = true;
          musicSource.connect(musicGain);
          musicSource.start();
        }).catch(() => {});
    } catch (e) {}
  })();

  function stopMusic(fadeDur) {
    sceneGone = true;
    if (!musicGain || !musicCtx) return;
    try {
      if (fadeDur > 0) {
        musicGain.gain.linearRampToValueAtTime(0, musicCtx.currentTime + fadeDur);
        k.wait(fadeDur + 0.1, () => { try { if (musicSource) musicSource.stop(); } catch (e) {} });
      } else {
        musicGain.gain.value = 0;
        try { if (musicSource) musicSource.stop(); } catch (e) {}
      }
    } catch (e) {}
  }

  // ── Fundo preto (momentos 1 e 2) ─────────────────────────────────────────
  const blackBg = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.z(0), k.fixed()]);

  // ── Partículas 💛 em loop (momentos 1 e 2) ───────────────────────────────
  const hParts = [];
  for (let i = 0; i < 9; i++) {
    const h = k.add([
      k.text("❤️", { size: fs(Math.round(k.rand(7, 13))) }),
      k.pos(k.rand(0, SW), SH + k.rand(0, SH * 0.6)),
      k.anchor("center"), k.opacity(k.rand(0.25, 0.65)), k.z(1), k.fixed(),
      { vy: -(k.rand(20, 45) * SC) },
    ]);
    hParts.push(h);
  }
  let heartsActive = true;
  k.onUpdate(() => {
    if (!heartsActive) return;
    hParts.forEach(h => {
      if (!h.exists()) return;
      h.pos.y += h.vy * k.dt();
      if (h.pos.y < -20 * SC) { h.pos.y = SH + k.rand(0, 50) * SC; h.pos.x = k.rand(0, SW); }
    });
  });

  // elementos do momento 2 para destruir na transição
  const m2Els = [];

  // ── Polaroid ─────────────────────────────────────────────────────────────
  function makePolaroid(cfg, onDone) {
    const CX = SW / 2, CY = SH / 2;
    const FW = 220 * SC, FH = 240 * SC;
    const phW = 190 * SC, phH = 170 * SC;
    const phY = CY - 22 * SC;
    const capY = CY + 92 * SC;

    const shad  = k.add([k.rect(FW + 6*SC, FH + 6*SC), k.pos(CX + 6*SC, CY + 6*SC), k.anchor("center"), k.color(0, 0, 0), k.opacity(0), k.rotate(cfg.angle), k.scale(0), k.z(10), k.fixed()]);
    const frame = k.add([k.rect(FW, FH),                k.pos(CX, CY),               k.anchor("center"), k.color(248, 246, 242), k.opacity(0), k.rotate(cfg.angle), k.scale(0), k.z(11), k.fixed()]);
    const phBg  = k.add([k.rect(phW, phH),              k.pos(CX, phY),              k.anchor("center"), k.color(...cfg.bgColor), k.opacity(0), k.z(12), k.fixed()]);
    const viEl  = k.add([k.sprite("vivi"), k.pos(CX + cfg.vx * SC, phY + cfg.vy * SC), k.anchor("center"), k.scale(4 * SC), k.opacity(0), k.z(13), k.fixed()]);
    viEl.play("idle-right");
    const giEl  = k.add([k.sprite("gigi"), k.pos(CX + cfg.gx * SC, phY + cfg.gy * SC), k.anchor("center"), k.scale(1.1 * SC), k.opacity(0), k.z(13), k.fixed()]);
    giEl.play("idle-left");
    const cap   = k.add([k.text(cfg.caption, { size: fs(6), font: "pressstart2p", align: "center", width: FW - 14*SC }), k.pos(CX, capY), k.anchor("center"), k.color(80, 80, 80), k.opacity(0), k.z(14), k.fixed()]);

    let detEl = null;
    if (cfg.detail) {
      detEl = k.add([k.text(cfg.detail.t, { size: fs(cfg.detail.fs) }), k.pos(CX + cfg.detail.x * SC, phY + cfg.detail.y * SC), k.anchor("center"), k.opacity(0), k.z(14), k.fixed()]);
    }

    function setOp(v) {
      if (frame.exists()) frame.opacity = v;
      if (shad.exists())  shad.opacity  = v * 0.28;
      [phBg, viEl, giEl, cap].forEach(e => { if (e.exists()) e.opacity = v; });
      if (detEl && detEl.exists()) detEl.opacity = v;
    }
    function scaleFrames(v) {
      [shad, frame].forEach(e => { if (e.exists()) { e.scale.x = v; e.scale.y = v; } });
    }

    k.tween(0, 1.05, 0.45, v => scaleFrames(v))
      .onEnd(() => k.tween(1.05, 1.0, 0.12, v => scaleFrames(v)));
    k.tween(0, 1, 0.5, v => setOp(v));

    k.wait(4.1, () => {
      k.tween(1, 0, 0.5, v => setOp(v)).onEnd(() => {
        [shad, frame, phBg, viEl, giEl, cap].forEach(e => { if (e.exists()) e.destroy(); });
        if (detEl && detEl.exists()) detEl.destroy();
        if (onDone) onDone();
      });
    });
  }

  const polaroidCfgs = [
    { angle: 3,  caption: "Missao das flores 🌸",  bgColor: [120, 185, 120], vx: -35, vy: 20, gx: 28, gy: 20, detail: { t: "🌸", fs: 13, x: 58, y: -55 } },
    { angle: -2, caption: "Primeiro beijo 💋",      bgColor: [200, 155, 185], vx: -18, vy: 20, gx: 16, gy: 20, detail: { t: "💋", fs: 13, x:  0, y: -50 } },
    { angle: 2,  caption: "Rampa do Cristo 🌅",     bgColor: [210, 130,  60], vx: -35, vy: 20, gx: 28, gy: 20, detail: { t: "🌅", fs: 13, x: 62, y: -52 } },
    { angle: -3, caption: "28 de junho de 2026 ❤️", bgColor: [ 80, 110, 190], vx: -38, vy: 20, gx: 30, gy: 20, detail: { t: "💛", fs: 11, x: -4, y: -50 } },
  ];

  // ── Momento 2: Mensagem do Vini ───────────────────────────────────────────
  const MSG_LINES = [
    "Gigi,", "", "obrigado por existir",
    "e por fazer parte", "da minha vida.", "",
    "esse jogo é pra voce.", "","Cada momento que vivemos juntos", " ", "são os melhores da minha vida",
    "te amo muito. ❤️", "", "— Vivi",
  ];

  function startMoment2() {
    const v2 = k.add([k.sprite("vivi"), k.pos(SW * 0.44, SH * 0.80), k.anchor("center"), k.scale(8.5), k.z(2), k.fixed()]);
    v2.play("idle-right");
    const g2 = k.add([k.sprite("gigi"), k.pos(SW * 0.56, SH * 0.80), k.anchor("center"), k.scale(2.2), k.z(2), k.fixed()]);
    g2.play("idle-left");
    m2Els.push(v2, g2);

    let actxM = null;
    function getCtxM() { if (!actxM) actxM = new (window.AudioContext || window.webkitAudioContext)(); return actxM; }
    function playTyping() {
      try {
        const c = getCtxM(), o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = "square"; o.frequency.value = 800 + Math.random() * 400;
        g.gain.setValueAtTime(0.04 * getEffectsVolume(), c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.04);
        o.start(); o.stop(c.currentTime + 0.04);
      } catch (e) {}
    }

    const LINE_H = 17 * SC;
    const startY = SH * 0.07;
    let lineIdx = 0;

    function typeNextLine() {
      if (lineIdx >= MSG_LINES.length) { k.wait(2.0, startMoment3); return; }
      const text = MSG_LINES[lineIdx];
      const y = startY + lineIdx * LINE_H;
      lineIdx++;
      if (!text) { k.wait(0.3, typeNextLine); return; }
      const lbl = k.add([k.text("", { size: fs(8), font: "pressstart2p", align: "center" }), k.pos(SW / 2, y), k.anchor("center"), k.color(255, 255, 255), k.z(22), k.fixed()]);
      m2Els.push(lbl);
      let ci = 0;
      function step() {
        if (ci >= text.length) { k.wait(0.6, typeNextLine); return; }
        lbl.text = text.slice(0, ci + 1);
        playTyping(); ci++;
        k.wait(0.03, step);
      }
      step();
    }

    typeNextLine();
  }

  // ── Momento 3: Recompensa ─────────────────────────────────────────────────
  function startMoment3() {
    heartsActive = false;

    // Overlay preto cobre o momento 2 (evita depender de opacity em elementos sem o componente)
    const coverFade = k.add([k.rect(SW, SH), k.pos(0,0), k.color(0,0,0), k.opacity(0), k.z(30), k.fixed()]);
    k.tween(0, 1, 0.6, v => { if (coverFade.exists()) coverFade.opacity = v; }).onEnd(() => {
      m2Els.forEach(e => { if (e.exists()) e.destroy(); });
      hParts.forEach(h => { if (h.exists()) h.destroy(); });
      if (coverFade.exists()) coverFade.destroy();

      // "Obrigado por jogar!" com fade-in
      const thanksTxt = k.add([
        k.text("Obrigado por jogar!", { size: fs(11), font: "pressstart2p", align: "center", width: SW * 0.85 }),
        k.pos(SW / 2, SH * 0.35), k.anchor("center"),
        k.color(255, 255, 255), k.opacity(0), k.z(15), k.fixed(),
      ]);
      k.tween(0, 1, 0.7, v => { if (thanksTxt.exists()) thanksTxt.opacity = v; });

      // Caixinha rosa com laço (k.scale(1) necessário para o pulso)
      const BOX_W  = 50 * SC, BOX_H  = 50 * SC;
      const BOX_Y1 = SH * 0.55;
      const BOX_Y0 = SH + 60 * SC;
      const BOW_OFF = BOX_H / 2 + 8 * SC;

      const boxBody = k.add([k.rect(BOX_W, BOX_H), k.pos(SW/2, BOX_Y0), k.anchor("center"), k.color(255,105,180), k.opacity(0), k.scale(1), k.z(15), k.fixed()]);
      const hRib   = k.add([k.rect(BOX_W + 6*SC, 5*SC), k.pos(SW/2, BOX_Y0), k.anchor("center"), k.color(255,255,255), k.opacity(0), k.scale(1), k.z(16), k.fixed()]);
      const vRib   = k.add([k.rect(5*SC, BOX_H), k.pos(SW/2, BOX_Y0), k.anchor("center"), k.color(255,255,255), k.opacity(0), k.scale(1), k.z(16), k.fixed()]);
      const bow1   = k.add([k.rect(24*SC, 5*SC), k.pos(SW/2, BOX_Y0 - BOW_OFF), k.anchor("center"), k.rotate(40), k.color(255,255,255), k.opacity(0), k.scale(1), k.z(17), k.fixed()]);
      const bow2   = k.add([k.rect(24*SC, 5*SC), k.pos(SW/2, BOX_Y0 - BOW_OFF), k.anchor("center"), k.rotate(-40), k.color(255,255,255), k.opacity(0), k.scale(1), k.z(17), k.fixed()]);
      const boxEls = [boxBody, hRib, vRib, bow1, bow2];

      let boxPulse = false;
      k.onUpdate(() => {
        if (!boxPulse) return;
        const s = 1 + 0.05 * Math.sin(k.time() * 3);
        boxEls.forEach(b => { if (b.exists()) { b.scale.x = s; b.scale.y = s; } });
      });

      k.wait(0.6, () => {
        [boxBody, hRib, vRib].forEach(b => {
          k.tween(BOX_Y0, BOX_Y1, 0.65, v => { if (b.exists()) b.pos.y = v; });
          k.tween(0, 1, 0.55, v => { if (b.exists()) b.opacity = v; });
        });
        [bow1, bow2].forEach(b => {
          k.tween(BOX_Y0 - BOW_OFF, BOX_Y1 - BOW_OFF, 0.65, v => { if (b.exists()) b.pos.y = v; });
          k.tween(0, 1, 0.55, v => { if (b.exists()) b.opacity = v; });
        });

        k.wait(0.75, () => {
          boxPulse = true;

          // Botão "Coletar recompensa"
          const bBrd = k.add([k.rect(238*SC, 48*SC, { radius: 10*SC }), k.pos(SW/2, SH*0.75), k.anchor("center"), k.color(255,105,180), k.opacity(0), k.z(14), k.fixed()]);
          const bBod = k.add([k.rect(232*SC, 42*SC, { radius:  8*SC }), k.pos(SW/2, SH*0.75), k.anchor("center"), k.color(18,4,32), k.opacity(0), k.area(), k.z(15), k.fixed()]);
          const bLbl = k.add([k.text("Coletar recompensa", { size: fs(8), font: "pressstart2p", align: "center", width: 220*SC }), k.pos(SW/2, SH*0.75), k.anchor("center"), k.color(255,255,255), k.opacity(0), k.z(16), k.fixed()]);

          [bBrd, bBod, bLbl].forEach(b => { k.tween(0, 1, 0.5, v => { if (b.exists()) b.opacity = v; }); });

          bBod.onHover(() => { bBod.color = k.rgb(40,10,60); document.body.style.cursor = "pointer"; });
          bBod.onHoverEnd(() => { bBod.color = k.rgb(18,4,32); document.body.style.cursor = "default"; });
          bBod.onClick(() => {
            document.body.style.cursor = "default";
            stopMusic(0.8);
            const fade = k.add([k.rect(SW, SH), k.pos(0,0), k.color(0,0,0), k.opacity(0), k.z(80), k.fixed()]);
            k.tween(0, 1, 0.8, v => { if (fade.exists()) fade.opacity = v; }).onEnd(() => k.go("menu"));
          });
        });
      });
    });
  }

  // ── Sequência: entrada → polaroids → mensagem → créditos ─────────────────
  const entryFade = k.add([k.rect(SW, SH), k.pos(0, 0), k.color(0, 0, 0), k.opacity(1), k.z(50), k.fixed()]);
  k.tween(1, 0, 1.0, v => { if (entryFade.exists()) entryFade.opacity = v; })
    .onEnd(() => { if (entryFade.exists()) entryFade.destroy(); });

  function runPolaroids(idx) {
    if (idx >= polaroidCfgs.length) { k.wait(0.3, startMoment2); return; }
    makePolaroid(polaroidCfgs[idx], () => runPolaroids(idx + 1));
  }
  k.wait(1.0, () => runPolaroids(0));
});

k.go("menu");
