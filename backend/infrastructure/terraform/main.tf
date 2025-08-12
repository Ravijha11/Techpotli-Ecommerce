# =============================================================================
# TechPotli Backend Infrastructure - Main Configuration
# AWS infrastructure for production e-commerce platform
# =============================================================================

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    bucket         = "techpotli-terraform-state"
    key            = "backend/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "techpotli-terraform-locks"
  }
}

# Configure AWS Provider
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "TechPotli"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "techpotli-engineering-team"
    }
  }
}

# Configure Kubernetes Provider
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.cluster.token

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

# Configure Helm Provider
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.cluster.token

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}

# Data sources
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}

# VPC and Networking
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "techpotli-vpc"
  cidr = var.vpc_cidr

  azs             = var.availability_zones
  private_subnets = var.private_subnet_cidrs
  public_subnets  = var.public_subnet_cidrs

  enable_nat_gateway     = true
  single_nat_gateway     = false
  one_nat_gateway_per_az = true
  enable_vpn_gateway     = false

  enable_dns_hostnames = true
  enable_dns_support   = true

  # VPC Flow Logs
  enable_flow_log                      = true
  create_flow_log_cloudwatch_log_group = true
  create_flow_log_cloudwatch_iam_role  = true

  # Tags for EKS
  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }
}

# EKS Cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name                   = var.cluster_name
  cluster_version               = var.cluster_version
  cluster_endpoint_public_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # EKS Cluster Security Group
  cluster_security_group_additional_rules = {
    ingress_nodes_443 = {
      description                = "Node groups to cluster API"
      protocol                  = "tcp"
      from_port                 = 443
      to_port                   = 443
      type                      = "ingress"
      source_node_security_group = true
    }
  }

  # EKS Node Groups
  eks_managed_node_groups = {
    # Backend nodes
    backend = {
      name = "backend-node-group"

      instance_types = var.backend_instance_types
      capacity_type  = "ON_DEMAND"

      min_size     = var.backend_min_size
      max_size     = var.backend_max_size
      desired_size = var.backend_desired_size

      disk_size = 100

      labels = {
        node-role = "backend"
      }

      taints = [
        {
          key    = "node-role"
          value  = "backend"
          effect = "NO_SCHEDULE"
        }
      ]

      tags = {
        ExtraTag = "backend-nodes"
      }
    }

    # Worker nodes
    worker = {
      name = "worker-node-group"

      instance_types = var.worker_instance_types
      capacity_type  = "ON_DEMAND"

      min_size     = var.worker_min_size
      max_size     = var.worker_max_size
      desired_size = var.worker_desired_size

      disk_size = 100

      labels = {
        node-role = "worker"
      }

      tags = {
        ExtraTag = "worker-nodes"
      }
    }
  }

  # Cluster Security Group
  cluster_security_group_name = "techpotli-cluster-sg"
  cluster_security_group_use_name_prefix = "techpotli-cluster-sg-"

  # Node Security Group
  node_security_group_name = "techpotli-node-sg"
  node_security_group_use_name_prefix = "techpotli-node-sg-"

  # Cluster IAM Role
  create_iam_role = true
  iam_role_name   = "techpotli-cluster-role"
  iam_role_use_name_prefix = "techpotli-cluster-role-"

  # Node IAM Role
  create_node_iam_role = true
  node_iam_role_name   = "techpotli-node-role"
  node_iam_role_use_name_prefix = "techpotli-node-role-"

  # Tags
  tags = {
    Environment = var.environment
    Project     = "TechPotli"
  }
}

