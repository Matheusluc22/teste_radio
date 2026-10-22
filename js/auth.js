/* ==========================================================================
   UNIFIT AUTHENTICATION & USER PROFILE ENGINE
   Session persistence, JWT simulation, múltiplas lesões e integração de perfil
   ========================================================================== */

class UniFitAuth {
  static STORAGE_KEYS = {
    USER: "unifit_user",
    TOKEN: "unifit_token",
    PLAN: "unifit_workout_plan",
    HISTORY: "unifit_history",
    MEASUREMENTS: "unifit_measurements",
    GAMIFICATION: "unifit_gamification"
  };

  static initDemoUserIfEmpty() {
    if (!window.UniFitStorage.get(this.STORAGE_KEYS.USER)) {
      const demoUser = {
        name: "Carlos Eduardo",
        email: "carlos@unifit.com",
        age: 26,
        gender: "Masculino",
        height: 178,
        weight: 76.5,
        experience: "Intermediário",
        goal: "Hipertrofia",
        daysPerWeek: 4,
        timePerWorkout: 60,
        location: "Academia",
        injuries: ["Nenhuma"],
        plan: "Pro Elite",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        joinedDate: "2026-01-15"
      };

      const demoToken = btoa(JSON.stringify({ id: "usr_991823", email: demoUser.email, exp: Date.now() + 86400000 }));
      
      window.UniFitStorage.set(this.STORAGE_KEYS.USER, demoUser);
      window.UniFitStorage.set(this.STORAGE_KEYS.TOKEN, demoToken);

      // Gerar treino inteligente inicial para o usuário de demonstração
      const initialPlan = UniFitAlgorithm.generateWorkoutPlan(demoUser);
      window.UniFitStorage.set(this.STORAGE_KEYS.PLAN, initialPlan);

      // Histórico inicial
      const initialHistory = [
        {
          id: "hist_101",
          date: "2026-08-11",
          workoutTitle: "Treino A - Peito, Ombros e Tríceps",
          durationMinutes: 52,
          exercisesCompleted: 5,
          totalTonnageKg: 4200,
          xpEarned: 180
        },
        {
          id: "hist_102",
          date: "2026-08-09",
          workoutTitle: "Treino B - Costas, Bíceps e Abdômen",
          durationMinutes: 58,
          exercisesCompleted: 6,
          totalTonnageKg: 5100,
          xpEarned: 165
        }
      ];
      window.UniFitStorage.set(this.STORAGE_KEYS.HISTORY, initialHistory);

      // Medidas iniciais
      const initialMeasurements = [
        { date: "2026-06-01", weight: 79.0, arm: 37.0, chest: 100, waist: 84, hips: 98, legs: 58, calves: 37, bodyFat: 17.5 },
        { date: "2026-07-01", weight: 77.8, arm: 37.5, chest: 101, waist: 82, hips: 97, legs: 59, calves: 37.5, bodyFat: 16.2 },
        { date: "2026-08-01", weight: 76.5, arm: 38.2, chest: 102, waist: 80, hips: 96, legs: 60, calves: 38, bodyFat: 15.0 }
      ];
      window.UniFitStorage.set(this.STORAGE_KEYS.MEASUREMENTS, initialMeasurements);
    }
  }

  static getCurrentUser() {
    return window.UniFitStorage.get(this.STORAGE_KEYS.USER, null);
  }

  static isAuthenticated() {
    return !!window.UniFitStorage.get(this.STORAGE_KEYS.TOKEN, null);
  }

  static login(email, password) {
    if (!email || !password) {
      throw new Error("Por favor, preencha o e-mail e a senha.");
    }
    if (window.UniFitValidators && !window.UniFitValidators.isValidEmail(email)) {
      throw new Error("Por favor, informe um endereço de e-mail válido.");
    }
    const token = btoa(JSON.stringify({ email, time: Date.now() }));
    window.UniFitStorage.set(this.STORAGE_KEYS.TOKEN, token);
    return true;
  }

  static register(userData) {
    if (!userData.name) {
      userData.name = "Atleta UniFit";
    }
    if (!userData.email) {
      userData.email = "usuario@unifit.com";
    }
    if (!userData.injuries || userData.injuries.length === 0) {
      userData.injuries = ["Nenhuma"];
    }
    if (!userData.plan) {
      userData.plan = "Pro Elite";
    }

    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(userData));
    const token = btoa(JSON.stringify({ email: userData.email, time: Date.now() }));
    localStorage.setItem(this.STORAGE_KEYS.TOKEN, token);

    // Gerar plano de treino por IA com base em todas as características e lesões informadas
    const newPlan = UniFitAlgorithm.generateWorkoutPlan(userData);
    localStorage.setItem(this.STORAGE_KEYS.PLAN, JSON.stringify(newPlan));

    return newPlan;
  }

  static updateUserProfile(updatedData) {
    const current = this.getCurrentUser() || {};
    const merged = { ...current, ...updatedData };
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(merged));

    // Regenerar plano caso dados biológicos ou lesões tenham sido alterados
    const newPlan = UniFitAlgorithm.generateWorkoutPlan(merged);
    localStorage.setItem(this.STORAGE_KEYS.PLAN, JSON.stringify(newPlan));

    return merged;
  }

  static logout() {
    localStorage.removeItem(this.STORAGE_KEYS.TOKEN);
    window.location.reload();
  }
}
