/* ==========================================================================
   UNIFIT MAIN APPLICATION CONTROLLER & ROUTER v4.0
   Controlador principal, navegação mobile/desktop, formulários de lesões múltiplas,
   montador de treino, checkout de assinatura, player interativo e painel admin.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar dados de demonstração caso esteja vazio
  UniFitAuth.initDemoUserIfEmpty();

  // Função Global de Toast Notifications
  window.showUniFitToast = function(message, type = "green") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: #4ADE80;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Sistema de Roteamento entre Seções (Desktop + Mobile Bottom Bar)
  window.showSection = function(sectionId) {
    const sections = document.querySelectorAll(".app-section");
    sections.forEach(s => s.classList.remove("active"));

    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Atualiza estado ativo dos links da navbar superior (Desktop)
      document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("onclick") && link.getAttribute("onclick").includes(sectionId)) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Atualiza estado ativo da barra inferior mobile (Bottom Bar)
      document.querySelectorAll(".mobile-nav-item").forEach(item => {
        if (item.getAttribute("onclick") && item.getAttribute("onclick").includes(sectionId)) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Dispara renderizadores específicos de cada seção
      if (sectionId === "dashboard-section") {
        renderDashboard();
        if (typeof initLeafletMap === 'function') setTimeout(() => initLeafletMap('dash-map'), 150);
      }
      if (sectionId === "landing-section") {
        if (typeof initLeafletMap === 'function') setTimeout(() => initLeafletMap('map'), 150);
      }
      if (sectionId === "map-section") {
        if (typeof initLeafletMap === 'function') setTimeout(() => initLeafletMap('sec-map'), 150);
      }
      if (sectionId === "workout-builder-section") renderWorkoutBuilderScreen();
      if (sectionId === "exercise-bank-section") renderExerciseBank();
      if (sectionId === "evolution-section") renderEvolutionSection();
      if (sectionId === "progress-section") renderProgressSection();
      if (sectionId === "profile-section") renderProfileSection();
      if (sectionId === "admin-section") renderAdminPanel();
    }
  };

  // Navbar Scroll Background Toggle
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  // Modal Open/Close Controls
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      const activeModals = document.querySelectorAll(".modal-overlay.active");
      if (activeModals.length === 0) {
        document.body.style.overflow = "";
      }
    }
  };

  // Close modals when clicking backdrop overlay
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        window.closeModal(overlay.id);
      }
    });
  });

  // Re-invalidate map sizes on orientation change or screen resize
  window.addEventListener("resize", () => {
    if (typeof initAllVisibleMaps === 'function') {
      initAllVisibleMaps();
    }
  });

  // --- ONBOARDING WIZARD HANDLER (COM LESÕES MÚLTIPLAS) ---
  let currentStep = 1;
  const onboardingData = {
    name: "", age: 25, gender: "Masculino", height: 175, weight: 72,
    experience: "Iniciante", goal: "Hipertrofia", daysPerWeek: 4,
    timePerWorkout: 60, location: "Academia", injuries: ["Nenhuma"]
  };

  window.nextStep = function(step) {
    if (step === 1) {
      onboardingData.name = document.getElementById("ob-name")?.value || "Atleta";
      onboardingData.age = parseInt(document.getElementById("ob-age")?.value) || 25;
      onboardingData.gender = document.getElementById("ob-gender")?.value || "Masculino";
      onboardingData.height = parseFloat(document.getElementById("ob-height")?.value) || 175;
      onboardingData.weight = parseFloat(document.getElementById("ob-weight")?.value) || 72;
    }

    if (step === 4) {
      renderOnboardingInjuriesCheckboxes();
    }

    document.querySelectorAll(".ob-step").forEach(el => el.style.display = "none");
    currentStep = step + 1;
    const nextEl = document.getElementById(`ob-step-${currentStep}`);
    if (nextEl) nextEl.style.display = "block";
  };

  window.prevStep = function(step) {
    document.querySelectorAll(".ob-step").forEach(el => el.style.display = "none");
    currentStep = step - 1;
    const prevEl = document.getElementById(`ob-step-${currentStep}`);
    if (prevEl) prevEl.style.display = "block";
  };

  window.selectOption = function(btnElement, key, value) {
    const parent = btnElement.parentElement;
    parent.querySelectorAll(".option-card-btn").forEach(b => b.classList.remove("selected"));
    btnElement.classList.add("selected");
    onboardingData[key] = value;
  };

  function renderOnboardingInjuriesCheckboxes() {
    const container = document.getElementById("ob-injuries-grid");
    if (!container) return;

    container.innerHTML = `
      <label class="injury-checkbox-card selected" onclick="toggleInjuryCheckboxUI(this, 'Nenhuma')">
        <input type="checkbox" value="Nenhuma" checked onchange="handleInjurySelectionChange()">
        <span>✅ Nenhuma Limitação</span>
      </label>
    ` + UniFitAlgorithm.SUPPORTED_INJURIES.map(inj => `
      <label class="injury-checkbox-card" onclick="toggleInjuryCheckboxUI(this, '${inj.id}')">
        <input type="checkbox" value="${inj.id}" onchange="handleInjurySelectionChange()">
        <span>${inj.icon} ${inj.label}</span>
      </label>
    `).join("");
  }

  window.toggleInjuryCheckboxUI = function(labelEl, injuryId) {
    const chk = labelEl.querySelector("input[type='checkbox']");
    if (chk) {
      if (injuryId === "Nenhuma" && chk.checked) {
        // Desmarca todas as outras
        document.querySelectorAll("#ob-injuries-grid input[type='checkbox']").forEach(c => {
          if (c.value !== "Nenhuma") {
            c.checked = false;
            c.closest(".injury-checkbox-card").classList.remove("selected");
          }
        });
      } else if (chk.checked) {
        // Desmarca "Nenhuma"
        const noneChk = document.querySelector("#ob-injuries-grid input[value='Nenhuma']");
        if (noneChk) {
          noneChk.checked = false;
          noneChk.closest(".injury-checkbox-card").classList.remove("selected");
        }
      }
      labelEl.classList.toggle("selected", chk.checked);
    }
  };

  window.handleInjurySelectionChange = function() {
    const selected = [];
    document.querySelectorAll("#ob-injuries-grid input[type='checkbox']:checked").forEach(c => {
      selected.push(c.value);
    });
    onboardingData.injuries = selected.length > 0 ? selected : ["Nenhuma"];
  };

  window.submitOnboarding = function() {
    // Coleta as lesões selecionadas
    const selectedInjuries = [];
    document.querySelectorAll("#ob-injuries-grid input[type='checkbox']:checked").forEach(c => {
      selectedInjuries.push(c.value);
    });
    onboardingData.injuries = selectedInjuries.length > 0 ? selectedInjuries : ["Nenhuma"];

    UniFitAuth.register(onboardingData);
    closeModal("onboarding-modal");
    showUniFitToast("🔥 Treino personalizado gerado com sucesso considerando todas as suas características!", "green");
    showSection("dashboard-section");
  };

  // --- DASHBOARD RENDERER (REVISÃO COMPLETA) ---
  function renderDashboard() {
    const user = UniFitAuth.getCurrentUser();
    if (!user) return;

    document.getElementById("dash-user-name").innerText = user.name.split(" ")[0];
    document.getElementById("dash-goal-text").innerText = user.goal;
    document.getElementById("dash-weight").innerText = `${user.weight} kg`;

    const bmiInfo = UniFitAlgorithm.calculateBMI(user.weight, user.height);
    document.getElementById("dash-bmi").innerText = `${bmiInfo.bmi} (${bmiInfo.category})`;

    const gData = UniFitGamification.getGamificationData();
    const lvlInfo = UniFitGamification.calculateLevel(gData.xp);

    document.getElementById("dash-level-title").innerText = `Nível ${lvlInfo.level} • ${lvlInfo.title}`;
    document.getElementById("dash-streak").innerText = `🔥 ${gData.streakDays} Dias`;
    document.getElementById("dash-xp-badge").innerText = `+${lvlInfo.nextLevelXp - lvlInfo.currentLevelXp} XP Próximo Nível`;

    const xpBar = document.getElementById("dash-xp-progress");
    if (xpBar) xpBar.style.width = `${lvlInfo.percentage}%`;

    // Renderizar contagem de lesões protegidas
    const injCountEl = document.getElementById("dash-injuries-count");
    if (injCountEl) {
      if (user.injuries && !user.injuries.includes("Nenhuma")) {
        injCountEl.innerText = `${user.injuries.length} Lesões Protegidas`;
      } else {
        injCountEl.innerText = "Sem Limitações (100%)";
      }
    }

    // Renderizar Card do Treino de Hoje em alto destaque
    const rawPlan = localStorage.getItem(UniFitAuth.STORAGE_KEYS.PLAN);
    if (rawPlan) {
      const plan = JSON.parse(rawPlan);
      const todayWorkout = plan.daysPlan[0];

      document.getElementById("today-workout-title").innerText = todayWorkout.title || todayWorkout.dayName;
      document.getElementById("today-ex-count").innerText = `${todayWorkout.exercises.length} Exercícios`;
      document.getElementById("today-est-time").innerText = `${todayWorkout.exercises.length * 10 + 10} - ${todayWorkout.exercises.length * 12 + 15} Min`;
      
      const muscleCategories = [...new Set(todayWorkout.exercises.map(e => e.category))].join(", ");
      document.getElementById("today-muscles").innerText = muscleCategories || "Corpo Todo";
      document.getElementById("today-split-name").innerText = plan.splitName;

      const listContainer = document.getElementById("today-workout-exercises-list");
      if (listContainer) {
        listContainer.innerHTML = todayWorkout.exercises.map(ex => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(30, 41, 59, 0.5); border-radius: 10px; margin-bottom: 0.6rem; border: 1px solid var(--border-color);">
            <div>
              <div style="font-weight: 600; color: #FFFFFF; font-size: 1rem;">${ex.name}</div>
              <div style="font-size: 0.82rem; color: #9CA3AF;">${ex.sets} Séries x ${ex.reps} reps | Carga Sugerida: <strong style="color:#4ADE80;">${ex.suggestedWeightKg}kg</strong></div>
            </div>
            <span class="badge badge-green">${ex.category}</span>
          </div>
        `).join("");
      }
    }

    // Renderizar Último Treino Realizado
    const historyList = JSON.parse(localStorage.getItem("unifit_history") || "[]");
    if (historyList.length > 0) {
      const last = historyList[0];
      document.getElementById("dash-last-date").innerText = new Date(last.date).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
      document.getElementById("dash-last-title").innerText = last.workoutTitle;
      document.getElementById("dash-last-duration").innerText = `⏱️ ${last.durationMinutes} min`;
      document.getElementById("dash-last-tonnage").innerText = `🏋️ ${last.totalTonnageKg.toLocaleString("pt-BR")} kg`;
      document.getElementById("dash-last-xp").innerText = `+${last.xpEarned} XP`;
    }
  }

  // --- MONTADOR DE TREINOS HANDLERS ---
  let tempBuilderExercises = [];

  function renderWorkoutBuilderScreen() {
    const customList = UniFitWorkoutBuilder.getCustomWorkouts();
    const container = document.getElementById("custom-workouts-list");
    if (!container) return;

    container.innerHTML = customList.map(w => `
      <div class="glass-card" style="padding: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <span class="badge badge-green">${w.objective || 'Hipertrofia'}</span>
            <h4 style="font-size: 1.2rem; margin-top: 0.25rem;">${w.title}</h4>
          </div>
          <button class="btn btn-primary btn-sm" onclick="startCustomWorkoutSession('${w.id}')">
            <i class="fa-solid fa-play"></i> Iniciar
          </button>
        </div>
        <div style="font-size: 0.85rem; color: #9CA3AF; margin-bottom: 1rem;">
          ${w.exercises.length} Exercícios: ${w.exercises.map(e => e.name).slice(0, 3).join(", ")}...
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-sm" onclick="duplicateCustomWorkout('${w.id}')"><i class="fa-solid fa-copy"></i> Duplicar</button>
          <button class="btn btn-secondary btn-sm" style="color: #EF4444;" onclick="deleteCustomWorkout('${w.id}')"><i class="fa-solid fa-trash"></i> Excluir</button>
        </div>
      </div>
    `).join("");
  }

  window.handleSaveCustomWorkout = function(e) {
    e.preventDefault();
    const title = document.getElementById("builder-title").value;
    const goal = document.getElementById("builder-goal").value;

    if (tempBuilderExercises.length === 0) {
      showUniFitToast("Adicione pelo menos 1 exercício ao treino!", "green");
      return;
    }

    const workoutObj = {
      id: document.getElementById("builder-workout-id").value || "custom_" + Date.now(),
      title,
      objective: goal,
      exercises: tempBuilderExercises
    };

    UniFitWorkoutBuilder.saveWorkout(workoutObj);
    showUniFitToast("Treino personalizado salvo com sucesso!", "green");
    
    // Limpa formulário
    document.getElementById("builder-title").value = "";
    tempBuilderExercises = [];
    renderBuilderSelectedExercisesList();
    renderWorkoutBuilderScreen();
  };

  window.openExerciseSelectorModal = function() {
    // Adiciona o primeiro exercício disponível por padrão para demonstração rápida
    const defaultEx = EXERCISES_DATABASE[0];
    tempBuilderExercises.push({
      id: defaultEx.id,
      name: defaultEx.name,
      category: defaultEx.category,
      sets: 4,
      reps: "8-12",
      suggestedWeightKg: 30,
      restSeconds: 60,
      equipment: defaultEx.equipment
    });
    renderBuilderSelectedExercisesList();
    showUniFitToast(`Exercício '${defaultEx.name}' adicionado!`, "green");
  };

  function renderBuilderSelectedExercisesList() {
    const listEl = document.getElementById("builder-selected-exercises-list");
    document.getElementById("builder-ex-count").innerText = tempBuilderExercises.length;
    if (!listEl) return;

    listEl.innerHTML = tempBuilderExercises.map((ex, idx) => `
      <div class="builder-exercise-card">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #FFFFFF;">${idx + 1}. ${ex.name}</strong>
          <button type="button" style="background: none; border: none; color: #EF4444; cursor: pointer;" onclick="removeBuilderExercise(${idx})"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.85rem;">
          <span>Séries: ${ex.sets}</span>
          <span>Reps: ${ex.reps}</span>
          <span>Carga: ${ex.suggestedWeightKg}kg</span>
        </div>
      </div>
    `).join("");
  }

  window.removeBuilderExercise = function(idx) {
    tempBuilderExercises.splice(idx, 1);
    renderBuilderSelectedExercisesList();
  };

  window.startCustomWorkoutSession = function(workoutId) {
    const w = UniFitWorkoutBuilder.getWorkoutById(workoutId);
    if (!w) return;
    workoutSessionInstance.startWorkout(w);
    renderWorkoutPlayerScreen();
    showSection("workout-player-section");
  };

  window.duplicateCustomWorkout = function(workoutId) {
    UniFitWorkoutBuilder.duplicateWorkout(workoutId);
    showUniFitToast("Treino duplicado com sucesso!", "green");
    renderWorkoutBuilderScreen();
  };

  window.deleteCustomWorkout = function(workoutId) {
    UniFitWorkoutBuilder.deleteWorkout(workoutId);
    showUniFitToast("Treino removido.", "green");
    renderWorkoutBuilderScreen();
  };

  // --- WORKOUT PLAYER HANDLER ---
  window.startTodayWorkoutSession = function() {
    const rawPlan = localStorage.getItem(UniFitAuth.STORAGE_KEYS.PLAN);
    if (!rawPlan) return;
    const plan = JSON.parse(rawPlan);
    const dayPlan = plan.daysPlan[0];

    workoutSessionInstance.startWorkout(dayPlan);
    renderWorkoutPlayerScreen();
    showSection("workout-player-section");
  };

  function renderWorkoutPlayerScreen() {
    const ex = workoutSessionInstance.getCurrentExercise();
    if (!ex) return;

    document.getElementById("player-ex-name").innerText = ex.name;
    document.getElementById("player-ex-category").innerText = ex.category;
    document.getElementById("player-ex-equipment").innerText = ex.equipment;
    document.getElementById("player-ex-visual").innerHTML = ex.svgIllustration || "";

    const instructionsEl = document.getElementById("player-ex-instructions");
    if (instructionsEl) {
      instructionsEl.innerHTML = ex.instructions ? ex.instructions.map(inst => `<li>${inst}</li>`).join("") : "<li>Execute o movimento com forma perfeita.</li>";
    }

    // Renderizar próximo exercício no banner
    const nextEx = workoutSessionInstance.getNextExercise();
    const nextBanner = document.getElementById("player-next-exercise-banner");
    if (nextBanner) {
      if (nextEx) {
        document.getElementById("player-next-ex-name").innerText = nextEx.name;
        document.getElementById("player-next-ex-cat").innerText = nextEx.category;
        nextBanner.style.display = "flex";
      } else {
        nextBanner.style.display = "none";
      }
    }

    // Renderizar tabela de séries
    const tbody = document.getElementById("player-sets-tbody");
    if (tbody) {
      tbody.innerHTML = ex.loggedSets.map((s, idx) => `
        <tr class="${s.completed ? 'completed' : ''}">
          <td style="font-weight: 700;">Série ${s.setNumber}</td>
          <td>
            <input type="number" class="form-control" style="width: 80px; padding: 0.4rem;" id="set-weight-${idx}" value="${s.weightKg}"> kg
          </td>
          <td>
            <input type="number" class="form-control" style="width: 80px; padding: 0.4rem;" id="set-reps-${idx}" value="${s.repsDone}"> reps
          </td>
          <td>
            <button class="btn btn-sm ${s.completed ? 'btn-primary' : 'btn-secondary'}" onclick="handleToggleSet(${idx})">
              ${s.completed ? '<i class="fa-solid fa-check"></i> Concluído' : 'Concluir'}
            </button>
          </td>
        </tr>
      `).join("");
    }

    updateWorkoutProgressBar();
  }

  window.handleToggleSet = function(setIdx) {
    const exIdx = workoutSessionInstance.currentExerciseIndex;
    const weightVal = document.getElementById(`set-weight-${setIdx}`)?.value;
    const repsVal = document.getElementById(`set-reps-${setIdx}`)?.value;

    const isCompleted = workoutSessionInstance.toggleSetCompletion(exIdx, setIdx, weightVal, repsVal);

    if (isCompleted) {
      startRestTimerVisual(workoutSessionInstance.timerTotalSeconds);
    }

    renderWorkoutPlayerScreen();
  };

  function startRestTimerVisual(seconds) {
    const timerBox = document.getElementById("player-rest-timer-box");
    if (timerBox) timerBox.style.display = "flex";

    const circleProgress = document.getElementById("timer-circle-progress");
    const circumference = 2 * Math.PI * 45;

    if (circleProgress) {
      circleProgress.style.strokeDasharray = circumference;
    }

    workoutSessionInstance.startRestTimer(seconds, (remaining, total) => {
      window.updateTimerDisplayUI(remaining, total);
    }, () => {
      showUniFitToast("⚡ Tempo de descanso finalizado! Próxima série!", "green");
      if (timerBox) timerBox.style.display = "none";
    });
  }

  window.updateTimerDisplayUI = function(remaining, total) {
    document.getElementById("timer-display-text").innerText = `${remaining}s`;
    const circleProgress = document.getElementById("timer-circle-progress");
    if (circleProgress) {
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (remaining / total) * circumference;
      circleProgress.style.strokeDashoffset = offset;
    }
  };

  window.nextExercise = function() {
    if (workoutSessionInstance.currentExerciseIndex < workoutSessionInstance.activeWorkout.exercises.length - 1) {
      workoutSessionInstance.currentExerciseIndex++;
      renderWorkoutPlayerScreen();
    }
  };

  window.prevExercise = function() {
    if (workoutSessionInstance.currentExerciseIndex > 0) {
      workoutSessionInstance.currentExerciseIndex--;
      renderWorkoutPlayerScreen();
    }
  };

  function updateWorkoutProgressBar() {
    const pct = workoutSessionInstance.calculateTotalProgress();
    const bar = document.getElementById("workout-session-progress-bar");
    if (bar) bar.style.width = `${pct}%`;
    document.getElementById("workout-session-progress-text").innerText = `${pct}% Concluído`;
  }

  window.finishCurrentWorkoutSession = function() {
    const result = workoutSessionInstance.finishWorkoutSession();
    if (result) {
      showUniFitToast(`🎉 TREINO CONCLUÍDO! +${result.xpEarned} XP GANHOS!`, "green");
      showSection("dashboard-section");
    }
  };

  // --- EXERCISE BANK BUSCA E FILTROS ---
  let activeCategoryFilter = "Todos";

  function renderExerciseBank() {
    const grid = document.getElementById("exercise-bank-grid");
    if (!grid) return;

    const query = (document.getElementById("ex-search-input")?.value || "").toLowerCase().trim();
    const equipFilter = document.getElementById("ex-equip-filter")?.value || "Todos";
    const levelFilter = document.getElementById("ex-level-filter")?.value || "Todos";

    let items = EXERCISES_DATABASE;

    if (activeCategoryFilter !== "Todos") {
      items = items.filter(ex => ex.category === activeCategoryFilter);
    }
    if (equipFilter !== "Todos") {
      items = items.filter(ex => ex.equipment === equipFilter);
    }
    if (levelFilter !== "Todos") {
      items = items.filter(ex => ex.level === levelFilter);
    }
    if (query) {
      items = items.filter(ex => ex.name.toLowerCase().includes(query) || ex.category.toLowerCase().includes(query));
    }

    grid.innerHTML = items.map(ex => `
      <div class="glass-card feature-card" onclick="openExerciseDetailModal('${ex.id}')">
        <div style="height: 130px; background: rgba(15,23,42,0.6); border-radius: 12px; display:flex; align-items:center; justify-content:center; margin-bottom: 1rem; border: 1px solid var(--border-color);">
          ${ex.svgIllustration}
        </div>
        <span class="badge badge-green" style="margin-bottom: 0.5rem;">${ex.category}</span>
        <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem;">${ex.name}</h3>
        <div style="font-size: 0.85rem; color: #9CA3AF;">Equipamento: ${ex.equipment} • Nível: ${ex.level}</div>
      </div>
    `).join("");
  }

  window.handleExerciseSearchFilter = function() {
    renderExerciseBank();
  };

  window.filterExerciseCategory = function(btnElement, catName) {
    activeCategoryFilter = catName;
    document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.remove("btn-primary"));
    document.querySelectorAll(".cat-filter-btn").forEach(b => b.classList.add("btn-secondary"));
    btnElement.classList.remove("btn-secondary");
    btnElement.classList.add("btn-primary");

    renderExerciseBank();
  };

  window.openExerciseDetailModal = function(exId) {
    const ex = EXERCISES_DATABASE.find(e => e.id === exId);
    if (!ex) return;

    document.getElementById("ex-modal-title").innerText = ex.name;
    document.getElementById("ex-modal-category").innerText = ex.category;
    document.getElementById("ex-modal-equipment").innerText = ex.equipment;
    document.getElementById("ex-modal-level").innerText = ex.level;
    document.getElementById("ex-modal-visual").innerHTML = ex.svgIllustration;
    document.getElementById("ex-modal-breathing").innerText = ex.breathing || "Respiração regular durante a execução.";

    document.getElementById("ex-modal-instructions").innerHTML = ex.instructions ? ex.instructions.map(i => `<li>${i}</li>`).join("") : "";
    document.getElementById("ex-modal-mistakes").innerHTML = ex.commonMistakes ? ex.commonMistakes.map(m => `<li>${m}</li>`).join("") : "";

    const altsContainer = document.getElementById("ex-modal-alternatives-list");
    if (altsContainer) {
      if (ex.alternatives && ex.alternatives.length > 0) {
        altsContainer.innerHTML = ex.alternatives.map(alt => `
          <button class="btn btn-secondary btn-sm" onclick="openExerciseDetailModal('${alt.id}')">🔄 ${alt.name}</button>
        `).join("");
      } else {
        altsContainer.innerHTML = "<span style='font-size:0.85rem; color:#9CA3AF;'>Sem alternativas diretas.</span>";
      }
    }

    openModal("exercise-detail-modal");
  };

  // --- EVOLUTION & MEASUREMENTS RENDERER ---
  function renderEvolutionSection() {
    UniFitEvolution.renderWeightChart("weightEvolutionChart");
    UniFitEvolution.renderVolumeChart("volumeEvolutionChart");

    const historyList = JSON.parse(localStorage.getItem("unifit_history") || "[]");
    const historyTbody = document.getElementById("workout-history-tbody");

    if (historyTbody) {
      historyTbody.innerHTML = historyList.map(h => `
        <tr>
          <td>${new Date(h.date).toLocaleDateString("pt-BR")}</td>
          <td style="font-weight:600; color:#FFFFFF;">${h.workoutTitle}</td>
          <td>${h.durationMinutes} min</td>
          <td>${h.totalTonnageKg.toLocaleString("pt-BR")} kg</td>
          <td><span class="badge badge-green">+${h.xpEarned} XP</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="showUniFitToast('Detalhes do treino registrados no histórico', 'green')">Ver Detalhes</button>
          </td>
        </tr>
      `).join("");
    }
  }

  window.handleSaveMeasurementForm = function(e) {
    e.preventDefault();
    const entry = {
      weight: document.getElementById('m-weight').value,
      arm: document.getElementById('m-arm').value,
      chest: document.getElementById('m-chest').value,
      waist: document.getElementById('m-waist').value
    };

    UniFitEvolution.addMeasurement(entry);
    showUniFitToast("Medidas registradas com sucesso!", "green");
    renderEvolutionSection();
  };

  // --- PROGRESS & GAMIFICATION RENDERER ---
  function renderProgressSection() {
    const gData = UniFitGamification.getGamificationData();
    const lvlInfo = UniFitGamification.calculateLevel(gData.xp);

    document.getElementById("gamification-level-title").innerText = `Nível ${lvlInfo.level} • ${lvlInfo.title}`;
    document.getElementById("gamification-xp-summary").innerText = `${gData.xp} XP Acumulados • Faltam ${lvlInfo.nextLevelXp - lvlInfo.currentLevelXp} XP para o próximo nível`;
    document.getElementById("gamification-xp-bar").style.width = `${lvlInfo.percentage}%`;

    const badges = UniFitGamification.getAllBadges();
    const badgesGrid = document.getElementById("gamification-badges-grid");

    if (badgesGrid) {
      badgesGrid.innerHTML = badges.map(b => {
        const isUnlocked = gData.unlockedBadges.includes(b.id);
        return `
          <div class="glass-card" style="padding: 1.5rem; opacity: ${isUnlocked ? '1' : '0.5'}; border-color: ${isUnlocked ? 'var(--primary-green)' : 'var(--border-color)'}">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">${b.icon}</div>
            <span class="badge ${isUnlocked ? 'badge-green' : 'badge-gray'}">${isUnlocked ? 'DESBLOQUEADO' : 'BLOQUEADO'}</span>
            <h4 style="margin-top: 0.5rem;">${b.title}</h4>
            <p style="color: #9CA3AF; font-size: 0.85rem; margin-top: 0.25rem;">${b.desc}</p>
          </div>
        `;
      }).join("");
    }
  }

  // --- USER PROFILE & INJURIES HANDLER ---
  function renderProfileSection() {
    const user = UniFitAuth.getCurrentUser();
    if (!user) return;

    document.getElementById("profile-name").value = user.name || "";
    document.getElementById("profile-age").value = user.age || 25;
    document.getElementById("profile-gender").value = user.gender || "Masculino";
    document.getElementById("profile-height").value = user.height || 175;
    document.getElementById("profile-weight").value = user.weight || 72;
    document.getElementById("profile-goal").value = user.goal || "Hipertrofia";
    document.getElementById("profile-exp").value = user.experience || "Intermediário";

    const sub = UniFitSubscription.getCurrentSubscription();
    document.getElementById("profile-plan-name").innerText = sub.planName;

    // Renderizar checkboxes de lesões múltiplas
    const container = document.getElementById("profile-injuries-checkboxes");
    if (container) {
      const activeInjuries = user.injuries || ["Nenhuma"];
      container.innerHTML = `
        <label class="injury-checkbox-card ${activeInjuries.includes('Nenhuma') ? 'selected' : ''}">
          <input type="checkbox" value="Nenhuma" ${activeInjuries.includes('Nenhuma') ? 'checked' : ''} onchange="handleProfileInjuryToggle(this)">
          <span>✅ Nenhuma Limitação</span>
        </label>
      ` + UniFitAlgorithm.SUPPORTED_INJURIES.map(inj => {
        const isChecked = activeInjuries.includes(inj.id);
        return `
          <label class="injury-checkbox-card ${isChecked ? 'selected' : ''}">
            <input type="checkbox" value="${inj.id}" ${isChecked ? 'checked' : ''} onchange="handleProfileInjuryToggle(this)">
            <span>${inj.icon} ${inj.label}</span>
          </label>
        `;
      }).join("");
    }
  }

  window.handleProfileInjuryToggle = function(chkEl) {
    const parentLabel = chkEl.closest(".injury-checkbox-card");
    if (chkEl.value === "Nenhuma" && chkEl.checked) {
      document.querySelectorAll("#profile-injuries-checkboxes input[type='checkbox']").forEach(c => {
        if (c.value !== "Nenhuma") {
          c.checked = false;
          c.closest(".injury-checkbox-card").classList.remove("selected");
        }
      });
    } else if (chkEl.checked) {
      const noneChk = document.querySelector("#profile-injuries-checkboxes input[value='Nenhuma']");
      if (noneChk) {
        noneChk.checked = false;
        noneChk.closest(".injury-checkbox-card").classList.remove("selected");
      }
    }
    parentLabel.classList.toggle("selected", chkEl.checked);
  };

  window.handleSaveProfileInjuries = function() {
    const selected = [];
    document.querySelectorAll("#profile-injuries-checkboxes input[type='checkbox']:checked").forEach(c => {
      selected.push(c.value);
    });

    const user = UniFitAuth.getCurrentUser();
    user.injuries = selected.length > 0 ? selected : ["Nenhuma"];
    UniFitAuth.updateUserProfile(user);

    showUniFitToast("Limitações atualizadas! Treino IA regenerado com proteção fisiológica.", "green");
    renderDashboard();
  };

  window.handleUpdateProfileForm = function(e) {
    e.preventDefault();
    const updated = {
      name: document.getElementById("profile-name").value,
      age: parseInt(document.getElementById("profile-age").value) || 25,
      gender: document.getElementById("profile-gender").value,
      height: parseFloat(document.getElementById("profile-height").value) || 175,
      weight: parseFloat(document.getElementById("profile-weight").value) || 72,
      goal: document.getElementById("profile-goal").value,
      experience: document.getElementById("profile-exp").value
    };

    UniFitAuth.updateUserProfile(updated);
    showUniFitToast("Perfil atualizado com sucesso!", "green");
    renderDashboard();
  };

  // --- CHECKOUT DE ASSINATURA HANDLERS ---
  let selectedPlanCheckout = "pro_elite";

  window.openCheckoutModal = function(planId) {
    selectedPlanCheckout = planId;
    const pixData = UniFitSubscription.processPixPayment(planId);
    
    document.getElementById("checkout-pix-qr").src = pixData.qrCodeUrl;
    document.getElementById("checkout-pix-code").innerText = pixData.pixPayload;

    openModal("checkout-modal");
  };

  window.selectPaymentMethod = function(method) {
    const pixBtn = document.getElementById("btn-pay-pix");
    const cardBtn = document.getElementById("btn-pay-card");
    const pixBox = document.getElementById("checkout-pix-container");
    const cardBox = document.getElementById("checkout-card-container");

    if (method === "Pix") {
      pixBtn.className = "btn btn-primary";
      cardBtn.className = "btn btn-secondary";
      pixBox.style.display = "block";
      cardBox.style.display = "none";
    } else {
      pixBtn.className = "btn btn-secondary";
      cardBtn.className = "btn btn-primary";
      pixBox.style.display = "none";
      cardBox.style.display = "block";
    }
  };

  window.copyPixCodeToClipboard = function() {
    const code = document.getElementById("checkout-pix-code").innerText;
    navigator.clipboard.writeText(code).then(() => {
      showUniFitToast("Código Pix Copia e Cola copiado!", "green");
    });
  };

  window.confirmPaymentCheckout = function(method = "Pix") {
    UniFitSubscription.confirmSubscription(selectedPlanCheckout, method);
    closeModal("checkout-modal");
    showUniFitToast("🎉 PAGAMENTO CONFIRMADO! ASSINATURA PRO ELITE ATIVA!", "green");
    renderProfileSection();
  };

  // --- ADMIN PANEL TABS HANDLER ---
  window.switchAdminTab = function(tabName) {
    document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));

    const btn = document.querySelector(`.admin-tab-btn[onclick*='${tabName}']`);
    const content = document.getElementById(`admin-tab-${tabName}`);

    if (btn) btn.classList.add("active");
    if (content) content.classList.add("active");
  };

  function renderAdminPanel() {
    const metrics = UniFitAdmin.getAdminMetrics();
    document.getElementById("admin-stat-users").innerText = metrics.totalUsers.toLocaleString("pt-BR");
    document.getElementById("admin-stat-active").innerText = metrics.activeWorkoutsToday.toLocaleString("pt-BR");
    document.getElementById("admin-stat-revenue").innerText = metrics.mrrRevenue;

    const users = UniFitAdmin.getMockUsers();
    const tbody = document.getElementById("admin-users-tbody");
    if (tbody) {
      tbody.innerHTML = users.map(u => `
        <tr>
          <td style="font-weight:600; color:#FFFFFF;">${u.name}</td>
          <td>${u.email}</td>
          <td><span class="badge badge-green">${u.plan}</span></td>
          <td><span class="badge ${u.status === 'Ativo' ? 'badge-green' : 'badge-gray'}">${u.status}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="handleToggleAdminUserStatus('${u.id}')">Alternar Status</button>
          </td>
        </tr>
      `).join("");
    }

    const exTbody = document.getElementById("admin-exercises-tbody");
    if (exTbody) {
      exTbody.innerHTML = EXERCISES_DATABASE.map(ex => `
        <tr>
          <td style="font-weight:600; color:#FFFFFF;">${ex.name}</td>
          <td><span class="badge badge-green">${ex.category}</span></td>
          <td>${ex.equipment}</td>
          <td>${ex.level}</td>
        </tr>
      `).join("");
    }
  }

  window.handleToggleAdminUserStatus = function(userId) {
    UniFitAdmin.toggleUserStatus(userId);
    showUniFitToast("Status do usuário atualizado.", "green");
    renderAdminPanel();
  };

  // --- AI CHATBOT HANDLER ---
  window.toggleAIChatWindow = function() {
    const chatWin = document.getElementById("ai-chat-window");
    if (chatWin) chatWin.classList.toggle("active");
  };

  window.sendAIChatMessage = function() {
    const input = document.getElementById("ai-chat-input");
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = "";

    const msgContainer = document.getElementById("ai-chat-messages-container");
    if (msgContainer) {
      msgContainer.innerHTML += `
        <div class="chat-bubble chat-bubble-user">${userText}</div>
      `;

      const aiReply = UniFitAIAssistant.getResponse(userText);

      setTimeout(() => {
        msgContainer.innerHTML += `
          <div class="chat-bubble chat-bubble-ai">${aiReply.replace(/\n/g, "<br/>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</div>
        `;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 400);
    }
  };

  window.sendQuickAIQuery = function(queryText) {
    const input = document.getElementById("ai-chat-input");
    if (input) {
      input.value = queryText;
      sendAIChatMessage();
    }
  };

  // Inicializar seção padrão
  showSection("landing-section");
});
