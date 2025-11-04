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
  const q = document.getElementById("query").value.trim();
  if (!q) return;

  const status = document.getElementById("status");
  status.textContent = "Working…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, city: userCity }),
    });

    if (!res.ok) {
      const allow = res.headers.get("Allow");
      const text = await res.text();
      alert(
        `Request failed (${res.status}). Allow: ${allow || "n/a"}\n\n${text}`
      );
      status.textContent = "Done";
      return;
    }

    const data = await res.json();
    alert(
      typeof data === "string"
        ? data
        : data.reply ?? JSON.stringify(data, null, 2)
    );
  } catch (err) {
    console.error(err);
    alert("Network or server error.");
  } finally {
    status.textContent = "Done";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadLocation();
  document
    .getElementById("searchForm")
    .addEventListener("submit", handleSubmit);
});
