import { useState, useEffect, useRef } from 'react';
import './MyLibraryButton.css';

const MyLibraryButton = ({ onClick }) => {
  const buttonRef = useRef(null);
  
  // 초기 좌표 설정
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });
  const isMobile = useRef(window.innerWidth < 768);
  const [shouldRender, setShouldRender] = useState(window.innerWidth < 768);
  
  // 드래그 거리 (클릭 이벤트와 충돌을 방지하기 위함)
  const dragDistance = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      isMobile.current = mobile;
      setShouldRender(mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기값 설정
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (shouldRender && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const initialTop = 180; // 스크롤되더라도 고정된 위치 (검색창 아래 우측 부근)
      const initialLeft = window.innerWidth - rect.width - 16;
      setCoords({ x: initialLeft, y: initialTop });
    }
  }, [shouldRender]);

  const handleStart = (clientX, clientY) => {
    isDragging.current = true;
    dragDistance.current = 0;
    startCoords.current = {
      x: clientX - coords.x,
      y: clientY - coords.y,
    };
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging.current) return;

    let newX = clientX - startCoords.current.x;
    let newY = clientY - startCoords.current.y;

    const btnWidth = buttonRef.current ? buttonRef.current.offsetWidth : 84;
    const btnHeight = buttonRef.current ? buttonRef.current.offsetHeight : 84;

    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    if (newX < 0) newX = 0;
    if (newX > maxX) newX = maxX;
    if (newY < 0) newY = 0;
    if (newY > maxY) newY = maxY;

    setCoords({ x: newX, y: newY });
    dragDistance.current += 1;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  // 마우스 이벤트 핸들러
  const onMouseDown = (e) => {
    if (e.button !== 0) return; // 좌클릭만
    handleStart(e.clientX, e.clientY);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    handleEnd();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // 터치 이벤트 핸들러
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  const handleButtonClick = (e) => {
    // 드래그 움직임이 크다면 클릭 방지
    if (dragDistance.current > 5) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick();
    } else {
      alert("나의 도서관 페이지로 이동합니다.");
    }
  };

  if (!shouldRender) return null;

  return (
    <button
      ref={buttonRef}
      className="my-library-floating-btn"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleButtonClick}
      aria-label="나의 도서관 가기"
      type="button"
    >
      <div className="my-library-btn-content" aria-hidden="true">
        <svg className="my-library-icon" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        <span className="my-library-text">나의 도서관</span>
      </div>
    </button>
  );
};

export default MyLibraryButton;
