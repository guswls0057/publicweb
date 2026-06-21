import { useState, useEffect, useRef } from 'react';
import './SubwayReservePage.css';

/* ══════════════════════════════════════════════════════════
   지하철 무인 대출 예약 수령 장소 선택 페이지 컴포넌트
   - Figma 시안(node-id=494:2207) 매칭
   - 좌측 회색 역사 배지 및 우측 흰색 위치 카드 그리드 형태 구현
   - 웹 접근성 준수: 키보드 포커스 제어 및 선택 활성화
   ══════════════════════════════════════════════════════════ */

const SUBWAY_STATIONS = [
  { id: 'station-suwon', name: '수원역', desc: '수원역 환승센터 대합실' },
  { id: 'station-yeongtong', name: '영통역', desc: '영통역 2, 8번 출구(지하1층)' },
  { id: 'station-cheongmyeong', name: '청명역', desc: '3번 출입구(지하1층)' },
  { id: 'station-cityhall', name: '수원시청역', desc: '주개찰구 옆(지하1층)' },
  { id: 'station-skku', name: '성균관대역', desc: '3번출구(3층), 환승주차장(4층) 연결통로' },
  { id: 'station-gosaek', name: '고색역', desc: '고색역 1, 2번 출구(지하1층)' },
  { id: 'station-mangpo', name: '망포역', desc: '타는곳3, 4번 입구(지하1층)' },
  { id: 'station-gwanggyo', name: '광교중앙역', desc: '2번 출구(지하1층)' },
];

