document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Navigation Logic
    const listItems = document.querySelectorAll('.custom-list-group .list-group-item');
    listItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            listItems.forEach(li => {
                li.classList.remove('active', 'bg-white');
                li.classList.add('bg-light', 'text-secondary');
                const p = li.querySelector('span');
                if(p) p.classList.replace('text-danger', 'text-secondary');
            });
            item.classList.add('active');
            item.classList.remove('text-secondary', 'bg-light');
            const c = item.querySelector('span');
            if(c) c.classList.replace('text-secondary', 'text-danger');
        });
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

    // 2. Application Form Modal Logic
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Bootstrap HTML5 custom validation trigger
            if (!applyForm.checkValidity()) {
                event.stopPropagation();
                applyForm.classList.add('was-validated');
                return;
            }

            // Extract values
            const formData = new FormData(applyForm);
            const applicationData = {
                id: Date.now().toString(),
                name: formData.get('appName'),
                email: formData.get('appEmail'),
                phone: formData.get('appPhone'),
                focus: formData.get('appFocus'),
                message: formData.get('appMessage'),
                submittedAt: new Date().toISOString()
            };

            // Retrieve existing submissions or initialize empty array
            let existingApplications = [];
            try {
                const stored = localStorage.getItem('hospitalApplications');
                if (stored) {
                    existingApplications = JSON.parse(stored);
                }
            } catch (e) {
                console.error("Local storage error:", e);
            }

            // Add new application and save back to localStorage
            existingApplications.push(applicationData);
            localStorage.setItem('hospitalApplications', JSON.stringify(existingApplications));
            
            // Show Success Message and hide the form elements
            document.getElementById('applySuccessMessage').classList.remove('d-none');
            
            // Smoothly remove form elements & reset validation
            applyForm.style.display = 'none';
            applyForm.classList.remove('was-validated');
            
            // Optional: You could log this to reassure the data is saved
            console.log("Locally Saved Application Data Target:", applicationData);
        });
    }
    
    // Clear the form / Reset modal on close so it can be used again
    const applyModalEl = document.getElementById('applyModal');
    if (applyModalEl) {
        applyModalEl.addEventListener('hidden.bs.modal', function() {
            if (applyForm) {
                applyForm.reset();
                applyForm.classList.remove('was-validated');
                applyForm.style.display = 'block';
                const successMsg = document.getElementById('applySuccessMessage');
                if(successMsg) successMsg.classList.add('d-none');
            }
        });
    }
});

document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
    });
});
