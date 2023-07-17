const url = "https://api.nomoreparties.co/beatfilm-movies";

function getMovies () {

    return fetch(url, {
        headers: {
        'Content-Type': 'application/json' 
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export default getMovies