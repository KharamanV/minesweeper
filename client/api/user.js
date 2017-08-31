/* eslint-disable import/prefer-default-export */
import request from '.';

export const fetchUser = () => request.get('/api/profile/');

export const updateUser = user => request.put('/api/profile/update', user);
