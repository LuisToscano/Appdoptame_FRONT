/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createForm(jsonURL, idContainer){
    
    $.getJSON( jsonURL , function( data ) {
    
    var config = data.form_config;
    delete(data.form_config);
    
    $.each( data, function( key, val ) {    
       if(!isEmpty(val.type)){
            switch(val.type){ 
                case "text":{
                    textBoxSettings(key, val, idContainer, config.required_default);
                    break;
                }
                
                case "password":{
                    textBoxSettings(key, val,idContainer, config.required_default);
                    break;    
                }
                
                case "email":{
                    textBoxSettings(key, val, idContainer, config.required_default);
                    break;    
                }
                
                case "select":{
                    selectBoxSettings(key, val, idContainer, config.required_default);
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

function textBoxSettings(key, val, idContainer, isRequired){
    var element_id = idContainer+'_'+key;
                    var specialAtr = specialAttributes(val, isRequired);
                    
                    var containerDivOpen = '<div class="input-field">';
                    var containerDivClose = '</div>';
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
                    
                    var inputHTML = containerDivOpen + inputTag + labelTag + containerDivClose;
                    $( "#"+idContainer ).append(inputHTML);
}

/*******************************************************************************************/

function textBoxSettings(key, val, idContainer, isRequired){
    var element_id = idContainer+'_'+key;
                    var specialAtr = specialAttributes(val, isRequired);
                    
                    var containerDivOpen = '<div class="input-field">';
                    var containerDivClose = '</div>';
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
                    
                    var inputHTML = containerDivOpen + inputTag + labelTag + containerDivClose;
                    $( "#"+idContainer ).append(inputHTML);
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
    
  switch(val.type)
  {   
      case "text":
      case "password":
      case "email":
      {        
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
        break;
       }
  }
  
  return specialAtr;
}