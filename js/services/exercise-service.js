/* ==========================================================================
   UNIFIT EXERCISE SERVICE - v4.0
   Camada de serviço para consulta, busca e substituição de exercícios.
   ========================================================================== */

window.UniFitExerciseService = {
  getAll() {
    return window.EXERCISES_DATABASE || [];
  },

  getById(id) {
    if (!id) return null;
    return (window.EXERCISES_DATABASE || []).find(ex => ex.id === id) || null;
  },

  getByCategory(category) {
    if (!category || category === "Todos") return this.getAll();
    return (window.EXERCISES_DATABASE || []).filter(ex => ex.category === category);
  },

  search(term) {
    if (!term || !term.trim()) return this.getAll();
    const query = term.toLowerCase().trim();
    return (window.EXERCISES_DATABASE || []).filter(ex => 
      ex.name.toLowerCase().includes(query) ||
      ex.category.toLowerCase().includes(query) ||
      (ex.musclesWorkedList && ex.musclesWorkedList.some(m => m.toLowerCase().includes(query)))
    );
  },

  getAlternatives(exerciseId, userInjuries = [], userEquipment = "Academia") {
    const exercise = this.getById(exerciseId);
    if (!exercise) return [];

    let candidates = (window.EXERCISES_DATABASE || []).filter(ex => 
      ex.id !== exerciseId && (ex.category === exercise.category || (ex.secondaryMuscles && ex.secondaryMuscles.some(m => exercise.secondaryMuscles.includes(m))))
    );

    // Filtra por equipamentos disponíveis se for Treino em Casa
    if (userEquipment === "Casa") {
      candidates = candidates.filter(ex => ex.equipment === "Casa" || ex.equipment === "Peso Corporal");
    }

    // Filtra por lesões/limitações ativas usando o algoritmo
    if (window.UniFitAlgorithm && userInjuries.length > 0) {
      candidates = candidates.filter(ex => {
        const check = window.UniFitAlgorithm.isExerciseSafeForInjuries(ex, userInjuries);
        return check.isSafe;
      });
    }

    return candidates;
  }
};
