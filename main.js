// PROGRAM

let parseJson = JSON.parse(jsonProducts);           // переобразуем json в js и созраняем в переменную
console.log(parseJson[5].category);                 // пример обращения

(function main() {
    let menuActionSelection = prompt("Please select an action \na) View product list \nb) Set filters \nc) Sort items \nq) Exit from the program");
    if (menuActionSelection == "a") {
        viewProductList();                          // Посмотреть список товаров
    } else if (menuActionSelection == "b") {
        setFilters();                               // Установить фильтры
    } else if (menuActionSelection == "c") {
        sortItems();                                // Сортировать товары
    } else if (menuActionSelection == "q") {
        exit();                                     // Выход из программы
    } else if (menuActionSelection == "admin") {
        alert('admin');                             // вход в меню админа, не отображать в общем списке.
    } else {
        alert('error data');                        // ошибка данных
        main();
    }
}());

function viewProductList() {                       // Функция посмотреть список товаров
    console.clear();
    alert('View product list');

    let consoleOutputTable = [];                   // массив для вывода в консоль

    parseJson.forEach(function( currentValue, item) {
        let arrayProduct = [];
        let dataCreated = new Date(parseJson[item].createdAt);
        arrayProduct.push(parseJson[item].category);
        arrayProduct.push(parseJson[item].manufacturer);
        arrayProduct.push(parseJson[item].price);
        arrayProduct.push(dataCreated.getDay() +'.'+ dataCreated.getMonth() +'.'+ dataCreated.getFullYear() +','+ dataCreated.getHours() +':'+ dataCreated.getMinutes() +':'+ dataCreated.getSeconds());
        
        consoleOutputTable.push(arrayProduct);
    });

    console.table(consoleOutputTable);
     
};

function setFilters() {                            // Функция установить фильтры
    alert('Set filters');
};

function sortItems() {                             // Функция сортировать товары
    alert('Sort items');
};

function exit() {                                  // Выход из программы
    alert('Exit from the program');
};




