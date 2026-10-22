/* ==========================================================================
   UNIFIT ACTIVE WORKOUT SESSION PLAYER, PRs & PROGRESSION v4.1
   Player interativo de treino com cronômetro de descanso, substituição dinâmica de exercícios,
   detecção de Recordes Pessoais (PRs), sugestão de sobrecarga progressiva e feedback pós-treino.
   ========================================================================== */

class WorkoutSessionManager {
  constructor() {
    this.activeWorkout = null;
    this.currentExerciseIndex = 0;
    this.workoutStartTime = null;
    this.timerInterval = null;
    this.timerSecondsRemaining = 0;
    this.timerTotalSeconds = 60;
  }

  startWorkout(dayPlan) {
    this.activeWorkout = JSON.parse(JSON.stringify(dayPlan));
    this.currentExerciseIndex = 0;
    this.workoutStartTime = Date.now();
    
    // Inicializa a estrutura de séries registradas para cada exercício
    this.activeWorkout.exercises.forEach((ex) => {
      ex.loggedSets = [];
      const numSets = ex.sets || 4;
      for (let i = 1; i <= numSets; i++) {
        ex.loggedSets.push({
          setNumber: i,
          targetReps: ex.reps || "8-12",
          weightKg: ex.suggestedWeightKg || 20,
          repsDone: parseInt(String(ex.reps).split("-")[0]) || 10,
          completed: false
        });
      }
    });

    return this.activeWorkout;
  }

  getCurrentExercise() {
    if (!this.activeWorkout || !this.activeWorkout.exercises) return null;
    return this.activeWorkout.exercises[this.currentExerciseIndex];
  }

  getNextExercise() {
    if (!this.activeWorkout || !this.activeWorkout.exercises) return null;
    if (this.currentExerciseIndex + 1 < this.activeWorkout.exercises.length) {
      return this.activeWorkout.exercises[this.currentExerciseIndex + 1];
    }
    return null;
  }

  // SUBSTITUIÇÃO DINÂMICA DE EXERCÍCIO
  swapExercise(exerciseIndex, newExercise) {
    if (!this.activeWorkout || !this.activeWorkout.exercises[exerciseIndex]) return false;
    
    const oldEx = this.activeWorkout.exercises[exerciseIndex];
    const numSets = oldEx.loggedSets ? oldEx.loggedSets.length : 4;

    const updatedExercise = {
      ...newExercise,
      sets: numSets,
      reps: oldEx.reps || "8-12",
      restSeconds: newExercise.restSeconds || oldEx.restSeconds || 60,
      suggestedWeightKg: newExercise.suggestedWeightKg || oldEx.suggestedWeightKg || 20,
      completed: false,
      loggedSets: []
    };

    for (let i = 1; i <= numSets; i++) {
      updatedExercise.loggedSets.push({
        setNumber: i,
        targetReps: updatedExercise.reps,
        weightKg: updatedExercise.suggestedWeightKg,
        repsDone: parseInt(String(updatedExercise.reps).split("-")[0]) || 10,
        completed: false
      });
    }

    this.activeWorkout.exercises[exerciseIndex] = updatedExercise;
    return true;
  }

  // REGISTRO DE SÉRIE E DETECÇÃO DE PR (RECORDES PESSOAIS)
  toggleSetCompletion(exerciseIndex, setIndex, weightKg, repsDone) {
    const ex = this.activeWorkout.exercises[exerciseIndex];
    if (!ex || !ex.loggedSets[setIndex]) return false;

    const targetSet = ex.loggedSets[setIndex];
    targetSet.completed = !targetSet.completed;
    targetSet.weightKg = parseFloat(weightKg) || targetSet.weightKg;
    targetSet.repsDone = parseInt(repsDone) || targetSet.repsDone;

    // Atualiza status de conclusão do exercício
    ex.completed = ex.loggedSets.every(s => s.completed);

    // Se a série foi concluída, verificar Recorde Pessoal (PR) e sobrecarga progressiva
    if (targetSet.completed) {
      this.checkAndRecordPRs(ex.id, ex.name, targetSet.weightKg, targetSet.repsDone);
      this.checkProgressiveOverload(ex);
      this.startRestTimer(ex.restSeconds || 60);
    }

    return targetSet.completed;
  }

  // RASTREADOR E COMEMORAÇÃO VISUAL DE RECORDES PESSOAIS (PRs)
  checkAndRecordPRs(exerciseId, exerciseName, weightKg, repsDone) {
    if (!exerciseId || !weightKg || !repsDone) return;

    const prKey = "unifit_personal_records";
    const rawPRs = window.UniFitStorage ? window.UniFitStorage.get(prKey, {}) : {};
    const existingPR = rawPRs[exerciseId] || { maxWeight: 0, bestSet: "", maxVolume: 0 };

    let isNewRecord = false;
    let recordMessage = "";

    if (weightKg > existingPR.maxWeight) {
      existingPR.maxWeight = weightKg;
      existingPR.bestSet = `${weightKg} kg × ${repsDone} reps`;
      isNewRecord = true;
      recordMessage = `🏆 NOVO RECORDE DE CARGA! ${exerciseName}: ${weightKg} kg`;
    }

    const currentVolume = weightKg * repsDone;
    if (currentVolume > (existingPR.maxVolume || 0)) {
      existingPR.maxVolume = currentVolume;
    }

    if (isNewRecord) {
      rawPRs[exerciseId] = existingPR;
      if (window.UniFitStorage) window.UniFitStorage.set(prKey, rawPRs);
      
      if (window.showUniFitToast) {
        window.showUniFitToast(recordMessage, "green");
      }
    }
  }

