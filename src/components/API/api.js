import { Qs } from "./Qs";

export const API = (function () {
    var ns = {
        //config: { url: "https://api.green-api.com" },
        config: { url: "https://lingerie-shop.online/api" },
        getApiHost: () => {
            return ns.config.url;
        },
        getIDInstance: () => {
            return localStorage.getItem("idInstance");
        },
        getAPITokenInstance: () => {
            return localStorage.getItem("apiTokenInstance");
        },
        call: async (options) => {
            var data = {
                credentials: "include",
                method: options.method,
                headers: {
                    "Content-Type":  "application/json",
					"accept":        "*/*",
                }
            };
            if (["GET", "HEAD"].indexOf(options.method) === -1){
                data.body = options.data;
            }
            
            //alert("call: "+options.url);

            try {
                const x = await fetch(options.url, data);
                //console.log({"x": x, "method": options});
                const json = await x.json();
                return {"res_data": json, "err": "", "status": x.status};
            } catch (err) {
                //console.log({"catch err call": err, "method": options});
                return {"res_data": null, "err": err, "status": null};
            }
        },
        point: function (data, method, script) {
            let apiHost = ns.getApiHost();
            let qs = "";
            //Если метод GET, формируем строку параметров
            if (method === "GET") {
                qs = Qs.form(data);
				//console.log({"qs": qs});
            }
            
            return ns.call({
                //url: `${apiHost}/waInstance${idInstance}/${point}/${apiTokenInstance}/${qs}`,
                url: `${apiHost}/${script}`,
                method: method || "POST",
                data: FormData.prototype.isPrototypeOf(data)
                    ? data
                    : JSON.stringify(data),
            });
        },

        sendMessage: function (phone, textMessage) {
			let data = {"phone": phone, "message": textMessage, "id_instance": ns.getIDInstance(), "api_token_instance": ns.getAPITokenInstance()};
			return ns.point(data, "POST", "send_message.php");
        },

        ReceiveNotification: function () {
			let data = {"id_instance": ns.getIDInstance(), "api_token_instance": ns.getAPITokenInstance()};
			return ns.point(data, "POST", "receive_notification.php");
        },

        DeleteNotification: function (receiptId) {
			let data = {"receiptId": receiptId, "id_instance": ns.getIDInstance(), "api_token_instance": ns.getAPITokenInstance()};
			return ns.point(data, "POST", "delete_notification.php");
        },
		
    }; // ns
    return ns;
})();
