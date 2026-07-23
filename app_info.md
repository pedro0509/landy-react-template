# Especificações de Construção do Aplicativo - Bicho do Atleta

Este documento centraliza as especificações técnicas, de design e as regras de negócio para a construção e desenvolvimento contínuo do aplicativo móvel **Bicho do Atleta**.

---

## 🎨 Paleta de Cores Oficial

Abaixo estão listadas as cores oficiais que compõem a identidade visual do projeto e sua devida aplicação:

### Cores Principais

| Cor | Hexadecimal | Descrição / Uso no Site e App |
| :--- | :--- | :--- |
| **🟢 Verde Vibrante** | `#21c45d` | Cor principal da marca. Usada em títulos, textos de destaque, links, bordas de inputs ativos, barras de progresso de apoio e fundo do Footer. |
| **🟡 Laranja/Amarelo** | `#ffa600` | Cor de destaque/interação. Usada para estados de foco (*focus shadow*) nos inputs, botões secundários, badges de destaque e alertas. |
| **🔵 Azul Escuro** | `#091f36` | Cor secundária. Usada como fundo de botões principais, cabeçalhos (*Header* / *AppBar*) ou elementos que exijam contraste escuro. |
| **⚪ Branco Off-White** | `#fafafa` | Cor de fundo geral. Usada no fundo da página (*scaffold body*), cards brancos e caixas de entrada de dados. |

### Cores Auxiliares e de Destaque Técnico

| Cor | Hexadecimal | Descrição / Uso no Site e App |
| :--- | :--- | :--- |
| **🟤 Dourado/Bronze** | `#E8CFA1` / `#D4a93c` | Usada em bordas divisórias de seções especiais, destaques de rankings ou botões utilitários secundários. |
| **🟢 Verde Alerta (Sucesso)** | `#e8f5e9` / `#c8e6c9` / `#2e7d32` | Tons claros e escuros de verde usados especificamente para caixas de mensagem de sucesso ou alertas positivos. |
| **🔴 Vermelho/Rosa Pink** | `#FC0458` | Usada para mensagens de erro nos formulários, validações inválidas e alertas de falha de conexão. |
| **🔘 Cinza Escuro** | `#404041` / `#1f2e4A` | Usada para textos secundários, descrições secundárias e elementos desativados. |

---

## 🗺️ Fluxo de Telas (User Journey)

A navegação está estruturada utilizando `go_router` com rotas públicas e rotas privadas protegidas por um Guard de autenticação:

```text
                                [ 1.0 Splash Screen ]
                                         │ (Verifica Token JWT)
                                         ├───► Sem Token ───► [ 1.1 Login ]
                                         │                       ├──► [ 1.2 Recuperar Senha ]
                                         │                       └──► [ 1.3 Cadastro ]
                                         │
                                         └───► Token Válido ─┐
                                                             ▼
                                                [ 2.0 Home / Vitrine ] (Aba 1)
                                                 ├──► [ 2.1 Detalhes do Jogo ]
                                                 │       └──► [ 2.2 Contribuição (Apoio) ]
                                                 │               └──► Saldo Insuficiente ──► [ 3.1 Depósito Pix ]
                                                 │
                                                 ├──► [ 3.0 Wallet / Carteira ] (Aba 2)
                                                 │       ├──► [ 3.1 Depósito Pix ]
                                                 │       └──► [ 3.2 Solicitação de Saque ]
                                                 │
                                                 └──► [ 4.0 Histórico de Bichos ] (Aba 3)
```

---

## 📋 Regras de Negócio e Requisitos Técnicos

### 1. Acesso e Cadastro (Grupo 1)
* **RF01 (Maioridade)**: O cadastro é realizado em etapas. Na etapa de dados pessoais, o preenchimento da Data de Nascimento deve validar se o torcedor possui **18 anos ou mais**. Caso contrário, o avanço é impedido por segurança.
* **RF02 (Autenticação)**: Oferecer campos para Login Tradicional (E-mail/Senha) e um botão de destaque para o login social com Google.

### 2. Apoio a Partidas (Grupo 2)
* **RF08 (Apoios na Vitrine)**: Cada partida listada na Vitrine (Home) deve detalhar os times envolvidos, data, hora, e exibir visualmente (por meio de barra de progresso) a proporção ou valores absolutos apoiados em cada um dos lados.
* **Valor Mínimo (RF06)**: O valor mínimo aceito para destinação de "bicho" é de **R$ 5,00**.
* **Regulamento de Devolução**:
  * **Time Vencedor**: O valor apoiado vai para o clube (descontada a taxa de administração).
  * **Empate ou Derrota**: O valor reservado retorna integralmente para a carteira livre do torcedor.

### 3. Gestão de Saldo (Grupo 3 - Wallet)
* **RF07 (Segregação de Saldos)**: A Wallet deve exibir claramente:
  1. **Saldo Disponível**: Dinheiro livre para saque ou novos apoios.
  2. **Saldo Reservado**: Dinheiro preso a partidas futuras cujo resultado ainda não foi definido.
* **RF05 (Depósito Pix)**: A tela de depósito gera o QR Code e o código Pix "Copia e Cola" (com botão para cópia rápida). A tela deve monitorar em segundo plano (polling ou Webhook) a compensação do Pix para confirmar o saldo imediatamente.
* **Saque**: O saque deve validar que o valor solicitado está dentro do limite do *Saldo Disponível*.
