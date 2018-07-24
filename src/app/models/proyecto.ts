export class Proyecto {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public urlRepositorio: string,
    public fk_repositorio: number,
    public fk_usuario: number,
    public avatar: string,
    public tipo: string,
    public clasificacion?: any,
    public categorias?: any[],
    public licencias?: any[],
    public usuarios?: any[],
    public commits?: string,
    public datos?: any[],
    public fechaCreacion?:any,
    public ultimaActividad?:any    
  ) {}
}
