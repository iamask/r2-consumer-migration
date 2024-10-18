
export default {
	async queue(batch, env): Promise<void> {
	  await doMigrate();
	  console.log(batch.messages);
	},
  } satisfies ExportedHandler<Env>;


  async function doMigrate(): Promise<void> {
	const bearerToken = 'w7dpRvION6ZpQnGJH8Es0j5cgVj8T71oQE-Xzvm5';
	const config = {
		"rootDirectory": "",
		"conflictBehaviour": "skip",
		"sinkId": "8c522d3d-9751-4424-bd67-47f194e23130",
		"sourceId": "1027208f-bf31-41b0-8a0c-84f3bf5c215e"
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
	const createMigrations = await fetch('https://api.cloudflare.com/client/v4/accounts/174f936387e2cf4c433752dc46ba6bb1/r2migrator/v1/migrations',
	requestOptions)
   
   const createMigrationsData = await createMigrations.json() as MigrationResponse;

   if (createMigrationsData.success) {
	const migrationId = createMigrationsData.result.id;
	console.log(migrationId); // Outputs: 73293504-b3b9-4103-bdc7-bdcf263a468e
     
  
	const startMigration = await fetch (`https://api.cloudflare.com/client/v4/accounts/174f936387e2cf4c433752dc46ba6bb1/r2migrator/v1/migrations/${migrationId}/lifecycle/start`,{method: "PATCH",headers: headers} )
	const startMigrationData = await startMigration.json() as MigrationResponse;

	if(startMigrationData.success){
    console.log("Replication done ")
	}
  } else {
	console.error('Failed to create migration:', createMigrationsData.errors);
  }
  }





  //[{"attempts":1,"body":{"account":"174f936387e2cf4c433752dc46ba6bb1","bucket":"public","object":{"key":"test-image.jpeg"},"action":"DeleteObject","eventTime":"2024-10-18T03:35:54.532Z"},"timestamp":"2024-10-18T03:35:55.213Z","id":"124cd93fccb9295546e8a05c3273322e"}]


  /*

OR

[
  {
    attempts: 1,
    body: {
      account: '174f936387e2cf4c433752dc46ba6bb1',
      bucket: 'public',
      object: [Object],
      action: 'PutObject',
      eventTime: '2024-10-18T03:43:05.300Z'
    },
    timestamp: '2024-10-18T03:43:05.585Z',
    id: 'e0aaeb0e491cc35fa5477f517239b888'
  },
  {
    attempts: 1,
    body: {
      account: '174f936387e2cf4c433752dc46ba6bb1',
      bucket: 'public',
      object: [Object],
      action: 'DeleteObject',
      eventTime: '2024-10-18T03:43:18.584Z'
    },
    timestamp: '2024-10-18T03:43:18.684Z',
    id: '77fe1789f6b18847cebd0ee0657cf3fa'
  },
  {
    attempts: 1,
    body: {
      account: '174f936387e2cf4c433752dc46ba6bb1',
      bucket: 'public',
      object: [Object],
      action: 'DeleteObject',
      eventTime: '2024-10-18T03:43:27.595Z'
    },
    timestamp: '2024-10-18T03:43:28.084Z',
    id: '239a1acf2f969dab990dc0c8d9aedd55'
  }
]
  */


/*
export default {
	async queue(batch, env): Promise<void> {
	  let messages = JSON.stringify(batch.messages);
	  console.log(`consumed from our queue: ${messages}`);

	  console.log(batch.messages);
	},
  } satisfies ExportedHandler<Env>;
*/