# RDS MySQL Primary
module "rds_primary" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "techpotli-mysql-primary"

  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = var.rds_instance_class
  allocated_storage    = var.rds_allocated_storage
  max_allocated_storage = var.rds_max_allocated_storage

  db_name  = var.database_name
  username = var.database_username
  port     = "3306"

  vpc_security_group_ids = [aws_security_group.rds.id]
  subnet_ids             = module.vpc.private_subnets

  # Backup
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  # Performance Insights
  create_monitoring_role = true
  monitoring_interval   = 60

  # Enhanced Monitoring
  create_monitoring_role = true
  monitoring_interval   = 60

  # Deletion Protection
  deletion_protection = var.environment == "production"

  # Multi-AZ
  multi_az = var.environment == "production"

  # Storage Encryption
  storage_encrypted = true

  # Parameter Group
  create_db_parameter_group = true
  parameter_group_name      = "techpotli-mysql-8-0"
  parameter_group_family    = "mysql8.0"

  parameters = [
    {
      name  = "innodb_buffer_pool_size"
      value = "{DBInstanceClassMemory*3/4}"
    },
    {
      name  = "innodb_log_file_size"
      value = "268435456"
    },
    {
      name  = "innodb_log_buffer_size"
      value = "67108864"
    },
    {
      name  = "innodb_flush_log_at_trx_commit"
      value = "2"
    },
    {
      name  = "innodb_file_per_table"
      value = "1"
    },
    {
      name  = "innodb_open_files"
      value = "4000"
    },
    {
      name  = "innodb_io_capacity"
      value = "2000"
    },
    {
      name  = "innodb_io_capacity_max"
      value = "4000"
    },
    {
      name  = "innodb_read_io_threads"
      value = "8"
    },
    {
      name  = "innodb_write_io_threads"
      value = "8"
    },
    {
      name  = "innodb_thread_concurrency"
      value = "0"
    },
    {
      name  = "innodb_adaptive_hash_index"
      value = "1"
    },
    {
      name  = "innodb_change_buffering"
      value = "all"
    },
    {
      name  = "innodb_autoinc_lock_mode"
      value = "2"
    },
    {
      name  = "max_connections"
      value = "1000"
    },
    {
      name  = "table_open_cache"
      value = "4000"
    },
    {
      name  = "table_definition_cache"
      value = "2000"
    },
    {
      name  = "open_files_limit"
      value = "65535"
    },
    {
      name  = "query_cache_type"
      value = "0"
    },
    {
      name  = "query_cache_size"
      value = "0"
    },
    {
      name  = "tmp_table_size"
      value = "67108864"
    },
    {
      name  = "max_heap_table_size"
      value = "67108864"
    },
    {
      name  = "sort_buffer_size"
      value = "4194304"
    },
    {
      name  = "read_buffer_size"
      value = "2097152"
    },
    {
      name  = "read_rnd_buffer_size"
      value = "8388608"
    },
    {
      name  = "key_buffer_size"
      value = "33554432"
    },
    {
      name  = "bulk_insert_buffer_size"
      value = "67108864"
    }
  ]

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "Database"
  }
}

# RDS MySQL Read Replicas
module "rds_read_replicas" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  for_each = var.read_replica_configs

  identifier = "techpotli-mysql-replica-${each.key}"

  # Source
  source_db_instance_identifier = module.rds_primary.db_instance_id
  replicate_source_db          = module.rds_primary.db_instance_id

  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = each.value.instance_class
  allocated_storage    = each.value.allocated_storage
  max_allocated_storage = each.value.max_allocated_storage

  port = "3306"

  vpc_security_group_ids = [aws_security_group.rds.id]
  subnet_ids             = module.vpc.private_subnets

  # Backup
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  # Performance Insights
  create_monitoring_role = true
  monitoring_interval   = 60

  # Enhanced Monitoring
  create_monitoring_role = true
  monitoring_interval   = 60

  # Deletion Protection
  deletion_protection = var.environment == "production"

  # Storage Encryption
  storage_encrypted = true

  # Parameter Group
  create_db_parameter_group = true
  parameter_group_name      = "techpotli-mysql-replica-${each.key}"
  parameter_group_family    = "mysql8.0"

  parameters = [
    {
      name  = "innodb_buffer_pool_size"
      value = "{DBInstanceClassMemory*3/4}"
    },
    {
      name  = "innodb_log_file_size"
      value = "268435456"
    },
    {
      name  = "innodb_log_buffer_size"
      value = "67108864"
    },
    {
      name  = "innodb_flush_log_at_trx_commit"
      value = "2"
    },
    {
      name  = "innodb_file_per_table"
      value = "1"
    },
    {
      name  = "innodb_open_files"
      value = "4000"
    },
    {
      name  = "innodb_io_capacity"
      value = "2000"
    },
    {
      name  = "innodb_io_capacity_max"
      value = "4000"
    },
    {
      name  = "innodb_read_io_threads"
      value = "8"
    },
    {
      name  = "innodb_write_io_threads"
      value = "8"
    },
    {
      name  = "innodb_thread_concurrency"
      value = "0"
    },
    {
      name  = "innodb_adaptive_hash_index"
      value = "1"
    },
    {
      name  = "innodb_change_buffering"
      value = "all"
    },
    {
      name  = "innodb_autoinc_lock_mode"
      value = "2"
    },
    {
      name  = "max_connections"
      value = "1000"
    },
    {
      name  = "table_open_cache"
      value = "4000"
    },
    {
      name  = "table_definition_cache"
      value = "2000"
    },
    {
      name  = "open_files_limit"
      value = "65535"
    },
    {
      name  = "query_cache_type"
      value = "0"
    },
    {
      name  = "query_cache_size"
      value = "0"
    },
    {
      name  = "tmp_table_size"
      value = "67108864"
    },
    {
      name  = "max_heap_table_size"
      value = "67108864"
    },
    {
      name  = "sort_buffer_size"
      value = "4194304"
    },
    {
      name  = "read_buffer_size"
      value = "2097152"
    },
    {
      name  = "read_rnd_buffer_size"
      value = "8388608"
    },
    {
      name  = "key_buffer_size"
      value = "33554432"
    },
    {
      name  = "bulk_insert_buffer_size"
      value = "67108864"
    }
  ]

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "Database-ReadReplica"
    Replica     = each.key
  }
}

