export {getData, postData, putData, deleteData};

async function getData(url) {
	return (await fetch(url)).json();
}

async function postData(url, waitingObject) {
	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(waitingObject)
	})
}

async function putData(url, waitingObject) {
	await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(waitingObject)
	})
}

async function deleteData(url) {
	await fetch(url, {
		method: 'DELETE',
	})
}