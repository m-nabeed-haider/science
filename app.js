document.addEventListener("DOMContentLoaded", () => {
    const papers = [
        // ==================================================
        // ND SELECTIVE CAUSAL-LOOP HYPOTHESIS
        // ==================================================

        {
            project: "ND-SCLH",
            title: "The ND Selective Causal-Loop Hypothesis",
            note: "Speculative framework for higher-dimensional influence, technological innovation, and self-consistent information loops",
            type: "PDF",
            details: "7 pages · Formal speculative research report",
            file: "ND_Select_Causal_Loop_Hypothesis_Report.pdf",
            tags: [
                "ND-SCLH",
                "causal loop",
                "higher dimensions",
                "retrocausality",
                "technological innovation",
                "future intelligence",
                "self-consistency",
                "speculative physics",
            ],
        },

        {
            project: "ND-SCLH",
            title: "The ND Selective Causal-Loop Hypothesis",
            note: "Editable source document · Formal speculative research report",
            type: "DOCX",
            details: "Source",
            file: "ND_Select_Causal_Loop_Hypothesis_Report.docx",
            tags: [
                "ND-SCLH",
                "causal loop",
                "higher dimensions",
                "retrocausality",
                "technological innovation",
                "future intelligence",
                "self-consistency",
                "speculative physics",
            ],
        },

        // ==================================================
        // ZERO-INFLATION IMPACT ECONOMY
        // ==================================================

        {
            project: "Zero-Inflation Impact Economy",
            title: "A Zero-Inflation Impact Economy",
            note: "Working paper · Price-level stability and contribution-linked distribution",
            type: "PDF",
            details: "Research paper",
            file: "zero_inflation_impact_economy_working_paper.pdf",
            tags: [
                "economics",
                "inflation",
                "monetary policy",
                "impact economy",
            ],
        },

        {
            project: "Zero-Inflation Impact Economy",
            title: "A Zero-Inflation Impact Economy",
            note: "Editable source document",
            type: "DOCX",
            details: "Source",
            file: "zero_inflation_impact_economy_working_paper.docx",
            tags: [
                "economics",
                "inflation",
                "monetary policy",
                "impact economy",
            ],
        },

        // ==================================================
        // HEMIH
        // ==================================================

        {
            project: "HEMIH",
            title: "HEMIH Speculative Research Paper",
            note: "Speculative research paper · Primary PDF edition",
            type: "PDF",
            details: "Research paper",
            file: "HEMIH_Speculative_Research_Paper.pdf",
            tags: [
                "HEMIH",
                "speculative research",
                "theoretical model",
            ],
        },

        {
            project: "HEMIH",
            title: "HEMIH Speculative Research Paper",
            note: "Editable source document",
            type: "DOCX",
            details: "Source",
            file: "HEMIH_Speculative_Research_Paper.docx",
            tags: [
                "HEMIH",
                "speculative research",
                "theoretical model",
            ],
        },

        // ==================================================
        // GSMC
        // ==================================================

        {
            project: "GSMC",
            title: "GSMC Science Publication 2026",
            note: "Version 1.1 · Primary PDF edition",
            type: "PDF",
            details: "11 pages",
            file: "GSMC_Science_Publication_2026_v1.1.pdf",
            tags: [
                "GSMC",
                "science",
                "cosmology",
                "2026",
            ],
        },

        {
            project: "GSMC",
            title: "GSMC Science Publication 2026",
            note: "Version 1.1 · Alternate PDF copy",
            type: "PDF",
            details: "11 pages",
            file: "GSMC_Science_Publication_2026_v1.1 (1).pdf",
            tags: [
                "GSMC",
                "science",
                "cosmology",
                "2026",
            ],
        },

        {
            project: "GSMC",
            title: "GSMC Science Publication 2026",
            note: "Version 1.1 · Editable source document",
            type: "DOCX",
            details: "Source",
            file: "GSMC_Science_Publication_2026_v1.1(1).docx",
            tags: [
                "GSMC",
                "science",
                "cosmology",
                "2026",
            ],
        },

        // ==================================================
        // SCIENCE & RELIGION
        // ==================================================

        {
            project: "Science & Religion",
            title: "Science, Religion & The Truth",
            note: "Primary PDF edition",
            type: "PDF",
            details: "3 pages",
            file: "Science_Religion_TheTruth.pdf",
            tags: [
                "science",
                "religion",
                "philosophy",
                "truth",
            ],
        },

        {
            project: "Science & Religion",
            title: "Science, Religion & The Truth",
            note: "Alternate PDF copy",
            type: "PDF",
            details: "3 pages",
            file: "Science_Religion_TheTruth (1).pdf",
            tags: [
                "science",
                "religion",
                "philosophy",
                "truth",
            ],
        },
    ];

    // ==================================================
    // ELEMENTS
    // ==================================================

    const paperGrid = document.querySelector("#paperGrid");
    const paperSearch = document.querySelector("#paperSearch");
    const paperFilters = document.querySelector("#paperFilters");
    const paperEmpty = document.querySelector("#paperEmpty");

    const projectMetric = document.querySelector("#projectMetric");
    const documentMetric = document.querySelector("#documentMetric");

    const partsGrid = document.querySelector("#partsGrid");
    const downloadedCount = document.querySelector("#downloadedCount");
    const progressBar = document.querySelector("#progressBar");
    const resetProgress = document.querySelector("#resetProgress");

    const readerDialog = document.querySelector("#readerDialog");
    const readerFrame = document.querySelector("#readerFrame");
    const readerTitle = document.querySelector("#readerTitle");
    const readerDownload = document.querySelector("#readerDownload");
    const closeReader = document.querySelector("#closeReader");

    const toast = document.querySelector("#toast");

    // ==================================================
    // RESEARCH PROJECTS
    // ==================================================

    const projects = [
        ...new Set(
            papers.map((paper) => paper.project)
        ),
    ];

    let activeProject = "All";
    let searchTerm = "";

    if (projectMetric) {
        projectMetric.textContent = projects.length;
    }

    if (documentMetric) {
        documentMetric.textContent = papers.length;
    }

    // ==================================================
    // SEARCH MATCHING
    // ==================================================

    function paperMatches(paper) {
        const projectMatch =
            activeProject === "All" ||
            paper.project === activeProject;

        const haystack = [
            paper.project,
            paper.title,
            paper.note,
            paper.type,
            paper.details,
            ...(paper.tags || []),
        ]
            .join(" ")
            .toLowerCase();

        return (
            projectMatch &&
            haystack.includes(searchTerm)
        );
    }

    // ==================================================
    // PROJECT FILTER BUTTONS
    // ==================================================

    function renderFilters() {
        if (!paperFilters) return;

        paperFilters.innerHTML = [
            "All",
            ...projects,
        ]
            .map(
                (project) => `
                    <button
                        class="filter-chip ${activeProject === project
                        ? "active"
                        : ""
                    }"
                        type="button"
                        data-project="${project}"
                    >
                        ${project}
                    </button>
                `
            )
            .join("");
    }

    // ==================================================
    // PAPER CARDS
    // ==================================================

    function renderPapers() {
        if (!paperGrid) return;

        const filtered =
            papers.filter(paperMatches);

        paperGrid.innerHTML = filtered
            .map((paper) => {
                const index =
                    papers.indexOf(paper);

                return `
                    <article class="paper-card">

                        <div class="paper-top">

                            <div
                                class="file-icon"
                                aria-hidden="true"
                            >
                                ${paper.type}
                            </div>

                            <div class="paper-meta-stack">

                                <span class="project-pill">
                                    ${paper.project}
                                </span>

                                <span class="file-meta">
                                    ${paper.details}
                                </span>

                            </div>

                        </div>

                        <h3>
                            ${paper.title}
                        </h3>

                        <p>
                            ${paper.note}
                        </p>

                        <div class="paper-actions">

                            ${paper.type === "PDF"
                        ? `
                                        <button
                                            class="button button-primary read-paper"
                                            data-index="${index}"
                                            type="button"
                                        >
                                            Read online
                                            <span aria-hidden="true">
                                                ↗
                                            </span>
                                        </button>
                                    `
                        : ""
                    }

                            <a
                                class="button button-secondary"
                                href="${encodeURI(paper.file)}"
                                download
                            >
                                Download ${paper.type}
                            </a>

                        </div>

                    </article>
                `;
            })
            .join("");

        if (paperEmpty) {
            paperEmpty.hidden =
                filtered.length !== 0;
        }
    }

    // ==================================================
    // FILTER EVENTS
    // ==================================================

    if (paperFilters) {
        paperFilters.addEventListener(
            "click",
            (event) => {
                const chip =
                    event.target.closest(
                        "[data-project]"
                    );

                if (!chip) return;

                activeProject =
                    chip.dataset.project;

                renderFilters();
                renderPapers();
            }
        );
    }

    // ==================================================
    // SEARCH
    // ==================================================

    if (paperSearch) {
        paperSearch.addEventListener(
            "input",
            () => {
                searchTerm =
                    paperSearch.value
                        .trim()
                        .toLowerCase();

                renderPapers();
            }
        );
    }

    // ==================================================
    // 20-PART ARCHIVE
    // ==================================================

    let savedParts = [];

    try {
        savedParts = JSON.parse(
            localStorage.getItem(
                "completeScienceParts"
            ) || "[]"
        );

        if (!Array.isArray(savedParts)) {
            savedParts = [];
        }
    } catch {
        savedParts = [];
    }

    const completedParts =
        new Set(savedParts);

    function renderParts() {
        if (!partsGrid) return;

        partsGrid.innerHTML =
            Array.from(
                { length: 20 },
                (_, index) => {
                    const number =
                        String(index + 1)
                            .padStart(2, "0");

                    const isComplete =
                        completedParts.has(number);

                    return `
                        <article
                            class="part-card ${isComplete
                            ? "complete"
                            : ""
                        }"
                        >

                            <div>

                                <span class="part-number">
                                    Part ${number}
                                </span>

                                <span class="part-size">
                                    Archive segment
                                </span>

                            </div>

                            <a
                                class="part-download"
                                href="completescience.part${number}.zip"
                                download
                                data-part="${number}"
                                aria-label="Download archive part ${number}"
                            >
                                ${isComplete
                            ? "✓"
                            : "↓"
                        }
                            </a>

                        </article>
                    `;
                }
            ).join("");

        if (downloadedCount) {
            downloadedCount.textContent =
                completedParts.size;
        }

        if (progressBar) {
            progressBar.style.width =
                `${completedParts.size * 5}%`;
        }
    }

    // ==================================================
    // PART DOWNLOAD TRACKING
    // ==================================================

    if (partsGrid) {
        partsGrid.addEventListener(
            "click",
            (event) => {
                const downloadLink =
                    event.target.closest(
                        "[data-part]"
                    );

                if (!downloadLink) return;

                completedParts.add(
                    downloadLink.dataset.part
                );

                localStorage.setItem(
                    "completeScienceParts",
                    JSON.stringify(
                        [...completedParts]
                    )
                );

                window.setTimeout(
                    renderParts,
                    150
                );
            }
        );
    }

    // ==================================================
    // RESET DOWNLOAD PROGRESS
    // ==================================================

    if (resetProgress) {
        resetProgress.addEventListener(
            "click",
            () => {
                completedParts.clear();

                localStorage.removeItem(
                    "completeScienceParts"
                );

                renderParts();

                showToast(
                    "Download progress reset"
                );
            }
        );
    }

    // ==================================================
    // PDF READER
    // ==================================================

    document.addEventListener(
        "click",
        (event) => {
            const readButton =
                event.target.closest(
                    ".read-paper"
                );

            if (
                !readButton ||
                !readerDialog ||
                !readerFrame
            ) {
                return;
            }

            const selectedPaper =
                papers[
                Number(
                    readButton.dataset.index
                )
                ];

            if (!selectedPaper) return;

            if (readerTitle) {
                readerTitle.textContent =
                    selectedPaper.title;
            }

            if (readerDownload) {
                readerDownload.href =
                    encodeURI(
                        selectedPaper.file
                    );

                readerDownload.setAttribute(
                    "download",
                    selectedPaper.file
                );
            }

            readerFrame.src =
                `${encodeURI(
                    selectedPaper.file
                )}#view=FitH`;

            if (
                typeof readerDialog.showModal ===
                "function"
            ) {
                readerDialog.showModal();
            }
        }
    );

    // ==================================================
    // CLOSE PDF READER
    // ==================================================

    function closeDocumentReader() {
        if (!readerDialog) return;

        readerDialog.close();

        if (readerFrame) {
            readerFrame.src =
                "about:blank";
        }
    }

    if (closeReader) {
        closeReader.addEventListener(
            "click",
            closeDocumentReader
        );
    }

    if (readerDialog) {
        readerDialog.addEventListener(
            "click",
            (event) => {
                if (
                    event.target ===
                    readerDialog
                ) {
                    closeDocumentReader();
                }
            }
        );
    }

    // ==================================================
    // TOAST
    // ==================================================

    let toastTimer;

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        window.clearTimeout(
            toastTimer
        );

        toastTimer =
            window.setTimeout(
                () =>
                    toast.classList.remove(
                        "show"
                    ),
                1800
            );
    }

    // ==================================================
    // COPY COMMAND BUTTONS
    // ==================================================

    document
        .querySelectorAll("[data-copy]")
        .forEach((button) => {
            button.addEventListener(
                "click",
                async () => {
                    const sourceElement =
                        document.getElementById(
                            button.dataset.copy
                        );

                    if (!sourceElement) {
                        return showToast(
                            "Command not found"
                        );
                    }

                    try {
                        await navigator.clipboard
                            .writeText(
                                sourceElement
                                    .textContent
                                    .trim()
                            );

                        showToast(
                            "Command copied"
                        );
                    } catch {
                        showToast(
                            "Select and copy the command manually"
                        );
                    }
                }
            );
        });

    // ==================================================
    // INITIAL LOAD
    // ==================================================

    renderFilters();
    renderPapers();
    renderParts();
});