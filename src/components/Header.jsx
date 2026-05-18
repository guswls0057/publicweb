import React, { useState } from 'react';
import MyLibraryButton from './MyLibraryButton';
import './Header.css'; // 반응형 CSS 임포트

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    alert(`'${searchQuery}' 도서 예약 대출을 검색합니다.`);
  };

  return (
    <>
    <header className="header">
      {/* 1. 상단바 영역 (Figma 380:636 반영) */}
      <div className="topBar">
        <div className="topBarContainer">
          {/* 로고 영역 */}
          <div className="logoGroup">
            {/* 임시 로고 이미지 대체용 원형 */}
            <div className="logoImagePlaceholder"></div>
            <h1 className="logoText">수원시 통합 도서관</h1>
          </div>
          
          {/* 우측 아이콘 영역 (메뉴, 로그인) */}
          <nav aria-label="상단 유틸리티 메뉴" className="iconGroup">
            <button type="button" className="iconBtn" aria-label="로그인">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button type="button" className="iconBtn" aria-label="전체 메뉴 열기">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* 2. 피그마 380:647 노드 반영: 도서 검색 폼 영역 */}
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
    </header>

      {/* 스크롤 고정 나의 도서관 버튼 (피그마 380:704) */}
      <MyLibraryButton />
      </>
  );
};

export default Header;
