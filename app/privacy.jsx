import { Link } from 'react-router-dom';
import { Header } from '../componet/header';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we handle your data.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <div className="h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">📅</div>
              <span>Last updated: January 23, 2026</span>
            </div>
          </div>

          {/* Privacy Badge */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="h-4 w-4 sm:h-6 text-green-600 flex items-center justify-center">✅</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Privacy-First Design</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              BookVault is designed with your privacy in mind. Your book inventory data stays on your device.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 sm:p-8 border border-gray-200">
            <div className="space-y-6 sm:space-y-8">
              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="h-4 w-4 sm:h-6 text-blue-600 flex items-center justify-center">👁️</div>
                  Information We Collect
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Book Inventory Data</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Information you input about your books including titles, authors, ISBNs, publishers, genres, quantities, and prices. This data is stored locally in your browser and is never transmitted to our servers.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Browser Storage</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      We use local browser storage to save your inventory data on your device. This allows you to access your books even when offline.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="h-4 w-4 sm:h-6 text-green-600 flex items-center justify-center">🔒</div>
                  How We Protect Your Data
                </h2>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-3 w-3 sm:h-5 text-green-600 mt-0.5 flex-shrink-0 flex items-center justify-center">✅</div>
                    <div>
                      <strong className="text-gray-900 text-sm sm:text-base">Local Storage Only:</strong>
                      <span className="text-gray-600 text-xs sm:text-sm"> Your book inventory data never leaves your device.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-3 w-3 sm:h-5 text-green-600 mt-0.5 flex-shrink-0 flex items-center justify-center">✅</div>
                    <div>
                      <strong className="text-gray-900 text-sm sm:text-base">No Tracking:</strong>
                      <span className="text-gray-600 text-xs sm:text-sm"> We don't track your reading habits or book preferences.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-3 w-3 sm:h-5 text-green-600 mt-0.5 flex-shrink-0 flex items-center justify-center">✅</div>
                    <div>
                      <strong className="text-gray-900 text-sm sm:text-base">No Third-Party Sharing:</strong>
                      <span className="text-gray-600 text-xs sm:text-sm"> We never sell or share your data with third parties.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="h-3 w-3 sm:h-5 text-green-600 mt-0.5 flex-shrink-0 flex items-center justify-center">✅</div>
                    <div>
                      <strong className="text-gray-900 text-sm sm:text-base">Secure Encryption:</strong>
                      <span className="text-gray-600 text-xs sm:text-sm"> Your data is encrypted using industry-standard methods.</span>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="h-4 w-4 sm:h-6 text-purple-600 flex items-center justify-center">💾</div>
                  Data Storage and Retention
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Your book inventory data is stored locally in your browser's local storage. This means:
                  </p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 ml-4">
                    <li>Data persists between browser sessions on the same device</li>
                    <li>Data is accessible even when you're offline</li>
                    <li>Data is only available on the device where it was created</li>
                    <li>Clearing browser data will remove your inventory</li>
                  </ul>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                    <p className="text-yellow-800 text-xs sm:text-sm">
                      <strong>Important:</strong> We recommend regularly exporting or backing up your inventory data to prevent accidental loss.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Your Rights</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  Since your data is stored locally on your device, you have complete control over it:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 ml-4">
                  <li><strong>Access:</strong> You can view all your stored data at any time</li>
                  <li><strong>Modify:</strong> You can edit or update any book information</li>
                  <li><strong>Delete:</strong> You can remove individual books or clear your entire inventory</li>
                  <li><strong>Export:</strong> You can export your data for backup or migration purposes</li>
                  <li><strong>Portability:</strong> Your data can be moved between devices by exporting and importing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Cookies and Local Storage</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  BookVault uses browser local storage to save your inventory data. This is different from cookies and is used solely for:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 ml-4">
                  <li>Storing your book inventory</li>
                  <li>Saving your preferences and settings</li>
                  <li>Maintaining application state between sessions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Third-Party Services</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  BookVault does not integrate with third-party services that collect or process your personal data. We may use:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 ml-4">
                  <li>CDN services for delivering the application (no data collection)</li>
                  <li>Analytics that don't track personal information (optional and can be disabled)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Children's Privacy</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  BookVault is not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Changes to This Policy</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Us</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
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
              to="/terms" 
              className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors"
            >
              View Terms & Conditions
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