# ElastiCache Redis Cluster
module "elasticache_redis" {
  source  = "terraform-aws-modules/elasticache/aws"
  version = "~> 1.0"

  # Redis cluster
  cluster_id           = "techpotli-redis"
  engine               = "redis"
  node_type            = var.redis_node_type
  num_cache_nodes      = var.redis_num_cache_nodes
  parameter_group_name = "default.redis7"

  port = 6379

  subnet_ids              = module.vpc.private_subnets
  vpc_security_group_ids = [aws_security_group.elasticache.id]

  # Multi-AZ
  multi_az_enabled = var.environment == "production"

  # Automatic Failover
  automatic_failover_enabled = var.environment == "production"

  # Backup
  snapshot_retention_limit = 7
  snapshot_window          = "03:00-04:00"
  maintenance_window       = "sun:04:00-sun:05:00"

  # Encryption
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true

  # Parameter Group
  create_parameter_group = true
  parameter_group_family = "redis7"

  parameters = [
    {
      name  = "maxmemory-policy"
      value = "allkeys-lru"
    },
    {
      name  = "save"
      value = "900 1 300 10 60 10000"
    },
    {
      name  = "tcp-keepalive"
      value = "300"
    },
    {
      name  = "timeout"
      value = "0"
    },
    {
      name  = "tcp-backlog"
      value = "511"
    },
    {
      name  = "databases"
      value = "16"
    },
    {
      name  = "maxclients"
      value = "10000"
    },
    {
      name  = "maxmemory-samples"
      value = "5"
    },
    {
      name  = "repl-ping-slave-period"
      value = "10"
    },
    {
      name  = "repl-timeout"
      value = "60"
    },
    {
      name  = "repl-backlog-size"
      value = "1048576"
    },
    {
      name  = "repl-backlog-ttl"
      value = "3600"
    },
    {
      name  = "repl-diskless-sync"
      value = "no"
    },
    {
      name  = "repl-diskless-sync-delay"
      value = "5"
    },
    {
      name  = "repl-disable-tcp-nodelay"
      value = "no"
    },
    {
      name  = "repl-ping-slave-period"
      value = "10"
    },
    {
      name  = "repl-timeout"
      value = "60"
    },
    {
      name  = "repl-backlog-size"
      value = "1048576"
    },
    {
      name  = "repl-backlog-ttl"
      value = "3600"
    },
    {
      name  = "repl-diskless-sync"
      value = "no"
    },
    {
      name  = "repl-diskless-sync-delay"
      value = "5"
    },
    {
      name  = "repl-disable-tcp-nodelay"
      value = "no"
    }
  ]

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "Cache"
  }
}

# MSK Kafka Cluster
module "msk_kafka" {
  source  = "terraform-aws-modules/msk-kafka-cluster/aws"
  version = "~> 1.0"

  cluster_name = "techpotli-kafka"

  kafka_version = "3.5.1"
  number_of_broker_nodes = var.kafka_number_of_broker_nodes

  broker_node_group_info = {
    instance_type   = var.kafka_instance_type
    ebs_storage_info = {
      volume_size = var.kafka_ebs_volume_size
    }
    client_subnets  = module.vpc.private_subnets
    security_groups = [aws_security_group.msk.id]
  }

  # Encryption
  encryption_in_transit = {
    client_broker = "TLS"
    in_cluster    = true
  }

  encryption_at_rest_kms_key_arn = aws_kms_key.msk.arn

  # Logging
  logging_info = {
    broker_logs = {
      cloudwatch_logs = {
        enabled   = true
        log_group = aws_cloudwatch_log_group.kafka_broker_logs.name
      }
      firehose = {
        enabled = false
      }
      s3 = {
        enabled = false
      }
    }
  }

  # Configuration
  configuration_info = {
    arn      = aws_msk_configuration.kafka.arn
    revision = aws_msk_configuration.kafka.latest_revision
  }

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "MessageQueue"
  }
}

# S3 Buckets
resource "aws_s3_bucket" "techpotli_storage" {
  bucket = "techpotli-storage-${var.environment}-${random_string.bucket_suffix.result}"

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "Storage"
  }
}

