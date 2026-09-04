# Complete Science Archive

A public research archive containing theoretical, speculative, interdisciplinary, and computational work across physics, cosmology, economics, causality, technology, philosophy, and related areas.

The repository provides a lightweight web interface for browsing individual research documents and downloading the complete research collection as a **20-part archive**.

> **Important:** Some works in this repository are explicitly speculative theoretical frameworks. They should not be interpreted as experimentally established scientific theories unless supporting evidence is provided within the relevant work.

---

## Research Collection

### 1. The ND Selective Causal-Loop Hypothesis — ND-SCLH

**A Speculative Framework for Higher-Dimensional Influence, Technological Innovation, and Self-Consistent Information Loops**

A formal speculative framework examining whether sufficiently advanced or higher-dimensional intelligences could hypothetically influence selected earlier events in the same causal history that eventually produces those intelligences.

The framework explores:

* ordinary versus externally influenced innovation
* selective intervention at high-leverage historical branch points
* probabilistic cognitive influence
* future-dependent information
* closed causal and informational loops
* self-consistency requirements
* artificial intelligence as an illustrative causal-loop case
* competing hypotheses
* prospective testing
* statistical evaluation
* falsifiability

The framework explicitly distinguishes mathematical speculation from empirical evidence and does **not** claim that higher-dimensional intervention has been experimentally established.

**Files**

* `ND_Select_Causal_Loop_Hypothesis_Report(1).pdf`
* `ND_Select_Causal_Loop_Hypothesis_Report(1).docx`

---

### 2. Zero-Inflation Impact Economy — ZIIE

**A Zero-Inflation Impact Economy: A Rule-Based Framework for Long-Run Price-Level Stability and Contribution-Linked Distribution**

An economic model proposal investigating whether an economy could target approximately zero long-run inflation while allowing individual prices to continue responding to scarcity, productivity, supply, and demand.

The proposal explores:

* long-run price-level stability
* zero-inflation monetary rules
* flexible relative prices
* money-supply feedback
* contribution-linked distribution
* time, effort, impact, and skill scarcity
* effective lower-bound problems
* downward nominal wage rigidity
* debt-deflation risks
* safeguards against centralized social-credit-style scoring
* transition from positive inflation targets
* agent-based simulation design
* falsifiable comparisons between 0%, 0.01%, 1%, and 2% inflation regimes

**Files**

* `zero_inflation_impact_economy_working_paper.pdf`
* `zero_inflation_impact_economy_working_paper.docx`

---

### 3. HEMIH

A speculative theoretical research project exploring its proposed model and associated implications.

**Files**

* `HEMIH_Speculative_Research_Paper.pdf`
* `HEMIH_Speculative_Research_Paper.docx`

---

### 4. GSMC

**GSMC Science Publication 2026 — Version 1.1**

A theoretical research work covering the GSMC framework and its proposed scientific/cosmological implications.

**Files**

* `GSMC_Science_Publication_2026_v1.1.pdf`
* `GSMC_Science_Publication_2026_v1.1 (1).pdf`
* `GSMC_Science_Publication_2026_v1.1(1).docx`

---

### 5. Science, Religion & The Truth

An interdisciplinary work examining questions involving science, religion, philosophy, and interpretations of truth.

**Files**

* `Science_Religion_TheTruth.pdf`
* `Science_Religion_TheTruth (1).pdf`

---

## Repository Structure

```text
science/
│
├── index.html
├── styles.css
├── app.js
├── vercel.json
├── README.md
│
├── ND_Select_Causal_Loop_Hypothesis_Report(1).pdf
├── ND_Select_Causal_Loop_Hypothesis_Report(1).docx
│
├── zero_inflation_impact_economy_working_paper.pdf
├── zero_inflation_impact_economy_working_paper.docx
│
├── HEMIH_Speculative_Research_Paper.pdf
├── HEMIH_Speculative_Research_Paper.docx
│
├── GSMC_Science_Publication_2026_v1.1.pdf
├── GSMC_Science_Publication_2026_v1.1 (1).pdf
├── GSMC_Science_Publication_2026_v1.1(1).docx
│
├── Science_Religion_TheTruth.pdf
├── Science_Religion_TheTruth (1).pdf
│
├── completescience.part01.zip
├── completescience.part02.zip
├── ...
└── completescience.part20.zip
```

---

## Web Interface

The repository includes a static frontend for exploring the collection.

### Features

