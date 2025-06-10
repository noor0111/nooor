// ---- salonReport.js -------------------------------------------------------
// Base URL of your Express count API (change port / host if needed)
const baseURL = "https://refactored-fortnight-pj9v94p97jrq3r5vp-6008.app.github.dev";

// Map the DOM id ⇢ endpoint
const endpoints = {
    clients:       "/totalclients",
    services:      "/totalservices",
    staff:         "/totalstaff",
    products:      "/totalproducts",
    appointments:  "/totalappointments",
    payments:      "/totalpayments",
    feedback:      "/totalclientfeedback",
    promotions:    "/totalpromotions"
};

// ────────────────────────────────────────────────────────────────────────────
// Load a single count and put it in its <p id="…"> element
function loadCount(key) {
    fetch(baseURL + endpoints[key])
        .then(r => {
            if (!r.ok) throw new Error(`Failed to fetch ${key} count`);
            return r.json();
        })
        .then(data => {
            /* Your API might return:
               { count: "27" }     – MySQL / pg return rows[0]  
               OR [{ count: "27" }] – If you send rows array directly.
               Handle both shapes. */
            const count = Array.isArray(data) ? data[0].count : data.count;
            document.getElementById(key).innerText = count;
        })
        .catch(err => {
            console.error(err);
            document.getElementById(key).innerText = "Error";
        });
}

// Load every card at once
function loadAllCounts() {
    Object.keys(endpoints).forEach(loadCount);
}

// Reset a single card
function hideCount(key) {
    document.getElementById(key).innerText = "--";
}

// Reset them all
function hideAllCounts() {
    Object.keys(endpoints).forEach(hideCount);
}
