# KDo Sensei (Karate App)

This repository holds the web layer of **KDo Sensei**—a project that started in **2013** as my **first attempt at building a mobile app**. I was learning how hybrid apps worked, chasing the idea that something I built could live on a phone and help people study Karate the way I wished I could have when I started training.

Back then we framed **PhoneGap** (and the **Cordova** ecosystem) as the path from HTML, CSS, and JavaScript to Android and other targets without rewriting everything in native code. The stack was new to me; every screen, asset, and workaround was part of that first adventure.

Years later I recovered the original web assets and published them again as a static site so the work would not disappear on an old hard drive or a lost build folder. The original app credited **Sergio, Camilo, and Miguel** as authors—this README is my personal look back at that first mobile experiment; the product vision above was ours as a small team at the time.

## Live site

The recovered web app is hosted here:

**https://kdosensei.xergioalex.com**

## What we set out to build (2013)

The core idea was an **illustrated guide**—with room to grow into richer **multimedia**—aimed at **self-taught** practice of Karate and a few **basic self-defense** concepts.

What we wanted to differentiate was:

- **Belt-by-belt guidance** — clear illustration and explanation of the techniques and movements associated with each belt level in Karate.
- **Self-defense as a parallel track** — an intentional, innovative addition alongside traditional Karate curriculum.
- **An illustrated glossary** — technical Karate terms explained visually and in context, so learners could grasp the language of the art, not only the movements.

When we looked at what existed in the market, the elements that stood out as **most distinctive** were exactly that **illustrated technical glossary** and the **self-defense guide**. The glossary helps newcomers understand the foundations of the discipline; the self-defense material offers a **second, complementary path** for anyone building confidence in practical confrontation skills.

(That framing came from our original project summary and competitive scan at the time.)

## Tech stack

- **Apache Cordova / Adobe PhoneGap** — hybrid shell around the web UI for mobile distribution.
- **Static web assets** in `www/` (HTML, CSS, images)—this repo focuses on that layer.

## Repository layout

- `www/` — application entry (`index.html`), styles, media, and historical `config.xml` for the PhoneGap/Cordova widget metadata.

## License

See [LICENSE](LICENSE).
