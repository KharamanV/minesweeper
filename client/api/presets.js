import request from '.';

export const fethPresets = params => (
  request('/api/presets', { params })
    .then(({ data }) => data)
);

export const fethPreset = presetId => (
  request(`/api/presets/${presetId}`)
    .then(({ data }) => data)
);

export const editPreset = (presetId, preset) => (
  request.put(`/api/presets/${presetId}`, { preset })
    .then(({ data }) => data)
);

export const revealSquare = (gameId, { x, y }) => (
  request.post(`/api/games/${gameId}/reveal`, { x, y })
);
