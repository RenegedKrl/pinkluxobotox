# Diretrizes e Regras de Desenvolvimento

## 1. Subir sempre para o GitHub (Push Obrigatório)
- **Sempre que concluir alterações ou edições no código**, realizar `git add`, `git commit` com mensagem descritiva e enviar imediatamente com `git push origin main` (ou branch atual).
- O repositório remoto no GitHub deve estar sempre atualizado ao final de cada pedido do usuário.

## 2. Proibido tirar Prints / Screenshots do Site
- **NÃO tirar prints ou capturas de tela dos sites** (não usar Playwright, Puppeteer, Selenium nem subagentes para tirar screenshots).
- Isso atrasa a entrega e o fluxo do serviço.
- Validações devem ser feitas de forma direta, ágil e eficiente no código (ex.: conferência em código, inspeção de arquivos ou `npm run build`), sem gerar capturas visuais.
