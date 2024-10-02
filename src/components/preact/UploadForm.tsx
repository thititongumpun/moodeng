import { h } from "preact";
import { useState } from "preact/hooks";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/components/preact/PreactApp";
import { AddMeme } from "@/lib/queryFn";
import Error from "@/components/preact/Error";
import Toast from "@/components/preact/Toast";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  const {
    mutate,
    status,
    isError,
    error: mutationError,
    isSuccess,
  } = useMutation({
    mutationFn: AddMeme,
    onSuccess: () => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      const modal = document.getElementById(
        "upload-modal",
      ) as HTMLDialogElement;
      if (modal) {
        modal.close();
      }

      client.invalidateQueries({
        queryKey: ["memeImages"],
      });
    },
    onError: (error) => {
      setError(error.message);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
  });

  const handleFileChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const file = event.currentTarget.files?.[0];

    if (file) {
      const validFileTypes = ["image/*", "video/*"];
      if (!validFileTypes.some((type) => file.type.match(type))) {
        setError(
          "Invalid file type. Please select a images file or video file",
        );
        setSelectedFile(null);
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setError("File size exceeds 5MB. Please choose a smaller file.");
        setSelectedFile(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
      setNewFileName(file.name);
    }
  };

  const handleFileNameChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const input = event.currentTarget.value;

    const regex = /^[a-zA-Z0-9-_]+$/;

    if (!regex.test(input)) {
      setValidationError("Only letters and numbers are allowed.");
    } else {
      setValidationError(null);
    }

    setNewFileName(input);
  };

  const handleSubmit = (event: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a valid file before submitting.");
      return;
    }

    if (validationError) {
      return;
    }

    const renamedFile = new File([selectedFile], newFileName, {
      type: selectedFile.type,
    });

    mutate(renamedFile);
  };

  return (
    <section>
      <button
        className="btn btn-outline rounded-xl"
        onClick={() => {
          const modal = document.getElementById(
            "upload-modal",
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Upload
      </button>
      <dialog id="upload-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            <label className="form-control w-full max-w-xs">
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleFileChange}
              />
              {error && <Error error={error} />}
            </label>
            {selectedFile && (
              <label className="form-control w-full max-w-xs">
                <span>Name this meme</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="meme name"
                  value={newFileName}
                  onChange={handleFileNameChange}
                />
                {validationError && (
                  <span className="text-red-500">{validationError}</span>
                )}
              </label>
            )}
            <button
              type="submit"
              className="btn ml-auto"
              disabled={!!(status === "pending" || validationError)}
            >
              {status === "pending" ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {showToast && isSuccess && (
        <Toast message="File uploaded successfully!" type="success" />
      )}
      {showToast && isError && (
        <Toast message={mutationError?.message} type="error" />
      )}
    </section>
  );
}
