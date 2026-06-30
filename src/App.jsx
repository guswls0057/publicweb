import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookCarousel from './components/BookCarousel';
import SearchResultPage from './components/SearchResultPage';
import MyLibraryButton from './components/MyLibraryButton';
import './App.css'; // 메인메뉴 및 추가 영역 CSS 임포트
import requestIcon from './assets/통합예약신청아이콘.svg';
import libraryIcon from './assets/수원시통합도서관아이콘.svg';
import searchIcon from './assets/지역도서관통합검색 아이콘.svg';
import subwayIcon from './assets/지하철무인대출아이콘.svg';


const SubwayLoanPage = lazy(() => import('./components/SubwayLoanPage'));
const SubwayReservePage = lazy(() => import('./components/SubwayReservePage'));

// 추천도서 데이터 (book01 ~ book10, /public 폴더)
const recommendedBooks = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: `rec-${num}`,
    src: `${import.meta.env.BASE_URL}book${num}.svg`,
    alt: `추천도서 ${i + 1}`,
  };
});

// 인기도서 데이터 (book11 ~ book20, /public 폴더)
const popularBooks = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 11).padStart(2, '0');
  return {
    id: `pop-${num}`,
    src: `${import.meta.env.BASE_URL}book${num}.svg`,
    alt: `인기도서 ${i + 1}`,
  };
});

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'subway-loan' | 'search-result' | 'subway-reserve'
  const [searchQuery, setSearchQuery] = useState('');
  const [reserveBook, setReserveBook] = useState({ title: '', library: '', station: '', date: '' });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const mainMenus = [
    {
      id: 1,
      title: '통합예약/신청',
      icon: <img src={requestIcon} alt="통합예약/신청 아이콘" width="100%" height="100%" style={{ objectFit: 'contain' }} />
    },
    {
      id: 2,
      title: '수원시 통합 도서관',
      icon: <img src={libraryIcon} alt="수원시 통합 도서관 아이콘" width="100%" height="100%" style={{ objectFit: 'contain' }} />
    },
    {
      id: 3,
      title: '지역도서관\n통합검색',
      icon: <img src={searchIcon} alt="지역도서관 통합검색 아이콘" width="100%" height="100%" style={{ objectFit: 'contain' }} />
    },
    {
      id: 4,
      title: '지하철 무인 대출',
      icon: <img src={subwayIcon} alt="지하철 무인 대출 아이콘" width="100%" height="100%" style={{ objectFit: 'contain' }} />
    }
  ];


  return (
    <>
      {/* 화면 낭독기를 위한 건너뛰기 링크 (접근성) */}
      <a href="#main-content" className="skip-link">
        본문 바로가기
      </a>
      
      <Header 
        currentPage={currentPage}
        searchQuery={searchQuery}
        onSearch={(q) => {
          setSearchQuery(q);
          const normalized = q.trim().replace(/\s/g, '');
          if (normalized === '노인과바다') {
            setCurrentPage('search-result');
          } else {
            alert(`'${q}'에 대한 검색 결과는 지원하지 않습니다. '노인과 바다'를 검색해 보세요!`);
          }
        }}
        onLogoClick={() => {
          setCurrentPage('home');
          setSearchQuery('');
        }}
      />
      
      <main id="main-content">
        <Suspense fallback={null}>
          {currentPage === 'home' ? (
          <>
            {/* Figma 380:651 노드 반영: 메인메뉴 (아이콘 모음) */}
            <section aria-labelledby="main-menu-heading" className="mainMenuSection">
              <h2 id="main-menu-heading" className="visually-hidden">메인 메뉴</h2>
              <div className="mainMenuGrid">
                {mainMenus.map((menu) => (
                  <button
                    key={menu.id}
                    className="menuItem"
                    aria-label={menu.title.replace('\n', ' ')}
                    id={`main-menu-item-${menu.id}`}
                    onClick={() => {
                      if (menu.id === 4) setCurrentPage('subway-loan');
                    }}
                  >
                    <div className="menuIconWrapper" aria-hidden="true">
                      {menu.icon}
                    </div>
                    <span className="menuText">{menu.title}</span>
                  </button>
                ))}
              </div>
              <div className="subwayInfoContainer">
                <div className="subwayInfoContent">
                  <h3 id="subway-info-heading" className="subwayInfoTitle">지하철 무인 대출이 무엇인가요?</h3>
                  <p className="subwayInfoDesc">
                    출퇴근길 도서관에 들릴 필요없이 역에서 대출, 반납 할 수 있어요.
                  </p>
                  <button
                    className="subwayInfoLink"
                    aria-label="지하철 무인 대출 자세히 알아보기"
                    onClick={() => setCurrentPage('subway-loan')}
                    id="subway-info-link-btn"
                  >
                    자세히 알아보기→
                  </button>
                </div>
                <div className="subwayInfoIcon" aria-hidden="true">
                  {/* 기차/지하철 아이콘 (Figma 디자인 반영) */}
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="16" rx="2" ry="2"></rect>
                    <path d="M4 11h16"></path>
                    <path d="M12 3v8"></path>
                    <path d="M8 19l-2 3"></path>
                    <path d="M16 19l2 3"></path>
                    <path d="M8 15h.01"></path>
                    <path d="M16 15h.01"></path>
                  </svg>
                </div>
              </div>
            </section>

            {/* Figma 380:667 (추천도서), 인기도서 캐러셀 - BookCarousel 컴포넌트 */}
            <BookCarousel
              title="추천도서"
              books={recommendedBooks}
              carouselId="recommended"
            />
            <BookCarousel
              title="인기도서"
              books={popularBooks}
              carouselId="popular"
            />
          </>
        ) : currentPage === 'subway-loan' ? (
          <SubwayLoanPage onBack={() => setCurrentPage('home')} />
        ) : currentPage === 'subway-reserve' ? (
          <SubwayReservePage 
            bookTitle={reserveBook.title}
            libraryName={reserveBook.library}
            onBack={() => setCurrentPage('search-result')}
            onConfirm={(selectedStation, estimatedDate) => {
              setReserveBook(prev => ({ ...prev, station: selectedStation, date: estimatedDate }));
              setCurrentPage('home');
              setShowSuccessPopup(true);
            }}
          />
        ) : (
          <SearchResultPage 
            searchQuery={searchQuery} 
            onReserve={(libraryName, bookTitle) => {
              setReserveBook({ title: bookTitle, library: libraryName });
              setCurrentPage('subway-reserve');
            }}
          />
        )}
        </Suspense>
      </main>

      {currentPage === 'home' && (
        <MyLibraryButton 
          onClick={() => {
            alert('나의 도서관 페이지로 이동합니다.');
          }} 
        />
      )}

      <Footer isHome={currentPage === 'home'} />

      {/* 최종 예약 확정 안내 팝업 (Figma 494:1966 시안) */}
      {showSuccessPopup && (
        <div 
          className="success-overlay"
          onClick={() => setShowSuccessPopup(false)}
          role="presentation"
        >
          <div 
            className="success-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-popup-title"
          >
            {/* 팝업 헤더 */}
            <div className="success-header">
              <h3 
                id="success-popup-title" 
                className="success-modal-title"
              >
                지하철 무인 대출 예약 안내
              </h3>
              <button 
                type="button" 
                onClick={() => setShowSuccessPopup(false)} 
                className="success-close-btn"
                aria-label="닫기"
              >
                X
              </button>
            </div>

            {/* 팝업 바디 */}
            <div className="success-body">
              <p className="success-main-info">
                {reserveBook.station} / {reserveBook.title} / {reserveBook.date}
              </p>
              <p className="success-sub-info">
                예약이 확정 되었습니다
              </p>
              <p className="success-warning-info">
                예약 완료 문자를 확인해 주세요.
              </p>
            </div>

            {/* 팝업 하단 액션 버튼 */}
            <div className="success-action-row">
              <button 
                type="button" 
                onClick={() => setShowSuccessPopup(false)} 
                className="btn-success-ok"
              >
                예약 확인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
