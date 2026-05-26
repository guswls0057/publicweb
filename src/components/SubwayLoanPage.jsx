import React, { useState } from 'react';
import './SubwayLoanPage.css';

/* ══════════════════════════════════════════════════════════
   지하철 무인 대출 페이지
   피그마 node-id: 239-437 (전체 페이지), 188-3048 (도서검색폼)
   주조색: #2859c5  /  배경: #f5f5f5
   반응형: 모바일(~767px) / 태블릿(768~1023px) / 데스크탑(1024px~)
══════════════════════════════════════════════════════════ */

/* ── 검색 아이콘 (피그마 bitcoin-icons:search-outline 참고) ── */
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/>
    <line x1="16.5" y1="16.5" x2="22" y2="22"/>
  </svg>
);

/* ── 이용 방법 4단계 ── */
const STEPS = [
  {
    step: '01',
    title: '앱에서 도서 예약',
    desc: '수원시 통합도서관 앱 또는 홈페이지에서 원하는 도서를 검색하고 무인 대출 예약을 선택하세요.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="4" width="32" height="48" rx="4" fill="#e8eef9" stroke="#2859c5" strokeWidth="2"/>
        <rect x="17" y="10" width="22" height="14" rx="2" fill="#2859c5" fillOpacity="0.15"/>
        <path d="M19 30h18M19 36h12M19 42h15" stroke="#2859c5" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="42" cy="42" r="9" fill="#2859c5"/>
        <path d="M39 42l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: '지하철역 무인기 방문',
    desc: '예약하신 역의 지하철 무인 대출기를 찾아주세요. 역사 내 안내표지를 따라가시면 쉽게 찾을 수 있어요.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="40" height="32" rx="4" fill="#e8eef9" stroke="#2859c5" strokeWidth="2"/>
        <rect x="14" y="18" width="12" height="20" rx="2" fill="#2859c5" fillOpacity="0.2"/>
        <rect x="30" y="18" width="12" height="20" rx="2" fill="#2859c5" fillOpacity="0.2"/>
        <path d="M14 28h28" stroke="#2859c5" strokeWidth="1.5"/>
        <circle cx="20" cy="44" r="3" fill="#2859c5" fillOpacity="0.5"/>
        <circle cx="36" cy="44" r="3" fill="#2859c5" fillOpacity="0.5"/>
        <path d="M4 50h48" stroke="#2859c5" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: '회원카드 / QR 인증',
    desc: '도서관 회원카드 또는 앱의 QR코드를 무인기 화면에 스캔하여 본인 인증을 완료해 주세요.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="4" width="24" height="48" rx="4" fill="#e8eef9" stroke="#2859c5" strokeWidth="2"/>
        <rect x="20" y="10" width="16" height="10" rx="1.5" fill="#2859c5" fillOpacity="0.3"/>
        <rect x="21" y="24" width="4" height="4" fill="#2859c5"/>
        <rect x="27" y="24" width="4" height="4" fill="#2859c5"/>
        <rect x="21" y="30" width="4" height="4" fill="#2859c5"/>
        <rect x="27" y="30" width="4" height="4" fill="#2859c5"/>
        <rect x="33" y="24" width="2" height="2" fill="#2859c5"/>
        <rect x="33" y="30" width="2" height="6" fill="#2859c5"/>
        <circle cx="28" cy="46" r="3" fill="#2859c5" fillOpacity="0.4"/>
      </svg>
    ),
  },
  {
    step: '04',
    title: '도서 대출 완료!',
    desc: '무인기에서 예약하신 도서를 꺼내면 대출이 완료됩니다. 반납도 동일한 무인기에서 가능해요.',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="28" height="36" rx="3" fill="#e8eef9" stroke="#2859c5" strokeWidth="2"/>
        <path d="M13 26h18M13 32h14M13 38h16" stroke="#2859c5" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="16" y="16" width="12" height="6" rx="2" fill="#2859c5" fillOpacity="0.4"/>
        <circle cx="42" cy="38" r="10" fill="#2859c5"/>
        <path d="M37 38l3.5 3.5L47 33" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ── 설치 역 목록 ── */
const STATIONS = [
  {
    id: 'hwaseo',
    line: '1호선',
    lineColor: '#0052A4',
    name: '화서역',
    location: '1번 출구 쪽 지하 1층',
    hours: '평일 07:00 ~ 22:00 / 주말 09:00 ~ 18:00',
    books: 42,
    available: true,
  },
  {
    id: 'suwon',
    line: '1호선',
    lineColor: '#0052A4',
    name: '수원역',
    location: '9번 출구 지하 1층 대합실',
    hours: '평일 07:00 ~ 22:00 / 주말 09:00 ~ 18:00',
    books: 68,
    available: true,
  },
  {
    id: 'suwoncity',
    line: '수인·분당선',
    lineColor: '#F5A200',
    name: '수원시청역',
    location: '3번 출구 쪽 지하 1층',
    hours: '평일 07:00 ~ 22:00 / 주말 09:00 ~ 18:00',
    books: 51,
    available: true,
  },
  {
    id: 'sungkyunkwan',
    line: '수인·분당선',
    lineColor: '#F5A200',
    name: '성균관대역',
    location: '2번 출구 지하 1층',
    hours: '평일 07:00 ~ 22:00 / 주말 09:00 ~ 18:00',
    books: 35,
    available: true,
  },
  {
    id: 'maetan',
    line: '수인·분당선',
    lineColor: '#F5A200',
    name: '매탄권선역',
    location: '1번 출구 대합실',
    hours: '점검중',
    books: 0,
    available: false,
  },
  {
    id: 'mangpo',
    line: '수인·분당선',
    lineColor: '#F5A200',
    name: '망포역',
    location: '4번 출구 지하 1층',
    hours: '평일 07:00 ~ 22:00 / 주말 09:00 ~ 18:00',
    books: 29,
    available: true,
  },
];

/* ══ 메인 컴포넌트 ══ */
const SubwayLoanPage = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`"${query}" 검색 결과 페이지로 이동합니다.`);
    }
  };

  const toggleStation = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="slpPage" id="subway-loan-page">

      {/* ━━━ 상단 네비 바 ━━━ */}
      <nav className="slpNav" aria-label="지하철 무인 대출 페이지 네비게이션">
        <button
          id="slp-back-btn"
          className="slpNavBack"
          onClick={onBack}
          aria-label="메인 페이지로 돌아가기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span className="slpNavTitle">지하철 무인 대출</span>
        <div className="slpNavGap" aria-hidden="true"/>
      </nav>

      {/* ━━━ 도서 검색 섹션 (피그마 188-3048 도서검색폼) ━━━
           배경: 메인 헤더 파란색 섹션과 동일하게 #2859c5 사용 */}
      <section className="slpSearchSection" aria-label="도서 검색">
        <div className="slpSearchInner">
          {/* 안내 문구: 피그마 "찾으시는 책을 검색하세요." Bold 16px */}
          <p className="slpSearchLabel" id="slp-search-label">
            찾으시는 책을 검색하세요.
          </p>

          {/* 검색 폼: 피그마 도서검색 폼 구조 그대로
              - 입력: 흰색 배경, #2859c5 보더 2px, radius 8px, height 44px, padding 16px
              - 버튼: #2859c5 배경, radius 8px, 44×44px */}
          <form
            className="slpSearchForm"
            onSubmit={handleSearch}
            role="search"
            aria-label="도서 검색 폼"
          >
            <input
              id="slp-search-input"
              type="search"
              className="slpSearchInput"
              placeholder="도서 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-labelledby="slp-search-label"
              autoComplete="off"
            />
            <button
              id="slp-search-btn"
              type="submit"
              className="slpSearchBtn"
              aria-label="검색"
            >
              <SearchIcon />
            </button>
          </form>

          {/* 서비스 소개 태그 */}
          <p className="slpSearchSub">
            출퇴근길 지하철역에서 <strong>대출·반납</strong> 모두 가능
          </p>
        </div>
      </section>

      {/* ━━━ 이용 방법 ━━━ */}
      <section className="slpSection" aria-labelledby="steps-heading">
        <div className="slpSectionInner">
          <h2 id="steps-heading" className="slpSectionTitle">이용 방법</h2>
          <ol className="slpStepList">
            {STEPS.map((s) => (
              <li key={s.step} className="slpStepItem">
                <div className="slpStepBadge" aria-label={`${s.step}단계`}>{s.step}</div>
                <div className="slpStepIcon" aria-hidden="true">{s.icon}</div>
                <div className="slpStepBody">
                  <strong className="slpStepTitle">{s.title}</strong>
                  <p className="slpStepDesc">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ━━━ 무인기 설치 역 ━━━ */}
      <section className="slpSection slpSectionAlt" aria-labelledby="stations-heading">
        <div className="slpSectionInner">
          <h2 id="stations-heading" className="slpSectionTitle">무인 대출기 설치 역</h2>
          <p className="slpSectionSub">총 {STATIONS.length}개 역 운영 중</p>
          <ul className="slpStationList" role="list">
            {STATIONS.map((st) => (
              <li key={st.id}>
                <button
                  id={`station-${st.id}`}
                  className={`slpStationCard${expandedId === st.id ? ' is-open' : ''}${!st.available ? ' is-closed' : ''}`}
                  onClick={() => toggleStation(st.id)}
                  aria-expanded={expandedId === st.id}
                >
                  <div className="slpCardTop">
                    <div className="slpCardLeft">
                      <span className="slpLineBadge" style={{ background: st.lineColor }}>
                        {st.line}
                      </span>
                      <span className="slpCardName">{st.name}</span>
                    </div>
                    <div className="slpCardRight">
                      <span className={`slpStatusTag${st.available ? ' on' : ' off'}`}>
                        {st.available ? '운영중' : '점검중'}
                      </span>
                      <svg className="slpChevron" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>

                  {expandedId === st.id && (
                    <div className="slpCardDetail">
                      <ul className="slpDetailList">
                        <li className="slpDetailItem">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#2859c5" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{st.location}</span>
                        </li>
                        <li className="slpDetailItem">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#2859c5" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{st.hours}</span>
                        </li>
                        {st.available && (
                          <li className="slpDetailItem">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="#2859c5" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            <span>보유 도서 <strong>{st.books}권</strong></span>
                          </li>
                        )}
                      </ul>
                      {st.available && (
                        <button
                          id={`reserve-${st.id}`}
                          className="slpReserveBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`${st.name} 대출 예약 페이지로 이동합니다.`);
                          }}
                        >
                          이 역에서 대출 예약하기
                        </button>
                      )}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ━━━ 이용 안내 ━━━ */}
      <section className="slpSection" aria-labelledby="notice-heading">
        <div className="slpSectionInner">
          <h2 id="notice-heading" className="slpSectionTitle">이용 안내</h2>
          <ul className="slpNoticeList">
            {[
              ['대출 기간', '예약 후 3일 이내에 해당 역 무인기에서 수령하세요.'],
              ['대출 권수', '1인 최대 5권까지 대출 가능합니다.'],
              ['반납 기간', '대출 기간은 14일이며, 앱에서 1회 연장 가능합니다.'],
              ['반납 장소', '수원시 어느 무인기에서든 반납 가능합니다.'],
              ['문의', '031-228-4500 (수원시 통합도서관 대표)'],
            ].map(([label, text]) => (
              <li key={label} className="slpNoticeItem">
                <strong className="slpNoticeLabel">{label}</strong>
                <span className="slpNoticeText">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="slpBottom" aria-hidden="true"/>
    </div>
  );
};

export default SubwayLoanPage;
