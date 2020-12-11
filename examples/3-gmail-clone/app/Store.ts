import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

const DOMAIN = 'http://192.168.1.105:3000';
const LOGIN_KEY = 'loginToken';
const AVATAR_KEY = 'avatar';

class Store {
  isLoginSuccess = null;
  token = '';
  avatar =
    'https://globalplatform.org/wp-content/uploads/2018/03/default-avatar.png';
  emails = [];
  checkedEmails = [];
  isShowToolbar = false;
  emailContent = '';

  constructor() {
    checkLogin = async () => {
      try {
        const loginToken = await AsyncStorage.getItem(LOGIN_KEY);
        const avatar = await AsyncStorage.getItem(AVATAR_KEY);

        if (loginToken !== '') {
          this.isLoginSuccess = true;
          this.avatar = avatar;
          this.token = loginToken;
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkLogin();
  }

  setLoginSuccess = (result) => {
    this.isLoginSuccess = result;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  login = async (email, password) => {
    const res = await fetch(`${DOMAIN}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (res.status === 200) {
      const user = await res.json();

      this.setLoginSuccess(true);
      this.setAvatar(user.avatar);
      this.token = user.token;
      AsyncStorage.setItem(LOGIN_KEY, user.token);
      AsyncStorage.setItem(AVATAR_KEY, user.avatar);
    } else {
      this.setLoginSuccess(false);
    }
  };

  logout = () => {
    this.setLoginSuccess(null);
    this.setAvatar(
      'https://globalplatform.org/wp-content/uploads/2018/03/default-avatar.png',
    );
    AsyncStorage.setItem(LOGIN_KEY, '');
    AsyncStorage.setItem(
      AVATAR_KEY,
      'https://globalplatform.org/wp-content/uploads/2018/03/default-avatar.png',
    );
  };

  setEmails = (emails) => {
    this.emails = emails;
  };

  getEmails = async (category) => {
    const result = await fetch(`${DOMAIN}/${category}`);
    const emails = await result.json();
    this.emails = emails;
  };

  updateEmail = async (category, email) => {
    const result = await fetch(`${DOMAIN}/${category}/${email.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      body: JSON.stringify(email),
    });

    if (result.status == 401) {
      this.logout();
    }

    return result;
  };

  moveEmails = async (fromCategory, toCategory, emails) => {
    const result = await Promise.all(
      emails.map((email) =>
        fetch(`${DOMAIN}/${toCategory}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          },
          body: JSON.stringify(email),
        }).then(() =>
          fetch(`${DOMAIN}/${fromCategory}/${email.id}`, {method: 'DELETE'}),
        ),
      ),
    );

    return result;
  };

  moveSelectedEmails = async (fromCategory, toCategory) => {
    let selectedEmails = [];
    let unselectedEmails = [];
    for (let item of this.emails) {
      if (this.checkedEmails.includes(item.id)) {
        selectedEmails.push(item);
      } else {
        unselectedEmails.push(item);
      }
    }

    await this.moveEmails(fromCategory, toCategory, selectedEmails);

    this.setEmails(unselectedEmails);
    this.setCheckedEmails([]);
    this.setShowToolbar(false);
  };

  toggleStar = async (category, emailId) => {
    this.emails = this.emails.map((email) => {
      if (email.id === emailId) {
        email.isStarred = !email.isStarred;
        this.updateEmail(category, email);
      }

      return email;
    });
  };

  setCheckedEmails = (emails) => {
    this.checkedEmails = emails;
  };

  setShowToolbar = (data) => {
    this.isShowToolbar = data;
  };

  checkEmail = (emailId) => {
    const indexOfCheckedEmail = this.checkedEmails.indexOf(emailId);

    if (indexOfCheckedEmail !== -1) {
      this.checkedEmails.splice(indexOfCheckedEmail, 1);
    } else {
      this.checkedEmails.push(emailId);
    }

    if (this.checkedEmails.length === 0) {
      this.setShowToolbar(false);
    } else {
      this.setShowToolbar(true);
    }
  };

  setEmailContent = (data) => {
    this.emailContent = data;
  };
}

// decorate(Store, {
//   isLoginSuccess: observable,
//   emails: observable,
//   checkedEmails: observable,
//   isShowToolbar: observable,
//   emailContent: observable,
//   setLoginSuccess: action,
//   avatar: observable,
//   setAvatar: action,
//   login: action,
//   logout: action,
//   setEmails: action,
//   getEmails: action,
//   updateEmail: action,
//   checkEmail: action,
//   setShowToolbar: action,
//   toggleStar: action,
//   moveEmails: action,
//   moveSelectedEmails: action,
//   setEmailContent: action,
// });

export default new Store();
