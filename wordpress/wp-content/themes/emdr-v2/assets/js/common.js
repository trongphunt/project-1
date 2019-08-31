var leadingSpacesRe = /^\s+/;
var trailingSpacesRe = /\s+$/;

function trimLeading(s) 
{ 
    return s.replace(leadingSpacesRe, ""); 
}

function trimTrailing(s) 
{ 
    return s.replace(trailingSpacesRe, ""); 
}

function trim(s) 
{ 
    return trimLeading(trimTrailing(s)); 
}

function validate_required(el, field, alerttxt, label)
{
    var label = label || '';
    with(field)
    {
        value = trim(value);
        if (value == null || value == "")
        {
            ShowErrorMessage(el, alerttxt, label);
            return false;
        }
        else 
            return true;
    }
}

var enableErrorDisplay = true;
var displayTitle = true;
function ShowErrorMessage(el, text, id, appendType)
{
    var appendType = appendType || 'row';
    if(text != '' && enableErrorDisplay)
    {
        var id = id || '';
        inp1 = $('<p />').html("Please complete all required fields before sending your message.").css({'text-decoration': 'underline', 'cursor': 'pointer'})
            .mouseenter(function()
            {
                $(this).css(
                {
                    'color': '#BF4B23'
                });
            })
            .mouseleave(function()
            {
                $(this).css(
                {
                    'color': 'red'
                });
            })
            .click(function()
            {
                if(id != '')
                    document.location.replace('#' + id);
            });
        
        // 
         //el.appendChild(inp1);
        // Change to onyl first message display
        if($(el).children().length == 0 && displayTitle)
            $(el).append(inp1);
        
        switch(appendType)
        {
            case 'row': AddErrorRow(el, id, text, appendType); break;
            case 'row_1_column': AddErrorRow(el, id, text, appendType); break;
            case 'training' : AddTrainingError(el, id, text); break;
        }
            
        LogError(text);
    }
}

function validate_name(el, name, text, label)
{
    var label = label || '';
    if (name.value.length > 50)
    {
        ShowErrorMessage(el, 'The '+text+' name is too long: '+name.value.length, label);
        return false; 
    }

    if (!(/^[A-Za-z\ .-]*$/.test(name.value)))
    {
        ShowErrorMessage(el, 'The '+text+' name is incorrect: '+name.value, label);
        return false; 
    }

    return true;
}

