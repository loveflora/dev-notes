import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <Nav>
      <Img src="/vercel.svg" />
      <div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Img = styled.img`
  max-width: 100px;
  margin-bottom: 5px;
`;

// nav a {
//   font-weight: 600;
//   font-size: 18px;
// }

// .active {
//   color: tomato;
// }
// nav div {
//   display: flex;
//   gap: 10px;
// }
// `}</style>
