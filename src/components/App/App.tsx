import MovieModal from "../MovieModal/MovieModal";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleOrder = (data: string) => {
    console.log("Order received from:", data);
    return (
      <>
        <SearchBar onSubmit={handleOrder} />
        <button onClick={openModal}>Open modal</button>
        {isModalOpen && (
          <MovieModal movie={"<h2>Modal Title</h2>"} onClose={closeModal} />
        )}
      </>
    );
  };
}
