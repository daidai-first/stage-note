console.log("seat.js 読み込みOK");

displaySeats();

function displaySeats() {

    const seatList = document.getElementById("seatList");

    if (!seatList) return;

    seatList.innerHTML = "";

    const records =
        JSON.parse(localStorage.getItem("records")) || [];

        const searchWord = document
    .getElementById("seatSearch")
    .value
    .toLowerCase();

    const seatSort =
    document.getElementById("seatSort").value;

records.sort(function (a, b) {

    if (seatSort === "new") {

        return new Date(b.date + "T" + (b.time || "00:00"))
             - new Date(a.date + "T" + (a.time || "00:00"));

    }

    if (seatSort === "old") {

        return new Date(a.date + "T" + (a.time || "00:00"))
             - new Date(b.date + "T" + (b.time || "00:00"));

    }

    if (seatSort === "title") {

        return a.title.localeCompare(b.title);

    }

    if (seatSort === "theater") {

        return a.theater.localeCompare(b.theater);

    }

    return 0;

});

    const filteredRecords = records.filter(function(record){

    const seatType =
        record.seatType === "その他"
            ? record.seatTypeOther
            : record.seatType || "";

    return (

        record.title.toLowerCase().includes(searchWord) ||

        record.theater.toLowerCase().includes(searchWord) ||

        seatType.toLowerCase().includes(searchWord)

    );

});

filteredRecords.forEach(function(record){

        const seatType =
            record.seatType === "その他"
                ? record.seatTypeOther
                : record.seatType || "";

        const seatFloor =
            record.seatFloor === "その他"
                ? record.seatFloorOther
                : record.seatFloor || "";

        seatList.innerHTML += `

<hr>

<h3>🎭 ${record.title}</h3>

<p>📅 ${record.date}</p>

<p>🏛 ${record.theater}</p>

<p>🪑 ${seatType} ${seatFloor}${record.seatRow}列${record.seatNumber}番</p>

`;

    });

}

const seatSearch = document.getElementById("seatSearch");

if (seatSearch) {

    seatSearch.addEventListener("input", function () {

    if (seatSearch.value === "") {

        seatClearButton.style.display = "none";

    } else {

        seatClearButton.style.display = "inline-block";

    }

    displaySeats();

});
}

const seatSort =
    document.getElementById("seatSort");

if (seatSort) {

    seatSort.addEventListener("change", function () {

        displaySeats();

    });

}

const seatClearButton = document.getElementById("seatClearButton");

seatClearButton.style.display = "none";

if (seatClearButton) {

    seatClearButton.addEventListener("click", function () {

        seatSearch.value = "";

        seatClearButton.style.display = "none";

        displaySeats();

        seatSearch.focus();

    });

}