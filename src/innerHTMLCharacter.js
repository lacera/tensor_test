export function innerHTMLCharacter(method, obj) {
    // здесь вставляем внутренности в enclosed-li (форматированный текст)
    if (method === 'firstName' || method === 'secondName') {
        if (method === 'secondName') {
            return obj.firstName + ' ' + '<b>' + obj.secondName + '</b>';
        }

        return '<b>' + obj.firstName + '</b> ' + obj.secondName;
    }
}