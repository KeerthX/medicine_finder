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
			const storageField = document.getElementById("storageinfo");
			const ingestionField = document.getElementById("ingestiontype");
			const form = document.querySelector("form");
			form.addEventListener("submit", function (event) {
				event.preventDefault();
				const inputValue = inputField.value.toUpperCase(); // Convert input to uppercase
				if (inputValue === "") {
					contentField.value = "Enter a Medicine";
					dosageField.value = "";
					return;
				}
				const result = jsonData.find(
					(row) => row["medicine"].toUpperCase() === inputValue // Compare with uppercase values in sheet
				);
				if (result) {
					const datacol = JSON.parse(result["datacol"]);
					contentField.value = datacol.content;
					dosageField.value = datacol.dosage;
					storageField.value = datacol.storageinfo;
					ingestionField.value = datacol.ingestiontype;
				} else {
					contentField.value = "Invalid Medicine Entered";
					dosageField.value = "";
				}
			});
		};
		reader.readAsBinaryString(blob);
	});
