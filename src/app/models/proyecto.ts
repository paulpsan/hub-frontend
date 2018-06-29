export class Proyecto {
  constructor(
    public _id: string,
    public nombre: string,
    public descripcion: string,
    public urlRepositorio: string,
    public fk_repositorio: number,
    public avatar: string,
    public categorias: any[],
    public licencias: any[],
    public clasificacion: any[],
    public usuarios: any[],
    public commits: string,
    public fk_usuario: number,
    public tipo?: string,
    public datos?: any[],
  ) {}
}
