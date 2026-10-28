# Publishing the portfolio

The portfolio is a static site hosted on GitHub Pages.

## GitHub Pages

1. Open the [Pages settings](https://github.com/raghavbobal1/portfolio-website-latest/settings/pages).
2. Choose **Deploy from a branch**.
3. Select **main** and **/(root)** then save.
4. Check the Actions tab for the latest deployment.

Website: https://raghavbobal.com/

## Making changes

Most text is in `index.html` and `script.js`. Styles are in `styles.css`.

Before publishing a change, run:

```bash
python3 -m unittest discover -s tests -v
node --check script.js
node --test tests/challenge.test.cjs
```

GitHub Pages publishes changes after they are committed to `main`.

The website should only contain public project details. Don't upload private company code or customer data.

## Custom domain

The repository has a `CNAME` file for `raghavbobal.com`.

In Spaceship Advanced DNS, use these records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | raghavbobal1.github.io |

The CNAME value does not include the repository name. Remove conflicting parking records for @ and www, but leave any unrelated email records unchanged.

Check GitHub Settings > Pages to confirm the custom domain. Enable Enforce HTTPS once the SSL certificate is ready.

Submit `https://raghavbobal.com/sitemap.xml` in Google Search Console.
