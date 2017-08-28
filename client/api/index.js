import axios from 'axios';

const token = localStorage.getItem('jwt');

export const request = axios.create({
  headers: token ? { Authorization: token } : '',
});

export const request2 = axios.create({
  headers: token ? { Authorization: token } : '',
});
