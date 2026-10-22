/* ==========================================================================
   UNIFIT VALIDATORS UTIL - v4.0
   Validações de formulários, senhas, e-mails e dados de saúde.
   ========================================================================== */

window.UniFitValidators = {
  isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  validatePassword(password) {
    if (!password || typeof password !== "string") {
      return { isValid: false, message: "A senha não pode estar vazia." };
    }
    if (password.length < 6) {
      return { isValid: false, message: "A senha deve conter no mínimo 6 caracteres." };
    }
    return { isValid: true, message: "Senha válida." };
  },

  validateProfileData(data) {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Informe um nome válido com pelo menos 2 caracteres.");
    }
    if (!data.age || isNaN(data.age) || data.age < 12 || data.age > 100) {
      errors.push("Informe uma idade válida entre 12 e 100 anos.");
    }
    if (!data.weight || isNaN(data.weight) || data.weight < 30 || data.weight > 300) {
      errors.push("Informe um peso válido entre 30 kg e 300 kg.");
    }
    if (!data.height || isNaN(data.height) || data.height < 100 || data.height > 250) {
      errors.push("Informe uma altura válida entre 100 cm e 250 cm.");
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
