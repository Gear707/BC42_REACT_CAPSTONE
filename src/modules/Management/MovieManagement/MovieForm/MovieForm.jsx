import React from "react";
import { useForm } from "react-hook-form";
import { apiCreateMovie } from "../../../../apis/movieAPI";
import dayjs from "dayjs";
function MovieForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      trailer: "",
      hinhAnh: "",
      ngayKhoiChieu: "",
    },
  });

  const onSubmit = async (values) => {
    const ngayKhoiChieu = dayjs(values.ngaKhoiChieu).format("DD/MM/YYYY");
    const payload = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      ngayKhoiChieu: ngayKhoiChieu,
    };
    console.log(payload);

    try {
      await apiCreateMovie(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>MovieForm</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Tên Phim" {...register("tenPhim")} />
        </div>
        <div>
          <input placeholder="Bí Danh" {...register("biDanh")} />
        </div>
        <div>
          <input placeholder="Mô Tả" {...register("moTa")} />
        </div>
        <div>
          <input placeholder="Trailer" {...register("trailer")} />
        </div>
        <div>
          <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} />
        </div>
        <div>
          <input
            type="date"
            placeholder="Ngày Khởi Chiếu"
            {...register("ngayKhoiChieu")}
          />
        </div>
        <button onClick={onSubmit}>Thêm phim</button>
      </form>
    </div>
  );
}

export default MovieForm;
{
  /* <input type="file" multiple placeholder="Hình Ảnh" {...register("hinhAnh")} /> */
}
