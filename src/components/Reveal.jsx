import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </Tag>
  )
}

export { ease }
