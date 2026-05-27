import React, { useState } from 'react';
import './SearchResultPage.css';

/* ══════════════════════════════════════════════════════════
   도서 검색 결과 페이지 컴포넌트 (피그마 node-id: 380-839 매칭)
   반응형 모바일, 태블릿, 데스크탑 최적화
   소장정보 아코디언 기능 및 지하철 무인 대출 예약 연동
   ══════════════════════════════════════════════════════════ */

const BOOKS_DATA = [
  {
    id: 1,
    title: '노인과 바다',
    author: '어니스트 헤밍웨이 저자, 황동규 옮김',
    publisher: '민음',
    year: '2003',
    category: '[국내단행본]일반자료실',
    callNumber: '808.9-민음ㅅ-v.84',
    status: '대출가능[비치중]',
    isAvailable: true,
    reserveLimit: '0/2',
    reserveInfo: '대출중인 자료만 예약가능',
    coverImage: `${import.meta.env.BASE_URL}book01.svg`,
    holdings: [
      {
        id: 'hold-1',
        library: '서수원',
        location: '[서수원](서고일반)-데스크 문의',
        callNo: '843-헤38ㄴ',
        statusText: '○ 대출가능(비치중)',
        isAvailable: true,
        buttonText: '지하철 무인 대출 예약',
      },
      {
        id: 'hold-2',
        library: '선경',
        location: '[선경]종합자료실',
        callNo: '843-헤38ㄴ-2',
        statusText: '× 대출불가(대출중)',
        isAvailable: false,
        buttonText: '자세히/무인 대출 예약',
      }
    ]
  },
  {
    id: 2,
    title: '노인과 바다',
    author: '어니스트 헤밍웨이 저자, 김욱동 옮김',
    publisher: '혜원',
    year: '2011',
    category: '[국내단행본]일반자료실',
    callNumber: '808.9-민음ㅅ-v.84',
    status: '대출가능[비치중]',
    isAvailable: true,
    reserveLimit: '0/2',
    reserveInfo: '대출중인 자료만 예약가능',
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
    id: 3,
    title: '노인과 바다',
    author: '어니스트 헤밍웨이 저자, 정회성 옮김',
    publisher: '공존',
    year: '2009',
    category: '[국내단행본]아동실',
    callNumber: '808.9-민음ㅅ-v.84',
    status: '대출가능[비치중]',
    isAvailable: true,
    reserveLimit: '0/2',
    reserveInfo: '대출중인 자료만 예약가능',
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
    id: 4,
    title: '노인과 바다',
    author: '어니스트 헤밍웨이 저자, 정태원 옮김',
    publisher: '동서',
    year: '2008',
    category: '[국내단행본]아동실',
    callNumber: '808.9-민음ㅅ-v.84',
    status: '대출가능[비치중]',
    isAvailable: true,
    reserveLimit: '0/2',
    reserveInfo: '대출중인 자료만 예약가능',
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

const SearchResultPage = ({ searchQuery }) => {
  // 어떤 책의 소장 정보 아코디언이 열려 있는지 보관하는 state
  const [expandedBookId, setExpandedBookId] = useState(null);

  const toggleHoldings = (bookId) => {
    setExpandedBookId((prev) => (prev === bookId ? null : bookId));
  };

  const handleReservation = (libraryName, bookTitle) => {
    alert(`[${libraryName}] 무인 대출기에 '${bookTitle}' 도서가 성공적으로 예약되었습니다.`);
  };

  return (
    <div className="search-result-container">
      {/* 도서 목록 리스트 */}
      <div className="search-result-list">
        {BOOKS_DATA.map((book) => {
          const isExpanded = expandedBookId === book.id;

          return (
            <article key={book.id} className="book-card-item">
              
              {/* 도서 기본 정보 레이아웃 */}
              <div className="book-card-main">
                {/* 도서 표지 이미지 */}
                <div className="book-cover-wrapper">
                  <img src={book.coverImage} alt={`${book.title} 표지`} className="book-cover-img" />
                </div>

                {/* 도서 서지 정보 */}
                <div className="book-meta-info">
                  <h4 className="book-title">{book.title}</h4>
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
                      <dt>자료분류</dt>
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
                <span>{isExpanded ? '▲ 소장정보 닫기' : '▼ 소장정보'}</span>
              </button>

              {/* 소장 정보 상세 패널 (아코디언 영역) */}
              {isExpanded && book.holdings && (
                <div 
                  id={`holdings-panel-${book.id}`} 
                  className="holdings-detail-panel"
                >
                  <div className="holdings-panel-inner">
                    {/* 수령도서관 헤더 */}
                    <div className="holdings-header-bar">
                      수령도서관 <span className="highlight-red">{book.holdings.length}</span>
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
                                  handleReservation(hold.library, book.title);
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
          <li className="page-nav-arrow"><button aria-label="처음 페이지로 이동">≪</button></li>
          <li className="page-nav-arrow"><button aria-label="이전 10페이지로 이동">＜</button></li>
          <li className="page-number-item active"><button>1</button></li>
          <li className="page-number-item"><button>2</button></li>
          <li className="page-number-item"><button>3</button></li>
          <li className="page-number-item"><button>4</button></li>
          <li className="page-number-item"><button>5</button></li>
          <li className="page-number-item"><button>6</button></li>
          <li className="page-number-item"><button>7</button></li>
          <li className="page-number-item"><button>8</button></li>
          <li className="page-number-item"><button>9</button></li>
          <li className="page-number-item"><button>10</button></li>
          <li className="page-nav-arrow"><button aria-label="다음 10페이지로 이동">＞</button></li>
          <li className="page-nav-arrow"><button aria-label="마지막 페이지로 이동">≫</button></li>
        </ul>
      </nav>

    </div>
  );
};

export default SearchResultPage;
