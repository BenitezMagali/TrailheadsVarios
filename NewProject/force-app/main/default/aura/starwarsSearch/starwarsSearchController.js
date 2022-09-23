({ 
    calloutController : function(component, event, helper) {
        var id= component.find('enter-search').get('v.value');
        helper.getResponse(component,id);
    },
    
    clickCreate: function(component, event, helper) {
        let validContact = component.find('peopleform').reduce(function (validSoFar, inputCmp) {
            var value= inputCmp.get('v.value');
            console.log(value);
           
            return validSoFar ;
        }, true);
        console.log("El valid contact es: " +validContact);
        if(validContact){
            let newContact = component.get("v.newContact");
            helper.createContact(component, newContact);
        } else {
            console.log("El formulario esta incompleto");
        }
    },
    refreshN: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Name", newValue);  
    },
    refreshA: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Altura__c", newValue);  
    },
    refreshG: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Genero__c", newValue);  
    },
    refreshCC: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Color_de_cabello__c", newValue);  
    },
    refreshCO: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Color_de_ojos__c", newValue);  
    },
    refreshP: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Planeta__c", newValue);  
    },
    refreshNP: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.Nro_de_Personaje__c", newValue);  
    },
    refreshURL: function(component, event) {
        let newValue= event.target.value;
        component.set("v.newContact.URL__c", newValue);  
    },
    
    handleClick: function(component, event){
        var myCmp = component.find("myCmp");
        $A.util.addClass(myCmp, "slds-hidden");
        component.find('enter-search').clearReference();
    }
})