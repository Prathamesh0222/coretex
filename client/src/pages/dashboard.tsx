import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { Navbar } from "../components/Navbar";

enum ContentType {
  All = "all",
  Youtube = "youtube",
  Twitter = "twitter",
  Notes = "notes",
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  // const content: {
  //   _id: string;
  //   type: ContentType;
  //   link: string;
  //   title: string;
  //   tags: Array<{ _id: string; title: string }>;
  // }[] = useContent();
  const { content, notes, setNotes, setContent } = useContent();
  const [filter, setFilter] = useState<string>(ContentType.All);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDelete = (id: string, type: ContentType) => {
    if (type === ContentType.Notes) {
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } else {
      setContent((prevContent) =>
        prevContent.filter((item) => item._id !== id)
      );
    }
  };

  const filteredContent =
    filter === ContentType.All
      ? content
      : content.filter(
          ({ type }: { type: string }) =>
            type.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="flex">
      <Sidebar onFilterChange={setFilter} />
      <div className="xl:ml-64 bg-dark-500 min-h-screen w-full">
        <Navbar />
        <div className="p-4">
          <CreateContentModal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            ref={modalRef}
          />
          <div className="fixed bottom-24 right-6 xl:bottom-6 xl:right-6 flex flex-col gap-4">
            <Button
              variant="primary"
              onClick={() => [setIsOpen(true)]}
              rounded={true}
              startIcon={<PlusIcon />}
            ></Button>
            <Button
              variant="secondary"
              rounded={true}
              startIcon={<ShareIcon />}
              fontColor="black"
            ></Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
            {filteredContent.length > 0 ? (
              filteredContent.map(({ link, type, title, _id, tags }) => (
                <Card
                  key={_id}
                  _id={_id}
                  title={title}
                  type={type as ContentType}
                  link={link}
                  tags={tags}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="w-full text-center text-gray-500">
                Press the + button to add content
              </div>
            )}
            {filter === ContentType.All &&
              notes.length > 0 &&
              notes.map(({ description, _id }) => (
                <Card
                  key={_id}
                  _id={_id}
                  type={ContentType.Notes}
                  notes={description}
                  tags={[]}
                  onDelete={handleDelete}
                />
              ))}
            {filter === ContentType.Notes && notes.length > 0
              ? notes.map(({ description, _id }) => (
                  <Card
                    key={_id}
                    _id={_id}
                    type={ContentType.Notes}
                    notes={description}
                    tags={[]}
                    onDelete={handleDelete}
                  />
                ))
              : filter === ContentType.Notes && (
                  <div className="w-full text-center text-gray-500">
                    No Notes Found
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
