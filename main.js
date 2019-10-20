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

(function main() {
	productListConversion();						// Пересохранение списка продуктов с более удобным форматом даты
    filterListInit();                               // Инициализация фильтров

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

    for (let key in allProducts) {
        let arrayProduct = [];
        if (filtersProducts.category[key] == allProducts[key].category) {
        	if (filtersProducts.manufacturer[key] == allProducts[key].manufacturer){
        		if (allProducts[key].price <= filtersProducts.price.max && allProducts[key].price >= filtersProducts.price.min) {
        			if (allProducts[key].createdAtMS <= filtersProducts.createdAt.max && allProducts[key].createdAtMS >= filtersProducts.createdAt.min) {
        				arrayProduct.push(allProducts[key].category);
        				arrayProduct.push(allProducts[key].manufacturer);
        				arrayProduct.push(allProducts[key].price);
        				arrayProduct.push(transformDate(allProducts[key].createdAtMS));
        				consoleOutputTable.push(arrayProduct);
        			};
        		};
        	};
        };
    };

    console.table(consoleOutputTable);
     
};


function transformDate(dateMS) {
	let dataCreated = new Date(dateMS);
	return dataCreated.getDay() +'.'+ dataCreated.getMonth() +'.'+ dataCreated.getFullYear() +','+ dataCreated.getHours() +':'+ dataCreated.getMinutes() +':'+ dataCreated.getSeconds();
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
    alert('Set filters');
};

function sortItems() {                             // Функция сортировать товары
    alert('Sort items');
};

function exit() {                                  // Выход из программы
    alert('Exit from the program');
};




