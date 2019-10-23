// PROGRAM

let parseJson = JSON.parse(jsonProducts);           // переобразуем json в js и созраняем в переменную

const allProducts = [];

let filtersProducts = {
    category: [],
    manufacturer: [],
    price: {
        min: 0,
        max: 0
    },
    createdAt: {
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
    alert('View product list');

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
};

function transformDate(dateMS) {
	let dataCreated = new Date(dateMS);
	return dataCreated.getDay() +'.'+ dataCreated.getMonth() +'.'+ dataCreated.getFullYear() +','+ dataCreated.getHours() +':'+ dataCreated.getMinutes() +':'+ dataCreated.getSeconds();
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
	console.log(allProducts);
};

function filterListInit() {                       							// перечень фильтров продуктов
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

    filtersProducts.createdAt.min = Math.min(...dataListProducts);			// отбирает минимальную дату из dataListProducts и записывает ее в filtersProducts
    filtersProducts.createdAt.max = Math.max(...dataListProducts);			// отбирает максимальную дату из dataListProducts и записывает ее в filtersProducts
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
        
        alert('price');

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
        alert('data');
    } else if (filterActionSelection == "x") {
        alert('filter reset');
    } else if (filterActionSelection == "q") {
        alert('exit to menu');
        main();
    } else {
        alert('error data');                        // ошибка данных
        setFilters();
    }
};







function sortItems() {                             // Функция сортировать товары
    alert('Sort items');
};

function exit() {                                  // Выход из программы
    alert('Exit from the program');
};
