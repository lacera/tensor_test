export function groupingMethod(data, method) {
    // здесь сортируем объект в зависимости от выбранного шаблона
    data.sort(function (a, b) {
        return (a[method] > b[method]) ? 1 : -1;
    });
}