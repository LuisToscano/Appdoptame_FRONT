
(function () {
    $(document).ready(function () {
        $.isBlank = function (string) {
            return(!string || $.trim(string) === "");
        };
        //custom jquery functions
        jQuery.fn.exists = function () {
            return this.length > 0;
        };

        if (!$("#console").exists()) {
            $('body').append('<div id="console"></div>');
        }

        if (typeof window.preload !== 'function') {
            window.preload = function () {
                if (!$("#waiting4").exists()) {
                    $('body').append('<div id="waiting4"><div class="preloader-wrapper big active">    <div class="spinner-layer spinner-blue-only">      <div class="circle-clipper left">        <div class="circle"></div>     </div><div class="gap-patch">        <div class="circle"></div>      </div><div class="circle-clipper right">        <div class="circle"></div>      </div>    </div>  </div></div>');
                    $("#waiting4")
                            .css({
                                'display': 'none',
                                'position': 'fixed',
                                'width': '100%',
                                'height': '100%',
                                'justify-content': 'space-between',
                                'flex-direction': 'row',
                                'align-items': 'center',
                                'text-align': 'center',
                                'z-index': '9999',
                                'background': 'rgba(0,0,0,0.6)'
                            }).children('.preloader-wrapper')
                            .css({
                                'margin': '0 auto'
                            });
                }

                $("#waiting4").css("display", "flex")
                        .show()
                        .fadeIn("fast", function () {
                        });

            };
        }

        if (typeof window.unsetpreload !== 'function') {
            window.unsetpreload = function () {
                $("#waiting4").css("display", "flex")
                        .hide()
                        .fadeOut("fast", function () {
                        });
            };
        }

        if (typeof window.show_error !== 'function') {
            window.show_error = function (str_error) {
                var n = noty({
                    text: str_error,
                    layout: 'topLeft',
                    theme: 'defaultTheme',
                    type: 'error',
                    timeout: 5000
                });
            };
        }
        
        if (typeof window.show_success !== 'function') {
            window.show_success = function (str_error) {
                var n = noty({
                    text: str_error,
                    layout: 'topLeft',
                    theme: 'defaultTheme',
                    type: 'success',
                    timeout: 5000
                });
            };
        }
    });


    $(document).ready(function () {
        $(".send-ajax").each(function () {
            var that = this;
            $(document).on("submit", $(that).selector, function (evt) {
                if (!$(that).prop('ready')) {
                    evt.preventDefault();
                    var $valid = $(that).valid();
                    if (!$valid) {
                        return false;
                    } else {
                        preload();
                        $.ajax({
                            type: 'post',
                            url: $(that).prop('verify'),
                            data: $(that).serializeArray(),
                            async: true,
                            dataType: 'json',
                            success: function (data, textStatus, jqXHR) {

                                if (data.status) {
                                    console.log($(this));
                                    var texto = 'Acción realizada correctamente.';
                                    if (typeof data.mensaje !== 'undefined') {
                                        texto = data.mensaje;
                                    }
                                    show_success(texto);

                                    //$().redirect($(that).attr('action'), $(that).serializeArray());
                                } else {
                                    var texto = 'No es posible realizar esta acción.';
                                    if (typeof data.mensaje !== 'undefined') {
                                        texto = data.mensaje;
                                    }
                                    show_error(texto);
                                }
                                unsetpreload();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //location.reload();
                                console.error(this);
                                $('body').html(jqXHR.responseText);
                                show_error('7Un error ocurrió, porfavor, intentalo denuevo \n' + errorThrown);
                                unsetpreload();
                                //next = false;
                            }
                        });//*/
                    }
                }
            });
        });
    });


    $(document).ready(function () {

        $('[data-validation="number"]').keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                    // Allow: Ctrl+A
                            (e.keyCode == 65 && e.ctrlKey === true) ||
                            // Allow: home, end, left, right
                                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                });
    });

    $(document).ready(function () {

        $('.prevent-type').keypress(function (event) {

            if (event.keyCode === 10 || event.keyCode === 13)
                event.preventDefault();
            return false;
        });
    });

})();

