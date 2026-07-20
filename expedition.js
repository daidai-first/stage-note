// =========================
// グローバル変数
// =========================
 
console.log("expedition.js 読み込みOK");

let editingExpeditionId = null;

const expeditionSaveButton = document.getElementById("expeditionSaveButton");

// =========================
// 共通関数
// =========================

function calculateTotal() {

    const transportation = Number(document.getElementById("expeditionTransportation").value) || 0;
    const hotel = Number(document.getElementById("expeditionHotel").value) || 0;
    const food = Number(document.getElementById("expeditionFood").value) || 0;
    const goods = Number(document.getElementById("expeditionGoods").value) || 0;
    const other = Number(document.getElementById("expeditionOther").value) || 0;

    const total = transportation + hotel + food + goods + other;

    document.getElementById("expeditionTotal").value =
        total.toLocaleString() + "円";

    return total;

}

function clearExpeditionForm() {

    console.log("clearExpeditionForm実行");

    document.getElementById("expeditionTitle").value = "";
    document.getElementById("expeditionStartDate").value = "";
    document.getElementById("expeditionEndDate").value = "";
    document.getElementById("expeditionDestination").value = "";

    document.getElementById("expeditionTransportation").value = "";
    document.getElementById("expeditionHotel").value = "";
    document.getElementById("expeditionFood").value = "";
    document.getElementById("expeditionGoods").value = "";
    document.getElementById("expeditionOther").value = "";

    document.getElementById("expeditionMemo").value = "";

    calculateTotal();

}

const totalTargets = [
    "expeditionTransportation",
    "expeditionHotel",
    "expeditionFood",
    "expeditionGoods",
    "expeditionOther"
];

totalTargets.forEach(function (id) {

    

    const input = document.getElementById(id);

    if (!input) return;

    input.addEventListener("input", function () {

        calculateTotal();

    });

});

// =========================
// 保存・更新処理
// =========================

if (expeditionSaveButton) {

    expeditionSaveButton.addEventListener("click", function () {

        console.log("editingExpeditionId =", editingExpeditionId);

        const title = document.getElementById("expeditionTitle").value;
const startDate = document.getElementById("expeditionStartDate").value;
const endDate = document.getElementById("expeditionEndDate").value;
const destination = document.getElementById("expeditionDestination").value;

const transportation = Number(document.getElementById("expeditionTransportation").value) || 0;
const hotel = Number(document.getElementById("expeditionHotel").value) || 0;
const food = Number(document.getElementById("expeditionFood").value) || 0;
const goods = Number(document.getElementById("expeditionGoods").value) || 0;
const other = Number(document.getElementById("expeditionOther").value) || 0;

const total = calculateTotal();

const memo = document.getElementById("expeditionMemo").value;

const expedition = {
    id: Date.now(),
    title,
    startDate,
    endDate,
    destination,
    transportation,
    hotel,
    food,
    goods,
    other,
    total,
    memo
};

console.log(expedition);

const expeditions =
    JSON.parse(localStorage.getItem("expeditions")) || [];

    if (editingExpeditionId !== null) {

    const index = expeditions.findIndex(function (item) {

        return item.id === editingExpeditionId;

    });

    if (index !== -1) {

        expedition.id = editingExpeditionId;

        expeditions[index] = expedition;

    }

    editingExpeditionId = null;

    expeditionSaveButton.textContent = "保存";

} else {

    expeditions.push(expedition);

}

localStorage.setItem(
    "expeditions",
    JSON.stringify(expeditions)
);

saveAutocompleteItem(
    "autocompleteExpeditionTitles",
    expedition.title
);

saveAutocompleteItem(
    "autocompleteDestinations",
    expedition.destination
);

clearExpeditionForm();

displayExpeditions();

console.log("保存成功");

    });

}

// =========================
// 一覧表示
// =========================

function displayExpeditions(searchWord = "") {

    const expeditionList = document.getElementById("expeditionList");

    if (!expeditionList) return;

    expeditionList.innerHTML = "";

    const expeditions =
        JSON.parse(localStorage.getItem("expeditions")) || [];

    const keyword = searchWord.toLowerCase();

    const filteredExpeditions = expeditions.filter(function (expedition) {

    return (
    expedition.title.toLowerCase().includes(keyword) ||
    expedition.destination.toLowerCase().includes(keyword)
);

});

filteredExpeditions.forEach(function (expedition) {

    expeditionList.innerHTML += `
    <hr>

    <h3>${expedition.title}</h3>

    <p>期間：${expedition.startDate} ～ ${expedition.endDate}</p>

    <p>目的地：${expedition.destination}</p>

    <p>合計金額：${expedition.total.toLocaleString()}円</p>

    <p>メモ：${expedition.memo}</p>

    <br>

<button
    class="expeditionEditButton"
    data-id="${expedition.id}"
>
    編集
</button>

<button
    class="expeditionDeleteButton"
    data-id="${expedition.id}"
>
    削除
</button>
`;

});

const expeditionEditButtons = document.querySelectorAll(".expeditionEditButton");

expeditionEditButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = Number(button.dataset.id);

const expeditions =
    JSON.parse(localStorage.getItem("expeditions")) || [];

const expedition = expeditions.find(function (expedition) {

    return expedition.id === id;

});

if (!expedition) return;

document.getElementById("expeditionTitle").value = expedition.title;
document.getElementById("expeditionStartDate").value = expedition.startDate;
document.getElementById("expeditionEndDate").value = expedition.endDate;
document.getElementById("expeditionDestination").value = expedition.destination;

document.getElementById("expeditionTransportation").value = expedition.transportation;
document.getElementById("expeditionHotel").value = expedition.hotel;
document.getElementById("expeditionFood").value = expedition.food;
document.getElementById("expeditionGoods").value = expedition.goods;
document.getElementById("expeditionOther").value = expedition.other;

document.getElementById("expeditionMemo").value = expedition.memo;

calculateTotal();

editingExpeditionId = id;

console.log("編集でセット:", editingExpeditionId);

expeditionSaveButton.textContent = "更新";

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

    });

});

const expeditionDeleteButtons = document.querySelectorAll(".expeditionDeleteButton");

expeditionDeleteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = Number(button.dataset.id);

const expeditions =
    JSON.parse(localStorage.getItem("expeditions")) || [];

const newExpeditions = expeditions.filter(function (expedition) {

    return expedition.id !== id;

});

localStorage.setItem(
    "expeditions",
    JSON.stringify(newExpeditions)
);

displayExpeditions();

    });

});

}

// =========================
// 初期表示
// =========================

displayExpeditions();

// =========================
// 検索イベント
// =========================

const expeditionSearch =
    document.getElementById("expeditionSearch");

const expeditionClearButton =
    document.getElementById("expeditionClearButton");

    if (expeditionClearButton) {

    expeditionClearButton.style.display = "none";

}

    if (expeditionSearch) {

    expeditionSearch.addEventListener("input", function () {

        console.log(expeditionSearch.value);

        if (expeditionSearch.value === "") {

    expeditionClearButton.style.display = "none";

} else {

    expeditionClearButton.style.display = "inline-block";

}

        displayExpeditions(expeditionSearch.value);

    });

}

if (expeditionClearButton) {

    expeditionClearButton.addEventListener("click", function () {

        expeditionSearch.value = "";

        expeditionClearButton.style.display = "none";

        displayExpeditions();

        expeditionSearch.focus();

    });

}