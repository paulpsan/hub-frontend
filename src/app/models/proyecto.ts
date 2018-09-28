export class Proyecto {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public visibilidad: string,
    public path: string,
    public fk_repositorio: number,
    public fk_usuario: number,
    public usuario: any[],
    public avatar: string,
    public tipo: string,
    public origenUrl: string,
    public clasificacion?: any,
    public categorias?: any[],
    public licencias?: any[],
    public usuarios?: any[],
    public grupo?: any,
    public es_grupo?: any,
    public commits?: string,
    public datos?: any[],
    public fechaCreacion?: any,
    public ultimaActividad?: any
  ) { }
}
