output "public_ip" {
  value = aws_instance.node_app_instance.public_ip
}