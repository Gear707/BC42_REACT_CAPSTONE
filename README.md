### Thư viện
- Routing: react-router-dom
- Redux: @reduxjs/toolkit, react-redux
- API: axios
- Styles: sass
- UI: react-bootstrap, material-ui,...

### Cấu trúc project

- src/
  - components/
    - Chứa các presentational component (Các component thuần về giao diện có thể tái sử dụng ở nhiều nơi trong ứng dụng). VD: Button, Sidebar, Header,...
    - Các components này thường sẽ chỉ có local state và nhận vào props để hiển thị giao diện, thường không chứa logic nghiệp vụ của ứng dụng (call API)

  - modules/
    - Chứa các components đại diện cho 1 chức năng/trang cụ thể trong ứng dụng
    - Các components này thường sẽ có chứa logic nghiệp vụ của ứng dụng (call API, redux,...)

  - apis/
    - Chứa phần setup các phương thức gọi API
    - Chứa các hàm gọi API