class MemeAdapter {
  getNotes() {
    const baseURL = `http://10.39.110.217:3000/memes`
    return fetch(baseURL)
      .then(response => response.json());
  }

  getNote(id) {
    const baseURL = `http://10.39.110.217:3000/memes/${id}`
    return fetch(baseURL)
      .then(response => response.json());
  }

  newNote(note) {
    const baseURL = `http://10.39.110.217:3000/memes/`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }
    return fetch(baseURL, options)
      .then(r => r.json())
  }

  editNote(obj) {
    const baseURL = `http://10.39.110.217:3000/memes/${obj.id}`
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

  deleteNote(id) {
    const baseURL = `http://10.39.110.217:3000/memes/${id}`
    const options = {
      method: 'DELETE'
    }
    return fetch(baseURL,options)
      .then(r => r.json())
  }

}
