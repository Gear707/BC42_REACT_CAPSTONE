import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../slices/userSlice";
import { alertSuccess } from "../../apis/sweetAlert2";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = () => {
    // Chuyển sang trang signin
    navigate("/signin");
  };

  const handleSignout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
    alertSuccess("Đăng xuất thành công");
  };

  return (
    <Navbar bg="light" expand="lg" className={styles.header}>
      <Container fluid className="d-flex">
        <Navbar.Brand href="/" className="col-4 fw-bold">
          <i className="fa-solid fa-film"></i> MovieParadise
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/" className={styles.navLink}>
              Lịch Chiếu
            </Nav.Link>
            <Nav.Link href="/" className={styles.navLink}>
              Cụm Rạp
            </Nav.Link>
            <Nav.Link href="/" className={styles.navLink}>
              Tin Tức
            </Nav.Link>
            <Nav.Link href="/" className={styles.navLink}>
              Ứng Dụng
            </Nav.Link>
          </Nav>
          <div className="ms-auto">
            {user ? (
              <>
                <a
                  href="/"
                  className={`${styles.userLink} ${styles.borderRight} me-3`}
                >
                  <i className="fa-solid fa-user me-2" />
                  <span className="me-4">{user.taiKhoan}</span>
                </a>
                <button className={styles.userLink} onClick={handleSignout}>
                  <i className="fa-solid fa-arrow-right-from-bracket m-2" />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.userLink} ${styles.borderRight} me-3`}
                  onClick={handleSignin}
                >
                  <i className="fa-solid fa-user me-2" />
                  <span className="me-4">Đăng nhập</span>
                </button>
                <a href="/signup" className={styles.userLink}>
                  <i className="fa-regular fa-user m-2" />
                  <span>Đăng ký</span>
                </a>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
