import { useState, useEffect } from 'react';
import './Header.css'; // 반응형 CSS 임포트

const mixboardLogo = `${import.meta.env.BASE_URL}mixboard-image.webp`;

const Header = ({ onSearch, onLogoClick, currentPage, searchQuery: propSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState(propSearchQuery || '');

  useEffect(() => {
    setSearchQuery(propSearchQuery || '');
  }, [propSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      alert(`'${searchQuery}' 도서 예약 대출을 검색합니다.`);
    }
  };

  return (
    <header className="header">
      {/* 1. 상단바 영역 (Figma 380:636 반영) */}
      <div className="topBar">
        <div className="topBarContainer">
          {/* 로고 영역 */}
          <div 
            className="logoGroup" 
            onClick={onLogoClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (onLogoClick && (e.key === 'Enter' || e.key === ' ')) {
                onLogoClick();
              }
            }}
            aria-label="수원시 도서관 사업소 메인페이지로 이동"
          >
            <img src={mixboardLogo} alt="믹스보드 로고" width={56} height={56} className="logoImagePlaceholder" />
            <h1 className="logoText">수원시 도서관 사업소</h1>
          </div>
          
          {/* 우측 아이콘 영역 (메뉴, 로그인) */}
          <nav aria-label="상단 유틸리티 메뉴" className="iconGroup">
            <button type="button" className="iconBtn" aria-label="로그인">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="iconBtnText">로그인</span>
            </button>
            <button type="button" className="iconBtn" aria-label="전체 메뉴 열기">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="iconBtnText">전체 메뉴</span>
            </button>
          </nav>
        </div>
      </div>

      {/* 데스크톱/태블릿 전용 GNB 서브메뉴 영역 */}
      <div className="gnbBar">
        <div className="gnbContainer">
          <nav aria-label="주요 서비스 메뉴" className="gnbNav">
            <a href="#electronic-library" className="gnbLink" onClick={(e) => { e.preventDefault(); alert('전자 도서관 서비스로 이동합니다.'); }}>전자 도서관</a>
            <a href="#about-library" className="gnbLink" onClick={(e) => { e.preventDefault(); alert('도서관 소개 서비스로 이동합니다.'); }}>도서관 소개</a>
            <a href="#my-library" className="gnbLink" onClick={(e) => { e.preventDefault(); alert('나의 도서관 서비스로 이동합니다.'); }}>나의 도서관</a>
            <a href="#hours-guide" className="gnbLink" onClick={(e) => { e.preventDefault(); alert('이용시간안내 서비스로 이동합니다.'); }}>이용시간안내</a>
          </nav>
        </div>
      </div>

      {/* 2. 피그마 380:647 노드 반영: 도서 검색 폼 영역 */}
      {currentPage !== 'subway-reserve' && (
        <div className="searchContainer">
          <h2 className="searchInstruction">찾으시는 책을 검색하세요.</h2>
          <form onSubmit={handleSearch} className="searchForm" role="search">
            <label htmlFor="header-search" className="visually-hidden">도서 검색</label>
            <input 
              id="header-search"
              type="search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="도서 검색" 
              className="searchInput"
              required
            />
            <button type="submit" className="searchIconBtn" aria-label="도서 검색">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