* Research-paper library
* Project-based filtering
* Full-text metadata search
* PDF reading directly in the browser
* Individual PDF/DOCX downloads
* Automatic project and document counters
* Complete archive downloads
* 20-part download progress tracking
* Browser-local progress persistence
* Windows reconstruction instructions
* Linux/macOS reconstruction instructions
* Responsive interface
* Static deployment compatible with Vercel

No backend or database is required.

---

## Complete 20-Part Archive

Because the complete research collection may be inconvenient to distribute as one large file, it is divided into exactly **20 sequential binary parts**:

```text
completescience.part01.zip
completescience.part02.zip
completescience.part03.zip
...
completescience.part20.zip
```

These files are **parts of one archive**.

They should not be individually extracted as independent ZIP archives.

All 20 parts must first be downloaded and placed in the same directory.

---

## Reconstructing the Archive

### Linux / macOS

```bash
cat completescience.part{01..20}.zip > completescience.zip
unzip completescience.zip
```

### Windows PowerShell

```powershell
$out = [IO.File]::Create("completescience.zip")

1..20 | ForEach-Object {
    $part = "completescience.part{0:D2}.zip" -f $_
    $bytes = [IO.File]::ReadAllBytes($part)
    $out.Write($bytes, 0, $bytes.Length)
}

$out.Close()
```

You can then extract:

```text
completescience.zip
```

using Windows Explorer, 7-Zip, WinRAR, or another ZIP-compatible utility.

---

## Running the Frontend Locally

Because the project is entirely static, you can run it using any simple HTTP server.

### Python

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

in your browser.

You can also open `index.html` directly, although serving the repository through HTTP is recommended for consistent PDF/browser behavior.

---

## Adding New Research

Add the PDF or DOCX file to the repository and register it in the `papers` array inside:

```text
app.js
```

Example:

```javascript
{
    project: "Project Name",
    title: "Research Paper Title",
    note: "Short description of the work",
    type: "PDF",
    details: "Research paper",
    file: "paper-name.pdf",
    tags: [
        "physics",
        "cosmology",
        "research"
    ],
}
```

The frontend automatically derives the number of research projects and documents from this collection.

---

## Updating the Complete Archive

When research documents are added or replaced, the complete archive should also be regenerated.

The final archive distribution should continue to contain exactly:

```text
20 parts
```

with sequential names from:

```text
completescience.part01.zip
```

through:

```text
completescience.part20.zip
```

The frontend assumes this naming convention.

---

## Research Status

The repository contains work at different levels of scientific maturity.

These may include:

* formal model proposals
* working papers
* mathematical hypotheses
* speculative theoretical frameworks
* interdisciplinary analysis
* philosophical exploration

A document being hosted in this repository does not by itself mean that its claims have been experimentally verified, peer reviewed, or accepted by the scientific community.

Claims should be evaluated according to their mathematical consistency, empirical evidence, reproducibility, predictive power, and falsifiability.

---

## Scientific Approach

Where applicable, the research aims to distinguish between:

```text
Speculation
     ↓
Formalization
     ↓
Mathematical Model
     ↓
Testable Prediction
     ↓
Experiment / Observation
     ↓
Evidence or Falsification
```

Speculative ideas become scientifically meaningful when they generate predictions capable of being tested against competing explanations.

---

## Technology

The archive website uses:

* HTML5
* CSS3
* Vanilla JavaScript
* Browser PDF rendering
* LocalStorage
* Vercel static deployment

There are no frontend frameworks or runtime dependencies.

---

## Deployment

The repository can be deployed directly as a static project.

For Vercel, the included:

```text
vercel.json
```

contains the deployment configuration.

Push changes to the connected GitHub repository and Vercel can automatically redeploy the latest version.

---

## Disclaimer

This repository is intended for research, theoretical exploration, education, discussion, and development of testable models.

Speculative papers should be read as **hypotheses or theoretical frameworks**, not as demonstrations that the proposed physical mechanisms exist.

References to higher dimensions, retrocausality, unconventional cosmological mechanisms, or other speculative concepts should not be interpreted as established empirical facts unless independently supported by reproducible evidence.

---

## License

No license is assumed merely from public availability.

If this repository is intended for open reuse, redistribution, modification, or academic derivative work, an explicit license such as MIT, Apache-2.0, CC BY 4.0, or another appropriate research/software license should be added separately.

---

## Archive

**Complete Science Archive · 2026**

An evolving collection of research papers, theoretical models, speculative hypotheses, and interdisciplinary scientific exploration.
