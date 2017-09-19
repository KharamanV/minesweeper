import request from '.';

export const fethPresets = () => (
  request('/api/presets')
    .then(({ data }) => data)
);

export const revealSquare = (gameId, { x, y }) => (
  request.post(`/api/games/${gameId}/reveal`, { x, y })
);
