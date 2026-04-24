document.addEventListener('DOMContentLoaded', function() {
    // Benefits Data inspired by the video
    const benefits = [
        { id: 'pto', icon: 'fa-calendar-check', title: 'Paid Time Off (PTO)', desc: 'Generous paid time off program to help you balance work and personal life.' },
        { id: 'health', icon: 'fa-file-medical', title: 'Health Insurance', desc: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
        { id: 'disability', icon: 'fa-crutch', title: 'Short Term Disability', desc: 'Income protection in the event of a qualifying illness or injury.' },
        { id: 'life', icon: 'fa-heartbeat', title: 'Life Insurance', desc: 'Employer-paid basic life insurance with options for supplemental coverage.' },
        { id: 'education', icon: 'fa-graduation-cap', title: 'Education Benefit', desc: 'Hospital offers a credit on tuition each semester for employees, spouse, and dependents after just six months of employment.' },
        { id: 'retirement', icon: 'fa-piggy-bank', title: 'Retirement Plan', desc: 'Offers a 5% matching retirement account and other non-matching account choices. Included with this benefit is a free individual session with a financial planner.' },
        { id: 'memberships', icon: 'fa-users', title: 'Memberships and Events', desc: 'Employees can join our state-of-the-art recreation center for a nominal fee. Event tickets are available at a discount.' },
        { id: 'loan', icon: 'fa-hand-holding-usd', title: 'Student Loan Forgiveness', desc: 'As an employee of a not-for-profit organization, you may be eligible for the Public Service Loan Forgiveness Program through the U.S. Department of Education.' }
    ];

    let currentBenefitIndex = 4; // Start at Education Benefit

    const iconsContainer = document.getElementById('benefit-icons');
    const titleElement = document.getElementById('benefit-title');
    const descElement = document.getElementById('benefit-desc');
    const prevBtn = document.getElementById('prev-benefit');
    const nextBtn = document.getElementById('next-benefit');

    // Render Icons
    function renderIcons() {
        iconsContainer.innerHTML = '';
        benefits.forEach((benefit, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = `benefit-icon-wrapper ${index === currentBenefitIndex ? 'active' : ''}`;
            wrapper.onclick = () => updateBenefit(index);
            wrapper.innerHTML = `
                <div class="benefit-icon"><i class="fas ${benefit.icon}"></i></div>
                <div class="benefit-label">${benefit.title}</div>
            `;
            iconsContainer.appendChild(wrapper);
        });
    }

    // Update Content
    function updateBenefit(index) {
        currentBenefitIndex = index;
        titleElement.textContent = benefits[index].title;
        descElement.textContent = benefits[index].desc;
        renderIcons(); // Re-render to update active class
    }

    // Event Listeners for arrows
    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let newIndex = currentBenefitIndex - 1;
            if (newIndex < 0) newIndex = benefits.length - 1;
            updateBenefit(newIndex);
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let newIndex = currentBenefitIndex + 1;
            if (newIndex >= benefits.length) newIndex = 0;
            updateBenefit(newIndex);
        });
    }

    // Initial Render
    if(iconsContainer) {
        updateBenefit(currentBenefitIndex);
    }

    // Intersection Observer for Job Cards Fade-In
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const jobCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    function observeJobCards() {
        document.querySelectorAll('.job-card').forEach(card => {
            jobCardObserver.observe(card);
        });
    }

    // Call initially
    observeJobCards();

    // Job Modal Logic
    const jobCards = document.querySelectorAll('.job-card');
    const jobModalElement = document.getElementById('jobModal');
    
    if (jobModalElement) {
        const jobModal = new bootstrap.Modal(jobModalElement);
        const modalTitle = document.getElementById('jobModalLabel');
        const modalCompany = document.getElementById('modalCompany');
        const modalDescription = document.getElementById('modalDescription');
        const modalTags = document.getElementById('modalTags');
        const applicationForm = document.getElementById('applicationForm');
        const applicationSuccess = document.getElementById('applicationSuccess');
        const submitApplicationBtn = document.getElementById('submitApplicationBtn');

        jobCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Extract data from card
                const title = card.querySelector('h4').innerText;
                const company = card.querySelector('small').innerText;
                const description = card.querySelector('p').innerText;
                const tags = card.querySelectorAll('.job-tag, .badge');
                
                // Populate modal
                modalTitle.innerText = title;
                modalCompany.innerText = company;
                modalDescription.innerText = description;
                
                // Clear and populate tags
                modalTags.innerHTML = '';
                tags.forEach(tag => {
                    const clone = tag.cloneNode(true);
                    // Remove margin bottom for modal display
                    clone.classList.remove('mb-4');
                    modalTags.appendChild(clone);
                });
                
                // Reset form and UI state
                applicationForm.reset();
                applicationForm.classList.remove('d-none');
                applicationSuccess.classList.add('d-none');
                submitApplicationBtn.style.display = 'block';
                
                // Show modal
                jobModal.show();
            });
        });
        
        // Handle form submission
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather form data
            const formData = new FormData(applicationForm);
            const applicationData = {
                jobTitle: modalTitle.innerText,
                company: modalCompany.innerText,
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                resumeName: formData.get('resume') ? formData.get('resume').name : '',
                coverLetter: formData.get('coverLetter'),
                submittedAt: new Date().toISOString()
            };

            // Save to Local Storage
            const existingApplications = JSON.parse(localStorage.getItem('hospitalApplications') || '[]');
            existingApplications.push(applicationData);
            localStorage.setItem('hospitalApplications', JSON.stringify(existingApplications));

            console.log('Application saved to localStorage:', applicationData);

            // Show success message, hide form and submit button
            applicationForm.classList.add('d-none');
            applicationSuccess.classList.remove('d-none');
            submitApplicationBtn.style.display = 'none';

            // Optionally auto-close after a few seconds
            setTimeout(() => {
                jobModal.hide();
            }, 3000);
        });
    }

    // Search and Filter Logic
    const searchInput = document.getElementById('searchInput');
    const departmentSelect = document.getElementById('departmentSelect');
    const searchBtn = document.getElementById('searchBtn');
    const jobCountBadge = document.getElementById('jobCountBadge');
    const sortSelect = document.getElementById('sortSelect');
    const jobListContainer = document.querySelector('.job-list');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');

    let visibleLimit = 4;

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedDepartment = departmentSelect.value;
        let matchingCount = 0;

        const allJobCards = Array.from(document.querySelectorAll('.job-card'));

        allJobCards.forEach(card => {
            const title = card.querySelector('h4').innerText.toLowerCase();
            const description = card.querySelector('p').innerText.toLowerCase();
            
            // Find the category tag text
            let category = "";
            const tags = card.querySelectorAll('.job-tag');
            tags.forEach(tag => {
                if (tag.innerText.includes('Category')) {
                    category = tag.innerText.replace('Category', '').trim();
                }
            });

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesDepartment = selectedDepartment === 'all' || category === selectedDepartment;

            if (matchesSearch && matchesDepartment) {
                if (matchingCount < visibleLimit) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                matchingCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update count badge
        if (jobCountBadge) {
            jobCountBadge.innerText = `${matchingCount} Job${matchingCount !== 1 ? 's' : ''} Found`;
        }

        // Handle Load More button visibility
        if (loadMoreContainer) {
            if (matchingCount > visibleLimit) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }

    function sortJobs() {
        const sortValue = sortSelect.value;
        if (sortValue === 'default') return; // Do nothing if default

        const allJobCards = Array.from(document.querySelectorAll('.job-card'));

        allJobCards.sort((a, b) => {
            // Extract dates
            const dateStrA = a.querySelector('.fa-clock').parentNode.innerText.replace('Posted:', '').trim();
            const dateStrB = b.querySelector('.fa-clock').parentNode.innerText.replace('Posted:', '').trim();
            
            const dateA = new Date(dateStrA);
            const dateB = new Date(dateStrB);

            if (sortValue === 'newest') {
                return dateB - dateA;
            } else if (sortValue === 'oldest') {
                return dateA - dateB;
            }
            return 0;
        });

        // Re-append to DOM in sorted order
        allJobCards.forEach(card => {
            jobListContainer.appendChild(card);
            // Reset visibility for animation
            card.classList.remove('visible');
        });

        // Re-apply filter to respect visibleLimit
        filterJobs();
        
        // Re-observe for animation
        setTimeout(observeJobCards, 50);
    }

    // Initialize filter to apply the limit on load
    filterJobs();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            visibleLimit += 4; // Load 4 more
            filterJobs();
            setTimeout(observeJobCards, 50);
        });
    }

    if (searchInput && departmentSelect && searchBtn) {
        // Live search/filter
        searchInput.addEventListener('input', () => {
            visibleLimit = 4;
            filterJobs();
        });
        departmentSelect.addEventListener('change', () => {
            visibleLimit = 4;
            filterJobs();
        });
        
        // Button click (optional, since live search is active)
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            visibleLimit = 4;
            filterJobs();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', sortJobs);
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
document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
    });
});
