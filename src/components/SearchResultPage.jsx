import { useState } from 'react';
import './SearchResultPage.css';

/* ══════════════════════════════════════════════════════════
   도서 검색 결과 페이지 컴포넌트 (피그마 node-id: 380-839 매칭)
   반응형 모바일, 태블릿, 데스크탑 최적화
   소장정보 아코디언 기능 및 지하철 무인 대출 예약 연동
   ══════════════════════════════════════════════════════════ */

const COMMON_BOOK_INFO = {
  title: '노인과바다',
  author: '어네스트 헤밍웨이 지음 ; 정홍택 옮김',
  publisher: '중앙',
  year: '2009',
  category: '[서수원]어린이자료실',
  callNumber: '아 808.9-사15ㅈ-64',
  status: '대출가능(비치중)',
  isAvailable: true,
  reserveLimit: '0/2',
  reserveInfo: '대출중인 자료만 예약가능',
};

const BOOKS_DATA = [
  {
    ...COMMON_BOOK_INFO,
    id: 1,
    coverImage: `${import.meta.env.BASE_URL}book01.svg`,
    holdings: [
      {
        id: 'hold-1',
        library: '서수원',
        location: '[서수원]서고(일반)-데스크 문의',
        callNo: '843-헤38ㄴ',
        statusText: '○ 대출가능(비치중)',
        isAvailable: true,
        buttonText: '지하철 무인 대출 예약',
      },
      {
        id: 'hold-2',
        library: '선경',
        location: '[선경]종합자료실',
        callNo: '843-헤38ㄴ=2',
        statusText: 'X 대출불가(대출중)',
        isAvailable: false,
        buttonText: '지하철 무인 대출 예약',
      }
    ]
  },
  {
    ...COMMON_BOOK_INFO,
    id: 2,
    coverImage: `${import.meta.env.BASE_URL}book02.svg`,
    holdings: [
      {
        id: 'hold-3',
        library: '중앙',
        location: '[중앙]종합자료실',
        callNo: '843-헤38ㄴ-11',
        statusText: '○ 대출가능(비치중)',
        isAvailable: true,
        buttonText: '지하철 무인 대출 예약',
      }
    ]
  },
  {
    ...COMMON_BOOK_INFO,
    id: 3,
    coverImage: `${import.meta.env.BASE_URL}book03.svg`,
    holdings: [
      {
        id: 'hold-4',
        library: '영통',
        location: '[영통]종합자료실',
        callNo: '843-헤38ㄴ-15',
        statusText: '○ 대출가능(비치중)',
        isAvailable: true,
        buttonText: '지하철 무인 대출 예약',
      }
    ]
  },
  {
    ...COMMON_BOOK_INFO,
    id: 4,
    coverImage: `${import.meta.env.BASE_URL}book04.svg`,
    holdings: [
      {
        id: 'hold-5',
        library: '팔달',
        location: '[팔달]종합자료실',
        callNo: '843-헤38ㄴ-22',
        statusText: '○ 대출가능(비치중)',
        isAvailable: true,
        buttonText: '지하철 무인 대출 예약',
      }
    ]
  }
];

