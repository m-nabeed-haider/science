document.addEventListener("DOMContentLoaded", () => {
    const papers = [
        {
            title: "GSMC Science Publication 2026",
            note: "Version 1.1 · Primary edition",
            type: "PDF",
            details: "11 pages",
            file: "GSMC_Science_Publication_2026_v1.1.pdf",
        },
        {
            title: "GSMC Science Publication 2026",
            note: "Version 1.1 · Alternate copy",
            type: "PDF",
            details: "11 pages",
            file: "GSMC_Science_Publication_2026_v1.1 (1).pdf",
        },
        {
            title: "Science, Religion & The Truth",
            note: "Primary edition",
            type: "PDF",
            details: "3 pages",
            file: "Science_Religion_TheTruth.pdf",
        },
        {
            title: "Science, Religion & The Truth",
            note: "Alternate edition",
            type: "PDF",
            details: "3 pages",
            file: "Science_Religion_TheTruth (1).pdf",
        },
        {
            title: "GSMC Science Publication 2026",
            note: "Editable source document",
            type: "DOCX",
            details: "48 KB",
            file: "GSMC_Science_Publication_2026_v1.1(1).docx",
        },
    ];

    const paperGrid = document.querySelector("#paperGrid");
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

    /*
     * Research-paper cards
     */
    if (paperGrid) {
        paperGrid.innerHTML = papers
            .map(
                (paper, index) => `
          <article class="paper-card">
            <div class="paper-top">
              <div class="file-icon" aria-hidden="true">
                ${paper.type}
              </div>

              <span class="file-meta">
                ${paper.details}
              </span>
            </div>

            <h3>${paper.title}</h3>
            <p>${paper.note}</p>

            <div class="paper-actions">
              ${paper.type === "PDF"
                        ? `
                    <button
                      class="button button-primary read-paper"
                      data-index="${index}"
                      type="button"
                    >
                      Read online
                      <span aria-hidden="true">↗</span>
                    </button>
                  `
                        : ""
                    }

              <a
                class="button button-secondary"
                href="${encodeURI(paper.file)}"
                download
              >
                Download
              </a>
            </div>
          </article>
        `,
            )
            .join("");
    }

    /*
     * Archive-part checklist
     */
    let savedParts = [];

    try {
        savedParts = JSON.parse(
            localStorage.getItem("completeScienceParts") || "[]",
        );

        if (!Array.isArray(savedParts)) {
            savedParts = [];
        }
    } catch {
        savedParts = [];
    }

    const completedParts = new Set(savedParts);

    function renderParts() {
        if (!partsGrid) {
            return;
        }

        partsGrid.innerHTML = Array.from({ length: 20 }, (_, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isComplete = completedParts.has(number);

            return `
        <article class="part-card ${isComplete ? "complete" : ""}">
          <div>
            <span class="part-number">Part ${number}</span>
            <span class="part-size">Approximately 5.4 MB</span>
          </div>

          <a
            class="part-download"
            href="completescience.part${number}.zip"
            download
            data-part="${number}"
            aria-label="Download archive part ${number}"
          >
            ${isComplete ? "✓" : "↓"}
          </a>
        </article>
      `;
        }).join("");

        if (downloadedCount) {
            downloadedCount.textContent = completedParts.size;
        }

        if (progressBar) {
            progressBar.style.width = `${completedParts.size * 5}%`;
        }
    }

    if (partsGrid) {
        partsGrid.addEventListener("click", (event) => {
            const downloadLink = event.target.closest("[data-part]");

            if (!downloadLink) {
                return;
            }

            const partNumber = downloadLink.dataset.part;

            completedParts.add(partNumber);

            localStorage.setItem(
                "completeScienceParts",
                JSON.stringify([...completedParts]),
            );

            window.setTimeout(renderParts, 150);
        });
    }

    if (resetProgress) {
        resetProgress.addEventListener("click", () => {
            completedParts.clear();
            localStorage.removeItem("completeScienceParts");
            renderParts();
            showToast("Download progress reset");
        });
    }

    /*
     * PDF reader
     */
    document.addEventListener("click", (event) => {
        const readButton = event.target.closest(".read-paper");

        if (!readButton || !readerDialog || !readerFrame) {
            return;
        }

        const paperIndex = Number(readButton.dataset.index);
        const selectedPaper = papers[paperIndex];

        if (!selectedPaper) {
            return;
        }

        if (readerTitle) {
            readerTitle.textContent = selectedPaper.title;
        }

        if (readerDownload) {
            readerDownload.href = encodeURI(selectedPaper.file);
        }

        readerFrame.src = `${encodeURI(selectedPaper.file)}#view=FitH`;

        if (typeof readerDialog.showModal === "function") {
            readerDialog.showModal();
        }
    });

    function closeDocumentReader() {
        if (!readerDialog) {
            return;
        }

        readerDialog.close();

        if (readerFrame) {
            readerFrame.src = "about:blank";
        }
    }

    if (closeReader) {
        closeReader.addEventListener("click", closeDocumentReader);
    }

    if (readerDialog) {
        readerDialog.addEventListener("click", (event) => {
            if (event.target === readerDialog) {
                closeDocumentReader();
            }
        });
    }

    /*
     * Copy buttons and toast notifications
     */
    let toastTimer;

    function showToast(message) {
        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.classList.add("show");

        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    }

    document.querySelectorAll("[data-copy]").forEach((button) => {
        button.addEventListener("click", async () => {
            const elementId = button.dataset.copy;
            const sourceElement = document.getElementById(elementId);

            if (!sourceElement) {
                showToast("Command not found");
                return;
            }

            try {
                await navigator.clipboard.writeText(sourceElement.textContent.trim());
                showToast("Command copied");
            } catch {
                showToast("Select and copy the command manually");
            }
        });
    });

    renderParts();
});