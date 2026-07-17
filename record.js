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
            seat: document.getElementById("recordSeat").value,
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
    document.getElementById("recordSeat").value = "";
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
<p>座席：${record.seat}</p>
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
        document.getElementById("recordSeat").value = record.seat;
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

displayRecords();