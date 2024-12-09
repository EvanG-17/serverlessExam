import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";


const dynamoDbClient = createDynamoDbClient();

const { MOVIE_AWARDS_TABLE_NAME } = process.env;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    console.log("Event: ", JSON.stringify(event));

    
    const parameters = event?.pathParameters;
    const movieId = parameters?.movieId ? parseInt(parameters.movieId, 10) : undefined;
    const awardBody = parameters?.awardBody;

    if (!movieId || !awardBody) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Message: "Missing movieId or awardBody" }),
      };
    }

    
    const getCommandOutput = await dynamoDbClient.send(
      new GetCommand({
        TableName: MOVIE_AWARDS_TABLE_NAME!,
        Key: {
          movieId: movieId,
          awardBody: awardBody,
        },
      })
    );

    if (!getCommandOutput.Item) {
      return {
        statusCode: 404,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Message: "Award details not found" }),
      };
    }

    // Return Response
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(getCommandOutput.Item),
    };
  } catch (error: any) {
    console.error(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error }),
    };
  }
};


function createDynamoDbClient() {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  };
  const unmarshallOptions = {
    wrapNumbers: false,
  };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}
