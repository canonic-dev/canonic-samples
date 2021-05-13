const BASE_URL = "https://canonic-sprint-poker.staging.canonic.dev/api/";

export const AXIOS_CONFIG = {
  headers: {
    Authorization: '6034429aa795d6000894cfe6-4f9c379d-d4e7-4cf7-aa4b-e6ae4dffd9ca',
  },
};

export const CREATE_PARTICIPANT = `${BASE_URL}participants`;
export const UPDATE_PARTICIPANT = (id) => `${BASE_URL}participants/${id}`;

export const CREATE_SESSION = `${BASE_URL}sessions`;
export const GET_SESSION = (id) => `${BASE_URL}sessions/${id}`;
export const JOIN_SESSION = (id) => `${BASE_URL}sessions/${id}`;

export const CREATE_TICKET = `${BASE_URL}tickets`;
export const GET_TICKET = (id) => `${BASE_URL}tickets?session=${id}`;
export const UPDATE_TICKET = (id) => `${BASE_URL}tickets/${id}`;

export const GET_ALL_POINTS = `${BASE_URL}points`;
