import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerplanning.firebaseio.com'
});

export default instance;