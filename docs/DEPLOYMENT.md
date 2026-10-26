# Publish the portfolio

The repository contains the complete static site. GitHub Pages is a separate hosting setting and must be enabled on the repository before the public URL works.

## Enable GitHub Pages

1. Open [repository settings](https://github.com/raghavbobal1/portfolio-website-latest/settings/pages).
2. In **Build and deployment**, choose **Deploy from a branch**.
3. Choose branch **main**, folder **/(root)**, then **Save**.
4. Allow GitHub to finish deployment and then open:
   https://raghavbobal1.github.io/portfolio-website-latest/

If the link returns 404 immediately after setup, check **Actions** and **Settings → Pages** for the deployment status.

## Future edits

Edit `index.html` for sections and copy, `styles.css` for layout, and `script.js` for interactions. Commit the change to `main`; GitHub Pages updates the website automatically.

## Checks

```sh
python3 -m unittest discover -s tests -v
node --check script.js
```

The public site intentionally does not embed private bank source code or real customer data.
