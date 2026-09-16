# CS 180 Project 1 Web Report

This directory is a self-contained static project report. Open `index.html` directly, or
serve the `web/` directory with any static-file server.

## Preview

```bash
cd web
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages location

The final report is published from `Bobby202608.github.io/1/`. The portfolio homepage
already links to it with:

```html
<a href="./1/index.html">CS 180 Project 1: Colorizing the Prokudin-Gorskii Photo Collection</a>
```

After changing the source files in `web/`, sync the complete contents of this directory
to `Bobby202608.github.io/1/` before committing the GitHub Pages repository. Keep the
relative `assets/`, `styles.css`, and `script.js` paths unchanged.

## PDF deliverables covered by the scaffold

- Problem background and the B/G/R reconstruction pipeline.
- Single-scale L2 alignment and all three low-resolution JPEG results.
- All 14 provided results, using single-scale search for JPEGs and coarse-to-fine
  pyramid alignment for full-resolution TIFFs.
- The G-to-B and R-to-B offsets for every image.
- Five additional Prokudin-Gorskii plates (the PDF requires at least three).
- Runtime measurements, limitations, and a brief discussion of the difficult Emir case.
- A responsive gallery and full-size image viewer.

The assignment also requires the following when applicable:

- Briefly explain every failed alignment. Before submitting, inspect every result at full
  size and revise the Analysis section if any image should be counted as a failure.
- If any bells and whistles are added, explain the motivation and method and show a
  before/after comparison.
- Keep L2/NCC raw-pixel results in the report even if a better feature is implemented.
- Submit the public webpage URL to both the class gallery form and Gradescope.
- Do not upload image files to Gradescope; they belong only in the hosted webpage.

## Before publishing

1. Confirm the displayed name and project date in `index.html`.
2. Replace “Plate 00154” style labels with the actual collection titles, and add source
   links if available.
3. Verify the offsets in `script.js` against the final CSV after any rerun.
4. The PDF literally asks for multi-scale results on all provided examples. The current
   code routes the three JPEGs through single-scale search. Consider also running those
   JPEGs through the pyramid and documenting both sets of results.
5. Recheck the claims in the Analysis section against the final full-resolution images.
6. Test all images and navigation from the final public URL.

## Files

```text
web/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── images/    # web-sized JPEG results
```

The web images are resized to at most 1600 pixels wide and encoded at JPEG quality 84,
reducing the gallery from about 50 MB to about 6 MB.
