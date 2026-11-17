# Issue #12: Audit and baseline

Captured: 2026-11-17 (local time, Malaysia). Current site served from the repo root on http://127.0.0.1:8080. No repo files were changed.

Screenshots: `baseline/screenshots/` (desktop 1440×900 and mobile 390×844, full page).
Machine-readable run output: `baseline/report.json`.
Capture script: `baseline/capture.mjs`.

## 1. Page inventory and URL map

| Current file | New URL | Layout | Interactive parts | External dependencies |
|---|---|---|---|---|
| index.html | `/` | Own layout, no navbar | None | Font Awesome, Google Fonts, main.css |
| home-dashboard.html | `/home` | Navbar, footer | Carousel (projectRealCar-cardCarousel.html), scroll arrow | Font Awesome, Bootstrap, jQuery, Twitter links, Our World in Data iframe |
| projects-page.html | `/projects` | Navbar, footer | Scroll arrow, dropdown | GitHub, Google Drive, Calculator .jar, PlatformSimulation releases |
| resume-page.html | `/resume` | Navbar, footer | Scroll arrow | Font Awesome, Bootstrap, jQuery; PDF at files/Resume-MuhammadHilmiBadrolHisham.pdf |
| battle490.html | `/projects/battle490` | Navbar, footer | Screenshot gallery (scripts-490.js, `plusDivs`) | w3.css CDN, YouTube embed, Google Drive APK, 4 PDFs, marker image |
| cuaca.html | `/cuaca` | Navbar, footer | Postcode lookup, accordion, inline script | Bootstrap Icons CDN, malaysia-postcodes CDN, api.data.gov.my |
| blog-index.html | `/blog` | Navbar, footer | Scroll arrow | Tumblr link |
| blog-pages/001-blog-build.html | `/blog/001-blog-build` | Navbar, footer | zero-md (client-side Markdown) | zero-md CDN, webcomponents CDN |
| blog-pages/002-import-html.html | `/blog/002-import-html` | Navbar, footer | zero-md | same as 001 |
| blog-pages/003-cuaca-build.html | `/blog/003-cuaca-build` | Navbar, footer | zero-md | same as 001 |

Shared partials (become Astro components): navbar.html, footerContact.html, projectRealCar-cardCarousel.html.
Not migrated: template.html (scratch template), markdown/test.md (test file).

Assets:
- images/: 22 MB. Three files are not referenced anywhere (see section 4).
- files/: 3.2 MB of PDFs (résumé, Battle-490 documents, PlatformSimDocs.pdf) and markerimg.jpg.
- css/mdb.css: 7,957 lines, vendored from MDB.
- img/svg/: arrow_left.svg and arrow_right.svg, used by mdb.css.

## 2. Baseline run results (weather page, desktop)

Source: `baseline/report.json`.

| Check | Input | Result |
|---|---|---|
| Valid postcode | 43300 | Pass. City shows "Seri Kembangan". Current weather and 7-day accordion shown. Endpoint line shows the API URL. |
| Invalid postcode | 00000 | Pass. "Poskod not found." shown. Results hidden. |
| Padam | — | Pass. Input, city, and results cleared. Accordion hidden. |

API note: the first request to `api.data.gov.my` returned HTTP 301, then HTTP 200. The browser follows the redirect, so the page works. Keep this in mind for the #20 server proxy.

Not run automatically. These need manual checks on the list in section 3:
- Enter key search, error and 429 messages, offline behavior, time-of-day label, accordion, mobile layout.

## 3. Weather behavior checklist (manual checks completed)

Item 11 (HTTP 429) was not tested. It's hard to trigger on purpose.

| # | Check | Automated result | Notes |
|---|---|---|---|
| 1 | Valid postcode, click Cari | Pass | |
| 2 | Valid postcode, press Enter | Pass | Same result as clicking Cari |
| 3 | Invalid postcode | Pass | |
| 4 | Empty input, click Cari | Recorded | Shows "Poskod not found." |
| 5 | Accordion expand and collapse | Pass | First panel open by default |
| 6 | Time-of-day label | Pass | Expected at test time (22:17 local): "Night". Thresholds: before 12:00 Morning, 12:00–19:59 Afternoon, 20:00 onward Night |
| 7 | Weather icons | Pass | Check "tiada hujan" shows the sun, not rain |
| 8 | Endpoint line under results | Pass | |
| 9 | Padam | Pass | |
| 10 | Offline search | **Fail (bug)** | New city name appears, but the forecast and endpoint line stay from the previous search. No error message on screen. See known issue 8. |
| 11 | HTTP 429 message | Pending | Hard to trigger on demand |
| 12 | Mobile layout | Pass | Check screenshot `cuaca-mobile.png` |

## 4. Known issues (recorded, not fixed in #12)

1. **Missing font files.** mdb.css loads Roboto from `../font/roboto/` (css/mdb.css lines 1508–1521). The `font/` folder does not exist, so every page falls back to a system font. Confirmed by 404s in every page's console. Fix in #15 when porting CSS.
2. **Unreferenced files:** `images/coderepo/tsundoku-1.png`, `images/coderepo/tsundoku-2.png`, `images/dashboard/projectRealCar/v5.6-2.jpg`.
3. **Empty home link:** home-dashboard.html line 49, `href=""`.
4. **Broken image:** projects-page.html line 68, `src="/images/coderepo/..."`.
5. **Placeholder GitHub link:** projects-page.html line 76, `github.com/hilmihisham/...`.
6. **Placeholder subtitle:** cuaca.html line 55, "It's always sunny in [insert city name here]".
7. **Old URLs in content:** projects-page.html line 200 (`battle490.html`); cuaca.html line 366 (`/blog-pages/003-cuaca-build.html`); markdown/003-cuaca-build.md line 102 (`http://www.hilmihisham.com/cuaca.html`).
8. **Stale results after a failed search (confirmed bug):** `poskodCari` sets the new city name before the forecast request runs. When the request fails, the forecast and endpoint line from the previous search stay on screen, under the new city name. Network errors only log to the console (cuaca.html, `cuacaGet`'s `.catch`). Fix in #19 by clearing or updating the results on failure, and show a message.
9. **Index has no navbar.** This is by design, not a bug. Listed so the baseline comparison expects it.

## 5. Tooling notes

- Local server: `python3 -m http.server 8080` from the repo root. Needed because includeHTML uses XHR, which fails on file://.
- Playwright (Chromium) is installed in `baseline/` only. Nothing was added to the repo.
