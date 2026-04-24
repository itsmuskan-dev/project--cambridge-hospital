/* English: Muskan, this handles form saving and button actions */

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const booking = {
        name: document.getElementById('pName').value,
        date: document.getElementById('pDate').value,
        hospital: "Cambridge Hospital"
    };

    // SAVE TO LOCAL STORAGE
    localStorage.setItem('hero_booking', JSON.stringify(booking));

    alert("Appointment Booked! Muskan, your data is saved in Local Storage.");

    // Close Modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('aptModal'));
    modal.hide();
});


// section 1 
/* English: Function to toggle extra text when "Learn More" is clicked */

function toggleText(btn) {
    const extraText = btn.previousElementSibling;
    if (extraText.classList.contains('d-none')) {
        extraText.classList.remove('d-none');
        btn.innerText = "Show Less";
    } else {
        extraText.classList.add('d-none');
        btn.innerText = "Learn More";
    }
}

// Logic to animate stats on scroll
const stats = document.querySelectorAll('h4.fw-bold');
// section 3
/* English: Function to reveal the hidden service rows */

function showAllServices() {
    const extraRows = document.querySelectorAll('.extra-row');
    const btn = document.querySelector('.btn-view-all-services');

    extraRows.forEach(row => {
        row.classList.remove('d-none');
    });

   
    btn.style.display = 'none';
}
//  section 4 
/* English: Muskan, this code handles the logic without any tech-heavy alerts */

document.getElementById('premiumAptForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Data collection
    const bookingID = "CH-" + Math.floor(Math.random() * 90000 + 10000);
    const pName = document.getElementById('fullName').value;

    const appointment = {
        id: bookingID,
        name: pName,
        phone: document.getElementById('phoneNum').value,
        dept: document.getElementById('deptSelect').value,
        doctor: document.getElementById('docSelect').value,
        date: document.getElementById('aptDate').value,
        time: document.getElementById('aptTime').value,
        notes: document.getElementById('userMsg').value
    };

    // Save Data quietly
    let allData = JSON.parse(localStorage.getItem('hospital_records')) || [];
    allData.push(appointment);
    localStorage.setItem('hospital_records', JSON.stringify(allData));

    // UI Updates: Show data in the Popup
    document.getElementById('displayID').innerText = bookingID;
    document.getElementById('displayName').innerText = pName;

    // Trigger Success Popup (Modal)
    const myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();

    // Reset Form
    this.reset();
});


// Notification Toggle
const notifToggle = document.getElementById('notifToggle');
const notifPanel = document.getElementById('notifPanel');
const markRead = document.getElementById('markRead');
const notifList = document.getElementById('notifList');

notifToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('d-none');
});

document.addEventListener('click', (e) => {
    if (!notifPanel.contains(e.target)) {
        notifPanel.classList.add('d-none');
    }
});

markRead.addEventListener('click', () => {
    notifList.innerHTML = '<div class="p-4 text-center text-muted small">No new notifications</div>';
    document.querySelector('.notif-badge').style.display = 'none';
});
