import clsx from 'clsx';

interface BadgeProps {
  status: 'Overdue' | 'Due soon' | 'Not Urgent';
}

export const StatusBadge = ({ status }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 rounded-full text-xs font-medium',
        status === 'Overdue' && 'bg-red-100 text-red-700',
        status === 'Due soon' && 'bg-yellow-100 text-yellow-700',
        status === 'Not Urgent' && 'bg-green-100 text-green-700',
      )}
    >
      {status}
    </span>
  );
};
