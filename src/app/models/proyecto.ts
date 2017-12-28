export class Proyecto {
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public urlRepositorio: string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public datos: any[]
    ) { }
}
