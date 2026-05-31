// File: restaurant_bill.js
const order = [
    { name: "Phở bò", qty: 2, price: 65000 },
    { name: "Trà đá", qty: 3, price: 5000 },
    { name: "Bún chả", qty: 1, price: 55000 }
];

function calculateBill(items, isWednesday) {
    let subtotal = 0;
    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG           ║");
    console.log("╠══════════════════════════════════════╣");
    
    items.forEach((item, i) => {
        let total = item.qty * item.price;
        subtotal += total;
        console.log(`║ ${i + 1}. ${item.name.padEnd(8)} x${item.qty} @${item.price/1000}k  = ${total/1000}k  ║`);
    });

    let discount = 0;
    if (subtotal > 1000000) discount = subtotal * 0.15;
    else if (subtotal > 500000) discount = subtotal * 0.10;
    if (isWednesday) discount += subtotal * 0.05;

    let vat = subtotal * 0.08;
    let tip = subtotal * 0.05;
    let finalTotal = subtotal - discount + vat + tip;

    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:              ${subtotal.toLocaleString()}đ    ║`);
    console.log(`║ Giảm giá:               ${discount.toLocaleString()}đ    ║`);
    console.log(`║ VAT (8%):               ${vat.toLocaleString()}đ    ║`);
    console.log(`║ Tip (5%):               ${tip.toLocaleString()}đ    ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:             ${finalTotal.toLocaleString()}đ   ║`);
    console.log("╚══════════════════════════════════════╝");
}

calculateBill(order, false);