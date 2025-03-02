import axios from "axios";
import { useState, useEffect } from "react";
import ProductModal from "./components/productModal";

const API_BASE = import.meta.env.VITE_API_BASEURL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);
  const [cartsData, setCartsData] = useState([]);
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/products/all`,
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartsData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartsData(response.data.data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  // NOTE: Add item in cart
  const addCartItem = async (product_id, qty) => {
    try {
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty),
        },
      });
      getCartsData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeeMore = (product) => {
    setTempProduct(product);
    setIsOpenProductModal(true);
  };
  useEffect(() => {
    getProducts();
    getCartsData();
  }, []);

  return (
    <div id="app">
      <div className="container">
        <div className="mt-4">
          {/* 產品Modal */}
          <ProductModal
            tempProduct={tempProduct}
            isOpen={isOpenProductModal}
            setIsOpen={setIsOpenProductModal}
            addCartItem={addCartItem}
          />
          {/* 產品Modal */}
          <table className="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ width: "200px" }}>
                    <img
                      className="img-fluid"
                      src={product.imageUrl}
                      alt={product.title}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <del className="h6">原價 {product.origin_price}</del>
                    <div className="h5">特價 {product.price}</div>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => handleSeeMore(product)}
                      >
                        <i className="fas fa-spinner fa-pulse"></i>
                        查看更多
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        <i className="fas fa-spinner fa-pulse"></i>
                        加到購物車
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <button className="btn btn-outline-danger" type="button">
              清空購物車
            </button>
          </div>
          {/* Cart rows here */}
          {/* NOTE: Cart data  */}
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style={{ width: "150px" }}>數量/單位</th>
                <th className="text-end">單價</th>
              </tr>
            </thead>

            <tbody>
              {cartsData.map((cart) => (
                <tr key={cart.product_id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                    >
                      x
                    </button>
                  </td>
                  <td>{cart.product.title}</td>
                  <td style={{ width: "150px" }}>
                    <div className="d-flex align-items-center">
                      <div className="btn-group me-2" role="group">
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm"
                        >
                          -
                        </button>
                        <span
                          className="btn border border-dark"
                          style={{ width: "50px", cursor: "auto" }}
                        >
                          {cart.qty}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm"
                        >
                          +
                        </button>
                      </div>
                      <span className="input-group-text bg-transparent border-0">
                        {cart.product.unit}
                      </span>
                    </div>
                  </td>
                  <td className="text-end">{cart.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  總計：
                </td>
                <td className="text-end" style={{ width: "130px" }}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="my-5 row justify-content-center">
          <form className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="請輸入 Email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名
              </label>
              <input
                id="name"
                name="姓名"
                type="text"
                className="form-control"
                placeholder="請輸入姓名"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                收件人電話
              </label>
              <input
                id="tel"
                name="電話"
                type="text"
                className="form-control"
                placeholder="請輸入電話"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                收件人地址
              </label>
              <input
                id="address"
                name="地址"
                type="text"
                className="form-control"
                placeholder="請輸入地址"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                id="message"
                className="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-danger">
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
