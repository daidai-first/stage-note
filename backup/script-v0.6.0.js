const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function () {

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const theater = document.getElementById("theater").value;
    const seat = document.getElementById("seat").value;
    const memo = document.getElementById("memo").value;

    console.log(title);
    console.log(date);
    console.log(theater);
    console.log(seat);
    console.log(memo);

    const record = {
    title: title,
    date: date,
    theater: theater,
    seat: seat,
    memo: memo
};

console.log(record);

    let records = JSON.parse(localStorage.getItem("records")) || [];

records.push(record);

localStorage.setItem("records", JSON.stringify(records));

console.log(records.length);
console.log(records);

    console.log("保存しました！");

});

const savedTitle = localStorage.getItem("title");
const savedDate = localStorage.getItem("date");
const savedTheater = localStorage.getItem("theater");
const savedSeat = localStorage.getItem("seat");
const savedMemo = localStorage.getItem("memo");

console.log(savedTitle);
console.log(savedDate);
console.log(savedTheater);
console.log(savedSeat);
console.log(savedMemo);