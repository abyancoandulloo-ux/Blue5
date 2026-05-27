// script.js - Blue5 Football Academy dynamic features

document.addEventListener('DOMContentLoaded', function () {
    // ---------- Mobile Menu Toggle ----------
    window.toggleMobileMenu = function () {
        const menu = document.querySelector('.main-nav ul');
        if (menu) menu.classList.toggle('show-mobile');
    };

    // Close mobile menu when any nav link clicked
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.main-nav ul');
            if (menu && menu.classList.contains('show-mobile')) {
                menu.classList.remove('show-mobile');
            }
        });
    });

    // ---------- LOGIN / REGISTER PAGE (Blue Theme Toggle) ----------
    const loginFormDiv = document.getElementById('LoginForm');
    const regFormDiv = document.getElementById('RegForm');
    const indicator = document.getElementById('Indicator');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (loginFormDiv && regFormDiv && indicator) {
        window.login = function () {
            regFormDiv.style.transform = 'translateX(300px)';
            loginFormDiv.style.transform = 'translateX(300px)';
            indicator.style.transform = 'translateX(0px)';
            if (loginTab && registerTab) {
                loginTab.classList.add('active-toggle');
                registerTab.classList.remove('active-toggle');
            }
        };
        window.register = function () {
            regFormDiv.style.transform = 'translateX(0px)';
            loginFormDiv.style.transform = 'translateX(0px)';
            indicator.style.transform = 'translateX(100px)';
            if (loginTab && registerTab) {
                registerTab.classList.add('active-toggle');
                loginTab.classList.remove('active-toggle');
            }
        };
        // initial positions (same as CSS)
        regFormDiv.style.transform = 'translateX(0px)';
        loginFormDiv.style.transform = 'translateX(300px)';
        indicator.style.transform = 'translateX(0px)';
        
        // Handle demo login/register submit
        const loginSubmit = document.getElementById('loginSubmit');
        const regSubmit = document.getElementById('regSubmit');
        if (loginSubmit) {
            loginSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                const username = document.querySelector('#LoginForm input[type="text"]')?.value;
                if (username) alert(`Welcome back ${username}! (Demo login successful)`);
                else alert('Demo login: enjoy your session!');
            });
        }
        if (regSubmit) {
            regSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Registration successful! You can now log in. (Demo)');
                // optionally switch to login tab
                window.login();
            });
        }
    }

    // ---------- PAYMENT LOGIC: Manage 12 months, paid status localStorage ----------
    const monthTableBody = document.getElementById('monthTableBody');
    if (monthTableBody) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let paidMonths = JSON.parse(localStorage.getItem('blue5_paidMonths')) || [];

        function savePaidMonths() {
            localStorage.setItem('blue5_paidMonths', JSON.stringify(paidMonths));
        }

        function renderPaymentTable() {
            monthTableBody.innerHTML = '';
            months.forEach((month, idx) => {
                const isPaid = paidMonths.includes(month);
                const row = document.createElement('tr');
                row.setAttribute('data-month', month);
                row.className = isPaid ? 'paid-row' : 'unpaid-row';
                row.style.transition = 'background 0.25s';
                const monthCell = document.createElement('td');
                monthCell.textContent = month;
                const statusCell = document.createElement('td');
                statusCell.textContent = isPaid ? '✅ Paid' : '⚠️ Pending';
                const actionCell = document.createElement('td');
                if (!isPaid) {
                    const payNowBtn = document.createElement('button');
                    payNowBtn.textContent = 'Pay Now';
                    payNowBtn.className = 'btn-primary';
                    payNowBtn.style.padding = '6px 18px';
                    payNowBtn.style.fontSize = '0.8rem';
                    payNowBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openPaymentForMonth(month);
                    });
                    actionCell.appendChild(payNowBtn);
                } else {
                    actionCell.textContent = '✔️ Completed';
                    actionCell.style.color = '#0f7b3a';
                }
                row.appendChild(monthCell);
                row.appendChild(statusCell);
                row.appendChild(actionCell);
                monthTableBody.appendChild(row);
            });
        }

        // Function to simulate payment (any method)
        window.processPaymentForMonth = function (month, methodName) {
            if (paidMonths.includes(month)) {
                alert(`⚠️ ${month} is already paid.`);
                return false;
            }
            paidMonths.push(month);
            savePaidMonths();
            renderPaymentTable();
            alert(`✅ Payment successful via ${methodName} for ${month}! Thank you.`);
            return true;
        };

        function openPaymentForMonth(month) {
            // preset the dropdown
            const monthSelect = document.getElementById('paymentMonthSelect');
            if (monthSelect) monthSelect.value = month;
            // scroll to payment interface
            document.getElementById('paymentInterfaceSection')?.scrollIntoView({ behavior: 'smooth' });
        }

        // attach event listeners for payment methods
        const monthSelect = document.getElementById('paymentMonthSelect');
        if (monthSelect) {
            months.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.textContent = m;
                monthSelect.appendChild(opt);
            });
            monthSelect.value = "January";
        }

        const paypalBtn = document.getElementById('paypalBtn');
        const appleBtn = document.getElementById('applePayBtn');
        const cardBtn = document.getElementById('creditCardBtn');

        function getSelectedMonth() {
            const select = document.getElementById('paymentMonthSelect');
            return select ? select.value : 'January';
        }

        if (paypalBtn) {
            paypalBtn.addEventListener('click', () => processPaymentForMonth(getSelectedMonth(), 'PayPal'));
        }
        if (appleBtn) {
            appleBtn.addEventListener('click', () => processPaymentForMonth(getSelectedMonth(), 'Apple Pay'));
        }
        if (cardBtn) {
            cardBtn.addEventListener('click', () => processPaymentForMonth(getSelectedMonth(), 'Credit/Debit Card'));
        }

        // Add reset demo button if needed
        const resetBtn = document.getElementById('resetPaymentsBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset all payment records? This action is demo only.')) {
                    paidMonths = [];
                    savePaidMonths();
                    renderPaymentTable();
                    alert('Payment history reset.');
                }
            });
        }

        // initial render
        renderPaymentTable();
    }

    // ---------- Sessions Page hover effects & details (already static) but we can just animate
    // Already animated via CSS

    // ---------- Coach page optional additional interaction (just hover effects)
    
    // Add active class to current nav based on page
    const currentPage = window.location.pathname.split('/').pop() || 'Home.html';
    const navItems = document.querySelectorAll('.main-nav ul li a');
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'Home.html')) {
            link.classList.add('active-nav');
        } else if (currentPage.includes('login') && href === 'login.html') {
            link.classList.add('active-nav');
        } else if (currentPage.includes('Payment') && href === 'Payment.html') {
            link.classList.add('active-nav');
        } else if (currentPage.includes('sessions') && href === 'sessions.html') {
            link.classList.add('active-nav');
        } else if (currentPage.includes('Coach') && href === 'Coach.html') {
            link.classList.add('active-nav');
        }
    });

    // Add subtle floating effect to stat cards if they exist
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.2s';
        });
    });
});
// ========== PAYMENT PAGE MODAL AND TABLE (FIXED) ==========
(function initPaymentModule() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const amount = 49;
    let paidMonths = JSON.parse(localStorage.getItem('blue5_paidMonths')) || [];

    function savePaid() {
        localStorage.setItem('blue5_paidMonths', JSON.stringify(paidMonths));
    }

    function renderTable() {
        const tbody = document.getElementById('monthTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        months.forEach(month => {
            const isPaid = paidMonths.includes(month);
            const row = document.createElement('tr');
            row.className = isPaid ? 'paid-row' : 'unpaid-row';
            row.innerHTML = `
                <td>${month}</td>
                <td>${isPaid ? '<span class="status-badge status-paid"><i class="fas fa-check-circle"></i> Paid</span>' : '<span class="status-badge status-unpaid"><i class="fas fa-hourglass-half"></i> Pending</span>'}</td>
                <td>$${amount}</td>
                <td>${isPaid ? '<i class="fas fa-check" style="color:#10b981;"></i> Completed' : `<button class="pay-btn-small" data-month="${month}">Pay Now</button>`}</td>
            `;
            tbody.appendChild(row);
        });
        // Attach event listeners to all "Pay Now" buttons
        document.querySelectorAll('.pay-btn-small').forEach(btn => {
            btn.removeEventListener('click', paymentClickHandler);
            btn.addEventListener('click', paymentClickHandler);
        });
    }

    function paymentClickHandler(e) {
        const month = e.currentTarget.getAttribute('data-month');
        if (month) openModal(month);
    }

    // Modal elements
    const modal = document.getElementById('paymentModal');
    const modalMonthName = document.getElementById('modalMonthName');
    const closeSpan = document.querySelector('.close-modal');
    const confirmBtn = document.getElementById('confirmPaymentBtn');

    let selectedMonth = null;

    function openModal(month) {
        selectedMonth = month;
        if (modalMonthName) modalMonthName.innerText = `Month: ${month} - $${amount}`;
        // Reset form fields
        const form = document.getElementById('paymentForm');
        if (form) form.reset();
        // Reset payment method selection
        document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active-method'));
        const defaultMethod = document.querySelector('.payment-option[data-method="visa"]');
        if (defaultMethod) defaultMethod.classList.add('active-method');
        const hiddenMethod = document.getElementById('selectedMethod');
        if (hiddenMethod) hiddenMethod.value = 'visa';
        // Show modal
        if (modal) modal.style.display = 'flex';
    }

    function closeModal() {
        if (modal) modal.style.display = 'none';
        selectedMonth = null;
    }

    // Payment method selection
    const methodOptions = document.querySelectorAll('.payment-option');
    const methodInput = document.getElementById('selectedMethod');
    methodOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            methodOptions.forEach(o => o.classList.remove('active-method'));
            opt.classList.add('active-method');
            if (methodInput) methodInput.value = opt.getAttribute('data-method');
        });
    });

    // Confirm payment
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (!selectedMonth) return;
            const cardName = document.getElementById('cardName')?.value.trim();
            const cardNumber = document.getElementById('cardNumber')?.value.replace(/\s/g, '');
            const expiry = document.getElementById('expiry')?.value.trim();
            const cvv = document.getElementById('cvv')?.value.trim();

            if (!cardName || !cardNumber || !expiry || !cvv) {
                alert('Please fill in all payment fields.');
                return;
            }
            if (!/^\d{13,19}$/.test(cardNumber)) {
                alert('Invalid card number (13-19 digits).');
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                alert('Expiry must be MM/YY (e.g., 12/28).');
                return;
            }
            if (!/^\d{3,4}$/.test(cvv)) {
                alert('CVV must be 3 or 4 digits.');
                return;
            }
            if (paidMonths.includes(selectedMonth)) {
                alert('This month is already paid!');
                closeModal();
                return;
            }
            paidMonths.push(selectedMonth);
            savePaid();
            renderTable();
            alert(`✅ Payment successful for ${selectedMonth} via ${methodInput?.value.toUpperCase() || 'Card'}. Thank you!`);
            closeModal();
        });
    }

    // Close modal when clicking X or outside
    if (closeSpan) closeSpan.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    renderTable();
})();
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Login function
window.loginUser = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "Home.html";
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};

// Register function
window.registerUser = async (email, password, fullName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Optionally store fullName in Firestore
        alert("Registration successful! Please log in.");
        window.location.href = "login.html";
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
};