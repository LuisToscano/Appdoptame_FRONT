/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createForm(jsonURL, container) {

    $.getJSON(jsonURL, function (data) {

        var config = data.form_config;
        var formObj = jQuery('<form/>', {});
        newSpecialAttributes(formObj, data.form_config, false);

        if (!isEmpty(data.form_config.label))
        {
            var formLabelTag = '<h2>' + data.form_config.label + '</h2>';
            container.append(formLabelTag);
        }

        delete(data.form_config);
        var cont = 0;

        container.append(formObj);

        $.each(data, function (key, val) {
            if (!isEmpty(val.type)) {
                cont++;

                switch (val.type) {
                    case "text":
                    {
                        textBoxSettings(key, val, formObj);
                        break;
                    }

                    case "password":
                    {
                        textBoxSettings(key, val, formObj);
                        break;
                    }

                    case "email":
                    {
                        textBoxSettings(key, val, formObj);
                        break;
                    }

                    case "select":
                    {
                        selectBoxSettings(key, val, formObj);
                        break;
                    }

                    case "checkbox":
                    {
                        checkBoxSettings(key, val, formObj);
                        break;
                    }

                    case "radio":
                    {
                        radioButtonSettings(key, val, formObj);
                        break;
                    }

                    case "range":
                    {
                        rangeSettings(key, val, formObj);
                        break;
                    }

                    case "textarea":
                    {
                        textAreaSettings(key, val, formObj);
                        break;
                    }

                    case "file":
                    {
                        fileSettings(key, val, formObj);
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

function textBoxSettings(key, val, form) {

    var containerObj = jQuery('<div/>', {"class": "input-field"});

    var inputObj = jQuery('<input/>', {"type": val.type, "name": key});
    newSpecialAttributes(inputObj, val);

    var labelObj;
    if (!isEmpty(val.label)) {
        if (isEmpty(val.placeholder) && isEmpty(val.value) && val.animated_label)
        {
            labelObj = jQuery('<label>' + val.label + '</label>', {});
        }
        else
        {
            labelObj = jQuery('<label class="active">' + val.label + '</label>', {});
        }
    }

    containerObj.append(inputObj);
    containerObj.append(labelObj);
    form.append(containerObj);
}

/*******************************************************************************************/

function selectBoxSettings(key, val, form) {
    var containerObj = jQuery('<div/>', {"class": "input-field"});
    var inputObj = jQuery('<select/>', {"name": key});

    if (!isEmpty(val.options)) {
        $.each(val.options, function (value, option) {
            var optionObj = jQuery('<option/>', {"value":value});
            optionObj.html(option.tag);
            newSpecialAttributes(optionObj, option, false);
            inputObj.append(optionObj);
        });
    }

    var labelObj;
    if (!isEmpty(val.label)) {
        labelObj = jQuery('<label/>', {});
        labelObj.html(val.label);
        containerObj.append(labelObj);
    }

    containerObj.append(inputObj);
    form.append(containerObj);
}

/*******************************************************************************************/

function checkBoxSettings(key, val, form) {

    if (!isEmpty(val.label))
    {
        var openingLabelObj = jQuery('<span/>', {'class': 'form_label'});
        openingLabelObj.html(val.label);
        form.append(openingLabelObj);
    }

    if (!isEmpty(val.direction) && !isEmpty(val.boxes)) {

        var containerObj = jQuery('<p/>', {});
        switch (val.direction) {

            case "horizontal":
            {
                $.each(val.boxes, function (value, option) {
                    var inputObj = jQuery('<input/>', {"type": "checkbox", "name": key + "[]"});
                    newSpecialAttributes(inputObj, option);

                    var labelObj = jQuery('<label>', {"for": option.attr.id});
                    labelObj.html(option.tag);
                    containerObj.append(inputObj);
                    containerObj.append(labelObj);
                });
                break;
            }

            case "vertical":
            {
                $.each(val.boxes, function (value, option) {
                    var inputObj = jQuery('<input/>', {"type": "checkbox", "name": key + "[]"});
                    newSpecialAttributes(inputObj, option);

                    var labelObj = jQuery('<label>' + option.tag + '</label>', {});
                    containerObj.append(inputObj);
                    containerObj.append(labelObj);
                });
                break;
            }

        }

        form.append(containerObj);
    }

}
/*******************************************************************************************/

function radioButtonSettings(key, val, form) {

    if (!isEmpty(val.direction) & !isEmpty(val.radios)) {

        if (!isEmpty(val.label))
        {
            var openingLabelTag = jQuery('<span/>', {'class': 'form_label'});
            openingLabelTag.html(val.label);
            form.append(openingLabelTag);
        }

        var containerDiv = jQuery('<p/>', {});

        switch (val.direction) {

            case "horizontal":
            {
                $.each(val.radios, function (value, option) {
                    if (existsAndisTrue(val.with_gap))
                    {
                        option.with_gap = true;
                    }

                    var checkTag = jQuery('<input/>', {'type': 'radio', 'name': key});
                    newSpecialAttributes(checkTag, option);

                    var labelTag = jQuery('<label/>', {});
                    labelTag.html(option.tag);
                    containerDiv.append(checkTag);
                    containerDiv.append(labelTag);
                });
                break;
            }

            case "vertical":
            {
                $.each(val.radios, function (value, option) {

                    if (existsAndisTrue(val.with_gap))
                    {
                        option.with_gap = true;
                    }

                    var checkTag = jQuery('<input/>', {'type': 'radio', 'name': key});
                    newSpecialAttributes(checkTag, option);

                    var labelTag = jQuery('<label/>', {});
                    labelTag.html(option.tag);
                    containerDiv.append(checkTag);
                    containerDiv.append(labelTag);
                });
                break;
            }

        }

        form.append(containerDiv);
    }
}


/*******************************************************************************************/

function rangeSettings(key, val, form) {

    if (!isEmpty(val.label)) {
        var openingLabelTag = jQuery('<span/>', {'class': 'form_label'});
        openingLabelTag.html(val.label);
        form.append(openingLabelTag);
    }

    var containerDiv = jQuery('<p/>', {'class': 'range-field'});
    var inputTag = jQuery('<input/>', {'type': 'range', 'name': key});

    newSpecialAttributes(inputTag, val);

    containerDiv.append(inputTag);
    form.append(containerDiv);

}

/*******************************************************************************************/

function textAreaSettings(key, val, form) {

    var containerObj = jQuery('<div/>', {"class": "input-field"});
    var inputObj = jQuery('<textarea/>', {"class": "materialize-textarea", "name": key});

    newSpecialAttributes(inputObj, val);

    containerObj.append(inputObj);

    var labelObj;
    if (!isEmpty(val.label)) {
        labelObj = jQuery('<label/>', {});
        labelObj.html(val.label);
        containerObj.append(labelObj);
    }

    form.append(containerObj);
}

/*******************************************************************************************/

function fileSettings(key, val, form) {

    var containerObj = jQuery('<div/>', {"class": "file-field input-field"});
    var inputObj = jQuery('<input/>', {"class": "file-path validate", "type": "text"});

    if (!isEmpty(val.label))
    {
        var openingLabelObj = jQuery('<span/>', {'class': 'form_label'});
        openingLabelObj.html(val.label);
        form.append(openingLabelObj);
    }

    var buttonDivObj = jQuery('<div/>', {"class": "btn"});

    var spanObj = jQuery('<span/>', {});
    var fileObj = jQuery('<input/>', {"type": "file"});

    newSpecialAttributes(fileObj, val);

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


function newSpecialAttributes(obj, val)
{
    if (!isEmpty(val.attr)) {
        $.each(val.attr, function (key, value) {
            obj.attr(key, value);
        });
    }
    if (!isEmpty(val.prop)) {
        $.each(val.prop, function (key, value) {
            obj.prop(key, value);
        });
    }
    if (!isEmpty(val.class)) {
        $.each(val.prop, function (key, value) {
            obj.addClass(value);
        });
    }
}

/*******************************************************************************************/
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj === null)
        return true;

    if (typeof obj === 'undefined')
        return true;

    if (typeof obj === 'boolean') {
        return false;
    }

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