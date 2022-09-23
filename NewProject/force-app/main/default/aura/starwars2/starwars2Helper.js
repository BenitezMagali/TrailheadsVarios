({
	 getResponse : function(component, id) {
        var action= component.get("c.getPeople"); //this conect with apex class
        action.setParams({
            "url": 'https://swapi.dev/api/people/'+id+'/' 
        });
        
        action.setCallback(this, function(response){
            console.log(response);
            var tuvieja= JSON.parse(JSON.stringify(response.getError()));
            console.log(response.getError());
            var state = response.getState();
            console.log(state);
            var responseBody= JSON.parse(JSON.stringify(response.getReturnValue()));
            if(responseBody.detail !== "Not found"){
                var myCmp = component.find("myCmp");
                $A.util.removeClass(myCmp, "slds-hidden");
                
                if(responseBody.name != "none" && responseBody.name != "unknown" && responseBody.name != "n/a"){
                    component.set("v.readOnlyList[0]","true");
                    component.set("v.newContact.Name",responseBody.name);
                    component.set("v.newContact.LastName",responseBody.name);
                } else {
                    component.set("v.newContact.Name","");
                    component.set("v.readOnlyList[0]","false"); 
                } 
                
                if(responseBody.height != "none" && responseBody.height != "unknown" && responseBody.height != "n/a"){
                    component.set("v.readOnlyList[1]","true");
                    component.set("v.newContact.Altura__c",responseBody.height);
                } else {
                    component.set("v.newContact.Altura__c","");
                    component.set("v.readOnlyList[1]","false"); 
                } 
                console.log(responseBody.height);
                if(responseBody.gender != "none" && responseBody.gender != "unknown" && responseBody.gender != "n/a"){
                    component.set("v.readOnlyList[2]","true");
                    component.set("v.newContact.Genero__c",responseBody.gender);
                } else {
                    component.set("v.newContact.Genero__c","");
                    component.set("v.readOnlyList[2]","false"); 
                } 
                
                if(responseBody.hair_color != "none" && responseBody.hair_color != "unknown" && responseBody.hair_color != "n/a"){
                    component.set("v.readOnlyList[3]","true");
                    component.set("v.newContact.Color_de_cabello__c",responseBody.hair_color);
                } else {
                    component.set("v.newContact.Color_de_cabello__c","");
                    component.set("v.readOnlyList[3]","false"); 
                } 
                
                if(responseBody.eye_color != "none" && responseBody.eye_color != "unknown" && responseBody.eye_color != "n/a"){
                    component.set("v.readOnlyList[4]","true");
                    component.set("v.newContact.Color_de_ojos__c",responseBody.eye_color);
                } else {
                    component.set("v.newContact.Color_de_ojos__c","");
                    component.set("v.readOnlyList[4]","false"); 
                } 
                
                if(responseBody.homeworld != "none" && responseBody.homeworld != "unknown" && responseBody.homeworld != "n/a"){
                    component.set("v.readOnlyList[5]","true");
                    component.set("v.newContact.Planeta__c",responseBody.homeworld);
                } else {
                    component.set("v.newContact.Planeta__c","");
                    component.set("v.readOnlyList[5]","false"); 
                } 
                component.set("v.newContact.Nro_de_Personaje__c",id);
                component.set("v.newContact.URL__c",responseBody.url);
            } 
            else if(responseBody.detail === "Not found"){
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
    }
})