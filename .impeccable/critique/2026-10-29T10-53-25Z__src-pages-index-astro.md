---
target: Menan Makeovers site (home + inner pages)
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Hp\\menan-makeovers-redesign\\app\\src\\pages\\index.astro"
target_fingerprint: "sha256:be9129a349763f5ab52e03c8769d2f62a1dfb4f1d299c179e65d3483074dcd3f"
target_path: "C:\\Users\\Hp\\menan-makeovers-redesign\\app\\src\\pages\\index.astro"
timestamp: 2026-10-29T10-53-25Z
slug: src-pages-index-astro
---
# Critique: Menan Makeovers site (home + inner pages)

Method: dual-agent (A: independent design review · B: detector + headless browser measurements)

## Design Health Score — 26/40 (Acceptable)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No reply-time promise after WhatsApp handoff; lightbox has no counter |
| 2 | Match System / Real World | 3 | Local vocabulary strong; tier names (HD / HD Pro / Luxury / Elite Airbrush) unexplained |
| 3 | User Control and Freedom | 3 | No touch swipe in lightbox |
| 4 | Consistency and Standards | 2 | One WhatsApp action has 9+ labels; Basic/Luxury cards lack wear-time chip |
| 5 | Error Prevention | 3 | Prefilled WhatsApp templates good; form requires Email for WhatsApp-first audience |
| 6 | Recognition Rather Than Recall | 2 | Comparing 5 tiers needs memory; "Compare all packages" doesn't compare |
| 7 | Flexibility and Efficiency | 3 | Sticky Call/WhatsApp bar, per-package prefills |
| 8 | Aesthetic and Minimalist Design | 2 | Repetition (services ×3, slogan ×4); 7 gold buttons pulse simultaneously |
| 9 | Error Recovery | 3 | Inline errors, form-failure WhatsApp fallback, useful 404 |
| 10 | Help and Documentation | 2 | No FAQ (travel, early muhurtham, trial cost, advance, date change) |

## Design Specificity Verdict
Local skin on a category-interchangeable body: copy, photography and palette are Pondicherry-specific; the section skeleton is a stock boutique-services template. Arch used as card frame, not structure. Missed: organise by function (nichayathartham → mehandi → muhurtham → reception) rather than tier. Detector agrees on glow, stragglers/unbalanced headings, small tap targets; adds gold eyebrow contrast 4.12–4.39:1 on blush/gradient and contact placeholder 3.1:1. Most low-contrast URL-scan warnings are false positives from scroll fade-in opacity (all pass under reduced motion).

## Priority Issues
1. [P1] Packages indistinguishable / no comparison — PackageCard run-on sentence, repeated icon row, missing chips on Basic/Luxury, misaligned baselines, "Compare all packages" repeats cards. Fix: per-tier bullets + wear-time chip, "Most booked", comparison matrix on /services, mobile swipe row. ($impeccable distill, $impeccable layout)
2. [P1] No reassurance at the moment of asking — no reply time/hours, price signal, trial CTA, FAQ; Google rating first appears in section 6. Needs owner data. ($impeccable clarify)
3. [P1] Home ~15,000px at 390 and repetitive — packages 5,007px; services listed 3×; slogan 4×. Fix: drop .trust-studio for rating, collapse packages on mobile, single slogan. ($impeccable distill)
4. [P2] Inner pages are dead ends — /services entries repeat home with no CTA; portfolio ungrouped, 12/19 duplicate home; lightbox lacks swipe/counter/"Ask for this look"; About lacks women-team story. ($impeccable shape)
5. [P2] Over-busy motion + late fonts — gold-glow infinite box-shadow on 7–8 buttons; scroll scrub leaves lower ~45% of phone viewport mid-fade; fonts via chained @import (hero reflow); logos ~102 KB; srcset without sizes. ($impeccable quieter, $impeccable animate, $impeccable optimize)

## Persona Red Flags
- Jordan: can't distinguish tiers; no price; "Book online" implies self-serve; "interns" wording.
- Riley: opening one review stretches neighbours; Italiana hairlines break at 1x DPR ("IHE GROOM"); "100+" round numbers; rating link is Maps search.
- Casey: ~18 screens; review summary 24px and footer links 20–22px tap targets; no lightbox swipe; constant mid-fade band.

## Minor Observations
- Gold eyebrow text 4.12–4.39:1 on blush; placeholder 3.1:1; no text-wrap balance/pretty anywhere.
- Hero eyebrow inside h1 (serif) vs Jost elsewhere; DuoCard title third in reading order.
- Unused Welcome.astro / Hero.astro; no Instagram link; "Aishu sis" in Gayathri review; step 03 advance unspecified.
- Contact form: no autocomplete tokens; required not exposed via aria-required.

## Questions to Consider
- What if packages were chosen per function along the wedding timeline?
- How many brides leave for the studio whose Instagram says "from ₹X"?
- What if "a women-built studio that trains women" were the site's spine?
