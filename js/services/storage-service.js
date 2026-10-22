/* ==========================================================================
   UNIFIT STORAGE SERVICE - v4.0
   Gerenciamento seguro de persistência local (LocalStorage) com tratamento de erros.
   ========================================================================== */

window.UniFitStorage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error(`[UniFitStorage] Erro ao ler a chave "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[UniFitStorage] Erro ao salvar a chave "${key}":`, e);
      if (window.showUniFitToast) {
        window.showUniFitToast("Espaço de armazenamento local esgotado ou desativado.", "red");
      }
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`[UniFitStorage] Erro ao remover a chave "${key}":`, e);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error("[UniFitStorage] Erro ao limpar armazenamento local:", e);
      return false;
    }
  }
};
