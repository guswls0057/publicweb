import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookCarousel from './components/BookCarousel';
import SubwayLoanPage from './components/SubwayLoanPage';
import './App.css'; // 메인메뉴 및 추가 영역 CSS 임포트

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
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'subway-loan'
  const mainMenus = [
    {
      id: 1,
      title: '통합예약/신청',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      id: 2,
      title: '수원시 통합 도서관',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: '지역도서관\n통합검색',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: 4,
      title: '지하철 무인 대출',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M6 8h12"></path>
          <circle cx="8" cy="16" r="1"></circle>
          <circle cx="16" cy="16" r="1"></circle>
        </svg>
      )
    }
  ];

  // 지하철 무인 대출 페이지 렌더
  if (currentPage === 'subway-loan') {
    return (
      <SubwayLoanPage onBack={() => setCurrentPage('home')} />
    );
  }

  return (
    <>
      {/* 화면 낭독기를 위한 건너뛰기 링크 (접근성) */}
      <a href="#main-content" className="visually-hidden" style={{ position: 'absolute', top: 0, left: 0, padding: '10px', background: '#000', color: '#fff', zIndex: 100 }}>
        본문 바로가기
      </a>
      
      <Header />
      
      <main id="main-content">
        
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
      </main>
      <Footer />
    </>
  );
}

export default App;
