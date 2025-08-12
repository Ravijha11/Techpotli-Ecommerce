# Terraform variables for TechPotli E-commerce Platform Infrastructure
# This file defines all input variables used across the Terraform configuration

# Global Configuration
variable "project_name" {
  description = "Name of the project (used for resource naming)"
  type        = string
  default     = "techpotli"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod"
  }
}

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "aws_availability_zones" {
  description = "List of availability zones to use"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

# VPC Configuration
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_enable_dns_hostnames" {
  description = "Enable DNS hostnames in the VPC"
  type        = bool
  default     = true
}

variable "vpc_enable_dns_support" {
  description = "Enable DNS support in the VPC"
  type        = bool
  default     = true
}

# Subnet Configuration
variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]
}

variable "database_subnet_cidrs" {
  description = "CIDR blocks for database subnets"
  type        = list(string)
  default     = ["10.0.20.0/24", "10.0.21.0/24", "10.0.22.0/24"]
}

variable "cache_subnet_cidrs" {
  description = "CIDR blocks for cache subnets"
  type        = list(string)
  default     = ["10.0.30.0/24", "10.0.31.0/24", "10.0.32.0/24"]
}

# EKS Configuration
variable "eks_cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "techpotli-eks"
}

variable "eks_cluster_version" {
  description = "Kubernetes version for the EKS cluster"
  type        = string
  default     = "1.28"
}

variable "eks_node_groups" {
  description = "EKS node group configurations"
  type = map(object({
    instance_types = list(string)
    capacity_type  = string
    min_size       = number
    max_size       = number
    desired_size   = number
    disk_size      = number
    labels         = map(string)
    taints        = list(object({
      key    = string
      value  = string
      effect = string
    }))
  }))
  default = {
    backend = {
      instance_types = ["t3.medium", "t3.large"]
      capacity_type  = "ON_DEMAND"
      min_size       = 1
      max_size       = 3
      desired_size   = 2
      disk_size      = 50
      labels = {
        "node.kubernetes.io/role" = "backend"
        "environment"             = "production"
      }
      taints = []
    }
    worker = {
      instance_types = ["t3.large", "t3.xlarge"]
      capacity_type  = "ON_DEMAND"
      min_size       = 2
      max_size       = 5
      desired_size   = 3
      disk_size      = 100
      labels = {
        "node.kubernetes.io/role" = "worker"
        "environment"             = "production"
      }
      taints = []
    }
  }
}

# RDS Configuration
variable "rds_instance_class" {
  description = "RDS instance class for the primary database"
  type        = string
  default     = "db.t3.medium"
}

variable "rds_read_replica_instance_class" {
  description = "RDS instance class for read replicas"
  type        = string
  default     = "db.t3.medium"
}

variable "rds_allocated_storage" {
  description = "Allocated storage for RDS instances in GB"
  type        = number
  default     = 100
}

variable "rds_max_allocated_storage" {
  description = "Maximum allocated storage for RDS instances in GB"
  type        = number
  default     = 1000
}

variable "rds_storage_type" {
  description = "Storage type for RDS instances"
  type        = string
  default     = "gp3"
  
  validation {
    condition     = contains(["gp2", "gp3", "io1"], var.rds_storage_type)
    error_message = "Storage type must be one of: gp2, gp3, io1"
  }
}

variable "rds_storage_encrypted" {
  description = "Enable storage encryption for RDS instances"
  type        = bool
  default     = true
}

variable "rds_backup_retention_period" {
  description = "Backup retention period in days"
  type        = number
  default     = 7
}

variable "rds_backup_window" {
  description = "Backup window for RDS instances"
  type        = string
  default     = "03:00-04:00"
}

variable "rds_maintenance_window" {
  description = "Maintenance window for RDS instances"
  type        = string
  default     = "sun:04:00-sun:05:00"
}

variable "rds_multi_az" {
  description = "Enable multi-AZ deployment for RDS"
  type        = bool
  default     = true
}

variable "rds_deletion_protection" {
  description = "Enable deletion protection for RDS instances"
  type        = bool
  default     = true
}

variable "rds_skip_final_snapshot" {
  description = "Skip final snapshot when deleting RDS instances"
  type        = bool
  default     = false
}

variable "rds_engine_version" {
  description = "MySQL engine version for RDS"
  type        = string
  default     = "8.0.35"
}

variable "rds_parameter_group_family" {
  description = "Parameter group family for RDS"
  type        = string
  default     = "mysql8.0"
}

# ElastiCache Configuration
variable "elasticache_node_type" {
  description = "ElastiCache node type"
  type        = string
  default     = "cache.t3.medium"
}

variable "elasticache_num_cache_nodes" {
  description = "Number of cache nodes in the cluster"
  type        = number
  default     = 3
}

variable "elasticache_parameter_group_family" {
  description = "Parameter group family for ElastiCache"
  type        = string
  default     = "redis7"
}

variable "elasticache_engine_version" {
  description = "Redis engine version for ElastiCache"
  type        = string
  default     = "7.0"
}

variable "elasticache_port" {
  description = "Port for ElastiCache Redis"
  type        = number
  default     = 6379
}

variable "elasticache_automatic_failover_enabled" {
  description = "Enable automatic failover for ElastiCache"
  type        = bool
  default     = true
}

variable "elasticache_multi_az_enabled" {
  description = "Enable multi-AZ for ElastiCache"
  type        = bool
  default     = true
}

variable "elasticache_at_rest_encryption_enabled" {
  description = "Enable at-rest encryption for ElastiCache"
  type        = bool
  default     = true
}

