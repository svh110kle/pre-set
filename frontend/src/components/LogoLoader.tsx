import { motion, AnimatePresence } from 'framer-motion';
import './LogoLoader.css';

type LogoLoaderProps = {
  visible: boolean;
};

const LogoLoader = ({ visible }: LogoLoaderProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="loader-mark"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {'{{PROJECT_LOGO}}'}
          </motion.div>
          <motion.p
            className="loader-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Booting {'{{PROJECT_NAME}}'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoLoader;

