
// src/lib/changelog-data.ts

export const changelogData = {
  "latestVersion": "v1.5",
  "changelog": [
    {
      "version": "v1.5",
      "date": "2025-07-02",
      "watchLoom": false,
      "changes": {
        "new": [
          "The application's main entry point is now the login page.",
          "Authentication flow now correctly creates user profiles in the database.",
          "Public pages (Privacy, Terms) are now accessible without logging in."
        ],
        "improved": [
          "Switched to a more reliable popup-based Google Sign-In method.",
          "Updated the production domain to bugrakarsli.com in the proxy."
        ],
        "fix": [
          "Corrected the 'We're Hiring!' link in the footer to point to the internal page."
        ]
      }
    },
    {
      "version": "v1.4",
      "date": "2025-07-01",
      "watchLoom": false,
      "changes": {
        "new": [
          "Implemented a reverse proxy using Firebase Hosting and Cloud Functions to support custom domain mapping.",
          "Upgraded the proxy server from the deprecated `request` package to `axios` for improved reliability."
        ],
        "improved": [
          "Enhanced proxy server error handling for more descriptive and robust logging."
        ]
      }
    },
    {
      "version": "v1.3",
      "date": "2025-06-30",
      "watchLoom": false,
      "changes": {
        "improved": [
          "Updated right sidebar navigation so buttons only open views, not close them.",
          "Set the Tasks panel to be open by default on application start.",
          "Re-ordered navigation buttons on the right sidebar for a more intuitive layout."
        ],
        "fix": [
          "Corrected several syntax errors across components that were causing build failures.",
          "Resolved an NPM dependency conflict with the `firebase` package to ensure a stable build.",
          "Fixed an incorrect name in the Notes view from 'Bugrakarsli' to 'Xeref'."
        ]
      }
    },
    {
      "version": "v1.2",
      "date": "2025-06-28",
      "watchLoom": false,
      "changes": {
        "new": [
            "Added a full-featured, pop-up search panel for notes, tasks, and ideas.",
            "Implemented a new calendar view on the Tasks page to visualize due dates."
        ],
        "improved": [
          "Redesigned the Notes view with a continuous vertical timeline for better organization.",
          "Enhanced the backend to support task metadata (priority, dueDate, tags).",
          "Adjusted the main layout's default panel sizes for a more balanced view.",
          "Updated right sidebar buttons to only open views, preventing accidental closures.",
          "Swapped the locations of the 'Tasks' and 'Ideas' buttons for better workflow."
        ],
        "fix": [
          "Resolved runtime errors related to undefined `TaskHeader` and `setActiveView` components.",
          "Corrected UI inconsistencies, including component alignment and naming."
        ]
      }
    },
    {
      "version": "v1.1",
      "date": "2025-06-27",
      "watchLoom": false,
      "changes": {
        "new": [
            "Added file attachment capability with image previews directly in the chat input area."
        ],
        "improved": [
          "Enhanced UI responsiveness with larger resize handles and more flexible panel sizing.",
          "Streamlined chat controls by consolidating mode selection into a single, responsive dropdown menu.",
          "Moved 'Ultra Search' to a dedicated icon button with a tooltip for a cleaner interface.",
          "Updated the 'Today's Focus' button with a more intuitive 'Target' icon."
        ],
        "fix": [
          "Corrected several minor bugs related to component state and prop definitions."
        ]
      }
    },
    {
      "version": "v1.0",
      "date": "2025-06-26",
      "watchLoom": false,
      "changes": {
        "improved": [
          "Updated the Google Sign-In button to match official branding, improving user recognition and trust.",
          "Re-enabled Firebase authentication to secure the main application page."
        ],
        "fix": [
          "Resolved the primary sign-in issue by guiding the user to add the correct authorized domain to their Firebase project."
        ]
      }
    },
    {
      "version": "v0.9",
      "date": "2025-06-25",
      "watchLoom": true,
      "changes": {
        "new": [
          "Restored the three-panel UI with fully functional and restyled Tasks and Ideas panels.",
          "AI idea generation is now correctly linked to the chat and populates the Idea Inbox.",
          "Re-implemented the v0.8 header button layout in the main chat panel."
        ],
        "improved": [
          "Updated the User Navigation dropdown to be fully functional with microphone controls, matching the target design.",
          "Refined the left sidebar to include all sections (Today, Personal, Team, Chats) and tooltips for the collapsed view."
        ],
        "fix": [
            "Resolved a server startup loop by correctly initializing user state with Firebase auth.",
            "Adjusted button locations in the Settings panel footer to match the desired layout."
        ]
      }
    },
    {
      "version": "v0.8",
      "date": "2025-06-24",
      "watchLoom": true,
      "changes": {
        "new": [
          "Restored the comprehensive multi-panel UI with a collapsible sidebar and right-hand panel for tasks/notes.",
          "Added a fully functional settings panel with controls for AI model, temperature, and system prompt.",
          "Settings are now saved to the browser's local storage for persistence."
        ],
        "improved": [
          "Updated backend AI logic to dynamically use settings from the new UI.",
          "Implemented a more robust Google Sign-In flow with detailed error handling and an auth guard."
        ]
      }
    },
    {
      "version": "v0.7",
      "date": "2025-06-22",
      "watchLoom": true,
      "changes": {
        "new": [
          "Introduced a resizable split-screen layout with AI chat and an intelligent to-do list.",
          "AI now generates three related task ideas after each user message and automatically adds them to the to-do list."
        ],
        "improved": [
          "The to-do list is now fully functional, featuring AI-powered difficulty ranking and task archiving."
        ],
        "fix": [
          "Set the default AI model to 'GPT 4.1' for improved performance."
        ]
      }
    },
    {
      "version": "v0.6",
      "date": "2025-06-20",
      "watchLoom": true,
      "changes": {
        "new": [
          "Added suggested prompt buttons to the main chat screen to improve the initial user experience."
        ],
        "improved": [
          "The main application page is now accessible without login to facilitate easier development and testing."
        ],
        "fix": [
          "Resolved a critical build error by adding the missing 'qrcode.react' dependency.",
          "Fixed a server startup loop caused by an incorrect path in the TypeScript configuration."
        ]
      }
    },
    {
      "version": "v0.5",
      "date": "2025-06-13",
      "watchLoom": true,
      "changes": {
        "improved": [
          "Changelog page is now dynamically generated from a structured data object.",
          "Added version link and Discord button to the main settings panel."
        ],
        "new": [
          "Added a 'Learn More' section to the changelog, linking to the Xerenity Society."
        ]
      }
    },
    {
      "version": "v0.4",
      "date": "2025-06-12",
      "watchLoom": true,
      "changes": {
        "improved": [
          "'Today's Focus' page suggestion is now dynamic and changes daily.",
          "'Today's Focus' button in the header is now a more compact, icon-only button."
        ]
      }
    },
     {
      "version": "v0.3",
      "date": "2025-06-11",
      "watchLoom": true,
      "changes": {
        "improved": [
          "Refined the user interface for the 'Today's Focus' page for a cleaner look."
        ],
        "fix": [
          "Renamed 'Xeref.ai Agent' to 'Xeref Agent' for consistency."
        ]
      }
    },
    {
      "version": "v0.2",
      "date": "2025-06-10",
      "watchLoom": true,
      "changes": {
        "new": [
          "Added a hover effect to the 'Today's Focus' button, showing text on mouseover."
        ]
      }
    },
    {
      "version": "v0.1",
      "date": "2025-06-09",
      "watchLoom": true,
      "changes": {
        "new": [
          "Initial application setup and implementation of core features, including the main chat interface and settings panel."
        ]
      }
    }
  ]
};
