import {makeAutoObservable, runInAction} from 'mobx';
import {createContext} from 'react';
import {create} from 'apisauce';
import AsyncStorage from '@react-native-community/async-storage';
import {Email, User} from './models';

const LOGIN_KEY = 'loginToken';
const AVATAR_KEY = 'avatar';
const DEFAULT_AVATAR =
  'https://globalplatform.org/wp-content/uploads/2018/03/default-avatar.png';

// https://github.com/infinitered/apisauce
const api = create({
  baseURL: 'http://localhost:3000',
  headers: {'Content-Type': 'application/json'},
});

class Store {
  isCheckingLoggedIn: boolean = true;
  isLoginSuccess: boolean | null = null;
  isLoading: boolean = false;
  token: string = '';
  avatar: string = DEFAULT_AVATAR;
  emails: Email[] = [];
  checkedEmailIds: number[] = [];
  isShowToolbar: boolean = false;
  emailContent: string = '';

  constructor() {
    // https://mobx.js.org/observable-state.html
    makeAutoObservable(this);

    // Add authorization request header
    api.addRequestTransform((request) => {
      if (this.token) {
        request.headers.Authorization = 'Bearer ' + this.token;
      }
    });

    // Handle unauthorized request
    api.addResponseTransform((response) => {
      if (response.data === 'Unauthorized') {
        this.logout();
      }
    });

    // Check user logged in
    (async () => {
      try {
        const loginToken = await AsyncStorage.getItem(LOGIN_KEY);
        const avatar = await AsyncStorage.getItem(AVATAR_KEY);

        if (loginToken) {
          this.setLoginSuccess(true);
          this.setAvatar(avatar);
          this.setToken(loginToken);
        }
      } catch (e) {
        console.log(e);
      }

      // https://mobx.js.org/actions.html
      runInAction(() => (this.isCheckingLoggedIn = false));
    })();
  }

  setLoginSuccess = (result: boolean | null) => {
    this.isLoginSuccess = result;
  };

  setToken = (token: string | null | undefined) => {
    this.token = token || '';
  };

  setAvatar = (avatar: string | null | undefined) => {
    this.avatar = avatar || DEFAULT_AVATAR;
  };

  setShowToolbar = (data: boolean) => {
    this.isShowToolbar = data;
  };

  setEmails = (emails: Email[] | string | undefined) => {
    if (!Array.isArray(emails)) {
      emails = [];
    }
    this.emails = emails;
  };

  setCheckedEmailIds = (ids: number[]) => {
    this.checkedEmailIds = ids;
  };

  setEmailContent = (data: string) => {
    this.emailContent = data;
  };

  login = async (email: string, password: string) => {
    const res = await api.post<User>('/login', {email, password});

    if (res.ok) {
      const user = res.data;
      this.setLoginSuccess(true);
      this.setAvatar(user?.avatar);
      this.setToken(user?.token);
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

  getEmails = async (category: string) => {
    runInAction(() => (this.isLoading = true));

    const res = await api.get<Email[] | string>(`/${category}`);

    if (res.ok) {
      this.setEmails(res.data);
    }

    runInAction(() => (this.isLoading = false));
  };

  updateEmail = async (category: string, email: Email) => {
    const res = await api.put<Email>(`/${category}/${email.id}`, email);

    if (res.ok) {
      return res.data;
    }
  };

  moveEmails = async (
    fromCategory: string,
    toCategory: string,
    emails: Email[],
  ) => {
    const result = await Promise.all(
      emails.map((email) =>
        api.post(`/${toCategory}`, email).then(() => {
          api.delete(`/${fromCategory}/${email.id}`);
        }),
      ),
    );

    return result;
  };

  moveSelectedEmails = async (fromCategory: string, toCategory: string) => {
    let selectedEmails = [];
    let unselectedEmails = [];
    for (let item of this.emails) {
      if (this.checkedEmailIds.includes(item.id)) {
        selectedEmails.push(item);
      } else {
        unselectedEmails.push(item);
      }
    }

    await this.moveEmails(fromCategory, toCategory, selectedEmails);

    this.setEmails(unselectedEmails);
    this.setCheckedEmailIds([]);
    this.setShowToolbar(false);
  };

  toggleStar = async (category: string, emailId: number) => {
    this.emails = this.emails.map((email) => {
      if (email.id === emailId) {
        email.isStarred = !email.isStarred;
        this.updateEmail(category, email);
      }

      return email;
    });
  };

  checkEmail = (emailId: number) => {
    const indexOfCheckedEmail = this.checkedEmailIds.indexOf(emailId);

    if (indexOfCheckedEmail !== -1) {
      this.checkedEmailIds.splice(indexOfCheckedEmail, 1);
    } else {
      this.checkedEmailIds.push(emailId);
    }

    if (this.checkedEmailIds.length === 0) {
      this.setShowToolbar(false);
    } else {
      this.setShowToolbar(true);
    }
  };
}

export const StoreContext = createContext<Store>(new Store());

export default Store;
