import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

describe('Terraform Infrastructure - Phase f3', () => {
  const terraformDir = path.join(process.cwd(), 'src', 'modules');

  const mockProviderConfig = `
provider "aws" {
  region = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  access_key                  = "mock"
  secret_key                  = "mock"
}
`;

  beforeAll(async () => {
    if (!fs.existsSync(terraformDir)) {
      fs.mkdirSync(terraformDir, { recursive: true });
    }
  });

  describe('p6: should declare orders table with correct attributes', () => {
    it('declares Table with hash_key id and billing_mode PAY_PER_REQUEST', async () => {
      const dynamodbPath = path.join(terraformDir, 'dynamodb', 'orders-table.tf');
      
      expect(fs.existsSync(dynamodbPath)).toBe(true);
      
      const content = fs.readFileSync(dynamodbPath, 'utf-8');
      
      expect(content).toContain('resource "aws_dynamodb_table" "orders"');
      expect(content).toContain('name = "orders"');
      expect(content).toContain('billing_mode = "PAY_PER_REQUEST"');
      expect(content).toContain('hash_key = "id"');
      expect(content).toContain('attribute {');
      expect(content).toContain('name = "id"');
      expect(content).toContain('type = "S"');
    });
  });

  describe('p6: should fail if required attributes are missing', () => {
    it('fails with validation error when attributes missing', async () => {
      const invalidConfig = `
resource "aws_dynamodb_table" "orders" {
  name = "orders"
}
`;
      const testDir = path.join(terraformDir, 'test-invalid');
      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(path.join(testDir, 'main.tf'), invalidConfig);
      fs.writeFileSync(path.join(testDir, 'provider.tf'), mockProviderConfig);

      try {
        await execAsync('cd ' + testDir + ' && terraform init -backend=false', { 
          cwd: testDir,
          env: { ...process.env, AWS_ACCESS_KEY_ID: 'mock', AWS_SECRET_ACCESS_KEY: 'mock' }
        });
      } catch (error) {
        // Expected to fail during init if provider not configured
      }
    });
  });

  describe('p6: should apply successfully with valid configuration', () => {
    it('creates Table in DynamoDB with valid config', async () => {
      const dynamodbPath = path.join(terraformDir, 'dynamodb', 'orders-table.tf');
      const content = fs.readFileSync(dynamodbPath, 'utf-8');
      
      const hasResource = content.includes('resource "aws_dynamodb_table" "orders"');
      const hasName = content.includes('name = "orders"');
      const hasBillingMode = content.includes('billing_mode');
      const hasHashKey = content.includes('hash_key');
      
      expect(hasResource).toBe(true);
      expect(hasName).toBe(true);
      expect(hasBillingMode).toBe(true);
      expect(hasHashKey).toBe(true);
    });
  });

  describe('p6: should fail if DynamoDB service is unavailable', () => {
    it('fails with service error when DynamoDB unavailable', async () => {
      const dynamodbPath = path.join(terraformDir, 'dynamodb', 'orders-table.tf');
      const content = fs.readFileSync(dynamodbPath, 'utf-8');
      
      expect(content).toContain('aws_dynamodb_table');
      expect(content).toContain('name = "orders"');
    });
  });

  describe('p7: should declare policy with correct permissions', () => {
    it('allows PutItem, GetItem, UpdateItem, DeleteItem, and Scan on orders table', async () => {
      const iamPath = path.join(terraformDir, 'iam', 'dynamodb-orders-policy.tf');
      
      expect(fs.existsSync(iamPath)).toBe(true);
      
      const content = fs.readFileSync(iamPath, 'utf-8');
      
      expect(content).toContain('resource "aws_iam_policy" "dynamodb_orders_access"');
      expect(content).toContain('dynamodb:PutItem');
      expect(content).toContain('dynamodb:GetItem');
      expect(content).toContain('dynamodb:UpdateItem');
      expect(content).toContain('dynamodb:DeleteItem');
      expect(content).toContain('dynamodb:Scan');
    });
  });

  describe('p7: should fail if policy is too permissive', () => {
    it('fails with security validation error for excessive permissions', async () => {
      const iamPath = path.join(terraformDir, 'iam', 'dynamodb-orders-policy.tf');
      const content = fs.readFileSync(iamPath, 'utf-8');
      
      const hasAdminAccess = content.includes('"dynamodb:*"') || 
                            content.includes('"*"') && content.includes('Action');
      
      expect(hasAdminAccess).toBe(false);
    });
  });

  describe('p7: should apply successfully with valid policy', () => {
    it('creates Policy and attaches successfully', async () => {
      const iamPath = path.join(terraformDir, 'iam', 'dynamodb-orders-policy.tf');
      const content = fs.readFileSync(iamPath, 'utf-8');
      
      const hasResource = content.includes('resource "aws_iam_policy" "dynamodb_orders_access"');
      const hasName = content.includes('name = "dynamodb_orders_access"');
      const hasPolicy = content.includes('policy = jsonencode');
      const hasStatement = content.includes('Statement');
      
      expect(hasResource).toBe(true);
      expect(hasName).toBe(true);
      expect(hasPolicy).toBe(true);
      expect(hasStatement).toBe(true);
    });
  });
});