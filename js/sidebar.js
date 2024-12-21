const sidebar = document.querySelector(".sidebar");
const sidebarToggleButton = document.querySelector(".sidebar-toggle");
const mainContent = document.querySelector("main"); // Adjust this selector to match your content

function toggleSidebar() {
  sidebar.classList.toggle("open");
  sidebarToggleButton.classList.toggle("active");

  const isSidebarVisible = sidebar.classList.contains("open");
  sidebar.setAttribute("aria-hidden", isSidebarVisible ? "false" : "true");

  // Apply the 'inert' attribute to the main content when the sidebar is open
  if (mainContent) {
    mainContent.inert = isSidebarVisible;
  }

  // Manage sidebar focusability
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

// Close sidebar when navigating back/forward in browser history
window.addEventListener("popstate", () => {
  closeSidebar();
});

// Force close sidebar when the page is shown (fixes Safari behavior)
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // If page is loaded from cache (common in Safari), reset sidebar state
    closeSidebar();
  }
});

// Other event listeners
sidebarToggleButton.addEventListener("click", toggleSidebar);
window.addEventListener("resize", handleResize);
window.addEventListener("load", initializeTabIndexState);

initializeTabIndexState();
