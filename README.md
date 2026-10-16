# Oolivo

Plataforma de ferramentas online gratuitas para texto, PDF, imagens, conversões, desenvolvimento e cálculos. O domínio oficial do projeto é **https://oolivo.com.br/**.

## Tecnologias

- HTML, CSS e JavaScript no navegador.
- Gateway Node.js (`gateway.js`) com servidor de conteúdo (`server.js`).
- Integração opcional com Stripe para produtos digitais e planos.
- Processamento local no navegador sempre que a ferramenta permitir.

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm start
```

O gateway atende na porta 3000 e inicia o servidor interno na porta 3001. Para validar a sintaxe JavaScript:

```bash
npm run check
```

## Implantação em servidor Docker

A imagem usa Node.js e inicia `npm start`. Publique a porta 3000 por trás do proxy HTTPS do servidor e mantenha os dados persistentes em `/var/lib/globaltools`.

Exemplo de build:

```bash
docker build -t oolivo:latest .
```

Ao executar o container, configure as variáveis necessárias no painel de hospedagem. Nunca coloque chaves reais no GitHub. As variáveis opcionais de pagamento e e-mail incluem `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` e `RESEND_API_KEY`. O endereço público canônico está definido como `https://oolivo.com.br`.

## Segurança dos dados

- Arquivos locais de usuários e sessões não devem ser versionados.
- O volume `/var/lib/globaltools` deve ser persistente e privado.
- Não envie arquivos `.env`, senhas, hashes, tokens ou dados de usuários para o repositório.
- Se dados sensíveis forem publicados acidentalmente, removê-los da versão atual não elimina o histórico Git; avalie a limpeza do histórico e a rotação das credenciais afetadas.

## SEO

- Domínio canônico: `https://oolivo.com.br/`.
- Sitemap: `https://oolivo.com.br/sitemap.xml`.
- Robots: `https://oolivo.com.br/robots.txt`.
- O conteúdo público deve ser original, útil, revisado e compatível com as políticas das plataformas de publicidade.
