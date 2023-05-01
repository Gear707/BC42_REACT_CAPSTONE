import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

function Header() {
    const { user } = useSelector((state) => state.user);

    return (
        <Navbar bg="light" expand="lg" className={styles.header}>
            <Container fluid className="d-flex">
                <Navbar.Brand href="/" className="col-4">
                    <i className="fa-solid fa-film"></i> MovieParadise
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="my-2 my-lg-0" navbarScroll>
                        <Nav.Link href="/" className={styles.navLink}>Lịch Chiếu</Nav.Link>
                        <Nav.Link href="/" className={styles.navLink}>Cụm Rạp</Nav.Link>
                        <Nav.Link href="/" className={styles.navLink}>Tin Tức</Nav.Link>
                        <Nav.Link href="/" className={styles.navLink}>Ứng Dụng</Nav.Link>
                    </Nav>
                    <div className="ms-auto">
                        {user ?
                            (<>
                                <a href="/" className={`${styles.userLink} ${styles.borderRight} me-3`}>
                                    <i className="fa-solid fa-user me-2" />
                                    <span className="me-4">{user.taiKhoan}</span>
                                </a>
                                <a href="/" className={styles.userLink}>
                                    <i className="fa-solid fa-arrow-right-from-bracket m-2" />
                                    <span>Đăng xuất</span>
                                </a>
                            </>
                            )
                            :
                            (<>
                                <a href="/signin" className={`${styles.userLink} ${styles.borderRight} me-3`}>
                                    <i className="fa-solid fa-user me-2" />
                                    <span className="me-4">Đăng nhập</span>
                                </a>
                                <a href="/signup" className={styles.userLink}>
                                    <i className="fa-regular fa-user m-2" />
                                    <span>Đăng ký</span>
                                </a>
                            </>
                            )
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;