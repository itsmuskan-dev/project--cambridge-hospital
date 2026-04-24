document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const alertSuccess = document.getElementById('alertSuccess');
    const likertContainer = document.getElementById('likertContainer');
    const likertError = document.getElementById('likertError');
    const satisfactionRadios = document.querySelectorAll('input[name="overallSatisfaction"]');

    // Load draft from local storage
    const loadDraft = () => {
        const draft = JSON.parse(localStorage.getItem('hospital_feedback_draft'));
        if (draft) {
            document.getElementById('fullName').value = draft.fullName || '';
            document.getElementById('email').value = draft.email || '';
            document.getElementById('phone').value = draft.phone || '';
            document.getElementById('department').value = draft.department || '';
            document.getElementById('message').value = draft.message || '';
            document.getElementById('agreed').checked = draft.agreed || false;
            
            if (draft.overallSatisfaction) {
                const radio = document.querySelector(`input[name="overallSatisfaction"][value="${draft.overallSatisfaction}"]`);
                if (radio) radio.checked = true;
            }
        }
    };

    // Save draft to local storage
    const saveDraft = () => {
        const selectedSatisfaction = document.querySelector('input[name="overallSatisfaction"]:checked');
        const draft = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            department: document.getElementById('department').value,
            overallSatisfaction: selectedSatisfaction ? selectedSatisfaction.value : '',
            message: document.getElementById('message').value,
            agreed: document.getElementById('agreed').checked
        };
        localStorage.setItem('hospital_feedback_draft', JSON.stringify(draft));
    };

    // Add input listeners for saving draft and real-time validation
    if (form) {
        // Validation patterns
        const patterns = {
            fullName: /^[A-Za-z\s]{2,50}$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^\+?[\d\s\-\(\)]{7,15}$/
        };

        const validateField = (element) => {
            if (element.id === 'fullName' || element.id === 'email' || element.id === 'phone') {
                const pattern = patterns[element.id];
                const value = element.value.trim();
                
                // For phone which is optional, empty is valid
                if (element.id === 'phone' && value === '') {
                    element.setCustomValidity('');
                } else if (pattern && !pattern.test(value)) {
                    element.setCustomValidity('Invalid');
                } else {
                    element.setCustomValidity('');
                }
            }
        };

        form.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('input', (e) => {
                validateField(e.target);
                saveDraft();
            });
            element.addEventListener('change', (e) => {
                validateField(e.target);
                saveDraft();
            });
        });
    }

    // Remove error styling when a radio is selected
    satisfactionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (likertContainer) likertContainer.classList.remove('is-invalid-likert');
            if (likertError) likertError.classList.add('d-none');
            saveDraft();
        });
    });

    // Form validation and submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            let isValid = true;

            // Regex Patterns for validation
            const fullNameRegex = /^[A-Za-z\s]{2,50}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?[\d\s\-\(\)]{7,15}$/;

            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');

            // Regex validation: Full Name
            if (fullNameInput && !fullNameRegex.test(fullNameInput.value.trim())) {
                fullNameInput.setCustomValidity('Invalid');
                isValid = false;
            } else if (fullNameInput) {
                fullNameInput.setCustomValidity('');
            }

            // Regex validation: Email
            if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                emailInput.setCustomValidity('Invalid');
                isValid = false;
            } else if (emailInput) {
                emailInput.setCustomValidity('');
            }

            // Regex validation: Phone Number
            if (phoneInput && phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value.trim())) {
                phoneInput.setCustomValidity('Invalid');
                isValid = false;
            } else if (phoneInput) {
                phoneInput.setCustomValidity('');
            }
            
            // Bootstrap native validation
            if (!form.checkValidity()) {
                isValid = false;
            }
            
            // Custom Likert validation
            const selectedSatisfaction = document.querySelector('input[name="overallSatisfaction"]:checked');
            if (!selectedSatisfaction) {
                if (likertContainer) likertContainer.classList.add('is-invalid-likert');
                if (likertError) {
                    likertError.classList.remove('d-none');
                    likertError.classList.add('d-block');
                }
                isValid = false;
            } else {
                if (likertContainer) likertContainer.classList.remove('is-invalid-likert');
                if (likertError) {
                    likertError.classList.add('d-none');
                    likertError.classList.remove('d-block');
                }
            }

            form.classList.add('was-validated');

            if (isValid) {
                // Save submission
                const submissions = JSON.parse(localStorage.getItem('hospital_feedback_submissions') || '[]');
                const submissionData = {
                    fullName: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    department: document.getElementById('department').value,
                    overallSatisfaction: selectedSatisfaction.value,
                    message: document.getElementById('message').value,
                    timestamp: new Date().toISOString()
                };
                submissions.push(submissionData);
                localStorage.setItem('hospital_feedback_submissions', JSON.stringify(submissions));
                
                // Clear draft
                localStorage.removeItem('hospital_feedback_draft');
                
                // Show success modal if it exists
                const modalEl = document.getElementById('successModal');
                if (modalEl && window.bootstrap) {
                    const successModal = new bootstrap.Modal(modalEl);
                    successModal.show();
                } else if (alertSuccess) {
                    // Fallback to alert
                    alertSuccess.classList.remove('d-none');
                    setTimeout(() => {
                        alertSuccess.classList.add('d-none');
                    }, 5000);
                }
                
                // Reset form
                form.reset();
                form.classList.remove('was-validated');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Initialize
    loadDraft();

    // Toggle Notification Panel
    const notifToggle = document.getElementById('notifToggle');
    const notifPanel = document.getElementById('notifPanel');
    const viewAllBtn = document.getElementById('viewAll');
    const notifList = document.getElementById('notifList');
    const markRead = document.getElementById('markRead');

    if (notifToggle && notifPanel) {
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
    }

    if (markRead && notifList) {
        // Mark all as read / Clear
        markRead.addEventListener('click', () => {
            notifList.innerHTML = '<div class="p-4 text-center text-muted smaller">No new notifications</div>';
            const badge = document.querySelector('.notif-badge');
            if (badge) badge.style.display = 'none';
        });
    }

    if (viewAllBtn && notifList) {
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
    }
});
