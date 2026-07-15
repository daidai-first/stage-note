const saveButton = document.getElementById("saveButton");

if (saveButton) {

saveButton.addEventListener("click", function () {

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const theater = document.getElementById("theater").value;
    const seat = document.getElementById("seat").value;
    const memo = document.getElementById("memo").value;

    console.log(title);
    console.log(date);
    console.log(time);
    console.log(theater);
    console.log(seat);
    console.log(memo);

const record = {
    id: Date.now(),
    title: title,
    date: date,
    time: time,
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

    displayRecords();

});
}

function displayRecords() {

    const recordList = document.getElementById("recordList");

    recordList.innerHTML = "";

    const records = JSON.parse(localStorage.getItem("records")) || [];

    records.sort(function (a, b) {

    const dateTimeA = new Date(a.date + "T" + a.time);
    const dateTimeB = new Date(b.date + "T" + b.time);

    return dateTimeB - dateTimeA;

});

for (const record of records) {

        recordList.innerHTML += `
            <div class="record">
                <h3>${record.title}</h3>
                <p>観劇日：${record.date}</p>
                <p>公演時間：${record.time}</p>
                <p>会場：${record.theater}</p>
                <p>座席：${record.seat}</p>
                <p>感想：${record.memo}</p>

                <button onclick="deleteRecord(${record.id})">削除</button>

                <hr>
            </div>
        `;
    }

}

function deleteRecord(id) {

    const records = JSON.parse(localStorage.getItem("records")) || [];

    const newRecords = records.filter(function (record) {
        return record.id !== id;
    });

    localStorage.setItem("records", JSON.stringify(newRecords));

    displayRecords();

}

if (document.getElementById("recordList")) {
    displayRecords();
}