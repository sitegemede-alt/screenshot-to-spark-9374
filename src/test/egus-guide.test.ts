import { describe, expect, it } from "vitest";
import { gradesForMucosa } from "@/lib/egus-guide";

describe("Classificação da mucosa", () => {
  it("oferece os graus 0 a 4 para ESGD", () => {
    expect(gradesForMucosa("escamosa")?.map((item) => item.grade)).toEqual([0, 1, 2, 3, 4]);
  });
  it("não aplica a escala escamosa à EGGD", () => {
    expect(gradesForMucosa("glandular")).toBeNull();
  });
});