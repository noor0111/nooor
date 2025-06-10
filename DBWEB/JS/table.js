// Keep the same structure – just add the two missing tables (Service Products & Staff Services)
window.addEventListener("DOMContentLoaded", () => {

    const base = "https://refactored-fortnight-pj9v94p97jrq3r5vp-6008.app.github.dev";

    // ------------------------------- CLIENTS ---------------------------------
    fetch(`${base}/clients`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#clientstable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.client_id}</td>
                <td>${item.first_name}</td>
                <td>${item.last_name}</td>
                <td>${item.phone}</td>
                <td>${item.email}</td>
                <td>${item.birth_date}</td>
                <td>${item.join_date}</td>
                <td>${item.client_notes}</td>
            </tr>`;
        });
    });

    // ------------------------------- SERVICES --------------------------------
    fetch(`${base}/services`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#servicestable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.service_id}</td>
                <td>${item.service_name}</td>
                <td>${item.description}</td>
                <td>${item.duration_min}</td>
                <td>${item.base_price}</td>
                <td>${item.category}</td>
                <td>${item.active}</td>
            </tr>`;
        });
    });

    // -------------------------------- STAFF ----------------------------------
    fetch(`${base}/staff`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#stafftable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.staff_id}</td>
                <td>${item.first_name}</td>
                <td>${item.last_name}</td>
                <td>${item.phone}</td>
                <td>${item.email}</td>
                <td>${item.hire_date}</td>
                <td>${item.position}</td>
                <td>${item.salary}</td>
                <td>${item.active}</td>
            </tr>`;
        });
    });

    // ------------------------------- PRODUCTS --------------------------------
    fetch(`${base}/products`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#productstable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.product_id}</td>
                <td>${item.product_name}</td>
                <td>${item.brand}</td>
                <td>${item.category}</td>
                <td>${item.purchase_price}</td>
                <td>${item.retail_price}</td>
                <td>${item.quantity_in_stock}</td>
            </tr>`;
        });
    });

    // ------------------------- SERVICE PRODUCTS (JUNCTION) -------------------
    fetch(`${base}/serviceproducts`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#serviceproductstable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.service_id}</td>
                <td>${item.product_id}</td>
                <td>${item.quantity_used}</td>
            </tr>`;
        });
    });

    // -------------------------- STAFF SERVICES (JUNCTION) --------------------
    fetch(`${base}/staffservices`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#staffservicestable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.staff_id}</td>
                <td>${item.service_id}</td>
            </tr>`;
        });
    });

    // ----------------------------- APPOINTMENTS ------------------------------
    fetch(`${base}/appointments`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#appointmentstable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.appointment_id}</td>
                <td>${item.client_id}</td>
                <td>${item.service_id}</td>
                <td>${item.staff_id}</td>
                <td>${item.appointment_date}</td>
                <td>${item.start_time}</td>
                <td>${item.end_time}</td>
                <td>${item.status}</td>
            </tr>`;
        });
    });

    // ------------------------------- PAYMENTS --------------------------------
    fetch(`${base}/payments`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#paymentstable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.payment_id}</td>
                <td>${item.appointment_id}</td>
                <td>${item.client_id}</td>
                <td>${item.payment_date}</td>
                <td>${item.payment_amount}</td>
                <td>${item.payment_method}</td>
                <td>${item.tip_amount}</td>
            </tr>`;
        });
    });

    // ------------------------------ FEEDBACK ---------------------------------
    fetch(`${base}/clientfeedback`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#feedbacktable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.feedback_id}</td>
                <td>${item.client_id}</td>
                <td>${item.appointment_id}</td>
                <td>${item.rating}</td>
                <td>${item.comments}</td>
                <td>${item.feedback_date}</td>
            </tr>`;
        });
    });

    // ------------------------------ PROMOTIONS -------------------------------
    fetch(`${base}/promotions`).then(r => r.json()).then(data => {
        const tbody = document.querySelector("#promotionstable tbody");
        data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.promotion_id}</td>
                <td>${item.promotion_name}</td>
                <td>${item.description}</td>
                <td>${item.discount_percent}</td>
                <td>${item.start_date}</td>
                <td>${item.end_date}</td>
                <td>${item.applicable_services}</td>
            </tr>`;
        });
    });

});
