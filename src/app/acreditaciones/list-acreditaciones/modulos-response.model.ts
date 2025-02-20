export interface FiltroResponse {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    content: any[]; // Aquí puedes definir una interfaz específica en lugar de `any[]`
  }
  