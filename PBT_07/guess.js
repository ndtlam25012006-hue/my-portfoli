// File: guess.js
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessedNumbers = [];

function playGuess() {
    while (attempts < 7) {
        let input = prompt("Nhập số bạn đoán (1-100):");
        let guess = parseInt(input);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng nhập số hợp lệ từ 1-100");
            continue;
        }

        if (guessedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        attempts++;
        guessedNumbers.push(guess);

        if (guess === randomNumber) {
            alert(`Chúc mừng! Bạn đã đoán đúng sau ${attempts} lần.`);
            return;
        } else if (guess < randomNumber) {
            alert("Cao hơn");
        } else {
            alert("Thấp hơn");
        }
    }
    alert(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
}

playGuess();