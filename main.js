let parseJson = JSON.parse(jsonProducts);           // переобразуем json в js и созраняем в переменную

const allProducts = [];

let filtersProducts = {
    category: [],
    manufacturer: [],
    price: {
        min: 0,
        max: 0
    },
    priceConst: {
        min: 0,
        max: 0
    },
    createdAt: {
        min: 0,
        max: 0
    },
    createdAtConst: {
        min: 0,
        max: 0
    }
};

productListConversion();						// Пересохранение списка продуктов с более удобным форматом даты
filterListInit();                               // Инициализация фильтров

function main() {

    let menuActionSelection = prompt("Please select an action \na) View product list \nb) Set filters \nc) Sort items \nq) Exit from the program").toLowerCase();

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
};

main();

function checkProductFilter(key) {
    if ((filtersProducts.category[key] == allProducts[key].category) &&             // проверка фильтра категории
        (filtersProducts.manufacturer[key] == allProducts[key].manufacturer) &&     // проверка фильтра производитель
        (allProducts[key].price <= filtersProducts.price.max &&                     // проверка фильтра максимальной цены
         allProducts[key].price >= filtersProducts.price.min) &&                    // проверка фильтра минимальной цены
        (allProducts[key].createdAtMS <= filtersProducts.createdAt.max &&            // проверка фильтра максимальной даты
        allProducts[key].createdAtMS >= filtersProducts.createdAt.min)) {            // проверка фильтра минимальной даты
        	return true;
    };
    return false;
};

function viewProductList() {                       // Функция посмотреть список товаров
    console.clear();

    let consoleOutputTable = [];                   // массив для вывода в консоль

    for (let key in allProducts) {
        let arrayProduct = [];
        if (checkProductFilter(key)) {
            arrayProduct.push(allProducts[key].category);
        	arrayProduct.push(allProducts[key].manufacturer);
        	arrayProduct.push(allProducts[key].price);
        	arrayProduct.push(transformDate(allProducts[key].createdAtMS));
        	consoleOutputTable.push(arrayProduct);
        };
    };
    console.table(consoleOutputTable);
    main();
};

function transformDate(dateMS) {
	let dataCreated = new Date(dateMS);
	return dataCreated.getDay() +'.'+ dataCreated.getMonth() +'.'+ dataCreated.getFullYear() +','+ dataCreated.getHours() +':'+ dataCreated.getMinutes() +':'+ dataCreated.getSeconds();
};

function transformDateFilter(dateMS) {
	let dataCreated = new Date(dateMS);
	return dataCreated.getFullYear() +'-'+ dataCreated.getMonth() +'-'+ dataCreated.getDay();
};

function backToMenu() {
    let backMenu = confirm("Back to menu?")
    if (backMenu){
        main();
    } else {
        setFilters();
    };
};

function productListConversion() {				  							// пересохранение списка продуктов с более удобным форматом даты
	for (let key in parseJson) {											// заполнение массива allProducts объектами product
		let product = {};

		product.category = parseJson[key].category;							// добавляем в product очередной category
		product.manufacturer = parseJson[key].manufacturer;					// добавляем в product очередной manufacturer
		product.price = parseJson[key].price;								// добавляем в product очередной price
		product.createdAtMS = Date.parse(parseJson[key].createdAt);			// добавляем в product очередной createdAt в формате миллисекунд
		product.createdAt = parseJson[key].createdAt;						// добавляем в product очередной createdAt как есть (скорее всего не пригодиться и будет удален)

		allProducts.push(product);											// добавляем текущий product в массив allProducts
	};
};

