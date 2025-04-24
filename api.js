const API_URL = 'http://localhost:27405/api';

const api = {
  // Função para login
  async login(email, senha) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });
    return await response.json();
  },

  // Função para registrar usuário
  async registerUser(nome, numero, email, senha) {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, numero, email, senha }),
    });
    return await response.json();
  },

  // Função para criar pet
  async createPet(petData, token) {
    const response = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });
    return await response.json();
  },

  // Função para buscar localização de uma coleira
  async searchColeira(coleiraId) {
    const response = await fetch(`${API_URL}/locations/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: coleiraId }),
    });
    return await response.json();
  },
};

export default api;