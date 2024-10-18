
This worker trigger [Super Slurper ]([url](https://developers.cloudflare.com/r2/data-migration/super-slurper/)) to trigger bucket replication from source to destination.


**steps** :

- Create R2 event notification on the [source bucket]([url](https://developers.cloudflare.com/r2/buckets/event-notifications/)) 
- DNS
- WAF Managed rules
- Custom rules
- Rate limiting
- Transform rules
- Redirect rules
- Cache rules

- Zero Trust
- Cloudflare Access

  **Reference** :
  - https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs
  - https://developers.cloudflare.com/terraform/

 **Steps**:
 
 - clone the repo
 - run > "Terraform init"
 - run > "Terraform plan"
 - run > "Terraform apply"

 - **Note**: Terraform plan and apply command will prompt for API token and zone ID

  **Reference** 
 - https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
 - https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/

