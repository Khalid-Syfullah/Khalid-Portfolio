# 01 — Direction

← [DESIGN.md](../../DESIGN.md)

## Concept: "a résumé you can operate"

The brief asks for a **single-page, résumé/CV-type site** that is **interactive** and has the **best design possible**. The galleries it points to are mostly design portfolios that lead with big visuals. Khalid's strength is **work experience and shipped software**, not visuals, so the page has to read like a résumé first.

So the page has two layers:

| Layer | Feels like | Comes from |
|---|---|---|
| **Read** | A well-set CV: a label column, ruled rows, calm typography | Swiss résumé grid (One Page Love: Sean O'Shea, Ana Rita Morais, Christian Baun) |
| **Operate** | A developer tool: ⌘K, keyboard, filters, expand/collapse | Command palettes in dev tools; A1 Gallery's "interaction should serve scanning" |

## The three directions explored (design canvas)

| | A · Résumé Sheet | B · Big Type | C · Console |
|---|---|---|---|
| Look | Light, Swiss grid, blue accent | Dark, giant condensed name, orange band | Cool grey, sidebar plus cards, teal accent |
| Strength | Fastest to scan; reads as a résumé | Most memorable | Most "app-like"; the interaction is the point |
| Weakness | Quiet | Slow to reach the facts; heavy on a phone | Conventional layout, weak first impression |
| **Used for** | **Base layout, type, light theme** | **Dark theme ground** | **Command menu, filters** |

## What we take from each reference gallery

- **One Page Love (résumé):** one page; a label column next to the content; links as a simple row; short intro. Long unedited bios are left out.
- **A1 Gallery (portfolio):** typography-led and monochrome with one accent. Show **4 featured** projects and put the rest in an archive. Captions carry a point of view. A case runs *brief → constraint → decision → outcome*. Say plainly what you're looking for.
- **Bestfolios:** the résumé collection confirms that the strongest résumé pages are mostly type, with almost no imagery. We skip its designer case-study flow.

## What we rejected, and why

- **Dark glow / gradient / particle hero** (the old site): it's the most common template look, and it says nothing about Khalid.
- **Skill marquees and tag clouds:** noise. Skills are listed, grouped and ranked.
- **Count-up stats** ("14 projects", "4 awards"): data slop, and the numbers shrink after the academic cut.
- **Terminal cosplay** (fake shell, boot log): gimmicky for a software-engineer résumé. ⌘K gives the developer feel without the costume.
- **Scroll-jacking and parallax:** they fight the "scan in 10 seconds" goal.

## Voice

- First person, plain, specific. Name the actual technology and what was built.
- No adjectives doing the work ("passionate", "innovative").
- Missing facts are marked **[KHALID: …]** in [`08-content.md`](08-content.md), never invented.

## Signature details (what people should remember)

1. **The ⌘K menu.** Press it anywhere, type "boimela" or "email", hit Enter. A visible hint chip in the hero makes it discoverable.
2. **Ruled experience rows** that open in place, like unfolding a résumé line.
3. **The section index** (`01 — INTRO`, `02 — EXPERIENCE` …) in mono type, running down the label column.
4. **A print stylesheet**, so printing the page gives a clean résumé.
