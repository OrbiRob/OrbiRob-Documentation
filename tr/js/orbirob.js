/* =========================================================
   OrbiRob Documentation
   Common page structure
   ========================================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const body = document.body;
    const pageContent = document.querySelector(".ltx_page_content");

    if (!pageContent) {
        console.error("OrbiRob: .ltx_page_content not found.");
        return;
    }

    /* Header */
    const header = document.createElement("header");
    header.className = "tb-header";

    header.innerHTML = `
        <a class="brand" href="index.html">
            <img src="figs/logo.png" alt="OrbiRob Sona Robotics">
            <div class="brand-text">
                <div class="brand-title">OrbiRob</div>
                <div class="brand-subtitle">SONA ROBOTICS</div>
            </div>
        </a>
    `;

    /* Sidebar */
    const sidebar = document.createElement("aside");
    sidebar.className = "tb-sidebar";

    try {
        const response = await fetch("toc.html");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const tocHTML = await response.text();

        const wrapper = document.createElement("div");
        wrapper.innerHTML = tocHTML;

        const toc = wrapper.querySelector(".ltx_TOC");

        if (toc) {
            sidebar.appendChild(toc);
        }

    } catch (error) {
        console.error("OrbiRob: cannot load toc.html:", error);

        const errorMessage = document.createElement("div");
        errorMessage.textContent = "İçindekiler yüklenemedi.";
        sidebar.appendChild(errorMessage);
    }

    /* Main content */
    const main = document.createElement("main");
    main.className = "tb-content";

    /*
     * On the LaTeXML index page, the table of contents is
     * already displayed in the sidebar. Remove the duplicate
     * TOC from the right-hand content area, while preserving
     * the title page and all other content.
     */
    if (window.location.pathname.endsWith("/tr/") ||
        window.location.pathname.endsWith("/tr/index.html")) {

        const embeddedToc = pageContent.querySelector(".ltx_TOC");

        if (embeddedToc) {
            embeddedToc.remove();
        }
    }

    /*
     * Move the remaining LaTeXML content into our common
     * presentation container.
     */
    main.appendChild(pageContent);

    /* Two-column container */
    const container = document.createElement("div");
    container.className = "tb-container";

    container.appendChild(sidebar);
    container.appendChild(main);

    /*
     * Replace the LaTeXML body shell with our common shell.
     * The original document content has already been preserved
     * inside <main>.
     */
    body.replaceChildren(header, container);

    /* Highlight current page */
    const currentPath =
        window.location.pathname.replace(/\/+$/, "");

    sidebar.querySelectorAll("a").forEach(function (link) {

        const linkPath =
            new URL(link.href, window.location.href)
                .pathname
                .replace(/\/+$/, "");

        if (linkPath === currentPath) {
            link.style.color = "#fff";
            link.style.backgroundColor = "#4a3325";
        }
    });
});
