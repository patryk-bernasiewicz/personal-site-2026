# Audyt „AI slop” + plan uproszczenia — patrykb.pl

Data: 2026-10-09 · Źródła: żywy HTML z `patrykb.pl` (`/`, `/o-mnie`, `/cyfrowe-cv`, `/blog`, `/en`) + kod repo (produkcja = repo, drobne różnice w copy hero CV).

## TL;DR

Strona jest **technicznie porządna, ale wygląda i brzmi jak szablon wygenerowany przez AI**:
czarno-złoty „luxury tech” motyw, wygenerowany kosmiczny portal w hero, cząsteczki, glow, numerowane sekcje,
siatki kart z ikonkami i copy pełne antytez typu „nie X, tylko Y”. Do tego te same 4 myśli
(planuję przed kodem / komunikacja / realne stany UI / prosty kod > sprytny) powtórzone w ~10 sekcjach.

Kierunek: **jedna kolumna tekstu, zero dekoracji, konkrety zamiast deklaracji.** Strona ma wyglądać jak
napisana przez człowieka, który wie, co robi — a nie jak landing produktu SaaS.

---

## 1. Motywy graficzne kojarzone z AI slopem

| # | Element | Gdzie | Dlaczego to „slop” | Werdykt |
|---|---------|-------|--------------------|---------|
| G1 | **Hero: postać tyłem przed świecącym złotym pierścieniem/portalem, kosmiczne niebo, złote linie w górach** | `src/assets/images/hero-desktop.*`, `hero-mobile.*`, `hero-silhouette.*` | Klasyczny trope Midjourney „samotny bohater przed portalem”. Rozpoznawalny w sekundę. | **Usunąć** |
| G2 | Warstwy nad hero: `HeroCosmos` + `HeroParticleStream` (tsparticles) + 2 gradient overlaye | `sections/home/Hero*.astro` | Efekt na efekcie na wygenerowanym obrazie. | **Usunąć** |
| G3 | Portret na CV z **wklejonym kodem** `const developer = {… mindset: 'Ship with care'}`, złoty halo-glow, kropkowana siatka, hairline’y | `digitalresume-hero.*`, `DigitalCvHero.astro`, `.resume-hero__*` w `global.css` | „Developer portrait” z generatora. Ten sam snippet jest jeszcze raz tekstem na `/o-mnie`. | **Zostawić samo zdjęcie** (bez kodu i glow) albo użyć `about-me-photo` |
| G4 | Tło „złota fala z cząsteczek” | `resume-bottom-background.*`, `BottomWaveBackground.astro`, `.resume-tech__background` | Najbardziej generyczny stock „AI/tech background”. | **Usunąć** |
| G5 | Paleta czerń + złoto, `text-gradient-gold`, `shadow-gold`, `gold-pulse`, `slow-spin`, `orbit-ring`, `card-glass`, glow na kropkach | `global.css` `@theme` + utilities | Złoty gradient na czarnym = estetyka szablonów „premium dev portfolio 2024”. | **Neutralna paleta + 1 akcent**, bez gradientów i glow |
| G6 | Numeracja sekcji `01/02/03/04` (w HTML nawet zdublowana: „01 \| 01”), pionowe napisy „Przewiń” / „Obserwuj”, boczny rail, kropkowy scroll-indicator, skaczące strzałki, eyebrow nad każdym nagłówkiem | `HeroSection`, `HomeScrollIndicator`, `vertical-label`, `.eyebrow` | Tropy z szablonów agencyjnych, zero informacji. | **Usunąć** |
| G7 | Karuzela „tech stack” z cząsteczkami (tsparticles + embla) dla listy 14 nazw | `TechStackSection` (401 l.), `TechStackParticleFlow` (510 l.) | ~900 linii + 2 zależności na coś, co jest jedną linijką tekstu. | **Zastąpić zwykłą listą** (albo usunąć z home) |
| G8 | Siatki 4 kart z ikonkami (lightning / cube / pencil / users; code / team / sparkle / bolt) | `AboutPreviewSection`, `AboutSummarySection`, `AboutIcon` | „Features grid” z landing page’a; ikony nie mają związku z treścią (✨ „Jakość dowożenia”). | **Usunąć**, zamienić na prozę |
| G9 | Pływający odtwarzacz „kliknij, aby posłuchać klimatycznych kawałków” | `FloatingMusicPlayer.astro` (1077 l.), w każdym layoucie | Nie slop sensu stricto, ale szum i największy pojedynczy kawałek JS. | **Do decyzji** (rekomendacja: usunąć) |
| G10 | Podpis-obrazek „Patryk” na `/o-mnie` | `about-me-signature.*` | Ozdobnik „personal brand”. | Usunąć |

