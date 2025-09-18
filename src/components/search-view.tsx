
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { type SearchResult, searchDocsAction } from '@/lib/actions';
import { Loader2, Search, FileText } from 'lucide-react';

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="px-2 py-1 text-xs font-sans font-semibold text-gray-400 bg-gray-700/50 border border-gray-600 rounded-md">
    {children}
  </kbd>
);

export const SearchView = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSearch = async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setResults(null);
        try {
            const searchResults = await searchDocsAction(query);
            setResults(searchResults);
            if (searchResults.length === 0) {
                toast({
                    title: "No Results",
                    description: `No documents found matching "${query}".`
                });
            }
        } catch (error) {
            console.error("Search failed:", error);
            toast({
                title: "Search Error",
                description: "An error occurred while searching.",
                variant: "destructive"
            });
            setResults([]); // Set to empty array on error to clear loading state
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="bg-[#1e2024] text-gray-300 flex flex-col border border-gray-700 rounded-lg shadow-2xl">
            <div className="p-4 flex-grow flex flex-col">
                <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        autoFocus
                        type="text"
                        placeholder="Search for notes, tasks, ideas..."
                        className="bg-[#2C2D30] border-gray-700 text-gray-300 placeholder:text-gray-500 rounded-lg p-3 pl-12 text-base h-12"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    {isLoading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
                </div>

                <div className="flex-grow">
                    <h3 className="text-xs font-semibold text-gray-500 px-2 mb-2">
                        {results === null ? 'Recent' : `Results (${results.length})`}
                    </h3>
                    <ul>
                      {results ? (
                        results.length > 0 ? (
                            results.map((result, index) => (
                               <li key={index} className="flex justify-between items-center p-3 rounded-md hover:bg-gray-800/50 cursor-pointer">
                                    <div>
                                        <p className="text-white text-sm font-medium">{result.file}</p>
                                        <p className="text-xs text-gray-400 mt-1">{result.snippet}</p>
                                    </div>
                                    <Badge variant="outline" className="text-gray-400 border-gray-600 bg-gray-900/40 text-xs font-normal h-6 flex-shrink-0">
                                        <FileText size={12} className="mr-1.5" />
                                        doc
                                    </Badge>
                                </li>
                            ))
                        ) : (
                            !isLoading && <p className="text-center text-sm text-gray-500 p-4">No results found.</p>
                        )
                      ) : (
                        <li className="flex justify-between items-center p-3 rounded-md hover:bg-gray-800/50 cursor-pointer bg-gray-800/30">
                            <span className="text-white text-sm">Xeref.ai</span>
                            <Badge variant="outline" className="text-yellow-300 border-yellow-300/30 bg-yellow-900/40 text-xs font-normal h-6">
                                <FileText size={12} className="mr-1.5" />
                                note
                            </Badge>
                        </li>
                      )}
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 p-3 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                    <Kbd>Enter</Kbd>
                    <span>to search</span>
                </div>
                <div className="flex items-center gap-2">
                    <Kbd>Esc</Kbd>
                    <span>to close</span>
                </div>
            </div>
        </div>
    );
};
