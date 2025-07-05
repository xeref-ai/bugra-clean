'use server';

import fs from 'fs/promises';
import path from 'path';

export interface SearchResult {
    file: string;
    snippet: string;
}

const createSnippet = (content: string, query: string): string => {
    const contentLower = content.toLowerCase();
    const queryLower = query.toLowerCase();
    const index = contentLower.indexOf(queryLower);

    if (index === -1) {
        return content.substring(0, 200) + (content.length > 200 ? '...' : '');
    }

    const start = Math.max(0, index - 75);
    const end = Math.min(content.length, index + query.length + 75);

    let snippet = content.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    return snippet;
};

export async function searchDocsAction(query: string): Promise<SearchResult[]> {
    if (!query.trim()) {
        return [];
    }

    const filesToSearch = [
        'README.md',
        'notes.md',
        'docs/startup_playbook.md',
        'tasks.md',
        'src/README.md',
        'xeref/README.md',
        'xeref/docs/blueprint.md',
    ];

    const results: SearchResult[] = [];
    const queryLower = query.toLowerCase();

    for (const file of filesToSearch) {
        const docPath = path.resolve(process.cwd(), file);
        try {
            const content = await fs.readFile(docPath, 'utf-8');
            if (content.toLowerCase().includes(queryLower)) {
                results.push({
                    file: file,
                    snippet: createSnippet(content, query),
                });
            }
        } catch (readError: any) {
            if (readError.code !== 'ENOENT') {
                console.warn(`Error reading file ${file}:`, readError);
            }
        }
    }
    
    return results;
}
