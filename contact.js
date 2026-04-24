document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload

            // Get form values
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value, 
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
             // Regular Expressions
            const nameRegEx = /^[A-Za-z\s]+$/;
            const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const phoneRegEx = /^\+?[\d\s\-()]{10,15}$/;

            let isValid = true;

            // Validate First Name
            if (!nameRegEx.test(firstName)) {
                document.getElementById('firstName').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('firstName').classList.add('is-valid');
            }

            // Validate Last Name
            if (!nameRegEx.test(lastName)) {
                document.getElementById('lastName').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('lastName').classList.add('is-valid');
            }

            // Validate Email
            if (!emailRegEx.test(email)) {
                document.getElementById('email').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('email').classList.add('is-valid');
            }

            // Validate Phone
            if (!phoneRegEx.test(phone)) {
                document.getElementById('phone').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('phone').classList.add('is-valid');
            }

            // Validate Message (basic non-empty check)
            if (message.length === 0) {
                document.getElementById('message').classList.add('is-invalid');
                isValid = false;
            } else {
                document.getElementById('message').classList.add('is-valid');
            }

            if (!isValid) {
                return; // Stop here if validation fails
            }

            const formData = {
                firstName: firstName,
                lastName: lastName,
                email: email, 
                phone: phone,
                message: message
            };


            // Save to local storage
            localStorage.setItem('contactFormData', JSON.stringify(formData));
            // Reset form
            contactForm.reset();
            
            // Show confirmation message
            const confirmationMessage = document.getElementById('confirmationMessage');
            if (confirmationMessage) {
                confirmationMessage.classList.remove('d-none');
                
                // Hide after 5 seconds
                setTimeout(() => {
                    confirmationMessage.classList.add('d-none');
                }, 5000);
            }
        });
    }
});
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
