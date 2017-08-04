import axios from 'axios';

export const fetchGame = gameId => {
  return axios(`/api/games/${gameId}`);
};