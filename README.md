# Momoris Gigica 💕

Um jogo de aventura pixel art feito com muito amor pelo Vivi para a Giovanna, comemorando 4 anos juntos.

---

## Sobre o jogo

Momoris Gigica é um jogo especial e pessoal. Você controla a Giovanna em um campo aberto, explora o mundo, ouve a história do casal e coleta flores espalhadas pelo mapa. É uma pequena cápsula de memórias afetivas em forma de jogo.

---

## Cenas

| Cena | Descrição |
|---|---|
| **Menu** | Tela inicial com botões para iniciar, selecionar fase e trocar o modo de controle |
| **Abertura** | Sequência de mensagens emotivas enquanto a Giovanna explora o campo livremente |
| **Missão 1 – A Surpresa** | Diálogo inicial da Giovanna, seguido da tarefa de coletar 10 flores espalhadas pelo mapa |
| **Celebração 1** | Tela de vitória com buquê animado, partículas e estatísticas da fase |
| **Selecionar Fase** | Tela para escolher uma fase e jogar diretamente, sem a sequência de abertura |

---

## Como jogar

### Teclado (desktop)
| Tecla | Ação |
|---|---|
| `←` `→` `↑` `↓` | Mover a Giovanna |
| `Espaço` / `Enter` | Avançar diálogo |
| `Esc` | Pausar / Retomar |

### Touch (celular / tablet)
- **Joystick virtual** no canto inferior direito para movimentar
- **Toque em qualquer lugar** para avançar o diálogo
- O modo de controle é detectado automaticamente (touch ou teclado) e pode ser trocado no menu

---

## Objetivo da Fase 1

Após os diálogos iniciais, 10 flores surgem espalhadas pelo mapa. Caminhe até cada uma delas para coletar. Ao coletar todas, a fase é concluída e a cena de celebração é exibida.

---

## Stack técnica

| Tecnologia | Uso |
|---|---|
| [Kaplay](https://kaplayjs.com) | Engine de jogos 2D |
| [Vite](https://vite.dev) | Bundler e servidor de desenvolvimento |
| Press Start 2P | Fonte pixel art (Google Fonts) |
| Web Audio API | Efeitos sonoros de digitação e coleta |

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
│   └── main.js        # Todo o código do jogo
└── public/
    └── sprites/
        ├── gigi.png       # Spritesheet da personagem (4x4)
        ├── grass.png
        ├── flower.png
        ├── bird.png
        ├── butterfly.png
        └── bouquet.png
```

---

Feito com amor pelo Vivi para a Giovanna. 💕
