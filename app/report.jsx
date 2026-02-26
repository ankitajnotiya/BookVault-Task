import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to People
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Report</h1>
          <p className="text-gray-600">This is the Report page. Content will be added here.</p>
        </div>
      </div>
    </div>
  );
}
