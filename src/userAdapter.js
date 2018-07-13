class UserAdapter {
  getUser(id){
    return fetch(`http://localhost:3000/users/${id}`)
      .then(res => res.json())
  }

  createUser(user){
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(`http://localhost:3000/users`,options)
      .then(res => {
        console.log(res);
        return res.json()
      })
  }
}
