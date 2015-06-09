/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createForm(jsonURL, idContainer) {

    $.getJSON(jsonURL, function (data) {

        var config = data.form_config;
        var formSpecialAttr = specialAttributes(data.form_config, false);
        var formId = idContainer + '_form';
        var formTag = '<form id="' + formId+ '" '+formSpecialAttr+'></form>';
        
        if(!isEmpty(data.form_config.label))
        {
            var formLabelTag = '<h2>'+data.form_config.label+'</h2>'
            $("#" + idContainer).append(formLabelTag);
        }
        
        delete(data.form_config);
        var cont = 0;
        
        $("#" + idContainer).append(formTag);

        $.each(data, function (key, val) {
            if (!isEmpty(val.type)) {
                cont++;

                switch (val.type) {
                    case "text":
                    {
                        textBoxSettings(cont, key, val, formId, config.required_default);
                        break;
                    }

                    case "password":
                    {
                        textBoxSettings(cont, key, val, formId, config.required_default);
                        break;
                    }

                    case "email":
                    {
                        textBoxSettings(cont, key, val, formId, config.required_default);
                        break;
                    }

                    case "select":
                    {
                        selectBoxSettings(cont, key, val, formId, config.required_default);
                        break;
                    }

                    case "checkbox":
                    {
                        var newCont = checkBoxSettings(cont, key, val, formId, config.required_default);
                        cont = newCont;
                        break;
                    }
                    
                    case "radio":
                    {
                        var newCont = radioButtonSettings(cont, key, val, formId, config.required_default);
                        cont = newCont;
                        break;
                    }
                    
                    case "range":
                    {
                        rangeSettings(cont, key, val, formId, config.required_default);
                        break;
                    }

                    default:
                    {
                        break;
                    }

                }
            }
        });
    });

}

/*******************************************************************************************/

function textBoxSettings(cont, key, val, idContainer, isRequired) {

    var div_id = idContainer + '_' + 'element_container_' + cont;
    var element_id = idContainer + '_input_' + cont;
    var specialAtr = specialAttributes(val, isRequired);

    var containerDiv = '<div id="' + div_id + '" class="input-field"></div>';
    var inputTag = '<input type="' + val.type + '" id="' + element_id + '" name="' + key + '"' + specialAtr + '>';

    var labelTag = "";
    if (!isEmpty(val.label)) {
        if (isEmpty(val.placeholder) && isEmpty(val.value) && val.animated_label)
        {
            labelTag += '<label for="' + element_id + '" >' + val.label + '</label>';
        }
        else
        {
            labelTag += '<label for="' + element_id + '" class="active">' + val.label + '</label>';
        }
    }

    $("#" + idContainer).append(containerDiv);
    $("#" + div_id).append(inputTag);
    $("#" + div_id).append(labelTag);
}

/*******************************************************************************************/

function selectBoxSettings(cont, key, val, idContainer, isRequired) {
    var div_id = idContainer + '_' + 'element_container_' + cont;
    var element_id = idContainer + '_input_' + cont;

    var strRequired = "";
    if (existsAndisTrue(val.required))
    {
        strRequired = " required";
    }

    var containerDiv = '<div id="' + div_id + '" class="input-field"></div>';
    var inputTag = '<select id="' + element_id + '"' + strRequired + ' name="' + key + '"></select>';
    var optionTag = '';

    if (val.options != null) {
        $.each(val.options, function (value, option) {
            var specialAtrib = specialAttributes(option, false);
            optionTag += '<option value="' + value + '" ' + specialAtrib + '>' + option.tag + '</option>'
        });
    }

    var labelTag = '';
    if (!isEmpty(val.label)) {
        labelTag += '<label>' + val.label + '</label>';
    }

    $("#" + idContainer).append(containerDiv);
    $("#" + div_id).append(inputTag);
    $("#" + element_id).append(optionTag);
    $("#" + div_id).append(labelTag);
}

/*******************************************************************************************/

function checkBoxSettings(cont, key, val, idContainer, isRequired) {
    if (val.direction != null && val.direction == "horizontal") {

        if (!isEmpty(val.label))
        {
            var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $("#" + idContainer).append(openingLabelTag);
        }

        var div_id = idContainer + '_' + 'element_container_' + cont;
        var containerDiv = '<p id="' + div_id + '"></p>';
        $("#" + idContainer).append(containerDiv);
        var checkCont = cont;
        if (val.boxes != null) {
            $.each(val.boxes, function (value, option) {
                var checkTag = "", labelTag = "";
                var specialAtrib = specialAttributes(option, isRequired);
                var element_id = idContainer + '_input_' + checkCont;
                checkTag += '<input type="checkbox" id="' + element_id + '" name="' + key + '[]" ' + specialAtrib + '/>';
                labelTag += '<label for="' + element_id + '">' + option.tag + '</label>';
                $("#" + div_id).append(checkTag);
                $("#" + div_id).append(labelTag);
                checkCont++;
            });
            return checkCont - 1;
        }
        else
        {
            return cont;
        }
    }
    else if (val.direction != null && val.direction == "vertical") {

        if (!isEmpty(val.label))
        {
            var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $("#" + idContainer).append(openingLabelTag);
        }

        var checkCont = cont;
        if (val.boxes != null) {
            $.each(val.boxes, function (value, option) {
                var div_id = idContainer + '_' + 'element_container_' + checkCont;
                var containerDiv = '<p id="' + div_id + '"></p>';
                $("#" + idContainer).append(containerDiv);
                var checkTag = "", labelTag = "";
                var specialAtrib = specialAttributes(option, false);
                var element_id = idContainer + '_input_' + checkCont;
                checkTag += '<input type="checkbox" name="' + key + '[]" id="' + element_id + '" ' + specialAtrib + '/>';
                labelTag += '<label for="' + element_id + '">' + option.tag + '</label>';
                $("#" + div_id).append(checkTag);
                $("#" + div_id).append(labelTag);
                checkCont++;
            });
            return checkCont - 1;
        }
        else
        {
            return cont;
        }
    }
}

