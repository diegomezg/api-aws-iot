var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();

const handleRegisterData = (db) => (req, res) => {
	const {
		distance,
		percentage
	} = req.query;
	if (percentage < $(ENV.LIMIT)) {
		const data = JSON.stringify({
			"serverId": 39353,
			"APIKey": "Xk37Jtc2RGy6x9W5SmYg",
			"Messages": [
				{
					"To": [
						{
							"emailAddress": '@gmail.com'
						}
					],
					"From": {
						"emailAddress": '@gmail.com'
					},
					"Subject": "Alerta de Agua",
					"TextBody": "El contenido de tu suministro de agua está por debajo del limite",
					"HtmlBody": ""
				}
			]
		});
		//var xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
			}
		});
		xhr.open("POST", "https://rrnnkzsf3eszmw6ya.stoplight-proxy.io/api/v1/email", true);
		xhr.withCredentials = true;
		xhr.setRequestHeader("content-type", "application/json");

		xhr.send(data);
	}
	if (!percentage || !distance) {
		return res.status(400).json("Campos obligatorios incompletos.");
	}

	const today = new Date()
	const newHour = today.getHours() - 5
	today.setHours(newHour);
	db("MEDICION")
		.insert({
			distance,
			percentage,
			"Timestamp": today,
		})
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) =>
			res.status(400).json(err + " .No se pudo registrar")
		);


};

module.exports = {
	handleRegisterData,
};
