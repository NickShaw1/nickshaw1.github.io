const sidebar = document.querySelector(".sidebar");
const sidebarToggleButton = document.querySelector(".sidebar-toggle");
const mainContent = document.querySelector("main");

function toggleSidebar() {
  sidebar.classList.toggle("open");
  sidebarToggleButton.classList.toggle("active");

  const isSidebarVisible = sidebar.classList.contains("open");
  sidebar.setAttribute("aria-hidden", isSidebarVisible ? "false" : "true");

  if (mainContent) {
    mainContent.inert = isSidebarVisible;
  }

  updateSidebarTabIndices(isSidebarVisible);
}

function closeSidebar() {
  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    sidebarToggleButton.classList.remove("active");
    sidebar.setAttribute("aria-hidden", "true");

    if (mainContent) {
      mainContent.inert = false;
    }

    updateSidebarTabIndices(false);
  }
}

function updateSidebarTabIndices(isSidebarVisible) {
  sidebar
    .querySelectorAll("a, button, input, select, textarea")
    .forEach((el) => {
      el.setAttribute("tabindex", isSidebarVisible ? "0" : "-1");
    });
}

function handleResize() {
  if (window.innerWidth > 768 && sidebar.classList.contains("open")) {
    closeSidebar();
  }
}

function initializeTabIndexState() {
  const isSidebarVisible = sidebar.classList.contains("open");
  sidebar.setAttribute("aria-hidden", isSidebarVisible ? "false" : "true");

  if (mainContent) {
    mainContent.inert = isSidebarVisible;
  }

  updateSidebarTabIndices(isSidebarVisible);
}

function handleTouchOutside(event) {
  if (
    !sidebar.contains(event.target) &&
    !sidebarToggleButton.contains(event.target)
  ) {
    closeSidebar();
  }
}

window.addEventListener("popstate", () => {
  closeSidebar();
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    closeSidebar();
  }
});

sidebarToggleButton.addEventListener("click", toggleSidebar);
window.addEventListener("resize", handleResize);
window.addEventListener("load", initializeTabIndexState);

window.addEventListener("touchstart", handleTouchOutside, true);

initializeTabIndexState();
