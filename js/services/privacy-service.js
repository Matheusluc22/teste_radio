/* ==========================================================================
   UNIFIT PRIVACY, LGPD & DATA EXPORT SERVICE v4.1
   Portabilidade de Dados (LGPD), Exportação de Treinos (PDF) e Histórico (CSV),
   Direito ao Esquecimento (Exclusão de Conta) e Gestão de Termos de Uso.
   ========================================================================== */

window.UniFitPrivacyService = {
  // EXPORTAÇÃO COMPLETA DE DADOS DO USUÁRIO (DIREITO À PORTABILIDADE - LGPD)
  exportAllUserDataJSON() {
    const user = window.UniFitAuth ? window.UniFitAuth.getCurrentUser() : null;
    const history = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : [];
    const measurements = window.UniFitStorage ? window.UniFitStorage.get("unifit_measurements", []) : [];
    const prs = window.UniFitStorage ? window.UniFitStorage.get("unifit_personal_records", {}) : {};

    const exportPackage = {
      exportDate: new Date().toISOString(),
      platform: "UniFit System v4.0",
      compliance: "LGPD - Lei nº 13.709/2018",
      userData: user,
      workoutHistory: history,
      bodyMeasurements: measurements,
      personalRecords: prs
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPackage, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `unifit_meus_dados_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (window.showUniFitToast) {
      window.showUniFitToast("📥 Dados exportados com sucesso em formato JSON (LGPD).", "green");
    }
  },

  // EXPORTAÇÃO DO HISTÓRICO DE TREINOS EM CSV (COMPATÍVEL COM EXCEL)
  exportHistoryToCSV() {
    const history = window.UniFitStorage ? window.UniFitStorage.get("unifit_history", []) : [];
    if (!history || history.length === 0) {
      if (window.showUniFitToast) window.showUniFitToast("Nenhum histórico disponível para exportação.", "red");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // UTF-8 BOM
    csvContent += "Data;Treino;Duração (min);Exercícios Concluídos;Tonelagem Total (kg);XP Ganho;Dificuldade\n";

    history.forEach(h => {
      const diff = h.feedback?.rating || "Normal";
      csvContent += `${h.date};"${h.workoutTitle}";${h.durationMinutes};${h.exercisesCompleted};${h.totalTonnageKg};${h.xpEarned};"${diff}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `unifit_historico_treinos_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    if (window.showUniFitToast) {
      window.showUniFitToast("📊 Histórico exportado com sucesso em CSV!", "green");
    }
  },

  // EXPORTAÇÃO DO TREINO EM PDF / FORMATO DE IMPRESSÃO
  exportWorkoutToPDF(workoutPlan) {
    if (!workoutPlan) {
      if (window.showUniFitToast) window.showUniFitToast("Nenhum treino selecionado para impressão/PDF.", "red");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Por favor, permita pop-ups para gerar a versão de impressão em PDF.");
      return;
    }

    let exercisesHTML = "";
    (workoutPlan.exercises || []).forEach((ex, idx) => {
      exercisesHTML += `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${ex.name}</strong></td>
          <td>${ex.category}</td>
          <td>${ex.sets} séries</td>
          <td>${ex.reps} reps</td>
          <td>${ex.suggestedWeightKg || 20} kg</td>
          <td>${ex.restSeconds || 60}s</td>
        </tr>
      `;
    });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ficha de Treino - ${workoutPlan.title || "UniFit"}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1E293B; }
          h1 { color: #166534; border-bottom: 2px solid #22C55E; padding-bottom: 8px; }
          .header-info { margin-bottom: 20px; font-size: 14px; color: #475569; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #CBD5E1; padding: 10px; text-align: left; }
          th { background-color: #F1F5F9; color: #0F172A; }
          .footer { margin-top: 30px; font-size: 12px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <h1>🏋️‍♂️ UniFit - Ficha de Treino Personalizada</h1>
        <div class="header-info">
          <p><strong>Ficha:</strong> ${workoutPlan.title || workoutPlan.dayName}</p>
          <p><strong>Tempo Estimado:</strong> ${workoutPlan.estimatedDurationText || "45 min"}</p>
          <p><strong>Data de Geração:</strong> ${new Date().toLocaleDateString("pt-BR")}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Exercício</th>
              <th>Grupo Muscular</th>
              <th>Séries</th>
              <th>Repetições</th>
              <th>Carga Sugerida</th>
              <th>Descanso</th>
            </tr>
          </thead>
          <tbody>
            ${exercisesHTML}
          </tbody>
        </table>

        <div class="footer">
          <p>Documento gerado automaticamente pela Plataforma de Treino Personalizado UniFit (v4.0).</p>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  },

  // SOLICITAÇÃO DE EXCLUSÃO DEFINITIVA DE CONTA (DIREITO AO ESQUECIMENTO - LGPD)
  deleteAccountAndData() {
    const confirmDelete = confirm("⚠️ ATENÇÃO: Esta ação irá excluir DEFINITIVAMENTE todos os seus dados, treinos, histórico e conquistas da plataforma UniFit conforme a LGPD.\n\nDeseja continuar?");
    
    if (!confirmDelete) return false;

    // Notifica backend se estiver conectado
    if (window.UniFitAPI) {
      window.UniFitAPI.delete('/users/me');
    }

    // Limpa todo o armazenamento local
    if (window.UniFitStorage) {
      window.UniFitStorage.clear();
    } else {
      localStorage.clear();
    }

    alert("Sua conta e seus dados pessoais foram completamente excluídos com sucesso.");
    window.location.reload();
    return true;
  }
};