function send_ajaxly(url, data, async, redirect) {
    if (typeof async === 'undefined') {
        async = true;
    }

    //console.log(async);
    //console.log(redirect);

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        timeout: 3000,
        async: async,
        dataType: 'json',
        beforeSend: function () {
            preload();
        },
        complete: function () {
            unsetpreload();
            if (typeof redirect !== 'undefined') {

                window.location = redirect;
            }
        },
        cache: false,
        success: function (data, textStatus, jqXHR) {
            return data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //location.reload();
            $('#console').html(jqXHR.responseText);
            alert(textStatus + '\n4Un error ocurrió, porfavor, intentalo denuevo \n' + errorThrown);
            //next = false;
        }

    });
}

function load_ajaxly(url, data, async, selector) {
    if (typeof async === 'undefined') {
        async = true;
    }

    //console.log(async);

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        timeout: 3000,
        async: async,
        beforeSend: function () {
            preload();
        },
        complete: function () {
            unsetpreload();
        },
        cache: false,
        success: function (data, textStatus, jqXHR) {
            $(selector).html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //location.reload();
            $('#console').html(jqXHR.responseText);
            alert(textStatus + '\n5Un error ocurrió, porfavor, intentalo denuevo \n' + errorThrown);
            //next = false;
        }

    });
}

function load_form_ajaxly(url, data, selector, str_function, async) {
    if (typeof async === 'undefined') {
        async = true;
    }
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        timeout: 3000,
        async: async,
        dataType: 'json',
        beforeSend: function () {
            preload();
        },
        complete: function () {
            unsetpreload();
        },
        cache: false,
        success: function (data, textStatus, jqXHR) {
            if (data === true || data === false) {

            } else {
                interpretate_json(data, selector);
                if (data.detalles) {
                    data.detalles = JSON.recursive_parse(data.detalles);
                }
                interpretate_json(data.detalles, selector);


            }//console.log(data);
            window[str_function]();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //location.reload();
            $('#console').html(jqXHR.responseText);
            alert(textStatus + '\n6Un error ocurrió, porfavor, intentalo denuevo \n' + errorThrown);
            //next = false;
        }
    });
}



function interpretate_json(data, selector) {
    //console.log(data);
    $.each(data, function (k, v) {
        //console.log("Key:" + k + " Value:" + v);
        if ((typeof v === 'object' || typeof v === 'array') && !$.isBlank(v)) {
            //console.log($.isBlank(v));
            //console.log(v);
            $.each(v, function (k2, v2) {
                //console.log("Key:" + k2 + " Value:" + v2);

                if ((typeof v2 === 'object' || typeof v2 === 'array') && !$.isBlank(v2)) {

                    $.each(v2, function (k3, v3) {
                        if (k3 === 'scalar') {
                            action_form(selector + " [name='" + k2 + "']", v3);
                        } else {
                            action_form(selector + " [name='" + k2 + "']", v3);
                        }
                    });
                } else {
                    //console.log(k2);
                    action_form(selector + " [name='" + k2 + "']", v2.toString())
                    action_form(selector + " [name='" + k + "']", v2.toString());
                }
            });
        } else {
            action_form(selector + " [name='" + k + "']", v);
        }
    });
}

function action_form(element, v3) {
    var correcto = true;
    var entro = false;
    var str_compare = $(element).prop('type');
    do {
        var sigue = false;
        //console.log(str_compare);
        switch (str_compare) {
            case 'checkbox':
                $(element + "[value='" + v3 + "']").attr('checked', true);
                break;
            case 'radio':
                $(element + "[value='" + v3 + "']").attr('checked', true);
                break;
            case 'textarea':
            case 'select-one':
            case 'hidden':
            case 'text':
                $(element).val(v3);
                break;
            case 'undefined':

            default :
                if (!entro) {
                    element = element.slice(0, element.length - 2) + "[]']";
                    if ($(element).exists()) {
                        str_compare = $(element)[0].type;
                        str_compare = str_compare.trim();
                        sigue = true;

                    }
                    entro = true;
                } else {
                    //console.warn($(element));
                    correcto = false;
                }

                break;
        }
    } while (sigue);
    return correcto;
    //console.log($(element).prop('type'));
}