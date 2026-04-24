/**
 * Custom JavaScript functionality for the Hospital Success Stories page
 */
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

const patientStories = {
    "John's Journey Through a Heart Crisis": {
        title: "John's Journey Through a Heart Crisis",
        text: [
            "My name is John M. To say my life flashed before my eyes would be an understatement.",
            "I was at work when I felt an intense pressure in my chest. I thought it was severe heartburn, but within minutes, I was struggling to breathe. My colleagues rushed me to the emergency room.",
            "The emergency cardiology team was waiting. They quickly diagnosed a massive myocardial infarction—a severe heart attack. A blocked artery was cutting off blood flow completely.",
            "Within 20 minutes, I was in the cath lab undergoing life-saving angioplasty. They carefully placed a stent. It was a terrifying experience, but the extreme precision and calm of the team gave me hope.",
            "Today, thanks to cardiac rehab and their ongoing support, I am back to living an active life. I even ran a 5k last month!"
        ],
        image: "heart ss.png"
    },
    "Maria's Unbelievable Recovery from Trauma": {
        title: "Maria's Unbelievable Recovery from Trauma",
        text: [
            "I'm Maria L., and two years ago, I survived a horrific multi-car collision.",
            "When the paramedics brought me in, I had lost a critical amount of blood and was in severe hypovolemic shock. My blood pressure had plummeted dangerously.",
            "The trauma team leaped into action. Within minutes, they had secured an airway, started massive blood transfusions, and rushed me into emergency surgery to stop internal bleeding.",
            "I spent three weeks in the ICU fighting infections and undergoing multiple reconstructive surgeries. The pain was unimaginably difficult, but the nurses never left my side.",
            "It took over a year of intense physical therapy, but I am finally walking again. I owe everything to that rapid response unit."
        ],
        image: "trauma ss.png"
    },
    "Michael's Fight Against Leukemia": {
        title: "Michael's Fight Against Leukemia",
        text: [
            "Being diagnosed with aggressive leukemia at 28 turned my world completely upside down.",
            "I immediately transferred my care here. The oncology team developed a rigorous treatment plan starting that very week. I endured rounds of intense chemotherapy that took me to my absolute physical limit.",
            "When chemotherapy wasn't entirely enough, they found a matching bone marrow donor. The transplant process was delicate and isolating because my immune system was wiped out.",
            "During those dark weeks, the medical staff became my family. They celebrated every tiny milestone—every blood count improvement.",
            "Today, my tests show no evidence of disease. I am in full remission and looking forward to restarting my career."
        ],
        image: "leukemia ss.png"
    },
    "Emily's Miracle Twins": {
        title: "Emily's Miracle Twins",
        text: [
            "My pregnancy was deemed high-risk from the beginning. I was carrying twins, and my blood pressure began skyrocketing in my second trimester.",
            "I developed severe preeclampsia. The maternal-fetal medicine specialists monitored me constantly. By 32 weeks, it became too dangerous to wait.",
            "They performed an emergency C-section. My beautiful babies were tiny—each weighing less than 4 pounds. They were immediately whisked away to the NICU.",
            "Leaving the hospital without my babies was the hardest day of my life. However, seeing the NICU nurses care for them around the clock provided immense comfort.",
            "After five challenging weeks, they learned to feed and breathe on their own. We finally brought them home, and they are now healthy, thriving one-year-olds!"
        ],
        image: "mother ss.png"
    },
    "Baby Leo's Brave Start": {
        title: "Baby Leo's Brave Start",
        text: [
            "We found out Leo had a complex congenital anomaly before he was even born. We were terrified of the uncertainty.",
            "The pediatric specialists coordinated with our maternity team so that the moment Leo was delivered, they were ready.",
            "Leo needed his first major surgery at just two days old. Handing over your newborn to a surgical team is terrifying, but their confidence reassured us.",
            "He spent the first two months of his life in the pediatric intensive care unit. The team helped us understand every alarm, every tube, and every recovery milestone.",
            "Now he's a bouncy, joyful toddler. Looking at him, you would never know all the hurdles he overcame so early in his life."
        ],
        image: "toddler ss.png"
    },
    "David's Rehabilitation Triumph": {
        title: "David's Rehabilitation Triumph",
        text: [
            "I was involved in a severe workplace accident involving heavy machinery. I suffered multiple complex fractures to my legs and spine.",
            "The initial trauma care saved my life, but the real journey began in the rehabilitation unit. The doctors told me there was a chance I might not walk unassisted again.",
            "My therapists refused to let me give up. Every single day involved painful, strenuous exercises just to regain basic muscle function.",
            "We celebrated every minor victory—standing for ten seconds, taking one step in the parallel bars, and eventually walking down the hallway.",
            "After nearly a year, I returned to work. My incredible medical team genuinely gave me my mobility and livelihood back."
        ],
        image: "rehab ss.png"
    },
    "Robert's Return to Independence": {
        title: "Robert's Return to Independence",
        text: [
            "Living with Parkinson's was slowly stripping away my independence. The tremors had become so profound I couldn't even hold a cup of coffee without spilling it.",
            "Medications were becoming less effective and the side effects were increasing. My neurologist suggested Deep Brain Stimulation (DBS) surgery.",
            "The thought of brain surgery was daunting. But the neurosurgery team mapped everything clearly and explained how the implanted electrodes would regulate my movements.",
            "The moment they turned the device on and calibrated it in the clinic was magical. My hands were still. The relentless tremor simply stopped.",
            "I'm now able to feed myself, write comfortably, and enjoy a quality of life I thought was lost forever."
        ],
        image: "parkinson ss.png"
    },
    "Alice's Metabolic Turnaround": {
        title: "Alice's Metabolic Turnaround",
        text: [
            "A rare metabolic disorder was slowly deteriorating my organs. My body wasn't processing nutrients correctly, and I was losing weight drastically.",
            "I was constantly fatigued and in cognitive fog. The metabolic specialists admitted me to stabilize my crashing nutrient levels through specialized intravenous therapy.",
            "They meticulously engineered a specific nutritional intake tailored exclusively for my body's metabolic pathways. It involved a very strict dietary regimen augmented by clinical supplements.",
            "Slowly, my energy returned. My organ function stabilized, and for the first time in years, my labs returned to near-normal levels.",
            "I now have the energy to live vibrantly again, thanks to their dedicated, personalized approach to my body's unique chemistry."
        ],
        image: "metabolic ss.png"
    },
    "James's Lifeline from Respiratory Distress": {
        title: "James's Lifeline from Respiratory Distress",
        text: [
            "It started with what felt like a severe flu, but within days I couldn't catch my breath. I honestly didn't think I would survive the ambulance ride.",
            "At the hospital, my lungs were failing due to severe Acute Respiratory Distress Syndrome (ARDS). A ventilator wasn't enough to deliver oxygen to my organs.",
            "The team placed me on ECMO (Extracorporeal Membrane Oxygenation). The machine literally took over the function of my lungs, giving them the crucial time they needed to rest and heal.",
            "I was completely sedated for two weeks. When I woke up, the physical toll was immense, but I was breathing.",
            "The long pulmonary rehabilitation process slowly rebuilt my lung capacity, and today, I'm eternally grateful for the machine and the team that saved my life."
        ],
        image: "respiratory ss.png"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling for 'Share Your Story'
    const shareStoryForm = document.getElementById('shareStoryForm');

    if (shareStoryForm) {
        shareStoryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Extract values
            const emailInput = document.getElementById('submitterEmail').value;
            const phoneInput = document.getElementById('submitterPhone').value;

            // Regular Expressions for Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/; // Basic phone validation (allowing digits, spaces, -, +, (, ))

            if (!emailRegex.test(emailInput)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (phoneInput.trim() !== '' && !phoneRegex.test(phoneInput)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Collect form data
            const formData = {
                submitterName: document.getElementById('submitterName').value,
                submitterEmail: emailInput,
                submitterPhone: phoneInput,
                patientName: document.getElementById('patientName').value,
                storyBegin: document.getElementById('storyBegin').value,
                experienceBetter: document.getElementById('experienceBetter').value,
                staffMention: document.getElementById('staffMention').value,
                anythingElse: document.getElementById('anythingElse').value,
                mediaSend: document.querySelector('input[name="mediaSend"]:checked')?.value || '',
                timestamp: new Date().toISOString()
            };

            // Store to LocalStorage
            let storageStories = [];
            try {
                const existing = localStorage.getItem('cambridgeHospitalStories');
                if (existing) {
                    storageStories = JSON.parse(existing);
                }
            } catch (err) {
                console.error("Could not parse existing stories", err);
            }
            storageStories.push(formData);
            localStorage.setItem('cambridgeHospitalStories', JSON.stringify(storageStories));

            // Notify User exactly as requested
            alert('Thank you! Your story has been successfully submitted...');
            
            // Hide modal & reset form
            const modalEl = document.getElementById('shareStoryModal');
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) {
                modalInstance.hide();
            }
            shareStoryForm.reset();
        });
    }

    const cards = document.querySelectorAll('.story-card');
    const modalCarouselInner = document.getElementById('modalCarouselInner');

    cards.forEach((card, index) => {
        const titleElement = card.querySelector('.card-title');
        const readBtn = card.querySelector('.btn-outline-danger');

        if (titleElement) {
            const cardCategory = titleElement.innerText.trim();
            let storyInfo = patientStories[cardCategory];
            
            // Fallback if title not found in dict
            if (!storyInfo) {
                storyInfo = {
                    title: cardCategory,
                    text: ["We are currently gathering the detailed personal narrative for this amazing recovery. Please check back soon."],
                    image: card.querySelector('.card-img-top').getAttribute('src')
                };
            }

            // Create slide for this story
            const slide = document.createElement('div');
            slide.className = 'carousel-item' + (index === 0 ? ' active' : '');
            slide.innerHTML = `
                <div class="row g-5 px-5 mx-2 pb-2">
                  <div class="col-lg-7">
                    <h2 class="text-danger mb-3" style="font-weight: 500;">${storyInfo.title}</h2>
                    <p class="fst-italic fw-bold text-dark mb-4">In the words of our patient</p>
                    <div class="modal-story-text text-secondary">
                        ${storyInfo.text.map(p => `<p>${p}</p>`).join('')}
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <img src="${storyInfo.image}" class="img-fluid w-100 rounded shadow-sm" style="object-fit: cover; max-height: 550px;" alt="Patient Journey" referrerPolicy="no-referrer">
                  </div>
                </div>
            `;
            modalCarouselInner.appendChild(slide);

            if (readBtn) {
                readBtn.setAttribute('data-bs-toggle', 'modal');
                readBtn.setAttribute('data-bs-target', '#readStoryModal');

                readBtn.addEventListener('click', () => {
                    // Navigate to the corresponding slide when clicked
                    const carouselEl = document.getElementById('storyModalCarousel');
                    const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carouselEl);
                    carouselInstance.to(index);
                });
            }
        }

        // Hover effect for the card button
        card.addEventListener('mouseenter', () => {
             if(readBtn) readBtn.classList.add('bg-danger', 'text-white');
        });
        
        card.addEventListener('mouseleave', () => {
             if(readBtn) readBtn.classList.remove('bg-danger', 'text-white');
        });
    });
});
document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
    });
});