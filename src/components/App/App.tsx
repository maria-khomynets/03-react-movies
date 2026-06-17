import MovieModal from "../MovieModal/MovieModal";
import { useState } from "react";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && (
        <MovieModal movie={"<h2>Modal Title</h2>"} onClose={closeModal} />
      )}
    </>
  );
}
