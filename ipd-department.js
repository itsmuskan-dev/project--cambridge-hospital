
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

/* English: JavaScript to track section visits and save to Local Storage */

document.addEventListener('DOMContentLoaded', () => {
    const infoCard = document.getElementById('ipdInfoCard');

    if (infoCard) {
        infoCard.addEventListener('click', () => {
            // Data to be saved
            const interactionData = {
                section: "IPD Sanctuary",
                timestamp: new Date().toLocaleString(),
                action: "User viewed IPD details"
            };

            // Save to Local Storage
            localStorage.setItem('last_ipd_interaction', JSON.stringify(interactionData));

            // Visual feedback
            console.log("IPD interaction saved to Local Storage.");
            
            // Highlight effect to show something happened
            infoCard.style.borderColor = "#b33939";
            setTimeout(() => {
                infoCard.style.borderColor = "#eee";
            }, 500);
        });
    }
});

/* English: Logic to handle Dynamic Auto-scrolling images and text */


const allRoomData = [
    {
        heading: "Executive Patient Suite",
        description: "High-end luxury suite with a private lounge, dedicated nursing call system, and panoramic city views for a peaceful recovery.",
        imagePath: "ipd 2.png" // Place your Executive room image here
    },
    {
        heading: "Standard Private Ward",
        description: "Comfortable and spacious private rooms equipped with advanced monitoring systems and essential amenities for patient care.",
        imagePath: "ipd4.png" // Place your Standard room image here
    },
    {
        heading: "Semi-Private Shared Room",
        description: "Quality healthcare accommodation designed for two patients, maintaining privacy while providing professional medical support.",
        imagePath: "ipd 1.png" // Place your Semi-Private image here
    },
    {
        heading: "VIP Recovery Wing",
        description: "Specialized recovery wing offering enhanced security, dedicated medical concierge services, and exclusive family waiting areas.",
        imagePath: "ipd6.png" // Place your VIP image here
    },
    {
        heading: "Intensive Care Unit (ICU)",
        description: "Highly controlled environment with round-the-clock intensive medical care, advanced life support systems, and monitoring.",
        imagePath: "ipd7.png" // Place your ICU image here
    }
    
];

let currentIndex = 0;

function moveSlide(direction) {
    // Determine new index
    currentIndex = (currentIndex + direction + allRoomData.length) % allRoomData.length;
    
    // Select elements
    const headingEl = document.getElementById('roomHeading');
    const paragraphEl = document.getElementById('roomParagraph');
    const imageEl = document.getElementById('dynamicRoomImage');

    // Muskan, this handles dynamic text fading
    headingEl.classList.add('animate-fade');
    paragraphEl.classList.add('animate-fade');

    // Update Content based on new index
    headingEl.innerText = allRoomData[currentIndex].heading;
    paragraphEl.innerText = allRoomData[currentIndex].description;
    imageEl.src = allRoomData[currentIndex].imagePath;

    // Reset animations
    setTimeout(() => {
        headingEl.classList.remove('animate-fade');
        paragraphEl.classList.remove('animate-fade');
    }, 600);
}

// Muskan, this handles auto-scrolling every 6 seconds
let autoScrollInterval = setInterval(() => {
    moveSlide(1);
}, 6000);

// Stop auto-scrolling on manual interaction
document.getElementById('prevBtn').addEventListener('click', () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => { moveSlide(1); }, 10000); // Resume slower
});

document.getElementById('nextBtn').addEventListener('click', () => {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => { moveSlide(1); }, 10000); // Resume slower
});

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
            <div class="mb-3"><label class="form-label small fw-bold">Cardholder Name</label><input type="text" id="holderName" class="form-control custom-input" placeholder="John Doe" required></div>
            <div class="mb-3"><label class="form-label small fw-bold">Card Number</label><input type="text" id="cardNumber" class="form-control custom-input" placeholder="0000 0000 0000 0000" required></div>
            <div class="row"><div class="col-6"><label class="form-label small fw-bold">Expiry</label><input type="text" id="expiry" class="form-control custom-input" placeholder="MM/YY" required></div>
            <div class="col-6"><label class="form-label small fw-bold">CVV</label><input type="password" id="cvv" class="form-control custom-input" placeholder="***" required></div></div>`;
    } else if(method === 'Cash') {
        fields.innerHTML = `
            <div class="p-4 bg-white rounded-4 border text-center">
                <i class="fas fa-hand-holding-usd fa-3x text-success mb-3"></i>
                <p class="fw-bold mb-1">Pay at Billing Counter</p>
                <p class="small text-muted">you <strong>RS 1,705.50</strong>  will have to deposit at the cash counter.</p>
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
            <p class="small text-muted border p-2 rounded">Note:  After online payment transfer save transaction end  Necessary..</p>`;
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
    
    details.innerHTML = `your <strong>${paymentData.amount}</strong> has been processed.<br><small>${paymentData.date}</small>`;
    overlay.classList.remove('d-none');
});

function closeAlert() {
    document.getElementById('successOverlay').classList.add('d-none');
}

document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
    });
});
