
'use client';

import React from 'react';

export const ExecutionsView = () => {
  return (
    <div className="flex-grow p-4 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-800 rounded-full p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-gray-500"
        >
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="m16.24 16.24 2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="m4.93 19.07 2.83-2.83" />
          <path d="m16.24 7.76-2.83 2.83" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-medium">No executions yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        As soon as you run a workflow, its executions will appear here.
      </p>
    </div>
  );
};
