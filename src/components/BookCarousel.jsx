import { useState, useEffect, useCallback } from 'react';
import './BookCarousel.css';

/**
 * BookCarousel - 도서 캐러셀 컴포넌트
 * 피그마 노드 380:667 "모바일/추천도서 캐러셀" 기반
 *
 * 레이아웃:
 *   [섹션 제목]
 *   [책표지 슬라이딩 트랙]
 *   [인디케이터(왼쪽)  방향버튼(오른쪽)] ← 하단 바
 *
 * 전환 효과: translateX 슬라이드 (왼→오른, 오른→왼)
 *
 * @param {string} title      - 섹션 제목 ("추천도서" | "인기도서")
 * @param {Array}  books      - 도서 데이터 배열 [{ id, src, alt }]
 * @param {string} carouselId - 접근성용 고유 ID
 */
const BookCarousel = ({ title, books, carouselId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  // 'left' | 'right' — 슬라이드 방향 (애니메이션용)
  const [slideDir, setSlideDir] = useState('right');
  // 애니메이션 트리거 key — 값이 바뀔 때마다 CSS animation 재실행
  const [animKey, setAnimKey] = useState(0);

  // 반응형: 768px 이상에서 5개, 미만은 3개
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const updateItems = (e) => {
      setItemsPerPage(e.matches ? 5 : 3);
      setCurrentPage(0);
    };
    updateItems(mq);
    mq.addEventListener('change', updateItems);
    return () => mq.removeEventListener('change', updateItems);
  }, []);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const goToPage = useCallback(
    (page, direction = 'right') => {
      const clamped = Math.max(0, Math.min(page, totalPages - 1));
      if (clamped === currentPage) return;
      setSlideDir(direction);
      setAnimKey((k) => k + 1);
      setCurrentPage(clamped);
    },
    [totalPages, currentPage]
  );

  const goPrev = () => goToPage(currentPage - 1, 'left');
  const goNext = () => goToPage(currentPage + 1, 'right');

  // 현재 페이지에 보일 도서 목록
  // 마지막 페이지에서는 슬라이스 시작점을 뒤로 당겨서
  // 항상 itemsPerPage수만큼의 실제 쇼표지를 표시
  const isLastPage = currentPage === totalPages - 1;
  const sliceStart = isLastPage
    ? Math.max(0, books.length - itemsPerPage)
    : currentPage * itemsPerPage;
  const visibleBooks = books.slice(sliceStart, sliceStart + itemsPerPage);

  const headingId = `${carouselId}-heading`;
  const regionId = `${carouselId}-region`;

  return (
    <section className="bookCarouselSection" aria-labelledby={headingId}>
      {/* 섹션 제목 */}
      <h2 id={headingId} className="bookCarouselTitle">
        {title}
      </h2>

      {/* 슬라이딩 트랙 뷰포트 (overflow: hidden) */}
      <div className="bookCarouselViewport">
        <div
          id={regionId}
          key={animKey}
          className={`bookCarouselTrack bookCarouselTrack--slide-${slideDir}`}
          role="region"
          aria-label={`${title} 목록`}
          aria-live="polite"
        >
          {visibleBooks.map((book) => {
            const isLcpCandidate = carouselId === 'recommended' && currentPage === 0;
            return (
              <a
                key={book.id}
                href={`#book-${book.id}`}
                className="bookCoverCard"
                aria-label={`${book.alt} 자세히 보기`}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <img
                  src={book.src}
                  alt={book.alt}
                  width={110}
                  height={162}
                  className="bookCoverImg"
                  loading={isLcpCandidate ? undefined : "lazy"}
                  fetchpriority={isLcpCandidate ? "high" : undefined}
                  draggable={false}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* ─── 하단 컨트롤 바 ─────────────────────────────
           피그마: layoutMode HORIZONTAL, primaryAxisAlignItems CENTER
           인디케이터(왼쪽) ←  200px 간격  → 방향버튼(오른쪽)
      ──────────────────────────────────────────────── */}
      <div className="carouselControls" role="group" aria-label={`${title} 컨트롤`}>

        {/* 인디케이터 도트 (클릭 불가, 표시용) */}
        {totalPages > 1 && (
          <div
            className="carouselIndicators"
            aria-hidden="true"
          >
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx}
                className={`indicatorDot${currentPage === idx ? ' indicatorDot--active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* 방향 버튼 그룹 — 피그마 "방향" FRAME: itemSpacing 3, 40×40px */}
        <div className="carouselNavGroup">
          {/* ← 이전 버튼 */}
          <button
            type="button"
            id={`${carouselId}-prev-btn`}
            className="carouselNavBtn carouselNavBtn--prev"
            onClick={goPrev}
            disabled={currentPage === 0}
            aria-label="이전 도서 목록"
            aria-controls={regionId}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* → 다음 버튼 */}
          <button
            type="button"
            id={`${carouselId}-next-btn`}
            className="carouselNavBtn carouselNavBtn--next"
            onClick={goNext}
            disabled={currentPage >= totalPages - 1}
            aria-label="다음 도서 목록"
            aria-controls={regionId}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookCarousel;