resource "aws_s3_bucket" "techpotli_logs" {
  bucket = "techpotli-logs-${var.environment}-${random_string.bucket_suffix.result}"

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "Logs"
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "techpotli_cdn" {
  enabled             = true
  is_ipv6_enabled    = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  origin {
    domain_name = aws_s3_bucket.techpotli_storage.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.techpotli_storage.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.techpotli_oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.techpotli_storage.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior for images
  ordered_cache_behavior {
    path_pattern     = "/images/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.techpotli_storage.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  # Cache behavior for static assets
  ordered_cache_behavior {
    path_pattern     = "/static/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.techpotli_storage.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  # Cache behavior for API responses
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.techpotli_storage.id}"

    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 3600
  }

  # Error pages
  custom_error_response {
    error_code         = 404
    response_code      = "200"
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 403
    response_code      = "200"
    response_page_path = "/index.html"
  }

  # Viewer certificate
  viewer_certificate {
    cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1.2_2021"
  }

  # Restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "CDN"
  }
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "techpotli_oai" {
  comment = "TechPotli CloudFront OAI"
}

# S3 Bucket Policy for CloudFront
resource "aws_s3_bucket_policy" "techpotli_storage_policy" {
  bucket = aws_s3_bucket.techpotli_storage.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "CloudFrontAccess"
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.techpotli_oai.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.techpotli_storage.arn}/*"
      }
    ]
  })
}

# S3 Bucket Versioning
resource "aws_s3_bucket_versioning" "techpotli_storage_versioning" {
  bucket = aws_s3_bucket.techpotli_storage.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "techpotli_logs_versioning" {
  bucket = aws_s3_bucket.techpotli_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket Lifecycle
resource "aws_s3_bucket_lifecycle_configuration" "techpotli_storage_lifecycle" {
  bucket = aws_s3_bucket.techpotli_storage.id

  rule {
    id     = "transition_to_ia"
    status = "Enabled"

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 90
      storage_class = "GLACIER"
    }

    transition {
      days          = 365
      storage_class = "DEEP_ARCHIVE"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "techpotli_logs_lifecycle" {
  bucket = aws_s3_bucket.techpotli_logs.id

  rule {
    id     = "delete_old_logs"
    status = "Enabled"

    expiration {
      days = 90
    }
  }
}

# S3 Bucket Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "techpotli_storage_encryption" {
  bucket = aws_s3_bucket.techpotli_storage.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "techpotli_logs_encryption" {
  bucket = aws_s3_bucket.techpotli_logs.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# S3 Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "techpotli_storage_public_access_block" {
  bucket = aws_s3_bucket.techpotli_storage.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_public_access_block" "techpotli_logs_public_access_block" {
  bucket = aws_s3_bucket.techpotli_logs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# KMS Key for MSK
resource "aws_kms_key" "msk" {
  description             = "KMS key for MSK Kafka cluster"
  deletion_window_in_days = 7
  enable_key_rotation     = true

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "KMS"
  }
}

# MSK Configuration
resource "aws_msk_configuration" "kafka" {
  kafka_versions = ["3.5.1"]
  name           = "techpotli-kafka-config"

  server_properties = <<PROPERTIES
# Broker settings
broker.id=0
listeners=PLAINTEXT://:9092,INTERNAL://:9093
advertised.listeners=PLAINTEXT://:9092,INTERNAL://:9093
inter.broker.listener.name=INTERNAL

# Log settings
log.dirs=/tmp/kafka-logs
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000

# Zookeeper settings
zookeeper.connect=localhost:2181
zookeeper.connection.timeout.ms=18000

# Replication settings
default.replication.factor=3
min.insync.replicas=2

# Performance settings
num.network.threads=3
num.io.threads=8
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600

# Producer settings
producer.compression.type=snappy
producer.batch.size=16384
producer.linger.ms=5
producer.buffer.memory=33554432

# Consumer settings
consumer.fetch.min.bytes=1
consumer.fetch.max.wait.ms=500
consumer.max.partition.fetch.bytes=1048576

# Topic settings
num.partitions=3
default.replication.factor=3
min.insync.replicas=2

# Security settings
security.inter.broker.protocol=PLAINTEXT
sasl.enabled.mechanisms=PLAIN
sasl.mechanism.inter.broker.protocol=PLAIN
PROPERTIES

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "MSK"
  }
}

# CloudWatch Log Group for Kafka
resource "aws_cloudwatch_log_group" "kafka_broker_logs" {
  name              = "/aws/msk/techpotli-kafka/broker-logs"
  retention_in_days = 7

  tags = {
    Environment = var.environment
    Project     = "TechPotli"
    Component   = "Logs"
  }
}

# Random string for bucket names
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}
