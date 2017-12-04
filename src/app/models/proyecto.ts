export class Proyecto {
    constructor(
        public id: string,
        public nombre: string,
        public descripcion: string,
        public datos: string,
        public urlRepositorio: string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public directorio:string,
        public ssh_url_repo:string,
        public web_url:string,
        public contador_estrellas:string,
        public totalCommits:string,
        public licencia:string,
        public icono:string
    ) { }
}
