export const LESION_GRADES = [
  { grade: 0, title: "Mucosa normal", description: "Epitélio íntegro, sem evidência de hiperqueratose." },
  { grade: 1, title: "Hiperqueratose", description: "Mucosa íntegra, com áreas de hiperqueratose. Não há ulceração." },
  { grade: 2, title: "Lesões pequenas", description: "Lesões pequenas, isoladas ou multifocais." },
  { grade: 3, title: "Lesões extensas", description: "Lesões grandes isoladas ou lesões superficiais extensas." },
  { grade: 4, title: "Ulceração profunda", description: "Lesões extensas com áreas de ulceração aparentemente profunda." },
] as const;

export function gradesForMucosa(mucosa: "escamosa" | "glandular") {
  return mucosa === "escamosa" ? LESION_GRADES : null;
}

export const GUIDE_TOPICS = [
  { id: "supressores", title: "Supressores e protetores", items: [
    { title: "Omeprazol · inibidor da bomba de prótons", text: "Reduz a secreção de ácido ao inibir a H⁺/K⁺-ATPase. É a principal opção para ESGD. Formulação, administração e duração influenciam a resposta; devem ser prescritas pelo veterinário." },
    { title: "Antagonistas H₂ · como a cimetidina", text: "Bloqueiam receptores de histamina envolvidos na secreção ácida. Têm supressão menos consistente em equinos e não são a primeira escolha quando o omeprazol é adequado. Não são substitutos automáticos." },
    { title: "Sucralfato · protetor, não supressor", text: "Forma uma barreira sobre a mucosa lesionada. Pode ser associado ao omeprazol em EGGD. Não inibe diretamente a produção de ácido; o veterinário organiza os horários para evitar interferência na absorção de outros fármacos." },
    { title: "Misoprostol · casos selecionados", text: "Análogo de prostaglandina, com ação protetora e antissecretora, considerado em alguns casos de EGGD. Exige prescrição e cuidado no manuseio: é contraindicado na gestação e não deve ser manipulado por gestantes." },
  ] },
  { id: "alimentacao", title: "Adequação alimentar", items: [
    { title: "Volumoso como base", text: "Garantir acesso frequente a pasto ou feno de boa qualidade, inclusive durante a noite. A mastigação produz saliva, que ajuda a tamponar o ácido; a fibra também mantém a estratificação do conteúdo gástrico." },
    { title: "Menos jejum, menos amido por refeição", text: "Evitar longos intervalos sem alimento. Fracionar o concentrado e adequar o amido à necessidade energética. Quando indicado, substituir parte da energia por fontes de fibra e gordura, com mudanças graduais." },
    { title: "Antes do exercício", text: "Evitar treinar com o estômago vazio. Uma pequena oferta de volumoso, como alfafa quando adequada ao animal, pode reduzir a exposição da mucosa escamosa ao ácido. A quantidade deve integrar o plano nutricional individual." },
    { title: "Água e eletrólitos", text: "Manter água limpa disponível, inclusive em viagens. Não administrar soluções concentradas de eletrólitos em jejum; seguir a diluição e o modo de uso indicados pelo veterinário e pelo fabricante." },
  ] },
  { id: "prevencao", title: "Prevenção e manejo", items: [
    { title: "Rotina previsível", text: "Reduzir mudanças bruscas, favorecer contato social seguro e tempo de pasto. Organizar transporte, alojamento e alimentação para diminuir estresse, especialmente em animais com EGGD." },
    { title: "Carga de treino individualizada", text: "Incluir recuperação e descanso, ajustar a intensidade à condição do cavalo e evitar exercício após longos períodos de jejum. Manejo alimentar e exercício são fatores importantes para ESGD." },
    { title: "Uso responsável de AINEs", text: "Fenilbutazona e flunixina devem ter indicação, dose e duração supervisionadas. Não combinar anti-inflamatórios nem aumentar doses por conta própria. Lesões glandulares têm causas multifatoriais, não apenas medicamentosas." },
    { title: "Prevenir não é medicar sempre", text: "Supressão ácida preventiva pode ser considerada em situações de risco específicas, sob orientação veterinária. Suplementos e medicação não substituem alimentação, redução do estresse ou acompanhamento." },
  ] },
  { id: "tratamento", title: "Tratamento e acompanhamento", items: [
    { title: "Confirmar e localizar", text: "Os sinais clínicos não confirmam EGUS nem predizem o grau. A gastroscopia deve avaliar mucosa escamosa, glandular e região pilórica; ESGD e EGGD podem coexistir." },
    { title: "ESGD · controlar a exposição ácida", text: "Em adultos, o plano costuma combinar omeprazol e correção alimentar por cerca de quatro semanas, com duração ajustada à resposta. A melhora do apetite não garante cicatrização." },
    { title: "EGGD · abordagem própria", text: "A resposta ao omeprazol isolado é menos previsível. Podem ser necessários sucralfato ou outras estratégias prescritas, tratamento mais prolongado e redução do estresse. Não extrapolar automaticamente o protocolo da ESGD." },
    { title: "Reavaliar antes de encerrar", text: "Planejar gastroscopia de controle e revisar os fatores de risco. Se as lesões persistirem, verificar administração, formulação, adesão e diagnósticos associados. Potros precisam de avaliação e protocolos próprios." },
    { title: "Quando é urgente", text: "Cólica intensa ou persistente, prostração importante, recusa de alimento ou mamadas, distensão abdominal ou piora rápida exigem atendimento veterinário imediato, especialmente em potros." },
  ] },
] as const;