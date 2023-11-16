import NavBar from "./NavBar";

export default function Layout({ children }) {
  // children : 하나의 component를 또 다른 component 안에 넣을 때 사용할 수 있음.
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
