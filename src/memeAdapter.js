class MemeAdapter {
  getMemes() {
    const baseURL = `http://localhost:3000/memes`
    return fetch(baseURL)
      .then(response => response.json());
  }

  getMeme(id) {
    const baseURL = `http://localhost:3000/memes/${id}`
    return fetch(baseURL)
      .then(response => response.json());
  }

  newMeme(gif) {
    const baseURL = `http://localhost:3000/memes/`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "memes":gif,
        "user_id": document.querySelector('#menu-name').querySelector('p').value
      })
    }
    return fetch(baseURL, options)
      .then(r => r.json())
  }

  editMeme(obj) {
    const baseURL = `http://localhost:3000/memes/${obj.id}`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
    return fetch(baseURL, options)
      .then(r => r.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
  }

  deleteMeme(id) {
    const baseURL = `http://localhost:3000/memes/${id}`
    const options = {
      method: 'DELETE'
    }
    return fetch(baseURL,options)
      .then(r => r.json())
  }

}
