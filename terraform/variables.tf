
variable "project_id" {
  description = "The ID of the Google Cloud project."
  type        = string
  default     = "xerefai-prod"
}

variable "region" {
  description = "The region where resources will be deployed."
  type        = string
  default     = "us-central1"
}

variable "project_number" {
  description = "The numeric identifier for your Google Cloud project. This is required because your user does not have permission to look it up automatically."
  type        = string
}
