
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    onClose();
    navigate("/auth");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
            <DialogTitle className="text-2xl">BookLoop</DialogTitle>
          </div>
          <DialogDescription className="text-center">
            Join the BITS Pilani textbook marketplace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button 
            onClick={handleAuthClick}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Login / Sign Up
          </Button>
          <p className="text-xs text-center text-gray-500">
            Only BITS Pilani students (@bits-pilani.ac.in) can join
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
