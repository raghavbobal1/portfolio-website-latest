# Raghav Bobal

Software developer based in Toronto.

[Portfolio](https://raghavbobal1.github.io/portfolio-website-latest/) | [GitHub](https://github.com/raghavbobal1) | [LinkedIn](https://www.linkedin.com/in/ACoAAC4Bcc0BImTOCM6A_5gzhyzdk9VVMSNhSLc)

This is my portfolio website. I wanted one place to show the projects I've worked on and the kind of problems I like solving.

Most of my professional experience is in digital banking at BMO. I've worked on Angular and TypeScript interfaces, API integration and security fixes. I'm also building projects around Java, Spring Boot and AI tools.

## Projects

**[Payment Reliability API](https://github.com/raghavbobal1/payment-reliability-api)**

A Java 21 and Spring Boot API that handles payment retries without sending the money twice. It uses fake accounts. The repository has the actual code, instructions and automated tests.

**[Bobal Language Learning App](bobal-language-learning-app.html)**

An earlier Android project with IELTS vocabulary search, flashcards and speaking practice. I included a screenshot from the original app.

The main website also has project details from my BMO work. Those pages explain what I worked on without sharing internal bank code.

## About the website

It's built using plain HTML, CSS and JavaScript. There's a projects section, a systems diagram and a debugging quiz you can play.

You can see the live site here:

https://raghavbobal1.github.io/portfolio-website-latest/

## Run it locally

```bash
git clone https://github.com/raghavbobal1/portfolio-website-latest.git
cd portfolio-website-latest
python3 -m http.server 8000
```

Open http://localhost:8000.

To run the website checks:

```bash
python3 -m unittest discover -s tests -v
node --check script.js
node --test tests/challenge.test.cjs
```

The Java payment API lives in [its own repository](https://github.com/raghavbobal1/payment-reliability-api), not inside this website.

## Other pages

[Hiring and experience](hire-software-developer-toronto.html)

[Google indexing and visitor analytics setup](docs/SEO-ANALYTICS.md)

[Contact me](mailto:raghavbobal10@gmail.com)
