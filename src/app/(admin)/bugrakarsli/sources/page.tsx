
import { getSources, addSource } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SourceList } from '@/components/source-list';

export default async function AdminSourcesPage() {
  const initialSources = await getSources({ limit: 10 });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Sources</h1>
      <p className="mb-4">This is where you will manage all the NotebookLM sources.</p>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Source</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={async (formData) => {
            'use server';
            const url = formData.get('sourceUrl') as string;
            if (url) {
              await addSource(url);
            }
          }}>
            <div className="flex gap-2">
              <Input name="sourceUrl" placeholder="https://example.com" />
              <Button type="submit">Add Source</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <SourceList initialSources={initialSources} />
        </CardContent>
      </Card>
    </div>
  );
}
