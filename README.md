Note: 
While creating this, cross region replication feature is not yet available for Cloudflare R2
Store secrets in [Environment variables]((https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-wrangler)) as best practice instead of hardcoding

This worker trigger [Super Slurper  ](https://developers.cloudflare.com/r2/data-migration/super-slurper/) to trigger bucket replication from source to destination.


**Prerequisites** :
- To create sourceId (source) and sinkId (destination)  (using curl or postman)

- [API token ](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)with R2 read/write permission

- curl --location 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNTID}/r2migrator/v1/sources/connectivity-precheck' \
-H 'Content-Type: application/json' \
-H 'Authorization: ••••••'' \
--data '{
    "bucket": "source_bucket_name",
    "secret": {
        "r2AccessKeyId": "123",
        "r2SecretAccessKey": "321"
    },
    "vendor": "r2",
    "account": "{ACCOUNTID"
}'


- curl --location 'https://api.cloudflare.com/client/v4/accounts/{ACCOUNTID}/r2migrator/v1/sinks/connectivity-precheck' \
  -H 'Content-Type: application/json' \
  -H 'header : 'Authorization: ••••••'' \
--data '{
    "bucket": "destination_bucket_name",
    "secret": {
        "r2AccessKeyId": "123",
        "r2SecretAccessKey": "321"
    }
}'


- Save the sourceId and sinkId to be substitubed in [index.ts ](https://github.com/iamask/r2-consumer-migration/blob/master/src/index.ts)

**steps** :

- Create and attach R2 event notification on the [source bucket](https://developers.cloudflare.com/r2/buckets/event-notifications/) 
- Create a Consumer Worker and [Connect the consumer Worker to your queue ](https://developers.cloudflare.com/queues/get-started/#connect-the-consumer-worker-to-your-queue)
- Cloudflare Access

  **Reference** :


 **Steps**:
 


 - **Note**:

  **Reference** 


