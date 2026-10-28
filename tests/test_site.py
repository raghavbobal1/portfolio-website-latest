"""Lightweight checks for the published static portfolio."""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class Markup(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag in {"a", "link", "script"}:
            link = attrs.get("href") or attrs.get("src")
            if link:
                self.urls.append(link)


class PortfolioTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / "index.html").read_text(encoding="utf-8")
        cls.script = (ROOT / "script.js").read_text(encoding="utf-8")
        cls.parser = Markup()
        cls.parser.feed(cls.html)

    def test_key_sections(self):
        for section in ("work", "playground", "about", "contact"):
            with self.subTest(section=section):
                self.assertIn(section, self.parser.ids)

    def test_case_studies(self):
        for project in ("wires", "security", "olbb", "agent", "rag", "incident", "bobal", "paymentlab"):
            with self.subTest(project=project):
                self.assertIn(f'data-project="{project}"', self.html)
                self.assertIn(f"{project}:", self.script)

    def test_experience_and_education(self):
        for value in ("BMO", "Lambton College", "Research Student",
                      "Postgraduate Diploma", "SRM University"):
            self.assertIn(value, self.html)

    def test_contact_details(self):
        self.assertIn("raghavbobal10@gmail.com", self.html)
        self.assertIn('id="copy-email"', self.html)
        self.assertIn('class="copy-email-label"', self.html)
        self.assertIn('class="copy-email-icon"', self.html)
        self.assertIn("copyEmailLabel.textContent='COPIED ✓'", self.script)
        self.assertIn("copied=document.execCommand('copy')===true", self.script)

    def test_all_local_assets_exist(self):
        for url in self.parser.urls:
            if url.startswith(("http:", "https:", "mailto:", "tel:", "#", "data:")):
                continue
            name = url.split("#", 1)[0].split("?", 1)[0]
            self.assertTrue((ROOT / name).is_file(), f"Missing {name}")

    def test_bobal_app_and_github_link(self):
        self.assertIn('class="header-github"', self.html)
        self.assertIn('href="https://github.com/raghavbobal1"', self.html)
        self.assertIn('data-filter="personal"', self.html)
        self.assertTrue((ROOT / "assets" / "bobal-app.png").is_file())

    def test_payment_project_links_to_standalone_repository(self):
        self.assertIn('data-project="paymentlab"', self.html)
        self.assertIn("PERSONAL (02)", self.html)
        self.assertIn("ALL (08)", self.html)
        self.assertIn("https://github.com/raghavbobal1/payment-reliability-api", self.script)
        self.assertFalse((ROOT / "labs" / "payment-reliability-api").exists())

    def test_replayable_engineering_challenge(self):
        for required in ('data-category="mixed"', 'data-category="java"',
                         'data-category="api"', 'data-category="security"',
                         'data-category="cloud"', 'data-category="ai"',
                         'id="challenge-score"', 'id="challenge-streak"',
                         'id="challenge-progress-fill"', 'id="challenge-result"',
                         'id="challenge-options"'):
            with self.subTest(required=required):
                self.assertIn(required, self.html)
        self.assertIn('quiz-engine.js', self.html)
        self.assertIn("quiz.makeRound(category,ROUND_SIZE)", self.script)

    def test_hiring_page_is_reachable_from_home(self):
        self.assertEqual(
            self.html.count('href="hire-software-developer-toronto.html"'), 3
        )
        self.assertTrue((ROOT / "hire-software-developer-toronto.html").is_file())

    def test_five_years_experience_is_consistent(self):
        hiring = (ROOT / "hire-software-developer-toronto.html").read_text(encoding="utf-8")
        self.assertIn("5 years of experience", hiring)
        self.assertIn("I have 5 years of software development experience", hiring)
        self.assertIn("5 years of software development experience", self.html)
        self.assertNotIn("four years", hiring.lower())
        self.assertNotIn("4 years", hiring.lower())

    def test_human_readable_project_copy(self):
        files = (
            "README.md", "docs/PROJECTS.md", "docs/DEPLOYMENT.md",
            "index.html", "script.js", "hire-software-developer-toronto.html",
            "bobal-language-learning-app.html", "quiz-engine.js", "site.webmanifest"
        )
        for path in files:
            with self.subTest(path=path):
                content = (ROOT / path).read_text(encoding="utf-8")
                self.assertNotIn("—", content)
                self.assertNotIn("–", content)
                self.assertNotRegex(content, r",\s+(and|or)\b")
                self.assertNotRegex(content.lower(), r"case[-–—]stud(y|ies)")

    def test_custom_domain_urls(self):
        domain = "https://raghavbobal.com/"
        self.assertEqual((ROOT / "CNAME").read_text(encoding="utf-8").strip(), "raghavbobal.com")
        self.assertIn(f'<link rel="canonical" href="{domain}">', self.html)
        for path in ("robots.txt", "sitemap.xml", "hire-software-developer-toronto.html",
                     "bobal-language-learning-app.html", "privacy.html"):
            with self.subTest(path=path):
                content = (ROOT / path).read_text(encoding="utf-8")
                self.assertIn(domain, content)
                self.assertNotIn("raghavbobal1.github.io/portfolio-website-latest/", content)

    def test_seo_metadata_and_pages(self):
        import xml.etree.ElementTree as ET
        self.assertIn('<link rel="canonical"', self.html)
        self.assertIn('application/ld+json', self.html)
        self.assertIn('schema.org', self.html)
        sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
        urls = [node.text for node in ET.fromstring(sitemap).iter()
                if node.tag.endswith("loc")]
        for page in ("index.html", "hire-software-developer-toronto.html",
                     "bobal-language-learning-app.html"):
            with self.subTest(page=page):
                self.assertTrue((ROOT / page).is_file())
        self.assertEqual(len(urls), 3)
        self.assertIn("hire-software-developer-toronto.html", sitemap)
        self.assertIn("bobal-language-learning-app.html", sitemap)
        self.assertIn("Sitemap:", (ROOT / "robots.txt").read_text(encoding="utf-8"))

    def test_opt_in_analytics_only(self):
        config = (ROOT / "analytics-config.js").read_text(encoding="utf-8")
        analytics = (ROOT / "analytics.js").read_text(encoding="utf-8")
        privacy = (ROOT / "privacy.html").read_text(encoding="utf-8")
        self.assertIn("window.PORTFOLIO_ANALYTICS_ID = '';", config)
        self.assertNotIn("googletagmanager.com/gtag/js", self.html)
        self.assertIn("choice === 'accepted'", analytics)
        self.assertIn("function loadAnalytics()", analytics)
        self.assertIn("consent", privacy.lower())
        self.assertIn("analytics-config.js", self.html)

    def test_resume_download_exists(self):
        self.assertIn('href="assets/Raghav_Bobal_Resume.pdf"', self.html)
        pdf = ROOT / "assets" / "Raghav_Bobal_Resume.pdf"
        self.assertTrue(pdf.is_file())
        self.assertTrue(pdf.read_bytes().startswith(b"%PDF-"))
        self.assertNotIn("data:application/pdf;base64,", self.html)


if __name__ == "__main__":
    unittest.main()
