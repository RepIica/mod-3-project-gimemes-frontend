class UserAdapter {
  getUser(id){
    return fetch(`http://10.39.110.217:3000/users/${id}`)
      .then(res => res.json())

  }
}
