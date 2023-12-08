import Modal from "react-bootstrap/Modal";

export default function ModalC({ country, setShowModalC }) {
  return (
    <Modal
      show
      centered
      size="lg"
      scrollable
      onHide={() => setShowModalC(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This phone number is from {country}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-outline-warning"
          style={{ borderColor: "#46139f", background: "white" }}
          type="button"
          onClick={() => setShowModalC(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