function filterListInit() {                       							// перечень фильтров продуктов

    filtersProducts.category = [];
    filtersProducts.manufacturer = [];

    let priceListProducts = []; 											// Массив в котором храняться все цены чтобы из них выбрать минимум и максимум
    let dataListProducts = [];												// Массив в котором храняться все даты чтобы из них выбрать минимум и максимум

    for (let key in allProducts) { 											// заполнение обекта filtersProducts
        filtersProducts.category.push(allProducts[key].category);  			// добавляет в filtersProducts все категории
        filtersProducts.manufacturer.push(allProducts[key].manufacturer);	// добавляет в filtersProducts всех производителей
        priceListProducts.push(allProducts[key].price);						// добавляет в массив priceListProducts все цены
        dataListProducts.push(allProducts[key].createdAtMS);				// добавляет в массив dataListProducts все даты 
    };

    filtersProducts.price.min = Math.min(...priceListProducts);				// отбирает минимальную цену из priceListProducts и записывает ее в filtersProducts
    filtersProducts.price.max = Math.max(...priceListProducts);				// отбирает максимальную цену из priceListProducts и записывает ее в filtersProducts

    filtersProducts.priceConst.min = Math.min(...priceListProducts);
    filtersProducts.priceConst.max = Math.max(...priceListProducts);

    filtersProducts.createdAt.min = Math.min(...dataListProducts);			// отбирает минимальную дату из dataListProducts и записывает ее в filtersProducts
    filtersProducts.createdAt.max = Math.max(...dataListProducts);			// отбирает максимальную дату из dataListProducts и записывает ее в filtersProducts

    filtersProducts.createdAtConst.min = Math.min(...dataListProducts);
    filtersProducts.createdAtConst.max = Math.max(...dataListProducts);
};

function setFilters() {                            // Функция установить фильтры

    let filterActionSelection = prompt("Please select an filter \na) category \nb) price \nc) manufacturer \nd) data \nx) filter reset \nq) exit to menu").toLowerCase();

    if (filterActionSelection == "a") {
        let allCategory = [];
        let categoryString = "";

        for (const i in allProducts) {
            allCategory.push(allProducts[i].category);
            let istr = Number(i)+1;
            categoryString += "\n" + (istr) + ")";
            categoryString += allProducts[i].category
        };

        let userCategory = prompt("enter the category numbers "+ categoryString, "1.2.3");
        let userCategoryArr = userCategory.split(".");

        userCategoryArr.sort(function(a, b) {
            return a - b;
        });

        filtersProducts.category = [];

        for (const key in userCategoryArr) {
            filtersProducts.category[userCategoryArr[key]-1] = allCategory[userCategoryArr[key]-1];
        };

        backToMenu();
    } else if (filterActionSelection == "b") {
        let userMaximumPrice = prompt("Enter maximum price\nMaximum: " + filtersProducts.price.max + "\nMinimum: " + filtersProducts.price.min, filtersProducts.priceConst.max);
        if (userMaximumPrice > filtersProducts.priceConst.max) {
            userMaximumPrice = filtersProducts.priceConst.max;
        } else if (userMaximumPrice < filtersProducts.priceConst.min) {
            userMaximumPrice = filtersProducts.priceConst.min;
        };
        let userMinimumPrice = prompt("Enter minimum price\nMaximum: " + filtersProducts.price.max + "\nMinimum: " + filtersProducts.price.min, filtersProducts.priceConst.min);
        if (userMinimumPrice < filtersProducts.priceConst.min) {
            userMinimumPrice = filtersProducts.priceConst.min;
        } else if (userMinimumPrice > filtersProducts.priceConst.max) {
            userMinimumPrice > filtersProducts.priceConst.max;
        };
        filtersProducts.price.max = userMaximumPrice;
        filtersProducts.price.min = userMinimumPrice;

        backToMenu();

    } else if (filterActionSelection == "c") {
        let allmanufacturer = [];
        let manufacturerString = "";

        for (const i in allProducts) {
            allmanufacturer.push(allProducts[i].manufacturer);
            let istr = Number(i)+1;
            manufacturerString += "\n" + (istr) + ")";
            manufacturerString += allProducts[i].manufacturer
        };

        let usermanufacturer = prompt("enter the manufacturer numbers "+ manufacturerString, "1.2.3");
        let usermanufacturerArr = usermanufacturer.split(".");

        usermanufacturerArr.sort(function(a, b) {
            return a - b;
        });

        filtersProducts.manufacturer = [];

        for (const key in usermanufacturerArr) {
            filtersProducts.manufacturer[usermanufacturerArr[key]-1] = allmanufacturer[usermanufacturerArr[key]-1];
        };
        backToMenu();
    } else if (filterActionSelection == "d") {
        let userMaximumDate = prompt("Enter maximum date\nMaximum: " + transformDateFilter(filtersProducts.createdAt.max) + "\nMinimum: " + transformDateFilter(filtersProducts.createdAt.min), transformDateFilter(filtersProducts.createdAt.max));

        userMaximumDate = Date.parse(userMaximumDate);

        if (userMaximumDate >= Date.parse(transformDateFilter(filtersProducts.createdAt.max))) {
            userMaximumDate = filtersProducts.createdAtConst.max;
        } else if (userMaximumDate <= Date.parse(transformDateFilter(filtersProducts.createdAt.min))) {
            userMaximumDate = filtersProducts.createdAtConst.min;
        } else {
            filtersProducts.createdAt.max = userMaximumDate;
        };

        let userMinimumDate = prompt("Enter minimum date\nMaximum: " + transformDateFilter(filtersProducts.createdAt.max) + "\nMinimum: " + transformDateFilter(filtersProducts.createdAt.min), transformDateFilter(filtersProducts.createdAt.min));
        
        userMinimumDate = Date.parse(userMinimumDate);

        if (userMinimumDate <= Date.parse(transformDateFilter(filtersProducts.createdAt.min))) {
            userMinimumDate = filtersProducts.createdAtConst.min;
        } else if (userMinimumDate >= Date.parse(transformDateFilter(filtersProducts.createdAt.max))) {
            userMinimumDate = filtersProducts.createdAtConst.max;
        } else {
            filtersProducts.createdAt.min = userMinimumDate;
        };
        backToMenu();
    } else if (filterActionSelection == "x") {
        filterListInit();
        backToMenu();
    } else if (filterActionSelection == "q") {
        alert('exit to menu');
        main();
    } else {
        alert('error data');                        // ошибка данных
        setFilters();
    }
};

