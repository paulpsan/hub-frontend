export class Usuario {
  constructor(
    public _id: number,
    public nombre: string,
    public email: string,
    public password: string,
    public role: string,
    public login: string,
    public tipo: string,
    public estado: string,
    public avatar?: string,
    public descripcion?: string,
    public clasificacion?: any[],
    public datos?: any[],
    public fecha_creaccion?: string,
    public fecha_modificacion?: string
  ) {}
}
