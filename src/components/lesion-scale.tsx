import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LESION_GRADES, gradesForMucosa } from "@/lib/egus-guide";

export function LesionScale() {
  const [selected, setSelected] = useState(0);
  const grades = gradesForMucosa("escamosa") ?? LESION_GRADES;
  const lesion = grades.find((item) => item.grade === selected) ?? grades[0];
  return <div className="mt-6">
    <div className="grid grid-cols-5 gap-2" role="group" aria-label="Graus da mucosa escamosa">
      {grades.map((item) => <Button key={item.grade} variant={selected === item.grade ? "default" : "outline"} aria-pressed={selected === item.grade} onClick={() => setSelected(item.grade)} className="h-14 flex-col gap-0 px-1"><span className="font-mono text-xs">Grau</span><span className="text-lg">{item.grade}</span></Button>)}
    </div>
    <div className="mt-5 grid items-center gap-6 border-y py-6 sm:grid-cols-[180px_1fr]">
      <div className="mucosa-diagram relative flex h-28 items-center justify-center overflow-hidden rounded-md" aria-label={`Esquema didático do grau ${selected}`}>
        <div className={`mucosa-surface mucosa-grade-${selected}`}><span /><span /><span /><span /></div>
        <span className="absolute bottom-2 left-2 font-mono text-[10px] text-foreground">Esquema didático</span>
      </div>
      <div className="min-h-24"><h3 className="font-display text-2xl text-primary">{lesion.title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{lesion.description}</p></div>
    </div>
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Escala 0–4 para a mucosa <strong className="text-foreground">escamosa (ESGD)</strong>. Na mucosa glandular (EGGD), descrevem-se localização, distribuição e aspecto das lesões; esta escala não deve ser aplicada automaticamente. O grau não determina sozinho a intensidade dos sinais ou o tratamento.</p>
  </div>;
}