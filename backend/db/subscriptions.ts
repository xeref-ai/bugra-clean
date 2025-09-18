
// This file represents the schema for the "subscriptions" collection in Firestore.

interface Subscription {
  plan: 'pro' | 'team' | 'ultra';
  status: 'active' | 'inactive' | 'cancelled';
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}
