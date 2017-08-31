import request from '.';

export const fetchGame = presetId => request.post('/api/games/', { preset: presetId });
export const revealSquare = (gameId, { x, y }) => request.post(`/api/games/${gameId}/reveal`, { x, y });
