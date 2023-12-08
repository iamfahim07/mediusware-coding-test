import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import ModalC from "./ModalC";

export default function CustomModal({
  title,
  contacts,
  setPageSize,
  handleClick,
  loading,
}) {
  const [showModalC, setShowModalC] = useState(false);
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const divRef = useRef(null);

  const handleEven = () => {
    setIsChecked(!isChecked);
  };

  const filterByNumber = (obj) => {
    return search !== "" ? obj.phone.includes(search) : true;
  };

  const filterByEvenId = (obj) => {
    return isChecked ? obj.id % 2 === 0 : true;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((irems) => {
      irems.forEach((item) => {
        if (item.isIntersecting) {
          setPageSize((prev) => prev + 10);
        }
      });
    });
    if (divRef.current && contacts.length > 0) {
      observer.observe(divRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [contacts]);

  return (
    <>
      <Modal show centered size="lg" scrollable onHide={() => handleClick("")}>
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
            <input
              style={{
                borderRadius: "8px",
                position: "absolute",
                right: "50px",
              }}
              type="text"
              placeholder="search by number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <p>Loading...</p>}

          {contacts?.length === 0 && !loading && <p>No data found!</p>}

          {contacts?.length > 0 && !loading && (
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .filter(filterByNumber)
                  .filter(filterByEvenId)
                  .map((obj) => {
                    return (
                      <tr
                        key={Math.random()}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCountry(obj.country.name);
                          setShowModalC(true);
                        }}
                      >
                        <td>{obj.id}</td>
                        <td>{obj.phone}</td>
                        <td>{obj.country.name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          )}
          <div ref={divRef}></div>
        </Modal.Body>
        <Modal.Footer>
          <label style={{ position: "absolute", left: "15px" }}>
            <input type="checkbox" checked={isChecked} onChange={handleEven} />
            Only even
          </label>

          <button
            className="btn btn-outline-primary"
            style={{ color: "#46139f" }}
            type="button"
            onClick={() => handleClick("modalA")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-outline-warning"
            style={{ color: "#ff7f50" }}
            type="button"
            onClick={() => handleClick("modalB")}
          >
            US Contacts
          </button>
          <button
            className="btn btn-outline-warning"
            style={{ borderColor: "#46139f", background: "white" }}
            type="button"
            onClick={() => handleClick("")}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {showModalC && <ModalC country={country} setShowModalC={setShowModalC} />}
    </>
  );
}
