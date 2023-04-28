function submitForm(event) {
	event.preventDefault();
	const inputField = document.getElementById("query");
	const outputField = document.getElementById("answer");
	const query = inputField.value;
	const apiEndpoint = "https://auth.healthwise.net/oauth2/token";
	// Replace the above API endpoint with the actual endpoint of your medical AI API

	fetch(apiEndpoint, {
		method: "POST",
		body: JSON.stringify({ query }),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
	.then(response => response.json())
	.then(data => outputField.value = data.answer)
	.catch(error => console.error(error));
}
