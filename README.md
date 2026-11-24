# Juntos pelos Animais de Araçariguama — protótipo

Landing page institucional demonstrativa para validação acadêmica e apresentação do projeto. O conteúdo, os contatos, a chave Pix, as campanhas, os animais e os registros de prestação de contas são fictícios e não realizam transações.

## Como visualizar

O projeto não exige instalação ou compilação. Para evitar limitações do navegador ao abrir arquivos diretamente, execute um servidor local na raiz do projeto:

```powershell
python -m http.server 8080
```

Depois, acesse `http://localhost:8080/`.

## Estrutura

- `index.html`: estrutura semântica da landing page.
- `assets/css/styles.css`: design system, componentes e responsividade.
- `assets/js/data.js`: informações demonstrativas centralizadas.
- `assets/js/main.js`: renderização dos dados e interações.
- `assets/images/`: fotografias ilustrativas, QR Code e favicon.
- `artifacts/screenshots/`: capturas de validação nas resoluções de referência.
- `artifacts/validate-ui.mjs`: roteiro automatizado de validação visual e funcional.
- `code.html`: versão original preservada como referência.
- `screen.png`: captura do protótipo original.

## Principais melhorias

- Conteúdo reorganizado em seis seções, com navegação sticky e menu móvel.
- Hero editorial com fotografia documental e CTAs claros.
- Jornada de ajuda consolidada com Pix demonstrativo, campanha, necessidades atuais e ponto de coleta.
- Prestação de contas com registros configuráveis, expansão, galeria mobile e modal acessível.
- Adoção responsável simplificada, FAQ em accordion e contato integrado.
- Estados de foco, contraste WCAG AA, link de salto, navegação por teclado e suporte a `prefers-reduced-motion`.
- Imagens locais com dimensões definidas, textos alternativos e carregamento tardio abaixo da primeira dobra.

## Atualização dos dados

As informações provisórias ficam em `assets/js/data.js`. Contatos, chave Pix, campanha, necessidades, registros, animal, ponto de coleta e FAQ podem ser substituídos sem alterar a marcação principal.

Para ocultar a campanha, altere `campaign.active` para `false`.

## Dependências externas

O protótipo usa Tailwind CSS via CDN, Google Fonts, Font Awesome e mapa incorporado do OpenStreetMap. A interface permanece legível caso a logomarca remota original não carregue, utilizando um fallback textual da marca.

## Validação executada

A interface foi renderizada em Chromium nas larguras de 1440, 1280, 1024, 768, 430, 390 e 360 px. A rodada automatizada verificou ausência de overflow horizontal e de erros no console, carregamento das imagens, menu móvel, navegação por âncoras, cópia da chave Pix, expansão de registros, modal e comprovante, fechamento por `Esc` e FAQ.

Para repetir o roteiro opcional de validação:

```powershell
npm install --no-save playwright
npx playwright install chromium
node artifacts/validate-ui.mjs
```

## Observação

Não use os dados deste protótipo em produção. Antes de uma publicação oficial, substitua contatos, chave Pix, endereços, links sociais, registros e comprovações pelos dados validados pela organização.

