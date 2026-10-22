/* ==========================================================================
   UNIFIT FORMATTERS UTIL - v4.0
   Funções utilitárias reutilizáveis para formatação de dados no UniFit.
   ========================================================================== */

window.UniFitFormatters = {
  formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  },

  formatDateTime(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  },

  formatWeight(kg) {
    if (kg === null || kg === undefined || isNaN(kg)) return "0 kg";
    return `${parseFloat(kg).toFixed(1).replace(".", ",")} kg`;
  },

  formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  },

  formatSecondsToMinutes(seconds) {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  },

  formatDurationHuman(seconds) {
    if (!seconds || isNaN(seconds)) return "0 min";
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins > 0 ? `${hours}h ${remMins}min` : `${hours}h`;
  }
};
