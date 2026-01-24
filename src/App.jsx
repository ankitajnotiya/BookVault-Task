import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookInventoryPage from '../app/page';
import BookDetailPage from '../app/book/[id]/page';
import BookEditPage from '../app/book/[id]/edit';
import FAQPage from '../app/faq';
import TermsPage from '../app/terms';
import PrivacyPage from '../app/privacy';
import ProfilePage from '../app/profile/profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<BookInventoryPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/books/:id/edit" element={<BookEditPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
