// =========================
// グローバル変数
// =========================
 
console.log("expense.js 読み込みOK");

let editingExpenseId = null;

const expenseSaveButton = document.getElementById("expenseSaveButton");

// =========================
// 共通関数
// =========================

function calculateTotal() {

    const transportation = Number(document.getElementById("expenseTransportation").value) || 0;
    const hotel = Number(document.getElementById("expenseHotel").value) || 0;
    const food = Number(document.getElementById("expenseFood").value) || 0;
    const goods = Number(document.getElementById("expenseGoods").value) || 0;
    const other = Number(document.getElementById("expenseOther").value) || 0;

    const total = transportation + hotel + food + goods + other;

    document.getElementById("expenseTotal").value =
        total.toLocaleString() + "円";

    return total;

}

function clearExpenseForm() {

    console.log("clearExpenseForm実行");

    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseStartDate").value = "";
    document.getElementById("expenseEndDate").value = "";
    document.getElementById("expenseDestination").value = "";

    document.getElementById("expenseTransportation").value = "";
    document.getElementById("expenseHotel").value = "";
    document.getElementById("expenseFood").value = "";
    document.getElementById("expenseGoods").value = "";
    document.getElementById("expenseOther").value = "";

    document.getElementById("expenseMemo").value = "";

    calculateTotal();

}

const totalTargets = [
    "expenseTransportation",
    "expenseHotel",
    "expenseFood",
    "expenseGoods",
    "expenseOther"
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

if (expenseSaveButton) {

    expenseSaveButton.addEventListener("click", function () {

        console.log("editingExpenseId =", editingExpenseId);

        const title = document.getElementById("expenseTitle").value;
const startDate = document.getElementById("expenseStartDate").value;
const endDate = document.getElementById("expenseEndDate").value;
const destination = document.getElementById("expenseDestination").value;

const transportation = Number(document.getElementById("expenseTransportation").value) || 0;
const hotel = Number(document.getElementById("expenseHotel").value) || 0;
const food = Number(document.getElementById("expenseFood").value) || 0;
const goods = Number(document.getElementById("expenseGoods").value) || 0;
const other = Number(document.getElementById("expenseOther").value) || 0;

const total = calculateTotal();

const memo = document.getElementById("expenseMemo").value;

const expense = {
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

console.log(expense);

const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

    if (editingExpenseId !== null) {

    const index = expenses.findIndex(function (item) {

        return item.id === editingExpenseId;

    });

    if (index !== -1) {

        expense.id = editingExpenseId;

        expenses[index] = expense;

    }

    editingExpenseId = null;

    expenseSaveButton.textContent = "保存";

    clearExpenseForm();

} else {

    expenses.push(expense);

}

localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
);

clearExpenseForm();

displayExpenses();

console.log("保存成功");

    });

}

// =========================
// 一覧表示
// =========================

function displayExpenses(searchWord = "") {

    const expenseList = document.getElementById("expenseList");

    if (!expenseList) return;

    expenseList.innerHTML = "";

    const expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

    const keyword = searchWord.toLowerCase();

    const filteredExpenses = expenses.filter(function (expense) {

    return (
    expense.title.toLowerCase().includes(keyword) ||
    expense.destination.toLowerCase().includes(keyword)
);

});

filteredExpenses.forEach(function (expense) {

    expenseList.innerHTML += `
    <hr>

    <h3>${expense.title}</h3>

    <p>期間：${expense.startDate} ～ ${expense.endDate}</p>

    <p>目的地：${expense.destination}</p>

    <p>合計金額：${expense.total.toLocaleString()}円</p>

    <br>

<button
    class="expenseEditButton"
    data-id="${expense.id}"
>
    編集
</button>

<button
    class="expenseDeleteButton"
    data-id="${expense.id}"
>
    削除
</button>
`;

});

const expenseEditButtons = document.querySelectorAll(".expenseEditButton");

expenseEditButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = Number(button.dataset.id);

const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

const expense = expenses.find(function (expense) {

    return expense.id === id;

});

if (!expense) return;

document.getElementById("expenseTitle").value = expense.title;
document.getElementById("expenseStartDate").value = expense.startDate;
document.getElementById("expenseEndDate").value = expense.endDate;
document.getElementById("expenseDestination").value = expense.destination;

document.getElementById("expenseTransportation").value = expense.transportation;
document.getElementById("expenseHotel").value = expense.hotel;
document.getElementById("expenseFood").value = expense.food;
document.getElementById("expenseGoods").value = expense.goods;
document.getElementById("expenseOther").value = expense.other;

document.getElementById("expenseMemo").value = expense.memo;

calculateTotal();

editingExpenseId = id;

console.log("編集でセット:", editingExpenseId);

expenseSaveButton.textContent = "更新";

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

    });

});

const expenseDeleteButtons = document.querySelectorAll(".expenseDeleteButton");

expenseDeleteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const id = Number(button.dataset.id);

const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

const newExpenses = expenses.filter(function (expense) {

    return expense.id !== id;

});

localStorage.setItem(
    "expenses",
    JSON.stringify(newExpenses)
);

displayExpenses();

    });

});

}

// =========================
// 初期表示
// =========================

displayExpenses();

// =========================
// 検索イベント
// =========================

const expenseSearch =
    document.getElementById("expenseSearch");

const expenseClearButton =
    document.getElementById("expenseClearButton");

    if (expenseClearButton) {

    expenseClearButton.style.display = "none";

}

    if (expenseSearch) {

    expenseSearch.addEventListener("input", function () {

        console.log(expenseSearch.value);

        if (expenseSearch.value === "") {

    expenseClearButton.style.display = "none";

} else {

    expenseClearButton.style.display = "inline-block";

}

        displayExpenses(expenseSearch.value);

    });

}

if (expenseClearButton) {

    expenseClearButton.addEventListener("click", function () {

        expenseSearch.value = "";

        expenseClearButton.style.display = "none";

        displayExpenses();

        expenseSearch.focus();

    });

}