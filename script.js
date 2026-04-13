// Mobile nav toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Reusable helper to show messages in placeholder boxes
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

// Home page updates
function loadCampusAlerts() {
  setText(
    "alertsBox",
    "New alert: Spring student fair starts at 2:00 PM in the Student Union. Dining hall closes at 9:00 PM tonight."
  );
}

// Events page updates
function loadEventFeed() {
  setText(
    "eventFeed",
    "Featured this week: Career Fair on April 14, Open Mic Night on April 17, and Spring Concert on April 19."
  );
}

function searchEvents() {
  const input = document.getElementById("eventSearch");
  const result = document.getElementById("eventSearchResult");

  if (!input || !result) return;

  const query = input.value.trim().toLowerCase();

  if (query === "") {
    result.textContent = "Type an event name like career, soccer, concert, or lecture.";
  } else if (query.includes("career")) {
    result.textContent = "Match found: Spring Career Fair — Apr 14, 10:00 AM, Student Union Hall A.";
  } else if (query.includes("soccer")) {
    result.textContent = "Match found: Intramural Soccer Finals — Apr 15, 5:00 PM, East Athletic Field.";
  } else if (query.includes("ai") || query.includes("lecture")) {
    result.textContent = "Match found: Guest Lecture: AI in Medicine — Apr 16, 2:00 PM, Science Building Room 204.";
  } else if (query.includes("concert")) {
    result.textContent = "Match found: Spring Concert — Apr 19, 8:00 PM, Main Auditorium.";
  } else {
    result.textContent = `No exact match for "${input.value}", but more campus events will appear here later.`;
  }
}

// Dining page updates
function loadDiningUpdate() {
  setText(
    "diningUpdate",
    "Today’s special: Pasta Bar, Vegan Buddha Bowl, Fresh Fruit Station, and Soup of the Day."
  );
}

function showHallMenu(hallName) {
  const menuBox = document.getElementById("hallMenuBox");
  if (!menuBox) return;

  if (hallName === "main") {
    menuBox.textContent =
      "Main Dining Hall Menu: Scrambled Eggs, Pancakes, Grilled Chicken Sandwich, Caesar Salad, Pasta Bar.";
  } else if (hallName === "cafe") {
    menuBox.textContent =
      "North Side Café Menu: Coffee, Bagels, Sandwiches, Salads, Grab & Go snacks.";
  } else if (hallName === "grill") {
    menuBox.textContent =
      "The Grill Menu: Burgers, Fries, Chicken Tenders, Veggie Burger, Soft Drinks.";
  }
}

// Map page updates
function loadMapInfo() {
  setText(
    "mapInfo",
    "Top locations: Main Library, Student Union, Science Building, Parking Lot A, and Athletic Center."
  );
}

function searchLocation() {
  const input = document.getElementById("locationSearch");
  const result = document.getElementById("locationResult");

  if (!input || !result) return;

  const query = input.value.trim().toLowerCase();

  if (query === "") {
    result.textContent = "Type a location like library, union, science, parking, or athletic.";
  } else if (query.includes("library")) {
    result.textContent = "Main Library found: Academic building near the center-left of campus.";
  } else if (query.includes("union")) {
    result.textContent = "Student Union found: Social hub with dining and events near the center of campus.";
  } else if (query.includes("science")) {
    result.textContent = "Science Building found: Academic building on the upper-right side of campus.";
  } else if (query.includes("parking")) {
    result.textContent = "Parking Lot A found: Main parking area on the lower-left side of campus.";
  } else if (query.includes("athletic") || query.includes("gym")) {
    result.textContent = "Athletic Center found: Sports facility on the lower-right side of campus.";
  } else {
    result.textContent = `No exact location found for "${input.value}".`;
  }
}

// Fake zoom controls for map page
let zoomLevel = 100;

function zoomIn() {
  const mapArea = document.getElementById("mapArea");
  if (!mapArea) return;

  zoomLevel += 10;
  mapArea.style.transform = `scale(${zoomLevel / 100})`;
  mapArea.style.transformOrigin = "center center";
}

function zoomOut() {
  const mapArea = document.getElementById("mapArea");
  if (!mapArea) return;

  if (zoomLevel > 60) {
    zoomLevel -= 10;
    mapArea.style.transform = `scale(${zoomLevel / 100})`;
    mapArea.style.transformOrigin = "center center";
  }
}

function showMyLocation() {
  setText("mapInfo", "Your location: You are near the Student Union entrance.");
}