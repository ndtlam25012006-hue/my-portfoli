const form = document.getElementById('regForm');
const submitBtn = document.getElementById('submitBtn');

const fields = {
    name: { el: document.getElementById('username'), valid: false },
    email: { el: document.getElementById('email'), valid: false },
    pass: { el: document.getElementById('password'), valid: false },
    confirm: { el: document.getElementById('confirmPassword'), valid: false },
    phone: { el: document.getElementById('phone'), valid: false }
};

function checkFormValidity() {
    const allValid = Object.values(fields).every(f => f.valid);
    submitBtn.disabled = !allValid;
}

// 1. Real-time Validate Tên
fields.name.el.addEventListener('input', (e) => {
    const len = e.target.value.trim().length;
    const isValid = len >= 2 && len <= 50;
    document.getElementById('nameCheck').textContent = isValid ? '✅' : '❌';
    fields.name.valid = isValid;
    checkFormValidity();
});

// 2. Real-time Validate Email bằng Regex
fields.email.el.addEventListener('input', (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(e.target.value);
    document.getElementById('emailError').textContent = isValid ? '' : 'Định dạng email không hợp lệ';
    fields.email.valid = isValid;
    checkFormValidity();
});

// 3. Password Strength Meter
fields.pass.el.addEventListener('input', (e) => {
    const val = e.target.value;
    const meter = document.getElementById('strengthMeter');
    const txt = document.getElementById('strengthText');
    
    let score = 0;
    if(val.length >= 8) {
        if(/[0-9]/.test(val) && /[a-zA-Z]/.test(val)) score = 1; // Trung bình
        if(/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) score = 2; // Mạnh
    }

    if(val.length === 0) {
        meter.style.width = '0%'; txt.textContent = ''; fields.pass.valid = false;
    } else if(score === 0) {
        meter.style.width = '33%'; meter.style.backgroundColor = '#e74c3c'; txt.textContent = 'Yếu (Đỏ)'; fields.pass.valid = false;
    } else if(score === 1) {
        meter.style.width = '66%'; meter.style.backgroundColor = '#f1c40f'; txt.textContent = 'Trung bình (Vàng)'; fields.pass.valid = true;
    } else {
        meter.style.width = '100%'; meter.style.backgroundColor = '#2ecc71'; txt.textContent = 'Mạnh (Xanh)'; fields.pass.valid = true;
    }
    checkFormValidity();
});

// 4. Confirm Password Khớp Mật Khẩu
fields.confirm.el.addEventListener('input', (e) => {
    const match = e.target.value === fields.pass.el.value;
    document.getElementById('matchError').textContent = match ? '' : 'Mật khẩu xác nhận không trùng khớp';
    fields.confirm.valid = match && e.target.value.length > 0;
    checkFormValidity();
});

// 5. Phone tự động format dạng 0901-234-567
fields.phone.el.addEventListener('input', (e) => {
    let num = e.target.value.replace(/\D/g, '');
    if(num.length > 10) num = num.substring(0, 10);
    
    let formatted = num;
    if(num.length > 4 && num.length <= 7) {
        formatted = `${num.slice(0,4)}-${num.slice(4)}`;
    } else if(num.length > 7) {
        formatted = `${num.slice(0,4)}-${num.slice(4,7)}-${num.slice(7)}`;
    }
    e.target.value = formatted;
    fields.phone.valid = num.length === 10;
    checkFormValidity();
});

// Submit Form mở Modal thông báo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.getElementById('successModal');
    modal.innerHTML = `
        <div class="success-box">
            <h3 style="color:#2ecc71; margin-bottom:15px;">🎉 Đăng Ký Thành Công!</h3>
            <p style="margin-bottom:8px; text-align:left;"><strong>Tên tài khoản:</strong> ${fields.name.el.value}</p>
            <p style="margin-bottom:8px; text-align:left;"><strong>Hòm thư Email:</strong> ${fields.email.el.value}</p>
            <p style="margin-bottom:15px; text-align:left;"><strong>Số điện thoại:</strong> ${fields.phone.el.value}</p>
            <button onclick="location.reload()" style="padding:6px 15px; cursor:pointer;">Đóng lại</button>
        </div>
    `;
    modal.classList.remove('hidden');
});