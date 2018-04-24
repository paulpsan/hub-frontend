export class Proyecto {
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public urlRepositorio: string,
        public avatar:string,
        public categoria:string,
        public licencias:string,
        public clasificacion:string,
        public id_usuario:number,
        public tipo:string,
        public datos: any[]
    ) { }
}
