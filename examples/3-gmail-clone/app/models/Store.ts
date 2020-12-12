import {makeAutoObservable} from 'mobx';
import {createContext} from 'react';
import {create} from 'apisauce';
import AsyncStorage from '@react-native-community/async-storage';
import {Email, User} from './models';

const DOMAIN = 'http://192.168.1.194:3000';
const LOGIN_KEY = 'loginToken';
const AVATAR_KEY = 'avatar';
const DEFAULT_AVATAR =
  'https://globalplatform.org/wp-content/uploads/2018/03/default-avatar.png';

const api = create({
  baseURL: 'http://192.168.1.194:3000',
  headers: {'Content-Type': 'application/json'},
});

class Store {
  isLoginSuccess: boolean | null = null;
  token: string = '';
  avatar: string = DEFAULT_AVATAR;
  emails: Email[] = [];
  checkedEmails: Email[] = [];
  isShowToolbar: boolean = false;
  emailContent: string = '';

  constructor() {
    makeAutoObservable(this);

    (async () => {
      try {
        const loginToken = await AsyncStorage.getItem(LOGIN_KEY);
        const avatar = await AsyncStorage.getItem(AVATAR_KEY);

        if (loginToken !== '') {
          this.isLoginSuccess = true;
          this.setAvatar(avatar || '');
          this.token = loginToken || '';
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }

  setLoginSuccess = (result: boolean | null) => {
    this.isLoginSuccess = result;
  };

  setAvatar = (avatar: string) => {
    this.avatar = avatar || DEFAULT_AVATAR;
  };

  login = async (email: string, password: string) => {
    const res = await api.post<User>('/login', {email, password});

    if (res.ok) {
      const user = res.data;
      this.setLoginSuccess(true);
      this.setAvatar(user?.avatar || '');
      this.token = user?.token || '';
      AsyncStorage.setItem(LOGIN_KEY, user?.token || '');
      AsyncStorage.setItem(AVATAR_KEY, user?.avatar || '');
    } else {
      this.setLoginSuccess(false);
    }
  };

  logout = () => {
    this.setLoginSuccess(null);
    this.setAvatar('');
    AsyncStorage.setItem(LOGIN_KEY, '');
    AsyncStorage.setItem(AVATAR_KEY, '');
  };

  setEmails = (emails: Email[]) => {
    this.emails = emails;
  };

  getEmails = async (category: string) => {
    const result = await fetch(`${DOMAIN}/${category}`);
    const emails = await result.json();
    this.emails = emails;
  };

  updateEmail = async (category: string, email: string) => {
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

  moveEmails = async (
    fromCategory: string,
    toCategory: string,
    emails: Email[],
  ) => {
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

  moveSelectedEmails = async (fromCategory: string, toCategory: string) => {
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

  toggleStar = async (category: string, emailId: string) => {
    this.emails = this.emails.map((email) => {
      if (email.id === emailId) {
        email.isStarred = !email.isStarred;
        this.updateEmail(category, email);
      }

      return email;
    });
  };

  setCheckedEmails = (emails: Email[]) => {
    this.checkedEmails = emails;
  };

  setShowToolbar = (data: boolean) => {
    this.isShowToolbar = data;
  };

  checkEmail = (emailId: string) => {
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

  setEmailContent = (data: string) => {
    this.emailContent = data;
  };
}

export const StoreContext = createContext<Store>(new Store());

export default Store;
