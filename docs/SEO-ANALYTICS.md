# Search visibility and visitor analytics

This portfolio is hosted on GitHub Pages with no paid website hosting.

## Connect Google Analytics 4 (GA4)

1. Open https://analytics.google.com/ and sign in to your Google account.
2. Create a Google Analytics account/property for the portfolio.
3. Choose a **Web** data stream with URL `https://raghavbobal.com/`.
4. Copy the **Measurement ID** shown in the stream (it starts with `G-`).
5. Edit [`analytics-config.js`](../analytics-config.js) so it contains your measurement ID:

   ```js
   window.PORTFOLIO_ANALYTICS_ID = 'G-EXAMPLE123';
   ```

   Use **your own real G- ID**; the example above will not work. Commit the change to `main`.

6. Once GitHub Pages updates, visitors will see an opt-in choice before the Google script loads. Only opted-in visits will be tracked.
7. Check **Reports → Realtime**, **Reports → User attributes → Demographic details** (country/city, where available) and **Acquisition** in GA4. Some details are subject to data thresholds and may not appear immediately.

**What is and isn't knowable:** GA4 can report approximate city/country, traffic sources, devices and aggregated visits. It does not provide a visitor's name, verified employer, email or precise address. Do not put a private credential or service-account key into this public GitHub repository.

The website includes a [privacy page](../privacy.html), optional-consent banner and a choice stored in browser local storage. Users who decline can still see all website content. Consent can be adjusted using the privacy page.

## Get indexed by Google

1. Open https://search.google.com/search-console
2. Add a **URL prefix** property for `https://raghavbobal.com/`. Use a verification method supported by your current host. If Google provides an HTML file or meta tag, add exactly the verification data that Google gives you.
3. Submit your sitemap:
   `https://raghavbobal.com/sitemap.xml`
4. Use **URL inspection** and **Request indexing** for:
   - Home page
   - `hire-software-developer-toronto.html`
   - `bobal-language-learning-app.html`
5. Review the Pages and Search Performance reports over time to see which pages and queries are being indexed.

Your name, contact info and project material are real. Avoid keyword stuffing, buying low-quality links or pretending to offer an agency service. A recruiter-focused page strengthens relevance, but does not guarantee rankings for competitive queries such as "software developer for hire."

## Important after connecting a domain

The site is configured for `raghavbobal.com`. Connect its DNS records in Spaceship, then check HTTPS. Use `https://raghavbobal.com/` in Google Search Console and the GA4 web stream once the domain is live. See [deployment notes](DEPLOYMENT.md) for the exact DNS records.

## Optional next improvements

- Publish real project repositories, tested screenshots, demos and longer technical write-ups.
- Add a few quality technical articles about your Java/Angular/security work.
- Link this site from your GitHub profile and LinkedIn profile.
- Measure results in Google Search Console rather than repeating keywords.
