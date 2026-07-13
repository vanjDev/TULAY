# Choice Table redesign QA

- Source visual truth: `C:\Users\ROG-ST~1\AppData\Local\Temp\codex-clipboard-9c7a17fd-5f28-482c-bb20-af3d6309f36f.png`, interpreted with the approved audit direction: preserve Choice Table while reducing the oversized editorial hierarchy, removing disconnected connectors, and binding the scenario and choices into one surface.
- Implementation: `http://localhost:5173/quiz`
- Desktop screenshot: `C:\Users\ROG-ST~1\AppData\Local\Temp\choice-table-fixed-desktop.png`
- Mobile screenshot: `C:\Users\ROG-ST~1\AppData\Local\Temp\choice-table-final-mobile.png`
- Full-view comparison: `C:\tmp\choice-table-before-after.png`
- Viewports: 1245 × 787 desktop; 390 × 844 mobile.
- State: scenario 1, unanswered; answer D feedback also tested.

## Findings and iteration history

### Pass 1 — blocked

- [P1] The scenario and choices read as two unrelated regions. The large open gap and connector lines weakened grouping.
  - Fix: wrapped the header, progress, scenario, choices, and guidance in one restrained surface; reduced the grid gap; removed connectors.
- [P2] The title, question, and image overpowered the answers.
  - Fix: reduced the display scale, question size, and image height while increasing the answer column's share of the grid.
- [P2] Four fully tinted answer surfaces looked like categories rather than neutral choices.
  - Fix: changed answer rows to a shared neutral surface and retained restrained accent color for keys and interaction states.
- [P2] The mobile dock slightly covered the first answer in the initial viewport.
  - Fix: tightened mobile section rhythm and reduced the image to 8rem; the first answer is now fully visible above the dock.

### Pass 2 — passed

- Desktop comparison shows one coherent quiz surface, balanced column weight, a quieter image, and no unused lower-right void.
- Mobile reflows to one column with no horizontal overflow (`390px` client width and `390px` document width); the first answer remains visible in the initial viewport.
- Answer D was activated and produced the API-driven `Solid choice.` status with disabled answer controls and a `Next scenario` action.
- No framework overlay is visible. Browser logs contain two existing React Router v7 future-flag warnings and one stale Vite HMR reload error from a transient JSX edit; the corrected page renders normally and the final production build passes.

## Required fidelity surfaces

- Fonts and typography: existing TULAY display and body families are preserved. The title and scenario now use a restrained scale, readable weight, tighter hierarchy, and stable wrapping at desktop and mobile widths.
- Spacing and layout rhythm: the shared shell, smaller grid gap, aligned header/progress, compact image, and neutral answer rhythm create one composition. Desktop and mobile show no clipping or horizontal overflow.
- Colors and tokens: existing forest, gold, lilac, ivory, border, and background tokens are retained. Accent colors are now secondary to the neutral answer surfaces, with adequate dark text contrast.
- Image quality: the supplied `/art/v2/quiz.png` illustration remains a real raster asset with its original art direction. The crop is shorter but keeps the student and choice cards visible.
- Copy and content: API scenario and answer copy are unchanged. Supporting labels and guidance remain clear.
- Interaction and accessibility: semantic buttons, progressbar labeling, headings, alt text, focus-visible styling, disabled/selected states, status feedback, and reduced-motion behavior remain present.

## Focused comparison

Focused inspection was performed on the question/image-to-answer relationship and the mobile first viewport because those were the areas where hierarchy and overlap were most likely to regress. No additional actionable P0/P1/P2 issue remains.

## Verification

- `npm run build`: passed (Vite 5.4.21, 1818 modules).
- `git diff --check`: passed.
- Page identity and meaningful DOM: passed.
- Desktop composition: passed.
- Mobile composition and horizontal overflow: passed.
- Answer feedback interaction: passed.
- Reduced-motion rule retained: passed.

final result: passed