## 2. Treść kojarzona z AI slopem

### 2.1 Wzorce językowe

- **Antytezy „nie X, tylko Y” — ~10 razy na 3 stronach.** To najmocniejszy sygnał LLM-owego copy:
  - „AI traktuję jak narzędzie pracy, nie autora decyzji.”
  - „Autonomia jest cenna, ale nie wtedy, gdy staje się chaosem udającym wolność.”
  - „I implement, not design.”
  - „Buduję UI odporny na realną, zmienną treść, a nie tylko idealne placeholdery.”
  - „Wolę rozwiązania, które da się rozwijać po miesiącach, niż takie, które dobrze wyglądają tylko przy pierwszym wdrożeniu.”
  - „Utrzymywalny kod zwykle wygrywa z kodem, który wygląda imponująco tylko w dniu napisania.”
  - „Nie kończę na tym, że działa u mnie.”
  - „…frontend nie jest tylko przekładaniem designu na kod, ale częścią…”
  - „Loadingi, błędy, puste stany… to część jakości, nie dodatek na końcu.”
- **Aforystyczne nagłówki**: „Najpierw sens. Potem interfejs.”, EN: „I care more about why something exists than what it was built with.”
- **Wyliczanki po 3–6 rzeczowników**: „UX, wydajność oraz utrzymywalność”, „dane, stany, komponenty, edge case'y i ryzyka”, „architekturę, CMS, migracje, testy, dostępność i codzienne delivery”.
- **Słowa-wata** (home + o-mnie + CV): „realny/realne” ×10, „komunikacja” ×8, „utrzymywalny” ×7, „delivery” ×6, „ownership” ×4, „chaos” ×4, „dopracowany” ×4, „dowozić” ×4. Każde z osobna OK — w tej gęstości brzmi jak prompt „napisz profesjonalnie”.
- Ponglish-hybrydy: „Skrót sygnałowy” (z „Signal row”), „Myślenie zespołem produktowym”, „Jakość dowożenia”.

### 2.2 Powtórzenia (największy problem objętości)

Te same 3–4 myśli występują jako osobne sekcje:

| Myśl | Gdzie się powtarza |
|------|--------------------|
| „Najpierw rozumiem / planuję, potem koduję” | home „Zaczynam od problemu”, o-mnie „W skrócie”, „Jak pracuję 01+02”, „Na czym mi zależy #1”, „Czego unikam #1” |
| „Komunikacja / wspólny kontekst / ownership” | o-mnie „W skrócie #2”, „Na czym mi zależy #2”, „Gdzie pracuję najlepiej”, „Czego unikam #4” |
| „Realne stany UI, edge case’y” | „W skrócie #3”, „Jak pracuję 03”, „Na czym mi zależy #3”, „Współpracuję z: Backend, CMS” |
| „Prosty kod > sprytny” | home „Buduję na kolejne iteracje”, „Na czym mi zależy #4”, „Czego unikam #2” |
| „Nie jestem designerem” | „Współpracuję z” (note + badge), „Czego unikam #3” |
| „9+ lat / 30+ rynków / 7 modułów” | home hero lead, proof strip, experience preview, CV hero, CV metryki, CV „W skrócie” |
| „Frontend produktowy / Modernizacje / Jakość” | CV „W skrócie” (4), „Obszary pracy” (3, z label = title), ukryte `strengths` i `narrative` |

`/o-mnie` ma **7 sekcji i ~30 kart/punktów**, a o Tobie jako człowieku mówi jedno zdanie (egryzonie).
Brakuje dokładnie tego, czego AI nie umie wygenerować: konkretnych historii, opinii, „dlaczego”.

### 2.3 Wycieki notatek / placeholderów na produkcji (do naprawy od razu)

