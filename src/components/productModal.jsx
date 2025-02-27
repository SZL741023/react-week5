import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";
function ProductModal({ tempProduct, isOpen, setIsOpen }) {
  const [modalData, setModalData] = useState(tempProduct);
  const [qtySelect, setQtySelect] = useState(1);
  const productModalRef = useRef(null);
  useEffect(() => {
    setModalData({
      ...tempProduct,
    });
  }, [tempProduct]);
  useEffect(() => {
    new Modal(productModalRef.current, { backdrop: false });
  }, []);

  const handleCloseModal = () => {
    // const modalInstance = Modal.getInstance(productModalRef.current);
    // modalInstance.hide();
    setIsOpen(false);
  };

  useEffect(() => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    if (isOpen) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }
  }, [isOpen]);
  return (
    <>
      <div
        ref={productModalRef}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="modal fade"
        id="productModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">產品名稱：{modalData.title}</h2>
              <button
                onClick={handleCloseModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={modalData.imageUrl}
                alt={modalData.title}
                className="img-fluid"
              />
              <p>內容：{modalData.content}</p>
              <p>描述：{modalData.description}</p>
              <p>
                價錢：{modalData.price} <del>{modalData.origin_price}</del> 元
              </p>
              <div className="input-group align-items-center">
                <label htmlFor="qtySelect">數量：</label>
                <select
                  value={qtySelect}
                  onChange={(e) => setQtySelect(e.target.value)}
                  id="qtySelect"
                  className="form-select"
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-end py-3">
        <button className="btn btn-outline-danger" type="button">
          清空購物車
        </button>
      </div>
    </>
  );
}

export default ProductModal;
