export const GLOBAL = {

  // codigos de prueba
  optionsToastr: {
    positionClass: "toast-bottom-left",
    closeButton: true
  },
  //Configuracion de dataTable españo
  dtOptions: {
    order: [[0, "desc"]],
    pagingType: "full_numbers",
    lengthMenu: [[5, 10, 50, -1], [5, 10, 50, "All"]],
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

  TOGGLE: false
};
