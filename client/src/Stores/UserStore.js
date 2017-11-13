import { extendObservable } from 'mobx';
import { userInfo } from 'os';
var axios = require('axios');

export default class UserStore {
  constructor(){
    extendObservable(this, {
      user: null,
      get retrieveUser() {
        return this.user
      }
    });
  }

  submitSignup(signupObj) {
    return new Promise((resolve, reject) => {
      axios.post('/signup', {
        firstName: signupObj.firstName,
        lastName: signupObj.lastName,
        email: signupObj.email,
        password: signupObj.password,
      }).then((res) => {
        console.log(res.data[0]);        
        this.user = res.data[0];
        console.log(this.user)
        resolve();
        });
        }
      )
    }

    submitLogin(a, b) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: a,
          password: b,
        }).then((res) => {
          if (res.data.success) {
            this.setState({
              currentUser: res.data
            });
          }
          resolve(res.data);
        });
      });
    }
  

  testDb(){
    return new Promise((resolve, reject) => {
    axios.post('/postcup', {
      cupcount: 3,
      userid: 2,
    }).then((res) => {
      if (res) {
        this.setState({
          data: res
        })
      } else {
        reject('Response undefined')
      }
      resolve(res);
    })
  })  
}

}