variable "elasticache_transit_encryption_enabled" {
  description = "Enable transit encryption for ElastiCache"
  type        = bool
  default     = true
}

# MSK Configuration
variable "msk_instance_type" {
  description = "MSK broker instance type"
  type        = string
  default     = "kafka.t3.small"
}

variable "msk_kafka_version" {
  description = "Kafka version for MSK cluster"
  type        = string
  default     = "3.4.0"
}

variable "msk_number_of_broker_nodes" {
  description = "Number of broker nodes in MSK cluster"
  type        = number
  default     = 3
}

variable "msk_ebs_volume_size" {
  description = "EBS volume size for MSK brokers in GB"
  type        = number
  default     = 100
}

variable "msk_encryption_in_transit" {
  description = "Enable encryption in transit for MSK"
  type        = bool
  default     = true
}

variable "msk_encryption_at_rest" {
  description = "Enable encryption at rest for MSK"
  type        = bool
  default     = true
}

variable "msk_client_broker" {
  description = "Client broker encryption setting for MSK"
  type        = string
  default     = "TLS"
  
  validation {
    condition     = contains(["TLS", "TLS_PLAINTEXT", "PLAINTEXT"], var.msk_client_broker)
    error_message = "Client broker must be one of: TLS, TLS_PLAINTEXT, PLAINTEXT"
  }
}

# S3 Configuration
variable "s3_bucket_versioning" {
  description = "Enable versioning for S3 buckets"
  type        = bool
  default     = true
}

variable "s3_bucket_encryption" {
  description = "Enable encryption for S3 buckets"
  type        = bool
  default     = true
}

variable "s3_bucket_lifecycle_rules" {
  description = "Lifecycle rules for S3 buckets"
  type = list(object({
    id      = string
    enabled = bool
    transitions = list(object({
      days          = number
      storage_class = string
    }))
    expiration = object({
      days = number
    })
  }))
  default = [
    {
      id      = "log-rotation"
      enabled = true
      transitions = [
        {
          days          = 30
          storage_class = "STANDARD_IA"
        },
        {
          days          = 90
          storage_class = "GLACIER"
        },
        {
          days          = 365
          storage_class = "DEEP_ARCHIVE"
        }
      ]
      expiration = {
        days = 2555
      }
    }
  ]
}

# CloudFront Configuration
variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  
  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.cloudfront_price_class)
    error_message = "Price class must be one of: PriceClass_100, PriceClass_200, PriceClass_All"
  }
}

variable "cloudfront_default_root_object" {
  description = "Default root object for CloudFront distribution"
  type        = string
  default     = "index.html"
}

variable "cloudfront_error_pages" {
  description = "Custom error pages for CloudFront"
  type = list(object({
    error_code         = number
    response_code      = string
    response_page_path = string
  }))
  default = [
    {
      error_code         = 404
      response_code      = "200"
      response_page_path = "/index.html"
    },
    {
      error_code         = 403
      response_code      = "200"
      response_page_path = "/index.html"
    }
  ]
}

# Tags
variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "TechPotli"
    Environment = "dev"
    ManagedBy   = "Terraform"
    Owner       = "DevOps Team"
  }
}

# Monitoring Configuration
variable "enable_cloudwatch_logs" {
  description = "Enable CloudWatch logs for services"
  type        = bool
  default     = true
}

variable "enable_cloudwatch_alarms" {
  description = "Enable CloudWatch alarms for monitoring"
  type        = bool
  default     = true
}

variable "cloudwatch_log_retention_days" {
  description = "CloudWatch log retention period in days"
  type        = number
  default     = 30
}

# Security Configuration
variable "enable_vpc_flow_logs" {
  description = "Enable VPC Flow Logs"
  type        = bool
  default     = true
}

variable "vpc_flow_log_retention_days" {
  description = "VPC Flow Log retention period in days"
  type        = number
  default     = 30
}

variable "enable_guardduty" {
  description = "Enable AWS GuardDuty for threat detection"
  type        = bool
  default     = true
}

variable "enable_config" {
  description = "Enable AWS Config for compliance monitoring"
  type        = bool
  default     = true
}

# Cost Optimization
variable "enable_savings_plans" {
  description = "Enable AWS Savings Plans for cost optimization"
  type        = bool
  default     = false
}

variable "enable_spot_instances" {
  description = "Enable spot instances for cost optimization (dev/staging only)"
  type        = bool
  default     = false
}

# Backup Configuration
variable "enable_aws_backup" {
  description = "Enable AWS Backup for centralized backup management"
  type        = bool
  default     = true
}

variable "backup_retention_days" {
  description = "Backup retention period in days"
  type        = number
  default     = 30
}

# Network Configuration
variable "enable_nat_gateway" {
  description = "Enable NAT Gateway for private subnets"
  type        = bool
  default     = true
}

variable "enable_vpn_gateway" {
  description = "Enable VPN Gateway for secure access"
  type        = bool
  default     = false
}

variable "vpn_cidr_blocks" {
  description = "CIDR blocks for VPN access"
  type        = list(string)
  default     = ["10.0.100.0/24"]
}

# Scaling Configuration
variable "enable_autoscaling" {
  description = "Enable autoscaling for EKS node groups"
  type        = bool
  default     = true
}

variable "autoscaling_cooldown" {
  description = "Autoscaling cooldown period in seconds"
  type        = number
  default     = 300
}

variable "autoscaling_scale_up_threshold" {
  description = "CPU threshold for scaling up (percentage)"
  type        = number
  default     = 70
}

variable "autoscaling_scale_down_threshold" {
  description = "CPU threshold for scaling down (percentage)"
  type        = number
  default     = 30
}
