class UserController {
  renderSignup(){
    return `
      <div class="row signup">
        <div class="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1">
          <form id="signup-form">
            <fieldset>
              <label for="nameField">Name</label>
              <input type="text" id="nameField">
              <label for="usernameField">Username</label>
              <input type="text" id="usernameField">
              <label for="ageRangeField">Age Range</label>
              <select id="ageRangeField">
                <option value="0-13">0-13</option>
                <option value="14-17">14-17</option>
                <option value="18-23">18-23</option>
                <option value="24+">24+</option>
              </select>
              <label for="bioField">Short Bio</label>
              <textarea placeholder="I like pancakes and memes" id="bioField"></textarea>
              <!-- <div class="float-right">
                <input type="checkbox" id="confirmField">
                <label class="label-inline" for="confirmField">Send a copy to yourself</label>
              </div> -->
              <input class="button-primary" type="submit" value="Sign Me Up">
            </fieldset>
          </form>
        </div>
      </div>
    `
  }
  renderLogin(){
    return `<br><br><br>
      <div class="row login">
        <div class="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1">
          <form id="login-form">
            <fieldset>
              <label for="usernameField">Username</label>
              <input type="text" id="usernameField">
              <label for="passwordField">Password</label>
              <input type="text" id="passwordField" placeholder="learnlovecode">
              <input class="button-primary" type="submit" value="Log Me IN ALREADY!!">
            </fieldset>
          </form>
        </div>
      </div>
    `
  }
  getUser(){
    const obj = {}
    obj.name = document.querySelector('#nameField').value
    obj.username = document.querySelector('#usernameField').value
    const newUser = new User(obj)
    return newUser
  }

  getUserLogin(){
    const username = document.querySelector('#usernameField').value
    return username
  }

  renderUser(username,id){
    document.querySelector('#menu-name').querySelector('a').innerHTML = username
    document.querySelector('#menu-name').innerHTML += `
      <p style="color:transparent">${id}</p>
    `

  }

}
