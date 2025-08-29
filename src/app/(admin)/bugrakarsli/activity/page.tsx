
import { getActivityLogs, getActivityLogCount } from '@/lib/actions';
import { featureFlags } from '@/lib/feature-flags';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityList } from '@/components/activity-list';

export default async function AdminActivityPage() {
  if (!featureFlags.isPublicActivityPageEnabled()) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">User Activity</h1>
        <p>This feature is currently disabled.</p>
      </div>
    );
  }
  
  const initialLogs = await getActivityLogs({ limit: 20 });
  const totalLogs = await getActivityLogCount();
  const logsLast7Days = await getActivityLogCount({ lastDays: 7 });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Activity</h1>
      <p className="mb-4">This is where you will view user activity and analytics.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logsLast7Days}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityList initialLogs={initialLogs} />
        </CardContent>
      </Card>
    </div>
  );
}
