const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoints
  if (pathname === '/api/campus-alerts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: "New alert: Spring student fair starts at 2:00 PM in the Student Union. Dining hall closes at 9:00 PM tonight."
    }));
  } else if (pathname === '/api/events') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      events: "Featured this week: Career Fair on April 14, Open Mic Night on April 17, and Spring Concert on April 19."
    }));
  } else if (pathname.startsWith('/api/events/search')) {
    const query = parsedUrl.query.q ? parsedUrl.query.q.toLowerCase() : '';
    let results = [];

    if (query.includes('career')) {
      results.push({ description: "Spring Career Fair — Apr 14, 10:00 AM, Student Union Hall A." });
    } else if (query.includes('soccer')) {
      results.push({ description: "Intramural Soccer Finals — Apr 15, 5:00 PM, East Athletic Field." });
    } else if (query.includes('ai') || query.includes('lecture')) {
      results.push({ description: "Guest Lecture: AI in Medicine — Apr 16, 2:00 PM, Science Building Room 204." });
    } else if (query.includes('concert')) {
      results.push({ description: "Spring Concert — Apr 19, 8:00 PM, Main Auditorium." });
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ results }));
  } else if (pathname === '/api/dining/specials') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      specials: "Today's special: Pasta Bar, Vegan Buddha Bowl, Fresh Fruit Station, and Soup of the Day."
    }));
  } else if (pathname.startsWith('/api/dining/menu/')) {
    const hallName = pathname.split('/').pop();
    let menu = '';

    if (hallName === 'main') {
      menu = "Main Dining Hall Menu: Scrambled Eggs, Pancakes, Grilled Chicken Sandwich, Caesar Salad, Pasta Bar.";
    } else if (hallName === 'cafe') {
      menu = "North Side Café Menu: Coffee, Bagels, Sandwiches, Salads, Grab & Go snacks.";
    } else if (hallName === 'grill') {
      menu = "The Grill Menu: Burgers, Fries, Chicken Tenders, Veggie Burger, Soft Drinks.";
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ menu }));
  } else if (pathname === '/api/map/locations') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      locations: "Top locations: Main Library, Student Union, Science Building, Parking Lot A, and Athletic Center."
    }));
  } else if (pathname.startsWith('/api/map/search')) {
    const query = parsedUrl.query.q ? parsedUrl.query.q.toLowerCase() : '';
    let location = null;

    if (query.includes('library')) {
      location = { description: "Main Library found: Academic building near the center-left of campus." };
    } else if (query.includes('union')) {
      location = { description: "Student Union found: Social hub with dining and events near the center of campus." };
    } else if (query.includes('science')) {
      location = { description: "Science Building found: Academic building on the upper-right side of campus." };
    } else if (query.includes('parking')) {
      location = { description: "Parking Lot A found: Main parking area on the lower-left side of campus." };
    } else if (query.includes('athletic') || query.includes('gym')) {
      location = { description: "Athletic Center found: Sports facility on the lower-right side of campus." };
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ location }));
  } else if (pathname === '/api/location/current') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      location: "You are near the Student Union entrance."
    }));
  } else {
    // Serve static files
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }

      const ext = path.extname(filePath);
      let contentType = 'text/html';

      if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.gif') contentType = 'image/gif';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
});

server.listen(port, () => {
  console.log(`Campus app server running at http://localhost:${port}`);
});