/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createForm(jsonURL, form) {

    $.getJSON(jsonURL, function (data) {

        var config = data.form_config;
        var formObj = jQuery('<form/>', {});
        newSpecialAttributes(formObj, data.form_config, false);
        
        if(!isEmpty(data.form_config.label))
        {
            var formLabelTag = '<h2>'+data.form_config.label+'</h2>'
            $("#" + form).append(formLabelTag);
        }
        
        delete(data.form_config);
        var cont = 0;
        
        $("#" + form).append(formObj);

        $.each(data, function (key, val) {
            if (!isEmpty(val.type)) {
                cont++;

                switch (val.type) {
                    case "text":
                    {
                        textBoxSettings(cont, key, val, formObj, config.required_default);
                        break;
                    }

                    case "password":
                    {
                        textBoxSettings(cont, key, val, formObj, config.required_default);
                        break;
                    }

                    case "email":
                    {
                        textBoxSettings(cont, key, val, formObj, config.required_default);
                        break;
                    }

                    case "select":
                    {
                        selectBoxSettings(cont, key, val, formObj, config.required_default);
                        break;
                    }

                    case "checkbox":
                    {
                        var newCont = checkBoxSettings(cont, key, val, formObj, config.required_default);
                        cont = newCont;
                        break;
                    }
                    
                    case "radio":
                    {
                        var newCont = radioButtonSettings(cont, key, val, formObj, config.required_default);
                        cont = newCont;
                        break;
                    }
                    
                    case "range":
                    {
                        rangeSettings(cont, key, val, formObj, config.required_default);
                        break;
                    }
                    
                    case "textarea":
                    {
                        textAreaSettings(cont, key, val, formObj, config.required_default);
                        break;
                    }
                    
                    case "file":
                    {
                        fileSettings(cont, key, val, formObj, config.required_default);
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

function textBoxSettings(cont, key, val, form, isRequired) {

    var containerObj = jQuery('<div/>', {"class":"input-field"});
    
    var inputObj = jQuery('<input/>', {"type":val.type, "name":key});
    newSpecialAttributes(inputObj, val, isRequired);

    var labelObj;
    if (!isEmpty(val.label)) {
        if (isEmpty(val.placeholder) && isEmpty(val.value) && val.animated_label)
        {
            labelObj = jQuery('<label>'+val.label+'</label>', {});
        }
        else
        {
            labelObj = jQuery('<label class="active">'+val.label+'</label>', {});
        }
    }

    containerObj.append(inputObj);
    containerObj.append(labelObj);
    form.append(containerObj);
}

/*******************************************************************************************/

function selectBoxSettings(cont, key, val, form, isRequired) {
    var containerObj = jQuery('<div/>', {"class":"input-field"});    
    var inputObj = jQuery('<select/>', {"name":key});
     
    if (existsAndisTrue(val.required))
    {
        inputObj.attr("required", "required");
    }

    if (val.options != null) {
        $.each(val.options, function (value, option) {
            var optionObj = jQuery('<option>'+option.tag+'</option>', {});
            newSpecialAttributes(optionObj, option, false);
            optionObj.attr("value", value);
            inputObj.append(optionObj);
        });
    }

    var labelObj;
    if (!isEmpty(val.label)) {
        labelObj = jQuery('<label>'+val.label+'</label>', {});
    }
    
    containerObj.append(inputObj);
    containerObj.append(labelObj);
    form.append(containerObj);
    
}

/*******************************************************************************************/

function checkBoxSettings(cont, key, val, form, isRequired) {
    
    if (!isEmpty(val.label))
        {
            var openingLabelObj = jQuery('<span class="form_label">'+val.label+'</span>', {});
            form.append(openingLabelObj);
        }
        
    if (val.direction != null && val.direction == "horizontal") {

        var containerObj = jQuery('<p/>', {}); 
        form.append(containerObj);
 
        if (val.boxes != null) {
            $.each(val.boxes, function (value, option) {
                var inputObj = jQuery('<input/>', {"type":"checkbox", "name":key+"[]"});
                newSpecialAttributes(inputObj, option, isRequired);
                
                var labelObj = jQuery('<label>'+option.tag+'</label>', {});
                containerObj.append(inputObj);
                containerObj.append(labelObj);
            });
        }
    }
    else if (val.direction != null && val.direction == "vertical") {

        if (val.boxes != null) {
            $.each(val.boxes, function (value, option) {
                var containerObj = jQuery('<p/>', {}); 
                form.append(containerObj);
 
                var inputObj = jQuery('<input/>', {"type":"checkbox", "name":key+"[]"});
                newSpecialAttributes(inputObj, option, isRequired);
                
                var labelObj = jQuery('<label>'+option.tag+'</label>', {});
                containerObj.append(inputObj);
                containerObj.append(labelObj);
            });
    }
}
}
/*******************************************************************************************/

function radioButtonSettings(cont, key, val, form, isRequired) {
    if (val.direction != null && val.direction == "horizontal") {

        if (!isEmpty(val.label))
        {
            var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $("#" + form).append(openingLabelTag);
        }

        var div_id = form + '_' + 'element_container_' + cont;
        var containerDiv = '<p id="' + div_id + '"></p>';
        $("#" + form).append(containerDiv);
        var radioCont = cont;
        if (val.radios != null) {
            $.each(val.radios, function (value, option) {
                if (existsAndisTrue(val.with_gap))
                {
                    option.with_gap = true;
                }
                var checkTag = "", labelTag = "";
                var specialAtrib = specialAttributes(option, isRequired);
                var element_id = form + '_input_' + radioCont;
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
            $("#" + form).append(openingLabelTag);
        }

        var radioCont = cont;
        if (val.radios != null) {
            $.each(val.radios, function (value, option) {

                if (existsAndisTrue(val.with_gap))
                {
                    option.with_gap = true;
                }

                var div_id = form + '_' + 'element_container_' + radioCont;
                var containerDiv = '<p id="' + div_id + '"></p>';
                $("#" + form).append(containerDiv);
                var checkTag = "", labelTag = "";
                var specialAtrib = specialAttributes(option, false);
                var element_id = form + '_input_' + radioCont;
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

function rangeSettings(cont, key, val, form, isRequired) {
    
    if (!isEmpty(val.label)) {
        var openingLabelTag = '<span class="form_label">' + val.label + '</span>';
            $(form).append(openingLabelTag);
    }

    var specialAtr = specialAttributes(val, isRequired);
    var containerDiv = '<p class="range-field"></p>';
    var inputTag = '<input type="range" name="' + key + '"' + specialAtr + '>';

    $("#" + form).append(containerDiv);
    $("#" + div_id).append(inputTag);
}

/*******************************************************************************************/

function textAreaSettings(cont, key, val, form, isRequired) {

    var containerObj = jQuery('<div/>', {"class":"input-field"});
    var inputObj = jQuery('<textarea/>', {"class":"materialize-textarea"});

    var labelObj;
    if (!isEmpty(val.label)) {
            labelObj = jQuery('<label>'+val.label+'</label>', {});
    }

    containerObj.append(inputObj);
    containerObj.append(labelObj);
    form.append(containerObj);
}

/*******************************************************************************************/

function fileSettings(cont, key, val, form, isRequired) {
    
    var containerObj = jQuery('<div/>', {"class":"file-field input-field"});
    var inputObj = jQuery('<input/>', {"class":"file-path validate", "type":"text"});
    
    if (!isEmpty(val.label))
        {
            var openingLabelObj = jQuery('<span class="form_label">'+val.label+'</span>', {});
            form.append(openingLabelObj);
        }
    
    var buttonDivObj = jQuery('<div/>', {"class":"btn"});
    
    var spanObj = jQuery('<span/>', {});
    var fileObj = jQuery('<input/>', {"type":"file"});
    
    if (!isEmpty(val.button_tag)) {
        spanObj.html(val.button_tag);
    }

    buttonDivObj.append(spanObj);
    buttonDivObj.append(fileObj);
    containerObj.append(inputObj);
    containerObj.append(buttonDivObj);
    form.append(containerObj);
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

/*************************************************************************************************/


function newSpecialAttributes(obj, val, defRequired)
{
    if (val.required != null)
    {
        if (val.required == true){
            obj.attr('required', 'required');
        }   
    }
    else
    {
        if (defRequired){
            obj.attr('required', 'required');
        }
    }

    if (existsAndisTrue(val.disabled)) {
        obj.attr('disabled', 'disabled');
    }

    if (!isEmpty(val.placeholder)) {
        obj.attr('placeholder', val.placeholder);
    }

    if (existsAndisTrue(val.validate)) {
        obj.addClass('validate');
    }

    if (!isEmpty(val.value)) {
        obj.attr('value', val.value);
    }

    if (existsAndisTrue(val.selected)) {
        obj.attr('selected', 'selected');
    }

    if (existsAndisTrue(val.checked)) {
        obj.attr('checked', 'checked');
    }

    if (existsAndisTrue(val.filled_in)) {
        obj.addClass('filled-in');
    }
    
    if (existsAndisTrue(val.with_gap)) {
        obj.addClass('with-gap');
    }
    
    if (existsAndisTrue(val.min)) {
        obj.attr('min', val.min);
    }
    
    if (existsAndisTrue(val.max)) {
        obj.attr('max', val.max);
    }
    
    if (!isEmpty(val.action)) {
        obj.attr('action', val.action);
    }
    
    if (!isEmpty(val.method)) {
        obj.attr('method', val.method);
    }
    
    if (!isEmpty(val.name)) {
        obj.attr('name', val.name);
    }
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