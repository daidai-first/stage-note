console.log("record.js 読み込みOK");

// ==========================
// 編集中の観劇記録ID
// ==========================

let editingRecordId = null;

// ==========================
// DOM取得
// ==========================

const recordSaveButton = document.getElementById("recordSaveButton");

// ==========================
// 保存処理
// ==========================

if (recordSaveButton) {

    recordSaveButton.addEventListener("click", function () {

        const record = {

            id: editingRecordId ?? Date.now(),

            title: document.getElementById("recordTitle").value,
            date: document.getElementById("recordDate").value,
            time: document.getElementById("recordTime").value,
            theater: document.getElementById("recordTheater").value,
            seatType: document.getElementById("recordSeatType").value,

seatTypeOther: document.getElementById("recordSeatTypeOther").value,

seatFloor: document.getElementById("recordSeatFloor").value,

seatFloorOther: document.getElementById("recordSeatFloorOther").value,

seatRow: document.getElementById("recordSeatRow").value,

seatNumber: document.getElementById("recordSeatNumber").value,
            cast: document.getElementById("recordCast").value,
            companion: document.getElementById("recordCompanion").value,
            rate: document.getElementById("recordRate").value,
            memo: document.getElementById("recordMemo").value

        };

        console.log(record);

saveAutocompleteItem(
    "autocompleteTitles",
    record.title
);
saveAutocompleteItem(
    "autocompleteTheaters",
    record.theater
);
saveAutocompleteItem(
    "autocompleteCasts",
    record.cast
);
saveAutocompleteItem(
    "autocompleteCompanions",
    record.companion
);

let records = JSON.parse(localStorage.getItem("records")) || [];

if (editingRecordId === null) {

    records.push(record);

} else {

    records = records.map(function (r) {

        if (r.id === editingRecordId) {
            return record;
        }

        return r;

    });

}

localStorage.setItem("records", JSON.stringify(records));

console.log("鑑賞記録を保存しました！");

editingRecordId = null;

recordSaveButton.textContent = "保存";

clearRecordForm();

displayRecords();

    });

}

// ==========================
// フォーム初期化
// ==========================

function clearRecordForm() {

    document.getElementById("recordTitle").value = "";
    document.getElementById("recordDate").value = "";
    document.getElementById("recordTime").value = "";
    document.getElementById("recordTheater").value = "";
    document.getElementById("recordSeatType").selectedIndex = 0;
document.getElementById("recordSeatTypeOther").value = "";

document.getElementById("recordSeatFloor").selectedIndex = 0;
document.getElementById("recordSeatFloorOther").value = "";

document.getElementById("recordSeatRow").value = "";
document.getElementById("recordSeatNumber").value = "";

document.getElementById("recordSeatTypeOther").style.display = "none";
document.getElementById("recordSeatFloorOther").style.display = "none";
    document.getElementById("recordCast").value = "";
    document.getElementById("recordCompanion").value = "";
    document.getElementById("recordRate").selectedIndex = 0;
    document.getElementById("recordMemo").value = "";

}

// ==========================
// 観劇記録一覧表示
// ==========================

