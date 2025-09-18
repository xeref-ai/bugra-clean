
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const frameStats = {
  "total_frames": 357,
  "dropped_frames": 2,
  "frame_time__ms": {
    "average": 28.01,
    "p90": 45.23,
    "p95": 52.87,
    "p99": 63.45
  }
};

const PerformancePage = () => {
  const data = [
    { name: 'Average', value: frameStats.frame_time__ms.average },
    { name: 'P90', value: frameStats.frame_time__ms.p90 },
    { name: 'P95', value: frameStats.frame_time__ms.p95 },
    { name: 'P99', value: frameStats.frame_time__ms.p99 },
  ];

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-sm text-muted-foreground">Total Frames</p>
              <p className="text-2xl font-bold">{frameStats.total_frames}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dropped Frames</p>
              <p className="text-2xl font-bold">{frameStats.dropped_frames}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformancePage;
