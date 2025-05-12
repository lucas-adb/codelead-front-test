import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import trash from '@/assets/trash.svg';
import ButtonIcon from './ButtonIcon';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

function DeleteMessageDialog() {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    setIsDeleting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }

  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ButtonIcon src={trash.src} alt="trash-icon" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this message?
          </AlertDialogTitle>
          <AlertDialogDescription className='visually-hidden'>
            This action cannot be undone. This will permanently delete your message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-codeleap-red text-white hover:bg-codeleap-red/80"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting' : 'Delete'}
            {isDeleting && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteMessageDialog;
