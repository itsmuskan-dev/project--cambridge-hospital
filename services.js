document.addEventListener('DOMContentLoaded', () => {
    // Services Data for Modal
    const servicesData = {
        cardiology: {
            title: 'Cardiology',
            icon: 'fa-heartbeat',
            description: 'Our Cardiology department offers state-of-the-art facilities for the diagnosis and treatment of heart conditions. We provide comprehensive care including ECG, echocardiography, stress testing, and advanced interventional cardiology procedures. Our team of experienced cardiologists is dedicated to delivering personalized care to ensure optimal heart health.',
            image: 'cardiology info.png'
        },
        neurology: {
            title: 'Neurology',
            icon: 'fa-brain',
            description: 'The Neurology department specializes in the diagnosis and management of brain, spinal cord, and nervous system disorders. Our expert neurologists treat conditions such as stroke, epilepsy, multiple sclerosis, and Parkinson\'s disease using the latest diagnostic and therapeutic techniques.',
            image: 'neurology info.png'
        },
        orthopedics: {
            title: 'Orthopedics',
            icon: 'fa-bone',
            description: 'Our Orthopedics team provides expert care for a wide range of musculoskeletal conditions. From sports injuries and fractures to complex joint replacements and spine surgeries, we offer advanced treatments to help you regain mobility and live a pain-free life.',
            image: 'orthopedics info.png'
        },
        pediatrics: {
            title: 'Pediatrics',
            icon: 'fa-baby',
            description: 'The Pediatrics department is dedicated to the health and well-being of infants, children, and adolescents. We offer comprehensive pediatric care, including routine check-ups, vaccinations, illness management, and specialized treatments in a child-friendly environment.',
            image: 'pediatrics info.png'
        },
        emergency: {
            title: 'Emergency Care',
            icon: 'fa-ambulance',
            description: 'Our 24/7 Emergency Care unit is staffed by highly trained emergency medicine specialists ready to handle any critical medical situation. We are equipped with advanced life-saving technology to provide immediate and effective care when every second counts.',
            image: 'emergency care info.png'
        },
        icu: {
            title: 'Intensive Care Unit',
            icon: 'fa-procedures',
            description: 'Our Intensive Care Unit (ICU) provides continuous, specialized care for patients with severe or life-threatening illnesses and injuries. With state-of-the-art monitoring equipment and a dedicated team of intensivists and critical care nurses, we ensure the highest level of care.',
            image: 'icu info.png'
        },
        laboratory: {
            title: 'Laboratory',
            icon: 'fa-flask',
            description: 'Our fully equipped diagnostic laboratory offers a comprehensive range of clinical testing services. From routine blood work to advanced molecular diagnostics, we provide accurate and timely results to support effective medical decision-making.',
            image: 'laboratory info.png'
        },
        checkup: {
            title: 'Health Checkup',
            icon: 'fa-clipboard-list',
            description: 'Top diagnostic services provide comprehensive radiology and laboratory testing, including ultrasound, CT/MRI scans, and blood tests.',
            image: 'health checkup info.png'
        },
        pharmacy: {
            title: 'Pharmacy',
            icon: 'fa-pills',
            description: 'Our on-site pharmacy provides convenient access to prescription medications and over-the-counter health products. Our licensed pharmacists are available to offer expert guidance, medication counseling, and ensure the safe and effective use of your prescriptions.',
            image: 'pharmacy info.png'
        },
        general: {
            title: 'General Services',
            icon: 'fa-stethoscope',
            description: 'Our General Services department provides primary healthcare, routine consultations, and comprehensive medical care for patients of all ages. We focus on preventive care, accurate diagnosis, and effective treatment plans tailored to your individual needs.',
            image: 'general services info.png'
        },
        specialties: {
            title: 'Specialties',
            icon: 'fa-star-of-life',
            description: 'We offer a wide range of medical specialties, providing access to expert physicians and surgeons. From endocrinology and gastroenterology to pulmonology and rheumatology, our specialized teams work collaboratively to manage complex health conditions.',
            image: 'specialities info.png'
        },
       diagnostic_services: {
            title: 'Diagnostic Services',
            icon: 'fa-x-ray',
            description: 'Our diagnostic services include state-of-the-art imaging such as X-rays, MRI, CT scans, and ultrasound. We provide accurate and timely results to assist our medical professionals in developing the most effective treatment plans for you.',
            image: 'diagnostic info.png'
        }
    };

    const serviceKeys = Object.keys(servicesData);
    let currentServiceIndex = 0;

    // Modal Elements
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalIcon = document.getElementById('modalIcon');
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevService');
    const nextBtn = document.getElementById('nextService');

    function updateModalContent(index) {
        const key = serviceKeys[index];
        const data = servicesData[key];
        
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalIcon.className = `fas ${data.icon} fa-2x`;
        modalImage.src = data.image;
        currentServiceIndex = index;
    }

    // Add click event to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            const index = serviceKeys.indexOf(serviceKey);
            if (index !== -1) {
                updateModalContent(index);
            }
        });
    });

    // Modal Navigation
    prevBtn.addEventListener('click', () => {
        let newIndex = currentServiceIndex - 1;
        if (newIndex < 0) newIndex = serviceKeys.length - 1;
        updateModalContent(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentServiceIndex + 1;
        if (newIndex >= serviceKeys.length) newIndex = 0;
        updateModalContent(newIndex);
    });

    // Testimonials Data
    const testimonials = [
        {
            title: "Exceptional care and staff",
            text: "The doctors and nurses were top-notch. They took the time to explain every detail of my diagnosis and treatment plan, making me feel completely at ease with the process.",
            name: "Sarah Jenkins",
            role: "Recovered",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            title: "Best Health Care",
            text: "The cardiology team at Cambridge Hospital saved my life. Their prompt response and advanced care during my heart attack were truly exceptional. I am forever grateful.",
            name: "Marie",
            role: "Patient",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            title: "Doctor cares everyone!",
            text: "I brought my daughter in for a severe asthma attack. The pediatric emergency staff was incredibly calming, professional, and quick to act. She was breathing normally within minutes.",
            name: "Ben Walker",
            role: "Recovered",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            title: "Great services!",
            text: "After my knee replacement surgery, the orthopedic and physical therapy teams provided outstanding support. My recovery was much faster than I anticipated thanks to their guidance.",
            name: "Laura Zeno",
            role: "New",
            image: "https://randomuser.me/api/portraits/women/12.jpg"
        },
        {
            title: "Best Advices",
            text: "The neurologists here are top-notch. They took the time to thoroughly explain my diagnosis and treatment options, making me feel completely at ease with the process.",
            name: "Rosey",
            role: "Almost Recovered",
            image: "https://randomuser.me/api/portraits/women/24.jpg"
        }
    ];

    const track = document.getElementById('testimonialTrack');
    
    // Render Testimonials
    testimonials.forEach((t, index) => {
        // Using Regex to ensure proper spacing after punctuation for a cleaner look
        const formattedText = t.text.replace(/([.?!])([^\s])/g, '$1 $2');

        const div = document.createElement('div');
        div.className = `testimonial-item ${index === 1 ? 'active' : ''}`;
        div.innerHTML = `
            <div class="testimonial-card">
                <div class="star-rating mb-3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4 class="fw-bold mb-3 playfair">${t.title}</h4>
                <p class="text-muted mb-4 lh-lg flex-grow-1">${formattedText}</p>
                <div class="d-flex align-items-center gap-3 mt-auto">
                    <img src="${t.image}" alt="${t.name}" class="patient-img">
                    <div>
                        <h6 class="fw-bold mb-0">${t.name}</h6>
                        <small class="text-muted">${t.role}</small>
                    </div>
                </div>
            </div>
        `;
        track.appendChild(div);
    });

    // Testimonial Carousel Logic
    let currentIndex = 1; // Start with the second item as active (center)
    const items = document.querySelectorAll('.testimonial-item');
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });

        // Calculate translation based on screen size
        let itemWidth = items[0].offsetWidth;
        let gap = 32; // 2rem gap
        
        // Center the active item
        let containerWidth = document.querySelector('.testimonial-carousel-container').offsetWidth;
        let offset = (containerWidth / 2) - (itemWidth / 2) - (currentIndex * (itemWidth + gap));
        
        track.style.transform = `translateX(${offset}px)`;
    }

    // Initial update and window resize handling
    // Small delay to ensure elements are rendered
    setTimeout(updateCarousel, 100);
    window.addEventListener('resize', updateCarousel);

    prevTestimonialBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextTestimonialBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
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
