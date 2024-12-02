import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const content = useContent();

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-72 p-4 bg-gray-200 min-h-screen">
        <CreateContentModal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          ref={modalRef}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add Content"
            onClick={() => [setIsOpen(true)]}
            startIcon={<PlusIcon />}
          ></Button>
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {content.map(({ link, type, title }) => (
            <Card title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
