# Terraform outputs for TechPotli E-commerce Platform Infrastructure
# This file defines all output values that will be displayed after successful deployment

# VPC Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

output "vpc_arn" {
  description = "ARN of the VPC"
  value       = module.vpc.vpc_arn
}

# Subnet Outputs
output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = module.vpc.public_subnets
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = module.vpc.private_subnets
}

output "database_subnet_ids" {
  description = "IDs of the database subnets"
  value       = module.vpc.database_subnets
}

output "cache_subnet_ids" {
  description = "IDs of the cache subnets"
  value       = module.vpc.cache_subnets
}

# EKS Outputs
output "eks_cluster_id" {
  description = "ID of the EKS cluster"
  value       = module.eks.cluster_id
}

output "eks_cluster_arn" {
  description = "ARN of the EKS cluster"
  value       = module.eks.cluster_arn
}

output "eks_cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_version" {
  description = "Kubernetes version of the EKS cluster"
  value       = module.eks.cluster_version
}

output "eks_cluster_certificate_authority_data" {
  description = "Base64 encoded certificate data required to communicate with the cluster"
  value       = module.eks.cluster_certificate_authority_data
}

output "eks_node_groups" {
  description = "Map of EKS node groups"
  value       = module.eks.node_groups
}

output "eks_node_groups_autoscaling_groups" {
  description = "Map of EKS node groups autoscaling groups"
  value       = module.eks.node_groups_autoscaling_groups
}

# RDS Outputs
output "rds_cluster_id" {
  description = "ID of the RDS cluster"
  value       = module.rds.cluster_id
}

output "rds_cluster_arn" {
  description = "ARN of the RDS cluster"
  value       = module.rds.cluster_arn
}

output "rds_cluster_endpoint" {
  description = "Writer endpoint of the RDS cluster"
  value       = module.rds.cluster_endpoint
}

output "rds_cluster_reader_endpoint" {
  description = "Reader endpoint of the RDS cluster"
  value       = module.rds.cluster_reader_endpoint
}

output "rds_cluster_port" {
  description = "Port of the RDS cluster"
  value       = module.rds.cluster_port
}

output "rds_cluster_database_name" {
  description = "Name of the database in the RDS cluster"
  value       = module.rds.cluster_database_name
}

output "rds_cluster_master_username" {
  description = "Master username of the RDS cluster"
  value       = module.rds.cluster_master_username
  sensitive   = true
}

output "rds_cluster_master_password" {
  description = "Master password of the RDS cluster"
  value       = module.rds.cluster_master_password
  sensitive   = true
}

output "rds_instances" {
  description = "Map of RDS instances"
  value       = module.rds.instances
}

# ElastiCache Outputs
output "elasticache_cluster_id" {
  description = "ID of the ElastiCache cluster"
  value       = module.elasticache.cluster_id
}

output "elasticache_cluster_arn" {
  description = "ARN of the ElastiCache cluster"
  value       = module.elasticache.cluster_arn
}

output "elasticache_cluster_endpoint" {
  description = "Endpoint of the ElastiCache cluster"
  value       = module.elasticache.cluster_endpoint
}

output "elasticache_cluster_port" {
  description = "Port of the ElastiCache cluster"
  value       = module.elasticache.cluster_port
}

output "elasticache_cache_nodes" {
  description = "List of ElastiCache cache nodes"
  value       = module.elasticache.cache_nodes
}

# MSK Outputs
output "msk_cluster_id" {
  description = "ID of the MSK cluster"
  value       = module.msk.cluster_id
}

output "msk_cluster_arn" {
  description = "ARN of the MSK cluster"
  value       = module.msk.cluster_arn
}

output "msk_cluster_bootstrap_brokers" {
  description = "Bootstrap brokers of the MSK cluster"
  value       = module.msk.cluster_bootstrap_brokers
}

output "msk_cluster_bootstrap_brokers_tls" {
  description = "TLS bootstrap brokers of the MSK cluster"
  value       = module.msk.cluster_bootstrap_brokers_tls
}

output "msk_cluster_bootstrap_brokers_sasl_scram" {
  description = "SASL SCRAM bootstrap brokers of the MSK cluster"
  value       = module.msk.cluster_bootstrap_brokers_sasl_scram
}

output "msk_cluster_bootstrap_brokers_plaintext" {
  description = "Plaintext bootstrap brokers of the MSK cluster"
  value       = module.msk.cluster_bootstrap_brokers_plaintext
}

output "msk_cluster_zookeeper_connect_string" {
  description = "Zookeeper connect string of the MSK cluster"
  value       = module.msk.cluster_zookeeper_connect_string
}

# S3 Outputs
output "s3_storage_bucket_id" {
  description = "ID of the S3 storage bucket"
  value       = module.s3.storage_bucket_id
}

output "s3_storage_bucket_arn" {
  description = "ARN of the S3 storage bucket"
  value       = module.s3.storage_bucket_arn
}

output "s3_storage_bucket_domain_name" {
  description = "Domain name of the S3 storage bucket"
  value       = module.s3.storage_bucket_domain_name
}

output "s3_logs_bucket_id" {
  description = "ID of the S3 logs bucket"
  value       = module.s3.logs_bucket_id
}

output "s3_logs_bucket_arn" {
  description = "ARN of the S3 logs bucket"
  value       = module.s3.logs_bucket_arn
}

# CloudFront Outputs
output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution"
  value       = module.cloudfront.distribution_arn
}

output "cloudfront_distribution_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = module.cloudfront.distribution_domain_name
}

output "cloudfront_distribution_hosted_zone_id" {
  description = "Hosted zone ID of the CloudFront distribution"
  value       = module.cloudfront.distribution_hosted_zone_id
}

