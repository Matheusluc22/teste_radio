/* ==========================================================================
   UNIFIT GAMIFICATION & NOTIFICATION ENGINE v4.1
   Sistema de Nível, XP, Missões Semanais, Conquistas Ampliadas, Streaks
   e Gerenciamento de Notificações Configuráveis.
   ========================================================================== */

class UniFitGamification {
  static getGamificationData() {
    if (window.UniFitStorage) {
      return window.UniFitStorage.get("unifit_gamification", {
        xp: 350,
        streakDays: 4,
        maxStreakDays: 7,
        unlockedBadges: ["primeiro_passo"],
        weeklyGoalCompleted: 2,
        weeklyGoalTarget: 3
      });
    }
    const raw = localStorage.getItem("unifit_gamification");
    return raw ? JSON.parse(raw) : { xp: 350, streakDays: 4, unlockedBadges: ["primeiro_passo"] };
  }

  static saveGamificationData(data) {
    if (window.UniFitStorage) {
      window.UniFitStorage.set("unifit_gamification", data);
    } else {
      localStorage.setItem("unifit_gamification", JSON.stringify(data));
    }
  }

  static addXP(amount) {
    const data = this.getGamificationData();
    const oldLevel = this.calculateLevel(data.xp).level;
    data.xp += amount;
    const newLevel = this.calculateLevel(data.xp).level;

    this.saveGamificationData(data);

    if (newLevel > oldLevel) {
      if (window.showUniFitToast) {
        window.showUniFitToast(`🎉 PARABÉNS! VOCÊ SUBIU PARA O NÍVEL ${newLevel}!`, "green");
      }
      UniFitNotificationManager.addNotification("Novo Nível Alcançado!", `Você subiu para o Nível ${newLevel} no UniFit!`, "level");
    } else {
      if (window.showUniFitToast) {
        window.showUniFitToast(`+${amount} XP Ganhos no UniFit!`, "green");
      }
    }

    this.checkBadgesUnlock();
    return data;
  }

  static calculateLevel(xp) {
    const level = Math.floor(xp / 250) + 1;
    const currentLevelXp = xp % 250;
    const nextLevelXp = 250;
    const percentage = Math.round((currentLevelXp / nextLevelXp) * 100);

    let title = "Novato Fitness";
    if (level >= 5) title = "Bronze Atleta";
    if (level >= 10) title = "Prata Avançado";
    if (level >= 20) title = "Ouro Mestre";
    if (level >= 35) title = "Elite Gymshark";
    if (level >= 50) title = "Lenda UniFit";

    return { level, currentLevelXp, nextLevelXp, percentage, title };
  }

  // LISTA COMPLETA DE MISSÕES SEMANAIS ATIVAS
  static getWeeklyMissions() {
    const history = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : [];
    const completedCount = history.length;

    return [
      {
        id: "mission_3_workouts",
        title: "Consistência Semanal",
        desc: "Complete 3 treinos nesta semana",
        xpReward: 150,
        current: Math.min(3, completedCount),
        target: 3,
        completed: completedCount >= 3
      },
      {
        id: "mission_10k_tonnage",
        title: "Força de Titã",
        desc: "Movimentar 10.000 kg acumulados",
        xpReward: 200,
        current: Math.min(10000, history.reduce((acc, h) => acc + (h.totalTonnageKg || 0), 0)),
        target: 10000,
        completed: history.reduce((acc, h) => acc + (h.totalTonnageKg || 0), 0) >= 10000
      },
      {
        id: "mission_first_pr",
        title: "Quebrando Marcas",
        desc: "Bata seu 1º Recorde Pessoal de Carga",
        xpReward: 180,
        current: window.UniFitStorage && Object.keys(window.UniFitStorage.get("unifit_personal_records", {})).length > 0 ? 1 : 0,
        target: 1,
        completed: window.UniFitStorage && Object.keys(window.UniFitStorage.get("unifit_personal_records", {})).length > 0
      }
    ];
  }

