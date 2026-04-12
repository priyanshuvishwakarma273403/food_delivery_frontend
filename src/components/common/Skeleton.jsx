import { cn } from '../../utils/cn';

const Skeleton = ({ className }) => {
  return (
    <div className={cn(
      "animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl",
      className
    )} />
  );
};

export const RestaurantSkeleton = () => (
  <div className="bg-white dark:bg-card-main rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 p-4">
    <Skeleton className="h-48 w-full mb-6 rounded-2xl" />
    <div className="px-2 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <div className="pt-4 flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  </div>
);

export default Skeleton;
