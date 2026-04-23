/* English: Handling Local Storage for Cambridge Hospital Project */

// homepage loader logic

window.addEventListener("load", () => {
    const loader = document.getElementById("medical-loader");
    
    // Website ko load hone ke liye 2 seconds ka waqt dete hain taake animation dikhayi de
    setTimeout(() => {
        loader.classList.add("loader-finish");
    }, 2000);
});



function saveToLocal(service) {
    const data = {
        item: service,
        hospital: "Cambridge Hospital",
        time: new Date().toLocaleString()
    };
    
    // Save to Local Storage
    localStorage.setItem('cambridge_user_action', JSON.stringify(data));
    
    // Interaction feedback
    console.log("Muskan, data saved for: " + service);
    alert("Interaction Saved! You chose: " + service);
}

// Cards lift effect logic
document.querySelectorAll('.med-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = "#b33939";
    });
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = "#f0f0f0";
    });
});

                // section 2 
  /* English: Handling Architect Section Actions & Local Storage */

function handleArchitectAction(actionType) {
    const actionLog = {
        type: actionType,
        hospital: "Cambridge Hospital",
        timestamp: new Date().toLocaleString()
    };

    // SAVE TO LOCAL STORAGE
    localStorage.setItem('architect_last_click', JSON.stringify(actionLog));

    // Interaction Feedback
    console.log("Muskan, user clicked: " + actionType);
    
    if(actionType === 'Appointment') {
        alert("Redirecting to Appointment Booking Page...");
    } else {
        alert("Opening " + actionType + " Portal...");
    }
}

// Subtle entry animation for the cut cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cut-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 150 * index);
    });
});

    //   section 3 
    /* Storage Logic for Muskan */

document.getElementById('consultForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const consultData = {
        name: document.getElementById('cName').value,
        email: document.getElementById('cEmail').value,
        date: document.getElementById('cDate').value,
        timestamp: new Date().toLocaleString()
    };

    // Save to Local Storage
    localStorage.setItem('consult_request', JSON.stringify(consultData));

    alert("Muskan, data saved successfully to Local Storage!");
    
    // Close Modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('consultModal'));
    modal.hide();
    this.reset();
});

/* English: Logic to trigger animation and counter from 0 to target value */

const animateStats = () => {
    const bars = document.querySelectorAll('.progress-bar-fill');
    const counters = document.querySelectorAll('.stat-percent');

    // 1. Animate Bars
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });

    // 2. Animate Percentage Numbers
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const updateCount = () => {
            const increment = target / 100;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count) + "%";
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "%";
            }
        };
        updateCount();
    });
};

// Intersection Observer (Animation tab start hogi jab ye section screen par aayega)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.hosp-stats-section'));
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

document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
    });
});
