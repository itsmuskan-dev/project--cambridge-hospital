// Optional smooth animation (no heavy JS needed)

document.querySelectorAll(".grid-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.03)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1)";
  });
});

const payBtn = document.getElementById("payBtn");
const summaryBox = document.getElementById("summaryBox");

const cardBox = document.getElementById("cardBox");
const bankBox = document.getElementById("bankBox");

const paymentRadios = document.getElementsByName("payment");

// SWITCH PAYMENT UI
paymentRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "card" && radio.checked) {
      cardBox.classList.remove("d-none");
      bankBox.classList.add("d-none");
    }
    if (radio.value === "bank" && radio.checked) {
      bankBox.classList.remove("d-none");
      cardBox.classList.add("d-none");
    }
    if (radio.value === "cash" && radio.checked) {
      cardBox.classList.add("d-none");
      bankBox.classList.add("d-none");
    }
  });
});

// PAYMENT BUTTON
payBtn.addEventListener("click", () => {

  const name = document.getElementById("name").value;
  const test = document.getElementById("test");
  const testName = test.options[test.selectedIndex].text;
  const amount = parseFloat(test.value);

  const status = document.getElementById("status").value;

  let method = document.querySelector('input[name="payment"]:checked').value;

  let paymentDetails = {};

  if (method === "card") {
    paymentDetails = {
      cardNumber: document.getElementById("cardNumber").value
    };
  }

  if (method === "bank") {
    paymentDetails = {
      bankName: document.getElementById("bankName").value,
      accountNumber: document.getElementById("accountNumber").value
    };
  }

  if (method === "cash") {
    paymentDetails = { type: "Cash Payment" };
  }

  const data = {
    name,
    testName,
    amount,
    status,
    method,
    paymentDetails,
    date: new Date().toLocaleString()
  };

  // SAVE TO LOCAL STORAGE
  let history = JSON.parse(localStorage.getItem("payments")) || [];
  history.push(data);
  localStorage.setItem("payments", JSON.stringify(history));

  showSummary();
});

// SHOW SUMMARY
function showSummary() {
  let history = JSON.parse(localStorage.getItem("payments")) || [];

  if (history.length === 0) {
    summaryBox.innerHTML = "<p>No Data</p>";
    return;
  }

  let latest = history[history.length - 1];

  summaryBox.innerHTML = `
    <p><strong>Name:</strong> ${latest.name}</p>
    <p><strong>Test:</strong> ${latest.testName}</p>
    <p><strong>Amount:</strong> $${latest.amount}</p>
    <p><strong>Status:</strong> ${latest.status}</p>
    <p><strong>Method:</strong> ${latest.method}</p>
    <p><strong>Date:</strong> ${latest.date}</p>
  `;
}

// LOAD ON START
showSummary();

document.querySelectorAll('a[href="#!"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop page from jumping to top
        console.log("Link clicked, but page won't jump.");
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
