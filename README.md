# Momoris Gigica 💕

Um jogo de aventura pixel art feito com muito amor por Vinicius para a Giovanna, comemorando 4 anos juntos.

---

## Sobre o jogo

Momoris Gigica é um jogo especial e pessoal. Você controla a Giovanna e o Vivi em duas fases distintas: uma aventura de coleta de flores e uma partida de futebol no campinho. É uma pequena cápsula de memórias afetivas em forma de jogo.

---

## Cenas

| Cena | Descrição |
|---|---|
| **Menu** | Tela inicial com botões para iniciar, selecionar fase e trocar o modo de controle |
| **Abertura** | Sequência de mensagens emotivas enquanto a Giovanna explora o campo livremente |
| **Missão 1 – A Surpresa** | Diálogo inicial da Giovanna, seguido da tarefa de coletar 10 flores espalhadas pelo mapa |
| **Celebração 1** | Tela de vitória com buquê animado e partículas |
| **Missão 2 – O Campinho** | Mini-jogo de futebol: Vivi enfrenta um adversário, a Gigi e a amiga passeiam pela área de lazer. Marque 10 gols para a cinemática final |
| **Selecionar Fase** | Tela para escolher qualquer fase diretamente |

---

## Missão 1 – A Surpresa

Após os diálogos iniciais, 10 flores surgem espalhadas pelo mapa. Caminhe até cada uma para coletar. Ao coletar todas, a fase é concluída e a celebração é exibida.

---

## Missão 2 – O Campinho

### Campo de futebol (metade esquerda)
- Controle o **Vivi** e tente marcar gols na goleira azul (lado direito do campo)
- O **NPC adversário** persegue a bola ativamente e tenta marcar na goleira vermelha (seu lado)
- Gol do Vivi → **+1 ponto**. Gol do adversário → **-1 ponto** (mínimo 0)
- A bola possui física com fricção e quica nas paredes

### Área de lazer (metade direita)
- A **Gigi** e a **amiga** passeiam e conversam pelo cenário com piscina
- Ao atingir **5 gols**, as duas caminham até a beira do campo para assistir ao jogo

### Cinemática final (10 gols)
1. Controles bloqueados automaticamente
2. Vivi caminha sozinho até encontrar a Gigi
3. Sequência de diálogos entre os personagens
4. Vivi e Gigi saem juntos pela direita — fade e fim de fase

---

## Como jogar

### Teclado (desktop)
| Tecla | Ação |
|---|---|
| `←` `→` `↑` `↓` ou `W` `A` `S` `D` | Mover o personagem |
| `Espaço` / `Enter` | Avançar diálogo |
| `Esc` | Pausar / Retomar |

### Touch (celular / tablet)
- **Joystick virtual** no canto inferior direito para movimentar
- **Toque em qualquer lugar** para avançar diálogo
- O modo de controle é detectado automaticamente e pode ser trocado no menu

---

## Stack técnica

| Tecnologia | Uso |
|---|---|
| [Kaplay](https://kaplayjs.com) | Engine de jogos 2D |
| [Vite](https://vite.dev) | Bundler e servidor de desenvolvimento |
| Press Start 2P | Fonte pixel art (Google Fonts) |
| Web Audio API | Efeitos sonoros de digitação, coleta, gol e apito |

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

### Build para produção

```bash
npm run build
npm run preview
```

---

## Estrutura do projeto

```
├── index.html
├── src/
│   └── main.js              # Todo o código do jogo
└── public/
    └── sprites/
        ├── gigi.png             # Spritesheet da Giovanna (4×4)
        ├── vivi.png             # Spritesheet do Vivi — jogador da Missão 2 (4×4)
        ├── npc_man.png          # Spritesheet do adversário de futebol (4×4)
        ├── npc_woman.png        # Spritesheet da amiga da Gigi (4×4)
        ├── ball.png             # Spritesheet da bola com animação spin (2×1)
        ├── scenario_tiles.png   # Tileset do campinho (8 tiles: campo, linhas, pedra, água)
        ├── grass.png
        ├── flower.png
        ├── tree.png
        ├── bird.png
        ├── butterfly.png
        └── bouquet.png
```

---

Feito com amor por Vinicius para a Giovanna. 💕
