const saveButton = document.getElementById("saveButton");

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

function displayRecords() {

    const recordList = document.getElementById("recordList");

    recordList.innerHTML = "";

    const records = JSON.parse(localStorage.getItem("records")) || [];

    for (const record of records) {

        recordList.innerHTML += `
            <div class="record">
                <h3>${record.title}</h3>
                <p>観劇日：${record.date}</p>
                <p>公演時間：${record.time}</p>
                <p>会場：${record.theater}</p>
                <p>座席：${record.seat}</p>
                <p>感想：${record.memo}</p>
                <hr>
            </div>
        `;
    }

}

displayRecords();