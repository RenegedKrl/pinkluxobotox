# Diretrizes e Regras de Desenvolvimento

## 1. REGRA MANDATÓRIA: Subir sempre para o GitHub após QUALQUER mudança (Push Obrigatório)
- **Sempre que concluir qualquer alteração ou edição no código**, realizar imediatamente `git add`, `git commit` com mensagem descritiva e enviar com `git push origin main` (ou branch atual).
- O repositório remoto no GitHub deve estar sempre 100% atualizado e sincronizado ao final de cada pedido do usuário antes de encerrar.

## 2. Proibido tirar Prints / Screenshots do Site
- **NÃO tirar prints ou capturas de tela dos sites** (não usar Playwright, Puppeteer, Selenium nem subagentes para tirar screenshots).
- Isso atrasa a entrega e o fluxo do serviço.
- Validações devem ser feitas de forma direta, ágil e eficiente no código (ex.: conferência em código, inspeção de arquivos ou `npm run build`), sem gerar capturas visuais.
