import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LesionScale } from "@/components/lesion-scale";
import { GUIDE_TOPICS } from "@/lib/egus-guide";
import feedingPhoto from "@/assets/equino-feno.jpg";

export const Route = createFileRoute("/guia")({
  head: () => ({ meta: [
    { title: "Guia clínico de EGUS — Lesões, tratamento e prevenção" },
    { name: "description", content: "Graus 0 a 4 da ESGD, supressores ácidos, proteção da mucosa, alimentação e prevenção da EGUS em equinos." },
    { property: "og:title", content: "Guia clínico de EGUS" },
    { property: "og:description", content: "Estude as lesões gástricas, o manejo alimentar e as opções de tratamento em equinos." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Guide,
});

function Guide() {
  const [tab, setTab] = useState("lesoes");
  const topic = GUIDE_TOPICS.find((item) => item.id === tab);
  return <main className="min-h-screen bg-background">
    <header className="border-b bg-card px-5 py-4"><div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3"><Link to="/" className="font-display text-xl font-semibold text-primary">EGUS <span className="font-normal italic">Simulator</span></Link><Button variant="ghost" asChild><Link to="/"><ArrowLeft />Simulador</Link></Button></div></header>
    <section className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground"><BookOpen size={16} /> Caderno clínico / EGUS</div>
      <h1 className="mt-4 font-display text-4xl font-semibold text-primary md:text-5xl">Da lesão ao manejo.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Duas mucosas, abordagens diferentes. A localização das lesões orienta o raciocínio clínico e o acompanhamento.</p>
      <nav className="mt-8 flex flex-wrap gap-2 border-b pb-4" aria-label="Temas do guia">
        {[{ id: "lesoes", title: "Lesões 0–4" }, ...GUIDE_TOPICS.map((t) => ({ id: t.id, title: t.id === "supressores" ? "Supressores" : t.id === "alimentacao" ? "Alimentação" : t.id === "prevencao" ? "Prevenção" : "Tratamento" }))].map((t) => <Button key={t.id} variant={tab === t.id ? "default" : "ghost"} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>{t.title}</Button>)}
      </nav>
      <div className="mt-8 max-w-3xl" aria-live="polite">
        {tab === "lesoes" ? <><h2 className="font-display text-3xl text-primary">Lesões da mucosa escamosa</h2><p className="mt-3 leading-relaxed text-muted-foreground">A gastroscopia permite identificar e graduar as lesões. A escala descreve o aspecto endoscópico, de epitélio íntegro a ulceração extensa.</p><LesionScale /><div className="mt-8 grid gap-6 sm:grid-cols-2"><div><h3 className="font-display text-2xl text-primary">ESGD · mucosa escamosa</h3><p className="mt-2 leading-relaxed text-muted-foreground">Região não glandular, menos protegida contra o ácido. Jejum, refeições ricas em amido e exercício podem aumentar sua exposição ao conteúdo ácido.</p></div><div><h3 className="font-display text-2xl text-primary">EGGD · mucosa glandular</h3><p className="mt-2 leading-relaxed text-muted-foreground">Região com mecanismos de proteção. Registrar antro, piloro ou corpo, lesões focais ou difusas e aspecto hiperêmico, hemorrágico, fibrinoso ou ulcerado.</p></div></div></> : topic && <><h2 className="font-display text-3xl text-primary">{topic.title}</h2>{tab === "alimentacao" && <figure className="mt-5"><img src={feedingPhoto} alt="Imagem ilustrativa de equino consumindo feno em baia arejada" width={1280} height={896} loading="lazy" className="aspect-[2/1] w-full rounded-md object-cover" /><figcaption className="mt-2 font-mono text-xs text-muted-foreground">Imagem ilustrativa gerada por IA · volumoso e manejo</figcaption></figure>}<div className="mt-5 divide-y">{topic.items.map((item, i) => <article key={item.title} className="grid grid-cols-[28px_1fr] gap-3 py-6"><span className="pt-1 font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-display text-2xl text-primary">{item.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p></div></article>)}</div></>}
      </div>
      <footer className="mt-12 border-t pt-6 text-sm leading-relaxed text-muted-foreground"><p>Material educativo. Não substitui avaliação, prescrição ou acompanhamento veterinário. Casos fictícios e esquemas ilustrativos; revisão técnica recomendada antes da apresentação.</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-3"><a className="inline-flex items-center gap-1 underline underline-offset-4" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4858038/" target="_blank" rel="noreferrer">Consenso ECEIM (2015)<ArrowUpRight size={14} /></a><a className="inline-flex items-center gap-1 underline underline-offset-4" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8725839/" target="_blank" rel="noreferrer">Revisão de ESGD (2021)<ArrowUpRight size={14} /></a><a className="inline-flex items-center gap-1 underline underline-offset-4" href="https://science.unimelb.edu.au/avpg/equine-guidelines/gastrointestinal/oesophagitis,-equine-squamous-gastric-disease-esgd-and-equine-glandular-gastric-disease-eggd-gastric-ulceration" target="_blank" rel="noreferrer">Diretrizes veterinárias de Melbourne<ArrowUpRight size={14} /></a></div></footer>
    </section>
  </main>;
}