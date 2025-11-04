const API_URL =
  "https://geolocationaaa-avabhugbg9hgezcs.westus-01.azurewebsites.net/api/location";

const els = {
  status: document.getElementById("status"),
  raw: document.getElementById("rawJson"),
  ip: document.getElementById("ipAddress"),
  country: document.getElementById("country"),
  city: document.getElementById("city"),
  lat: document.getElementById("latitude"),
  lng: document.getElementById("longitude"),
  btn: document.getElementById("btnFetch"),
};

async function fetchLocation() {
  els.status.textContent = "Loading…";
  try {
    const url =
      API_URL + (API_URL.includes("?") ? "&" : "?") + "_=" + Date.now();
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const data = await res.json();

    els.ip.textContent = data.ipAddress ?? "—";
    els.country.textContent = data.country ?? "—";
    els.city.textContent = data.city ?? "—";
    els.lat.textContent = (data.latitude ?? "—").toString();
    els.lng.textContent = (data.longitude ?? "—").toString();
    els.raw.textContent = JSON.stringify(data, null, 2);
    els.status.textContent = "Done";
  } catch (err) {
    console.error(err);
    els.status.textContent = "Error fetching location (see console).";
    els.raw.textContent = JSON.stringify({ error: String(err) }, null, 2);
  }
}

// Bind button + auto-run
els.btn.addEventListener("click", fetchLocation);
window.addEventListener("DOMContentLoaded", fetchLocation);
