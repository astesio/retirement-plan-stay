# Define o nome da base de dados e credenciais
resource "random_password" "db_password" {
  length  = 16
  special = false
}

# 1. Armazena as credenciais no Secrets Manager (melhor prática)
resource "aws_secretsmanager_secret" "rds_credentials" {
  name = "${var.project_name}-rds-credentials"
}

resource "aws_secretsmanager_secret_version" "rds_credentials_version" {
  secret_id = aws_secretsmanager_secret.rds_credentials.id
  secret_string = jsonencode({
    username = var.db_username
    password = random_password.db_password.result
    host     = aws_db_instance.postgres_db.address
    port     = aws_db_instance.postgres_db.port
    database = var.db_name
  })
}

# 2. Cria o RDS PostgreSQL
resource "aws_db_instance" "postgres_db" {
  identifier           = "${var.project_name}-db"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.micro" # Use o t3.micro para o teste (Free Tier compatível)
  name                 = var.db_name
  username             = var.db_username
  password             = random_password.db_password.result
  skip_final_snapshot  = true # Não faça isso em produção
  publicly_accessible  = false # DEVE ser FALSE para segurança!
  db_subnet_group_name = aws_db_subnet_group.default.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
}

# 3. Cria o DB Subnet Group (requer uma VPC e Subnets que estariam no main.tf)
resource "aws_db_subnet_group" "default" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = [
    aws_subnet.private_subnet_1.id, # Subnets privadas da VPC
    aws_subnet.private_subnet_2.id
  ]
}

# ... Outros recursos (Security Groups, VPC, etc.) estariam em main.tf