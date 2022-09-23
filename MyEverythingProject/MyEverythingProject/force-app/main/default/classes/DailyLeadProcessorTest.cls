@isTest
private class DailyLeadProcessorTest {
    public static String CRON_EXP = '0 0 0 15 3 ? 2022';
    static testmethod void testScheduledJob() {
        List<Lead> leads = new List<Lead>();
        for (Integer i=0; i<200; i++) {
            Lead l = new Lead(
                FirstName = 'First ' + i,
                LastName = 'LastName',
                Company = 'The Inc'
            );
            leads.add(l);
        }
        insert leads;
        
        Test.startTest();
        // Schedule the test job
        String jobId = System.schedule('ScheduledApexTest',
            CRON_EXP,
            new DailyLeadProcessor());
        Test.stopTest();
        
        // Now that the scheduled job has executed,
        // check that we have 200 Leads with dreamforce
        List<Lead> checkleads= new List<Lead>();
        checkleads = [SELECT Id
            FROM Lead
            WHERE LeadSource='Dreamforce' and Company = 'The Inc'];
        System.assertEquals(200,
            checkleads.size(),
            'Leads were not created');
    }
}