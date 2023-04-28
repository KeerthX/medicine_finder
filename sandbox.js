const dataUrl = "data.xlsx";
fetch(dataUrl)
	.then((response) => response.blob())
	.then((blob) => {
		const reader = new FileReader();
		reader.onload = function (e) {
			const data = e.target.result;
			const workbook = XLSX.read(data, { type: "binary" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);
			const inputField = document.getElementById("input-value");
			const contentField = document.getElementById("content");
			const dosageField = document.getElementById("dosage");
			const form = document.querySelector("form");
			form.addEventListener("submit", function (event) {
				event.preventDefault();
				const inputValue = inputField.value;
				const result = jsonData.find(
					(row) => row["medicine"] === inputValue
				);
				if (result) {
					const datacol = JSON.parse(result["datacol"]);
					contentField.value = datacol.content;
					dosageField.value = datacol.dosage;
				} else {
					contentField.value = "Medicine Not Found";
					dosageField.value = "";
				}
			});
		};
		reader.readAsBinaryString(blob);
	});