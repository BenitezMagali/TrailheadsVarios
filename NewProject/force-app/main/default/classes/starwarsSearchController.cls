public with sharing class starwarsSearchController{
    @AuraEnabled
    public static Map<String,Object> getPeople(String url) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        //request.setHeader('Accept', 'application/json');
        HttpResponse response = http.send(request);
        Map<String, Object> resultPeople = new Map<String, Object>();
        
        system.debug(response);
        if(response.getStatusCode() == 200){
            resultPeople = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());         
            system.debug(resultPeople);
            
        }
        else if (response.getStatusCode() == 404 ){
            system.debug('"El error es 404"');
        }
        return resultPeople;  
    }
    
    @AuraEnabled
    public static Contact saveContact(Contact newContact){
        Database.SaveResult srContact = Database.insert(newContact); 
        
            if (srContact.isSuccess()) {
                // Operation was successful, so get the ID of the record that was processed
                System.debug('Successfully inserted contact. Contact ID: ' + srContact.getId());
            } else {
                // Operation failed, so get all errors
                for(Database.Error err : srContact.getErrors()) {
                    System.debug('The following error has occurred.');
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Contact fields that affected this error: ' + err.getFields());
                }
                
            }
            
        
        return newContact;
    }


    
    
}