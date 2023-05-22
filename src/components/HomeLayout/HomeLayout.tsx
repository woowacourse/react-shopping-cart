import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "../../style/style";

function HomeLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default HomeLayout;
