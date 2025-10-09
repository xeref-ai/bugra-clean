
const { setGlobalOptions } = require("firebase-functions/v2");
const { startAudioDebrief } = require("./src/audioDebriefWorkflow");

// Set global options to define secrets that will be available in the runtime environment
setGlobalOptions({
  secrets: ["AGENTKIT_API_KEY", "SKOOL_API_TOKEN", "GEMINI_API_KEY"],
  // You can also define other global settings like region here
  // region: 'us-central1',
});

// Expose the function for deployment
exports.startAudioDebrief = startAudioDebrief;