function sortItems() {                             // Функция сортировать товары
    console.clear();

    let consoleOutputTableSort = [];                   // массив для вывода в консоль

    for (let key in allProducts) {
        let arrayProduct = [];
        if (checkProductFilter(key)) {
            arrayProduct.push(allProducts[key].category);
        	arrayProduct.push(allProducts[key].manufacturer);
        	arrayProduct.push(allProducts[key].price);
            arrayProduct.push(transformDate(allProducts[key].createdAtMS));
            arrayProduct.push(allProducts[key].createdAt);
        	consoleOutputTableSort.push(arrayProduct);
        };
    };

    let sortActionSelection = prompt("Please select an sort \na) Category \nb) Price \nc) Manufacturer \nd) Date \nx) in reverse order \nq) Exsit to menu").toLowerCase();

    if (sortActionSelection == "a") {
        consoleOutputTableSort.sort(function (a, b) {
            if (a[0] > b[0]) {return 1;}
            if (a[0] < b[0]) {return -1;}
            return 0;
        });
    } else if (sortActionSelection == "b") {
        consoleOutputTableSort.sort(function (a, b) {
            if (a[2] > b[2]) {return 1;}
            if (a[2] < b[2]) {return -1;}
            return 0;
        });
    } else if (sortActionSelection == "c") {
        consoleOutputTableSort.sort(function (a, b) {
            if (a[1] > b[1]) {return 1;}
            if (a[1] < b[1]) {return -1;}
            return 0;
        });
    } else if (sortActionSelection == "d") {
        consoleOutputTableSort.sort(function (a, b) {
            if (a[4] > b[4]) {return 1;}
            if (a[4] < b[4]) {return -1;}
            return 0;
        });
    } else if (sortActionSelection == "x") {
        consoleOutputTableSort.sort(function (a, b) {
            if (a[0] > a[0]) {return 1;}
            if (a[0] < a[0]) {return -1;}
            return 1;
        });
    } else if (sortActionSelection == "q") {
        main();
    }   else {
        alert('error data');                        // ошибка данных
        sortItems();
    }
    console.table(consoleOutputTableSort);
    main();
};

function exit() {                                  // Выход из программы
    alert('Exit from the program');
};
