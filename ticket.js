console.log("ticket.js 読み込みOK");

// ==========================
// 編集中のチケットID
// ==========================

let editingTicketId = null;

// ==========================
// DOM取得
// ==========================

const ticketSaveButton = document.getElementById("ticketSaveButton");

function calculateTicketTotal() {

    const count =
        Number(document.getElementById("ticketCount").value) || 1;

    const price =
        Number(document.getElementById("ticketPrice").value) || 0;

    const fee =
        Number(document.getElementById("ticketFee").value) || 0;

    const other =
        Number(document.getElementById("ticketOther").value) || 0;

    const total =
        (price * count) + fee + other;

    const ticketTotal = document.getElementById("ticketTotal");

if (
    document.getElementById("ticketCount").value === "" &&
    document.getElementById("ticketPrice").value === "" &&
    document.getElementById("ticketFee").value === "" &&
    document.getElementById("ticketOther").value === ""
) {

    ticketTotal.value = "";

} else {

    ticketTotal.value =
        total.toLocaleString() + "円";

}

    return total;

}

const ticketTotalTargets = [

    "ticketCount",

    "ticketPrice",

    "ticketFee",

    "ticketOther"

];

ticketTotalTargets.forEach(function (id) {

    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener("input", function () {

        calculateTicketTotal();

    });

});

// ==========================
// 保存・編集処理
// ==========================

if (ticketSaveButton) {
  ticketSaveButton.addEventListener("click", function () {

    const ticket = {
      id: editingTicketId ?? Date.now(),
      title: document.getElementById("ticketTitle").value,
      date: document.getElementById("ticketDate").value,
      time: document.getElementById("ticketTime").value,
      theater: document.getElementById("ticketTheater").value,
      type: document.getElementById("ticketType").value,
      result: document.getElementById("ticketResult").value,
      issue: document.getElementById("ticketIssue").value,
      place: document.getElementById("ticketPlace").value,
      count: Number(document.getElementById("ticketCount").value),

price: Number(document.getElementById("ticketPrice").value),

fee: Number(document.getElementById("ticketFee").value),

other: Number(document.getElementById("ticketOther").value),

total: calculateTicketTotal(),

memo: document.getElementById("ticketMemo").value
    };

    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (editingTicketId === null) {
      tickets.push(ticket);
    } else {
      tickets = tickets.map(t => t.id === editingTicketId ? ticket : t);
    }

    localStorage.setItem("tickets", JSON.stringify(tickets));

    saveAutocompleteItem(
    "autocompleteTitles",
    ticket.title
);

saveAutocompleteItem(
    "autocompleteTheaters",
    ticket.theater
);

saveAutocompleteItem(
    "autocompletePlaces",
    ticket.place
);

    editingTicketId = null;
    document.getElementById("editMessage").style.display = "none";
    ticketSaveButton.textContent = "保存";

    document.querySelectorAll(
"#ticketTitle,#ticketDate,#ticketTime,#ticketTheater,#ticketPlace,#ticketPrice,#ticketMemo,#ticketFee,#ticketOther"
).forEach(e=>e.value="");

document.getElementById("ticketCount").value = "";

calculateTicketTotal();
    document.getElementById("ticketType").selectedIndex=0;
    document.getElementById("ticketResult").selectedIndex=0;
    document.getElementById("ticketIssue").selectedIndex=0;

    displayTickets();
  });
}

// ==========================
// チケット一覧表示
// ==========================

function displayTickets(){
  const list=document.getElementById("ticketList");
  if(!list) return;
  const searchWord = document
    .getElementById("ticketSearch")
    .value
    .toLowerCase();
  list.innerHTML="";
  const tickets=JSON.parse(localStorage.getItem("tickets"))||[];

  tickets.sort(function (a, b) {

    const dateTimeA = new Date(a.date + "T" + (a.time || "00:00"));
    const dateTimeB = new Date(b.date + "T" + (b.time || "00:00"));

    return dateTimeB - dateTimeA;

});

const filteredTickets = tickets.filter(function (ticket) {

    return (
        ticket.title.toLowerCase().includes(searchWord) ||
        ticket.theater.toLowerCase().includes(searchWord) ||
        ticket.place.toLowerCase().includes(searchWord)
    );

});

  filteredTickets.forEach(ticket => {
    const div=document.createElement("div");
    div.innerHTML=`
<hr>
<h3>${ticket.title}</h3>
<p>鑑賞日：${ticket.date}</p>
<p>開演時間：${ticket.time}</p>
<p>会場：${ticket.theater}</p>
<p>チケット種別：${ticket.type}</p>
<p>当落：${ticket.result}</p>
<p>受取・発券状況：${ticket.issue}</p>
<p>購入場所：${ticket.place}</p>
<p>枚数：${ticket.count}枚</p>
<p>チケット代（1枚）：${ticket.price.toLocaleString()}円</p>
<p>手数料：${ticket.fee.toLocaleString()}円</p>
<p>その他：${ticket.other.toLocaleString()}円</p>
<p>支払総額：${ticket.total.toLocaleString()}円</p>
<p>備考：${ticket.memo}</p>
<button class="edit" data-id="${ticket.id}">編集</button>
<button class="delete" data-id="${ticket.id}">削除</button>`;
    list.appendChild(div);
  });

  document.querySelectorAll(".edit").forEach(btn=>{
    btn.onclick=()=>{
      const id=Number(btn.dataset.id);
      const ticket=tickets.find(t=>t.id===id);
      if(!ticket)return;
      editingTicketId=id;
      ticketTitle.value=ticket.title;
      ticketDate.value=ticket.date;
      ticketTime.value=ticket.time;
      ticketTheater.value=ticket.theater;
      ticketType.value=ticket.type;
      ticketResult.value=ticket.result;
      ticketIssue.value=ticket.issue;
      ticketPlace.value=ticket.place;
      ticketCount.value=ticket.count;
      ticketPrice.value=ticket.price;
      ticketFee.value=ticket.fee;
      ticketOther.value=ticket.other;
      calculateTicketTotal();
      ticketMemo.value=ticket.memo;
      editMessage.style.display="block";
      ticketSaveButton.textContent="更新";
      window.scrollTo({top:0,behavior:"smooth"});
    };
  });

  document.querySelectorAll(".delete").forEach(btn=>{
    btn.onclick=()=>{
      const id=Number(btn.dataset.id);
      const newTickets=tickets.filter(t=>t.id!==id);
      localStorage.setItem("tickets",JSON.stringify(newTickets));
      if(editingTicketId===id){
        editingTicketId=null;
        editMessage.style.display="none";
        ticketSaveButton.textContent="保存";
      }
      displayTickets();

    };
  });
}

// ==========================
// 初期表示
// ==========================

displayTickets();

// ==========================
// 検索機能
// ==========================

const ticketSearch = document.getElementById("ticketSearch");
const ticketClearButton = document.getElementById("ticketClearButton");

if (ticketSearch) {

    ticketSearch.addEventListener("input", function () {

        if (ticketSearch.value === "") {
            ticketClearButton.style.display = "none";
        } else {
            ticketClearButton.style.display = "inline-block";
        }

        displayTickets();

    });

}

if (ticketClearButton) {

    ticketClearButton.addEventListener("click", function () {

        ticketSearch.value = "";

        ticketClearButton.style.display = "none";

        displayTickets();

        ticketSearch.focus();

    });

}