# KMS Outputs
output "kms_key_id" {
  description = "ID of the KMS key"
  value       = module.kms.key_id
}

output "kms_key_arn" {
  description = "ARN of the KMS key"
  value       = module.kms.key_arn
}

output "kms_key_alias" {
  description = "Alias of the KMS key"
  value       = module.kms.key_alias
}

# Security Group Outputs
output "security_group_ids" {
  description = "Map of security group IDs"
  value = {
    vpc_endpoints = module.vpc.vpc_endpoint_security_group_id
    rds          = module.rds.security_group_id
    elasticache  = module.elasticache.security_group_id
    msk          = module.msk.security_group_id
    eks          = module.eks.cluster_security_group_id
  }
}

# IAM Outputs
output "eks_cluster_iam_role_name" {
  description = "Name of the EKS cluster IAM role"
  value       = module.eks.cluster_iam_role_name
}

output "eks_cluster_iam_role_arn" {
  description = "ARN of the EKS cluster IAM role"
  value       = module.eks.cluster_iam_role_arn
}

output "eks_node_groups_iam_role_names" {
  description = "Names of the EKS node groups IAM roles"
  value       = module.eks.node_groups_iam_role_names
}

output "eks_node_groups_iam_role_arns" {
  description = "ARNs of the EKS node groups IAM roles"
  value       = module.eks.node_groups_iam_role_arns
}

# Route53 Outputs (if configured)
output "route53_zone_id" {
  description = "ID of the Route53 hosted zone (if configured)"
  value       = try(module.route53.zone_id, null)
}

output "route53_zone_name" {
  description = "Name of the Route53 hosted zone (if configured)"
  value       = try(module.route53.zone_name, null)
}

# CloudWatch Outputs
output "cloudwatch_log_group_names" {
  description = "Names of the CloudWatch log groups"
  value = {
    vpc_flow_logs = try(module.vpc.vpc_flow_log_id, null)
    msk_logs      = try(module.msk.cloudwatch_log_group_name, null)
    eks_logs      = try(module.eks.cloudwatch_log_group_name, null)
  }
}

# Load Balancer Outputs (if configured)
output "load_balancer_dns_name" {
  description = "DNS name of the load balancer (if configured)"
  value       = try(module.load_balancer.dns_name, null)
}

output "load_balancer_zone_id" {
  description = "Zone ID of the load balancer (if configured)"
  value       = try(module.load_balancer.zone_id, null)
}

# VPN Outputs (if configured)
output "vpn_gateway_id" {
  description = "ID of the VPN gateway (if configured)"
  value       = try(module.vpn.gateway_id, null)
}

output "vpn_connection_id" {
  description = "ID of the VPN connection (if configured)"
  value       = try(module.vpn.connection_id, null)
}

# Backup Outputs (if configured)
output "backup_vault_id" {
  description = "ID of the AWS Backup vault (if configured)"
  value       = try(module.backup.vault_id, null)
}

output "backup_vault_arn" {
  description = "ARN of the AWS Backup vault (if configured)"
  value       = try(module.backup.vault_arn, null)
}

# Monitoring Outputs
output "monitoring_dashboard_urls" {
  description = "URLs of the monitoring dashboards"
  value = {
    grafana = try("http://${module.grafana.endpoint}:3000", null)
    kibana  = try("http://${module.kibana.endpoint}:5601", null)
    jaeger  = try("http://${module.jaeger.endpoint}:16686", null)
  }
}

# Connection Information
output "connection_info" {
  description = "Connection information for the deployed infrastructure"
  value = {
    database = {
      host     = module.rds.cluster_endpoint
      port     = module.rds.cluster_port
      database = module.rds.cluster_database_name
      username = module.rds.cluster_master_username
    }
    redis = {
      host = module.elasticache.cluster_endpoint
      port = module.elasticache.cluster_port
    }
    kafka = {
      bootstrap_brokers = module.msk.cluster_bootstrap_brokers_tls
      zookeeper        = module.msk.cluster_zookeeper_connect_string
    }
    s3 = {
      storage_bucket = module.s3.storage_bucket_id
      logs_bucket    = module.s3.logs_bucket_id
    }
    cloudfront = {
      domain = module.cloudfront.distribution_domain_name
    }
    eks = {
      cluster_endpoint = module.eks.cluster_endpoint
      cluster_version  = module.eks.cluster_version
    }
  }
}

# Deployment Summary
output "deployment_summary" {
  description = "Summary of the deployed infrastructure"
  value = {
    project_name    = var.project_name
    environment     = var.environment
    region          = var.aws_region
    deployment_time = timestamp()
    resources = {
      vpc_id         = module.vpc.vpc_id
      eks_cluster_id = module.eks.cluster_id
      rds_cluster_id = module.rds.cluster_id
      redis_cluster_id = module.elasticache.cluster_id
      msk_cluster_id = module.msk.cluster_id
      s3_buckets     = [module.s3.storage_bucket_id, module.s3.logs_bucket_id]
      cloudfront_id  = module.cloudfront.distribution_id
    }
    next_steps = [
      "Configure kubectl: aws eks update-kubeconfig --region ${var.aws_region} --name ${var.eks_cluster_name}",
      "Deploy applications: kubectl apply -f k8s/",
      "Set up monitoring: kubectl apply -f k8s/monitoring/",
      "Configure DNS: Point your domain to CloudFront distribution",
      "Set up CI/CD: Configure GitHub Actions with ECR and EKS",
      "Test connectivity: Verify all services are accessible"
    ]
  }
}
