const API_URL = "/api/chat";
let userCity = "";

async function loadLocation() {
  const status = document.getElementById("status");
  const card = document.getElementById("result");
  try {
    const res = await fetch(
      "https://geolocationaaa-avabhugbg9hgezcs.westus-01.azurewebsites.net/api/location"
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    document.getElementById("ip").textContent = data.ipAddress ?? "—";
    document.getElementById("country").textContent = data.country ?? "—";
    document.getElementById("city").textContent = data.city ?? "—";
    document.getElementById("lat").textContent = data.latitude ?? "—";
    document.getElementById("lng").textContent = data.longitude ?? "—";
    userCity = data.city ?? "";
    status.textContent = "Location data loaded";
    card.classList.remove("hidden");
  } catch (e) {
    console.error(e);
    status.textContent = "Error loading location.";
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  const q = document.getElementById("query").value.trim();
  if (!q) return;

  btn.classList.add("loading");
  btn.disabled = true;
  document.getElementById("status").textContent = "Working…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, city: userCity }),
    });

    const overlay = document.getElementById("overlay");
    const reply = document.getElementById("reply");

    if (!res.ok) {
      const allow = res.headers.get("Allow");
      const text = await res.text();
      reply.textContent = `Request failed (${res.status}). Allow: ${
        allow || "n/a"
      }\n\n${text}`;
      overlay.classList.remove("hidden");
      return;
    }

    const data = await res.json();
    reply.textContent =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
    overlay.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    const overlay = document.getElementById("overlay");
    const reply = document.getElementById("reply");
    reply.textContent = "Network or server error.";
    overlay.classList.remove("hidden");
  } finally {
    btn.classList.remove("loading");
    btn.disabled = false;
    document.getElementById("status").textContent = "Done";
  }
}

function wirePopup() {
  const overlay = document.getElementById("overlay");
  document
    .getElementById("closePopup")
    .addEventListener("click", () => overlay.classList.add("hidden"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadLocation();
  wirePopup();
  document
    .getElementById("searchForm")
    .addEventListener("submit", handleSubmit);
});
