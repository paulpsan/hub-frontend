export const GLOBAL = {
  // url: 'https://test.adsib.gob.bo/api_backend/api/',
  url: "http://localhost:3000/api/",

  // codigos de prueba
  optionsToastr: {
    positionClass: "toast-bottom-left",
    closeButton: true
  },
  //Configuracion de dataTable españo
  dtOptions : {
    order: [[0, "desc"]],
    pagingType: "full_numbers",
    pageLength: 10,
    language: {
      search: "Buscar",
      lengthMenu: "Mostrar _MENU_ entradas",
      info: "Mostrar Pagina _PAGE_ de _PAGES_",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultimo"
      }
    }
  },

  TOGGLE: true
};