const SearchResultPage = ({ onReserve }) => {
  // 어떤 책의 소장 정보 아코디언이 열려 있는지 보관하는 state (시안과 일치시키기 위해 1번 도서 기본 활성화)
  const [expandedBookId, setExpandedBookId] = useState(1);

  const toggleHoldings = (bookId) => {
    setExpandedBookId((prev) => (prev === bookId ? null : bookId));
  };

  return (
    <div className="search-result-container">
      <h2 className="visually-hidden">도서 검색 결과</h2>
      {/* 도서 목록 리스트 */}
      <div className="search-result-list">
        {BOOKS_DATA.map((book) => {
          const isExpanded = expandedBookId === book.id;

          return (
            <article key={book.id} className="book-card-item">
              
              {/* 도서 기본 정보 레이아웃 */}
              <div className="book-card-main">
                {/* 도서 표지 이미지 - 실제 표지 이미지가 있는 경우 렌더링하고 없는 경우 플레이스홀더 표시 */}
                <div className="book-cover-wrapper">
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={`${book.title} 표지`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div className="book-cover-placeholder" aria-hidden="true"></div>
                  )}
                </div>

                {/* 도서 서지 정보 */}
                <div className="book-meta-info">
                  <h3 className="book-title">{book.title}</h3>
                  <dl className="book-meta-list">
                    <div className="meta-row">
                      <dt>저자</dt>
                      <dd>{book.author}</dd>
                    </div>
                    <div className="meta-row">
                      <dt>발행처</dt>
                      <dd>{book.publisher}</dd>
                    </div>
                    <div className="meta-row">
                      <dt>발행년</dt>
                      <dd>{book.year}</dd>
                    </div>
                    <div className="meta-row">
                      <dt>자료위치</dt>
                      <dd>{book.category}</dd>
                    </div>
                    <div className="meta-row">
                      <dt>청구기호</dt>
                      <dd>{book.callNumber}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* 대출 가능 태그 박스 */}
              <div className="book-loan-status-box">
                <span className="loan-status-tag active">
                  [ {book.status} ]
                </span>
                <div className="loan-status-desc">
                  <span>예약대기수 : <strong>{book.reserveLimit}</strong></span>
                  <span>{book.reserveInfo}</span>
                </div>
              </div>

              {/* 소장정보 아코디언 토글 버튼 */}
              <button
                onClick={() => toggleHoldings(book.id)}
                className={`holdings-toggle-btn ${isExpanded ? 'is-open' : ''}`}
                aria-expanded={isExpanded}
                aria-controls={`holdings-panel-${book.id}`}
              >
                <span>▽ 소장정보</span>
              </button>

              {/* 소장 정보 상세 패널 (아코디언 영역) */}
              {isExpanded && book.holdings && (
                <div 
                  id={`holdings-panel-${book.id}`} 
                  className="holdings-detail-panel"
                >
                  <div className="holdings-panel-inner">
                    {/* 소장도서관 헤더 */}
                    <div className="holdings-header-bar">
                      소장도서관 <span className="highlight-red">{book.holdings.length}</span>
                    </div>

                    {/* 소장처 카드 리스트 */}
                    <div className="holdings-cards-list">
                      {book.holdings.map((hold) => (
                        <div 
                          key={hold.id} 
                          className={`holding-library-card ${hold.isAvailable ? 'available' : 'unavailable'}`}
                        >
                          <div className="holding-card-top">
                            <strong className="holding-library-name">{hold.library}</strong>
                            <span className={`holding-status-badge ${hold.isAvailable ? 'available' : 'unavailable'}`}>
                              {hold.statusText}
                            </span>
                          </div>

                          <div className="holding-card-body">
                            <p className="holding-location">{hold.location}</p>
                            <p className="holding-call-no">{hold.callNo}</p>
                          </div>

                          <div className="holding-card-action">
                            <button
                              onClick={() => {
                                if (hold.isAvailable) {
                                  onReserve(hold.library, book.title);
                                }
                              }}
                              className={`subway-reserve-btn ${hold.isAvailable ? 'active' : 'disabled'}`}
                              disabled={!hold.isAvailable}
                            >
                              {hold.buttonText}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </article>
          );
        })}
      </div>

      {/* 페이지네이션 (피그마 시안 포맷 매치) */}
      <nav className="search-result-pagination" aria-label="검색 결과 페이지 선택">
        <ul className="pagination-list">
          <li className="page-nav-arrow"><button type="button" aria-label="처음 페이지로 이동">≪</button></li>
          <li className="page-nav-arrow"><button type="button" aria-label="이전 10페이지로 이동">＜</button></li>
          <li className="page-number-item active"><button type="button" aria-current="page" aria-label="1페이지">1</button></li>
          <li className="page-number-item"><button type="button" aria-label="2페이지로 이동">2</button></li>
          <li className="page-number-item"><button type="button" aria-label="3페이지로 이동">3</button></li>
          <li className="page-number-item"><button type="button" aria-label="4페이지로 이동">4</button></li>
          <li className="page-number-item"><button type="button" aria-label="5페이지로 이동">5</button></li>
          <li className="page-number-item"><button type="button" aria-label="6페이지로 이동">6</button></li>
          <li className="page-number-item"><button type="button" aria-label="7페이지로 이동">7</button></li>
          <li className="page-number-item"><button type="button" aria-label="8페이지로 이동">8</button></li>
          <li className="page-number-item"><button type="button" aria-label="9페이지로 이동">9</button></li>
          <li className="page-number-item"><button type="button" aria-label="10페이지로 이동">10</button></li>
          <li className="page-nav-arrow"><button type="button" aria-label="다음 10페이지로 이동">＞</button></li>
          <li className="page-nav-arrow"><button type="button" aria-label="마지막 페이지로 이동">≫</button></li>
        </ul>
      </nav>

    </div>
  );
};

export default SearchResultPage;
