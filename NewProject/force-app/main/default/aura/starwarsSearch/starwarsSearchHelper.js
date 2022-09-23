({ 
    getResponse : function(component, id) {
        var action= component.get("c.getPeople"); //this conect with apex class
        action.setParams({
            "url": 'https://www.swapi.tech/api/people/'+id+'/' 
        });
        
        action.setCallback(this, function(response){
            
            var state = response.getState();
            console.log("El state es: "+state);
            
            var responseBody= JSON.parse(JSON.stringify(response.getReturnValue()));
            
            if(responseBody.message === "ok" ){
                var myCmp = component.find("myCmp");
                $A.util.removeClass(myCmp, "slds-hidden");
                
                if(responseBody.result.properties.name != "none" && responseBody.result.properties.name != "unknown" && responseBody.result.properties.name != "n/a"){
                    component.set("v.readOnlyList[0]","true");
                    component.set("v.newContact.Name",responseBody.result.properties.name);
                    component.set("v.newContact.LastName",responseBody.result.properties.name);
                } else {
                    component.set("v.newContact.Name","");
                    component.set("v.readOnlyList[0]","false"); 
                } 
                
                if(responseBody.result.properties.height != "none" && responseBody.result.properties.height != "unknown" && responseBody.result.properties.height != "n/a"){
                    component.set("v.readOnlyList[1]","true");
                    component.set("v.newContact.Altura__c",responseBody.result.properties.height);
                } else {
                    component.set("v.newContact.Altura__c","");
                    component.set("v.readOnlyList[1]","false"); 
                } 
                
                if(responseBody.result.properties.gender != "none" && responseBody.result.properties.gender != "unknown" && responseBody.result.properties.gender != "n/a"){
                    component.set("v.readOnlyList[2]","true");
                    component.set("v.newContact.Genero__c",responseBody.result.properties.gender);
                } else {
                    component.set("v.newContact.Genero__c","");
                    component.set("v.readOnlyList[2]","false"); 
                } 
                
                if(responseBody.result.properties.hair_color != "none" && responseBody.result.properties.hair_color != "unknown" && responseBody.result.properties.hair_color != "n/a"){
                    component.set("v.readOnlyList[3]","true");
                    component.set("v.newContact.Color_de_cabello__c",responseBody.result.properties.hair_color);
                } else {
                    component.set("v.newContact.Color_de_cabello__c","");
                    component.set("v.readOnlyList[3]","false");
                } 
                
                if(responseBody.result.properties.eye_color != "none" && responseBody.result.properties.eye_color != "unknown" && responseBody.result.properties.eye_color != "n/a"){
                    component.set("v.readOnlyList[4]","true");
                    component.set("v.newContact.Color_de_ojos__c",responseBody.result.properties.eye_color);
                } else {
                    component.set("v.newContact.Color_de_ojos__c","");
                    component.set("v.readOnlyList[4]","false"); 
                } 
                
                if(responseBody.result.properties.homeworld != "none" && responseBody.result.properties.homeworld != "unknown" && responseBody.result.properties.homeworld != "n/a"){
                    component.set("v.readOnlyList[5]","true");
                    component.set("v.newContact.Planeta__c",responseBody.result.properties.homeworld);
                } else {
                    component.set("v.newContact.Planeta__c","");
                    component.set("v.readOnlyList[5]","false"); 
                } 
                component.set("v.newContact.Nro_de_Personaje__c",responseBody.result.uid);
                component.set("v.newContact.URL__c",responseBody.result.properties.url);
            } 
            else{
                //it works
                var myCmp = component.find("myCmp");
                $A.util.addClass(myCmp, "slds-hidden");
                
                var  toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: "Character not found",
                    message: "Please, enter a valid number",
                    type: "error",
                });
                toastEvent.fire();
            } 
        });
        $A.enqueueAction(action);
    },
    createContact : function(component, newContact){
        let action2 = component.get("c.saveContact");
        action2.setParams(
            {'newContact': newContact } //Json 
        );
        action2.setCallback(this, function(response){
            let state = response.getState();
            
            let err = response.getError();
            
            if (state === "SUCCESS") {    //it works
                var  toastEventS = $A.get("e.force:showToast");
                toastEventS.setParams({
                    title: "Character Saved!",
                    message: "Check it on Contacts",
                    type: "success",
                });
                toastEventS.fire();
            } else {
                if (err){     //it works
                    var  toastEventE = $A.get("e.force:showToast");
                    toastEventE.setParams({
                        title: "Not Saved",
                        message: "Character already exists or empty fields are left",
                        type: "error",
                    });
                    toastEventE.fire(); 
                }  
            }
        });
        $A.enqueueAction(action2);
    } 
    
})