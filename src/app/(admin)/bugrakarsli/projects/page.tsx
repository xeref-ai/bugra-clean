
import { getProjects, addProject } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectListItem } from '@/components/project-list-item';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>
      <p className="mb-4">This is where you will manage all the projects for xeref.ai.</p>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={async (formData) => {
            'use server';
            const projectName = formData.get('projectName') as string;
            if (projectName) {
              await addProject(projectName);
            }
          }}>
            <div className="flex gap-2">
              <Input name="projectName" placeholder="New project name..." />
              <Button type="submit">Add Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {projects.map((project: any) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
