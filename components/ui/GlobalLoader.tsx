"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const GlobalLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Set loading to true when route changes
    setLoading(true);

    // Mimic loading duration
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // 500ms or however long you want the loader to display

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-slate-600 bg-opacity-75 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;
