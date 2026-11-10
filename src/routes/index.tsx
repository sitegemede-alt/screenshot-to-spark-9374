import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGUS Simulator — Caso clínico equino" },
      { name: "description", content: "Simulador de caso clínico sobre Síndrome da Úlcera Gástrica Equina (EGUS)." },
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

const QUESTIONS: Q[] = [
  {
    key: "suspeita", title: "Suspeita clínica", question: "Qual é a principal suspeita clínica?",
    options: [
      { label: "EGUS", correct: true, feedback: "Correto! Queda de desempenho, irritabilidade, hiporexia e cólicas recorrentes em cavalo atleta sob estresse são sinais clássicos de EGUS." },
      { label: "Doença respiratória", feedback: "Pode reduzir desempenho, mas não explica hiporexia, irritabilidade e desconforto abdominal." },
      { label: "Fratura", feedback: "Causaria claudicação evidente, não sinais digestivos." },
      { label: "Dermatite", feedback: "Não se relaciona com os sinais digestivos e comportamentais apresentados." },
    ],
  },
  {
    key: "exame", title: "Exames complementares", question: "Qual exame confirma o diagnóstico?",
    options: [
      { label: "Hemograma", feedback: "Geralmente sem alterações específicas na EGUS." },
      { label: "Bioquímica", feedback: "Útil para avaliar estado geral, mas não confirma úlceras." },
      { label: "Ultrassonografia", feedback: "Avalia parede e motilidade, mas não visualiza a mucosa gástrica." },
      { label: "Radiografia", feedback: "Não é indicada para avaliar lesões da mucosa gástrica." },
      { label: "Gastroscopia", correct: true, feedback: "Correto! A gastroscopia é o padrão-ouro: permite visualizar diretamente a mucosa gástrica e identificar e graduar as lesões." },
    ],
  },
  {
    key: "gastro", title: "Gastroscopia", image: true, question: "Qual alteração é observada?",
    options: [
      { label: "Úlceras na mucosa escamosa, próximas ao margo plicatus", correct: true, feedback: "Correto! Lesões na região escamosa junto ao margo plicatus são as mais comuns em cavalos atletas (ESGD)." },
      { label: "Mucosa íntegra, sem alterações", feedback: "Não condiz com o quadro clínico; as lesões estão presentes." },
      { label: "Corpo estranho no estômago", feedback: "Achado raro e não compatível com o caso." },
      { label: "Neoplasia gástrica", feedback: "Muito rara em equinos e incompatível com a idade e a história." },
    ],
  },
  {
    key: "conduta", title: "Conduta", question: "Qual é a conduta mais adequada?",
    options: [
      { label: "Omeprazol + manejo: mais volumoso/feno à vontade, menos concentrado, redução do estresse e revisão de AINEs", correct: true, feedback: "Excelente! O tratamento farmacológico só é eficaz a longo prazo com a correção dos fatores de risco e do manejo alimentar." },
      { label: "Apenas omeprazol, mantendo a rotina atual", feedback: "As úlceras tendem a recidivar se os fatores de risco não forem corrigidos." },
      { label: "Aumentar o concentrado para recuperar o desempenho", feedback: "Mais concentrado e jejuns prolongados agravam a acidez gástrica." },
      { label: "Repouso absoluto sem tratamento", feedback: "Sem tratamento e correção do manejo, as lesões persistem." },
    ],
  },
];

const HISTORY = [
  { k: "Alimentação", v: "Alto volume de concentrado (2x ao dia), pouco feno e longos períodos de jejum." },
  { k: "Treinamento", v: "Treino intenso diário, viagens frequentes para competições e baias isoladas." },
  { k: "Medicamentos", v: "Uso recorrente de fenilbutazona (AINE) após provas nos últimos meses." },
  { k: "Histórico clínico", v: "Episódios leves de cólica, pelagem opaca e leve perda de condição corporal." },
];

function rating(s: number) {
  if (s >= 90) return "Excelente";
  if (s >= 70) return "Muito bom";
  if (s >= 50) return "Precisa revisar";
  return "Tente novamente";
}

