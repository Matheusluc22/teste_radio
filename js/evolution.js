/* ==========================================================================
   UNIFIT PHYSICAL EVOLUTION, CALENDAR & DETAILED HISTORY MODULE v4.1
   Chart.js com filtros por período (7d, 30d, 90d, 6m, 1y), acompanhamento de tonelagem,
   peso corporal, calendários de frequência de treinos e controle de streaks.
   ========================================================================== */

class UniFitEvolution {
  static getMeasurements() {
    if (window.UniFitStorage) {
      return window.UniFitStorage.get("unifit_measurements", [
        { date: "2026-06-01", weight: 79.0, arm: 37.0, chest: 100, waist: 84, hips: 98, legs: 58, calves: 37, bodyFat: 17.5 },
        { date: "2026-07-01", weight: 77.8, arm: 37.5, chest: 101, waist: 82, hips: 97, legs: 59, calves: 37.5, bodyFat: 16.2 },
        { date: "2026-08-01", weight: 76.5, arm: 38.2, chest: 102, waist: 80, hips: 96, legs: 60, calves: 38, bodyFat: 15.0 }
      ]);
    }
    const raw = localStorage.getItem("unifit_measurements");
    return raw ? JSON.parse(raw) : [];
  }

  static addMeasurement(entry) {
    const list = this.getMeasurements();
    const newEntry = {
      date: entry.date || new Date().toISOString().split("T")[0],
      weight: parseFloat(entry.weight) || 70,
      arm: parseFloat(entry.arm) || 0,
      chest: parseFloat(entry.chest) || 0,
      waist: parseFloat(entry.waist) || 0,
      hips: parseFloat(entry.hips) || 0,
      legs: parseFloat(entry.legs) || 0,
      calves: parseFloat(entry.calves) || 0,
      bodyFat: parseFloat(entry.bodyFat) || 0
    };

    list.push(newEntry);
    if (window.UniFitStorage) {
      window.UniFitStorage.set("unifit_measurements", list);
    } else {
      localStorage.setItem("unifit_measurements", JSON.stringify(list));
    }

    return list;
  }

  // AUXILIAR: FILTRO DE DADOS POR PERÍODO DE DIAS (7d, 30d, 90d, 180d, 365d)
  static filterDataByDays(list, daysCount = 30) {
    if (!list || list.length === 0) return [];
    if (daysCount >= 365) return list; // 1 ano traz tudo

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysCount);

    return list.filter(item => {
      const itemDate = new Date(item.date || item.completedAt || item.created_at);
      return !isNaN(itemDate.getTime()) && itemDate >= cutoffDate;
    });
  }

  // RENDERIZAÇÃO DO GRÁFICO DE PESO CORPORAL COM FILTRO DE PERÍODO
  static renderWeightChart(canvasId, daysCount = 30) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const allData = this.getMeasurements();
    const data = this.filterDataByDays(allData, daysCount);
    
    const labels = data.map(d => new Date(d.date).toLocaleDateString("pt-BR", { month: "short", day: "numeric" }));
    const weights = data.map(d => d.weight);

    if (window.unifitWeightChartInstance) {
      window.unifitWeightChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)");
    gradient.addColorStop(1, "rgba(34, 197, 94, 0.0)");

    window.unifitWeightChartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Peso Corporal (kg)",
          data: weights,
          borderColor: "#4ADE80",
          borderWidth: 3,
          backgroundColor: gradient,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#22C55E",
          pointBorderColor: "#FFFFFF",
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#4ADE80",
            bodyColor: "#FFFFFF",
            borderColor: "rgba(74, 222, 128, 0.3)",
            borderWidth: 1,
            padding: 12
          }
        },
        scales: {
          x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#9CA3AF" } },
          y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#9CA3AF" } }
        }
      }
    });
  }

  // RENDERIZAÇÃO DO GRÁFICO DE VOLUME/TONELAGEM COM FILTRO DE PERÍODO
  static renderVolumeChart(canvasId, daysCount = 30) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const rawHistory = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : JSON.parse(localStorage.getItem("unifit_history") || "[]");
    const filteredHistory = this.filterDataByDays(rawHistory, daysCount).reverse();
    if (filteredHistory.length === 0) return;

    const labels = filteredHistory.map(h => new Date(h.date).toLocaleDateString("pt-BR", { month: "short", day: "numeric" }));
    const tonnages = filteredHistory.map(h => h.totalTonnageKg);

    if (window.unifitVolumeChartInstance) {
      window.unifitVolumeChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    window.unifitVolumeChartInstance = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Volume Acumulado (kg)",
          data: tonnages,
          backgroundColor: "rgba(74, 222, 128, 0.7)",
          borderColor: "#4ADE80",
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#4ADE80",
            bodyColor: "#FFFFFF",
            padding: 10
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9CA3AF" } },
          y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#9CA3AF" } }
        }
      }
    });
  }

  // RENDERIZADOR DO CALENDÁRIO MENSAL DE FREQUÊNCIA E STREAKS
  static renderWorkoutCalendar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const history = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : JSON.parse(localStorage.getItem("unifit_history") || "[]");
    const workoutDates = new Set(history.map(h => h.date));

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthName = today.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

    let calendarHTML = `
      <div class="calendar-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h4 style="text-transform: capitalize; font-size: 1.1rem; color: #FFFFFF;"><i class="fa-regular fa-calendar-days" style="color: #4ADE80; margin-right: 8px;"></i> ${monthName}</h4>
        <span class="badge badge-green"><i class="fa-solid fa-fire"></i> ${history.length} Treinos Concluídos</span>
      </div>
      <div class="calendar-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center;">
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Dom</div>
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Seg</div>
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Ter</div>
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Qua</div>
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Qui</div>
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Sex</div>
        <div style="font-weight: 600; font-size: 0.75rem; color: #9CA3AF;">Sáb</div>
    `;

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isCompleted = workoutDates.has(dayStr);
      const isToday = day === today.getDate();

      let dayStyle = "background: rgba(30, 41, 59, 0.4); color: #9CA3AF; border-radius: 8px; padding: 10px 0; font-weight: 500;";
      let statusIcon = "";

      if (isCompleted) {
        dayStyle = "background: rgba(74, 222, 128, 0.2); border: 1px solid #4ADE80; color: #4ADE80; border-radius: 8px; padding: 10px 0; font-weight: 700;";
        statusIcon = `<i class="fa-solid fa-check" style="font-size: 0.7rem; display: block; margin-top: 2px;"></i>`;
      } else if (isToday) {
        dayStyle = "background: rgba(59, 130, 246, 0.2); border: 1px solid #3B82F6; color: #60A5FA; border-radius: 8px; padding: 10px 0; font-weight: 700;";
      }

      calendarHTML += `
        <div style="${dayStyle}">
          <div>${day}</div>
          ${statusIcon}
        </div>
      `;
    }

    calendarHTML += `</div>`;
    container.innerHTML = calendarHTML;
  }
}

window.UniFitEvolution = UniFitEvolution;
