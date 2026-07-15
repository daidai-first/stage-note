console.log("ticket.js 読み込みOK");

const ticketSaveButton = document.getElementById("ticketSaveButton");

if (ticketSaveButton) {

    ticketSaveButton.addEventListener("click", function () {

        const title = document.getElementById("ticketTitle").value;
        const date = document.getElementById("ticketDate").value;
        const time = document.getElementById("ticketTime").value;
        const theater = document.getElementById("ticketTheater").value;
        const type = document.getElementById("ticketType").value;
        const result = document.getElementById("ticketResult").value;
        const issue = document.getElementById("ticketIssue").value;
        const place = document.getElementById("ticketPlace").value;
        const price = Number(document.getElementById("ticketPrice").value);
        const memo = document.getElementById("ticketMemo").value;

        const ticket = {
            id: Date.now(),
            title: title,
            date: date,
            time: time,
            theater: theater,
            type: type,
            result: result,
            issue: issue,
            place: place,
            price: price,
            memo: memo
        };

        let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

        tickets.push(ticket);

        localStorage.setItem("tickets", JSON.stringify(tickets));

        console.log("保存しました！");

        displayTickets();

    });

}

function displayTickets() {

    const ticketList = document.getElementById("ticketList");

    if (!ticketList) {
        return;
    }

    ticketList.innerHTML = "";

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    for (const ticket of tickets) {

        ticketList.innerHTML += `
            <hr>
            <h3>${ticket.title}</h3>
            <p>公演日：${ticket.date}</p>
            <p>公演時間：${ticket.time}</p>
            <p>会場：${ticket.theater}</p>
            <p>チケット種別：${ticket.type}</p>
            <p>当落：${ticket.result}</p>
            <p>受取・発券状況：${ticket.issue}</p>
            <p>購入場所：${ticket.place}</p>
            <p>チケット代：${ticket.price.toLocaleString()}円</p>
            <p>備考：${ticket.memo}</p>

            <button class="ticketDeleteButton" data-id="${ticket.id}">
                削除
            </button>
        `;
    }

    const deleteButtons = document.querySelectorAll(".ticketDeleteButton");

    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id = Number(button.dataset.id);

            const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

            const newTickets = tickets.filter(function (ticket) {
                return ticket.id !== id;
            });

            localStorage.setItem("tickets", JSON.stringify(newTickets));

            displayTickets();

        });

    });

}

displayTickets();