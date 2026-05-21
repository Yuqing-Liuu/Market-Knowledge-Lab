# Market Knowledge Lab

Building a knowledge base for AI investing, quantitative research, trading strategies, and market intelligence.

This static web app helps learners explore stocks, options, market microstructure, Greeks, risk management, macro flows, data tools, and quant finance models.

This is not financial advice. It is a learning and research interface.

## Run Locally

Open `index.html` directly, or run a local static server:

```powershell
.\start-server.ps1
```

Then visit:

```text
http://127.0.0.1:8787/
```

## Deploy

This app is fully static. The deployable files are:

- `index.html`
- `app.js`
- `styles.css`
- `README.md`
- `.github/workflows/pages.yml`
- `.nojekyll`

## GitHub Pages

1. Push the files to a GitHub repository.
2. Go to `Settings > Pages`.
3. Source: `GitHub Actions`.
4. Push to `main`.
5. The workflow in `.github/workflows/pages.yml` will publish the app.

The public URL is:

```text
https://yuqing-liuu.github.io/Market-Knowledge-Lab/
```

## Roadmap

- Move topic data into `topics.json`.
- Add learning paths.
- Add user notes saved in browser storage.
- Add source citations per concept.
- Add optional market data and options-chain integrations.
