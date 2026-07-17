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

const todayDate = document.getElementById("todayDate");

if (todayDate) {

    const today = new Date();

    const week = ["日", "月", "火", "水", "木", "金", "土"];

    todayDate.textContent =
        `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日（${week[today.getDay()]}）`;

}

const recordCount = document.getElementById("recordCount");

if (recordCount) {

    const records =
        JSON.parse(localStorage.getItem("records")) || [];

    const thisYear = new Date().getFullYear();

    const count = records.filter(function (record) {

        return new Date(record.date).getFullYear() === thisYear;

    }).length;

    recordCount.textContent = count + "回";

}

const ticketCount = document.getElementById("ticketCount");

if (ticketCount) {

    const tickets =
        JSON.parse(localStorage.getItem("tickets")) || [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const winningTickets = tickets.filter(function (ticket) {

        return (
            ticket.result === "当選" &&
            new Date(ticket.date) >= today
        );

    });

    ticketCount.textContent = winningTickets.length + "枚";

    winningTickets.sort(function (a, b) {

        const dateA = new Date(a.date + "T" + (a.time || "00:00"));
        const dateB = new Date(b.date + "T" + (b.time || "00:00"));

        return dateA - dateB;

    });

    const nextTicketTitle = document.getElementById("nextTicketTitle");
    const nextTicketDate = document.getElementById("nextTicketDate");
    const nextTicketTheater = document.getElementById("nextTicketTheater");

    if (winningTickets.length > 0) {

        const next = winningTickets[0];

        nextTicketTitle.textContent = "🎭 " + next.title;
        nextTicketDate.textContent = "📅 " + next.date + " " + next.time;
        nextTicketTheater.textContent = "🏛 " + next.theater;

    } else {

        nextTicketTitle.textContent = "予定なし";
        nextTicketDate.textContent = "";
        nextTicketTheater.textContent = "";

    }

}

const expenseCount = document.getElementById("expenseCount");

if (expenseCount) {

    const expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

    const thisYear = new Date().getFullYear();

    const count = expenses.filter(function (expense) {

        return new Date(expense.startDate).getFullYear() === thisYear;

    }).length;

    expenseCount.textContent = count + "回";

}

const dashboardTotalCost =
    document.getElementById("dashboardTotalCost");

if (dashboardTotalCost) {

    const expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

    const tickets =
        JSON.parse(localStorage.getItem("tickets")) || [];

    const thisYear = new Date().getFullYear();

    const expenseTotal = expenses
        .filter(function (expense) {

            return new Date(expense.startDate).getFullYear() === thisYear;

        })
        .reduce(function (sum, expense) {

            return sum + expense.total;

        }, 0);

    const ticketTotal = tickets
        .filter(function (ticket) {

            return (
                ticket.result === "当選" &&
                new Date(ticket.date).getFullYear() === thisYear
            );

        })
        .reduce(function (sum, ticket) {

            return sum + (ticket.total / ticket.count);

        }, 0);

    dashboardTotalCost.textContent =
        (expenseTotal + ticketTotal).toLocaleString() + "円";

        displayRecentRecords();

}

function displayRecentRecords() {

    const recentRecords = document.getElementById("recentRecords");

    if (!recentRecords) return;

    const records =
        JSON.parse(localStorage.getItem("records")) || [];

    recentRecords.innerHTML = "";

    if (records.length === 0) {

        recentRecords.innerHTML =
            "<p>まだ鑑賞記録がありません。</p>";

        return;

    }

    records.sort(function (a, b) {

        const dateTimeA = new Date(a.date + "T" + (a.time || "00:00"));
        const dateTimeB = new Date(b.date + "T" + (b.time || "00:00"));

        return dateTimeB - dateTimeA;

    });

    records.slice(0, 3).forEach(function (record) {

        recentRecords.innerHTML += `
            <div class="recentRecord">

                <h3>🎭 ${record.title}</h3>
                <p>📅 ${record.date}</p>
                <p>🏛 ${record.theater}</p>

            </div>

        `;

    });

}