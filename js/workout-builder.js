/* ==========================================================================
   UNIFIT CUSTOM WORKOUT BUILDER MODULE
   Criar, editar, reordenar, duplicar, excluir e executar treinos personalizados
   ========================================================================== */

class UniFitWorkoutBuilder {
  static STORAGE_KEY = "unifit_custom_workouts";

  static getCustomWorkouts() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    
    // Treinos padrões iniciais do usuário
    const defaultWorkouts = [
      {
        id: "custom_01",
        title: "Treino A — Peito, Ombros e Tríceps",
        objective: "Hipertrofia",
        targetMuscles: ["Peito", "Ombros", "Tríceps"],
        exercises: [
          { id: "supino_reto_barra", name: "Supino Reto com Barra", category: "Peito", sets: 4, reps: "8-12", suggestedWeightKg: 40, restSeconds: 90, equipment: "Barra" },
          { id: "supino_inclinado_halteres", name: "Supino Inclinado com Halteres", category: "Peito", sets: 3, reps: "10-12", suggestedWeightKg: 30, restSeconds: 90, equipment: "Halteres" },
          { id: "desenvolvimento_halteres", name: "Desenvolvimento de Ombros", category: "Ombros", sets: 3, reps: "10-12", suggestedWeightKg: 20, restSeconds: 60, equipment: "Halteres" },
          { id: "triceps_corda_polia", name: "Tríceps Corda na Polia", category: "Tríceps", sets: 3, reps: "12-15", suggestedWeightKg: 25, restSeconds: 60, equipment: "Polia" }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: "custom_02",
        title: "Treino B — Costas, Bíceps e Abdômen",
        objective: "Hipertrofia",
        targetMuscles: ["Costas", "Bíceps", "Abdômen"],
        exercises: [
          { id: "puxada_frente_polia", name: "Puxada Aberta na Polia", category: "Costas", sets: 4, reps: "8-12", suggestedWeightKg: 50, restSeconds: 90, equipment: "Máquina" },
          { id: "remada_baixa_polia", name: "Remada Baixa com Triângulo", category: "Costas", sets: 3, reps: "10-12", suggestedWeightKg: 45, restSeconds: 90, equipment: "Polia" },
          { id: "rosca_direta_barra_w", name: "Rosca Direta com Barra W", category: "Bíceps", sets: 3, reps: "10-12", suggestedWeightKg: 18, restSeconds: 60, equipment: "Barra" },
          { id: "infra_infra_paralelas", name: "Abdominal Infra nas Paralelas", category: "Abdômen", sets: 3, reps: "15", suggestedWeightKg: 0, restSeconds: 45, equipment: "Peso Corporal" }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultWorkouts));
    return defaultWorkouts;
  }

  static saveWorkout(workoutData) {
    const list = this.getCustomWorkouts();
    const existingIndex = list.findIndex(w => w.id === workoutData.id);

    if (existingIndex >= 0) {
      list[existingIndex] = { ...workoutData, updatedAt: new Date().toISOString() };
    } else {
      workoutData.id = workoutData.id || "custom_" + Date.now();
      workoutData.createdAt = new Date().toISOString();
      list.push(workoutData);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));

    // Atualiza também o treino ativo principal no localStorage se for o principal
    const userPlanRaw = localStorage.getItem(UniFitAuth.STORAGE_KEYS.PLAN);
    if (userPlanRaw) {
      const userPlan = JSON.parse(userPlanRaw);
      userPlan.daysPlan[0] = {
        dayName: workoutData.title,
        title: workoutData.title,
        exercises: workoutData.exercises
      };
      localStorage.setItem(UniFitAuth.STORAGE_KEYS.PLAN, JSON.stringify(userPlan));
    }

    return workoutData;
  }

  static duplicateWorkout(workoutId) {
    const list = this.getCustomWorkouts();
    const original = list.find(w => w.id === workoutId);
    if (!original) return null;

    const copy = JSON.parse(JSON.stringify(original));
    copy.id = "custom_" + Date.now();
    copy.title = `${original.title} (Cópia)`;
    copy.createdAt = new Date().toISOString();

    list.push(copy);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    return copy;
  }

  static deleteWorkout(workoutId) {
    let list = this.getCustomWorkouts();
    list = list.filter(w => w.id !== workoutId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    return true;
  }

  static getWorkoutById(workoutId) {
    const list = this.getCustomWorkouts();
    return list.find(w => w.id === workoutId) || null;
  }
}
