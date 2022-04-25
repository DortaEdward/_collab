import axios from 'axios';
import {action, thunk} from 'easy-peasy';

const authBaseUrl = `${process.env.REACT_APP_API_URL}/auth`;
const userBaseUrl = `${process.env.REACT_APP_API_URL}/user`;

const authApi = axios.create({
  baseURL: authBaseUrl,
});

const userApi = axios.create({
  baseURL: userBaseUrl,
});


const user = {
  user:null,
  loading:null,
  error:null,

  // actions
  setUser: action((state,user) => {
    state.user = user;
  }),
  
  setLoading: action((state,loading) => {
    state.loading = loading;
  }),

  setError: action((state,error) => {
    state.error = error
  }),

  logout: action((state) => {
    state.user = null;
    delete localStorage.token;
  }),

  // thunks
  register: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const res = await authApi.post('/register',payload);
    } catch (error) {
      console.log(error.res.data);
      // actions.setError(error);
    }
    actions.setLoading(false);
  }),
  login: thunk(async (actions, payload) => {
    delete localStorage.token;
    actions.setLoading(true);
    actions.setError(null);
    try {
      const res = await authApi.post('/login',payload);
      if(res.status === 200){
        await localStorage.setItem('token', res.data.token);
      }
    } catch (error) {
      console.log(error.res.data);
    }
    actions.setLoading(false);
  }),

  getUserData: thunk(async (actions) => {
    actions.setLoading(true);
    actions.setError(null);
    try {
      const config = { headers: {authorization : `Bearer ${localStorage.getItem('token')}`}};
      const res = await userApi.get('/',config);
      if(res.status === 200){
        actions.setUser(res.data);
        
      }
    } catch (error) {
      console.log(error)
    }
    actions.setLoading(false);
  })
}

export default user;