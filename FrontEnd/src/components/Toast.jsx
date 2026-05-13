import { useToast } from '../context/ToastContext.jsx'

export default function Toast() {
  const { toast } = useToast()

  return (
    <div
      className={`toast ${toast.type} ${toast.visible ? 'show' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="status-dot"></span>
      <span>{toast.message}</span>
    </div>
  )
}
