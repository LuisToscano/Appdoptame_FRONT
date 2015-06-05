/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createForm(jsonURL, idContainer){
    
    $.getJSON( jsonURL , function( data ) {
    
    var config = data.form_config;
    delete(data.form_config);
    var cont = 0;
    
    $.each( data, function( key, val ) {
       if(!isEmpty(val.type)){
            cont++;
            
            var div_id = idContainer+'_'+'element_div_'+cont;
            var element_id = idContainer+'_input_'+cont;
            
            switch(val.type){ 
                case "text":{
                    textBoxSettings(cont, key, val, idContainer, config.required_default);
                    break;
                }
                
                case "password":{
                    textBoxSettings(cont, key, val,idContainer, config.required_default);
                    break;    
                }
                
                case "email":{
                    textBoxSettings(cont, key, val, idContainer, config.required_default);
                    break;    
                }
                
                case "select":{
                    selectBoxSettings(cont, key, val, idContainer, config.required_default);
                }

                 default:{
                     break;    
                 }
                     
            }
        }    
    });
  });
    
}

/*******************************************************************************************/

    function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

/*******************************************************************************************/

function textBoxSettings(cont, key, val, idContainer, isRequired){
    var div_id = idContainer+'_'+'element_div_'+cont;
    var element_id = idContainer+'_input_'+cont;
                    var specialAtr = specialAttributes(val, isRequired);
                    
                    var containerDiv = '<div id="'+div_id+'" class="input-field"></div>';
                    var inputTag = '<input type="'+val.type+'" id="'+element_id+'" name="'+key+'"'+specialAtr+'>' ;
                    
                    var labelTag = "";
                    if(!isEmpty(val.label)){
                        if(isEmpty(val.placeholder) && isEmpty(val.value) && val.animated_label)
                        {
                            labelTag+='<label for="'+element_id+'" >'+val.label+'</label>';
                        }
                        else
                        {
                            labelTag+='<label for="'+element_id+'" class="active">'+val.label+'</label>';
                        }
                    }
                    
                    $( "#"+idContainer ).append(containerDiv);
                    $( "#"+div_id ).append(inputTag);
                    $( "#"+div_id ).append(labelTag);
}

/*******************************************************************************************/

function selectBoxSettings(cont, key, val, idContainer, isRequired){
    var div_id = idContainer+'_'+'element_div_'+cont;
    var element_id = idContainer+'_input_'+cont;
                    
                    var strRequired = "";
                    if(val.required!=null && val.required == true)
                    {
                        strRequired = " required";
                    }
                    
                    var containerDiv = '<div id="'+div_id+'" class="input-field"></div>';
                    var inputTag = '<select id="'+element_id+'"'+strRequired+' name="'+key+'"></select>';
                    var optionTag = '' ;
                    
                    if(val.options!=null){
                    $.each( val.options, function( value, option ) {  
                      var specialAtrib = specialAttributes(option, false);
                      optionTag += '<option value="'+value+'" '+specialAtrib+'>'+option.tag+'</option>'
                    });
                    }
                    
                    var labelTag = '';
                    if(!isEmpty(val.label)){
                     labelTag += '<label>'+val.label+'</label>';
                    }
                   
                    $( "#"+idContainer ).append(containerDiv);
                    $( "#"+div_id ).append(inputTag);
                    $( "#"+element_id ).append(optionTag);
                    $( "#"+div_id ).append(labelTag);
}

/*******************************************************************************************/

function checkBoxSettings(cont, key, val, idContainer, isRequired){
    var div_id = idContainer+'_'+'element_div_'+cont;
    
    if(val.direction!=null && val.direction == "horizontal"){
        var containerDiv = '<p id="'+div_id+'"></p>';

        $.each( val.options, function( value, option ) {  
                          var specialAtrib = specialAttributes(option, false);
                          optionTag += '<option value="'+value+'" '+specialAtrib+'>'+option.tag+'</option>'
                        });
    }
    else if(val.direction!=null && val.direction == "vertical"){
        
    }
    
    var element_id = idContainer+'_input_'+cont;
    
    
}

/*******************************************************************************************/


function specialAttributes(val, defRequired)
{
  var specialAtr = "";
  
  if(val.required != null)
  {
    if(val.required == true)
        specialAtr += " required";
  }
  else
  {
      if(defRequired)
        specialAtr += " required";
  }
      
    if(val.disabled!=null && val.disabled==true){
        specialAtr += " disabled";
    }

    if(!isEmpty(val.placeholder)){
        specialAtr += ' placeholder = "'+val.placeholder+'"';
    }

    if(val.validate!=null && val.validate==true){
        specialAtr += ' class = "validate"';
    }

    if(!isEmpty(val.value)){
        specialAtr += ' value = "'+val.value+'"';
    }
    
    if(val.selected!=null && val.selected==true){
        specialAtr += ' selected';
    }
    
    if(val.checked!=null && val.checked==true){
        specialAtr += ' checked';
    }
    
  return specialAtr;
}