- Home: **„Ostatnie publikacje z Contentful (build time).”** — notatka developerska jako opis sekcji (`dictionaries.ts` → `latestPostsDescription`).
- `/o-mnie`, karta Blog: **„Kanał treści pod search visibility i długoterminowy ruch.”** — notatka SEO/marketingowa (`about-content.ts` → `links`).
- CV: label „Skrót sygnałowy” / „Signal row”; eyebrow „Cyfrowe portfolio” na stronie CV.
- `dictionaries.ts` trzyma martwe placeholdery („Przykładowa treść do podmiany”, „Plik PDF umieść w public/files/”) — dziś chyba nierenderowane, ale do wyczyszczenia.
- Badge’e „Wpływ” na CV zawierają nie-wpływ: „Accessibility”, „CMS + e-commerce”, „Salesforce”.

### 2.4 Błędy merytoryczne

- **Nieaktualny staż**: JTI „08.2025 — obecnie · **10 miesięcy**” — wpisane na sztywno w `ExperienceTimeline.astro`; dziś to 1 rok 2 mies. Czas trwania powinien liczyć się z dat przy buildzie.
- **Dane CV zdublowane**: `ExperienceTimeline.astro` ma własną kopię doświadczenia (inna niż `resume-content.ts` → `workHistoryByLocale`). Łamie kontrakt z `AGENTS.md` (copy w `src/config`).
- Nazwa firmy renderuje się 2× w każdej roli na CV.
- Home CTA „Pracujesz nad frontendem, który wymaga modernizacji lub stabilizacji? Mogę pomóc…” sugeruje ofertę freelance przy pełnym etacie — **do decyzji**, czy to zamierzone.

## 3. Dług techniczny „pod spodem”

- **Martwe komponenty (~1 330 linii)**: `ResumeHeader` (387), `WorkHistorySection` (393), `ResumeTechnologiesSection` (241), `ResumeBottomLinksSection` (167), `ResumeNarrativeSection` (108), `ResumeStrengthSection` (30) + ich zależności (`ExperienceCard`, `TechGroup`, `TechPillRow`, `ImpactBadge`, `HeroMetric`?) i nieużywane klucze w `resume-content.ts`.
- `global.css` 1169 linii, z czego większość to BEM-owe `.resume-*` — wbrew zasadzie „tokeny w `@theme`, reszta utility”.
- Zależności tylko do dekoracji: `@tsparticles/basic`, `@tsparticles/engine`, `embla-carousel`; `react`/`@astrojs/react` bez ani jednej wyspy (`islands/` pusty).
- JS w `<script>`: odtwarzacz 1077 l., particle flow 510, header 498, tech stack 401, hero particles 312, scroll indicator 262 — przy stronie, która z założenia ma mieć „minimal client JS”.

---

## 4. Docelowy kształt strony (propozycja)

**Zasada: każda strona to jedna kolumna (~65ch), tekst + linki. Zero obrazków dekoracyjnych, zero animacji, zero kart.**

### Home `/` · `/en`
1. Imię i nazwisko + jedno zdanie, kim jesteś (np. „Frontend developer. Od 9 lat buduję i naprawiam interfejsy w React i Next.js — obecnie strony Ploom w JTI.”).
2. 2–3 krótkie akapity w pierwszej osobie: co robisz teraz, co robiłeś wcześniej (konkretnie: robotyka, analityka SaaS), co Cię kręci po godzinach (egryzonie, micro-SaaS).
3. Linki: CV · Blog · GitHub · LinkedIn · e-mail — zwykły tekst.
4. 3–5 ostatnich wpisów: data + tytuł, bez opisów i kart.

Wylatuje: hero image + cząsteczki, proof strip, about preview z kartami, karuzela tech, experience preview, CTA, scroll indicator, numeracja.

### O mnie `/o-mnie` · `/about`
Wariant A (rekomendowany): **scalić z home** (akapity z pkt 2) i zrobić redirect.
Wariant B: zostawić jako krótką prozę (300–500 słów): jak trafiłeś do frontendu, 1–2 konkretne historie z projektów, jak lubisz pracować (raz, jednym akapitem — nie 7 sekcji), co poza pracą. Bez kodu-snippetu, bez podpisu, bez kart.

