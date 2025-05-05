const input = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const iframe = document.getElementById("iframe");
const loader = document.getElementById("loader");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const supportedLinksList = document.getElementById("supportedLinksList");

let supportedLinks = [
  { url: "https://sz-games.github.io", label: "SZ Games", icon: "fa-gamepad" },
  { url: "https://onlinegames.io", label: "Online Games", icon: "fa-globe" },
  { url: "https://blockblast.com", label: "Block Blast", icon: "fa-cube" },
];

function renderSupportedLinks() {
  supportedLinksList.innerHTML = '';
  supportedLinks.forEach(link => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'supported-link';
    button.innerHTML = `<i class="fas ${link.icon}"></i> ${link.label}`;
    button.addEventListener('click', () => handleQuery(link.url));
    li.appendChild(button);
    supportedLinksList.appendChild(li);
  });
}

function handleQuery(query) {
  const trimmed = query.trim();
  if (!trimmed) return;
  showLoader();
  setTimeout(() => {
    iframe.src = trimmed;
    hideLoader();
    showNotification("Search completed!", "success");
  }, 1500);
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.classList.add("notification", type);

  let iconUrl;
  switch (type) {
    case "success":
      iconUrl = "https://img.icons8.com/ios-filled/50/34c759/checkmark.png";
      break;
    case "error":
      iconUrl = "https://img.icons8.com/ios-filled/50/ff3b30/delete-sign.png";
      break;
    case "info":
    default:
      iconUrl = "https://img.icons8.com/ios-filled/50/007aff/info.png";
      break;
  }

  notification.innerHTML = `<img src="${iconUrl}" alt="${type}" /> ${message}`;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

fullscreenBtn.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
  } else {
    document.documentElement.requestFullscreen();
    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
  }
});

renderSupportedLinks();
