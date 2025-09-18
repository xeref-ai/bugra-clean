
import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
          <p>
            Please read these Terms of Service carefully before using the Xeref.ai application. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8">Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2 className="text-2xl font-bold mt-8">Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Xeref.ai and its licensors.
          </p>
          
          <p className="mt-8 p-4 bg-yellow-900/50 rounded-lg">
            <strong>Note:</strong> This is a placeholder document. You must replace this content with a comprehensive and legally compliant Terms of Service before submitting your app for verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