### CV `/cyfrowe-cv` · `/digital-resume`
1. 2 zdania intro + link „Pobierz PDF”.
2. Doświadczenie: firma · rola · okres (czas trwania liczony automatycznie) · 2–4 punkty z liczbami (te są dobre: 109 defektów, Recoil → Jotai, ~75 komponentów, 250 kampanii/mies.).
3. Technologie: zwykła lista pogrupowana w 3–4 linijkach tekstu.
4. Opcjonalnie: wykształcenie / języki.

Wylatuje: hero ze zdjęciem i kodem, metryki, „W skrócie”, „Obszary pracy”, tło z falą, „Zobacz dalej”, badge „Wpływ”.

### Blog
Zostaje (to jedyna naprawdę Twoja treść). Lista: data + tytuł (+ ewentualnie 1 zdanie). Post: czysta typografia `.prose`.

### Wygląd
- Paleta: tło `#fafaf9` / tekst `#1c1917` + dark mode przez `prefers-color-scheme`; **jeden** akcent na linkach (może zostać przygaszone złoto, ale płaskie, bez gradientu i glow).
- Typografia: jeden krój (system stack albo jeden webfont), skala 3 rozmiarów.
- Header: imię + 3 linki + PL/EN. Footer: © + linki.
- Zdjęcie: maks. jedno, prawdziwe, małe (np. `about-me-photo` bez obróbki) — albo żadne.

---

## 5. Plan wdrożenia (małe PR-y, każdy do zmergowania osobno)

### Faza 0 — szybkie poprawki ✅ zrobione (branch `claude/epic-mayer-0cj1iu`)
- [x] Usunąć wycieki: „Ostatnie publikacje z Contentful (build time)”, „Kanał treści pod search visibility…”, „Cyfrowe portfolio” na CV. („Skrót sygnałowy / Signal row” żyje tylko w martwym `ResumeHeader` — zniknie w fazie 4.)
- [x] Czas trwania ról liczony z dat przy buildzie (`formatMonthPeriod` / `formatMonthDuration` w `src/lib/dates.ts`) zamiast wpisanego „10 miesięcy”.
- [x] Usunąć zdublowaną nazwę firmy w roli na CV.
- [x] Usunąć CTA freelance z home (`HomeCtaSection` + klucze `home.cta`).

### Faza 1 — wywalenie dekoracji ✅ zrobione
- [x] Home: usunięte `HeroCosmos`, `HeroParticleStream`, `HeroSilhouette`, `HomeScrollIndicator`, `hero-media-frame`, numeracja sekcji, pionowe labele, side rail, skacząca strzałka, glow-kropka.
- [x] Usunięte `TechStackSection` + `TechStackParticleFlow` + `src/lib/particles/` (sekcja tech znika z home).
- [x] Ikonki w kartach „O mnie” na home, kod-snippet i podpis na `/o-mnie`, portret z kodem na CV, złota fala na CV, numerki kart na CV.
- [x] Usunięte obrazy: `hero-*`, `hero-silhouette*`, `resume-bottom-background*`, `about-me-signature*`, `digitalresume-hero*`.
- [x] Odinstalowane `@tsparticles/*`, `embla-carousel`.
- [x] Przy okazji (z fazy 4): martwe komponenty CV (`ResumeHeader`, `WorkHistorySection`, `ResumeTechnologiesSection`, `ResumeBottomLinksSection`, `ResumeNarrativeSection`, `ResumeStrengthSection`, `BottomWaveBackground`), nieużywany `ui/Card`, martwe utility i ~850 linii `.resume-*` w `global.css` (1169 → ~300 linii).
- Odtwarzacz muzyki **zostaje** (decyzja) — w fazie 2 tylko przestylowanie do nowej palety.

