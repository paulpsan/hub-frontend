export class Usuario {
    public _id: number;
    public nombre: string;
    public email: string;
    public password: string;
    public role: string;
    public datos: string;
    constructor(
        _id: number,
        nombre: string,
        email: string,
        password: string,
        role: string,
        datos: string,

    ) {
        this._id = _id;
        this.nombre= nombre;
        this.email=email;
        this.password=password;
        this.role=role;
        this.datos=datos;
    }
}
