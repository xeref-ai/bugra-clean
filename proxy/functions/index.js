const functions = require('firebase-functions');
const axios = require('axios');

// The target URL of your live development environment
const target = 'https://bugrakarsli.com/';

// This function will be deployed as 'app' and will handle all incoming requests
exports.app = functions.https.onRequest(async (req, res) => {
    const url = `${target}${req.originalUrl}`;

    try {
        // Forward the incoming request to the target URL using axios
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            headers: {
                ...req.headers,
                // Override the Host header to match the target, which is crucial for many cloud services
                'Host': new URL(target).hostname,
                'X-Forwarded-Host': req.headers.host,
            },
            responseType: 'stream', // Use a stream to handle all content types (like images) correctly
            validateStatus: () => true, // Pass through the original status code from the target,
        });

        // Forward all headers from the target's response back to the client
        for (const [key, value] of Object.entries(response.headers)) {
            // The 'transfer-encoding' header is handled by the server and should not be forwarded
            if (key.toLowerCase() !== 'transfer-encoding') {
                res.setHeader(key, value);
            }
        }
        
        // Forward the status code from the target's response
        res.status(response.status);
        
        // Stream the response body from the target directly to the client
        response.data.pipe(res);

    } catch (error) {
        console.error("Proxying error:", error.message);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            res.status(504).send("Gateway Timeout: The proxy could not connect to the development server.");
        } else {
            res.status(502).send("Bad Gateway: An error occurred while setting up the proxy request.");
        }
    }
});