  // SUGESTÃO RESPONSAVEL DE SOBRECARGA PROGRESSIVA
  checkProgressiveOverload(exercise) {
    if (!exercise || !exercise.loggedSets) return;
    const allMaxReps = exercise.loggedSets.every(s => s.completed && s.repsDone >= 12);

    if (allMaxReps && window.showUniFitToast) {
      const currentWeight = exercise.loggedSets[0]?.weightKg || 20;
      const suggestedWeight = Math.round(currentWeight * 1.05 + 1); // +5% a +10% de incremento responsável
      window.showUniFitToast(`💡 Sugestão de Progressão: Na próxima sessão, tente ${suggestedWeight} kg com 8-10 reps!`, "green");
    }
  }

  addTenSecondsToRestTimer(onTickCallback) {
    this.timerSecondsRemaining += 10;
    this.timerTotalSeconds += 10;
    if (onTickCallback) {
      onTickCallback(this.timerSecondsRemaining, this.timerTotalSeconds);
    }
  }

  startRestTimer(seconds, onTickCallback, onCompleteCallback) {
    this.stopRestTimer();
    this.timerTotalSeconds = seconds;
    this.timerSecondsRemaining = seconds;

    if (onTickCallback) onTickCallback(this.timerSecondsRemaining, this.timerTotalSeconds);

    this.timerInterval = setInterval(() => {
      this.timerSecondsRemaining--;

      if (onTickCallback) {
        onTickCallback(this.timerSecondsRemaining, this.timerTotalSeconds);
      }

      if (this.timerSecondsRemaining <= 0) {
        this.stopRestTimer();
        this.playTimerChimeSound();
        if (onCompleteCallback) onCompleteCallback();
      }
    }, 1000);
  }

  stopRestTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  playTimerChimeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Erro no AudioContext:", e);
    }
  }

  calculateTotalProgress() {
    if (!this.activeWorkout || !this.activeWorkout.exercises) return 0;
    let totalSets = 0;
    let completedSets = 0;

    this.activeWorkout.exercises.forEach(ex => {
      ex.loggedSets.forEach(s => {
        totalSets++;
        if (s.completed) completedSets++;
      });
    });

    return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  }

  // FINALIZAÇÃO DE TREINO COM FEEDBACK PÓS-TREINO E ESCALA BORG (1-10)
  finishWorkoutSessionWithFeedback(feedbackData = {}) {
    if (!this.workoutStartTime) return null;

    const durationMinutes = Math.max(1, Math.round((Date.now() - this.workoutStartTime) / 60000));
    let totalTonnageKg = 0;
    let completedSetsCount = 0;

    this.activeWorkout.exercises.forEach(ex => {
      ex.loggedSets.forEach(s => {
        if (s.completed) {
          totalTonnageKg += (s.weightKg * s.repsDone);
          completedSetsCount++;
        }
      });
    });

    const xpEarned = 120 + (completedSetsCount * 15);

    const historyEntry = {
      id: "hist_" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      workoutTitle: this.activeWorkout.title || this.activeWorkout.dayName,
      durationMinutes,
      exercisesCompleted: this.activeWorkout.exercises.filter(ex => ex.completed).length,
      totalTonnageKg,
      xpEarned,
      feedback: {
        rating: feedbackData.rating || "Normal", // Muito Fácil, Fácil, Normal, Difícil, Muito Difícil
        perceivedExertion: feedbackData.perceivedExertion || 7, // Escala 1 a 10
        notes: feedbackData.notes || ""
      },
      details: this.activeWorkout.exercises.map(ex => ({
        name: ex.name,
        setsCompleted: ex.loggedSets.filter(s => s.completed).length,
        totalSets: ex.loggedSets.length,
        weightUsed: ex.loggedSets[0]?.weightKg || 0
      }))
    };

    // Salvar no histórico de treinos via UniFitStorage
    const historyList = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : [];
    historyList.unshift(historyEntry);
    if (window.UniFitStorage) window.UniFitStorage.set("unifit_history", historyList);

    // Enviar histórico para a API Node.js se estiver online
    if (window.UniFitAPI) {
      window.UniFitAPI.post('/workout-history', historyEntry);
    }

    // Conceder XP no motor de gamificação
    if (window.UniFitGamification) {
      window.UniFitGamification.addXP(xpEarned);
    }

    return historyEntry;
  }
}

const workoutSessionInstance = new WorkoutSessionManager();
window.workoutSessionInstance = workoutSessionInstance;
window.WorkoutSessionManager = WorkoutSessionManager;
