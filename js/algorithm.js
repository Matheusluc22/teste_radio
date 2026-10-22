/* ==========================================================================
   UNIFIT INTELLIGENT WORKOUT ALGORITHM v4.1
   Geração de divisão semanal personalizada, cálculo dinâmico de volume,
   estimativa real de duração (30min - 90min), filtragem estrita de local/equipamentos
   e proteção de saúde articular sem fallbacks inseguros.
   ========================================================================== */

class UniFitAlgorithm {
  // Lista oficial de limitações/lesões suportadas
  static SUPPORTED_INJURIES = [
    { id: "Ombros", label: "Dores / Sensibilidade nos Ombros", icon: "⚠️" },
    { id: "Joelhos", label: "Dores / Sensibilidade nos Joelhos", icon: "🦵" },
    { id: "Coluna", label: "Dores na Coluna / Lombar", icon: "🦴" },
    { id: "Cotovelos", label: "Dores nos Cotovelos", icon: "💪" },
    { id: "Punhos", label: "Dores nos Punhos / Mãos", icon: "🖐️" },
    { id: "Quadril", label: "Dores no Quadril", icon: "🏃" },
    { id: "Tornozelos", label: "Dores nos Tornozelos / Pés", icon: "🦶" },
    { id: "Pescoco", label: "Dores no Pescoço / Cervical", icon: "👤" }
  ];

