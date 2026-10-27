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
        for project in ("wires", "security", "olbb", "agent", "rag", "incident", "bobal"):
            with self.subTest(project=project):
                self.assertIn(f'data-project="{project}"', self.html)
                self.assertIn(f"{project}:", self.script)

    def test_experience_and_education(self):
        for value in ("BMO", "Lambton College", "Research Student",
                      "Postgraduate Diploma", "SRM University"):
            self.assertIn(value, self.html)

    def test_contact_details(self):
        self.assertIn("raghavbobal10@gmail.com", self.html)

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

    def test_resume_is_embedded(self):
        self.assertIn("data:application/pdf;base64,", self.html)


if __name__ == "__main__":
    unittest.main()
