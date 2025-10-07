# terraform/main.tf
provider "google" {
  project = var.project_id
  region  = var.region
}

# Construct the service account email dynamically using the provided project number
locals {
  app_hosting_agent_email = "service-${var.project_number}@gcp-sa-firebaseapphosting.iam.gserviceaccount.com"
}

# Grant the required IAM Roles to the App Hosting Service Agent
resource "google_project_iam_member" "app_hosting_runner" {
  project = var.project_id
  role    = "roles/firebaseapphosting.computeRunner"
  member  = "serviceAccount:${local.app_hosting_agent_email}"
}

# Grant permissions for the Firebase Admin SDK to function correctly
resource "google_project_iam_member" "firebase_admin" {
  project = var.project_id
  role    = "roles/firebase.admin"
  member  = "serviceAccount:${local.app_hosting_agent_email}"
}

# Grant permissions for Firestore access
resource "google_project_iam_member" "app_hosting_datastore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${local.app_hosting_agent_email}"
}