function displayRecords() {

    const recordList = document.getElementById("recordList");

    if (!recordList) return;

    recordList.innerHTML = "";

    const records = JSON.parse(localStorage.getItem("records")) || [];

    const searchWord = document
    .getElementById("recordSearch")
    .value
    .toLowerCase();

    records.sort(function (a, b) {

        const dateTimeA = new Date(a.date + "T" + (a.time || "00:00"));
        const dateTimeB = new Date(b.date + "T" + (b.time || "00:00"));

        return dateTimeB - dateTimeA;

    });

    const filteredRecords = records.filter(function (record) {

    return (

        record.title.toLowerCase().includes(searchWord) ||
        record.theater.toLowerCase().includes(searchWord) ||
        record.cast.toLowerCase().includes(searchWord) ||
        record.companion.toLowerCase().includes(searchWord)

    );

});

    filteredRecords.forEach(function (record) {

        recordList.innerHTML += `

<hr>

<h3>${record.title}</h3>

<p>鑑賞日：${record.date}</p>
<p>開演時間：${record.time}</p>
<p>会場：${record.theater}</p>
<p>座席：${
    (
        (record.seatType === "その他"
            ? record.seatTypeOther
            : record.seatType || "") + " " +

        (record.seatFloor === "その他"
            ? record.seatFloorOther
            : record.seatFloor || "") +

        (record.seatRow
            ? record.seatRow + "列"
            : "") +

        (record.seatNumber
            ? record.seatNumber + "番"
            : "")
    ).trim()
}</p>
<p>出演者：${record.cast}</p>
<p>同行者：${record.companion}</p>
<p>評価：${record.rate}</p>
<p>感想：${record.memo}</p>

<button class="recordEditButton" data-id="${record.id}">
    編集
</button>
<button class="recordDeleteButton" data-id="${record.id}">
    削除
</button>

`;

    });

    const recordEditButtons = document.querySelectorAll(".recordEditButton");

recordEditButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = Number(button.dataset.id);

        const record = records.find(function (record) {
            return record.id === id;
        });

        if (!record) return;

        editingRecordId = id;

        document.getElementById("recordTitle").value = record.title;
        document.getElementById("recordDate").value = record.date;
        document.getElementById("recordTime").value = record.time;
        document.getElementById("recordTheater").value = record.theater;
        document.getElementById("recordSeatType").value = record.seatType || "";

document.getElementById("recordSeatTypeOther").value = record.seatTypeOther || "";

document.getElementById("recordSeatFloor").value = record.seatFloor || "";

document.getElementById("recordSeatFloorOther").value = record.seatFloorOther || "";

document.getElementById("recordSeatRow").value = record.seatRow || "";

document.getElementById("recordSeatNumber").value = record.seatNumber || "";

if (record.seatType === "その他") {
    document.getElementById("recordSeatTypeOther").style.display = "block";
}

if (record.seatFloor === "その他") {
    document.getElementById("recordSeatFloorOther").style.display = "block";
}
        document.getElementById("recordCast").value = record.cast;
        document.getElementById("recordCompanion").value = record.companion;
        document.getElementById("recordRate").value = record.rate;
        document.getElementById("recordMemo").value = record.memo;

        recordSaveButton.textContent = "更新";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

    const recordDeleteButtons = document.querySelectorAll(".recordDeleteButton");

recordDeleteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = Number(button.dataset.id);

        const newRecords = records.filter(function (record) {
            return record.id !== id;
        });

        localStorage.setItem("records", JSON.stringify(newRecords));

        if (editingRecordId === id) {

            editingRecordId = null;

            recordSaveButton.textContent = "保存";

            clearRecordForm();

        }

        displayRecords();

    });

});

}

const recordSearch = document.getElementById("recordSearch");
const recordClearButton = document.getElementById("recordClearButton");
recordClearButton.style.display = "none";

if (recordClearButton) {

    recordClearButton.addEventListener("click", function () {

        recordSearch.value = "";

recordClearButton.style.display = "none";

displayRecords();

recordSearch.focus();

    });

}

if (recordSearch) {

    recordSearch.addEventListener("input", function () {

    if (recordSearch.value === "") {

        recordClearButton.style.display = "none";

    } else {

        recordClearButton.style.display = "inline-block";

    }

    displayRecords();

});

}

// ==========================
// 席種「その他」表示切替
// ==========================

const recordSeatType = document.getElementById("recordSeatType");
const recordSeatTypeOther = document.getElementById("recordSeatTypeOther");

if (recordSeatType) {

    recordSeatType.addEventListener("change", function () {

        if (recordSeatType.value === "その他") {

            recordSeatTypeOther.style.display = "block";

        } else {

            recordSeatTypeOther.style.display = "none";
            recordSeatTypeOther.value = "";

        }

    });

}


// ==========================
// 階「その他」表示切替
// ==========================

const recordSeatFloor = document.getElementById("recordSeatFloor");
const recordSeatFloorOther = document.getElementById("recordSeatFloorOther");

if (recordSeatFloor) {

    recordSeatFloor.addEventListener("change", function () {

        if (recordSeatFloor.value === "その他") {

            recordSeatFloorOther.style.display = "block";

        } else {

            recordSeatFloorOther.style.display = "none";
            recordSeatFloorOther.value = "";

        }

    });

}

displayRecords();