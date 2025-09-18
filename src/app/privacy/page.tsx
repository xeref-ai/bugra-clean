
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
          <p>
            Welcome to Xeref.ai. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
          </p>
          
          <h2 className="text-2xl font-bold mt-8">Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect via the Application includes personal data, such as your name and email address, that you voluntarily give to us when you register with the Application.
          </p>

          <h2 className="text-2xl font-bold mt-8">Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to create and manage your account.
          </p>
          
          <p className="mt-8 p-4 bg-yellow-900/50 rounded-lg">
            <strong>Note:</strong> This is a placeholder document. You must replace this content with a comprehensive and legally compliant Privacy Policy before submitting your app for verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
