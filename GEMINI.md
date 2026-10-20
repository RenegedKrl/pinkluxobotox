# Diretrizes e Regras de Desenvolvimento

## 1. REGRA MANDATÓRIA: Subir sempre para o GitHub após QUALQUER mudança (Push Obrigatório)
- **Sempre que concluir qualquer alteração ou edição no código**, realizar imediatamente `git add`, `git commit` com mensagem descritiva e enviar com `git push origin main` (ou branch atual).
- O repositório remoto no GitHub deve estar sempre 100% atualizado e sincronizado ao final de cada pedido do usuário antes de encerrar.

## 2. Proibido tirar Prints / Screenshots do Site
- **NÃO tirar prints ou capturas de tela dos sites** (não usar Playwright, Puppeteer, Selenium nem subagentes para tirar screenshots).
- Isso atrasa a entrega e o fluxo do serviço.
- Validações devem ser feitas de forma direta, ágil e eficiente no código (ex.: conferência em código, inspeção de arquivos ou `npm run build`), sem gerar capturas visuais.

## 3. Automação e Comandos de Alta Performance
- **Sincronização em 1 comando:** Execute `cmd.exe /c sync.bat "mensagem"` (faz `vite build`, `git add`, `git commit` e `git push origin main` instantaneamente).
- **Build Direto:** Execute `cmd.exe /c build.bat`.
- **Ambiente:** Git em `G:\Program Files (x86)\Git\cmd` e Node em `C:\Program Files\nodejs`.
## 4. REGRA DE CONTEÚDO: Proibido 'Botox' ou 'Botulínica'
- **PROIBIDO:** Não utilizar em hipótese alguma os termos "Botox", "botulínica", "toxina botulínica" ou semelhantes em nenhum texto da landing page, títulos, legendas, FAQ, meta tags ou código.
- A clínica trabalha com protocolos e produtos biocompatíveis alternativos, não com a marca Botox.
- Termos recomendados: "Harmonização facial", "suavização de rugas de expressão", "relaxamento da mímica muscular", "procedimento personalizado", "substâncias biocompatíveis homologadas pela Anvisa".
