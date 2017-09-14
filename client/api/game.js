import request from '.';

export const fetchGame = gameId => (
  request(`/api/games/${gameId}`)
    .then(({ data }) => data)
);
export const revealSquare = (gameId, { x, y }) => request.post(`/api/games/${gameId}/reveal`, { x, y });
