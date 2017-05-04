export function GroupingMethod(data, method) {
    var definedGroupingMethods = [
        'firstName',
        'secondName'
    ];

    this.data = data;

    // группировка по умолчанию, по первому известному методу, если у переданного в конструктор аргумента-метода false-значение
    this.method = hasDefinedGroupingMethod(method) ? method : definedGroupingMethods[0];
    this.tempHdrLbl = null;

    function hasDefinedGroupingMethod(method) { // существующий в текущей реализации набор методов
        return definedGroupingMethods.includes(method)
    }
}

// здесь сортируем объект в зависимости от выбранного шаблона
GroupingMethod.prototype.sorting = function() {
    var method = this.method;

    if (method === 'firstName' || method === 'secondName') {
        this.data.sort(function (a, b) {
            return (a[method] > b[method]) ? 1 : -1;
        });
    }
};

GroupingMethod.prototype.setHeader = function(dataUnit) {
    var method = this.method;

    if (method === 'firstName' || method === 'secondName') {
        if (this.tempHdrLbl === null) {
            this.tempHdrLbl = dataUnit[method].charAt(0);
        }

        if (this.tempHdrLbl !== dataUnit[method].charAt(0)) {
            this.tempHdrLbl = dataUnit[method].charAt(0);
            return true;
        }

        return false;
    }
};
