/* ==========================================================================
   UNIFIT EXERCISE DATABASE (REVISÃO COMPLETA & PROFISSIONAL)
   Biblioteca abrangente de exercícios com anatomia visual em SVG,
   instruções completas, respiração, erros comuns, dicas de segurança e alternativas.
   ========================================================================== */

const EXERCISES_DATABASE = [
  // ==========================================
  // PEITO (CHEST)
  // ==========================================
  {
    id: "supino_reto_barra",
    name: "Supino Reto com Barra",
    category: "Peito",
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Anterior"],
    equipment: "Barra",
    level: "Intermediário",
    movementType: "Composto",
    startingPosture: "Deitado em banco plano, pés firmes no chão, coluna preservando curvatura natural, escápulas aduzidas.",
    movement: "Descer a barra de forma controlada até o esterno e empurrar verticalmente sem travar os cotovelos.",
    breathing: "Inspirar na descida (fase excêntrica) e expirar na subida (fase concêntrica).",
    instructions: [
      "Deite-se no banco reto mantendo 5 pontos de apoio: cabeça, ombros, glúteos e ambos os pés.",
      "Segure a barra com pegada ligeiramente mais larga que a largura dos ombros.",
      "Remova a barra do suporte e posicione-a sobre a linha do peitoral.",
      "Desça a barra controladamente até encostar suavemente no terço médio do esterno.",
      "Empurre a barra estendendo os cotovelos até a posição inicial."
    ],
    commonMistakes: [
      "Elevar o quadril tirando os glúteos do banco (pontes excessivas).",
      "Bater a barra no peito usando o impacto para subir.",
      "Abrir os cotovelos em um ângulo de 90° em relação ao tronco (risco para o manguito rotador)."
    ],
    safetyTips: [
      "Mantenha cotovelos em 45° em relação ao tronco.",
      "Utilize anilhas de trava nas pontas da barra ou treine com um parceiro (spotter)."
    ],
    musclesWorkedList: ["Peitoral Maior (Porção Esternal)", "Tríceps Braquial", "Deltoide Anterior", "Serrátil Anterior"],
    variations: ["Supino Reto com Halteres", "Supino Reto na Máquina Articulada", "Supino Reto com Pegada Invertida"],
    alternatives: [
      { id: "supino_reto_halteres", name: "Supino Reto com Halteres" },
      { id: "crossover_polia", name: "Crossover na Polia Alta" }
    ],
    notes: "Exercício construtor fundamental de força e volume para a região peitoral.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="130" rx="12" fill="#0F172A"/>
      <!-- Banco -->
      <path d="M 30 95 L 170 95" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
      <path d="M 45 95 L 45 115 M 155 95 L 155 115" stroke="#475569" stroke-width="6"/>
      <!-- Boneco -->
      <circle cx="50" cy="72" r="10" fill="#94A3B8"/>
      <path d="M 60 78 L 135 78" stroke="#4ADE80" stroke-width="12" stroke-linecap="round"/> <!-- Peito destacado -->
      <path d="M 135 78 L 160 95" stroke="#94A3B8" stroke-width="8"/>
      <!-- Braços & Cotovelos -->
      <path d="M 85 78 L 70 52 L 100 52 M 85 78 L 100 52" stroke="#22C55E" stroke-width="5" stroke-linecap="round"/>
      <!-- Barra -->
      <line x1="10" y1="42" x2="190" y2="42" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>
      <rect x="25" y="32" width="12" height="20" rx="3" fill="#4ADE80"/>
      <rect x="163" y="32" width="12" height="20" rx="3" fill="#4ADE80"/>
      <!-- Seta Direção -->
      <path d="M 100 68 L 100 48" stroke="#4ADE80" stroke-width="3" stroke-dasharray="4,3" marker-end="url(#arrow)"/>
    </svg>`
  },
  {
    id: "supino_inclinado_halteres",
    name: "Supino Inclinado com Halteres",
    category: "Peito",
    secondaryMuscles: ["Deltoide Anterior", "Tríceps"],
    equipment: "Halteres",
    level: "Intermediário",
    movementType: "Composto",
    startingPosture: "Banco ajustado entre 30° e 45°. Pés firmes no chão, halteres apoiados nas coxas antes da subida.",
    movement: "Empurrar os halteres verticalmente unindo-os na linha do peitoral superior e descer controlando o peso.",
    breathing: "Inspirar ao descer os halteres e expirar no ponto máximo de extensão.",
    instructions: [
      "Ajuste a inclinação do banco em 30° (ângulos maiores reduzem a ação do peito e focam no ombro).",
      "Sente-se com um halter em cada coxa e use o impulso dos joelhos para posicioná-los na altura dos ombros.",
      "Mantenha as escápulas retrais e o peito estufado.",
      "Empurre os halteres para cima em arco suave até quase se tocarem no topo.",
      "Desça lentamente sentindo o alongamento do peitoral superior."
    ],
    commonMistakes: [
      "Inclinar o banco além de 45°, transformando o exercício em desenvolvimento de ombros.",
      "Bater os halteres ruidosamente no topo.",
      "Descer os halteres muito abaixo da linha das axilas gerando estresse articular."
    ],
    safetyTips: [
      "Mantenha os punhos neutros e alinhados com o antebraço.",
      "Se perder o controle da carga, solte os halteres lateralmente no chão."
    ],
    musclesWorkedList: ["Peitoral Maior (Porção Clavicular)", "Deltoide Anterior", "Tríceps Braquial"],
    variations: ["Supino Inclinado com Barra", "Supino Inclinado na Polia", "Supino Inclinado na Máquina"],
    alternatives: [
      { id: "crossover_polia", name: "Crossover na Polia Alta" },
      { id: "supino_reto_barra", name: "Supino Reto com Barra" }
    ],
    notes: "Essencial para desenvolver o volume e o preenchimento da porção superior do tórax.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="130" rx="12" fill="#0F172A"/>
      <!-- Banco Inclinado -->
      <path d="M 30 110 L 120 40 L 150 110" stroke="#334155" stroke-width="8" stroke-linecap="round"/>
      <!-- Boneco -->
      <circle cx="125" cy="30" r="10" fill="#94A3B8"/>
      <path d="M 115 42 L 75 75" stroke="#4ADE80" stroke-width="12" stroke-linecap="round"/>
      <!-- Halteres -->
      <circle cx="55" cy="35" r="8" fill="#FFFFFF"/>
      <circle cx="115" cy="15" r="8" fill="#FFFFFF"/>
      <line x1="55" y1="35" x2="75" y2="55" stroke="#4ADE80" stroke-width="4"/>
      <line x1="115" y1="15" x2="95" y2="40" stroke="#4ADE80" stroke-width="4"/>
    </svg>`
  },
  {
    id: "crossover_polia",
    name: "Crossover na Polia Alta",
    category: "Peito",
    secondaryMuscles: ["Deltoide Anterior", "Serrátil Anterior"],
    equipment: "Polia",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Em pé no centro do cross-over, um pé à frente para estabilidade, tronco sutilmente inclinado.",
    movement: "Trazer os puxadores para frente e para baixo até se cruzarem na linha média do quadril/umbigo.",
    breathing: "Expirar ao aduzir os braços (fechamento) e inspirar ao retornar controladamente.",
    instructions: [
      "Ajuste as polias na posição mais alta do aparelho.",
      "Segure os puxadores com a palma das mãos voltadas para frente e dê um passo à frente.",
      "Mantenha os cotovelos levemente flexionados durante todo o percurso.",
      "Traga os braços para frente e para baixo em arco até que as mãos se cruzem levemente.",
      "Contraia o peitoral por 1 segundo e retorne sentindo o alongamento muscular."
    ],
    commonMistakes: [
      "Usar o balanço do corpo para mover a carga.",
      "Dobrar e estender os cotovelos transformando o exercício em supino.",
      "Elevar os ombros na direção das orelhas."
    ],
    safetyTips: [
      "Selecione uma carga que permita manter a postura estável sem balançar o quadril."
    ],
    musclesWorkedList: ["Peitoral Maior (Porção Inferior e Esternal)", "Deltoide Anterior"],
    variations: ["Crossover na Polia Baixa", "Crossover na Polia Média", "Peck Deck (Voador)"],
    alternatives: [
      { id: "peck_deck_voador", name: "Peck Deck (Voador)" },
      { id: "flexao_braco", name: "Flexão de Braço (Push-Up)" }
    ],
    notes: "Excelente exercício de isolamento para desenhar o contorno inferior e medial do peitoral.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="130" rx="12" fill="#0F172A"/>
      <circle cx="100" cy="40" r="12" fill="#94A3B8"/>
      <path d="M 100 52 L 100 95 L 85 120 M 100 95 L 115 120" stroke="#4ADE80" stroke-width="8"/>
      <!-- Cabos -->
      <path d="M 20 15 L 80 70 M 180 15 L 120 70" stroke="#22C55E" stroke-width="4"/>
      <circle cx="80" cy="70" r="6" fill="#FFFFFF"/>
      <circle cx="120" cy="70" r="6" fill="#FFFFFF"/>
    </svg>`
  },
  {
    id: "peck_deck_voador",
    name: "Peck Deck (Voador na Máquina)",
    category: "Peito",
    secondaryMuscles: ["Deltoide Anterior"],
    equipment: "Máquina",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Sólido apoio das costas no encosto, braços alinhados na altura do peito, pés apoiados no chão.",
    movement: "Aduzir as hastes da máquina até o centro e retornar resistindo à carga.",
    breathing: "Expirar ao fechar os braços e inspirar ao abrir.",
    instructions: [
      "Ajuste a altura do assento para que as pegadas fiquem na linha do peitoral médio.",
      "Sente-se mantendo a coluna firme contra o encosto.",
      "Segure as hastes e feche os braços trazendo-os à frente do peito.",
      "Segure a contração por 1 segundo no centro antes de abrir os braços devagar."
    ],
    commonMistakes: ["Desencostar as costas do aparelho", "Hiperestender os ombros ao abrir excessivamente"],
    safetyTips: ["Ajuste a amplitude inicial da máquina para não sobrecarregar a articulação do ombro."],
    musclesWorkedList: ["Peitoral Maior", "Deltoide Anterior"],
    variations: ["Voador com Halteres no Banco Plano"],
    alternatives: [{ id: "crossover_polia", name: "Crossover na Polia Alta" }],
    notes: "Ótima opção para iniciantes pela segurança e isolamento guiado.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="85" y="40" width="30" height="70" fill="#334155"/><circle cx="100" cy="30" r="10" fill="#94A3B8"/><path d="M 60 55 L 90 55 M 140 55 L 110 55" stroke="#4ADE80" stroke-width="8"/></svg>`
  },
  {
    id: "flexao_braco",
    name: "Flexão de Braço (Push-Up)",
    category: "Peito",
    secondaryMuscles: ["Tríceps", "Deltoide Anterior", "Core"],
    equipment: "Peso Corporal",
    level: "Iniciante",
    movementType: "Composto",
    startingPosture: "Prancha facial, mãos afastadas na largura dos ombros, corpo alinhado da cabeça aos calcanhares.",
    movement: "Flexionar os cotovelos até quase tocar o peito no chão e empurrar o solo para subir.",
    breathing: "Inspirar na descida e expirar ao empurrar o chão.",
    instructions: [
      "Posicione as mãos no chão ligeiramente mais abertas que a largura dos ombros.",
      "Mantenha o abdômen e os glúteos contraídos para manter a coluna ereta.",
      "Desça o corpo em bloco até o peito ficar a poucos centímetros do chão.",
      "Empurre o chão firmemente até estender os braços."
    ],
    commonMistakes: ["Deixar o quadril cair (hiperextensão lombar)", "Elevar os glúteos demais"],
    safetyTips: ["Se for muito difícil, inicie com os joelhos apoiados no chão."],
    musclesWorkedList: ["Peitoral Maior", "Tríceps Braquial", "Deltoide Anterior", "Core / Abdominais"],
    variations: ["Flexão Inclinada", "Flexão Declinada", "Flexão Diamante"],
    alternatives: [{ id: "supino_reto_barra", name: "Supino Reto com Barra" }],
    notes: "Excelente exercício calistênico funcional para força geral do tronco.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="20" y1="105" x2="180" y2="105" stroke="#334155" stroke-width="6"/><circle cx="160" cy="70" r="10" fill="#94A3B8"/><path d="M 150 75 L 50 85" stroke="#4ADE80" stroke-width="10"/><line x1="140" y1="75" x2="140" y2="105" stroke="#22C55E" stroke-width="5"/></svg>`
  },

  // ==========================================
  // COSTAS (BACK)
  // ==========================================
  {
    id: "puxada_frente_polia",
    name: "Puxada Aberta na Polia (Lat Pulldown)",
    category: "Costas",
    secondaryMuscles: ["Bíceps Braquial", "Braquiorradial", "Romboides"],
    equipment: "Máquina",
    level: "Iniciante",
    movementType: "Composto",
    startingPosture: "Sentado no aparelho com as coxas presas sob o rolo de apoio, tronco sutilmente inclinado para trás (10°).",
    movement: "Puxar a barra em direção à porção superior do peito projetando os cotovelos para baixo e para trás.",
    breathing: "Expirar durante a puxada e inspirar ao retornar a barra para cima.",
    instructions: [
      "Segure a barra longa com pegada pronada aberta (além da largura dos ombros).",
      "Sente-se ajustando o rolo de apoio firmemente sobre as coxas.",
      "Puxe a barra para baixo em direção à clavícula/peito superior, expandindo a caixa torácica.",
      "Concentre a força nos cotovelos e contraia os dorsais na parte inferior.",
      "Suba a barra de forma controlada até a extensão quase completa das costas."
    ],
    commonMistakes: [
      "Puxar a barra por trás do pescoço (estresse cervical e no manguito).",
      "Inclinar o tronco excessivamente para trás usando embalo.",
      "Puxar com a força dos braços e bíceps em vez das costas."
    ],
    safetyTips: ["Mantenha a coluna neutra e evite trancos na articulação dos ombros."],
    musclesWorkedList: ["Latíssimo do Dorso (Grande Dorsal)", "Romboides", "Trapezius Médio e Inferior", "Bíceps"],
    variations: ["Puxada com Pegada Triângulo", "Puxada Supinada (Chin-Up style)", "Puxada Unilateral"],
    alternatives: [
      { id: "barra_fixa", name: "Barra Fixa (Pull-up)" },
      { id: "remada_serrote_halter", name: "Remada Unilateral com Halter" }
    ],
    notes: "Um dos exercícios mais eficazes para desenvolver a largura das costas (formato em V).",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="30" y1="20" x2="170" y2="20" stroke="#FFFFFF" stroke-width="7"/><rect x="80" y="60" width="40" height="50" rx="4" fill="#334155"/><circle cx="100" cy="40" r="10" fill="#94A3B8"/><path d="M 100 50 L 100 85" stroke="#4ADE80" stroke-width="12"/><path d="M 40 20 L 80 45 M 160 20 L 120 45" stroke="#22C55E" stroke-width="5"/></svg>`
  },
  {
    id: "remada_curvada_barra",
    name: "Remada Curvada com Barra",
    category: "Costas",
    secondaryMuscles: ["Trapézio", "Lombar", "Bíceps"],
    equipment: "Barra",
    level: "Avançado",
    movementType: "Composto",
    startingPosture: "Tronco inclinado à frente a 45°, joelhos levemente dobrados, coluna lombar neutra e preservada.",
    movement: "Puxar a barra em direção à linha do umbigo mantendo os cotovelos rente ao corpo.",
    breathing: "Expirar ao puxar a barra e inspirar ao descer o peso.",
    instructions: [
      "Fique em pé com os pés na largura dos quadris e segure a barra com pegada pronada.",
      "Flexione ligeiramente os joelhos e incline o quadril para trás até o tronco ficar em ~45°.",
      "Puxe a barra em direção ao abdômen inferior trazendo as escápulas juntas no topo.",
      "Abaixe a barra lentamente até estender os braços sem arcar as costas."
    ],
    commonMistakes: [
      "Arredondar a coluna lombar (postura perigosa para os discos intervertebrais).",
      "Fazer movimento de gangorra com o tronco para subir a carga."
    ],
    safetyTips: ["Se sentir desconforto na lombar, substitua pela Remada Apoiada no Banco ou Remada Baixa na Polia."],
    musclesWorkedList: ["Latíssimo do Dorso", "Romboides", "Trapézio", "Eretores da Espinha", "Bíceps"],
    variations: ["Remada Curvada Supinada", "Remada Landmine (Barra T)"],
    alternatives: [
      { id: "remada_serrote_halter", name: "Remada Unilateral com Halter" },
      { id: "remada_baixa_polia", name: "Remada Baixa na Polia" }
    ],
    notes: "Excelente para densidade e espessura da musculatura dorsal.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="130" cy="35" r="10" fill="#94A3B8"/><path d="M 130 45 L 90 70 L 70 110 M 90 70 L 105 110" stroke="#4ADE80" stroke-width="8"/><line x1="70" y1="60" x2="110" y2="85" stroke="#FFFFFF" stroke-width="6"/></svg>`
  },
  {
    id: "remada_serrote_halter",
    name: "Remada Unilateral com Halter (Serrote)",
    category: "Costas",
    secondaryMuscles: ["Bíceps", "Deltoide Posterior"],
    equipment: "Halteres",
    level: "Iniciante",
    movementType: "Composto",
    startingPosture: "Um joelho e mão apoiados no banco reto. Coluna paralela ao chão.",
    movement: "Puxar o halter com o braço livre em direção ao quadril e descer alongando o dorsal.",
    breathing: "Expirar ao puxar o halter e inspirar na descida.",
    instructions: [
      "Apoie o joelho esquerdo e a mão esquerda em um banco plano.",
      "Com a coluna reta, segure o halter na mão direita com o braço estendido.",
      "Puxe o halter para cima em direção à cintura/quadril mantendo o cotovelo próximo ao corpo.",
      "Comprima as costas no topo e desça a carga controladamente."
    ],
    commonMistakes: ["Rotacionar o tronco excessivamente para subir a peso", "Puxar o halter em direção ao peito em vez do quadril"],
    safetyTips: ["Mantenha a cabeça em alinhamento neutro com a coluna."],
    musclesWorkedList: ["Latíssimo do Dorso", "Romboides", "Bíceps Braquial"],
    variations: ["Remada Unilateral na Polia"],
    alternatives: [{ id: "remada_baixa_polia", name: "Remada Baixa na Polia" }],
    notes: "Ótimo para corrigir assimetrias de força muscular entre os lados esquerdo e direito.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="40" y="80" width="100" height="12" fill="#334155"/><circle cx="60" cy="50" r="10" fill="#94A3B8"/><path d="M 60 60 L 110 60" stroke="#4ADE80" stroke-width="8"/><circle cx="100" cy="80" r="8" fill="#FFFFFF"/></svg>`
  },
  {
    id: "remada_baixa_polia",
    name: "Remada Baixa na Polia com Triângulo",
    category: "Costas",
    secondaryMuscles: ["Bíceps", "Dorso Médio"],
    equipment: "Polia",
    level: "Iniciante",
    movementType: "Composto",
    startingPosture: "Sentado no aparelho, joelhos levemente flexionados, pés apoiados na plataforma, coluna ereta.",
    movement: "Puxar o triângulo até o abdômen projetando o peito para frente e retornar sem curvar a coluna.",
    breathing: "Expirar ao puxar o triângulo e inspirar na fase de retorno.",
    instructions: [
      "Sente-se e apoie os pés no suporte mantendo os joelhos confortavelmente destravados.",
      "Segure a pegada em triângulo e alinhe a postura ereta.",
      "Puxe a pegada em direção à região umbilical, estufando o peito e unindo as escápulas.",
      "Retorne estendendo os braços devagar até sentir o alongamento das costas."
    ],
    commonMistakes: ["Balançar o tronco para frente e para trás em cada repetição", "Curvar a lombar"],
    safetyTips: ["Evite travar os joelhos em extensão total."],
    musclesWorkedList: ["Latíssimo do Dorso", "Romboides", "Trapézio Médio"],
    variations: ["Remada Baixa com Barra Romana", "Remada Baixa Pegada Aberta"],
    alternatives: [{ id: "remada_curvada_barra", name: "Remada Curvada com Barra" }],
    notes: "Exercício seguro e muito eficiente para construir espessura no dorso central.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="40" y="70" width="40" height="40" fill="#334155"/><circle cx="65" cy="50" r="10" fill="#94A3B8"/><path d="M 65 60 L 65 95" stroke="#4ADE80" stroke-width="8"/><line x1="65" y1="75" x2="150" y2="75" stroke="#22C55E" stroke-width="3"/></svg>`
  },

  // ==========================================
  // OMBROS (SHOULDERS)
  // ==========================================
  {
    id: "desenvolvimento_halteres",
    name: "Desenvolvimento de Ombros com Halteres",
    category: "Ombros",
    secondaryMuscles: ["Tríceps Braquial", "Deltoide Lateral"],
    equipment: "Halteres",
    level: "Iniciante",
    movementType: "Composto",
    startingPosture: "Sentado em banco com encosto vertical a 90°, coluna apoiada e pés no chão.",
    movement: "Empurrar os halteres verticalmente acima da cabeça e descer até a altura das orelhas.",
    breathing: "Expirar ao subir os halteres e inspirar ao descer.",
    instructions: [
      "Sente-se no banco mantendo as costas bem apoiadas no encosto.",
      "Com um halter em cada mão na altura das orelhas e palmas viradas para frente, empurre-os para cima.",
      "Eleve os halteres até quase estender totalmente os cotovelos no topo.",
      "Desça de forma lenta e controlada até os halteres atingirem a linha dos ombros."
    ],
    commonMistakes: [
      "Arquear a lombar desencostando do banco.",
      "Bater os halteres fortemente no ponto mais alto.",
      "Descer o peso rápido demais perdendo o controle."
    ],
    safetyTips: ["Se possuir sensibilidade nos ombros, faça com pegada neutra (palmas viradas uma para a outra)."],
    musclesWorkedList: ["Deltoide Anterior", "Deltoide Lateral", "Tríceps Braquial", "Trapézio Superior"],
    variations: ["Desenvolvimento Arnold", "Desenvolvimento com Barra (Overhead Press)", "Desenvolvimento na Máquina"],
    alternatives: [
      { id: "elevacao_lateral_halteres", name: "Elevação Lateral com Halteres" }
    ],
    notes: "O construtor número 1 de força e largura para a cintura escapular.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="80" y="60" width="40" height="55" fill="#334155"/><circle cx="100" cy="38" r="10" fill="#94A3B8"/><path d="M 50 30 L 70 50 L 85 40 M 150 30 L 130 50 L 115 40" stroke="#4ADE80" stroke-width="5"/><circle cx="50" cy="25" r="7" fill="#FFFFFF"/><circle cx="150" cy="25" r="7" fill="#FFFFFF"/></svg>`
  },
  {
    id: "elevacao_lateral_halteres",
    name: "Elevação Lateral com Halteres",
    category: "Ombros",
    secondaryMuscles: ["Trapézio Superior"],
    equipment: "Halteres",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Em pé, joelhos ligeiramente flexionados, postura firme, halteres ao lado das coxas.",
    movement: "Elevar os braços lateralmente até a altura dos ombros e descer de forma contida.",
    breathing: "Expirar ao subir os braços e inspirar ao descer.",
    instructions: [
      "Segure um halter em cada mão ao lado do corpo com os cotovelos levemente flexionados.",
      "Eleve os braços para os lados até a altura dos ombros.",
      "Imagine derramar água de um copo no ponto mais alto para focar a carga na cabeça lateral do deltoide.",
      "Retorne devagar resistindo à força da gravidade."
    ],
    commonMistakes: [
      "Usar impulso de tronco (balanço).",
      "Elevar as mãos acima da linha dos ombros gerando impacto articular."
    ],
    safetyTips: ["Não utilize cargas excessivas que forcem o uso de inércia."],
    musclesWorkedList: ["Deltoide Lateral (Cabeça Média do Ombro)"],
    variations: ["Elevação Lateral na Polia", "Elevação Lateral Sentado", "Elevação Lateral na Máquina"],
    alternatives: [{ id: "desenvolvimento_halteres", name: "Desenvolvimento de Ombros" }],
    notes: "Responsável direto pela estética de 'ombros em bola de canhão'.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="100" cy="35" r="10" fill="#94A3B8"/><path d="M 100 45 L 100 95 M 40 50 L 100 50 L 160 50" stroke="#4ADE80" stroke-width="6"/><circle cx="35" cy="50" r="7" fill="#FFFFFF"/><circle cx="165" cy="50" r="7" fill="#FFFFFF"/></svg>`
  },
  {
    id: "crucifixo_invertido_polia",
    name: "Crucifixo Invertido na Polia / Peck Deck Invertido",
    category: "Ombros",
    secondaryMuscles: ["Romboides", "Trapézio Médio"],
    equipment: "Polia",
    level: "Intermediário",
    movementType: "Isolado",
    startingPosture: "Em pé de frente para a polia alta cruzada ou sentado no Peck Deck virado para o encosto.",
    movement: "Aduzir os braços para trás na linha dos ombros focando na porção posterior do ombro.",
    breathing: "Expirar ao abrir os braços para trás e inspirar ao retornar.",
    instructions: [
      "Segure o cabo esquerdo com a mão direita e o cabo direito com a mão esquerda na altura dos olhos.",
      "Abra os braços para trás mantendo os cotovelos ligeiramente flexionados.",
      "Contraia o deltoide posterior no final da abertura.",
      "Retorne suavemente até as mãos se cruzarem novamente à frente."
    ],
    commonMistakes: ["Elevar os ombros na direção das orelhas", "Dobrar demais os cotovelos"],
    safetyTips: ["Mantenha o foco em afastar os cotovelos para trás."],
    musclesWorkedList: ["Deltoide Posterior", "Romboides", "Trapézio"],
    variations: ["Crucifixo Invertido com Halteres Curvado"],
    alternatives: [{ id: "elevacao_lateral_halteres", name: "Elevação Lateral" }],
    notes: "Fundamental para a saúde articular e postura dos ombros.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="100" cy="35" r="10" fill="#94A3B8"/><path d="M 100 45 L 100 95 M 50 60 L 100 45 L 150 60" stroke="#4ADE80" stroke-width="6"/></svg>`
  },

  // ==========================================
  // BÍCEPS (BICEPS)
  // ==========================================
  {
    id: "rosca_direta_barra_w",
    name: "Rosca Direta com Barra W",
    category: "Bíceps",
    secondaryMuscles: ["Braquial", "Braquiorradial"],
    equipment: "Barra",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Em pé, joelhos sutilmente destravados, pés na largura dos ombros, pegada supinada na barra W.",
    movement: "Flexionar os cotovelos trazendo a barra em direção aos ombros mantendo os cotovelos fixos nas laterais.",
    breathing: "Expirar ao flexionar o bíceps (subida) e inspirar ao descer a barra.",
    instructions: [
      "Segure a barra W na pegada anatômica ligeiramente inclinada na largura dos ombros.",
      "Mantenha os cotovelos colados ao lado do tronco durante todo o movimento.",
      "Eleve a barra flexionando os cotovelos até contrair totalmente o bíceps no topo.",
      "Pause por 1 segundo no pico de contração e abaixe a barra lentamente."
    ],
    commonMistakes: [
      "Mover os cotovelos para frente durante a subida (usando o ombro).",
      "Balançar o corpo para trás para pegar impulso com a lombar."
    ],
    safetyTips: ["A barra W reduz o estresse na articulação dos punhos comparada à barra reta."],
    musclesWorkedList: ["Bíceps Braquial (Cabeça Longa e Curva)", "Braquial Anterior"],
    variations: ["Rosca Direta com Barra Reta", "Rosca Direta na Polia Baixa"],
    alternatives: [
      { id: "rosca_alternada_halteres", name: "Rosca Alternada com Halteres" },
      { id: "rosca_scott_maquina", name: "Rosca Scott" }
    ],
    notes: "O exercício clássico mais popular para construção de pico de bíceps.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="100" cy="35" r="10" fill="#94A3B8"/><path d="M 100 45 L 100 95 M 85 55 L 85 85 L 100 70 M 115 55 L 115 85 L 100 70" stroke="#4ADE80" stroke-width="4"/><line x1="75" y1="70" x2="125" y2="70" stroke="#FFFFFF" stroke-width="5"/></svg>`
  },
  {
    id: "rosca_alternada_halteres",
    name: "Rosca Alternada com Halteres com Supinação",
    category: "Bíceps",
    secondaryMuscles: ["Braquial", "Antebraço"],
    equipment: "Halteres",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Em pé ou sentado em banco reto, um halter em cada mão na posição neutra.",
    movement: "Flexionar um braço de cada vez girando o punho (supinação) durante a subida.",
    breathing: "Expirar ao subir o halter e inspirar na descida.",
    instructions: [
      "Segure os halteres ao lado do corpo com as palmas voltadas para dentro.",
      "Eleve um halter e, a partir do meio do caminho, gire o punho trazendo a palma para cima.",
      "Contraia o bíceps fortemente no topo e desça desfazendo a rotação.",
      "Repita o movimento com o outro braço."
    ],
    commonMistakes: ["Elevar o cotovelo para a frente", "Não realizar a rotação completa do punho"],
    safetyTips: ["Pode ser executado sentado para evitar qualquer impulso do corpo."],
    musclesWorkedList: ["Bíceps Braquial", "Braquial Anterior", "Braquiorradial"],
    variations: ["Rosca Martelo com Halteres", "Rosca Inclinada no Banco 45°"],
    alternatives: [{ id: "rosca_direta_barra_w", name: "Rosca Direta com Barra W" }],
    notes: "A supinação completa recruta a função primária de rotação do bíceps.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="100" cy="35" r="10" fill="#94A3B8"/><path d="M 100 45 L 100 95 M 85 50 L 75 75 L 85 65 M 115 50 L 125 85" stroke="#4ADE80" stroke-width="5"/><circle cx="85" cy="60" r="6" fill="#FFFFFF"/><circle cx="125" cy="85" r="6" fill="#FFFFFF"/></svg>`
  },
  {
    id: "rosca_martelo_halteres",
    name: "Rosca Martelo com Halteres",
    category: "Bíceps",
    secondaryMuscles: ["Braquial", "Braquiorradial (Antebraço)"],
    equipment: "Halteres",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Em pé, halteres segurados com pegada neutra (palmas voltadas uma para a outra).",
    movement: "Flexionar os braços mantendo a pegada neutra do início ao fim.",
    breathing: "Expirar ao subir os halteres e inspirar ao descer.",
    instructions: [
      "Mantenha os cotovelos fixos junto aos flancos do corpo.",
      "Eleve os halteres sem girar os punhos (como se estivesse usando um martelo).",
      "Contraia o braquial e antebraço no topo e desça controladamente."
    ],
    commonMistakes: ["Balançar o tronco", "Usar carga excessiva"],
    safetyTips: ["Excelente opção para quem sente dor nos punhos na rosca direta."],
    musclesWorkedList: ["Braquial", "Braquiorradial", "Bíceps Braquial"],
    variations: ["Rosca Martelo na Polia com Corda"],
    alternatives: [{ id: "rosca_direta_barra_w", name: "Rosca Direta" }],
    notes: "Desenvolve a espessura lateral do braço e a força de pegada no antebraço.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="100" cy="35" r="10" fill="#94A3B8"/><path d="M 100 45 L 100 95 M 85 50 L 75 75 M 115 50 L 125 75" stroke="#4ADE80" stroke-width="5"/><rect x="68" y="70" width="14" height="8" rx="2" fill="#FFFFFF"/><rect x="118" y="70" width="14" height="8" rx="2" fill="#FFFFFF"/></svg>`
  },

  // ==========================================
  // TRÍCEPS (TRICEPS)
  // ==========================================
  {
    id: "triceps_corda_polia",
    name: "Tríceps Corda na Polia Alta",
    category: "Tríceps",
    secondaryMuscles: ["Ancôneo"],
    equipment: "Polia",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Em pé de frente para a polia alta, joelhos levemente flexionados, cotovelos colados nas laterais.",
    movement: "Empurrar a corda para baixo afastando as pontas no final do movimento.",
    breathing: "Expirar ao estender os cotovelos (descida) e inspirar ao retornar para cima.",
    instructions: [
      "Fixe a corda na polia alta do aparelho.",
      "Segure as pontas da corda e posicione os cotovelos firmes ao lado do tronco.",
      "Empurre a corda para baixo até estender completamente os braços.",
      "No final do movimento, afaste as mãos para fora focando na cabeça lateral do tríceps.",
      "Retorne lentamente até formar um ângulo de 90° nos cotovelos."
    ],
    commonMistakes: [
      "Abrir os cotovelos para os lados.",
      "Projetar os ombros para frente usando o peso do corpo."
    ],
    safetyTips: ["Não deixe os cotovelos subirem além da linha média do peito na fase de retorno."],
    musclesWorkedList: ["Tríceps Braquial (Cabeça Lateral, Medial e Longa)"],
    variations: ["Tríceps Barra Reta na Polia", "Tríceps Barra V na Polia"],
    alternatives: [
      { id: "triceps_testa_barra_w", name: "Tríceps Testa com Barra W" },
      { id: "triceps_paralelas", name: "Tríceps nas Paralelas / Mergulho" }
    ],
    notes: "Um dos melhores exercícios para esculpir a cabeça lateral do tríceps.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="100" cy="35" r="10" fill="#94A3B8"/><path d="M 100 45 L 100 95 M 80 50 L 80 90 M 120 50 L 120 90" stroke="#4ADE80" stroke-width="4"/><circle cx="75" cy="95" r="5" fill="#FFFFFF"/><circle cx="125" cy="95" r="5" fill="#FFFFFF"/></svg>`
  },
  {
    id: "triceps_testa_barra_w",
    name: "Tríceps Testa com Barra W (Skull Crusher)",
    category: "Tríceps",
    secondaryMuscles: ["Ancôneo"],
    equipment: "Barra",
    level: "Intermediário",
    movementType: "Isolado",
    startingPosture: "Deitado em banco reto, braços estendidos verticalmente segurando a barra W.",
    movement: "Flexionar apenas os cotovelos trazendo a barra em direção à testa/topo da cabeça e empurrar de volta.",
    breathing: "Inspirar ao descer a barra em direção à testa e expirar ao empurrar para cima.",
    instructions: [
      "Deite-se no banco reto e segure a barra W com pegada pronada estreita.",
      "Estenda os braços para cima alinhando a barra com os ombros.",
      "Mantendo os cotovelos fixos e apontados para o teto, dobre os braços levando a barra até a testa.",
      "Empurre a barra de volta para o alto estendendo os cotovelos com força concentrada no tríceps."
    ],
    commonMistakes: [
      "Abrir os cotovelos para as laterais.",
      "Mover os braços na articulação do ombro transformando em pullover."
    ],
    safetyTips: ["Realize o movimento com controle rigoroso para evitar acidentes na cabeça."],
    musclesWorkedList: ["Tríceps Braquial (Foco na Cabeça Longa)"],
    variations: ["Tríceps Testa com Halteres", "Tríceps Testa no Banco Inclinado"],
    alternatives: [{ id: "triceps_corda_polia", name: "Tríceps Corda na Polia" }],
    notes: "Excelente para ganho de massa bruta na cabeça longa do tríceps.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><path d="M 40 95 L 160 95" stroke="#334155" stroke-width="8"/><circle cx="60" cy="75" r="10" fill="#94A3B8"/><path d="M 70 80 L 140 80" stroke="#4ADE80" stroke-width="8"/><path d="M 85 80 L 95 55 M 85 80 L 95 55" stroke="#22C55E" stroke-width="4"/><line x1="85" y1="50" x2="110" y2="50" stroke="#FFFFFF" stroke-width="5"/></svg>`
  },
  {
    id: "triceps_paralelas",
    name: "Tríceps nas Paralelas (Dips)",
    category: "Tríceps",
    secondaryMuscles: ["Peitoral Inferior", "Deltoide Anterior"],
    equipment: "Peso Corporal",
    level: "Avançado",
    movementType: "Composto",
    startingPosture: "Suspenso nas barras paralelas com os braços estendidos e tronco vertical.",
    movement: "Flexionar os cotovelos descendo o corpo até formar 90° e empurrar até a posição inicial.",
    breathing: "Inspirar na descida do corpo e expirar ao empurrar para subir.",
    instructions: [
      "Segure as barras paralelas e jogue o corpo para cima com os braços estendidos.",
      "Mantenha o tronco o mais vertical possível para focar no tríceps.",
      "Desça o corpo dobrando os cotovelos até formar um ângulo de 90°.",
      "Empurre as barras para baixo com força total estendendo os cotovelos."
    ],
    commonMistakes: ["Descer além de 90° gerando estresse articular nos ombros", "Inclinar demais o tronco para frente"],
    safetyTips: ["Se for muito avançado, utilize o aparelho Graviton como suporte."],
    musclesWorkedList: ["Tríceps Braquial", "Peitoral Maior", "Deltoide Anterior"],
    variations: ["Tríceps Banco (Mergulho no Banco)"],
    alternatives: [{ id: "triceps_corda_polia", name: "Tríceps Corda na Polia" }],
    notes: "O agachamento dos membros superiores para força pura nos braços.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="60" y1="50" x2="60" y2="115" stroke="#334155" stroke-width="6"/><line x1="140" y1="50" x2="140" y2="115" stroke="#334155" stroke-width="6"/><circle cx="100" cy="30" r="10" fill="#94A3B8"/><path d="M 100 40 L 100 80 M 60 50 L 100 45 L 140 50" stroke="#4ADE80" stroke-width="6"/></svg>`
  },

  // ==========================================
  // PERNAS / QUADRÍCEPS (LEGS)
  // ==========================================
  {
    id: "agachamento_livre_barra",
    name: "Agachamento Livre com Barra",
    category: "Pernas",
    secondaryMuscles: ["Glúteo Máximo", "Isquiotibiais", "Core / Lombar"],
    equipment: "Barra",
    level: "Avançado",
    movementType: "Composto",
    startingPosture: "Barra apoiada no trapézio superior, pés afastados na largura dos ombros, pontas levemente para fora (15°).",
    movement: "Iniciar o movimento projetando o quadril para trás e dobrando os joelhos até 90° ou paralelo.",
    breathing: "Inspirar profundamente na descida retendo o ar no abdomen (manobra de valsalva) e expirar na subida.",
    instructions: [
      "Posicione a barra sobre o trapézio (não sobre as vértebras cervicais).",
      "Retire a barra do rack, dê dois passos para trás e estabeleça a base dos pés.",
      "Inicie a descida empurrando o quadril para trás e flexionando os joelhos em direção às pontas dos pés.",
      "Agache até as coxas ficarem paralelas ao chão mantendo o peito aberto.",
      "Empurre o chão com a sola inteira dos pés para subir de volta."
    ],
    commonMistakes: [
      "Valgo dinâmico (deixar os joelhos caírem para dentro na subida).",
      "Curvar a coluna lombar na parte mais funda (retroversão pélvica / 'butt wink').",
      "Elevar os calcanhares do chão."
    ],
    safetyTips: [
      "Sempre utilize as travas de segurança laterais do rack.",
      "Pessoas com lesões ativas no joelho ou hérnia de disco devem evitar peso livre desassistido."
    ],
    musclesWorkedList: ["Quadríceps (Vasto Lateral, Medial, Intermédio e Reto Femoral)", "Glúteo Máximo", "Adutores", "Eretores da Espinha"],
    variations: ["Agachamento Hack na Máquina", "Agachamento Frontal", "Agachamento Goblet com Halter"],
    alternatives: [
      { id: "leg_press_45", name: "Leg Press 45°" },
      { id: "cadeira_extensora", name: "Cadeira Extensora" }
    ],
    notes: "O rei dos exercícios de membros inferiores para massa muscular e força global.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="50" y1="35" x2="150" y2="35" stroke="#FFFFFF" stroke-width="7"/><circle cx="100" cy="25" r="10" fill="#94A3B8"/><path d="M 100 35 L 100 65 L 75 105 M 100 65 L 125 105" stroke="#4ADE80" stroke-width="8"/><rect x="35" y="25" width="12" height="20" rx="3" fill="#22C55E"/><rect x="153" y="25" width="12" height="20" rx="3" fill="#22C55E"/></svg>`
  },
  {
    id: "leg_press_45",
    name: "Leg Press 45°",
    category: "Pernas",
    secondaryMuscles: ["Glúteos", "Isquiotibiais"],
    equipment: "Máquina",
    level: "Iniciante",
    movementType: "Composto",
    startingPosture: "Sintado na máquina, lombar totalmente encostada no apoio, pés firmes na plataforma na largura dos ombros.",
    movement: "Destravar a máquina, flexionar os joelhos até 90° e empurrar a plataforma sem travar os joelhos no final.",
    breathing: "Inspirar durante a descida da plataforma e expirar ao empurrar.",
    instructions: [
      "Sente-se e ajuste o apoio de costas para garantir total conforto na lombar.",
      "Posicione os pés na plataforma na largura dos ombros.",
      "Empurre a plataforma para destravar a trava de segurança.",
      "Flexione os joelhos trazendo a plataforma na direção do peitoral até formar um ângulo de 90°.",
      "Empurre a carga com a sola dos pés sem estender os joelhos bruscamente no topo."
    ],
    commonMistakes: [
      "Desencostar o quadril e a lombar do assento na fase mais profunda (risco para a coluna).",
      "Hiperextender e travar os joelhos no final da empurrada."
    ],
    safetyTips: ["Mantenha sempre as travas laterais operantes e ajustadas."],
    musclesWorkedList: ["Quadríceps", "Glúteo Máximo", "Isquiotibiais"],
    variations: ["Leg Press Horizontal"],
    alternatives: [
      { id: "agachamento_livre_barra", name: "Agachamento Livre" },
      { id: "cadeira_extensora", name: "Cadeira Extensora" }
    ],
    notes: "Excelente alternativa segura ao agachamento livre com grande capacidade de carga.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="30" y1="110" x2="150" y2="30" stroke="#334155" stroke-width="8"/><rect x="120" y="20" width="50" height="15" fill="#4ADE80" transform="rotate(-35 120 20)"/><circle cx="65" cy="85" r="9" fill="#94A3B8"/></svg>`
  },
  {
    id: "cadeira_extensora",
    name: "Cadeira Extensora",
    category: "Pernas",
    secondaryMuscles: [],
    equipment: "Máquina",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Sentado na máquina com o rolo posicionado sobre a parte inferior das canelas, logo acima dos tornozelos.",
    movement: "Estender os joelhos até a posição horizontal e retornar controlando a carga.",
    breathing: "Expirar ao estender as pernas e inspirar ao descer o peso.",
    instructions: [
      "Ajuste o encosto para que a articulação do joelho fique alinhada com o eixo de rotação da máquina.",
      "Sente-se e apoie o rolo de espuma sobre a parte da frente dos tornozelos.",
      "Empurre o rolo para cima estendendo totalmente os joelhos.",
      "Segure a contração do quadríceps por 1 segundo no topo e abaixe o peso devagar."
    ],
    commonMistakes: ["Utilizar cargas excessivas que façam o quadril levantar do assento", "Descer a carga despencando sem controle"],
    safetyTips: ["Pessoas com lesões no ligamento cruzado anterior (LCA) devem controlar a amplitude máxima."],
    musclesWorkedList: ["Quadríceps (Isolamento completo dos 4 cabeças)"],
    variations: ["Extensão de Pernas Unilateral"],
    alternatives: [{ id: "leg_press_45", name: "Leg Press 45°" }],
    notes: "Excelente para pré-exaustão ou finalização de treinos de quadríceps.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="70" y="50" width="40" height="50" fill="#334155"/><circle cx="90" cy="35" r="10" fill="#94A3B8"/><path d="M 90 45 L 90 75 L 140 75" stroke="#4ADE80" stroke-width="8"/><circle cx="140" cy="75" r="6" fill="#FFFFFF"/></svg>`
  },

  // ==========================================
  // GLÚTEOS (GLUTES)
  // ==========================================
  {
    id: "elevacao_pelvica_barra",
    name: "Elevação Pélvica com Barra (Hip Thrust)",
    category: "Glúteos",
    secondaryMuscles: ["Isquiotibiais", "Quadríceps"],
    equipment: "Barra",
    level: "Intermediário",
    movementType: "Composto",
    startingPosture: "Escápulas apoiadas na borda de um banco firme, barra com protetor posicionado sobre o quadril, pés no chão.",
    movement: "Elevar o quadril contraindo os glúteos fortemente até alinhar coxas e tronco.",
    breathing: "Expirar ao subir o quadril e inspirar ao retornar ao chão.",
    instructions: [
      "Sente-se no chão e apoie as escápulas contra um banco estável de altura média.",
      "Role a barra acolchoada sobre as pernas até a prega do quadril.",
      "Posicione os pés no chão na largura dos ombros.",
      "Empurre o chão com os calcanhares e eleve o quadril até alinhar o corpo da cabeça aos joelhos.",
      "Contraia os glúteos ao máximo no topo durante 1 a 2 segundos e retorne devagar."
    ],
    commonMistakes: [
      "Hiperestender a coluna lombar no topo em vez de usar a extensão de quadril.",
      "Olhar para o teto durante a subida (mantenha o queixo próximo ao peito)."
    ],
    safetyTips: ["Sempre utilize protetor de barra de alta densidade para proteger a estrutura óssea do quadril."],
    musclesWorkedList: ["Glúteo Máximo", "Glúteo Médio", "Isquiotibiais"],
    variations: ["Elevação Pélvica na Máquina", "Elevação Pélvica Unilateral"],
    alternatives: [
      { id: "agachamento_sumo", name: "Agachamento Sumô" },
      { id: "stiff_halteres", name: "Stiff com Halteres" }
    ],
    notes: "O exercício número 1 com maior ativação eletromiográfica do glúteo máximo.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="30" y="80" width="40" height="35" fill="#334155"/><circle cx="50" cy="65" r="9" fill="#94A3B8"/><path d="M 55 75 L 115 50 L 155 100" stroke="#4ADE80" stroke-width="8"/><line x1="100" y1="50" x2="130" y2="50" stroke="#FFFFFF" stroke-width="6"/></svg>`
  },

  // ==========================================
  // POSTERIOR DE COXA (HAMSTRINGS)
  // ==========================================
  {
    id: "stiff_halteres",
    name: "Stiff com Halteres / Barra",
    category: "Posterior",
    secondaryMuscles: ["Glúteo Máximo", "Eretores da Espinha"],
    equipment: "Halteres",
    level: "Intermediário",
    movementType: "Composto",
    startingPosture: "Em pé, joelhos sutilmente destravados, um halter em cada mão à frente das coxas, coluna neutra.",
    movement: "Projetar o quadril para trás descendo a carga rente às pernas até sentir o alongamento no posterior.",
    breathing: "Inspirar na descida do quadril e expirar ao retornar à posição ereta.",
    instructions: [
      "Fique em pé com os pés na largura dos quadris segurando os halteres à frente.",
      "Destrave levemente os joelhos (mantenha ângulo constante de 10-15°).",
      "Empurre o quadril para trás como se quisesse encostar a bunda na parede atrás de você.",
      "Desça os halteres rente às pernas até sentir um forte alongamento no posterior de coxa.",
      "Retorne projetando o quadril para frente e contraindo os glúteos."
    ],
    commonMistakes: [
      "Arredondar a coluna torácica e lombar durante a descida.",
      "Dobrar demais os joelhos transformando o exercício em agachamento."
    ],
    safetyTips: ["Parar a descida no momento em que a coluna começar a perder a neutralidade."],
    musclesWorkedList: ["Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranoso)", "Glúteo Máximo", "Lombar"],
    variations: ["Stiff com Barra Reta", "Levantamento Terra RDL (Romanian Deadlift)"],
    alternatives: [
      { id: "mesa_flexora", name: "Mesa Flexora" },
      { id: "cadeira_flexora", name: "Cadeira Flexora" }
    ],
    notes: "Excepcional para alongamento sob carga e hipertrofia dos isquiotibiais.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><circle cx="140" cy="35" r="10" fill="#94A3B8"/><path d="M 140 45 L 100 75 L 85 115 M 100 75 L 115 115" stroke="#4ADE80" stroke-width="8"/><line x1="125" y1="50" x2="125" y2="90" stroke="#FFFFFF" stroke-width="4"/></svg>`
  },
  {
    id: "mesa_flexora",
    name: "Mesa Flexora (Deitado)",
    category: "Posterior",
    secondaryMuscles: ["Gastrocnêmio"],
    equipment: "Máquina",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Deitado de bruços na máquina, rolo de apoio posicionado logo acima do calcanhar de Aquiles.",
    movement: "Flexionar os joelhos trazendo o rolo em direção aos glúteos e retornar resistindo.",
    breathing: "Expirar ao puxar o rolo e inspirar na extensão das pernas.",
    instructions: [
      "Deite-se de bruços e alinhe os joelhos com o eixo da máquina.",
      "Posicione o rolo estofado logo acima dos calcanhares.",
      "Segure as pegadas do aparelho para manter o quadril colado no banco.",
      "Dobre os joelhos trazendo os calcanhares em direção aos glúteos.",
      "Pause 1 segundo na flexão máxima e abaixe o peso suavemente."
    ],
    commonMistakes: ["Elevar o quadril da mesa durante a puxada", "Movimentar o peso em solavancos"],
    safetyTips: ["Mantenha o quadril firme contra a mesa durante todo o percurso."],
    musclesWorkedList: ["Isquiotibiais (Foco em flexão de joelho)"],
    variations: ["Cadeira Flexora", "Flexão de Pernas Unilateral"],
    alternatives: [{ id: "stiff_halteres", name: "Stiff com Halteres" }],
    notes: "Isolamento direto da função de flexão de joelho do posterior de coxa.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><path d="M 30 85 L 170 85" stroke="#334155" stroke-width="8"/><circle cx="45" cy="70" r="9" fill="#94A3B8"/><path d="M 55 75 L 125 75 L 155 50" stroke="#4ADE80" stroke-width="8"/><circle cx="155" cy="50" r="6" fill="#FFFFFF"/></svg>`
  },

  // ==========================================
  // PANTURRILHA (CALVES)
  // ==========================================
  {
    id: "panturrilha_em_pe_smith",
    name: "Gêmeos em Pé no Smith / Degrau",
    category: "Panturrilha",
    secondaryMuscles: [],
    equipment: "Máquina",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Meia ponta dos pés apoiada na borda de um degrau/plataforma, barra sobre o trapézio.",
    movement: "Descer os calcanhares para alongamento máximo e subir na ponta dos pés o máximo possível.",
    breathing: "Expirar ao subir na ponta dos pés e inspirar ao descer os calcanhares.",
    instructions: [
      "Apoie a meia ponta dos pés no degrau deixando os calcanhares livres.",
      "Apoie a barra sobre o trapézio e destrave o Smith.",
      "Abaixe os calcanhares abaixo da linha do degrau até sentir um forte alongamento na panturrilha.",
      "Empurre o chão subindo o máximo que puder na ponta dos pés.",
      "Segure o pico de contração por 1 a 2 segundos antes de descer."
    ],
    commonMistakes: ["Fazer repetições curtas e quicadas sem amplitude", "Dobrar os joelhos durante o exercício"],
    safetyTips: ["Mantenha os joelhos estendidos mas destravados."],
    musclesWorkedList: ["Gastrocnêmio (Cabeça Medial e Lateral)", "Sóleo"],
    variations: ["Panturrilha no Leg Press", "Panturrilha Unilateral com Halter"],
    alternatives: [{ id: "panturrilha_sentado", name: "Panturrilha Sentado" }],
    notes: "Desenvolve a porção superior visível da panturrilha.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="60" y="95" width="80" height="20" fill="#334155"/><circle cx="100" cy="25" r="9" fill="#94A3B8"/><path d="M 100 35 L 100 85 L 115 93" stroke="#4ADE80" stroke-width="7"/></svg>`
  },

  // ==========================================
  // ABDÔMEN (ABS)
  // ==========================================
  {
    id: "infra_infra_paralelas",
    name: "Abdominal Infra nas Paralelas (Leg Raise)",
    category: "Abdômen",
    secondaryMuscles: ["Iliopsoas", "Tensor da Fáscia Lata"],
    equipment: "Peso Corporal",
    level: "Intermediário",
    movementType: "Isolado",
    startingPosture: "Antebraços apoiados nas barras paralelas, costas firmes no encosto, pernas suspensas.",
    movement: "Elevar as pernas ou joelhos dobrados em direção ao tórax e descer com controle.",
    breathing: "Expirar ao subir as pernas (contraindo o abdômen) e inspirar ao descer.",
    instructions: [
      "Apoie os antebraços nos suportes almofadados e segure as pegadas.",
      "Encoste as costas firmemente no apoio posterior.",
      "Eleve os joelhos flexionados ou pernas estendidas em direção ao tronco.",
      "Arredonde ligeiramente a pelve no final da subida para máxima flexão abdominal.",
      "Abaixe as pernas lentamente até a posição inicial sem balançar."
    ],
    commonMistakes: ["Balançar o corpo usand inércia", "Apenas dobrar o quadril sem retroverter a pelve"],
    safetyTips: ["Não deixe o tronco balançar para frente."],
    musclesWorkedList: ["Reto Abdominal (Porção Infra)", "Oblíquos", "Flexores do Quadril"],
    variations: ["Abdominal Infra Infra Barra Fixa", "Abdominal Infra no Solo"],
    alternatives: [{ id: "prancha_abdominal", name: "Prancha Abdominal" }],
    notes: "Um dos exercícios mais intensos para fortalecimento da parede abdominal inferior.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="50" y1="40" x2="50" y2="110" stroke="#334155" stroke-width="6"/><line x1="150" y1="40" x2="150" y2="110" stroke="#334155" stroke-width="6"/><circle cx="100" cy="30" r="10" fill="#94A3B8"/><path d="M 100 40 L 100 70 L 135 70" stroke="#4ADE80" stroke-width="6"/></svg>`
  },
  {
    id: "prancha_abdominal",
    name: "Prancha Frontal Isométrica",
    category: "Abdômen",
    secondaryMuscles: ["Lombar", "Ombros", "Glúteos"],
    equipment: "Peso Corporal",
    level: "Iniciante",
    movementType: "Isolado",
    startingPosture: "Antebraços e pontas dos pés apoiados no chão, corpo alinhado em linha reta.",
    movement: "Manter sustentação isométrica estática mantendo o abdômen e glúteos fortemente contraídos.",
    breathing: "Respiração fluida, constante e profunda durante a sustentação.",
    instructions: [
      "Apoie os antebraços no chão alinhados com a largura dos ombros.",
      "Estenda as pernas para trás apoiando-se na ponta dos pés.",
      "Alinhe a cabeça, tronco e quadril em uma linha perfeitamente reta.",
      "Contraia o abdômen como se fosse levar o umbigo até as costas.",
      "Sustente a posição pelo tempo determinado (ex: 30 a 60 segundos)."
    ],
    commonMistakes: ["Deixar o quadril ceder para baixo", "Elevar o bumbum muito alto"],
    safetyTips: ["Interrompa o exercício se sentir compressão ou dor na coluna lombar."],
    musclesWorkedList: ["Transverso do Abdômen", "Reto Abdominal", "Oblíquos", "Core Profundo"],
    variations: ["Prancha Lateral", "Prancha com Elevação de Perna"],
    alternatives: [{ id: "infra_infra_paralelas", name: "Abdominal Infra" }],
    notes: "Fundamental para estabilização postural e saúde da coluna vertebral.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><line x1="20" y1="100" x2="180" y2="100" stroke="#334155" stroke-width="6"/><circle cx="160" cy="65" r="9" fill="#94A3B8"/><path d="M 150 70 L 50 75" stroke="#4ADE80" stroke-width="8"/><line x1="140" y1="70" x2="140" y2="100" stroke="#22C55E" stroke-width="5"/></svg>`
  },

  // ==========================================
  // CARDIO (CARDIO)
  // ==========================================
  {
    id: "hiit_esteira",
    name: "Treino Intervalado HIIT na Esteira",
    category: "Cardio",
    secondaryMuscles: ["Pernas", "Panturrilhas"],
    equipment: "Academia",
    level: "Todos",
    movementType: "Composto",
    startingPosture: "Postura ereta na esteira, olhar para frente, braços dobrados em 90°.",
    movement: "Alternar tiros em velocidade máxima de corrida com períodos de caminhada de recuperação.",
    breathing: "Rítmica e profunda combinada com o ritmo dos passos.",
    instructions: [
      "Aqueça por 3 a 5 minutos com uma caminhada moderada.",
      "Execute 30 segundos de corrida em ritmo intenso (85-90% do seu esforço máximo).",
      "Reduza para caminhada leve por 60 segundos para recuperação parcial do batimento.",
      "Repita esse ciclo de 8 a 12 vezes.",
      "Faça 3 minutos de caminhada de desaceleração ao final."
    ],
    commonMistakes: ["Segurar nos braços laterais da esteira enquanto corre", "Não fazer aquecimento prévio"],
    safetyTips: ["Conecte a trava de emergência na roupa antes de iniciar tiros rápidos."],
    musclesWorkedList: ["Sistema Cardiorrespiratório", "Quadríceps", "Posterior", "Panturrilhas"],
    variations: ["HIIT na Bike Ergométrica", "HIIT no Elíptico"],
    alternatives: [{ id: "bike_ergometrica", name: "Bike Ergométrica" }],
    notes: "Otimiza a queima de gordura e o condicionamento VO2 máx em um curto período de tempo.",
    svgIllustration: `<svg viewBox="0 0 200 130" class="exercise-svg-illustration"><rect width="200" height="130" rx="12" fill="#0F172A"/><rect x="30" y="95" width="140" height="15" rx="4" fill="#334155"/><circle cx="110" cy="40" r="10" fill="#94A3B8"/><path d="M 110 50 L 100 75 L 80 95 M 100 75 L 125 95" stroke="#4ADE80" stroke-width="6"/></svg>`
  }
];
