import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ArrowLeft, Stethoscope } from "lucide-react";
import { LesionScale } from "@/components/lesion-scale";
import horsePhoto from "@/assets/equino-campo.jpg";
import foalPhoto from "@/assets/egua-potro.jpg";
import feedingPhoto from "@/assets/equino-feno.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGUS Simulator — Caso clínico equino" },
      { name: "description", content: "Simulador de casos clínicos de EGUS com guia de lesões 0–4, supressores ácidos, alimentação, tratamento e prevenção." },
      { property: "og:title", content: "EGUS Simulator" },
      { property: "og:description", content: "Assuma o papel de veterinário e conduza um caso de EGUS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Opt = { label: string; correct?: boolean; feedback: string };
type Q = { key: string; title: string; question: string; intro?: string; options: Opt[]; image?: boolean };

type Case = { name: string; intro: string; history: { k: string; v: string }[]; suspeita: string; gastro: Opt[]; conduta: Opt[] };

const EXAM: Opt[] = [
  { label: "Hemograma", feedback: "Geralmente sem alterações específicas na EGUS." },
  { label: "Bioquímica", feedback: "Útil para avaliar estado geral, mas não confirma úlceras." },
  { label: "Ultrassonografia", feedback: "Avalia parede e motilidade, mas não visualiza a mucosa gástrica." },
  { label: "Radiografia", feedback: "Não é indicada para avaliar lesões da mucosa gástrica." },
  { label: "Gastroscopia", correct: true, feedback: "Correto! A gastroscopia é o padrão-ouro: permite visualizar diretamente a mucosa gástrica e identificar e graduar as lesões." },
];

const wrongGastro = (extra: string): Opt[] => [
  { label: "Mucosa íntegra, sem alterações", feedback: "Não condiz com o quadro clínico; as lesões estão presentes." },
  { label: "Corpo estranho no estômago", feedback: "Achado raro e não compatível com o caso." },
  { label: extra, feedback: "Não é o achado deste caso." },
];

const CASES: Case[] = [
  {
    name: "Thunder — Puro-Sangue de corrida",
    intro: "Cavalo atleta, 8 anos, com redução de desempenho, irritabilidade, redução do apetite e episódios de desconforto abdominal.",
    history: [
      { k: "Alimentação", v: "Alto volume de concentrado (2x ao dia), pouco feno e longos períodos de jejum." },
      { k: "Treinamento", v: "Treino intenso diário e viagens frequentes para competições." },
      { k: "Medicamentos", v: "Uso recorrente de fenilbutazona após provas." },
      { k: "Histórico clínico", v: "Episódios leves de cólica e pelagem opaca." },
    ],
    suspeita: "Queda de desempenho, hiporexia e cólicas recorrentes em atleta sob estresse e dieta rica em concentrado são clássicos de EGUS.",
    gastro: [{ label: "Úlceras na mucosa escamosa, próximas ao margo plicatus", correct: true, feedback: "Correto! Doença da mucosa escamosa (ESGD) é a mais comum em cavalos de corrida." }, ...wrongGastro("Neoplasia gástrica")],
    conduta: [
      { label: "Omeprazol + feno à vontade, menos concentrado, redução do estresse e revisão do uso de AINEs", correct: true, feedback: "Excelente! O tratamento só funciona a longo prazo com correção do manejo alimentar e dos fatores de risco." },
      { label: "Apenas omeprazol, mantendo a rotina", feedback: "Sem corrigir o manejo, as úlceras recidivam." },
      { label: "Aumentar o concentrado para recuperar o desempenho", feedback: "Mais concentrado agrava a acidez gástrica." },
      { label: "Repouso absoluto sem tratamento", feedback: "Sem tratamento e correção do manejo, as lesões persistem." },
    ],
  },
  {
    name: "Estrela — Égua de hipismo",
    intro: "Égua Brasileira de Hipismo, 12 anos, que passou a recusar o salto, demonstra desconforto ao apertar a cilha e come devagar.",
    history: [
      { k: "Alimentação", v: "Feno de boa qualidade à vontade, concentrado moderado." },
      { k: "Treinamento", v: "Mudou de cavaleiro e de centro hípico há 2 meses; temperamento ansioso." },
      { k: "Medicamentos", v: "Nenhum medicamento recente." },
      { k: "Histórico clínico", v: "Sensibilidade ao encilhar, bocejos frequentes, emagrecimento leve." },
    ],
    suspeita: "Dor ao encilhar, alteração de comportamento e estresse por mudança de ambiente apontam para EGUS.",
    gastro: [{ label: "Lesões hiperêmicas e hemorrágicas na mucosa glandular, região do antro pilórico", correct: true, feedback: "Correto! Doença da mucosa glandular (EGGD), muito associada ao estresse e temperamento." }, ...wrongGastro("Úlceras apenas no esôfago")],
    conduta: [
      { label: "Omeprazol associado a sucralfato por tempo prolongado + redução do estresse e rotina estável", correct: true, feedback: "Excelente! EGGD responde mais lentamente; sucralfato e manejo do estresse são fundamentais." },
      { label: "Apenas trocar a sela", feedback: "A dor tem origem gástrica; a sela não resolve o problema." },
      { label: "Fenilbutazona para aliviar a dor", feedback: "AINEs podem agravar lesões glandulares." },
      { label: "Omeprazol por apenas 3 dias", feedback: "Tempo insuficiente; lesões glandulares exigem semanas de tratamento." },
    ],
  },
  {
    name: "Faísca — Potro lactente",
    intro: "Potro de 2 meses com bruxismo (ranger de dentes), salivação excessiva, mamadas interrompidas e deitar em decúbito dorsal.",
    history: [
      { k: "Alimentação", v: "Mamando, mas interrompe as mamadas com frequência." },
      { k: "Treinamento", v: "Não se aplica; recém-transportado com a mãe para outro haras." },
      { k: "Medicamentos", v: "Recebeu flunixina há 1 semana por diarreia." },
      { k: "Histórico clínico", v: "Diarreia recente, já resolvida; diminuição do ganho de peso." },
    ],
    suspeita: "Bruxismo, ptialismo e decúbito dorsal em potro são sinais típicos de úlcera gástrica.",
    gastro: [{ label: "Múltiplas úlceras na mucosa escamosa e glandular", correct: true, feedback: "Correto! Potros podem ter lesões extensas após estresse, doenças e uso de AINEs." }, ...wrongGastro("Hérnia diafragmática")],
    conduta: [
      { label: "Omeprazol + sucralfato, suspender AINEs, manter amamentação e acompanhar o potro", correct: true, feedback: "Excelente! Potros precisam de tratamento rápido para evitar complicações como perfuração e estenose pilórica." },
      { label: "Desmamar imediatamente", feedback: "O desmame precoce aumenta o estresse e piora o quadro." },
      { label: "Continuar flunixina", feedback: "AINEs agravam as úlceras." },
      { label: "Apenas observar", feedback: "Úlceras em potros podem evoluir rapidamente para complicações graves." },
    ],
  },
  {
    name: "Pampa — Cavalo de enduro",
    intro: "Cavalo Árabe, 10 anos, de enduro, com perda de condição corporal, apetite seletivo (deixa o concentrado) e cólicas pós-prova.",
    history: [
      { k: "Alimentação", v: "Jejum de 8 horas antes das provas; acesso limitado à água durante transportes." },
      { k: "Treinamento", v: "Provas longas de 80–120 km mensalmente." },
      { k: "Medicamentos", v: "Uso de eletrólitos orais concentrados em seringa." },
      { k: "Histórico clínico", v: "Cólicas leves após provas, pelagem sem brilho." },
    ],
    suspeita: "Exercício prolongado, jejum e eletrólitos concentrados são fatores de risco importantes para EGUS.",
    gastro: [{ label: "Úlceras na mucosa escamosa ao longo da curvatura menor e margo plicatus", correct: true, feedback: "Correto! O exercício expõe a mucosa escamosa ao ácido gástrico." }, ...wrongGastro("Impactação gástrica")],
    conduta: [
      { label: "Omeprazol + evitar jejum, oferecer alfafa antes do exercício e diluir eletrólitos", correct: true, feedback: "Excelente! Alfafa tampona o ácido e a correção do manejo previne recidivas." },
      { label: "Aumentar o jejum antes das provas", feedback: "Jejum prolongado aumenta a exposição da mucosa ao ácido." },
      { label: "Dobrar a dose de eletrólitos", feedback: "Eletrólitos concentrados irritam a mucosa." },
      { label: "Apenas antibióticos", feedback: "A EGUS não é tratada primariamente com antibióticos." },
    ],
  },
  {
    name: "Bela — Égua de lazer",
    intro: "Égua Mangalarga, 15 anos, com dor crônica no casco, que passou a ter apetite reduzido, fezes amolecidas e apatia.",
    history: [
      { k: "Alimentação", v: "Pasto durante o dia, baia à noite sem volumoso." },
      { k: "Treinamento", v: "Uso leve em passeios; atualmente em repouso." },
      { k: "Medicamentos", v: "Fenilbutazona diária há 30 dias por laminite." },
      { k: "Histórico clínico", v: "Laminite crônica; perda de peso nas últimas semanas." },
    ],
    suspeita: "Uso prolongado de AINE e longo período noturno sem volumoso favorecem úlceras gástricas.",
    gastro: [{ label: "Úlceras na mucosa glandular associadas ao uso de AINE", correct: true, feedback: "Correto! AINEs inibem prostaglandinas protetoras, lesando a mucosa glandular." }, ...wrongGastro("Parasitas gástricos (Gasterophilus) apenas")],
    conduta: [
      { label: "Substituir/reduzir o AINE, omeprazol + sucralfato e feno disponível à noite", correct: true, feedback: "Excelente! Controlar a causa (AINE) e o manejo é essencial." },
      { label: "Aumentar a fenilbutazona", feedback: "Pioraria as lesões gástricas." },
      { label: "Retirar todo o volumoso", feedback: "A falta de volumoso aumenta a acidez." },
      { label: "Apenas vermifugar", feedback: "Não trata a causa principal deste caso." },
    ],
  },
];

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

function buildQuestions(c: Case): Q[] {
  const susp: Opt[] = [
    { label: "EGUS", correct: true, feedback: "Correto! " + c.suspeita },
    { label: "Doença respiratória", feedback: "Não explica os sinais digestivos e comportamentais." },
    { label: "Fratura", feedback: "Causaria claudicação evidente, não sinais digestivos." },
    { label: "Dermatite", feedback: "Não se relaciona com os sinais apresentados." },
  ];
  return [
    { key: "suspeita", title: "Suspeita clínica", question: "Qual é a principal suspeita clínica?", options: shuffle(susp) },
    { key: "exame", title: "Exames complementares", question: "Qual exame confirma o diagnóstico?", options: shuffle(EXAM) },
    { key: "gastro", title: "Gastroscopia", image: true, question: "Qual alteração é observada?", options: shuffle(c.gastro) },
    { key: "conduta", title: "Conduta", question: "Qual é a conduta mais adequada?", options: shuffle(c.conduta) },
  ];
}

function rating(s: number) {
  if (s >= 90) return "Excelente";
  if (s >= 70) return "Muito bom";
  if (s >= 50) return "Precisa revisar";
  return "Tente novamente";
}

function Index() {
  const [step, setStep] = useState(0); // 0 home, 1 caso, 2..5 questions, 6 result
  const [caseIdx, setCaseIdx] = useState(-1);
  const [QUESTIONS, setQuestions] = useState<Q[]>([]);
  const current = CASES[caseIdx];
  const HISTORY = current?.history ?? [];
  const start = () => {
    let i = Math.floor(Math.random() * CASES.length);
    if (i === caseIdx) i = (i + 1) % CASES.length;
    const nextCase = CASES[i];
    if (!nextCase) return;
    setCaseIdx(i); setQuestions(buildQuestions(nextCase)); setSeen([]); setAnswers({}); setStep(1);
  };
  const [seen, setSeen] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const reset = start;
  const score = QUESTIONS.reduce((s, q) => s + (q.options[answers[q.key] ?? -1]?.correct ? 25 : 0), 0);

  if (step === 0)
    return (
      <main className="min-h-screen bg-background">
        <section className="relative min-h-[520px] overflow-hidden text-primary-foreground md:min-h-[580px]">
          <img src={horsePhoto} width={1536} height={1024} alt="Imagem ilustrativa de cavalo em pasto verde" className="absolute inset-0 h-full w-full object-cover object-[65%_center]" />
          <div className="photo-shade absolute inset-0" />
          <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-foreground/25 pb-5"><span className="font-mono text-xs">Medicina veterinária / Equinos</span><Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/guia"><BookOpen />Guia clínico</Link></Button></div>
            <div className="pb-3 pt-16 md:pt-20">
              <h1 className="max-w-lg font-display text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">EGUS<br /><span className="font-normal italic text-gold">Simulator</span></h1>
              <p className="mt-5 max-w-xs text-lg leading-relaxed text-primary-foreground/85">Do primeiro sinal à conduta clínica. Um paciente, quatro decisões.</p>
              <Button size="lg" onClick={start} className="mt-7 h-12 bg-gold px-6 text-base font-semibold text-accent-foreground hover:bg-gold/90">Iniciar Simulação<ArrowRight /></Button>
              <p className="mt-5 font-mono text-xs text-primary-foreground/80">5 pacientes · 4 perguntas · 100 pontos</p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-6 py-9 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="font-mono text-xs text-muted-foreground">Caderno clínico</span><h2 className="mt-2 font-display text-3xl font-semibold text-primary">Entender, tratar, prevenir.</h2></div><Button variant="outline" asChild><Link to="/guia">Abrir guia<BookOpen /></Link></Button></div>
          <div className="mt-7 grid gap-7 md:grid-cols-[1fr_1fr]">
            <Link to="/guia" className="group block"><img src={feedingPhoto} alt="Imagem ilustrativa de equino se alimentando de feno" width={1280} height={896} loading="lazy" className="aspect-[2/1] w-full rounded-md object-cover" /><div className="mt-3 flex items-center justify-between"><h3 className="font-display text-2xl text-primary">Alimentação & manejo</h3><ArrowRight size={20} className="text-primary" /></div></Link>
            <div className="divide-y border-t"><Link to="/guia" className="flex items-center justify-between gap-4 py-5"><div><span className="font-mono text-xs text-muted-foreground">01 / Mucosa escamosa</span><h3 className="mt-1 font-display text-2xl text-primary">Lesões: do grau 0 ao 4</h3></div><ArrowRight size={20} className="shrink-0 text-primary" /></Link><Link to="/guia" className="flex items-center justify-between gap-4 py-5"><div><span className="font-mono text-xs text-muted-foreground">02 / Conduta clínica</span><h3 className="mt-1 font-display text-2xl text-primary">Supressores & tratamento</h3></div><ArrowRight size={20} className="shrink-0 text-primary" /></Link><Link to="/guia" className="flex items-center justify-between gap-4 py-5"><div><span className="font-mono text-xs text-muted-foreground">03 / Longo prazo</span><h3 className="mt-1 font-display text-2xl text-primary">Prevenção de recidivas</h3></div><ArrowRight size={20} className="shrink-0 text-primary" /></Link></div>
          </div>
          <p className="mt-8 border-t pt-4 text-xs leading-relaxed text-muted-foreground">Material educativo · Casos fictícios · Imagens ilustrativas geradas por IA, não fotografias dos pacientes nem exames reais. Prescrição e diagnóstico dependem do veterinário.</p>
        </section>
      </main>
    );

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-primary px-6 py-4 text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-baseline justify-between">
          <Button variant="ghost" onClick={() => setStep(0)} aria-label="Voltar ao início" className="h-auto px-0 text-primary-foreground hover:bg-transparent hover:text-gold"><ArrowLeft /><span className="font-display text-lg font-semibold">EGUS <span className="font-normal italic text-gold">Simulator</span></span></Button>
          <span className="font-mono text-xs tabular-nums text-primary-foreground/80">Etapa {Math.min(step, 6)}/6</span>
        </div>
      </header>
      <div className="h-1 bg-secondary"><div className="h-1 bg-gold transition-all" style={{ width: `${(step / 6) * 100}%` }} /></div>

      <section className="mx-auto max-w-3xl px-5 py-10">
        <div>
          {step === 1 && (
            <>
              <h2 className="font-display text-4xl font-semibold text-primary md:text-5xl">Caso clínico</h2>
              <figure className="mt-6"><img src={caseIdx === 2 ? foalPhoto : caseIdx === 4 ? feedingPhoto : horsePhoto} alt={caseIdx === 2 ? "Imagem ilustrativa de égua e potro no pasto" : "Imagem ilustrativa de equino"} width={1280} height={896} className="aspect-[2/1] w-full rounded-md object-cover" /><figcaption className="mt-2 font-mono text-xs text-muted-foreground">Imagem ilustrativa gerada por IA · paciente fictício</figcaption></figure>
              <p className="eyebrow mt-5 text-gold">Paciente</p>
              <p className="mt-1.5 text-xl font-semibold text-foreground">{current?.name}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{current?.intro}</p>
              <p className="eyebrow mt-8 text-muted-foreground">Anamnese</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {HISTORY.map((h) => {
                  const open = seen.includes(h.k);
                  return (
                    <Button variant="outline" key={h.k} onClick={() => !open && setSeen([...seen, h.k])} aria-expanded={open}
                      className={`h-auto min-h-28 flex-col items-start justify-start whitespace-normal rounded-lg border-2 p-4 text-left transition ${open ? "border-gold bg-secondary" : "border-border hover:border-primary"}`}>
                      <div className="eyebrow text-primary/55">{h.k}</div>
                      <div className={`mt-2 text-sm leading-relaxed ${open ? "text-foreground" : "italic text-muted-foreground"}`}>{open ? h.v : "Investigar"}</div>
                    </Button>
                  );
                })}
              </div>
              <Button size="lg" className="mt-8 w-full" disabled={seen.length < HISTORY.length} onClick={() => setStep(2)}>
                {seen.length < HISTORY.length ? `Investigue todos os itens (${seen.length}/4)` : "Continuar"}
              </Button>
            </>
          )}

          {step >= 2 && step <= 5 && (() => {
             const q = QUESTIONS[step - 2];
             if (!q) return null;
            const chosen = answers[q.key] ?? -1;
            const picked = q.options[chosen];
            const done = picked !== undefined;
            return (
              <>
                <h2 className="font-display text-4xl font-semibold text-primary md:text-5xl">{q.title}</h2>
                {q.image && (
                   <div className="mt-6 border-y py-5">
                     <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><Stethoscope size={16} />Exame endoscópico · caso simulado</div>
                     <p className="mt-3 leading-relaxed text-muted-foreground">Avaliação da mucosa escamosa, glandular e do piloro. Identifique o achado compatível com a história de {current?.name.split(" — ")[0]}.</p>
                  </div>
                )}
                <p className="mt-6 text-xl font-semibold leading-snug text-foreground">{q.question}</p>
                <div className="mt-4 grid gap-3">
                  {q.options.map((o, i) => {
                    const state = !done ? "border-border hover:border-primary" : o.correct ? "border-success bg-success/10" : i === chosen ? "border-destructive bg-destructive/10" : "border-border opacity-60";
                    return (
                       <Button variant="outline" key={o.label} disabled={done} onClick={() => setAnswers({ ...answers, [q.key]: i })}
                         className={`h-auto min-h-14 justify-start whitespace-normal rounded-lg border-2 p-4 text-left text-[0.95rem] leading-snug font-medium transition disabled:opacity-100 ${state}`}>{o.label}</Button>
                    );
                  })}
                </div>
                 {picked && (
                   <div className={`mt-6 rounded-lg border-l-4 bg-secondary p-4 ${picked.correct ? "border-success" : "border-destructive"}`}>
                     <p className={`eyebrow mb-2 ${picked.correct ? "text-success" : "text-destructive"}`}>{picked.correct ? "Correto" : "Reveja"}</p>
                     <p className="text-[0.95rem] leading-relaxed text-foreground">{picked.feedback}</p>
                     {!picked.correct && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Resposta correta: {q.options.find((o) => o.correct)?.feedback}</p>}
                  </div>
                )}
                 {done && q.image && <section className="mt-8"><h3 className="font-display text-2xl text-primary">Como graduar as lesões?</h3><LesionScale /><p className="mt-4 text-sm text-muted-foreground">Este caso não contém gastroscopia real; não é possível atribuir um grau somente pelos sinais clínicos.</p></section>}
                <Button size="lg" className="mt-8 w-full" disabled={!done} onClick={() => setStep(step + 1)}>
                  {step === 5 ? "Ver resultado" : "Continuar"}
                </Button>
              </>
            );
          })()}

          {step === 6 && (
            <div className="text-center">
              <h2 className="font-display text-4xl font-semibold text-primary md:text-5xl">Resultado</h2>
              <div className="mx-auto mt-9 flex h-44 w-44 flex-col items-center justify-center rounded-full border-4 border-gold">
                <span className="font-display text-6xl font-semibold tabular-nums text-primary">{score}</span>
                <span className="eyebrow mt-1 text-muted-foreground">de 100</span>
              </div>
              <p className="mt-7 font-display text-3xl font-normal italic text-gold">{rating(score)}</p>
              <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
                {QUESTIONS.map((q) => (
                  <li key={q.key} className="flex items-baseline justify-between border-b py-2">
                    <span className="text-[0.95rem]">{q.title}</span>
                    <span className={`font-mono text-sm tabular-nums ${q.options[answers[q.key] ?? -1]?.correct ? "text-success" : "text-destructive"}`}>{q.options[answers[q.key] ?? -1]?.correct ? "+25" : "0"}</span>
                  </li>
                ))}
              </ul>
               <div className="mt-8 border-t pt-6 text-left"><h3 className="font-display text-2xl text-primary">Plano de acompanhamento</h3><p className="mt-3 leading-relaxed text-muted-foreground">{current?.conduta.find((o) => o.correct)?.label}. Planeje reavaliação veterinária e gastroscopia de controle; melhora clínica não garante cicatrização.</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Para prevenir recidivas: evitar jejum prolongado, manter água e volumoso, ajustar concentrado e treino, reduzir estresse e revisar o uso de AINEs.</p></div>
               <Button size="lg" className="mt-9 h-auto min-h-12 whitespace-normal bg-gold px-6 py-3 font-semibold text-accent-foreground hover:bg-gold/90" onClick={reset}>Jogar novamente (novo caso)<ArrowRight /></Button>
               <div className="mt-3"><Button variant="ghost" asChild><Link to="/guia"><BookOpen />Revisar lesões e tratamento</Link></Button></div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
