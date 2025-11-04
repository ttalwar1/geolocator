let userCity = "";

async function loadLocation() {
  const res = await fetch(
    "https://geolocationaaa-avabhugbg9hgezcs.westus-01.azurewebsites.net/api/location"
  );
  const data = await res.json();
  document.getElementById("ip").textContent = data.ipAddress ?? "—";
  document.getElementById("country").textContent = data.country ?? "—";
  document.getElementById("city").textContent = data.city ?? "—";
  document.getElementById("lat").textContent = data.latitude ?? "—";
  document.getElementById("lng").textContent = data.longitude ?? "—";
  document.getElementById("status").textContent = "Location data loaded";
  document.getElementById("result").classList.remove("hidden");
  userCity = data.city ?? "";
}

async function handleSubmit(e) {
  e.preventDefault();
  const q = document.getElementById("query").value.trim();
  if (!q) return;
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: q, city: userCity }),
  });
  const data = await res.json();
  alert(data.reply);
}

window.addEventListener("DOMContentLoaded", loadLocation);
document.getElementById("searchForm").addEventListener("submit", handleSubmit);
