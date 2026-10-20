# Regras de Desenvolvimento e Workflow

## 1. REGRA MANDATÓRIA: Sempre subir para o GitHub após QUALQUER mudança
- **Obrigatório:** Ao terminar qualquer edição, ajuste ou alteração de código, realizar imediatamente `git add`, `git commit -m "..."` e `git push origin main`.
- O repositório remoto no GitHub deve estar sempre atualizado e sincronizado antes de finalizar a resposta ao usuário.

## 2. Nunca tirar Prints / Screenshots dos Sites
- Não executar scripts para tirar prints/screenshots (Playwright, Puppeteer, Selenium, etc.).
- Validações devem ser feitas diretamente no código e de forma rápida, sem atrasar o serviço.

## 3. Comandos Rápidos e Automação de Alta Performance
- **Sync Instantâneo no GitHub:** Sempre execute `cmd.exe /c sync.bat "mensagem do commit"`. Ele compila a produção (`vite build`), adiciona arquivos ao git, commita e faz o push para o GitHub em segundos.
- **Build Rápido:** Execute `cmd.exe /c build.bat`.
- **Caminhos do Sistema:** Git está em `G:\Program Files (x86)\Git\cmd` e Node em `C:\Program Files\nodejs`.
## 4. REGRA DE CONTEÚDO: Proibido 'Botox' ou 'Botulínica'
- **PROIBIDO:** Não utilizar em hipótese alguma os termos "Botox", "botulínica", "toxina botulínica" ou semelhantes em nenhum texto da landing page, títulos, legendas, FAQ, meta tags ou código.
- A clínica trabalha com protocolos e produtos biocompatíveis alternativos, não com a marca Botox.
- Termos recomendados: "Harmonização facial", "suavização de rugas de expressão", "relaxamento da mímica muscular", "procedimento personalizado", "substâncias biocompatíveis homologadas pela Anvisa".
