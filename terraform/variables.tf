variable "region" {
  default = "eu-north-1"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "key_name" {
  default = "my-ec2-ssh-key-name"
}

variable "public_key" {
  
}

variable "profile_name" {
  default = "ec2_profile"
}