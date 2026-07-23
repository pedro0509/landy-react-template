# Contexto para Antigravity AI (Bicho do Atleta)

Olá, Antigravity! Quando você estiver atuando neste repositório, por favor, considere sempre o contexto e as regras descritas abaixo.

## O Projeto
**Bicho do Atleta** é um aplicativo construído em Flutter que funciona como uma plataforma de apoio financeiro a times esportivos, unindo a emoção dos esportes com a seriedade de uma fintech. O usuário pode fazer aportes via Pix (Wallet), destinar valores a times específicos em partidas reais ("Bicho") e acompanhar os desfechos.

## Stack e Arquitetura
- **Front-end:** Flutter.
- **Navegação:** `GoRouter`.
- **Estilo:** Customizado sem Material UI genérico. Usa cores escuras e identidade própria (`#081423`, `#1A2D3A`, `#C8993D`, `#2A8C4A`).
- **Autenticação:** JWT com Access Token e Refresh Token, armazenados via `flutter_secure_storage`.
- **Integração:** Comunicação REST e suporte a WebSockets/SSE para atualizações de carteira e placar de jogos em tempo real.

## Regras de Atuação do AI
1. **Segurança Primeiro:** Nunca armazene chaves, senhas ou tokens sem criptografia. Evite logs sensíveis no terminal ou nos prints da aplicação.
2. **Design Consistente:** Sempre que criar componentes novos, obedeça rigorosamente a paleta de cores (Dark & Clean) e as fontes (`Montserrat`/`Kanit` para destaque, `Inter` para leitura). Não introduza componentes com fundo branco ou estilo destoante.
3. **UX Responsiva e Transparente:** As transações financeiras (como depósito via Pix ou devolução de aposta/bicho) são processadas em filas virtuais no backend (Spring Boot 3). No app, não bloqueie a tela do usuário: utilize Shimmers e retornos assíncronos.
4. **Navegação Segura:** O app permite navegação anônima na Home (vitrine de jogos). Fluxos de pagamento, carteira e configurações exigem redirecionamento para Login/Cadastro.
5. **Código de Produção:** Evite criar mockups persistentes. Tudo deve ser integrado à API e passar pelo `AuthApiService` e interceptors para refresh token caso haja falha 401.

Siga sempre as especificações detalhadas na pasta `/docs` ao propor novas funcionalidades.

---

## Planejamento da Plataforma de Gerenciamento Web e Landing Page

Este projeto (bicho_do_atleta-site) abrange a Landing Page e o Painel de Gerenciamento. Abaixo estão as fases de desenvolvimento estipuladas com base no Swagger (API):

### 1. Mapa de Rotas (Arquitetura de Informação)
- **Área Pública (Site)**: `/` (Home), `/sobre`, `/contato`.
- **Autenticação**: `/login`, `/cadastro`, `/esqueci-minha-senha`.
- **Painel de Gerenciamento**:
  - `/admin/dashboard` (Visão geral)
  - `/admin/meu-perfil` (Dados, senha, preferências)
  - `/admin/times` (Gestão de Times `TeamDTO`)
  - `/admin/campeonatos` (Gestão de Campeonatos `ChampionshipDTO`)
  - `/admin/partidas` (Gestão de Partidas `MatchDTO` / `UpdateMatchDTO`)

### 2. Fases de Desenvolvimento

#### Fase 1: Setup e Autenticação (Semanas 1-2)
- Inicialização e limpeza do projeto React.
- Configuração do roteador (`react-router`) e Axios.
- Desenvolvimento das telas de Login e Cadastro.
- Integração com endpoints de autenticação e JWT.

#### Fase 2: Layout do Painel Administrativo e Perfis (Semana 3)
- Criação do layout base do Admin (Sidebar, Header).
- Dashboard inicial (mockado).
- Tela de Perfil e Preferências.

#### Fase 3: Gestão de Entidades - CRUDs (Semanas 4-5)
- **Usuários (Admin)**: Listar, Inserir, Editar, Redefinir senha.
- **Usuários (Fan)**: Listar, Redefinir senha.
- **Campeonatos**: Listar, Inserir, Editar.
- **Times/Atletas**: Listar, Inserir, Editar.
- **Jogos/Partidas**: Listar, Inserir, Editar, Atualizar resultado, Excluir.
- Telas seguirão o padrão: Listagem em tabela, ações na própria linha e modais/páginas para insert/edit.

#### Fase 4: Landing Page e Ajustes Finais (Semana 6)
- Adaptação do tema para a Landing Page (Site).
- Responsividade e tratamento global de erros da API.
- Testes finais.
