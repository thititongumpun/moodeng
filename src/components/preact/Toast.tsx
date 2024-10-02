type ToastProps = {
  message: string;
  type: string;
};

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className="toast toast-end toast-top fixed right-4 top-4 z-50">
      <div
        className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
}
