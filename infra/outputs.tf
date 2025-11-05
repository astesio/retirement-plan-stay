output "ecr_repository_url" {
  value = aws_ecr_repository.app_repository.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.app_service.name
}

output "ecs_task_definition_arn" {
  value = aws_ecs_task_definition.app_task.arn
}