# Especificação de Design & Fluxo — Bicho do Atleta

Este documento estabelece as diretrizes visuais (Style Guide), escolhas tipográficas, a sequência de experiência do usuário (UX) e o comportamento arquitetural de filas para o front-end em Flutter do aplicativo.

## 1. Paleta de Cores (ThemeData Dark & Clean)

O conceito visual mescla a imersão e a adrenalina das casas de aposta (fundo ultra escuro) com a sobriedade e transparência das fintechs (acentos precisos e alta legibilidade).

| Elemento de UI | Cor Hexadecimal | Amostra | Aplicação no Flutter (ThemeData) |
| --- | --- | --- | --- |
| Fundo Principal | `#081423` | ⬛ Deep Dark Blue | `scaffoldBackgroundColor` / Fundo das telas |
| Superfícies/Cards | `#1A2D3A` | 🟦 Dark Slate | `cardColor` / Containers de jogos e extratos |
| Ação Principal (CTA) | `#C8993D` | 🟨 Trophy Gold | `colorScheme.primary` / Botões de enviar bicho e destaques |
| Sucesso / Lucro | `#2A8C4A` | 🟩 Bicho Green | `colorScheme.success` / Saldos ativos, Pix e Trust Bar |
| Texto Principal | `#FFFFFF` | ⬜ Pure White | Títulos grandes, placares e nomes de times |
| Texto Secundário | `#BCC6CD` | 🟪 Light Gray | Legendas, descrições secundárias e datas |

## 2. Tipografia & Fontes

A estratégia tipográfica divide o aplicativo em dois momentos: a emoção do esporte (títulos robustos e imponentes) e a segurança financeira (números perfeitamente legíveis).

### Fonte Principal: `Montserrat` (ou `Kanit`)

- Propósito: Títulos, chamada de marcas, nomes de equipes e grandes valores de saldo.
- Estilo Recomendado: `FontWeight.bold` ($700$) ou `FontWeight.black` ($900$) com letras em caixa-alta (Caps Lock) para títulos esportivos.

### Fonte Secundária: `Inter`

- Propósito: Textos corridos, descrições das regras de repasse, históricos de extrato, datas e termos de uso.
- Estilo Recomendado: `FontWeight.normal` ($400$) e `FontWeight.medium` ($500$). Garante precisão geométrica milimétrica para tabelas de números e valores.

## 3. Sequência de Telas (User Journey)

A arquitetura de navegação adota o modelo de Vitrine Aberta, eliminando fricção e exigindo autenticação apenas em momentos transacionais críticos.

```text
[ Splash / Welcome Screen ] (Apresentação e proposta de valor)
         │
         ▼
[ Home: Vitrine de Jogos ] (Navegação livre por modalidades: Futebol, Lutas)
         │
         ├─► [ Detalhes da Partida ]
         │         │
         │         ▼ (Se não logado: aciona [ Tela de Login/Cadastro ])
         │         │
         │         └─► [ Modal / Tela: Definir Valor do Bicho ] ──► [ Feedback de Sucesso ]
         │
         ├─► [ Aba: Wallet ] (Se não logado: aciona [ Tela de Login/Cadastro ])
         │
         └─► [ Aba: Perfil/Configurações ]
```

### Detalhamento das Telas Principais:

1. **Welcome Screen:** Apresenta a marca, exibe a barra de segurança (Trust Bar) com os pilares de transparência e oferece o botão de entrada rápida "Explorar Jogos de Hoje".
2. **Home (Vitrine de Jogos):** Exibe carrossel de categorias de esportes e a listagem de cards de partidas com o volume financeiro acumulado exposto abertamente.
3. **Checkout do Bicho:** Tela simples com slider ou botões de valores rápidos (Ex: R$10, R$20, R$50), seleção do lado escolhido (Time A ou Time B) e o botão de confirmação.
4. **Wallet (Carteira):** Exibição limpa e segregada:
5. **Saldo Disponível** (com botão de Saque via Pix).
6. **Saldo Comprometido** (travado em jogos ativos).
7. **Extrato Cronológico** indicando Entradas (Verde), Saídas (Branco) e Estornos (Azul/Verde).

## 4. Fluxo de Filas e Transações (Back-to-Front)

Para suportar a arquitetura reativa em Spring Boot 3 (Virtual Threads), a interface do usuário em Flutter responderá de forma assíncrona aos estados de processamento de pagamento e resultados.

### Fila de Entrada de Recursos (Aporte via Pix)

```text
[Usuário Solicita Pix] ──► [Gera Payload/QR Code] ──► [Exibe Tela de Espera Ativa (Shimmer)]
                                                                    │
   [Wallet Atualizada via SSE/WebSocket] ◄── [Notificação de Confirmação] ◄┘
```

- **UX Note:** O front-end não trava a tela do usuário. Ele exibe um indicador de carregamento discreto (Shimmer) no card do saldo da Wallet até que o webhook de pagamento do banco processe o Pix.

### Fila de Desfecho de Partida (Vitória vs. Derrota/Empate)

O processamento de picos massivos de encerramento de jogos roda de forma assíncrona. O Flutter consome as atualizações de estado da carteira com o seguinte comportamento visual:

```text
                  ┌─── [ TIME VENCEU ] ───► [ Move Saldo Comprometido para Histórico ]
                  │                          (Status: "Apoiado com Sucesso")
[ Fim da Partida ]┤
                  │
                  └── [ DERROTA/EMPATE ] ─► [ Aciona Animação de Reembolso na Wallet ]
                                             (Saldo Comprometido ──► Saldo Disponível)
```

- **UX de Transparência:** Quando uma partida se encerra em derrota ou empate, o aplicativo exibe uma notificação do tipo Push e um alerta visual amigável dentro do extrato com uma tag azul ou verde de **"Valor Estornado"**, transformando o evento de perda do time em uma experiência positiva de segurança financeira para o usuário.
