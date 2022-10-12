// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = "ap-southeast-2"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const client = new DynamoDBClient({ region: REGION });
export { client };

