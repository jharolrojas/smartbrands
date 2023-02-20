import React from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Import styles
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
import "datatables.net-select-bs5/css/select.bootstrap5.min.css";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
// Import scripts
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "jszip";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-select-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.flash";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";
const useConfigDataTable = () => {
  const datatable = () => {
    $(document).ready(function () {
      $(".datatable").each(function (index) {
        if (!$.fn.dataTable.isDataTable($(this))) {
          $(this).DataTable({
            responsive: true,
            select: {
              style: "os",
              selector: "td:not(:last-child)",
              blurable: true,
            },
            buttons: [
              {
                extend: "copy",
                exportOptions: {
                  columns: ":not(:last-child)",
                },
              },
              {
                extend: "csv",
                exportOptions: {
                  columns: ":not(:last-child)",
                },
              },
              {
                extend: "excel",
                exportOptions: {
                  columns: ":not(:last-child)",
                },
              },
              {
                extend: "pdf",
                exportOptions: {
                  columns: ":not(:last-child)",
                },
              },
              {
                extend: "print",
                exportOptions: {
                  columns: ":not(:last-child)",
                },
              },
              {
                extend: "colvis",
                className: "btn btn-light",
              },
            ],
          });
        }
      });
    });
  };

  return { datatable };
};

export default useConfigDataTable;