function validate_email(el, email, label)
{
    var label = label || '';
    if (email.value.length > 255)
    {
        ShowErrorMessage(el, 'E-Mail address is too long', label);
        return false; 
    }

    if (!(/^[^@]{1,64}@[^@]{1,255}$/.test(email.value)))
    {
        ShowErrorMessage(el, 'E-Mail address contains wrong number of symbols in name section or contains wrong number of \'@\' characters', label);
        return false; ; 
    }

    var email_array = email.value.split('@');                            
    var local_array = email_array[0].split('.'); 
    for (i = 0; i < local_array.length; i++) 
    {                                
        if (!(/^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~\-][A-Za-z0-9!#$%&'*+/=?^_`{|}~\.\-]{0,63})|(\"[^(\\|\")]{0,62}\"))$/.test(local_array[i]))) 
        {
            ShowErrorMessage(el, 'E-Mail address contains wrong symbols in name section', label);
            return false;  
        }
    } 

    if (!(/^\[?[0-9\.]+\]?$/.test(email_array[1])))   // Check if domain is IP. If not, it should be valid domain name
    {
        var domain_array = email_array[1].split(".");
        if (domain_array.length < 2) 
        {
            ShowErrorMessage(el, 'The domain name is incorrect', label);
            return false; 
        }

        for (i = 0; i < domain_array.length; i++) 
        {
            if (!(/^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|([A-Za-z0-9]+))$/.test(domain_array[i])))
            {
                ShowErrorMessage(el, 'The domain name is incorrect', label);
                return false; 
            }
        }
    }                         
    return true;
}

function validate_phone(el, phone, maxnum, text, label)
{
    var label = label || '';
    switch(maxnum)
    {
        case 2: var re = /^[0-9]{0,2}$/; break;
        case 3: var re = /^[0-9]{0,3}$/; break;
        case 4: var re = /^[0-9]{0,4}$/; break;
        case 6: var re = /^[0-9]{0,6}$/; break;
        case 7: var re = /^[0-9]{0,7}$/; break;
    }
    if (!(re.test(phone.value)))
    {
        ShowErrorMessage(el, 'The ' + text + ' code is invalid: ' + phone.value, label);
        return false
    }    
    return true;
}

function validate_mailingAddress(el,mailingAddress,office,label)
{
    var label = label || '';
    //if (!(/^[(a-zA-Z0-9$`_.,?%:;"/&()!# \-\)]{0,255}$/.test(mailingAddress.value)))
    if (!(/^[a-zA-Z0-9$`'_.,?:;"/&()!# \r\n\-]*$/.test(mailingAddress.value)))
    {
        var errorMessage;                                                  // error messages
        if(office)
            errorMessage = 'The Office address is invalid: ';
        else
            errorMessage = 'The Home address is invalid: ';
            
        ShowErrorMessage(el, errorMessage + mailingAddress.value, label);
        return false
    }
    
    return true; 
}

function validate_city(el, city, office, label)
{
    var label = label || '';
    if (!(/^([a-zA-Z ]){0,50}$$/.test(city.value)))
    //if (!(/^[a-zA-Z0-9$`'_.,?:;"/&()!# \r\n\-]*$/.test(city.value)))
    {
        var errorMessage;                                                  // error messages
        if(office)
            errorMessage = 'The Office city is invalid: ';
        else
            errorMessage = 'The Home city is invalid: '; 
        ShowErrorMessage(el, errorMessage + city.value, label);
        return false
    }
    
    return true; 
}


function validate_zip(el,zip,num,text,label)
{
    var label = label || '';
    switch(num)
    {
        case 4: var re = /^[0-9]{0,4}$/; break;
        case 5: var re = /^[0-9]{5}$/; break;
        case '5': var re = /^[0-9]{0,5}$/; break;
        case '4': var re = /^[0-9]{4}$/; break;
    }
    
    if (!(re.test(zip.value)))
    {
        ShowErrorMessage(el, 'The ' + text + ' is invalid: ' + zip.value, label);
        return false
    }
    
    return true; 
}

function validate_text(el,text,alerttext, label)
{
    var label = label || '';
    if (!(/^([a-zA-Z0-9. ,-_/']){0,255}$/.test(text.value)))
    {
        ShowErrorMessage(el, 'The ' + alerttext + ' is invalid: ' + text.value, label);
        return false
    }
    
    return true;
}

function validate_widetext(el,text,alerttext,length, label)
{
    var label = label || '';
    if (text.value.length > length)
    {
        ShowErrorMessage(el, 'The '+alerttext+' is too long: '+text.value.length, label);
        return false
    }
    
    if (!(/^[a-zA-Z0-9$`'_.,?:;"/&()!# =\r\n\\\-]*$/.test(text.value)))
    {
        // If text is too long than dont't print them
        if (text.value.length > 255)
            z = '';
        else 
            z = text.value;
        
        ShowErrorMessage(el, 'The '+alerttext+' is invalid: '+ z, label);
        return false
    }
    
    return true;
}

function validate_referrer(el,referrer, label)
{
    var label = label || '';
    if (!(/^([a-zA-Z0-9$_.,?%:;/&()!# \-]){0,255}$/.test(referrer.value)))
    {
        ShowErrorMessage(el, 'The web-site referrer is invalid: '+referrer.value, label);
        return false
    }
    
    return true;
}

function validate_form(thisform)                                       // This is validate function to register.php page
{
    var result = true;
    
    with(thisform)
    {                                                                          
       el=document.getElementById("Error"); 
       while (el.childNodes.length)
       {    
           el.removeChild(el.firstChild);                                      // Delete all child fields
       }
                  
       var label;
       label = document.getElementById("titleSpanId"); 
       label.style.color = "black"
       if(!(/^[A-Za-z.]{0,10}$/.test(title.value)))
       {
            ShowErrorMessage(el, 'The Title is incorrect: ' + title.value,'titleSpanId');
            
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(title).attr('notSubmit', 'true');
       }
       
       var label;
       label = document.getElementById("fname"); 
       label.style.color = "black"
       
       if (validate_required(el,fname,"Please, enter your First Name.", 'fname') == false || validate_name(el,fname,'First', 'fname') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(fname).attr('notSubmit', 'true');
       }
       else if(typeof administerLogedin == 'undefined' && !(/^(.)*[A-Z]+(.)*$/.test(fname.value)))
       {
            ShowErrorMessage(el, 'Please, enter at least one capital character for first name','fname');
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(fname).attr('notSubmit', 'true');
       }
       
       var label;
       label = document.getElementById("middleNameSpanId"); 
       label.style.color = "black"
       if(!validate_name(el,middleName,'middle name', 'middleNameSpanId'))
       {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(middleName).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("lname"); 
       label.style.color = "black"
       
       if (validate_required(el,lname,"Please, enter your Last Name.", 'lname') == false || validate_name(el,lname,'Last', 'lname') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(lname).attr('notSubmit', 'true');
       }
       else if (typeof administerLogedin == 'undefined' && !(/^(.)*[A-Z]+(.)*$/.test(lname.value)))
       {
            ShowErrorMessage(el, 'Please, enter at least one capital character for last name','lname');
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(lname).attr('notSubmit', 'true');
       }
       
       var label;
       label = document.getElementById("suffixSpanId"); 
       label.style.color = "black"
       if(!(/^[A-Za-z.]{0,10}$/.test(suffix.value)))
       {
            ShowErrorMessage(el, 'The suffix is incorrect: ' + suffix.value,'suffixSpanId');
            
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(suffix).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("stateLicenseDegree"); 
       label.style.color = "black"
       
       req_state = validate_required(el,stateLicenseDegree,"", 'stateLicenseDegree');
       req_graduate = validate_required(el,educationDegree,"", 'stateLicenseDegree');
       
       if(req_graduate || req_state)
       {
           req_state = true;
           req_graduate = true;
       }
       else
       {
            ShowErrorMessage(el, "Please, enter state license or graduate degree.", 'stateLicenseDegree');
            result = false;
            $(stateLicenseDegree).attr('notSubmit', 'true');
            $(educationDegree).attr('notSubmit', 'true');
       }
       
       if(req_state == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(stateLicenseDegree).attr('notSubmit', 'true');
              $(educationDegree).attr('notSubmit', 'true');
       }
       
       if (!(/^[a-zA-Z0-9$`'\._,?:;"/&()!# =\r\n\\\-]{0,255}$/.test(stateLicenseDegree.value)))
       {
           ShowErrorMessage(el, 'The State license is invalid: '+stateLicenseDegree.value,'stateLicenseDegree');
           
           label.style.color = "red";
           document.location.replace('#Error');
           result = false;
           $(stateLicenseDegree).attr('notSubmit', 'true');
       }
       
       if($('#fullNameOfLicensure1Label').length > 0) {
           var professions = document.getElementsByName('fullNameOfLicensure1[]');
           label = document.getElementById("fullNameOfLicensure1Label"); 
           label.style.color = "black"
           if(professions.length == 1 && professions[0].selectedIndex == 0)
           {
               ShowErrorMessage(el, 'Please, select profession type','fullNameOfLicensure1Label');
               label.style.color = "red";
               document.location.replace('#Error');
               result = false;
               $(professions).attr('notSubmit', 'true');
           }
       }
       
       if(document.getElementById('practiseStateChkID').checked)
       {
           // Check State:
           // State verification
           label = document.getElementById("mailingAddressStateSecondId"); 
           label.style.color = "black"
           
           secondstate = document.getElementsByName('secondState')[0];
           if (secondstate.value == '')
           {
                  
                  ShowErrorMessage(el, "The second state is not selected.",'mailingAddressStateSecondId');
                  label.style.color = "red";
                  document.location.replace('#Error');
                  result = false;
                  $(secondstate).attr('notSubmit', 'true');
           }
           // end State verification
       }

       label = document.getElementById("educationDegree"); 
       label.style.color = "black"
       
       if ( req_graduate == false ||
           validate_widetext(el,educationDegree,'Graduate degree',255,'educationDegree') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(educationDegree).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("genderID"); 
       label.style.color = "black"
       
       if (gender.value == '')
       {
              ShowErrorMessage(el, "The gender is not selected.",'genderID');
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(gender).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("email"); 
       label.style.color = "black"
       
       if (validate_required(el,email,"Please, enter your Email address.", 'email') == false || validate_email(el, email, 'email') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(email).attr('notSubmit', 'true');
       }
       
       if(typeof(officephoneExtension) == 'undefined')
            officephoneExtension = null;
       
       if(typeof(faxphoneExtension) == 'undefined')
            faxphoneExtension = null;
            
       var phones = {
           'officephoneArea':officephoneArea, 
           'officephoneNumber1':officephoneNumber1, 
           'officephoneNumber2':officephoneNumber2, 
           'officephoneExtension':officephoneExtension,
           'faxphoneArea':faxphoneArea, 
           'faxphoneNumber1':faxphoneNumber1, 
           'faxphoneNumber2':faxphoneNumber2, 
           'faxphoneExtension':faxphoneExtension,
           'homephoneArea':homephoneArea,
           'homephoneNumber1':homephoneNumber1,
           'homephoneNumber2':homephoneNumber2,
           'cellphoneArea':cellphoneArea,
           'cellphoneNumber1':cellphoneNumber1,
           'cellphoneNumber2':cellphoneNumber2
           };
           
       result = ValidatePhoneNumbers(phones) && result;
       
       label = document.getElementById("businessName"); 
       label.style.color = "black"
       
       if (validate_widetext(el,businessName,'Business or Agency Name',255,'businessName') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(businessName).attr('notSubmit', 'true');
       }
       
       // ---- Office Address
       label = document.getElementById("mailingaddress"); 
       label.style.color = "black"
       if (validate_required(el,mailingAddressLine1,"Please, enter your Mailing Address.", 'mailingaddress') == false ||
       validate_mailingAddress(el,mailingAddressLine1,true, 'mailingaddress') == false ||
       validate_mailingAddress(el,mailingAddressLine2,true, 'mailingaddress') == false )
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(mailingAddressLine1).attr('notSubmit', 'true');
              $(mailingAddressLine2).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("appartmentLabelId"); 
       label.style.color = "black"
       if(validate_text(el,appartment,"apt./suite", 'appartmentLabelId') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(appartment).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("city"); 
       label.style.color = "black"
       if (validate_required(el,mailingAddressCity,"Please, enter your City.", 'city') == false ||
       validate_city(el,mailingAddressCity,true,'city') == false)
       {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(mailingAddressCity).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("mailingAddressStateId"); 
       label.style.color = "black"
       state = document.getElementsByName('mailingAddressState')[0];
       if (state.value == '')
       {
              ShowErrorMessage(el, "The mailing address state is not selected.",'mailingAddressStateId');
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(state).attr('notSubmit', 'true');
       }
       
       if(typeof(mailingAddressZipMinor) == 'undefined')
            mailingAddressZipMinor = null;
            
       result = ValidateZipCode("zip", mailingAddressZipMajor, mailingAddressZipMinor, "Office", true) && result;
       // -------------------
       
       // ---- Home Address
       label = document.getElementById("mailingaddress_home"); 
       label.style.color = "black"
       if (validate_mailingAddress(el,h1mailingAddressLine1,false, 'mailingaddress_home') == false ||
       validate_mailingAddress(el,h1mailingAddressLine2,false, 'mailingaddress_home') == false )
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(h1mailingAddressLine1).attr('notSubmit', 'true');
              $(h1mailingAddressLine2).attr('notSubmit', 'true');
       }
       
       label = document.getElementById("city_home"); 
       label.style.color = "black"
       if (validate_city(el,h1mailingAddressCity,false,'city_home') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(h1mailingAddressCity).attr('notSubmit', 'true');
       }
       
       if(typeof(h1mailingAddressZipMinor) == 'undefined')
            h1mailingAddressZipMinor = null;
       result = ValidateZipCode("zip_home", h1mailingAddressZipMajor, h1mailingAddressZipMinor, "Home", false) && result;
       // -----------------
       
       //  Training level drop-down list
       label = document.getElementById("trainingLevelId"); 
       if(typeof(label) != 'undefined' && label != null)
       {
           //  If not management page_one
           label.style.color = "black"
           state = document.getElementsByName('trainingLevel')[0];
           if (state.value == '')
           {
                  ShowErrorMessage(el, "The training level is not selected.",'trainingLevelId');
                  label.style.color = "red";
                  document.location.replace('#Error');
                  result = false;
                  $(state).attr('notSubmit', 'true');
           }
       }
         
       if(!!document.getElementById("referrerinfo")) {
           label = document.getElementById("referrerinfo"); 
           label.style.color = "black"
           if (referrerBase.value == 'Other' || referrerBase.value == 'Another Therapist')
           {
               if (validate_referrer(el,referrerCustom,'referrerinfo') == false)           // If other or another therapist
               {
                      label.style.color = "red";
                      document.location.replace('#Error');
                      result = false;
                      $(referrerCustom).attr('notSubmit', 'true');
               }
           }
           if (referrerBase.value == '')
           {
                  ShowErrorMessage(el, "The website referrer is not selected.",'referrerinfo');
                  label.style.color = "red";
                  document.location.replace('#Error');
                  result = false;
                  $(referrerBase).attr('notSubmit', 'true');
           }
       }
       
       
       return result;
    }
}

function validate_username(thisform)                                  // This is validate function to username.php page
{
    el=document.getElementById("Error");
    
    while (el.childNodes.length)
    {    
        el.removeChild(el.firstChild);                                      // Delete all child fields
    }
       
    with (thisform)
    {
        if(!(/^[A-Za-z][A-Za-z0-9_\.@\-\ ]*$/.test(userName.value)))
        {
              ShowErrorMessage(el, 'The Username is invalid: '+userName.value);
              return false;
        }
        
        if (!(userName.value.length >= 3 && userName.value.length <= 50))
        {
            ShowErrorMessage(el, 'The user name has wrong length: '+userName.value.length);
            return false;
        }
       
    }
    
    return true;
}

function backward()
{
    SetChange(false);
    document.back.submit();
    return true;
}

function validate_form_page_one(thisform)
{
    var result = true;

    if (validate_form(thisform) == false)            //  Validate form from registry.php page
        result = false; 
    
    with (thisform)
    {                                                                          
       el=document.getElementById("Error2"); 
       while (el.childNodes.length)
       {    
           el.removeChild(el.firstChild);                                      // Delete all child fields
       }
       
    label = document.getElementById("w2businessName"); 
    label.style.color = "black"
       
    if (validate_widetext(el,w2businessName,'Business or Agency Name',255,'w2businessName') == false)
    {
        label.style.color = "red";
        document.location.replace('#Error2');
        result = false;
        $(w2businessName).attr('notSubmit', 'true');
    }
    
    label = document.getElementById("w2mailingAddress"); 
    label.style.color = "black"
    
    if (validate_mailingAddress(el,w2mailingAddressLine1,true,'w2mailingAddress') == false ||
       validate_mailingAddress(el,w2mailingAddressLine2,true,'w2mailingAddress') == false )
       {
              label.style.color = "red";
              document.location.replace('#Error2');
              result = false;
              $(w2mailingAddressLine1).attr('notSubmit', 'true');
              $(w2mailingAddressLine2).attr('notSubmit', 'true');
       }
    
    label = document.getElementById("w2city"); 
    label.style.color = "black"
    if (validate_city(el,w2mailingAddressCity,true,'w2city') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error2');
              result = false;
              $(w2mailingAddressCity).attr('notSubmit', 'true');
       }
    
    if(typeof(w2mailingAddressZipMinor) == 'undefined')
        w2mailingAddressZipMinor = null;
        
    result = ValidateZipCode('w2zip', w2mailingAddressZipMajor, w2mailingAddressZipMinor, '', false, "#Error2") && result;
                
    if(typeof(w2officephoneExtension) == 'undefined')
        w2officephoneExtension = null;
        
    result = ValidateW2Phone(w2officephoneArea, w2officephoneNumber1, w2officephoneNumber2, w2officephoneExtension) && result;
       
    }

    return result;
}

function validate_date(el,date,alerttext, label)
{
    var label = label || '';
    if(date.value.length == 0)
        return;
    
    if (date.value.length > 10 || date.value.length < 6)
    {
        ShowErrorMessage(el, 'The '+alerttext+' has wrong length: '+date.value.length, label);
        return false;
    }
    
    var date_array = date.value.split('/');
    if (date_array.length != 3 || !(/^[0-9/]{6,10}$/.test(date.value)))
    {
        ShowErrorMessage(el, 'The '+alerttext+' is invalid: '+date.value, label);
        return false;
    }
    
    if (!(/^([0-1]?\d)[/]([0-3]?\d)[/](19|20)?(\d\d)$/.test(date.value)))
    {
        ShowErrorMessage(el, 'The '+alerttext+' is invalid: '+date.value, label);
        return false;
    }
    
    return true;
}

function validate_int(el,param,alerttext,length, label)
{
    var label = label || '';
    if (param.value.length > length)
    {
        ShowErrorMessage(el, 'The '+alerttext+' has wrong length: '+param.value.length, label);
        return false;
    }
    
    if (isNaN(parseInt(param.value)) == true || (!(/^[0-9]*$/.test(param.value))) )
    {
        ShowErrorMessage(el, 'The '+alerttext+' isn\'t a number: '+param.value, label);
        return false;
    }
   
    return true;
}

function validate_float(el,param,alerttext,length,precision,min,max, label)
{
    var label = label || '';
    if (param.value.length > length)
    {
        ShowErrorMessage(el, 'The '+alerttext+' has wrong length: '+param.value.length, label);
        return false;
    }
    
    data = param.value.split('.');

    if (data[1] == null)
        if (data[0].length > length - precision - 1)
        {
            ShowErrorMessage(el, 'The '+alerttext+' has wrong length (no decimal point): '+param.value.length, label);
            return false;    
        }
    
    if (isNaN(parseFloat(param.value)) == true || (!(/^[0-9.]*$/.test(param.value))) )
    {
        ShowErrorMessage(el, 'The '+alerttext+' isn\'t a number: '+param.value, label);
        return false;
    }
    
    
    if (((parseFloat(param.value) > max || parseFloat(param.value) < min)) && (param.value != 0))
    {
        ShowErrorMessage(el, 'The '+alerttext+' isn\'t in range: '+param.value, label);
        return false;
    }
    
    return true;
}

function validate_professionalcredentials(thisform, requiredInfPage)
{
    var result = true;
    var page = thisform.getAttribute('page');
    with (thisform)
    {
        el=document.getElementById("Error"); 
        while (el.childNodes.length)
            el.removeChild(el.firstChild);                                      // Delete all child fields
        
        el2=document.getElementById("serverMessageId"); 
        while (el2.childNodes.length)
            el2.removeChild(el2.firstChild);                                      // Delete all child fields
        
        if(!requiredInfPage)
        {
            label = document.getElementById("nameOfInstitutionSpanId"); 
            label.style.color = "black"
           
            if(validate_required(el,nameOfInstitution,'Please, enter name of education institution', 'nameOfInstitutionSpanId') == false ||
            validate_widetext(el,nameOfInstitution,'name of education institution',255,'nameOfInstitutionSpanId') == false)
            {
                  label.style.color = "red";
                  document.location.replace('#ErrorProfessional');
                  result = false;      
                  $(nameOfInstitution).attr('notSubmit', 'true');
            }
        }
        
        if($('#licensureSupervisor').length > 0) {
            label = document.getElementById("stateLicenseNumber1"); 
            label.style.color = "black";
            label = document.getElementById("stateLicenseNumber2"); 
            label.style.color = "black";
            label1 = document.getElementById("licensureSupervisor"); 
            label1.style.color = "black";
            label2 = document.getElementById("dateLicenseExpected"); 
            label2.style.color = "black";
            
            var chackedPracticeStatement = 0;
            $(practiceStatement).each(function()
            {
                if($(this).is(':checked'))
                    chackedPracticeStatement = $(this).val();
            });
            
            if(chackedPracticeStatement == '1')
            {
                // licensed
                if (stateLicenseNumber1.value == null || stateLicenseNumber1.value == "")
                {
                    ShowErrorMessage(el, "Are you licensed?<br />If yes, please, enter state license number. If no, please, enter the name of your licensure supervisor, and licensure date.",'stateLicenseNumber1', 'row_1_column');
                    
                    if(stateLicenseNumber1.value == null || stateLicenseNumber1.value == "")
                    {
                        LogError('state license number is empty');
                        label.style.color = "red";
                    }
                    
                    document.location.replace('#Error');
                    $(stateLicenseNumber1).attr('notSubmit', 'true');
                    result = false;
                }
                
                if(validate_widetext(el,stateLicenseNumber1,'state license number',255,label.id) == false)
                {
                      label.style.color = "red";
                      document.location.replace('#Error');
                      result = false;
                      $(stateLicenseNumber1).attr('notSubmit', 'true');
                }
            }
            else if(chackedPracticeStatement == '2') {
                if (stateLicenseNumber2.value == null || stateLicenseNumber2.value == "")
                {
                    ShowErrorMessage(el, "Are you licensed?<br />If yes, please, enter state license number. If no, please, enter the name of your licensure supervisor, and licensure date.",'stateLicenseNumber2', 'row_1_column');
                    
                    if(stateLicenseNumber2.value == null || stateLicenseNumber2.value == "")
                    {
                        LogError('state license number is empty');
                        label.style.color = "red";
                    }
                    
                    document.location.replace('#Error');
                    $(stateLicenseNumber2).attr('notSubmit', 'true');
                    result = false;
                }
                
                if(validate_widetext(el,stateLicenseNumber2,'state license number',255,label.id) == false)
                {
                      label.style.color = "red";
                      document.location.replace('#Error');
                      result = false;
                      $(stateLicenseNumber2).attr('notSubmit', 'true');
                }
            }
            else if(chackedPracticeStatement == '3')
            {
            if (licensureSupervisor.value == null || licensureSupervisor.value == "" || dateLicenseExpected.value == null || dateLicenseExpected.value == "")
            {
                if(licensureSupervisor.value == null || licensureSupervisor.value == "")
                {
                    ShowErrorMessage(el, "Plaese enter the name of supervisor for licensure", 'licensureSupervisor', 'row_1_column');
                    LogError('licensure supervisor name is empty');
                    label1.style.color = "red";
                    $(licensureSupervisor).attr('notSubmit', 'true');
                }

                if(dateLicenseExpected.value == null || dateLicenseExpected.value == "")
                {
                    ShowErrorMessage(el, "Plaese enter the date licensure is expected", 'dateLicenseExpected', 'row_1_column');
                    LogError('licensure date is empty');
                    label2.style.color = "red";
                    $(dateLicenseExpected).attr('notSubmit', 'true');
                }

                document.location.replace('#Error');
                result = false;
            }

            if (validate_widetext(el,licensureSupervisor,'licensure supervisor name',100,label1.id) == false)
            {
                label1.style.color = "red";
                document.location.replace('#Error');
                $(licensureSupervisor).attr('notSubmit', 'true');
                result = false;
            }


            if (validate_date(el,dateLicenseExpected,'Licensure date',label2.id) == false)
            {
                label2.style.color = "red";
                document.location.replace('#Error');
                $(dateLicenseExpected).attr('notSubmit', 'true');
                result = false;
            }
        }
        }
        
        label = document.getElementById("liabilityInsuranceProvider"); 
        label.style.color = "black";
        
        if (validate_required(el,liabilityInsuranceProvider,'Please, enter liability insurance provider', 'liabilityInsuranceProvider') == false ||
            validate_widetext(el,liabilityInsuranceProvider,'liability insurance provider',255,'liabilityInsuranceProvider') == false)
        {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
              $(liabilityInsuranceProvider).attr('notSubmit', 'true');
        }
        
        label = document.getElementById("accountNumber"); 
        label.style.color = "black"
        
        if (validate_required(el,accountNumber,'Please, enter policy number', 'accountNumber') == false ||
            validate_widetext(el,accountNumber,'policy number',255,'accountNumber') == false)
        {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(accountNumber).attr('notSubmit', 'true');
        }
        
        // Change to checkbox
        label = document.getElementById("amountOfLiabilityCoverage"); 
        label.style.color = "black"
       
        if (amountOfLiabilityCoverage.checked == false)
        {
            ShowErrorMessage(el, 'You need to confirm your minimum Liability Coverage','amountOfLiabilityCoverage', 'row_1_column');
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(amountOfLiabilityCoverage).attr('notSubmit', 'true');
        }
    }
    
    return result;
}

function validate_form_page_two(thisform,deleteErrorText)
{
    var result = true;
    var page = thisform.getAttribute('page');
    with (thisform)
    {
        if(deleteErrorText)
        {
            el=document.getElementById("Error"); 
            while (el.childNodes.length)
            {    
                el.removeChild(el.firstChild);                                      // Delete all child fields
            }
            
            if(page == 'page_two')
            {
                el2=document.getElementById("ErrorProfessional"); 
                while (el2.childNodes.length)
                {    
                    el2.removeChild(el2.firstChild);                                      // Delete all child fields
                } 
            }
        }
        
        var checkWeekend = false;
        
        if(page == 'page_two')
        {
            label = document.getElementById("yearDegreeCompletedSpanId"); 
            label.style.color = "black"
            
            if(yearDegreeCompleted.selectedIndex == 0)
            {
                ShowErrorMessage(el2, 'Please, select year degree completed','yearDegreeCompletedSpanId');
                
                label.style.color = "red";
                document.location.replace('#ErrorProfessional');
                result = false;
            }
            
            label = document.getElementById("yearYouEnteredPracticeSpanId"); 
            label.style.color = "black"
            
            if(yearYouEnteredPractice.selectedIndex == 0)
            {
                ShowErrorMessage(el2, 'Please, select year you entered practice','yearYouEnteredPracticeSpanId');
                
                label.style.color = "red";
                document.location.replace('#ErrorProfessional');
                result = false;
            }

            label = document.getElementById("yearTrainedSpanId"); 
            label.style.color = "black"
            
            if(yearTrained.selectedIndex == 0)
            {
                ShowErrorMessage(el2, 'Please, select year you began using EMDR in your practice<br />actively, confidently and successfully','yearTrainedSpanId', 'row_1_column');
                
                label.style.color = "red";
                document.location.replace('#ErrorProfessional');
                result = false;
            }
        }
        
        label = document.getElementById("providesFeeBasedServicesID"); 
        label.style.color = "black";
        if(!validate_widetext(el,providesFeeBasedServices,'fee-based EMDR consultation or training servicesensure',255,'providesFeeBasedServicesID'))
        {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(providesFeeBasedServices).attr('notSubmit', 'true');
        }
        
        label = document.getElementById("providesNonEMDRTrainingOpportunitiesID"); 
        label.style.color = "black";
        if(!validate_widetext(el,providesNonEMDRTrainingOpportunities,'Non-EMDR training opportunities for other therapists',255,'providesNonEMDRTrainingOpportunitiesID'))
        {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
            $(providesNonEMDRTrainingOpportunities).attr('notSubmit', 'true');
        }
        
        // Fill trainer and date from new fields
        var i = $('#basicTrainingLevel').find('option:selected').data('i');
        if(i != '0') {
            $("input[name='trainer_"+i+"']").val($('#trainer_basic').val());
            $("input[name='trainingDate_"+i+"']").val($('#trainingDate_basic').val());
            /*if($('#searchOn_basic').is(':checked'))
                $("input[id='searchOn_"+i+"']").attr('checked', 'checked');
            else
                $("input[id='searchOn_"+i+"']").removeAttr('checked');*/
        }
        
        var triaininhLevels = document.getElementsByTagName("input");
        for(i = 0; i < triaininhLevels.length; i++)
        {
           if(triaininhLevels[i].id.indexOf('oChBox')!= -1 && triaininhLevels[i].checked == true)
           {
                enableErrorDisplay = false;
                number = triaininhLevels[i].name.substr(triaininhLevels[i].name.lastIndexOf('_')+1);
                //  Validate Trainer
                var str = 'trainer_'+number;
                var trainer = document.getElementsByName(str);
                var validateTraining = 0;
                
                if(validate_widetext(el,trainer[0],'trainer of '+triaininhLevels[i].value,255) == false)
                {
                    document.location.replace('#Error');
                    result = false;
                    validateTraining += 1;
                }
                
                // Validate Date
                var str = 'trainingDate_'+number;
                var trainingDate = document.getElementsByName(str);
                
                if(trainingDate[0].value != '')
                if (validate_int(el,trainingDate[0],'training Date of '+triaininhLevels[i].value,4) == false)
                {
                    document.location.replace('#Error');
                    result = false;
                    validateTraining += 3;
                }
                
                // Validate Date2
                var str = 'trainingDate2_'+number;
                if(document.getElementsByName(str).length > 0 && result)
                {
                    var trainingDate2 = document.getElementsByName(str);
                    
                    if(trainingDate2[0].value != '')
                    if (validate_int(el,trainingDate2[0],'training Date of '+triaininhLevels[i].value,4) == false)
                    {
                        document.location.replace('#Error');
                        result = false;
                        validateTraining += 5;
                    }
                }
                  
                enableErrorDisplay = true;
                var trainingName = $(triaininhLevels[i]).parent().text().trim();
                if(validateTraining != 0)
                {
                    var idForError = 'trainingLabel_' + number;
                    if(number == '1' || number == '2' || number == '3') {
                        var idForError = 'trainer_basic';
                        trainingName = $.trim($('#basicTrainingLevel').find("option[data-i='"+number+"']").text());
                    }
                           
                    switch(validateTraining)
                    {
                        case 1 : ShowErrorMessage(el, 'The trainer for "'+trainingName+'" is invalid', idForError, 'training'); break;
                        case 3 :
                        case 5 : 
                        case 8 : ShowErrorMessage(el, 'The date for "'+trainingName+'" is invalid', idForError, 'training'); break;
                        case 4 :
                        case 6 : ShowErrorMessage(el, 'The trainer and date for "'+trainingName+'" is invalid', idForError, 'training'); break;
                    }

                }
           }
           
           if(triaininhLevels[i].value == 'EMDR (Weekend Two)' || triaininhLevels[i].value == 'Certified EMDR Clinician' || triaininhLevels[i].value == 'EMDRIA Approved Consultant in Training' || triaininhLevels[i].value == 'Approved Consultant')
              if(triaininhLevels[i].checked)
                checkWeekend = true;
           
        }
        
        if(checkWeekend)
            result = ValidateTrainingLevels(triaininhLevels) && result;
            
        if(page == 'page_two')        
        {
            var dates = [yearDegreeCompleted.value,
                         yearYouEnteredPractice.value,
                         trainingDate_2.value,
                         trainingDate_3.value,
                         trainingDate_4.value,
                         yearTrained.value];
                         
            result = ValidateDates(dates, document.getElementById("ErrorProfessional")) && result;
        }
    }
        
    return result;
}

function validate_population(el)
{
    label = document.getElementsByName("populations[]");
    var cntPopulation = label.length;
    var population = new Array();
    var labelPopulation = new Array();
        
    for (i = 0; i < label.length; i++)
    {
        if (label[i].checked == true)
           {
             population[population.length] = document.getElementsByName(label[i].value.toLowerCase())[0];                     // int
             labelPopulation[labelPopulation.length] = label[i].value;                                          // text
           }
    }
    
    if(typeof administerLogedin == 'undefined' && population.length == 0) {
         ShowErrorMessage(el, 'Please, select at least one Clientele', 'clienteleLabel');
         return false;
    }
    
    for(i = 0; i < population.length; i++)
    {
       if(validate_int(el,population[i],'order of '+labelPopulation[i],1, 'clienteleLabel') == false) 
       {
           $("input[name='populations[]']").attr('notSubmit', 'true');
           return false;
       }
       
       population[i].value = parseInt(population[i].value);
       
       // Check for maximum value
       if (population[i].value > cntPopulation)
       {
            ShowErrorMessage(el, 'The advertisement order is too large: '+population[i].value, 'clienteleLabel');
            return false;
       }
       
       // Check for same values
       for (j = 0; j < i; j++)
       {
            if (population[j].value == population[i].value)
            {
                ShowErrorMessage(el, 'The advertisement order is repeated: '+population[i].value, 'clienteleLabel');
                return false;
            }
       }
             
       // Check order
       var noitem = true; 
       for (j1 = 1; j1 <= population.length; j1++) 
       {
           if (population[i].value == j1)
                noitem = false;
                
       }
       if (noitem)
       {
            ShowErrorMessage(el, 'The advertisement order is wrong: '+population[i].value, 'clienteleLabel');
            return false;
       } 
       
    }
    
    return true;
}

function validate_form_page_three(thisform)
{
    var result = true;
    with (thisform)
    {
        el=document.getElementById("Error"); 
        while (el.childNodes.length)
        {    
            el.removeChild(el.firstChild);                                      // Delete all child fields
        }
        
        if(validate_population(el) == false)
        {
            $('#clienteleLabel').addClass('error');
            
            document.location.replace('#Error');
            result = false;
        }  
       
	   var languages = document.getElementsByName('languages[]');
       var langChecked = false;
       for(i = 0; i < languages.length; i++)
       {
           langChecked = langChecked || languages[i].checked;
       }
       
       if(typeof administerLogedin == 'undefined' && !langChecked)
       {
            ShowErrorMessage(el, 'Please, check at least one language.', 'languagesLabel');
            
            $('#languagesLabel').addClass('error');
            document.location.replace('#Error');
            result = false;
       }
       
       var cServices = document.getElementsByName('community_services[]');
       var cServicesChecked = false;
       for(i = 0; i < cServices.length; i++)
       {
           cServicesChecked = cServicesChecked || cServices[i].checked;
       }
       
       if(typeof administerLogedin == 'undefined' && !cServicesChecked)
       {
            ShowErrorMessage(el, 'Please, check at least one community service or \'I do not provide any of these services\'.', 'communityServicesLabel');
            
            $('#communityServicesLabel').addClass('error');
            document.location.replace('#Error');
            result = false;
       }
    }
        
    return result;
}

function Population_change()
{
    SetChange();
    
    var attrib = document.main.attrib;
    if (attrib.value.indexOf('population_change-') == -1)
    {
        attrib.value = attrib.value + "population_change-";
    }
}

function Community_change()
{
    SetChange();
    
    var attrib = document.main.attrib;
    if (attrib.value.indexOf('community_change-') == -1)
    {
        attrib.value = attrib.value + "community_change-";
    }
    
}

function Community_check(chk)
{
    // Check all checked parameters
    var elem = document.getElementsByName('community_services[]');
    var cnt = new Array;
    var notProvideID = -1;
    
    for( i = 0; i < elem.length; i++)
    {
        if(elem[i].checked && elem[i].value != 'I do not provide any of these services')
            cnt.push(i);
        
        if(elem[i].value == 'I do not provide any of these services')
            notProvideID = i;
    }
    
    if(chk.value == 'I do not provide any of these services')
    {
        if(cnt.length > 0 && chk.checked)
        {
            if(confirm('Checking " I do not provide any of these services" will remove your other checks. Do you want to proceed?'))
            {
                for( i = 0; i < cnt.length; i++)
                    elem[cnt[i]].checked = false;
            }
            else
                chk.checked = false;
        }
    }
    else if(cnt.length > 0 && notProvideID != -1 && elem[notProvideID].checked)
        elem[notProvideID].checked = false;
}

function Languages_change()
{
    SetChange();
    
    var attrib = document.main.attrib;
    if (attrib.value.indexOf('languages_change-') == -1)
    {
        attrib.value = attrib.value + "languages_change-";
    }
}

function HighRiskClients_change()
{
    var attrib = document.main.attrib;
    if (attrib.value.indexOf('highriskareas_change-') == -1)
    {
        attrib.value = attrib.value + "highriskareas_change-";
    }
}
                         
function TriningLeveel_change()
{
    SetChange();
    
    var attrib = document.main.attrib;
    if (attrib.value.indexOf('training_change-') == -1)
    {
        attrib.value = attrib.value + "training_change-";
    }
}

function NoTraining(check)
{
    TriningLeveel_change();
    
    if(check)
    {
        var elements = document.getElementsByTagName("input");
        for(i = 0; i < elements.length; i++)
        {
           if(elements[i].id.indexOf('oChBox')!= -1 || elements[i].name.indexOf('searchOn') != -1 || elements[i].id.indexOf('oChBoxVolunteer')!= -1)
              {
                  elements[i].checked=false;
              }
        }
    }
}

function AddDateVolunteer(check,value)
{
    if (check.checked)
    {
        document.main.trainingLevel_0.checked = false;
    }
    
    if (check.checked)
    {
        var _defaultParameter =  check.getAttribute('defaultParameter');
        
        if(_defaultParameter != 1)
        {
            document.getElementsByName('trainer_' + value)[0].value = '<trainer>';
            
            if(check.value == 'Certified EMDR Clinician' || check.value == 'EMDRIA Approved Consultant in Training' || check.value == 'Approved Consultant')
                document.getElementsByName('trainer_' + value)[0].value = '<consultant>';
                
            document.getElementsByName('trainingDate_' + value)[0].value = '<date>';
            
            if(document.getElementsByName('trainingDate2_' + value).length > 0)
                document.getElementsByName('trainingDate2_' + value)[0].value = '<date>';
            
            if(_defaultParameter == 3)
                document.getElementsByName('trainer_' + value)[0].value = '';
                
            if(_defaultParameter == 4)
            {
                document.getElementsByName('trainingDate_' + value)[0].value = '';
                
                if(document.getElementsByName('trainingDate2_' + value).length > 0)
                    document.getElementsByName('trainingDate2_' + value)[0].value = '';
            }
                
        }
    }
}

function AddDate(check,value)
{
    if (check.checked)
    {
        document.main.trainingLevel_0.checked = false;
    }
    
    var max = 0;
    var elements = document.getElementsByTagName("input");
    for(i = 0; i < elements.length; i++)
    {
       if(elements[i].id.indexOf('oChBox')!= -1 && elements[i].checked == true)
          {
              max = elements[i].name.split('_')[1];
          }
    }
    
    if(max != 0 && document.getElementById('searchOn_' + max) != undefined)
        document.getElementById('searchOn_' + max).checked = true;
    else
    {
        var elements = document.getElementsByTagName("input");
        for(i = 0; i < elements.length; i++)
        {
           if(elements[i].name.indexOf('searchOn')!= -1 )
              {
                  elements[i].checked = false;
              }
        }
    }
    
    if (check.checked)
    {
        var _defaultParameter =  check.getAttribute('defaultParameter');
        
        if(_defaultParameter != 1)
        {
            SetDefaultTrainerAndDate(check, value, _defaultParameter);
        }
    }
        
}

function Licensed(n)
{
    var elem = null;
    document.getElementById('practiceStatementBlockId_1').style.display = 'none';
    document.getElementById('practiceStatementBlockId_2').style.display = 'none';
    document.getElementById('practiceStatementBlockId_3').style.display = 'none';
    if(n == 1)
    {
        label = document.getElementById("licensureSupervisor"); 
        label.style.color = "black";
        label = document.getElementById("dateLicenseExpected"); 
        label.style.color = "black";
        
        elem = document.getElementById('stateLicenseNumber1');
        elem.disabled = false;
        document.main.stateLicenseNumber1.disabled = false;
        
        elem = document.getElementById('licenseState');
        elem.disabled = false;
        document.main.licenseState.disabled = false;
        
        elem = document.getElementById('licensureSupervisor');
        elem.disabled = true;
        document.main.licensureSupervisor.disabled = true;
        document.main.licensureSupervisor.value= '';
        
        elem = document.getElementById('dateLicenseExpected');
        elem.disabled = true;
        document.main.dateLicenseExpected.disabled = true;
        document.main.dateLicenseExpected.value = '';
        document.getElementById('practiceStatementBlockId_1').style.display = 'table';
    }
    else if(n == 3)
    {
        document.getElementById('practiceStatementBlockId_3').style.display = 'table';
        label = document.getElementById("stateLicenseNumber1"); 
        label.style.color = "black";
        
        elem = document.getElementById('stateLicenseNumber1');
        elem.disabled = true;
        document.main.stateLicenseNumber1.disabled = true;
        document.main.stateLicenseNumber1.value = '';
        
        elem = document.getElementById('licenseState');
        elem.disabled = true;
        document.main.licenseState.disabled = true;
        
        elem = document.getElementById('licensureSupervisor');
        elem.disabled = false;
        document.main.licensureSupervisor.disabled = false;
        
        elem = document.getElementById('dateLicenseExpected');
        elem.disabled = false;
        document.main.dateLicenseExpected.disabled = false;
        
    }
    else
    {
        // Hide all
        label = document.getElementById("licensureSupervisor"); 
        label.style.color = "black";
        label = document.getElementById("dateLicenseExpected"); 
        label.style.color = "black";
        label = document.getElementById("stateLicenseNumber1"); 
        label.style.color = "black";
        label = document.getElementById("stateLicenseNumber2"); 
        label.style.color = "black";
        
        elem = document.getElementById('licensureSupervisor');
        elem.disabled = true;
        document.main.licensureSupervisor.disabled = true;
        document.main.licensureSupervisor.value= '';
        
        elem = document.getElementById('dateLicenseExpected');
        elem.disabled = true;
        document.main.dateLicenseExpected.disabled = true;
        document.main.dateLicenseExpected.value = '';
        
        elem = document.getElementById('stateLicenseNumber1');
        elem.disabled = true;
        elem = document.getElementById('stateLicenseNumber2');
        elem.disabled = true;
        document.main.stateLicenseNumber1.disabled = true;
        document.main.stateLicenseNumber2.disabled = true;
        document.main.stateLicenseNumber1.value = '';
        document.main.stateLicenseNumber2.value = '';
        
        elem = document.getElementById('licenseState');
        elem.disabled = true;
        document.main.licenseState.disabled = true;
    }
    
    if(n == 2) {
        elem = document.getElementById('stateLicenseNumber2');
        elem.disabled = false;
        document.main.stateLicenseNumber2.disabled = false;
        document.getElementById('practiceStatementBlockId_2').style.display = 'table';
    }
}

function SearchCheckLevel(check)
{
    TriningLeveel_change();
    if (check.checked)
    {
        var elem = document.getElementsByName('trainingLevel_' + check.value)[0];
        if(!elem.checked)
            check.checked = false;
    }
}

// Move from Approved companies to User List
function AddApproved()
{
    ChangeInsuranceCompany();
    SetChange();
    
    var opt = document.createElement("option");
    var list = document.getElementById('newInsuranceSelect');
    
    opt.value = list.options[list.selectedIndex].value;
    var oldValue = opt.value;
    
    opt.value = opt.value+'|inNetwork';
    opt.appendChild(document.createTextNode(list.options[list.selectedIndex].value));
    
    opt.setAttribute('approved','yes');
    
    opt.setAttribute('rightname',list.options[list.selectedIndex].value);
    
    state = "";
    
    // Remove From Approved Companies
    //list.removeChild(list.options[list.selectedIndex]);
    for(i = 0; i < list.options.length; i++)
    {
        if(list.options[i].parentNode.nodeName != "OPTGROUP")
        {
            if(list.options[i].value == oldValue)
            {
                list.removeChild(list.options[i]);
                break;
            }
        }
    }
    
    optgroups = list.childNodes;
    for(i = 0; i < optgroups.length; i++)
    {
        options = optgroups[i].childNodes;
        for(j = 0 ; j < options.length ; j++)
        {
            if(options[j].nodeName == 'OPTION')
            {
                if(options[j].selected)
                    state = optgroups[i].getAttribute('label');
                    
                if(options[j].value == oldValue)
                {
                    optgroups[i].removeChild(options[j]);
                    //break;
                }
            }
        }
        if(options.length == 0)
            list.removeChild(optgroups[i]);
    }
    
    if(state != "")
        opt.value += "|" + state;
    
    
    if (list.options.length == 0)
        document.main.ButtonAddApproved.disabled = true;
        
    document.getElementsByName("insuranceCompanies[]")[0].appendChild(opt);
}

function OnApprovedCompaniesChange(select)
{
    if(select.value != '')
        document.getElementsByName('ButtonAddApproved')[0].disabled = false;
    else
        document.getElementsByName('ButtonAddApproved')[0].disabled = true;
    
    if(select.options[0].value == '') select.removeChild(select.options[0]);
}

function AddOther()
{
    if (!(/^[a-zA-Z0-9$`'_.,?:;"/&()!# \r\n\\\-]*$/.test(document.main.otherCompany.value)))
    {
        alert("Wrong data. Text contains illegal characters.");
        return;
    }
    
    ChangeInsuranceCompany();
    SetChange();
    
    var list = document.getElementsByName("insuranceCompanies[]")[0]; 
    for (i = 0; i < list.options.length; i++)
        if (document.main.otherCompany.value.toLowerCase() == list.options[i].getAttribute('rightname').toLowerCase())
        {
            alert('The name entered already exists in user list');
            return;
        }
    
    if (document.main.otherCompany.value != '' && document.main.otherCompany.value != ' ')
    {
        var opt = document.createElement("option");
        
        opt.value = document.main.otherCompany.value; 
        var displayText = document.main.otherCompany.value;
        
        opt.setAttribute('rightname',opt.value);
        
        opt.value = opt.value+'|inNetwork';
        
        state = document.main.insuranceState.value;
        document.main.insuranceState.value = "";
        if(state != "")
        {
            opt.value += "|" + state;
            displayText += " ( "+ state.substr(0, 1).toUpperCase() + state.substr(1).replace(/_/g," ") + " ) ";
        }
        
        opt.appendChild(document.createTextNode(displayText));
            
        // Clear input
        document.main.otherCompany.value = '';
        document.main.otherCompany.disabled = false;
        
        list.appendChild(opt);
    }
}

function RemovefromUserList()
{                              
    ChangeInsuranceCompany();
    SetChange();
    
    var list = document.getElementsByName("insuranceCompanies[]")[0];
    
    for (i = 0; i < list.options.length; i++)
        if(list.options[i].selected)
        {
            list.removeChild(list.options[i]);
            i--;
        }
        
    document.main.Romove.disabled = true;
    //document.main.Change.disabled = true;
}

function validate_form_page_four(thisform)
{
    var result = true;
    
    with (thisform)
    {   
        el=document.getElementById("Error"); 
        while (el.childNodes.length)
        {    
            el.removeChild(el.firstChild);                                      // Delete all child fields
        }
       
        var label;
        label = document.getElementById("lowest_hrly_fee"); 
        label.style.color = "black"
       
        if (validate_float(el,lowest_hrly_fee,"Lowest fee for a session hour",10,2,0,9999999999,'lowest_hrly_fee') == false)
        {
               label.style.color = "red";
               document.location.replace('#Error');
               result = false;
        }
        
        label = document.getElementById("highest_hrly_fee"); 
        label.style.color = "black"
       
        if (validate_float(el,highest_hrly_fee,"Highest fee for a session hour",10,2,0,9999999999,'highest_hrly_fee') == false)
        {
               label.style.color = "red";
               document.location.replace('#Error');
               result = false;
        }
        
        label = document.getElementById('insurancePaperworkTextID');
        label.style.color = "black"
        
        // Choose one that best fits your situation CHECK
        _handle_ins_paperwork = document.getElementsByName('handle_ins_paperwork');
        if(_handle_ins_paperwork[0].checked || _handle_ins_paperwork[1].checked)
        {
            // for  Yes (on some ins. panels    /   Yes (not on any ins. panels)
            _insurance_paperwork = document.getElementsByName('insurance_paperwork');
            var checked = false;
            
            for(i = 0; i < _insurance_paperwork.length; i++)
                if(_insurance_paperwork[i].value != '0')
                    checked = checked || _insurance_paperwork[i].checked;
            
            if(typeof administerLogedin == 'undefined' && !checked)
            {
                ShowErrorMessage(el, 'Please choose one that best fits your situation.','insurancePaperworkTextID');
                
                label.style.color = "red";
                document.location.replace('#Error');
                result = false;
            }
        }
        else
            if(_handle_ins_paperwork[2].checked)
            {
                // for Private Payment Only 
                _will_provide_paperwork = document.getElementsByName('will_provide_paperwork');
                var checked = false;
                
                for(i = 0; i < _will_provide_paperwork.length; i++)
                    if(_will_provide_paperwork[i].value != '0')
                        checked = checked || _will_provide_paperwork[i].checked;
                
                if(typeof administerLogedin == 'undefined' && !checked)
                {
                    ShowErrorMessage(el, 'Please choose one that best fits your situation.','insurancePaperworkTextID');
                    
                    label.style.color = "red";
                    document.location.replace('#Error');
                    result = false;
                }
            }
    }
    
    if (result)
    {
        var list = document.getElementsByName("insuranceCompanies[]")[0];
    
        for (i = 0; i < list.options.length; i++)
            list.options[i].selected = true;                                            // Because select add only selected in POST Parameters!!!
    }
    
    return result;
}

function ChangeSelected()
{
    ChangeInsuranceCompany();
    SetChange();
    
    var list = document.getElementsByName("insuranceCompanies[]")[0];
    
    if(list.selectedIndex < 0) return;
    
    var param = list.options[list.selectedIndex].value.split('|');
    //document.main.ifInNetworkOther.checked = false
    document.main.insuranceState.value = "";
    if(param.length == 3)
    {
        document.main.ifInNetworkOther.checked = true;
        document.main.insuranceState.value = param[2];
    }
    else if(param.length == 2)
    {
        if(param[1] == "inNetwork")
            document.main.ifInNetworkOther.checked = true;
        else
            document.main.insuranceState.value = param[1];
    }
        
    document.main.otherCompany.value = list.options[list.selectedIndex].getAttribute('rightname');
    
    if(document.main.insuranceState.value != "")
        document.main.otherCompany.disabled = true;
    
    list.removeChild(list.options[list.selectedIndex]);
    
    document.main.ButtonAddOther.disabled = false; 
}

function UserListSelect()
{
    var list = document.getElementsByName("insuranceCompanies[]")[0];
    var count = 0;
    if(list.options.length != 0)
    {
        for (i = 0; i < list.options.length; i++)
        if (list.options[i].selected == true)
        {
            document.main.Romove.disabled = false;
            count++;
        }                                         
        /*if (count == 1)
            document.main.Change.disabled = false;
        else
            document.main.Change.disabled = true;*/
    }
}

function ChangeInsuranceCompany()
{
    var attrib = document.main.attrib;
    if (attrib.value.indexOf('insurancecmp_change-') == -1)
    {
        attrib.value = attrib.value + "insurancecmp_change-";
    }
}

function validate_form_page_five(thisform)
{
    var result = true;
    
    with (thisform)
    {                                                                          
       el=document.getElementById("Error"); 
       while (el.childNodes.length)
       {    
           el.removeChild(el.firstChild);                                      // Delete all child fields
       }
       
    label = document.getElementById("inspirational_statement"); 
    label.style.color = "#41798C"
    
    var notValid = false;
    notValid= /[<>]$/.test(inspirational_statement.value);
    var errorText = "contains some symbols that are not allowed. Please try to minimize the use of special symbols, like non-standard apostrophes, square brackets etc. and try to submit the text again.";
    if(!notValid)
    {
        notValid = inspirational_statement.value.length < 0;
    }
    if(!notValid)
    {
        notValid = inspirational_statement.value.length > 8192;
        errorText = 'is too long';
    }
    
    if(typeof administerLogedin == 'undefined' && !notValid)
    {
        notValid = inspirational_statement.value == "";
        errorText = 'can not be empty';
    }
    
    if (notValid)
    {
        ShowErrorMessage(el, "The 'inspirational statement' " + errorText,'inspirational_statement');
        
        label.style.color = "red";
        document.location.replace('#Error');
        result = false;
        $(inspirational_statement).attr('notSubmit', 'true');
    }
    
    label = document.getElementById("certifications_statement"); 
    label.style.color = "#41798C"
    
    var notValid = false;
    notValid= /[<>]$/.test(certifications_statement.value);
    var errorText = "contains some symbols that are not allowed. Please try to minimize the use of special symbols, like non-standard apostrophes, square brackets etc. and try to submit the text again.";
    if(!notValid)
    {
        notValid = certifications_statement.value.length < 0;
    }
    if(!notValid)
    {
        notValid = certifications_statement.value.length > 8192;
        errorText = 'is too long';
    }
    
    if(typeof administerLogedin == 'undefined' && !notValid)
    {
        notValid = certifications_statement.value == "";
        errorText = 'can not be empty';
    }
    
    if (notValid)
    {
        ShowErrorMessage(el, "The 'certifications, and trainings' " + errorText,'certifications_statement');
        
        label.style.color = "red";
        document.location.replace('#Error');
        result = false;
        $(certifications_statement).attr('notSubmit', 'true');
    }
    
    label = document.getElementById("about_practice"); 
    label.style.color = "#41798C"
    
    var notValid = false;
    notValid= /[<>]$/.test(about_practice.value);
    var errorText = "contains some symbols that are not allowed. Please try to minimize the use of special symbols, like non-standard apostrophes, square brackets etc. and try to submit the text again.";
    if(!notValid)
    {
        notValid = about_practice.value.length < 0;
    }
    if(!notValid)
    {
        notValid = about_practice.value.length > 8192;
        errorText = 'is too long';
    }
    
    if(typeof administerLogedin == 'undefined' && !notValid)
    {
        notValid = about_practice.value == "";
        errorText = 'can not be empty';
    }
    if (notValid)                               
    {
        ShowErrorMessage(el, "The 'statement about your practice' " + errorText, 'about_practice');
        
        label.style.color = "red";
        document.location.replace('#Error');
        result = false;
        $(about_practice).attr('notSubmit', 'true');
    }
    
    label = document.getElementById("therapist_to_therapist"); 
    label.style.color = "#41798C"
    
    var notValid = false;
    notValid= /[<>]$/.test(therapist_to_therapist.value);
    var errorText = "contains some symbols that are not allowed. Please try to minimize the use of special symbols, like non-standard apostrophes, square brackets etc. and try to submit the text again.";
    if(!notValid)
    {
        notValid = therapist_to_therapist.value.length < 0;
    }
    if(!notValid)
    {
        notValid = therapist_to_therapist.value.length > 8192;
        errorText = 'is too long';
    }
    
    if(therapist_to_therapist.getAttribute('tTCheck',2) != null && !notValid)
    {
        notValid = therapist_to_therapist.value == "";
        errorText = 'can not be empty';
    } 
    
    if (notValid)
    {
        ShowErrorMessage(el, "The \"Services for Therapists\" " + errorText, 'therapist_to_therapist');
        
        label.style.color = "red";
        document.location.replace('#Error');
        result = false;
        $(therapist_to_therapist).attr('notSubmit', 'true');
    }
    
    }
    
    return result;
}

function validate_form_page_six(thisform)
{
    return true;
}

var changed = false;

// This function will display message if information are not submited
function verifyClose(e) 
{
   var evnt = e || window.event;
   if(changed)
    evnt.returnValue = "If you have made any changes to the fields without clicking the Submit button, the changes will be lost";
   else
    evnt.retutnValue = true;
}

function SetChange(value)
{
    if(value == false)
        changed = false;
    else
        changed = true;
}

//window.onbeforeunload = verifyClose;

//  This function call validate function to special page
function SwitchFormValidate(page)
{
    $('.error').removeClass('error');
    $('#Error').attr('class', 'error');
    $('#Error1').attr('class', 'error');
    $('#Error2').attr('class', 'error');
    $('#serverMessageId').attr('class', 'error');
    $('.errorRow').remove();
    
    var result = false;
    var main = document.main;
    
    switch(page)
    {
        case 'registry' : result = validate_form(main); break;
        case 'username' : result = validate_username(main); break;
        case 'page_one' : result = validate_form_page_one(main); break;
        case 'page_two' : result = validate_form_page_two(main,true); break;
        case 'page_three' : result = validate_form_page_three(main); break;
        case 'page_four' : result = validate_form_page_four(main); break;
        case 'page_five' : result = validate_form_page_five(main); break;
        case 'page_six' : result = validate_form_page_six(main); break;
        case 'professionalcredentials' : result = validate_professionalcredentials(main, false); break;
    }
    
    return result;
}

//  AJAX function for guestbook pages
function SubmitForm(managepage)
{                  
    managepage = managepage || false; 
    
    SetChange(false);
    var main = document.main;
    
    var serverMessage = document.getElementById('serverMessageId');
        
    if(serverMessage)
        serverMessage.innerHTML = "";
    
    $("*[notSubmit='true']").removeAttr('notSubmit');
    
    SwitchFormValidate(main.getAttribute('page'));
    
    //if(SwitchFormValidate(main.getAttribute('page')))                      // Client validation
    {
        requestString = '1=1';
        
        var page = document.main.nextView;
        var pageArr = page.value.split('-');
        /*if(pageArr[2] != null)
            LogError('User submited to ' + pageArr[2],true);*/
        
        for(i = 0; i < main.length; i++)
        {
            if($(main.elements[i]).attr('notSubmit') == 'true')
                continue;
            
            if(main.elements[i].type == 'select-multiple')
            {
                var select = main.elements[i];
                var name = main.elements[i].name;
                name = name.substring(0,name.length - 1);
                
                for(j = 0; j < select.length; j++)
                {
                     outText = select.options[j].value.replace(/&/g,"%26");
                     requestString += '&' + name + j + ']' + '=' + outText;
                }
            }
            else
            if(main.elements[i].name == 'nextView')
            {
                requestString += '&' + main.elements[i].name + '=' + escape(main.elements[i].value);
            }
            else
            {
                if(main.elements[i].type == 'checkbox' || main.elements[i].type == 'radio')
                {
                    if(main.elements[i].checked == true)
                    {
                        requestString += '&' + main.elements[i].name + '=' + encodeURI(main.elements[i].value.replace(/&/g,"%26"));
                    }
                }
                else
                {
                    requestString += '&' + main.elements[i].name + '=' + encodeURI(main.elements[i].value.replace(/&/g,"%26"));
                }
            }
        }
        
        // Disable submit button
        var sub = document.getElementsByName('Submit')[0];
        sub.disabled = true;
        DisplayLoader();
        
        // Instantiate the WebRequest object.
        var wRequest =  new Sys.Net.WebRequest();
        var action = 'update'
        if(main.getAttribute('nextParam') != null)
            action = main.getAttribute('nextParam');
        
        wRequest.set_url("/controllers/index.php?command=therapist|"+ action + "&rqid=" + Math.random());
        wRequest.set_httpVerb("POST");
        wRequest.set_body(requestString);
        var callback = Function.createCallback(specialtiesRequestCompleted, false);
        wRequest.add_completed(callback);
        
        wRequest.invoke();
    }
}

function VerifyRequiredAll() {
    var links = [];
    $('#editTable').find("a > span").each(function() {
        if($(this).parent().attr('id') != 'profileLink' &&  $(this).parent().attr('id') != 'pdfbrochureLink') {
            links.push(this);
        }
    });
    if(links.length > 0) {
        if($('#mastComplete').length == 0) {
            $('#lastBreak').after(
                $('<span/>').attr({
                    id: 'mastComplete'
                }).css({
                    'padding-left':'10px',
                    color:'#208196'
                }).text('* You must complete areas marked "**" for your Marketing Profile to appear online and to generate your Marketing Brochure PDF')
            );
            
            $('#profileLink').add('#pdfbrochureLink').append(
                $('<span/>').text(' *')
            );
        }
    }
    else {
        $('#marketingYourPractice').find("a > span").remove();
        $('#mastComplete').remove();
    }
}

function specialtiesRequestCompleted(executor, eventArgs, reloadPage)
{
    if(typeof(reloadPage) == 'undefined')
        reloadPage = true;
    
    if(executor.get_responseAvailable()) 
    {
        response = executor.get_responseData(); 
        if(response.indexOf('next') != -1)
        {
            if(reloadPage)
            {
                var respArr = response.match(/^next=(.*);(.*)$/);
                if(respArr && typeof respArr[1] != 'undefined') {
                    var next = respArr;
                    
                    document.back.action = next[1];
                    if(next.length == 4)
                        document.back.action += '=' + next[2] + '=' + next[3];
                    document.back.submit();
                }
                else {
                    document.back.submit();
                }
            }
            else
            {
                // Show message only
                if(response.indexOf('requiredparams') != -1) {
                    var respArr = response.match(/^(.*);requiredparams=(.*)$/);
                    
                    if(respArr && typeof respArr[2] != 'undefined') {
                        var pagesList = [];
                        var pages = respArr[2].split(',');
                        var currentPage = $('#currentRequiredPage').val();
                        var currentHref = $('#currentRequiredPage').data('href');
                        var changed = false;
                        for(var n in pages) {
                            if(pages[n] == currentPage) {
                                changed = true;
                                if($("a[href$='"+currentHref+"']").find('span').length == 0) {
                                    $("a[href$='"+currentHref+"']").append(
                                        $('<span/>').addClass('note').css({'color':'red'}).text(' (incomplete)')
                                    );
                                }
                            }
                        }
                        
                        if(!changed && $("a[href$='"+currentHref+"']").find('span').length > 0) {
                            $("a[href$='"+currentHref+"']").find('span').remove();
                        }
                        
                        VerifyRequiredAll();
                    }
                }
                
                var sub = document.getElementsByName('Submit')[0];
                sub.disabled = false;
                HideLoader();
            
                ShowResult("Your changes were stored successfully");
                
                var serverMessage = document.getElementById('serverMessageId');
                $('#serverMessageId').addClass('green2');
        
                if(serverMessage && serverMessage.innerHTML == '')
                    serverMessage.innerHTML = "Your changes were stored successfully";
            }
        }
        else
        if(response.indexOf('xml') != -1)
        {
            // Parse xml error message
            var message = $(response).filter('root').attr('message');
            var paramName = $(response).filter('root').attr('paramName');
            
            if(paramName.indexOf('training') !== -1)
            {
                var trainingArr = paramName.split('#');
                if(trainingArr.length == 2)
                {
                    var name = trainingArr[1];
                    var index = -1;
                    $("label[id^='trainingLabel_']").each(function()
                    {
                        if($(this).text().trim() == name)
                        {
                            index = $(this).attr('id').split('_')[1];
                            return false;
                        }
                    });
                }
                
                //ShowErrorMessage($('#Error')[0], message, 'trainingLabel_' + index);
                $("input[name='Submit']").removeAttr('disabled');
                HideLoader();
                
                return false;
            }
            
            ShowErrorMessage($('#Error')[0], message, paramName);
            $("input[name='Submit']").removeAttr('disabled');
            HideLoader();
        }
        else
        {
            document.location.replace('#Error');    
            $('#Error').append(response + '<br /><br />');
            var sub = document.getElementsByName('Submit')[0];
            sub.disabled = false;
            HideLoader();
        }
    }
    else
    {
        processError("Unknown error during updating specialties. Please check with the system administrator.");
    }        
}

function processError(errorInfo)
{
    var err = document.getElementById('Error');
    
    err.innerHTML = errorInfo;
}

function ShowResult(message)
{
    var err = document.getElementById('Error');
    if(err.innerHTML == '')
    {
        $('#Error').addClass('green2');
        err.innerHTML = message;
    }
}

function LogError(errorText,notError)
{
    return false;
    
	notError = notError || false;
    
    // Instantiate the WebRequest object.
    var wRequest =  new Sys.Net.WebRequest();
    wRequest.set_url("/general/log.php?rqid=" + Math.random());
    wRequest.set_httpVerb("POST");
    
    if(!notError)
        errorPostText = "Error: ";
    else
        errorPostText = "";
    
    if(typeof(IP) != 'undefined')
        errorPostText += errorText + ", IP=" + IP;
    else
        errorPostText += errorText;
    
    wRequest.set_body("errorText=" + escape(errorPostText));
    wRequest.invoke();
}     

//  This function call validate function to special page registry
function SwitchRegistryFormValidate(page)
{
    var result = false;
    var main = document.main;
    
    switch(page)
    {
        case 'reg_page_one' : result = validate__reg_one(main); break;
        case 'reg_page_two' : result = validate__reg_two(main); break;
        case 'username' : result = validate_username(main); break;
        case 'required_information' : result = validate_required_information(main); break;
    }
    
    return result;
}

function validate__reg_one(thisform)
{
    var result = true;
    with (thisform)
    {                                                                          
       el=document.getElementById("Error"); 
       while (el.childNodes.length)
       {    
           el.removeChild(el.firstChild);                                      // Delete all child fields
       }
       
       var label;
       label = document.getElementById("fname"); 
       label.style.color = "black"
       
       if (validate_required(el,fname,"Please, enter your First Name.", 'fname') == false || validate_name(el,fname,'First', 'fname') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       if (!(/^(.)*[A-Z]+(.)*$/.test(fname.value)))
       {
            ShowErrorMessage(el, 'Please, enter at least one capital character for first name', 'fname');
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
       }
       
       label = document.getElementById("lname"); 
       label.style.color = "black"
       
       if (validate_required(el,lname,"Please, enter your Last Name.", 'lname') == false || validate_name(el,lname,'Last', 'lname') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       if (!(/^(.)*[A-Z]+(.)*$/.test(lname.value)))
       {
            ShowErrorMessage(el, 'Please, enter at least one capital character for last name', 'lname');
            
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
       }
       
       label = document.getElementById("educationDegree"); 
       label.style.color = "black"
       
       if (validate_required(el,educationDegree,"Please, enter graduate degree.", 'educationDegree') == false ||
           validate_widetext(el,educationDegree,'Graduate degree',255,'educationDegree') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("stateLicenseDegree"); 
       label.style.color = "black"
       
       if (validate_required(el,stateLicenseDegree,"Please, enter initials of state license.", 'stateLicenseDegree') == false ||
           validate_widetext(el,stateLicenseDegree,'Graduate degree',255,'stateLicenseDegree') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       
       label = document.getElementById("email"); 
       label.style.color = "black"
       
       if (validate_required(el,email,"Please, enter your Email address.", 'email') == false || validate_email(el, email, 'email') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("email2"); 
       label.style.color = "black";
       
       valid_email = true;
       
       if (validate_required(el,email2,"Please, re-enter your E-mail.", 'email2') == false)
       {
           label.style.color = "red";
           document.location.replace('#Error');
           result = false;
           valid_email = false;
       }

       if(valid_email)
       if(email.value != email2.value)
       {
            ShowErrorMessage(el, "The two email addresses that you entered do not match", 'email2');
            
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
       }
       
       label = document.getElementById("phone"); 
       label.style.color = "black"
       
       if (validate_required(el,officephoneArea,"Please, enter Office phone area", 'phone') == false || validate_phone(el,officephoneArea,3,'Area', 'phone') == false ||
       validate_required(el,officephoneNumber1,"Please, enter Office phone number", 'phone') == false || validate_phone(el,officephoneNumber1,3,'Number', 'phone') == false ||
       validate_required(el,officephoneNumber2,"Please, enter Office phone number", 'phone') == false || validate_phone(el,officephoneNumber2,4,'Number', 'phone') == false ||
       validate_phone(el,officephoneExtension,6,'Extension', 'phone') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       // ---- Office Address
       label = document.getElementById("mailingaddress"); 
       label.style.color = "black"
       if (validate_required(el,mailingAddressLine1,"Please, enter your Office Address.", 'mailingaddress') == false ||
       validate_mailingAddress(el,mailingAddressLine1,true,'mailingaddress') == false ||
       validate_mailingAddress(el,mailingAddressLine2,true,'mailingaddress') == false )
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("city"); 
       label.style.color = "black"
       if (validate_required(el,mailingAddressCity,"Please, enter your Office City.", 'city') == false ||
       validate_city(el,mailingAddressCity,true,'city') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("mailingAddressStateId"); 
       label.style.color = "black"
       state = document.getElementsByName('mailingAddressState')[0];
       if (state.value == '')
       {
            ShowErrorMessage(el, "The Office State is not selected.", 'mailingAddressStateId');
            
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
       }
       
       label = document.getElementById("zip"); 
       label.style.color = "black"
       if (validate_required(el,mailingAddressZipMajor,"Please, enter major Office Zip.", 'zip') == false || 
       validate_zip(el,mailingAddressZipMajor,5,'Office Major','zip') == false ||
       validate_zip(el,mailingAddressZipMinor,4,'Office Minor','zip') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       // -------------------
       
       return result;
    }
}

function validate__reg_two(thisform)
{
    var result = true;
    
    with (thisform)
    {
        el=document.getElementById("Error"); 
        while (el.childNodes.length)
        {    
            el.removeChild(el.firstChild);                                      // Delete all child fields
        }
        //  Training level drop-down list
        label = document.getElementById("trainingLevelId"); 
        if(typeof(label) != 'undefined' && label != null)
        {
            //  If not management page_one
            label.style.color = "black"
            state = document.getElementsByName('trainingLevel')[0];
            
            if (state.value == '')
            {
                ShowErrorMessage(el, "The training level is not selected.", 'trainingLevelId');
                
                label.style.color = "red";
                document.location.replace('#Error');
                result = false;
            }
            if (state.value == 'No Training')
            {
                   window.location = '/views/new_application/no_training.html';   
                   return false;
                   
                   
            }
            if (state.value == 'PESI Training')
            {
                   window.location = '/views/new_application/pesi_training.html';   
                   return false;
            }
            if (state.value == 'EMDR (Weekend One)')
            {
                   window.location = '/views/new_application/weekend_one.html';   
                   return false;
            }
            if (state.value == 'Both Weekends (still need consultation hours)')
            {
                   window.location = '/views/new_application/weekend_two.html';   
                   return false;
            }
        }
        
        label = document.getElementById("providesFeeBasedServicesID"); 
        label.style.color = "black";
        if(!validate_widetext(el,providesFeeBasedServices,'fee-based EMDR consultation or training servicesensure',255,'providesFeeBasedServicesID'))
        {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
        }
        
        label = document.getElementById("providesNonEMDRTrainingOpportunitiesID"); 
        label.style.color = "black";
        if(!validate_widetext(el,providesNonEMDRTrainingOpportunities,'Non-EMDR training opportunities for other therapists',255,'providesNonEMDRTrainingOpportunitiesID'))
        {
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
        }
        
        label = document.getElementById("referrerinfo"); 
        label.style.color = "black"
        if (referrerBase.value == 'Other' || referrerBase.value == 'Another Therapist')
        {
            if (validate_required(el,referrerCustom,(referrerBase.value == 'Other', 'referrerinfo')?"Please, enter Provide Info":"Please, enter Provide Name") == false ||
            validate_referrer(el,referrerCustom,'referrerinfo') == false)           // If other or another therapist
            {
                   label.style.color = "red";
                   document.location.replace('#Error');
                   result = false;
            }
        }
        if (referrerBase.value == '')
        {
            ShowErrorMessage(el, "The website referrer is not selected.", 'referrerinfo');

            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
        }
    }
    
    return result;
}

function validate_required_information(thisform)
{
    var result = true;
    
    $('.errorRow').remove();
    
    with (thisform)
    {
        el=document.getElementById("Error"); 
        while (el.childNodes.length)
        {    
            el.removeChild(el.firstChild);                                      // Delete all child fields
        }
        
       // ---- Home Address
       label = document.getElementById("mailingaddress_home"); 
       label.style.color = "black"
       if (validate_mailingAddress(el,h1mailingAddressLine1,false,'mailingaddress_home') == false ||
       validate_mailingAddress(el,h1mailingAddressLine2,false,'mailingaddress_home') == false )
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("city_home"); 
       label.style.color = "black"
       if (validate_city(el,h1mailingAddressCity,false,'city_home') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("zip_home"); 
       label.style.color = "black"
       if (validate_zip(el,h1mailingAddressZipMajor,'5','Home Major zip code','zip_home') == false ||
           validate_zip(el,h1mailingAddressZipMinor,4,'Home Minor zip code','zip_home') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       // -----------------
       
       label = document.getElementById("cphone"); 
       label.style.color = "black"
       
       if (validate_phone(el,cellphoneArea,3,'Mobile phone area', 'cphone') == false ||
        validate_phone(el,cellphoneNumber1,3,'Mobile phone number', 'cphone') == false ||
       validate_phone(el,cellphoneNumber2,4,'Mobile phone number', 'cphone') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
       label = document.getElementById("hphone"); 
       label.style.color = "black"
       
       if (validate_required(el,homephoneArea,"Please, enter Home phone area", 'hphone') == false || validate_phone(el,homephoneArea,3,'Home phone area', 'hphone') == false ||
       validate_required(el,homephoneNumber1,"Please, enter Home phone number", 'hphone') == false || validate_phone(el,homephoneNumber1,3,'Home phone number', 'hphone') == false ||
       validate_required(el,homephoneNumber2,"Please, enter Home phone number", 'hphone') == false || validate_phone(el,homephoneNumber2,4,'Home phone number', 'hphone') == false)
       {
              label.style.color = "red";
              document.location.replace('#Error');
              result = false;
       }
       
	   label = document.getElementById("nameOfLicensure"); 
       label.style.color = "black"
       
       if (approvedLicense.value == '')
       {
           ShowErrorMessage(el, 'Please, select profession type', 'nameOfLicensure');
            
           label.style.color = "red";
           document.location.replace('#Error');
           result = false;
       }
       
       label = document.getElementById("genderID"); 
       label.style.color = "black"
       
       if (gender.value == '')
       {
            ShowErrorMessage(el, "The gender is not selected.", 'genderID');
            
            label.style.color = "red";
            document.location.replace('#Error');
            result = false;
       }
       
    }
    
    //if(result)
    result2 = validate_professionalcredentials(thisform, true);
    result = result && result2;
    
    return result;
}


function DisplayLoader()
{
    // <img id="loader" style="display: none;" src="/images/loader.gif" width="16" height="16" alt="loading" title="loading" />
    var ld = document.getElementById('loader');
    if(ld)
        ld.style.display = 'inline';
}

function HideLoader()
{
    var ld = document.getElementById('loader');
    if(ld)
        ld.style.display = 'none';
}

// New application registry forms
function SubmitFormRegistry()
{
    SetChange(false);
    var main = document.main;
    
    if(SwitchRegistryFormValidate(main.getAttribute('page')))                      // Client validation
    {
        requestString = '1=1';
        
        var page = document.main.nextView;
        var pageArr = page.value.split('-');
        if(pageArr[2] != null)
            LogError('Registration: User submited to ' + pageArr[2],true);
        
        for(i = 0; i < main.length; i++)
        {
            if(main.elements[i].type == 'select-multiple')
            {
                var select = main.elements[i];
                var name = main.elements[i].name;
                name = name.substring(0,name.length - 1);
                
                for(j = 0; j < select.length; j++)
                {
                     outText = select.options[j].value.replace(/&/g,"%26");
                     requestString += '&' + name + j + ']' + '=' + outText;
                }
            }
            else
            if(main.elements[i].name == 'nextView')
            {
                requestString += '&' + main.elements[i].name + '=' + escape(main.elements[i].value);
            }
            else
            {
                if(main.elements[i].type == 'checkbox' || main.elements[i].type == 'radio')
                {
                    if(main.elements[i].checked == true)
                    {
                        requestString += '&' + main.elements[i].name + '=' + encodeURI(main.elements[i].value);
                    }
                }
                else
                {
                    requestString += '&' + main.elements[i].name + '=' + encodeURI(main.elements[i].value.replace(/&/g,"%26"));
                }
            }
        }
        
        // Disable submit button
        var sub = document.getElementsByName('Submit')[0];
        sub.disabled = true;
        DisplayLoader();
        
        // Instantiate the WebRequest object.
        var wRequest =  new Sys.Net.WebRequest();
        var action = 'update'
        if(main.getAttribute('nextParam') != null)
            action = main.getAttribute('nextParam');
        
        wRequest.set_url("/controllers/index.php?command=therapist|"+ action + "&rqid=" + Math.random());
        wRequest.set_httpVerb("POST");
        wRequest.set_body(requestString);
        var callback = Function.createCallback(specialtiesRequestCompleted, true);
        wRequest.add_completed(callback);
        
        wRequest.invoke();
        }
}

function AddOtherInput(sel, newTitleName, newTextId, newTextName, containerId)
{
    var val = sel.options[sel.selectedIndex].value;
    
    if(val == 'Other')
    {
        // Add 'Other' text field
        sel.name = newTitleName;
        var inp = document.createElement('input');
        
        inp.type = 'text';
        inp.id = newTextId;
        inp.name = newTextName;
        inp.size = '10';
        inp.maxlength="10";
        inp.style.display = 'inline';
        
        $get(containerId).innerHTML = '&nbsp;&nbsp;';
        $get(containerId).appendChild(inp);
    }
    else
    {
        // Remove 'Other' text field if exist
        var inp = $get(newTextId);
        if(inp)
        {
            inp.parentNode.removeChild(inp);
            $get(containerId).innerHTML = '';
            sel.name = newTextName;
        }
    }
}

function TitleChange(sel)
{
    AddOtherInput(sel, 'titleOther', 'otherTitleId', 'title', 'otherTitleBlockId');
}

function SuffixChange(sel)
{
    AddOtherInput(sel, 'suffixOther', 'otherSuffixId', 'suffix', 'otherSuffixBlockId');
}

function _checkOneDate(valueIn, maxValueIn)
{
    var result = true;
    var value = parseInt(valueIn, 10);
    if(isNaN(value))
        value = 0;
            
    var maxValue = parseInt(maxValueIn, 10);
    if(isNaN(maxValue))
        maxValue = 0;
    
    if(value > maxValue)
        result = false;
        
    return result;
}

function _getDateMessage(n)
{
    var checkDate = '';
    switch(n)
    {
        case 0 : checkDate = 'degree completed'; break;
        case 1 : checkDate = 'you entered practice'; break;
        case 2 : checkDate = 'EMDR training completed'; break;
        case 3 : checkDate = 'EMDRIA certification'; break;
        case 4 : checkDate = 'EMDR approved consultant'; break;
        case 5 : checkDate = 'you began using EMDR confidently'; break;
    }
    
    return checkDate;
}

function _getDatesError(n, m)
{
    return 'The year '+_getDateMessage(n)+' value cannot be larger than year ' + _getDateMessage(m);
}

function ValidateDates(dates, el)
{
    result = true;
    
    // Set empty date for default value
    for(var i in dates) {
        if(dates[i] == '<date>')
            dates[i] = '';
    }
    
    label = document.getElementById("yearDegreeCompletedSpanId"); 
    // Check yearDegreeCompleted    <= 2..6
    if(dates[0] != '')
        for(i = 1; i < 6; i++)
            if(dates[i] != '')
                if(!_checkOneDate(dates[0], dates[i]))
                {
                    ShowErrorMessage(el, _getDatesError(0, i), 'yearDegreeCompletedSpanId');
                    
                    label.style.color = "red";
                    document.location.replace('#ErrorProfessional');
                    result = false;
                    break;
                }
    
    label = document.getElementById("yearYouEnteredPracticeSpanId"); 
    // Check yearYouEnteredPractice     <= 3..6
    if(dates[1] != '')
        for(i = 2; i < 6; i++)
            if(dates[i] != '')
                if(!_checkOneDate(dates[1], dates[i]))
                {
                    ShowErrorMessage(el, _getDatesError(1, i), 'yearYouEnteredPracticeSpanId');
                    
                    label.style.color = "red";
                    document.location.replace('#ErrorProfessional');
                    result = false;
                    break;
                }
    
    // Check trainingDate_4             <= 4..5
    if(dates[2] != '')
        for(i = 3; i < 5; i++)
            if(dates[i] != '')
                if(!_checkOneDate(dates[2], dates[i]))
                {
                    ShowErrorMessage(el , _getDatesError(1, i), 'yearYouEnteredPracticeSpanId');
                    
                    LogError(_getDatesError(2, i));
                    result = false;
                    break;
                }
    
    // Check trainingDate_5             <= 5
    if(dates[3] != '')
        for(i = 4; i < 5; i++)
            if(dates[i] != '')
                if(!_checkOneDate(dates[3], dates[i]))
                {
                    ShowErrorMessage(el, _getDatesError(1, i), 'yearYouEnteredPracticeSpanId');
                    LogError(_getDatesError(3, i));
            
                    result = false;
                    break;
                }
    
    return result;
}

function OnNotCompleteTrainingClick(notCompleteTraining)
{
    dates = document.getElementsByTagName('input');
    for(i = 0; i < dates.length; i++)
        if(dates[i].name.indexOf('trainingDate') !== -1)
        {
            if(notCompleteTraining.checked)
            {
                dates[i].value = '';
                dates[i].disabled = true;
            }
            else
            {
                dates[i].disabled = false;
            }
        }
}

function AddErrorRow(el, id, text, appendType)
{
    if(id != '')
    {
        if($('#' + id).attr('tagName') == 'TD')
        {
            if(appendType == 'row_1_column')
            {
                $tr = $('<tr />').css('color', 'orangered').addClass('errorRow')
                        .append(
                        $('<td />').attr('colspan', '4').css('padding', '10px 0 0 30px').html(text)
                    );
            }
            else
            {
                $tr = $('<tr />').css('color', 'orangered').addClass('errorRow')
                        .append('<td />')
                        .append(
                        $('<td />').html(text)
                    );
            }
            
            $('#' + id).parent().after($tr);
        }
        else
        if($('#' + id).length == 1)
        {
            $('#' + id).parent().append(
                $('<p />').css('color', 'orangered').addClass('errorRow').html(text)
            );
        }
        else
        if($("*[name='"+id+"']").length == 1)
        {
            $("*[name='"+id+"']").parent().append(
                $('<p />').css('color', 'orangered').addClass('errorRow').html(text)
            );
        }
    }
    else
    {
        $(el).append(
            $('<p />').css('color', 'orangered').addClass('errorRow').html(text)
        );
    }
}

function AddTrainingError(el, id, text)
{
    $tr = $('<tr />').css('color', 'orangered').addClass('errorRow')
        .append(
        $('<td />').attr('colspan', '4').css('padding-left', '25px').html(text)
    );
    
    $('#' + id).closest('tr').after($tr);
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function get_validate_query(query)
{
	var result = "";
    for(var i=0; i<query.length; i++) {
    	var letter = query.charAt(i);
    	if (/^([a-zA-Z0-9 \-']){0,1}$/.test(letter))
    		result += letter;
    }
    
    return $.trim(result);
}
