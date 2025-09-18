
export const changelogData = {
  latestVersion: '42.0.0',
  versions: [
    {
      version: '42.0.0',
      date: 'August 28, 2025',
      changes: [
        { type: 'New', description: 'Enhanced Chat with Citations: When an AI agent uses a web source, the response will now include a clickable link to that source.' },
        { type: 'Improved', description: 'Consolidated Webhook Logic: Moved the youtube-webhook logic from the legacy startup directory to the active backend.' },
      ],
    },
    {
      version: '1.8',
      date: 'July 10, 2025',
      changes: [
        { type: 'New', description: 'Added support for task checklists to the backend.' },
        { type: 'Improved', description: 'Updated the database schema to include checklists.' },
      ],
    },
  ],
};
