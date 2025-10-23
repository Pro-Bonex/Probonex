import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";

// Sample Blank Props Interface
interface ContactInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string | null;
  phone?: string | null;
  lawyerName: string;
}

// Fixed UI Contact Info Modal - LINK WITH DATABASE TODO
export const ContactInfoModal = ({ open, onOpenChange, email, phone, lawyerName }: ContactInfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
          <DialogDescription>
            {lawyerName}'s contact details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{phone}</p>
              </div>
            </div>
          )}
          {!email && !phone && (
            <p className="text-muted-foreground text-center py-4">
              Contact information has not been shared yet
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