  // CATALOGO DE CONQUISTAS E EMBLEMAS
  static getAllBadges() {
    return [
      { id: "primeiro_passo", title: "Primeiro Passo", desc: "Concluiu seu 1º treino no UniFit", icon: "🔥" },
      { id: "treinos_10", title: "Foco Contínuo", desc: "Completou 10 treinos no sistema", icon: "🧠" },
      { id: "treinos_50", title: "Viciado em Treino", desc: "Completou 50 treinos no sistema", icon: "⚡" },
      { id: "primeiro_recorde", title: "Superando Limites", desc: "Bateu seu primeiro recorde de carga", icon: "🏆" },
      { id: "streak_7", title: "Consistência de Aço", desc: "Manteve 7 dias de sequência", icon: "📅" },
      { id: "streak_30", title: "Lenda do Mês", desc: "Manteve 30 dias de sequência", icon: "👑" },
      { id: "lenda_academia", title: "Lenda da Academia", desc: "Alcançou o Nível 20 de Gamificação", icon: "🎖️" }
    ];
  }

  // VERIFICADOR DE DESBLOQUEIO DE CONQUISTAS
  static checkBadgesUnlock() {
    const data = this.getGamificationData();
    const history = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : [];
    const prs = window.UniFitStorage ? window.UniFitStorage.get("unifit_personal_records", {}) : {};

    const workoutsCount = history.length;
    const streakDays = data.streakDays || 0;
    const hasPR = Object.keys(prs).length > 0;
    const level = this.calculateLevel(data.xp).level;

    const toCheck = [
      { id: "primeiro_passo", condition: workoutsCount >= 1 },
      { id: "treinos_10", condition: workoutsCount >= 10 },
      { id: "treinos_50", condition: workoutsCount >= 50 },
      { id: "primeiro_recorde", condition: hasPR },
      { id: "streak_7", condition: streakDays >= 7 },
      { id: "streak_30", condition: streakDays >= 30 },
      { id: "lenda_academia", condition: level >= 20 }
    ];

    let updated = false;
    toCheck.forEach(item => {
      if (item.condition && !data.unlockedBadges.includes(item.id)) {
        data.unlockedBadges.push(item.id);
        updated = true;
        
        const badgeObj = this.getAllBadges().find(b => b.id === item.id);
        if (badgeObj) {
          if (window.showUniFitToast) {
            window.showUniFitToast(`🏅 CONQUISTA DESBLOQUEADA: ${badgeObj.title}!`, "green");
          }
          UniFitNotificationManager.addNotification("Nova Conquista Desbloqueada!", `Você ganhou o emblema "${badgeObj.title}"!`, "badge");
        }
      }
    });

    if (updated) {
      this.saveGamificationData(data);
    }
  }
}

// GERENCIADOR DE NOTIFICAÇÕES CONFIGURÁVEIS
class UniFitNotificationManager {
  static getNotifications() {
    if (window.UniFitStorage) {
      return window.UniFitStorage.get("unifit_notifications", [
        { id: "notif_1", title: "Treino de Hoje", message: "Seu treino de Peito & Tríceps está te esperando!", date: "Hoje", read: false, type: "reminder" },
        { id: "notif_2", title: "Sequência Mantida", message: "Você completou 4 dias consecutivos de treino!", date: "Ontem", read: true, type: "streak" }
      ]);
    }
    return [];
  }

  static addNotification(title, message, type = "info") {
    const list = this.getNotifications();
    const newNotif = {
      id: "notif_" + Date.now(),
      title,
      message,
      date: new Date().toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      read: false,
      type
    };

    list.unshift(newNotif);
    if (window.UniFitStorage) {
      window.UniFitStorage.set("unifit_notifications", list);
    }
    return newNotif;
  }
}

window.UniFitGamification = UniFitGamification;
window.UniFitNotificationManager = UniFitNotificationManager;
