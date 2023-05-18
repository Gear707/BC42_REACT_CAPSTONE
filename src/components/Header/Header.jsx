import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Header.module.scss";
import "./canvasCustom.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signout } from "../../slices/userSlice";
import { alertSuccess, warningSignout } from "../../apis/sweetAlert2";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignout = () => {
    warningSignout()
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(signout());
          localStorage.removeItem("user");
          alertSuccess("Bạn đã đăng xuất thành công!");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleNavigateUser = () => {
    navigate("/user");
  };

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const scrollToComponent = (componentId) => {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showAdminLink = () => {
    if (!user || user.maLoaiNguoiDung !== "QuanTri") return null;
    return (
      <Nav.Link onClick={handleNavigateAdmin} className={styles.navLink}>
        Trang quản trị
      </Nav.Link>
    );
  };

  return (
    <Navbar bg="light" expand="xxl" className={styles.header} collapseOnSelect>
      <Container fluid className="d-flex">
        <Navbar.Brand href="/" className="col-4 fw-bold">
          <i className="fa-solid fa-film"></i> CyberMovie
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand"
          className={styles.toggleBtn}
        />
        <Navbar.Offcanvas id="offcanvasNavbar-expand" placement="start">
          <Offcanvas.Body>
            <Nav
              className={`${styles.navMenu} m-0 my-lg-0`}
              navbarScroll
            >
              <Nav.Link
                as={Link}
                to="#"
                className={styles.navLink}
                onClick={() => scrollToComponent("schedule")}
              >
                Lịch Chiếu
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#"
                className={styles.navLink}
                onClick={() => scrollToComponent("cinema")}
              >
                Cụm Rạp
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="#"
                className={styles.navLink}
                onClick={() => scrollToComponent("contact")}
              >
                Liên hệ
              </Nav.Link>
              {showAdminLink()}
            </Nav>
            <div className={styles.navRight}>
              {user ? (
                <>
                  <button
                    className={`${styles.userLink} ${styles.borderRight} me-4`}
                    onClick={handleNavigateUser}
                  >
                    <img className={`${styles.userAvatar} me-2`}
                      src="https://i.pravatar.cc/300?u=abc123"
                      alt={user.taiKhoan}
                    />
                    <span className="me-4">{user.taiKhoan}</span>
                  </button>
                  <button className={styles.userLink} onClick={handleSignout}>
                    <i className="fa-solid fa-arrow-right-from-bracket mt-2 me-2" />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`${styles.userLink} ${styles.borderRight} me-4`}
                    onClick={handleSignin}
                  >
                    <i className="fa-solid fa-user me-2" />
                    <span className="me-4">Đăng nhập</span>
                  </button>
                  <a href="/signup" className={styles.userLink}>
                    <i className="fa-regular fa-user mt-2 me-2" />
                    <span>Đăng ký</span>
                  </a>
                </>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
