export const Qs = (function() {
    var ns = {
        /**
         * Распознает строку параметров и записывает ее в виде объекта — ассоциативного массива
         * @param {string} url Строка с параметрами типа par=val&par2=val
         * @returns {Object} Ассоциативный массив
         */
        parse: url => {
            let u = (url || "").replace("#", "");
            let parts = u.split("&");
            let r = {};
            for (let i = 0; i < parts.length; i++) {
                let p = parts[i].split("=");
                if (p.length === 2) {
                    r[p[0]] = p[1];
                }
            }
            return r;
        },
        /**
         * Формируем строку параметров из объекта по названиям и значениям полей
         * @param {Object} Ассоциативный массив параметров
         * @returns {string} Строка параметров ?param1=value&param2=value
         */
        form: data => {
            let qs = "?";
            let parts = [];
            for (let i in data) {
                parts.push(i + "=" + data[i]);
            }
            qs += parts.join("&");
            return qs;
        }
    };
    return ns;
})();
