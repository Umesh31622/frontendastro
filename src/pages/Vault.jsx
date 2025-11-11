import React, { useEffect, useState } from "react";
import { fetchVault } from "../api/api";
import ContentCard from "../components/ContentCard";

export default function Vault() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const getContents = async () => {
      try {
        const res = await fetchVault(); // token is automatic
        setContents(res.data);
      } catch (err) {
        alert("Failed to fetch vault content");
      }
    };
    getContents();
  }, []);

  return (
    <main>
      {contents.map((item) => (
        <ContentCard key={item._id} item={item} />
      ))}
    </main>
  );
}