  static calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm) return { bmi: 22.0, category: "Normal" };
    const heightM = heightCm / 100;
    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
    let category = "Normal";
    if (bmi < 18.5) category = "Abaixo do peso";
    else if (bmi >= 18.5 && bmi < 24.9) category = "Peso Normal";
    else if (bmi >= 25 && bmi < 29.9) category = "Sobrepeso";
    else category = "Obesidade";
    return { bmi, category };
  }

  // Verifica se um exercício é contraindicado para as lesões relatadas pelo usuário
  static isExerciseSafeForInjuries(exercise, userInjuries = []) {
    if (!userInjuries || userInjuries.length === 0 || userInjuries.includes("Nenhuma")) {
      return { isSafe: true, reason: "" };
    }

    const exId = exercise.id;
    const name = exercise.name.toLowerCase();

    // Ombros
    if (userInjuries.includes("Ombros")) {
      if (exId === "desenvolvimento_halteres" && exercise.level === "Avançado") {
        return { isSafe: false, reason: "Desenvolvimento pesado de ombros pode comprimir a articulação acometida." };
      }
      if (name.includes("atrás do pescoço") || name.includes("desenvolvimento arnold") || name.includes("elevação frontal")) {
        return { isSafe: false, reason: "Movimentos com rotação ou alavancas extremas provocam estresse no manguito rotador." };
      }
    }

    // Joelhos
    if (userInjuries.includes("Joelhos")) {
      if (exId === "agachamento_livre_barra" || exId === "hiit_esteira" || exId === "afundo_halteres") {
        return { isSafe: false, reason: "Impacto ou alta compressão patelofemoral. Substituído preventivamente por exercícios de menor impacto." };
      }
    }

    // Coluna / Lombar
    if (userInjuries.includes("Coluna")) {
      if (exId === "remada_curvada_barra" || exId === "agachamento_livre_barra" || exId === "stiff_halteres" || exId === "levantamento_terra") {
        return { isSafe: false, reason: "Exercícios com carga axial sobre a coluna foram removidos para proteger seus discos intervertebrais." };
      }
    }

    // Cotovelos
    if (userInjuries.includes("Cotovelos")) {
      if (exId === "triceps_testa_barra_w" || exId === "triceps_paralelas") {
        return { isSafe: false, reason: "Extensões profundas de cotovelo causam grande momento de torque sobre os tendões." };
      }
    }

    // Punhos
    if (userInjuries.includes("Punhos")) {
      if (name.includes("barra reta") || exId === "flexao_braco") {
        return { isSafe: false, reason: "Flexão no chão e barras retas exigem hiperextensão de punho." };
      }
    }

    // Quadril
    if (userInjuries.includes("Quadril")) {
      if (exId === "agachamento_livre_barra" || exId === "elevacao_pelvica_barra") {
        return { isSafe: false, reason: "Grandes amplitudes de flexão de quadril com sobrecarga foram pausadas preventivamente." };
      }
    }

    return { isSafe: true, reason: "" };
  }

  // Estima a duração real em minutos com base no volume e descanso
  static estimateWorkoutDuration(exercises) {
    if (!exercises || exercises.length === 0) return 0;
    let totalSeconds = 0;
    exercises.forEach(ex => {
      const sets = ex.sets || 3;
      const rest = ex.restSeconds || 60;
      // 45 segundos de execução ativa por série
      const executionTime = sets * 45;
      const restTime = Math.max(0, sets - 1) * rest;
      const setupTime = 120; // 2 minutos de transição e ajuste de aparelho
      totalSeconds += executionTime + restTime + setupTime;
    });
    return Math.round(totalSeconds / 60);
  }

  static generateWorkoutPlan(userProfile) {
    const {
      name = "Atleta",
      weight = 70,
      height = 175,
      experience = "Intermediário",
      goal = "Hipertrofia",
      daysPerWeek = 4,
      timePerWorkout = 60,
      location = "Academia",
      injuries = []
    } = userProfile;

    const bmiData = this.calculateBMI(weight, height);

    // Ajuste de Séries, Repetições e Descanso com base no objetivo
    let repRange = "8 - 12";
    let setsPerExercise = 4;
    let restSeconds = 90;
    
    if (goal === "Hipertrofia") {
      repRange = experience === "Avançado" ? "6 - 10" : "8 - 12";
      restSeconds = 90;
      setsPerExercise = 4;
    } else if (goal === "Definição" || goal === "Emagrecimento") {
      repRange = "10 - 15";
      restSeconds = 60;
      setsPerExercise = 3;
    } else if (goal === "Força") {
      repRange = "4 - 6";
      restSeconds = 120;
      setsPerExercise = 4;
    }

    // Definir o limite máximo de exercícios por treino conforme a DURAÇÃO DISPONÍVEL
    const availableMins = parseInt(timePerWorkout) || 60;
    let maxExercisesPerWorkout = 5;
    if (availableMins <= 30) maxExercisesPerWorkout = 3;
    else if (availableMins <= 45) maxExercisesPerWorkout = 4;
    else if (availableMins <= 60) maxExercisesPerWorkout = 6;
    else maxExercisesPerWorkout = 7;

    // Divisão Semanal de Treinos
    let splitName = "AB 2x (Upper / Lower)";
    let daysStructure = [];
    const numDays = parseInt(daysPerWeek) || 4;

    if (numDays <= 2) {
      splitName = "Full Body 2x (Corpo Todo)";
      daysStructure = [
        { dayName: "Treino A", title: "Corpo Todo - Foco Força", focus: ["Peito", "Costas", "Pernas", "Ombros", "Abdômen"] },
        { dayName: "Treino B", title: "Corpo Todo - Foco Hipertrofia", focus: ["Pernas", "Glúteos", "Costas", "Peito", "Tríceps", "Bíceps"] }
      ];
    } else if (numDays === 3) {
      splitName = "ABC (Push / Pull / Legs - 3x)";
      daysStructure = [
        { dayName: "Treino A", title: "Push (Peito, Ombros e Tríceps)", focus: ["Peito", "Ombros", "Tríceps"] },
        { dayName: "Treino B", title: "Pull (Costas, Bíceps e Abdômen)", focus: ["Costas", "Bíceps", "Abdômen"] },
        { dayName: "Treino C", title: "Legs (Pernas Completo e Glúteos)", focus: ["Pernas", "Glúteos", "Posterior", "Panturrilha"] }
      ];
    } else if (numDays === 4) {
      splitName = "Upper / Lower 4x (Membros Superiores e Inferiores)";
      daysStructure = [
        { dayName: "Treino A", title: "Upper A (Peito, Costas, Ombros)", focus: ["Peito", "Costas", "Ombros"] },
        { dayName: "Treino B", title: "Lower A (Quadríceps e Glúteos)", focus: ["Pernas", "Glúteos", "Panturrilha"] },
        { dayName: "Treino C", title: "Upper B (Densidade & Braços)", focus: ["Costas", "Peito", "Bíceps", "Tríceps"] },
        { dayName: "Treino D", title: "Lower B (Posterior e Core)", focus: ["Posterior", "Panturrilha", "Abdômen"] }
      ];
    } else if (numDays === 5) {
      splitName = "ABCDE 5x (Divisão Específica por Músculo)";
      daysStructure = [
        { dayName: "Treino A", title: "Peito & Tríceps Focado", focus: ["Peito", "Tríceps"] },
        { dayName: "Treino B", title: "Costas & Bíceps Densidade", focus: ["Costas", "Bíceps"] },
        { dayName: "Treino C", title: "Quadríceps & Panturrilhas", focus: ["Pernas", "Panturrilha"] },
        { dayName: "Treino D", title: "Ombros & Trapézio", focus: ["Ombros", "Abdômen"] },
        { dayName: "Treino E", title: "Posterior de Coxa & Glúteos", focus: ["Posterior", "Glúteos", "Abdômen"] }
      ];
    } else {
      splitName = "Push / Pull / Legs 2x (6x por semana)";
      daysStructure = [
        { dayName: "Treino A", title: "Push A (Peito, Ombros, Tríceps)", focus: ["Peito", "Ombros", "Tríceps"] },
        { dayName: "Treino B", title: "Pull A (Costas, Bíceps, Abdômen)", focus: ["Costas", "Bíceps", "Abdômen"] },
        { dayName: "Treino C", title: "Legs A (Pernas Completo)", focus: ["Pernas", "Glúteos", "Posterior", "Panturrilha"] },
        { dayName: "Treino D", title: "Push B (Foco Ombros & Peito)", focus: ["Ombros", "Peito", "Tríceps"] },
        { dayName: "Treino E", title: "Pull B (Foco Espessura de Costas)", focus: ["Costas", "Bíceps", "Abdômen"] },
        { dayName: "Treino F", title: "Legs B (Foco Posterior & Glúteos)", focus: ["Posterior", "Glúteos", "Panturrilha"] }
      ];
    }

    const allExercises = window.EXERCISES_DATABASE || [];

    // Processamento dos treinos diários
    const daysPlan = daysStructure.map((day) => {
      let candidatePool = [];

      day.focus.forEach((categoryName) => {
        let pool = allExercises.filter(ex => ex.category === categoryName);

        // 1. FILTRO ESTRITO DE EQUIPAMENTOS / LOCAL DE TREINO
        if (location === "Casa") {
          pool = pool.filter(ex => ex.equipment === "Casa" || ex.equipment === "Peso Corporal");
        }

        // 2. FILTRO ESTRITO DE LESÕES / LIMITAÇÕES (Sem fallback inseguro!)
        const safePool = pool.filter(ex => {
          const check = this.isExerciseSafeForInjuries(ex, injuries);
          return check.isSafe;
        });

        // Adiciona exercícios seguros identificados
        if (safePool.length > 0) {
          candidatePool.push(...safePool.slice(0, 2));
        }
      });

      // Limitar a quantidade de exercícios conforme o tempo disponível do usuário
      const selectedExercises = candidatePool.slice(0, maxExercisesPerWorkout).map(ex => {
        let weightMult = 0.4;
        if (experience === "Intermediário") weightMult = 0.55;
        if (experience === "Avançado") weightMult = 0.8;

        if (ex.category === "Pernas") weightMult *= 1.3;
        if (ex.category === "Bíceps" || ex.category === "Tríceps") weightMult *= 0.35;

        const suggestedWeightKg = Math.round(weight * weightMult);

        return {
          ...ex,
          sets: setsPerExercise,
          reps: repRange,
          restSeconds: restSeconds,
          suggestedWeightKg: Math.max(5, suggestedWeightKg),
          completed: false
        };
      });

      // Cálculo preciso da DURAÇÃO ESTIMADA em minutos
      const estimatedMinutes = this.estimateWorkoutDuration(selectedExercises);

      return {
        dayName: day.dayName,
        title: day.title || day.focus.join(", "),
        estimatedMinutes,
        estimatedDurationText: `Tempo estimado: ${estimatedMinutes} minutos`,
        exercises: selectedExercises
      };
    });

    return {
      planId: "plan_" + Date.now(),
      generatedAt: new Date().toLocaleDateString("pt-BR"),
      userName: name,
      userBmi: bmiData,
      splitName,
      goal,
      experience,
      daysPlan,
      injuries: injuries,
      medicalDisclaimer: "Atenção: O sistema UniFit adapta sugestões com base nos seus relatos de sensibilidade física, porém NÃO realiza diagnósticos médicos e NÃO substitui a avaliação individualizada por um profissional de Educação Física, Médico Ortopedista ou Fisioterapeuta.",
      observations: [
        "Aumente as cargas gradualmente quando conseguir realizar a faixa máxima de repetições mantendo boa postura.",
        "Beba pelo menos 35ml de água por kg corporal ao longo do dia.",
        "Descanse de 48 a 72 horas antes de treinar novamente a mesma musculatura."
      ]
    };
  }
}

window.UniFitAlgorithm = UniFitAlgorithm;
