# Regras de Seguranca para Desenvolvimento

Este documento define os requisitos minimos de seguranca para o aplicativo Flutter do projeto. O objetivo e reduzir risco de vazamento de dados, abuso de sessao, engenharia reversa e falhas operacionais de release.

Escopo:
- Aplicativo Flutter (Android, iOS e Web quando aplicavel).
- Fluxos de autenticacao, armazenamento local, comunicacao com API e release de producao.

## Classificacao das Regras

- Obrigatoria: requisito bloqueante para release em producao.
- Recomendavel: controle adicional por criticidade, exigido quando o risco de negocio justificar.

## 1. Fundamentos Obrigatorios

### 1.1 Armazenamento Seguro de Dados Sensiveis
Risco: exposicao de tokens, credenciais e dados pessoais em armazenamento inseguro.

Regras:
- Nao armazenar tokens JWT, refresh tokens, senhas ou chaves sensiveis em SharedPreferences, LocalStorage ou SQLite sem criptografia.
- Usar armazenamento seguro baseado em keystore/keychain, como flutter_secure_storage, para credenciais e tokens.
- Limpar dados sensiveis de memoria e storage quando nao forem mais necessarios (ex.: logout, expiracao de sessao, troca de conta).
- Para bancos locais com dados sensiveis, adotar criptografia nativa (ex.: Hive/Isar com chave de criptografia, ou SQLCipher).

Criterios de validacao:
- Nao ha escrita de credenciais em SharedPreferences/LocalStorage.
- Tokens de sessao estao apenas em storage seguro.
- Fluxo de logout remove access token e refresh token.

### 1.2 Segredos e Credenciais Fora do App
Risco: engenharia reversa do binario e extracao de segredos hardcoded.

Regras:
- Nao embutir no codigo fonte chaves privadas, tokens mestres, senhas ou credenciais de infraestrutura.
- Manter segredos reais no backend; o app deve portar apenas o minimo necessario.
- Usar variaveis de build/configuracoes externas para valores nao sensiveis de ambiente.
- Garantir que arquivos de segredo (ex.: .env local) nao sejam versionados.

Criterios de validacao:
- Nao existem segredos hardcoded em codigo Dart/Kotlin/Swift.
- Arquivos de segredo estao no .gitignore.
- Configuracao de ambiente separa desenvolvimento, homologacao e producao.

### 1.3 Comunicacao Segura de Rede
Risco: interceptacao de trafego (MitM), redirecionamento para endpoint malicioso e vazamento de dados.

Regras:
- Usar HTTPS/TLS em 100% das chamadas de API fora do desenvolvimento local.
- Nunca desabilitar validacao de certificado em producao.
- Restringir dominios permitidos para comunicacao da app.
- Definir politica de ambiente:
  - desenvolvimento local controlado: HTTP permitido apenas para localhost/hosts de desenvolvimento.
  - homologacao/producao: HTTPS obrigatorio sem excecao.

Criterios de validacao:
- Nenhuma URL HTTP ativa em configuracao de release.
- Nao existe bypass de validacao TLS em build de producao.
- Dominios autorizados estao explicitamente definidos.

### 1.4 Autenticacao Forte e Sessao
Risco: sequestro de sessao, uso indevido de conta e operacoes sensiveis sem garantia de identidade.

Regras:
- Usar tokens de curta duracao com refresh controlado.
- Exigir reautenticacao local (biometria/PIN) para acoes criticas (ex.: alterar senha, movimentacao financeira, confirmacoes irreversiveis).
- Exigir 2FA para fluxos de alto risco quando aplicavel ao negocio.
- Tratar expiracao e revogacao de sessao de forma explicita.

Criterios de validacao:
- Fluxo de refresh token e expiracao esta implementado e testado.
- Acoes criticas exigem segunda verificacao local.
- Cenarios de revogacao/logout invalidam sessao local corretamente.

### 1.5 Privacidade de Interface
Risco: exposicao visual de dados sensiveis no app switcher, prints e overlays.

Regras:
- Ocultar ou mascarar conteudo sensivel quando o app vai para background.
- Bloquear captura de tela em telas criticas quando requisito de negocio exigir.
- Evitar mostrar dados sensiveis completos em UI quando nao necessario.

Criterios de validacao:
- Telas criticas nao aparecem em claro no app switcher.
- Poltica de screenshot esta aplicada em fluxos sensiveis.

