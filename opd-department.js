// Main logic for OPD Appointment Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('opdBookForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get Patient Name for personalized message
            const name = document.getElementById('patientName').value;

            // Close the Modal using Bootstrap API
            const modalElement = document.getElementById('bookModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            
            if (modalInstance) {
                modalInstance.hide();
            }

            // Provide visual confirmation after a small delay
            setTimeout(() => {
                const message = `Booking Successful!\n\nDear ${name}, your OPD appointment request has been received. Our team will contact you shortly on your provided phone number.`;
                alert(message);
                
                // Reset form fields
                bookingForm.reset();
            }, 500);

            // Logic to save data to local storage (optional)
            console.log("Appointment saved for patient:", name);
        });
    }
});



// footer section 

document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
    });
});

// header section 
// Toggle Notification Panel
const notifToggle = document.getElementById('notifToggle');
const notifPanel = document.getElementById('notifPanel');
const viewAllBtn = document.getElementById('viewAll');
const notifList = document.getElementById('notifList');
const markRead = document.getElementById('markRead');

notifToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('d-none');
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!notifPanel.contains(e.target)) {
        notifPanel.classList.add('d-none');
    }
});

// Mark all as read / Clear
markRead.addEventListener('click', () => {
    notifList.innerHTML = '<div class="p-4 text-center text-muted smaller">No new notifications</div>';
    document.querySelector('.notif-badge').style.display = 'none';
});

// View All Logic (Loads 5 more items)
viewAllBtn.addEventListener('click', () => {
    const moreMessages = [
        { title: "Prescription Updated", desc: "Your medicine list has been updated." },
        { title: "Billing Confirmed", desc: "Payment for Invoice #992 received." },
        { title: "Health Tip", desc: "Drink 8 glasses of water daily for better skin." },
        { title: "Vaccination Drive", desc: "Polio drops camp starting next Sunday." },
        { title: "Laboratory Alert", desc: "Thyroid test results are pending." }
    ];

    moreMessages.forEach(msg => {
        const item = document.createElement('div');
        item.className = "notif-item p-3 border-bottom";
        item.innerHTML = `
            <p class="mb-0 small fw-bold text-dark">${msg.title}</p>
            <span class="text-muted smaller">${msg.desc}</span>
        `;
        notifList.appendChild(item);
    });

    viewAllBtn.innerText = "All Notifications Loaded";
    viewAllBtn.disabled = true;
});

/* English: Script to handle payment methods, local storage saving, and custom alerts */

let currentMethod = 'Card';

// 1. Method Switching without changing container size
function switchMethod(method, btn) {
    currentMethod = method;
    
    // UI Update for buttons
    const buttons = document.querySelectorAll('.method-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const fields = document.getElementById('methodFields');
    fields.classList.remove('animate-fade');
    void fields.offsetWidth; // Trigger reflow for animation
    fields.classList.add('animate-fade');

    if(method === 'Card') {
        fields.innerHTML = `
            <div class="mb-3">
                <label class="form-label small fw-bold">Cardholder Name</label>
                <input type="text" id="holderName" class="form-control custom-input" placeholder="Enter your name" required>
            </div>
            <div class="mb-3">
                <label class="form-label small fw-bold">Card Number</label>
                <input type="text" id="cardNumber" class="form-control custom-input" placeholder="0000 0000 0000 0000" required>
            </div>
            <div class="row">
                <div class="col-6">
                    <label class="form-label small fw-bold">Expiry</label>
                    <input type="text" id="expiry" class="form-control custom-input" placeholder="MM/YY" required>
                </div>
                <div class="col-6">
                    <label class="form-label small fw-bold">CVV</label>
                    <input type="password" id="cvv" class="form-control custom-input" placeholder="***" required>
                </div>
            </div>`;
    } else if(method === 'Cash') {
        fields.innerHTML = `
            <div class="p-4 bg-white rounded-4 border text-center">
                <i class="fas fa-hand-holding-usd fa-3x text-success mb-3"></i>
                <p class="fw-bold mb-1">Pay at Billing Counter</p>
                <p class="small text-muted">You need to deposit <strong>RS 1,705.50</strong> at the cash counter.</p>
            </div>`;
    } else {
        fields.innerHTML = `
            <div class="mb-3">
                <label class="form-label small fw-bold">Select Bank / Wallet</label>
                <select id="bankName" class="form-control custom-input">
                    <option>Habib Bank (HBL)</option>
                    <option>Meezan Bank</option>
                    <option>JazzCash / EasyPaisa</option>
                </select>
            </div>
            <p class="small text-muted border p-2 rounded">Note: Please save your transaction ID after the online payment transfer.</p>`;
    }
}

// 2. Submit Logic & Custom Alert
document.getElementById('billingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const paymentData = {
        method: currentMethod,
        patientID: "CH-2024-8892",
        amount: "RS 1,705.50",
        date: new Date().toLocaleString()
    };

    // Save to Local Storage
    localStorage.setItem('hospital_billing', JSON.stringify(paymentData));

    // Show Custom Alert
    const overlay = document.getElementById('successOverlay');
    const details = document.getElementById('alertDetails');
    
    details.innerHTML = `Your payment of <strong>${paymentData.amount}</strong> has been processed successfully.<br><small>${paymentData.date}</small>`;
    overlay.classList.remove('d-none');
});

function closeAlert() {
    document.getElementById('successOverlay').classList.add('d-none');
}