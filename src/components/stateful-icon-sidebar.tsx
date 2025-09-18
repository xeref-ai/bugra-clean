
'use client';

import React, { useState } from 'react';
import { IconSidebar as DumbIconSidebar } from '@/components/icon-sidebar';

export const IconSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleToggle = () => setIsCollapsed(!isCollapsed);
    const handleNewProject = () => console.log("New Project Clicked");
    const handleEditProject = () => console.log("Edit Project Clicked");

    return (
        <DumbIconSidebar 
            isCollapsed={isCollapsed}
            onToggle={handleToggle}
            onNewProjectClick={handleNewProject}
            onEditProjectClick={handleEditProject}
        />
    )
}
