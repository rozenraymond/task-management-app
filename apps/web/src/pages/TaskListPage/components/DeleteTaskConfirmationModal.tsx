import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';

interface DeleteTaskConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskName?: string;
}

export const DeleteTaskConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskName,
}: DeleteTaskConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Delete Task
          </h2>
          <p className="text-sm text-muted-foreground">
            {`Are you sure you want to delete ${taskName ?? 'this task'}?`}
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
