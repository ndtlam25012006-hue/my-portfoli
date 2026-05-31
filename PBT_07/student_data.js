const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" }
];

console.log("| STT | Tên    | TB   | Xếp loại    |");
students.forEach((s, index) => {
    let tb = (s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(1);
    let rank = tb >= 8.0 ? "Giỏi" : (tb >= 6.5 ? "Khá" : (tb >= 5.0 ? "Trung bình" : "Yếu"));
    console.log(`| ${index + 1}   | ${s.name.padEnd(6)} | ${tb}  | ${rank.padEnd(11)} |`);
});