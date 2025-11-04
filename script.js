const API_URL =
  "https://geolocationaaa-avabhugbg9hgezcs.westus-01.azurewebsites.net/api/location";

async function loadLocation() {
  const status = document.getElementById("status");
  const card = document.getElementById("result");

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    document.getElementById("ip").textContent = data.ipAddress ?? "—";
    document.getElementById("country").textContent = data.country ?? "—";
    document.getElementById("city").textContent = data.city ?? "—";
    document.getElementById("lat").textContent = data.latitude ?? "—";
    document.getElementById("lng").textContent = data.longitude ?? "—";

    status.textContent = "Location data loaded";
    card.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    status.textContent = "Error fetching location. Check console for details.";
  }
}

// Automatically run on page load
window.addEventListener("DOMContentLoaded", loadLocation);