/*******************************************************************************************/

function radioButtonSettings(cont, key, val, idContainer, isRequired) {
    if (val.direction != null && val.direction == "horizontal") {

        if (!isEmpty(val.label))
        {
            var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $("#" + idContainer).append(openingLabelTag);
        }

        var div_id = idContainer + '_' + 'element_container_' + cont;
        var containerDiv = '<p id="' + div_id + '"></p>';
        $("#" + idContainer).append(containerDiv);
        var radioCont = cont;
        if (val.radios != null) {
            $.each(val.radios, function (value, option) {
                if (existsAndisTrue(val.with_gap))
                {
                    option.with_gap = true;
                }
                var checkTag = "", labelTag = "";
                var specialAtrib = specialAttributes(option, isRequired);
                var element_id = idContainer + '_input_' + radioCont;
                checkTag += '<input type="radio" id="' + element_id + '" name="' + key + '" ' + specialAtrib + '/>';
                labelTag += '<label for="' + element_id + '">' + option.tag + '</label>';
                $("#" + div_id).append(checkTag);
                $("#" + div_id).append(labelTag);
                radioCont++;
            });
            return radioCont - 1;
        }
        else
        {
            return cont;
        }
    }
    else if (val.direction != null && val.direction == "vertical") {

        if (!isEmpty(val.label))
        {
            var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $("#" + idContainer).append(openingLabelTag);
        }

        var radioCont = cont;
        if (val.radios != null) {
            $.each(val.radios, function (value, option) {

                if (existsAndisTrue(val.with_gap))
                {
                    option.with_gap = true;
                }

                var div_id = idContainer + '_' + 'element_container_' + radioCont;
                var containerDiv = '<p id="' + div_id + '"></p>';
                $("#" + idContainer).append(containerDiv);
                var checkTag = "", labelTag = "";
                var specialAtrib = specialAttributes(option, false);
                var element_id = idContainer + '_input_' + radioCont;
                checkTag += '<input type="radio" name="' + key + '" id="' + element_id + '" ' + specialAtrib + '/>';
                labelTag += '<label for="' + element_id + '">' + option.tag + '</label>';
                $("#" + div_id).append(checkTag);
                $("#" + div_id).append(labelTag);
                radioCont++;
            });
            return radioCont - 1;
        }
        else
        {
            return cont;
        }
    }
}


/*******************************************************************************************/

function rangeSettings(cont, key, val, idContainer, isRequired) {

    var div_id = idContainer + '_' + 'element_container_' + cont;
    var element_id = idContainer + '_input_' + cont;
    
    if (!isEmpty(val.label)) {
        var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $("#" + idContainer).append(openingLabelTag);
    }

    var specialAtr = specialAttributes(val, isRequired);
    var containerDiv = '<p id="' + div_id + '" class="range-field"></p>';
    var inputTag = '<input type="range" id="' + element_id + '" name="' + key + '"' + specialAtr + '>';

    $("#" + idContainer).append(containerDiv);
    $("#" + div_id).append(inputTag);
}

/*************************************************************************************************/


function specialAttributes(val, defRequired)
{
    var specialAtr = "";

    if (val.required != null)
    {
        if (val.required == true)
            specialAtr += " required";
    }
    else
    {
        if (defRequired)
            specialAtr += " required";
    }

    if (existsAndisTrue(val.disabled)) {
        specialAtr += " disabled";
    }

    if (!isEmpty(val.placeholder)) {
        specialAtr += ' placeholder = "' + val.placeholder + '"';
    }

    if (existsAndisTrue(val.validate)) {
        specialAtr += ' class = "validate"';
    }

    if (!isEmpty(val.value)) {
        specialAtr += ' value = "' + val.value + '"';
    }

    if (existsAndisTrue(val.selected)) {
        specialAtr += ' selected';
    }

    if (existsAndisTrue(val.checked)) {
        specialAtr += ' checked';
    }

    if (existsAndisTrue(val.filled_in)) {
        specialAtr += ' class = "filled-in"';
    }
    
    if (existsAndisTrue(val.with_gap)) {
        specialAtr += ' class = "with-gap"';
    }
    
    if (existsAndisTrue(val.min)) {
        specialAtr += ' min = "'+val.min+'"';
    }
    
    if (existsAndisTrue(val.max)) {
        specialAtr += ' max = "'+val.max+'"';
    }
    
    if (!isEmpty(val.action)) {
        specialAtr += ' action = "'+val.action+'"';
    }
    
    if (!isEmpty(val.method)) {
        specialAtr += ' method = "'+val.method+'"';
    }
    
    if (!isEmpty(val.name)) {
        specialAtr += ' name = "'+val.name+'"';
    }

    return specialAtr;
}

/*******************************************************************************************/

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null)
        return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }

    return true;
}

/*******************************************************************************************/

function existsAndisTrue(obj) {

    return obj != null && obj == true;
}