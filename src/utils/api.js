// frontend-react/src/utils/api.js
const API_BASE = 'http://localhost:8080/api';

export const apiPost = async (endpoint, body, contentType = 'application/json') => {
    const headers = { 'Content-Type': contentType };

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers,
        body: body instanceof Uint8Array ? body : JSON.stringify(body)  // handles PDF bytes
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

export const apiGet = async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};