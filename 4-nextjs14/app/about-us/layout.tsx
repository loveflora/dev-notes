export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      &copy; AboutUsLayout
    </div>
  );
}

// 상위폴더에 layout 파일이 있으면, 해당 파일을 활용하여 하위항목을 렌더링
// 상쇄하지 않고, 중첩됨
// about-us>company>sales 라우터에서도 해당 컴포넌트 확인 가능
