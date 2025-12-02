import os
from azure.cosmos import CosmosClient, PartitionKey, exceptions
from dotenv import load_dotenv

load_dotenv()

COSMOS_URI = os.getenv("COSMOS_URI", "https://your-account.documents.azure.com:443/")
COSMOS_KEY = os.getenv("COSMOS_KEY", "your-cosmos-db-key")
DATABASE_NAME = os.getenv("DATABASE_NAME", "rungta")
CONTAINER_NAME = os.getenv("CONTAINER_NAME", "student")

def connect_cosmos():
    try:
        # Create client
        client = CosmosClient(COSMOS_URI, credential=COSMOS_KEY)
        print("✔ Connected to Cosmos DB")

        # Create database if not exists
        database = client.create_database_if_not_exists(id=DATABASE_NAME)

        # Create container if not exists (serverless account - no throughput needed)
        container = database.create_container_if_not_exists(
            id=CONTAINER_NAME,
            partition_key=PartitionKey(path="/branch")
        )

        print("✔ Database & container ready")
        return container

    except exceptions.CosmosHttpResponseError as e:
        print("❌ Error connecting to Cosmos DB:", e)


if __name__ == "__main__":
    container = connect_cosmos()
