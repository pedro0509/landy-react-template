# Relatório de Desenvolvimento

## Visão geral
Este relatório documenta, em ordem prática, as etapas realizadas no desenvolvimento do app Flutter `Bicho do Atleta`, desde a estrutura inicial até a integração com a API e o refinamento visual das telas.

## 1. Estrutura inicial do app
- Identificação da arquitetura Flutter com navegação centralizada via `GoRouter`.
- Mapeamento das rotas principais em `lib/core/route/app_routes.dart`.
- Reconhecimento do serviço de autenticação local em `lib/core/services/auth_service.dart`.
- Confirmação das telas já existentes: splash, login, cadastro, home, wallet, match details, contribution, history e rotas auxiliares.

## 2. Fluxo inicial de entrada do usuário
- Criação de uma tela inicial pública para usuários não autenticados.
- Implementação da lógica de redirecionamento:
  - usuário autenticado vai para a Home;
  - usuário não autenticado vai para a tela com as opções Login e Novo Cadastro.
- Inclusão da rota pública `/start` e ajuste da regra de redirect.

## 3. Integração com autenticação e cadastro
- Leitura do Swagger local em `http://localhost:8080/swagger-ui/index.html`.
- Identificação dos endpoints disponíveis:
  - `POST /auth/login`
  - `POST /auth/refresh`
  - `POST /api/v1/users`
- Criação do serviço `AuthApiService` para login e refresh.
- Criação do serviço `UserApiService` para cadastro de usuário FAN.
- Persistência dos tokens `access_token` e `refresh_token` no `FlutterSecureStorage`.
- Migração de compatibilidade para token legado `jwt_token`.

## 4. Refresh automático de sessão
- Implementação de renovação automática com `POST /auth/refresh`.
- Detecção de expiração do access token por claim `exp` no JWT.
- Renovação de sessão durante a checagem de autenticação e também na leitura do token.
- Limpeza dos tokens em caso de falha de refresh.

## 5. Estrutura de assets
- Criação da pasta `assets/images/login` para imagens da tela de login.
- Criação da pasta `assets/fonts` para fontes customizadas.
- Registro de assets no `pubspec.yaml`.
- Inclusão das fontes locais:
  - `Motiva-Sans-Bold.ttf`
  - `Motiva-Sans-Light.ttf`

## 6. Sistema visual e identidade
- Atualização da paleta global em `lib/core/theme/app_theme.dart`:
  - fundo principal `#081423`
  - superfícies secundárias `#1A2D3A`
  - cor principal de ação `#C8993D`
  - cor de sucesso `#2A8C4A`
  - texto principal branco e secundário cinza claro
- Aplicação de tipografia:
  - `Montserrat` para nomes, títulos e textos principais;
  - `Kanit` para botões e números;
  - `Motiva Sans Bold` para a escrita `Bicho do Atleta`.
- Configuração do tema para cards, botões, campos, AppBar e BottomNavigationBar.

## 7. Tela de login
- Inserção da logo do app na tela.
- Exibição da escrita `Bicho Do Atleta` logo abaixo da imagem.
- Integração com `POST /auth/login`.
- Remoção do login mockado e do login Google falso para manter o fluxo real.
- Validação de email e senha no formulário.

## 8. Tela de cadastro
- Integração com `POST /api/v1/users`.
- Inclusão dos campos exigidos pela API:
  - nome
  - email
  - CPF
  - celular
  - senha
  - confirmação de senha
  - data de nascimento
- Validação de maioridade.
- Exibição de mensagem de sucesso e redirecionamento para Login após o cadastro.

## 9. Home e navegação principal
- Atualização visual da Home para a nova identidade do projeto.
- Aplicação de cards com fundo escuro e destaque dourado.
- Ajuste do layout inferior para acompanhar a nova paleta.
- Padronização da navegação entre Vitrine, Wallet e Histórico.

## 10. Wallet e Pix
- Reformulação da tela de carteira com a nova hierarquia visual.
- Destaque para saldo disponível e saldo reservado.
- Atualização dos botões `Depositar Pix` e `Sacar Saldo`.
- Ajuste da tela de depósito Pix para o mesmo tema do restante do app.

## 11. Partidas e apoio
- Reformulação da tela de detalhes da partida.
- Criação de cards para apoiar mandante e visitante com visual consistente.
- Atualização da tela de apoio com card principal, regulamento e diálogos estilizados.
- Padronização do feedback visual para saldo insuficiente e apoio confirmado.

## 12. Validação e execução
- Execução de `flutter pub get` após alterações em dependências e assets.
- Uso de `flutter analyze` para validar arquivos alterados.
- Habilitação de suporte Web com `flutter create . --platforms=web` para permitir teste em Chrome.
- Tentativa de execução local para validação manual do app.

## 13. Próximos passos recomendados
- Revisar as telas de Histórico e Saque para fechar a consistência visual.
- Substituir elementos mockados por dados reais da API quando disponíveis.
- Implementar carregamento de imagens finais da logo e demais assets visuais.
- Refinar o tratamento de erros da API com mensagens mais específicas por campo.

## 14. Como executar localmente
1. Instale as dependências:
   ```bash
   flutter pub get
   ```
2. Rode a análise estática:
   ```bash
   flutter analyze
   ```
3. Execute o app no navegador após habilitar o suporte web:
   ```bash
   flutter run -d chrome
   ```
4. Para ambiente desktop Linux, verifique se o projeto possui suporte de desktop configurado antes de rodar:
   ```bash
   flutter run -d linux
   ```

## 15. Observações finais
- A documentação foi organizada para servir como referência de evolução do projeto.
- As rotas, telas e serviços foram implementados de forma incremental para manter o fluxo autenticado funcional.
- A identidade visual atual já está aplicada nas principais telas de navegação e autenticação.
