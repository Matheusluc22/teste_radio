/* ==========================================================================
   UNIFIT AI FITNESS ASSISTANT (CHATBOT ENGINE)
   Contextual fitness guidance, exercise substitutions & form advice in pt-BR
   ========================================================================== */

class UniFitAIAssistant {
  static getResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    if (q.includes("supino") || q.includes("melhorar supino")) {
      return "Para evoluir seu **Supino Reto**:\n1. **Retração Escapular**: Aduza e rebaixe as escápulas criando uma base sólida no banco.\n2. **Leg Drive**: Empurre os pés firmemente contra o chão durante a subida.\n3. **Trajetória**: Desça a barra na linha média do peito (esterno) e suba levemente em direção aos ombros.\n4. **Frequência**: Treine peito de 2x por semana com cargas progressivas.";
    }

    if (q.includes("substitui leg press") || q.includes("substituir leg press")) {
      return "Ótimas alternativas para o **Leg Press 45°**:\n• **Agachamento Goblet** com halter (excelente foco em quadríceps).\n• **Agachamento Hack** na máquina.\n• **Passada / Afundo** com halteres.\n• **Cadeira Extensora** para isolamento de quadríceps.";
    }

    if (q.includes("dois dias seguidos") || q.includes("treinar peito dois dias")) {
      return "⚠️ **Não é recomendado!** O músculo necessita de **48 a 72 horas** de descanso para reparar as microlesões provocadas pelo treino de hipertrofia. Treinar peito 2 dias seguidos pode gerar **overtraining** e estagnação de ganhos.";
    }

    if (q.includes("agachamento") || q.includes("executar agachamento")) {
      return "Dicas essenciais para o **Agachamento Livre**:\n1. Afaste os pés na largura dos ombros com as pontas levemente apontadas para fora (15°).\n2. Inicie projetando o quadril para trás antes de dobrar os joelhos.\n3. Mantenha os joelhos alinhados na direção dos pés (evite valgo dinâmico).\n4. Não curve a coluna na parte mais funda.";
    }

    if (q.includes("tempo") && q.includes("descansar") || q.includes("quanto tempo descansar")) {
      return "O tempo ideal de descanso entre séries depende do seu objetivo:\n• **Hipertrofia**: 60 a 90 segundos.\n• **Força Máxima (Cargas Pesadas)**: 2 a 3 minutos.\n• **Resistência / Emagrecimento**: 45 a 60 segundos.";
    }

    if (q.includes("proteina") || q.includes("dieta") || q.includes("comer")) {
      return "Para otimizar os seus resultados:\n• Consuma cerca de **1,6g a 2,2g de proteína por kg corporal** diariamente.\n• Divida o consumo proteico em 3 a 5 refeições ao longo do dia.\n• Beba no mínimo **35ml de água por kg** para manter a síntese proteica elevada.";
    }

    if (q.includes("olá") || q.includes("oi") || q.includes("ajuda")) {
      return "Olá! Sou o **Assistente IA do UniFit**. Como posso ajudar no seu treino hoje? Você pode me perguntar sobre técnica de exercícios, substituições, tempo de descanso ou nutrição!";
    }

    // Default intelligent fallback
    return `Com base na ciência do treinamento de força:\nPara o objetivo de **${userQuery}**, recomendo focar na execução com técnica perfeita, manter a progressão de cargas semanal e garantir a recuperação adequada com boa nutrição e sono de qualidade. Se precisar de uma substituição específica de exercício, me pergunte!`;
  }
}
