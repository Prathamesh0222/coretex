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
  Youtube = "youtube",
  Twitter = "twitter",
}

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const content: { type: ContentType; link: string; title: string }[] =
    useContent();
  const [filter, setFilter] = useState<string>(ContentType.Twitter);

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

  const filteredContent =
    filter === "All"
      ? content
      : content.filter(
          ({ type }) => type.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="flex">
      <Sidebar onFilterChange={setFilter} />
      <div className="flex-1 md:ml-72  bg-dark-500 min-h-screen">
        <Navbar />
        <div className="p-4">
          <CreateContentModal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            ref={modalRef}
          />
          <div className="fixed bottom-6 right-6 flex flex-col gap-4">
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
            ></Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {filteredContent.map(({ link, type, title }) => (
              <Card key={title} title={title} type={type} link={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
