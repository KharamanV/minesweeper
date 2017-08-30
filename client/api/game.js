/* eslint-disable import/prefer-default-export */
import request from '.';

export const fetchGame = presetId => request.post('/api/games/', { preset: presetId });
