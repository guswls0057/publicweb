import React, { useState } from 'react';
import './MyLibraryButton.css';

/**
 * 나의 도서관 고정 버튼
 * 피그마 노드 380:704 "My library icon container" 기반
 * - 80×80px 원형 컨테이너, 연한 파란색(#BFCEee) 배경
 * - 책 아이콘(si:book-duotone) + "나의 도서관" 텍스트
 * - 드롭 섀도우 + 이너 섀도우
 * - position: fixed로 스크롤해도 화면에 고정
 */
const MyLibraryButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // 나의 도서관 페이지로 이동하는 로직 (추후 라우터 연결)
    alert('나의 도서관으로 이동합니다.');
  };

  return (
    <button
      id="my-library-btn"
      className={`myLibraryBtn${isHovered ? ' myLibraryBtn--hovered' : ''}`}
      type="button"
      aria-label="나의 도서관으로 이동"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 책 아이콘 (si:book-duotone 기반 SVG) */}
      <span className="myLibraryBtn__icon" aria-hidden="true">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 듀오톤 효과: 배경 채우기 (16% 불투명도 검정) */}
          <path
            d="M6 5C6 3.895 6.895 3 8 3H22C23.105 3 24 3.895 24 5V25C24 26.105 23.105 27 22 27H8C6.895 27 6 26.105 6 25V5Z"
            fill="rgba(0,0,0,0.16)"
          />
          {/* 책 외형 선 (primary 색상) */}
          <path
            d="M6 5C6 3.895 6.895 3 8 3H22C23.105 3 24 3.895 24 5V25C24 26.105 23.105 27 22 27H8C6.895 27 6 26.105 6 25V5Z"
            stroke="#2859C5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 책 척추 선 */}
          <path
            d="M10 3V27"
            stroke="#2859C5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* 책 가로선 1 */}
          <path
            d="M14 9H20"
            stroke="#2859C5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* 책 가로선 2 */}
          <path
            d="M14 14H20"
            stroke="#2859C5"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* 텍스트: 나의 도서관 */}
      <span className="myLibraryBtn__label">나의 도서관</span>
    </button>
  );
};

export default MyLibraryButton;
