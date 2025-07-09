import { useState } from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AlgorithmListPage from './pages/AlgorithmListPage.jsx';
import AlgorithmDetailPage from './pages/AlgorithmDetailPage.jsx';
import AlgorithmComparePage from './pages/AlgorithmComparePage.jsx';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleSelectAlgorithm = (algorithmId) => {
    setSelectedAlgorithm(algorithmId);
    setCurrentPage('algorithm-detail');
  };

  const handleBackToList = () => {
    setCurrentPage('algorithm-list');
    setSelectedAlgorithm(null);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedAlgorithm(null);
  };

  // ナビゲーション処理
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedAlgorithm(null);
  };

  // ページレンダリング
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'algorithm-list':
        return <AlgorithmListPage onSelectAlgorithm={handleSelectAlgorithm} />;
      case 'algorithm-detail':
        return (
          <AlgorithmDetailPage
            algorithmId={selectedAlgorithm}
            onBack={handleBackToList}
          />
        );
      case 'algorithm-compare':
        return <AlgorithmComparePage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigation} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