### Faza 2 — nowy, płaski system wizualny ✅ zrobione
- [x] `@theme` w `global.css`: paleta Teal (tokeny `page`, `surface`, `surface-strong`, `text-*`, `border-soft`, `border-accent`, `accent`, `accent-hover`, `accent-contrast`), dark mode z `prefers-color-scheme`.
- [x] Złoto → teal w całym `src`; `rgba(255,255,255,…)` → `color-mix()` z `text-main`, ciemne tła → `page`/`surface`.
- [x] Wyrzucone glow, cienie, backdrop-blur, `text-gradient-gold`, `card-gold-hover`, `shadow-gold`; gradienty spłaszczone (karty → `surface`, hairline'y → `border-accent`).
- [x] `btn-gold` → `btn-accent` (pełny akcent), `card-glass` → `card-flat`.
- [x] Odtwarzacz: pigułka w kolorze akcentu, kontrolki w `accent-contrast`.
- [x] Logo SVG adaptacyjne (light/dark), `theme-color` dla obu trybów, Shiki z motywem `github-light` / `github-dark`.
- [ ] Uproszczenie `Header` (~500 l.) — przeniesione do fazy 3 razem z nowym IA (mniej pozycji w menu po scaleniu `/o-mnie`).

### Faza 3 — przepisanie treści (1 PR na stronę; **tu potrzebuję Ciebie**)
- [ ] Home: nowe copy wg pkt 4 (szkic przygotuję, Ty poprawiasz własnym głosem).
- [ ] O mnie: wariant A lub B.
- [ ] CV: jedno źródło danych w `resume-content.ts`, usunięcie `ExperienceTimeline` z wbudowanymi danymi; nowy prosty `ResumePage`.
- [ ] Reguły copy: zero „nie X, tylko Y”, zero aforyzmów w nagłówkach, nagłówki opisowe („Doświadczenie”, „Wpisy”), każde zdanie ma albo fakt, albo liczbę, albo Twoją opinię.

### Faza 4 — sprzątanie (1 PR)
- [ ] Usunąć martwe komponenty CV (~1 330 l.) i nieużywane klucze w `resume-content.ts`, `about-content.ts`, `dictionaries.ts`.
- [ ] Usunąć `react`/`@astrojs/react`, jeśli nadal brak wysp.
- [ ] Zaktualizować `AGENTS.md` (folder contract: mniej sekcji, brak `particles/`, nowe utilities).
- [ ] `npm run build` + przegląd PL/EN + Lighthouse przed/po.

**Szacunek efektu:** z ~6 200 linii w `sections/` + 1 169 w `global.css` + ~2 600 linii skryptów klienta → prawdopodobnie < 1 500 linii łącznie; JS klienta bliski zeru (tylko menu mobilne / przełącznik języka, jeśli w ogóle).

## 6. Decyzje (2026-10-09)

Archetyp wg raportu porównawczego (11 stron znanych devów): **pisarz-minimalista + odrobina indie** — blog w centrum, bio ze zdjęciem, odtwarzacz muzyki jako jedyny „charakterystyczny detal”. Do dorzucenia przy okazji: RSS (`@astrojs/rss`) i link do repo w stopce.


1. **Odtwarzacz muzyki** — zostaje.
2. **`/o-mnie`** — scalamy z home (wariant A, z redirectem `/o-mnie` → `/`, `/about` → `/en`).
3. **Zdjęcie** — jedno, małe (~200 px): frontalny portret na szarym tle (wersja z retuszem, wybór Patryka). Dodawane w fazie 3.
4. **Paleta — B · Teal.** Złoto wylatuje całkowicie. Jasny/ciemny z `prefers-color-scheme`, bez przełącznika.

   | Token | Jasny | Ciemny |
   |---|---|---|
   | tło | `#f6f7f6` | `#0e1211` |
   | tekst | `#141816` (16,7:1) | `#e3e8e5` (15,2:1) |
   | tekst drugorzędny | `#4b5550` (7,2:1) | `#9aa5a0` (7,4:1) |
   | akcent / linki | `#3b6864` (5,8:1) | `#8db9b3` (8,7:1) |

   Kontrasty liczone względem tła (WCAG AA ≥ 4,5:1).

   **Korekta 2026-10-10:** pierwszy teal (`#0f766e` / `#4fd1c0`, nasycenie ~77%) był za wyrazisty. Akcent stonowany do ~28% nasycenia i używany tylko na linkach, aktywnym menu i focusie; ramki, linie, eyebrow, przycisk (obrys) i odtwarzacz są neutralne.
5. **CTA freelance** — usunięte (nie szuka zleceń).
6. **Wersja EN** — pełny parytet z PL.
