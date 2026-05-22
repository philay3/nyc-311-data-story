# Phone vs App: Does How You Complain Affect How Fast NYC Responds?

A single-page data story exploring whether the channel you use to submit a NYC 311 complaint — phone, web, or mobile app — has any effect on how quickly it gets resolved.

## What it shows

A bar chart of average resolution time (in hours) broken down by submission channel (PHONE, ONLINE, MOBILE), drawn from 25,000 NYC 311 service requests filed in 2023.

**Spoiler:** Phone is slightly fastest, but all three channels hover around 16 days — the channel matters far less than the complaint type itself.

## Stack

- **Backend:** Node.js + Express + better-sqlite3
- **Frontend:** Vanilla HTML/CSS + Chart.js (CDN)
- **Data:** NYC Open Data — 311 Service Requests 2023 (SQLite)

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Place your `nyc_311_2023.db` SQLite file in the project root. The database should have a `service_requests` table with at least these columns:
   - `open_data_channel_type` — `PHONE`, `ONLINE`, or `MOBILE`
   - `resolution_hours` — numeric time to resolution

3. Start the server:
   ```bash
   node server.js
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## API

`GET /api/data` — returns average resolution hours and record count grouped by channel:

```json
[
  { "channel": "PHONE",  "avg_hours": 379.3, "count": 6181 },
  { "channel": "ONLINE", "avg_hours": 382.9, "count": 5163 },
  { "channel": "MOBILE", "avg_hours": 385.0, "count": 4383 }
]
```
