export default {
    async queue(batch, env): Promise < void > {
        await doMigrate();
        console.log(batch.messages);
    },
}
satisfies ExportedHandler < Env > ;


async function doMigrate(): Promise < void > {
   // Account API token for firing API
    const bearerToken = 'xxxxx-Xzvm5';
  //Get sinkId and sourceId using API - README.md
    const config = {
        "rootDirectory": "",
        "conflictBehaviour": "skip",
        "sinkId": "8c5222d3d-9751-4424-bd67-47f194e231321",
        "sourceId": "10227208f-bf31-41b0-8a0c-84f321c215e"
    };

    const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    }

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(config),
    };



    interface MigrationResponse {
        result: {
            id: string;
        };
        success: boolean;
        errors: any[];
        messages: any[];
    }
    const createMigrations = await fetch('https://api.cloudflare.com/client/v4/accounts/{ACCOUNTID}/r2migrator/v1/migrations',
        requestOptions)

    const createMigrationsData = await createMigrations.json() as MigrationResponse;

    if (createMigrationsData.success) {
        const migrationId = createMigrationsData.result.id;
        console.log(migrationId); // Outputs: 73293504-b3b9-4103-bdc7-bdcf263a468e


        const startMigration = await fetch(`https://api.cloudflare.com/client/v4/accounts/{ACCOUNTID}/r2migrator/v1/migrations/${migrationId}/lifecycle/start`, {
            method: "PATCH",
            headers: headers
        })
        const startMigrationData = await startMigration.json() as MigrationResponse;

        if (startMigrationData.success) {
            console.log("Replication done ")
        }
    } else {
        console.error('Failed to create migration:', createMigrationsData.errors);
    }
}
