
import './SubwayLoanPage.css';

/* ══════════════════════════════════════════════════════════
   지하철 무인 대출 상세 페이지 (Figma 개선 디자인 시안 매칭)
   반응형 기반: 모바일, 태블릿, 데스크탑 최적화
   뒤로가기 버튼 탑재 및 Header/Footer 사이 배치 구조
   ══════════════════════════════════════════════════════════ */

const SubwayLoanPage = ({ onBack }) => {
  return (
    <div className="subway-loan-container">
      {/* 뒤로가기 버튼과 타이틀 영역 */}
      <div className="subway-loan-header">
        <button 
          onClick={onBack} 
          className="subway-loan-back-btn"
          aria-label="메인 페이지로 돌아가기"
        >
          <svg className="back-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>뒤로가기</span>
        </button>
        <h2 className="subway-loan-title">지하철 무인 대출</h2>
      </div>

      {/* 구분 점선 */}
      <div className="subway-loan-divider"></div>

      {/* 서비스 소개 회색 박스 */}
      <div className="subway-loan-intro">
        수원시민의 이용률이 높은 7개 지하철역사내에 설치된 무인도서관을 이용하여 도서대출 및 반납이 가능한 서비스
      </div>

      {/* 1. 이용대상 */}
      <section className="subway-loan-section">
        <h3 className="subway-loan-sec-title">이용대상</h3>
        <ul className="subway-loan-sec-list">
          <li className="text-red">
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 수원시 도서관에서 도서대출증을 발급받은 정회원
          </li>
        </ul>
      </section>

      {/* 2. 이용시간 */}
      <section className="subway-loan-section">
        <h3 className="subway-loan-sec-title">이용시간</h3>
        <ul className="subway-loan-sec-list">
          <li>
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 05:00 ~ 00:30
          </li>
        </ul>
      </section>

      {/* 3. 운영장소 및 제공서비스 */}
      <section className="subway-loan-section">
        <h3 className="subway-loan-sec-title">운영장소 및 제공서비스</h3>
        <div className="subway-loan-table-wrapper">
          <table className="subway-loan-table">
            <caption className="visually-hidden">지하철 무인 대출 서비스 운영장소 및 제공서비스 정보</caption>
            <thead>
              <tr>
                <th scope="col">구분</th>
                <th scope="col">설치위치</th>
                <th scope="col">제공서비스</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">수원역</th>
                <td>수원역 환승센터 대합실 C동</td>
                <td rowSpan="8" className="merged-service-cell">
                  도서관소정도서<br />예약대출/ 통합반납
                </td>
              </tr>
              <tr>
                <th scope="row">영통역</th>
                <td>2, 8번 출구(지하1층)</td>
              </tr>
              <tr>
                <th scope="row">청명역</th>
                <td>3번출입구 (지하1층)</td>
              </tr>
              <tr>
                <th scope="row">수원시청역</th>
                <td>주개찰구 옆(지하1층)</td>
              </tr>
              <tr>
                <th scope="row">성균관대역</th>
                <td>3번출구(3층) 환승주차장(4층) 연결통로</td>
              </tr>
              <tr>
                <th scope="row">고색역</th>
                <td>고색역 1, 2번 출구(지하1층)</td>
              </tr>
              <tr>
                <th scope="row">망포역</th>
                <td>타는곳 3, 4번 입구(지하1층)</td>
              </tr>
              <tr>
                <th scope="row">광교중앙역</th>
                <td>2번 출구(지하1층)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 이용방법 */}
      <section className="subway-loan-section">
        <h3 className="subway-loan-sec-title">이용방법</h3>
        <ul className="subway-loan-sec-list">
          <li>
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 근처 도서관에서 신분증 지참 후 도서대출증을 발급받는다.
          </li>
          <li>
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 신청가능 책 수 : 1인 1회 2권(월 4권)
          </li>
          <li>
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 대 상 : 수원시 공공도서관 소장도서 ('대출가능[비치중]' 상태 도서)
          </li>
          <li>
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 수령기간 : 도서예약 후 평일기준 3 ~ 5일 소요(수령가능 시 알림톡(또는 SMS) 전송) 도서투입 후 약 1일간(23시간 내외) 보관
          </li>
          <li>
            <span className="bullet-red-arrow" aria-hidden="true">▶</span> 대출저지 : 반납일을 초과한 경우 초과(연체)된 일수만큼 대출정지(수원시 도서관 열람규칙)
          </li>
          <li className="text-red-bold no-bullet">
            ※ 도서 신청 후 미대출 시 14일간 책나루(무인예약) 신청 제한
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SubwayLoanPage;
