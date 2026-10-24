# Automated CI/CD Pipeline for a Dockerized Application on AWS EC2

## Docker Setup

To containerize this application, I have use the following Dockerfile configuration:

```Dockerfile
FROM node:22-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ['node', 'index.js']
```

## Terraform Configuration
Below is the "Terraform setting block" used to configure required provider and the remote s3 backend state management

```hcl
terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~ > 6.0"
    }
  }
  backend "s3" {
    bucket = "my-node-app-devops-tf-state-file"
    key = "dev/terraform.tfstate"
    region = "eu-north-1"
    encrypt = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.region
}
```

## Configure security groups for ec2

```hcl
resource "aws_security_group" "main" {
    egress = [
        {
            from_port        = 0
            to_port          = 0
            protocol         = "-1"
            cidr_blocks      = ["0.0.0.0/0"]
            ipv6_cidr_blocks = ["::/0"]
        }
    ]
    ingress = [ 
        {
            from_port        = 22
            to_port          = 22
            protocol         = "ssh"
            cidr_blocks      = ["0.0.0.0/0"]
            ipv6_cidr_blocks = ["::/0"]
        },
        {
            from_port        = 80
            to_port          = 80
            protocol         = "tcp"
            cidr_blocks      = ["0.0.0.0/0"]
            ipv6_cidr_blocks = ["::/0"]
        },
        {
            from_port        = 443
            to_port          = 443
            protocol         = "tcp"
            cidr_blocks      = ["0.0.0.0/0"]
            ipv6_cidr_blocks = ["::/0"]
        }
     ]
  
}
```

## key-pair configuration for ec2

```hcl
resource "aws_key_pair" "deployer" {
  key_name = var.key_name
  public_key = var.public_key
}
```

## Configure IAM instance profile for ec2 to read from ecr

```hcl
resource "aws_iam_instance_profile" "ec2_profile" {
  name = var.profile_name
  role = "ec2-to_ecr_auth"
}
```

## Provision ec2 instance

```hcl
resource "aws_instance" "node_app_instance" {
    ami = "ami-021aaf3749be66813"
    region = var.region
    instance_type = var.instance_type
    associate_public_ip_address = true
    security_groups = aws_security_group.main.id
    key_name = aws_key_pair.deployer.key_name
    iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
    tags = {
      Name = "Node App"
    }
}
```

## Get public ip address of the ec2 through Terraform output

```hcl
output "public_ip" {
  value = aws_instance.node_app_instance.public_ip
}
```



