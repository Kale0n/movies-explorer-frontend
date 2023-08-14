const BASE_URL = "https://api.bioskop.nomoredomains.rocks" 
const imageUrl = "https://api.nomoreparties.co"

function _getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token,
    }
}

function _checkResponse(res) {
    if (res.ok) {
        return res.json()
      }
      return Promise.reject(res)
}


function register (name, password, email)  {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, password, email})
      })
      .then(res => _checkResponse(res))
}

function authorize (email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => _checkResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data
      }
    })
};

function getContent (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    }) 
    .then(res => _checkResponse(res))
    .then(data => data)
}

function editProfile({name, email}) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: _getHeaders(),
        body: JSON.stringify({
          name: name,
          email: email
        })
    }).then(res => _checkResponse(res));
}

function saveMovie({ country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        id,
        nameRU,
        nameEN,
    }) {

    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: _getHeaders(),
        body: JSON.stringify( {
            country: country,
            director: director,
            duration: duration,
            year: year,
            description: description,
            image: `${imageUrl}${image.url}`,
            trailerLink: trailerLink,
            movieId: id,
            nameRU: nameRU,
            nameEN: nameEN,
            thumbnail: `${imageUrl}${image.url}`,
        })
    }).then(res => _checkResponse(res))
    .then(data => data.data)

}

function deleteMovie (movieId) {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: _getHeaders(),
    }).then(res => _checkResponse(res))
}


function getMovies()  {
    return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: _getHeaders(),   
    })
    .then(res => _checkResponse(res))
}

export {register, authorize, getContent, editProfile, saveMovie, deleteMovie, getMovies}