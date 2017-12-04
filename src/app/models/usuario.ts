export class Usuario {
    public _id: number;
    public nombre: string;
    public email: string;
    public estado: string;
    public keycloak_id: string;
    public telefono: string;
    public ocupacion: string;
    constructor(
        _id: number,
        nombre: string,
        email: string,
        estado: string,
        keycloak_id: string,
        telefono: string,
        ocupacion: string,

    ) { 
        this._id = _id;
        this.nombre= nombre;
        this.email=email;
        this.estado=estado;
        this.keycloak_id=keycloak_id;
        this.telefono=telefono;
        this.ocupacion=ocupacion;
    }
}
