/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$( "#notif_icon" ).click(function() {
         
        $("#dark_bg").css("display", "block")
                .hide()
                .fadeIn("fast", function () {
                });
         
         $("#notifications").css("display", "flex")
                .hide()
                .fadeIn("fast", function () {
                });
      });
      
      $( "#dark_bg" ).click(function() {
         
        $("#dark_bg").css("display", "block")
                .show()
                .fadeOut("fast", function () {
                });
         
         $("#notifications").css("display", "flex")
                .show()
                .fadeOut("fast", function () {
                });
      });
      
      $( "#side_menu_icon" ).click(function() {
         
        $("#dark_bg").css("display", "block")
                .show()
                .fadeOut("fast", function () {
                });
         
         $("#notifications").css("display", "flex")
                .show()
                .fadeOut("fast", function () {
                });
      });
      
      $( "#notif_icon" ).click(function() {
         
        $("#dark_bg").css("display", "block")
                .hide()
                .fadeIn("fast", function () {
                });
         
         $("#notifications").css("display", "flex")
                .hide()
                .fadeIn("fast", function () {
                });
      });

      $( "#flbtn_busqueda img").click(function() {
        if($(event.target).attr("id") == "buscar_perro")
        {
            $(event.target).attr("id", "buscar_gato");
            $(event.target).attr("src", "img/buscar_gato.png");
            
            $( ".grid_cell img" ).each(function( ) {
                $(this).attr("src", "img/gato.jpg");
              });
        }
        else if($(event.target).attr("id") == "buscar_gato")
        {
            $(event.target).attr("id", "buscar_perro");
            $(event.target).attr("src", "img/buscar_perro.png");
            
            $( ".grid_cell img" ).each(function() {
                $(this).attr("src", "img/perro.jpg");
              });
        }
      });
