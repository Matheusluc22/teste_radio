/* ==========================================================================
   UNIFIT AUTH SERVICE (FRONTEND INTEGRATION) v4.0
   Integração entre formulários de UI, UniFitAPI (Node.js) e UniFitStorage.
   ========================================================================== */

window.UniFitAuthService = {
  async login(email, password) {
    if (!email || !password) {
      return { success: false, error: "Por favor, preencha o e-mail e a senha." };
    }

    if (window.UniFitValidators && !window.UniFitValidators.isValidEmail(email)) {
      return { success: false, error: "Endereço de e-mail inválido." };
    }

    // Tentativa de autenticação via API REST Node.js
    const apiResult = await window.UniFitAPI.post('/auth/login', { email, password });

    if (apiResult.success && apiResult.data && apiResult.data.token) {
      window.UniFitAPI.setToken(apiResult.data.token);
      window.UniFitStorage.set('unifit_user', apiResult.data.user);
      return { success: true, user: apiResult.data.user, token: apiResult.data.token };
    }

    // Fallback local se a API estiver offline ou em modo simulação
    try {
      window.UniFitAuth.login(email, password);
      const currentUser = window.UniFitAuth.getCurrentUser();
      return { success: true, user: currentUser, isFallback: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async register(userData) {
    if (!userData || !userData.email) {
      return { success: false, error: "Dados de usuário inválidos." };
    }

    const apiResult = await window.UniFitAPI.post('/auth/register', userData);

    if (apiResult.success && apiResult.data && apiResult.data.token) {
      window.UniFitAPI.setToken(apiResult.data.token);
      window.UniFitStorage.set('unifit_user', apiResult.data.user);
      return { success: true, user: apiResult.data.user, token: apiResult.data.token };
    }

    // Fallback local
    try {
      window.UniFitAuth.register(userData);
      const currentUser = window.UniFitAuth.getCurrentUser();
      return { success: true, user: currentUser, isFallback: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async fetchProfile() {
    const apiResult = await window.UniFitAPI.get('/users/me');
    if (apiResult.success && apiResult.data && apiResult.data.profile) {
      return apiResult.data.profile;
    }
    return window.UniFitAuth.getCurrentUser();
  }
};
