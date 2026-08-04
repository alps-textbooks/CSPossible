// Fix the headers in the feedback tables for the autograder
function fixHeaders(root = document) {
  root.querySelectorAll("th.ac-feedback:nth-child(2)").forEach(th => {
    if (th.textContent === "Actual Value") {
      th.textContent = "Expected Value";
    }
  });

  root.querySelectorAll("th.ac-feedback:nth-child(3)").forEach(th => {
    if (th.textContent === "Expected Value") {
      th.textContent = "Actual Value";
    }
  });
}

// Fix when new DOM elements are added
new MutationObserver(mutations => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        fixHeaders(node);
      }
    }
  }
}).observe(document.body, {
  childList: true,
  subtree: true
});