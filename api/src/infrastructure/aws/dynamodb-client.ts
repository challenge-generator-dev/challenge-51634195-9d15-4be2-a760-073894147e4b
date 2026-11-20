import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDBClientService {
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'default',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'default'
      }
    });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async putItem(tableName: string, item: any): Promise<void> {
    const command = new PutCommand({
      TableName: tableName,
      Item: item
    });
    await this.docClient.send(command);
  }

  async getItem(tableName: string, key: Record<string, any>): Promise<any> {
    const command = new GetCommand({
      TableName: tableName,
      Key: key
    });
    const response = await this.docClient.send(command);
    return response.Item;
  }

  async updateItem(tableName: string, key: Record<string, any>, updateExpression: string, expressionAttributeValues: Record<string, any>): Promise<any> {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });
    const response = await this.docClient.send(command);
    return response.Attributes;
  }

  async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: key
    });
    await this.docClient.send(command);
  }

  async scanItems(tableName: string): Promise<any[]> {
    const command = new ScanCommand({
      TableName: tableName
    });
    const response = await this.docClient.send(command);
    return response.Items || [];
  }
}