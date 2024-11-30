import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
      <div className="flex-1 md:ml-72 p-4 bg-gray-200 h-screen">
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
        <div className="flex gap-4 mt-4">
          <Card
            title="SAS"
            type="twitter"
            link="https://x.com/code_bykuti/status/1861428971013054891"
          />
          <Card
            title="Tbone is Live"
            type="youtube"
            link="https://www.youtube.com/watch?v=QzB-C5RHbKk"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
