
export const dashboardConfig = {
  "meta": {
    "appName": "Xeref.ai",
    "version": "1.0.0",
    "scales": [2.0, 1.75, 1.5],
    "a11y": { "lang": "en", "ariaBaseLabel": "Xeref application" }
  },
  "theme": {
    "mode": "dark",
    "colors": {
      "bg": "#0b0b0f",
      "panel": "#111317",
      "muted": "#9aa0a6",
      "text": "#e5e7eb",
      "accent": "#7c3aed",
      "accentMuted": "#a78bfa",
      "border": "#262a33"
    },
    "radius": 10,
    "font": { "family": "Inter, ui-sans-serif, system-ui", "size": 14 }
  },
  "layout": {
    "grid": {
      "columns": ["16rem", "minmax(0,1fr)", "20rem"],
      "gap": "0",
      "responsive": {
        "sm": ["0", "1fr", "0"],
        "md": ["14rem", "minmax(0,1fr)", "18rem"],
        "lg": ["16rem", "minmax(0,1fr)", "20rem"]
      }
    },
    "header": {
      "leftActions": [
        { "type": "button", "id": "new-chat", "label": "New Chat", "style": "solid" },
        { "type": "button", "id": "upgrade", "label": "UPGRADE TO PRO", "style": "outline" }
      ],
      "rightWidgets": [
        { "type": "text", "id": "todays-focus", "text": "Today’s notes" }
      ]
    }
  },
  "sidebar": {
    "brand": { "logo": "tri-icon", "label": "xeref.ai" },
    "sections": [
      { "id": "today", "label": "Today", "icon": "clock", "selected": true },
      { "id": "stats", "label": "Stats", "icon": "chart" },
      {
        "id": "personal",
        "label": "Personal",
        "icon": "lock",
        "children": [
          { "id": "xeref", "label": "xeref", "icon": "tag" }
        ]
      }
    ],
    "footer": {
      "profile": { "name": "Bugra Karsli", "plan": "Xeref Free", "avatar": "B" }
    }
  },
  "center": {
    "hero": {
      "icon": "tri-icon",
      "headline": "What can I help with?",
      "cta": { "label": "UPGRADE TO PRO", "id": "upgrade" }
    },
    "composer": {
      "placeholder": "Message Xeref...",
      "actions": [
        { "id": "voice", "icon": "mic" },
        { "id": "send", "icon": "arrow-up" }
      ],
      "modelPicker": { "value": "GPT-5" }
    },
    "bottomNav": {
      "tabs": [
        { "id": "chat", "label": "Chat", "icon": "chat", "active": true },
        { "id": "ideas", "label": "Ideas", "icon": "pencil" },
        { "id": "tasks", "label": "Tasks", "icon": "check" },
        { "id": "notes", "label": "Notes", "icon": "file" }
      ],
      "fab": { "id": "add", "icon": "plus" }
    }
  },
  "rightPanel": {
    "timeline": {
      "groups": [
        { "id": "upcoming", "label": "Upcoming", "collapsed": false, "items": [] },
        {
          "id": "pinned",
          "label": "Pinned",
          "collapsed": false,
          "items": [
            {
              "id": "xeref-ai",
              "title": "Xeref.ai",
              "subtitle": "xeref",
              "pinned": true,
              "badges": []
            }
          ]
        },
        { "id": "today", "label": "Today", "collapsed": false, "items": [] },
        { "id": "history", "label": "June 27, 2025", "collapsed": true, "items": [{ "id": "hist-1", "title": "xeref.ai" }] }
      ],
      "quickActions": [
        { "id": "ai-research", "label": "AI Research", "style": "accent" },
        { "id": "add-note", "label": "Add", "style": "ghost", "icon": "plus" }
      ]
    }
  },
  "routes": [
    { "path": "/", "component": "Home" },
    { "path": "/room/:id", "component": "ChatRoom" }
  ],
  "shortcuts": {
    "newChat": "Ctrl+N",
    "focusSearch": "/",
    "sendMessage": "Ctrl+Enter"
  },
  "access": {
    "roles": [
      { "id": "viewer", "permissions": ["read"] },
      { "id": "editor", "permissions": ["read", "write"] },
      { "id": "admin", "permissions": ["read", "write", "pin"] }
    ]
  },
  "mapping": {
    "tailwind": {
      "root": "h-screen w-screen grid",
      "gridCols": "grid-cols-[16rem_minmax(0,1fr)_20rem]",
      "mdGridCols": "md:grid-cols-[14rem_minmax(0,1fr)_18rem]",
      "lgGridCols": "lg:grid-cols-[16rem_minmax(0,1fr)_20rem]"
    }
  }
};