function Index() {
  const [step, setStep] = useState(0); // 0 home, 1 caso, 2..5 questions, 6 result
  const [seen, setSeen] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const reset = () => { setStep(0); setSeen([]); setAnswers({}); };
  const score = QUESTIONS.reduce((s, q) => s + (q.options[answers[q.key] ?? -1]?.correct ? 25 : 0), 0);

  if (step === 0)
    return (
      <main className="bg-hero flex min-h-screen flex-col items-center justify-center px-6 text-center text-primary-foreground">
        <span className="mb-6 text-sm uppercase tracking-[0.3em] text-gold">Medicina Veterinária · Equinos</span>
        <h1 className="font-display text-6xl font-bold md:text-8xl">EGUS <span className="text-gold">Simulator</span></h1>
        <p className="mt-4 max-w-xl text-lg opacity-80">Simulador de atendimento clínico em equinos</p>
        <Button size="lg" onClick={() => setStep(1)} className="mt-10 h-14 bg-gold px-10 text-lg font-bold text-accent-foreground hover:bg-gold/90">Iniciar Simulação</Button>
      </main>
    );

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-primary px-6 py-4 text-primary-foreground">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <span className="font-display text-2xl font-bold">EGUS <span className="text-gold">Simulator</span></span>
          <span className="text-sm opacity-80">Etapa {Math.min(step, 6)} de 6</span>
        </div>
      </header>
      <div className="h-1 bg-secondary"><div className="h-1 bg-gold transition-all" style={{ width: `${(step / 6) * 100}%` }} /></div>

      <section className="mx-auto max-w-3xl px-5 py-10">
        <div className="rounded-xl border bg-card p-6 shadow-card md:p-10">
          {step === 1 && (
            <>
              <h2 className="font-display text-4xl font-bold text-primary">Caso clínico</h2>
              <p className="mt-4 text-lg">Cavalo atleta, <b>8 anos</b>, com redução de desempenho, irritabilidade, redução do apetite e episódios de desconforto abdominal.</p>
              <p className="mt-6 font-bold text-muted-foreground">Investigue a anamnese (clique em cada item):</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {HISTORY.map((h) => {
                  const open = seen.includes(h.k);
                  return (
                    <button key={h.k} onClick={() => !open && setSeen([...seen, h.k])}
                      className={`rounded-lg border-2 p-4 text-left transition ${open ? "border-gold bg-secondary" : "border-border hover:border-primary"}`}>
                      <div className="font-bold text-primary">{h.k}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{open ? h.v : "Toque para investigar"}</div>
                    </button>
                  );
                })}
              </div>
              <Button size="lg" className="mt-8 w-full" disabled={seen.length < HISTORY.length} onClick={() => setStep(2)}>
                {seen.length < HISTORY.length ? `Investigue todos os itens (${seen.length}/4)` : "Continuar"}
              </Button>
            </>
          )}

          {step >= 2 && step <= 5 && (() => {
            const q = QUESTIONS[step - 2]!;
            const chosen = answers[q.key] ?? -1;
            const picked = q.options[chosen];
            const done = picked !== undefined;
            return (
              <>
                <h2 className="font-display text-4xl font-bold text-primary">{q.title}</h2>
                {q.image && (
                  <div className="mt-5 flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-gold bg-secondary text-muted-foreground">
                    Espaço reservado para imagem de gastroscopia
                  </div>
                )}
                <p className="mt-5 text-lg font-medium">{q.question}</p>
                <div className="mt-4 grid gap-3">
                  {q.options.map((o, i) => {
                    const state = !done ? "border-border hover:border-primary" : o.correct ? "border-success bg-success/10" : i === chosen ? "border-destructive bg-destructive/10" : "border-border opacity-60";
                    return (
                      <button key={o.label} disabled={done} onClick={() => setAnswers({ ...answers, [q.key]: i })}
                        className={`rounded-lg border-2 p-4 text-left font-medium transition ${state}`}>{o.label}</button>
                    );
                  })}
                </div>
                {done && (
                  <div className={`mt-5 rounded-lg border-l-4 bg-secondary p-4 ${picked!.correct ? "border-success" : "border-destructive"}`}>
                    <b>{picked!.correct ? "Acertou! " : "Não é a melhor opção. "}</b>{picked!.feedback}
                    {!picked!.correct && <p className="mt-2 text-sm text-muted-foreground">Resposta correta: {q.options.find((o) => o.correct)!.feedback}</p>}
                  </div>
                )}
                <Button size="lg" className="mt-8 w-full" disabled={!done} onClick={() => setStep(step + 1)}>
                  {step === 5 ? "Ver resultado" : "Continuar"}
                </Button>
              </>
            );
          })()}

          {step === 6 && (
            <div className="text-center">
              <h2 className="font-display text-4xl font-bold text-primary">Resultado</h2>
              <div className="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-full border-8 border-gold">
                <span className="font-display text-6xl font-bold text-primary">{score}</span>
              </div>
              <p className="mt-6 font-display text-3xl font-bold text-gold">{rating(score)}</p>
              <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
                {QUESTIONS.map((q) => (
                  <li key={q.key} className="flex justify-between border-b py-2">
                    <span>{q.title}</span>
                    <span className={q.options[answers[q.key] ?? -1]?.correct ? "text-success" : "text-destructive"}>{q.options[answers[q.key] ?? -1]?.correct ? "+25" : "0"}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-8 h-12 bg-gold px-10 font-bold text-accent-foreground hover:bg-gold/90" onClick={reset}>Jogar novamente</Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