### 1.6 Hardening de Build
Risco: engenharia reversa facilitada e extracao de logica interna.

Regras:
- Gerar build de release com ofuscacao e split de simbolos de debug.
- Desativar logs sensiveis e comportamento de debug em producao.
- Assinar release com chave de producao e pipeline controlado.

Comandos de referencia:
```bash
flutter build apk --obfuscate --split-debug-info=/<diretorio-de-logs>
flutter build ios --obfuscate --split-debug-info=/<diretorio-de-logs>
```

Criterios de validacao:
- Build de release usa flags de ofuscacao.
- Nao ha debug logging sensivel ativo em producao.
- Processo de assinatura e release esta definido e auditavel.

### 1.7 Dependencias e Supply Chain
Risco: vulnerabilidades conhecidas em bibliotecas de terceiros.

Regras:
- Revisar dependencias com frequencia e aplicar updates de seguranca.
- Bloquear release quando houver vulnerabilidades criticas abertas sem excecao aprovada.
- Inventariar SDKs de terceiros e remover os nao utilizados.

Criterios de validacao:
- Relatorio de dependencias atualizado por release.
- Nao ha CVEs criticas sem tratamento formal.

### 1.8 Validacao de Entrada e Superficies Externas
Risco: injecao, abuso de deep links e manipulacao de parametros externos.

Regras:
- Validar e sanitizar entradas de usuario e parametros externos.
- Restringir e validar deep links/URIs aceitos pela aplicacao.
- Nao confiar em dados vindos de fora do app sem validacao de formato e regra.

Criterios de validacao:
- Regras de validacao existem nos fluxos criticos.
- Deep links nao autorizados sao rejeitados.

## 2. Controles Recomendados por Criticidade

Aplicar obrigatoriamente em apps de alto risco (financeiro, dados sensiveis extensivos, alta exposicao regulatoria).

### 2.1 SSL/TLS Pinning
- Recomendavel para risco moderado.
- Obrigatorio para risco alto.
- Deve possuir processo de rotacao de certificado e fallback controlado.

### 2.2 Deteccao de Root/Jailbreak
- Recomendavel para risco moderado.
- Obrigatorio para risco alto.
- Em dispositivo comprometido, limitar funcionalidades ou bloquear app conforme politica de risco.

### 2.3 Integridade da Aplicacao (Code Integrity)
- Recomendavel quando houver risco real de adulteracao de build.
- Validar integridade da aplicacao em runtime, com estrategia de resposta a violacao.

## 3. Checklist Minimo de Release (Gate)

Todos os itens abaixo devem estar conformes para liberar producao:

1. Segredos fora do app e sem hardcode de credenciais.
2. Tokens e credenciais armazenados apenas em storage seguro.
3. HTTPS obrigatorio em release, sem bypass de certificado.
4. Sessao segura: expiracao, refresh controlado e logout efetivo.
5. Reautenticacao para operacoes sensiveis.
6. Logs sensiveis e flags de debug desativados em producao.
7. Build release ofuscada com split debug info.
8. Dependencias auditadas e sem vulnerabilidade critica nao tratada.
9. Validacao de entradas/deep links aplicada em fluxos criticos.
10. Evidencias de validacao de seguranca anexadas ao processo de release.

## 4. Validacao Continua de Seguranca

Minimo esperado no pipeline e na revisao tecnica:

- SAST: analise estatica recorrente para detectar falhas de codigo e configuracao.
- SCA: analise de composicao para vulnerabilidades em dependencias.
- DAST: testes dinamicos em ambiente controlado para rotas criticas.

Cadencia recomendada:
- A cada release: SAST + SCA + checklist de seguranca.
- Periodica (ex.: mensal/trimestral): DAST nas principais jornadas criticas.

## 5. Governanca e Excecoes

- Excecoes de seguranca devem ter aprovacao formal, prazo de validade e plano de mitigacao.
- Nenhuma excecao pode ser permanente sem reavaliacao.
- Este documento deve ser revisado periodicamente e antes de releases com mudancas de autenticacao, pagamentos ou dados sensiveis.

## 6. Referencias de Base

- OWASP Mobile Application Security.
- Boas praticas de seguranca para Flutter e mobile secure coding.
- Politicas internas de release e tratamento de vulnerabilidades do projeto.
