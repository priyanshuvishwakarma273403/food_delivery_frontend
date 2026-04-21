import { motion } from 'framer-motion';

const Skeleton = ({ className }) => (
  <motion.div
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className={`bg-gray-200 dark:bg-gray-800 rounded-xl ${className}`}
  />
);

export const RestaurantSkeleton = () => (
  <div className="bg-white dark:bg-card-main rounded-[2rem] p-4 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
    <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-10" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export default Skeleton;
