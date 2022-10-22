
const test = () => {
    const url = "https://europe-central2-silicon-reason-366309.cloudfunctions.net/psychoquiz";
    fetch(url, {
        method : "POST",
        body: JSON.stringify({
            "message": "Hello my friend"
        })
    }).then(
        response => response.json()
    ).then(
        json => console.log(json)
    );
}