import { useState } from 'react';
import './Footer.css';
import blogicon from '../assets/blog-icon.png';
import facebookicon from '../assets/facebook-icon.png';
import instagramicon from '../assets/instagram-icon.png';

const libraries = [
  { value: 'central', label: '중앙도서관' },
  { value: 'paldal', label: '팔달도서관' },
  { value: 'gwanggyo', label: '광교도서관' },
  { value: 'yeongtong', label: '영통도서관' },
];

export default function Footer() {
  const [selectedLibrary, setSelectedLibrary] = useState('central');

  const handleGo = () => {
    console.log('선택된 도서관:', selectedLibrary);
    // 원하는 동작 추가
  };

  return (
    <footer className="site-footer">
      <div className="footer-info-section">
        <div className="footer-selector">
          <div className="selector-group">
            <span className="privacy-policy">개인정보처리방침</span>
            <span className="terms-of-use">홈페이지이용약관</span>
          </div>

          <div className="library-form">
            <label htmlFor="library-select-combobox" className="visually-hidden">도서관 홈페이지 이동 선택</label>
            <select 
              id="library-select-combobox"
              value={selectedLibrary} 
              onChange={(e) => setSelectedLibrary(e.target.value)}
              className="library-select"
            >
              {libraries.map((lib) => (
                <option key={lib.value} value={lib.value}>
                  {lib.label}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleGo} className="go-button">GO</button>
          </div>
        </div>

        <div className="footer-address">
          16258, 경기도 수원시 팔달구 신풍로23번길68(신풍동)
        </div>

        <div className="footer-contact">
          <span>전화 : 031-5191-1251 / 1899-3300</span>
          <span>팩스 : 031-369-2041</span>
        </div>

        <div className="footer-copyright">
          COPYRIGHT BY 수원시 도서관사업소 ALL RIGHT RESERVED.
        </div>

        <div className="footer-social">
          <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" aria-label="수원시 도서관 블로그 새창으로 열기">
            <img src={blogicon} alt="블로그" width={60} height={60} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="수원시 도서관 페이스북 새창으로 열기">
            <img src={facebookicon} alt="페이스북" width={60} height={60} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="수원시 도서관 인스타그램 새창으로 열기">
            <img src={instagramicon} alt="인스타그램" width={60} height={60} />
          </a>
        </div>
      </div>
    </footer>
  );
}