const SubwayReservePage = ({ bookTitle, libraryName, onBack, onConfirm }) => {
  const [selectedStation, setSelectedStation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  const titleRef = useRef(null);
  const confirmModalRef = useRef(null);
  const confirmTitleRef = useRef(null);
  const previouslyFocusedReserveBtn = useRef(null);

  // 컴포넌트 마운트 시 접근성을 위한 포커스 제어
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
    window.scrollTo(0, 0);
  }, []);

  // 예상 수령일 계산 (평일 기준 3일 뒤)
  const getEstimatedDate = () => {
    let date = new Date();
    let addedDays = 0;
    while (addedDays < 3) {
      date.setDate(date.getDate() + 1);
      let day = date.getDay();
      if (day !== 0 && day !== 6) { // 토(6), 일(0) 제외
        addedDays++;
      }
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    return `${yyyy}-${mm}-${dd}(${dayName})`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStation) {
      setErrorMsg('대출/반납 위치(역)을 선택해 주세요.');
      return;
    }
    setErrorMsg('');
    previouslyFocusedReserveBtn.current = document.activeElement;
    setIsConfirmOpen(true);
  };

  // 확정 팝업이 켜졌을 때 포커스 제어 (웹 접근성 준수)
  useEffect(() => {
    if (isConfirmOpen) {
      if (confirmTitleRef.current) {
        confirmTitleRef.current.focus();
      }
    } else {
      if (previouslyFocusedReserveBtn.current) {
        previouslyFocusedReserveBtn.current.focus();
      }
    }
  }, [isConfirmOpen]);

  // 팝업 내부 포커스 트랩 및 ESC 닫기 핸들러
  const handleConfirmKeyDown = (e) => {
    if (!isConfirmOpen) return;

    if (e.key === 'Escape') {
      setIsConfirmOpen(false);
      return;
    }

    if (e.key === 'Tab') {
      const focusable = confirmModalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div className="subway-reserve-container">
      {/* 뒤로가기 및 헤더 영역 (기존 디자인 구조 준수) */}
      <div className="subway-reserve-header">
        <button
          onClick={onBack}
          className="subway-reserve-back-btn"
          aria-label="이전 검색 결과로 돌아가기"
        >
          <svg className="back-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>뒤로가기</span>
        </button>
        <h2
          id="subway-reserve-heading"
          ref={titleRef}
          tabIndex="-1"
          className="subway-reserve-title"
        >
          지하철 무인 대출 예약
        </h2>
      </div>

      {/* 구분 점선 */}
      <div className="subway-reserve-divider"></div>

      {/* 안내 박스: ▼대출/반납 위치(역)을 선택해 주세요. */}
      <div className="subway-reserve-guide-box">
        ▼대출/반납 위치(역)을 선택해 주세요.
      </div>

      {/* 도서 정보 요약 표시 (웹 접근성을 위한 가시적 피드백 제공) */}
      <div className="reserve-book-summary">
        신청도서: <strong className="text-blue">{bookTitle}</strong> | 소장: <strong>{libraryName}도서관</strong>
      </div>

      {/* 역사 및 수령지 정보 선택 폼 */}
      <form onSubmit={handleSubmit} className="reserve-station-form">
        <fieldset className="reserve-station-fieldset">
          <legend className="visually-hidden">대출/반납 위치(역) 선택</legend>

          <div className="station-rows-list">
            {SUBWAY_STATIONS.map((station) => {
              const isChecked = selectedStation === station.name;

              return (
                <div
                  key={station.id}
                  className={`station-row-item ${isChecked ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    id={station.id}
                    name="subway-reserve-station"
                    value={station.name}
                    checked={isChecked}
                    onChange={(e) => {
                      setSelectedStation(e.target.value);
                      setErrorMsg('');
                    }}
                    className="station-row-radio-input"
                  />

                  {/* 좌측 역사 배지 (Label 클릭 바인딩) */}
                  <label
                    htmlFor={station.id}
                    className="station-badge-label"
                  >
                    {station.name}
                  </label>

                  {/* 우측 상세 위치 카드 */}
                  <label
                    htmlFor={station.id}
                    className="station-location-card-label"
                  >
                    <span>{station.desc}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        {/* 에러 피드백 */}
        {errorMsg && (
          <p className="reserve-form-error" role="alert">
            {errorMsg}
          </p>
        )}

        {/* 하단 선택 완료 버튼 영역 */}
        <div className="reserve-action-bar">
          <button
            type="submit"
            className="btn-reserve-submit"
          >
            선택
          </button>
        </div>
      </form>

      {/* 확정 안내 팝업 (Figma 494:2297 시안) */}
      {isConfirmOpen && (
        <div 
          className="confirm-overlay" 
          onClick={() => setIsConfirmOpen(false)}
          onKeyDown={handleConfirmKeyDown}
          role="presentation"
        >
          <div 
            className="confirm-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            ref={confirmModalRef}
          >
            {/* 팝업 헤더 */}
            <div className="confirm-header">
              <h3 
                id="confirm-title" 
                ref={confirmTitleRef}
                tabIndex="-1"
                className="confirm-modal-title"
              >
                지하철 무인 대출 예약 안내
              </h3>
              <button 
                type="button" 
                onClick={() => setIsConfirmOpen(false)} 
                className="confirm-close-btn"
                aria-label="닫기"
              >
                X
              </button>
            </div>

            {/* 팝업 바디 */}
            <div className="confirm-body">
              <p className="confirm-main-info">
                {selectedStation} / {bookTitle} / {getEstimatedDate()}
              </p>
              <p className="confirm-sub-info">
                예약 확정 하시겠습니까?
              </p>
              <p className="confirm-warning-info">
                ※ 도서 신청 후 미대출 시 14일간 지하철 무인 대출 신청 제한
              </p>
            </div>

            {/* 팝업 하단 제어 버튼 */}
            <div className="confirm-action-row">
              <button 
                type="button" 
                onClick={() => setIsConfirmOpen(false)} 
                className="btn-confirm-back"
              >
                되돌아가기
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsConfirmOpen(false);
                  onConfirm(selectedStation, getEstimatedDate());
                }} 
                className="btn-confirm-submit"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubwayReservePage;
