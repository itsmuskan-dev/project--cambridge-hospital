document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = { threshold: 0.2 };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it has a counter, start it
                if (entry.target.querySelector('.counter')) {
                    const counter = entry.target.querySelector('.counter');
                    startCounter(counter);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => {
        revealObserver.observe(el);
    });

    // Enhanced Counter Function
    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const speed = 100;
        const inc = target / speed;

        const updateCount = () => {
            const current = +el.innerText.replace(/,/g, '').replace('+', '');
            if (current < target) {
                const newValue = Math.ceil(current + inc);
                el.innerText = target > 1000 ? newValue.toLocaleString() + "+" : newValue;
                setTimeout(updateCount, 15);
            } else {
                el.innerText = target > 1000 ? target.toLocaleString() + "+" : target;
            }
        };
        updateCount();
    };
});