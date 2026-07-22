# Backend (PHP) — luccibyey.com.tn/protectlanding/

Upload all files in this folder to `http://luccibyey.com.tn/protectlanding/`.

## First time setup
1. `install.php` — creates the `leads` table.
2. `install_visitors.php` — creates the `protectionlanding_visitors` and `protectionlanding_visitor_page_views` tables.

Open each URL once in the browser after upload.

## Endpoints

### Leads
- `POST /submit_form.php` — accepts JSON lead payload. Required: `full_name`, `phone`.
- `GET  /get_all_submissions.php` — returns all leads (used by `/leads`).

### Visitor tracking
- `POST /track_visit.php` — upserts a visitor (unique per IP) + logs the page view. Returns `{ page_view_id }`.
- `POST /track_duration.php` — updates time-on-page (called via `navigator.sendBeacon` on unload).
- `GET  /get_all_visitors.php` — returns visitors with their page-view history (used by `/visitors`).

## Admin
- `/leads` — leads dashboard.
- `/visitors` — visitor analytics dashboard.

Both share hardcoded credentials.
