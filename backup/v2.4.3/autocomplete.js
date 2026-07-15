console.log("autocomplete.js 読み込みOK");

// ==========================
// 候補取得
// ==========================

function getAutocompleteList(key) {

    return JSON.parse(localStorage.getItem(key)) || [];

}

// ==========================
// 候補保存
// ==========================

function saveAutocompleteItem(key, value) {

    value = value.trim();

    if (value === "") return;

    let list = getAutocompleteList(key);

    if (!list.includes(value)) {

        list.push(value);

        list.sort();

        localStorage.setItem(
            key,
            JSON.stringify(list)
        );

    }

}

// ==========================
// 候補表示
// ==========================

function showSuggestions(containerId, list) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) return;

    list.forEach(function (item) {

    const div = document.createElement("div");

    div.textContent = item;

    div.addEventListener("click", function () {

        const inputId =
            containerId.replace("Suggestions", "");

        document.getElementById(inputId).value = item;

        container.innerHTML = "";

    });

    container.appendChild(div);

});

}

// ==========================
// 入力アシスト登録
// ==========================

function setupAutocomplete(inputId, containerId, storageKey) {

    const input = document.getElementById(inputId);

    if (!input) return;

    input.addEventListener("input", function () {

        const keyword = input.value.trim().toLowerCase();

        if (keyword === "") {

            showSuggestions(containerId, []);

            return;

        }

        const list = getAutocompleteList(storageKey);

        const result = list.filter(function (item) {

            return item.toLowerCase().includes(keyword);

        });

        showSuggestions(containerId, result);

    });

}

// ==========================
// 入力アシスト一覧
// ==========================

const autocompleteSettings = [

    {
        input: "recordTitle",
        suggestions: "recordTitleSuggestions",
        storage: "autocompleteTitles"
    },

    {
    input: "recordTheater",
    suggestions: "recordTheaterSuggestions",
    storage: "autocompleteTheaters"
    },

    {
    input: "recordCast",
    suggestions: "recordCastSuggestions",
    storage: "autocompleteCasts"
    },

    {
    input: "recordCompanion",
    suggestions: "recordCompanionSuggestions",
    storage: "autocompleteCompanions"
    },

    {
    input: "ticketTitle",
    suggestions: "ticketTitleSuggestions",
    storage: "autocompleteTitles"
    },

    {
    input: "ticketTheater",
    suggestions: "ticketTheaterSuggestions",
    storage: "autocompleteTheaters"
    },

    {
    input: "ticketPlace",
    suggestions: "ticketPlaceSuggestions",
    storage: "autocompletePlaces"
    },

    {
    input: "expenseTitle",
    suggestions: "expenseTitleSuggestions",
    storage: "autocompleteExpenseTitles"
    },

    {
    input: "expenseDestination",
    suggestions: "expenseDestinationSuggestions",
    storage: "autocompleteDestinations"
    }

];

autocompleteSettings.forEach(function(setting){

    setupAutocomplete(

        setting.input,

        setting.suggestions,

        setting.storage

    );

});