import React, { useState } from "react";
import { useEffect } from "react";
import CustomModal from "./CustomModal";

const Problem2 = () => {
  const [currentModal, setCurrentModal] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(20);
  const [title, setTitle] = useState("");

  const handleClick = (val) => setCurrentModal(val);

  useEffect(() => {
    async function fetchData() {
      try {
        if (currentModal !== "") {
          const url =
            currentModal === "modalA"
              ? `https://contact.mediusware.com/api/contacts/?page_size=${pageSize}`
              : currentModal === "modalB"
              ? "https://contact.mediusware.com/api/country-contacts/United States/"
              : "";

          const response = await fetch(url);

          const data = await response.json();
          setContacts(data.results);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    }

    const currentTitle =
      currentModal === "modalA"
        ? "All Contacts"
        : currentModal === "modalB"
        ? "US Contacts"
        : "No data found!";

    setTitle(currentTitle);

    fetchData();
  }, [currentModal, pageSize]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            style={{ color: "#46139f" }}
            type="button"
            onClick={() => {
              handleClick("modalA");
            }}
          >
            All Contacts
          </button>

          <button
            className="btn btn-lg btn-outline-warning"
            style={{ color: "#ff7f50" }}
            type="button"
            onClick={() => {
              handleClick("modalB");
            }}
          >
            US Contacts
          </button>
        </div>

        {/* Modat start */}
        {(currentModal === "modalA" || currentModal === "modalB") && (
          <CustomModal
            title={title}
            contacts={contacts}
            setPageSize={setPageSize}
            handleClick={handleClick}
            loading={loading}
          />
        )}
        {/* Modat end */}
      </div>
    </div>
  );
};

export default Problem2;
