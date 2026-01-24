import { Link } from 'react-router-dom';
import { Header } from '../componet/header';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Terms & Conditions
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using BookVault.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <div className="h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">📅</div>
              <span>Last updated: January 23, 2026</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 sm:p-8 border border-gray-200">
            <div className="prose prose-gray max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="h-4 w-4 sm:h-6 text-blue-600 flex items-center justify-center">🛡️</div>
                  Acceptance of Terms
                </h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  By accessing and using BookVault ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Use License</h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  Permission is granted to temporarily download one copy of BookVault for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm sm:text-base text-gray-600 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on BookVault</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">User Responsibilities</h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  As a user of BookVault, you are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm sm:text-base text-gray-600 ml-4">
                  <li>Maintaining the confidentiality of your account and password</li>
                  <li>Providing accurate and complete information when adding books to your inventory</li>
                  <li>Ensuring that you have the right to store and manage the book data you input</li>
                  <li>Using the service in compliance with all applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Data Storage and Privacy</h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  BookVault stores your inventory data locally in your browser. We do not collect, store, or transmit your personal book inventory data to external servers. However, you should be aware that:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm sm:text-base text-gray-600 ml-4">
                  <li>Clearing your browser data may result in loss of your inventory</li>
                  <li>We recommend regularly backing up your important data</li>
                  <li>The service is provided "as is" without warranty for data loss</li>
                </ul>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="h-4 w-4 sm:h-6 text-yellow-600 flex items-center justify-center">⚠️</div>
                  Limitation of Liability
                </h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  In no event shall BookVault or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BookVault, even if BookVault or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Service Modifications</h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  BookVault reserves the right to modify, suspend, or discontinue the service at any time without prior notice. We may also update these terms and conditions from time to time. Your continued use of the service after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Governing Law</h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which BookVault operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Information</h2>
                <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-600"><strong>Email:</strong> support@bookvault.com</p>
                  <p className="text-xs sm:text-sm text-gray-600"><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </section>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors"
            >
              Back to Dashboard
            </Link>
            <Link 
              to="/privacy" 
              className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
