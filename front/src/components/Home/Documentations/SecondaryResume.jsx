import { useState, useMemo } from "react";
import api from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineGeneratingTokens } from "react-icons/md";


// Optional (nice rendering). If you don't want markdown rendering, see the comment below.
// npm i react-markdown remark-gfm
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SecondaryResume = ({ secondaryResume,  setUpdateState, updateState, documentationId }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [addState, setAddState] = useState(false);
  const [updateFileState, setUpdateFileState] = useState(false);

  const [primaryResumeFile, setPrimaryResumeFile] = useState(null);

  const [suggestionsData, setSuggestionsData] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Build a safe href for the resume (prevents /api/undefined)
  const resumeHref = useMemo(() => {
    if (!secondaryResume) return null;

    // If already a full URL:
    if (typeof secondaryResume === "string" && secondaryResume.startsWith("http")) return secondaryResume;
    const cleaned = String(secondaryResume).replace(/^\/+/, "");
    return `/api/${cleaned}`;
  }, [secondaryResume]);

  const resetFileAndClose = () => {
    setPrimaryResumeFile(null);
    setAddState(false);
    setUpdateFileState(false);
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      if (!primaryResumeFile) {
        toast.error("Please choose a file first.");
        return;
      }

      const formData = new FormData();
      formData.append("secondary_resume", primaryResumeFile);

      await api.put("/documentation/change/secondary_resume", formData);
      toast.success("Secondary Resume added successfully");
      setUpdateState(!updateState);
      resetFileAndClose();
    } catch (err) {
      console.error("Error adding secondary resume:", err);
      toast.error("Failed to add Secondary Resume");
      setError(err?.response?.data?.detail || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      if (!primaryResumeFile) {
        toast.error("Please choose a file first.");
        return;
      }

      const formData = new FormData();

      // Same note as above about param name:
      formData.append("secondary_resume", primaryResumeFile);

      await api.put("/documentation/change/secondary_resume", formData);
      toast.success("Secondary Resume updated successfully");
      setUpdateState(!updateState);
      resetFileAndClose();
    } catch (err) {
      console.error("Error updating secondary resume:", err);
      toast.error("Failed to update Secondary Resume");
      setError(err?.response?.data?.detail || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setError(null);
      setLoading(true);

      await api.delete("/documentation/remove/secondary_resume");
      toast.success("Secondary Resume deleted successfully");
      setUpdateState(!updateState);
    } catch (err) {
      console.error("Error deleting secondary resume:", err);
      toast.error("Failed to delete Secondary Resume");
      setError(err?.response?.data?.detail || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  const download = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.get("/documentation/secondary-resume/download", {
        responseType: "blob",
      });

      // Try to get filename from headers (optional)
      const disposition = response.headers?.["content-disposition"];
      let filename = "secondary_resume.pdf";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "").trim();
      }

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;  
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Secondary Resume downloaded successfully");
    } catch (err) {
      console.error("Error downloading secondary resume:", err);
      toast.error("Failed to download Secondary Resume");
      setError(err?.response?.data?.detail || "Download failed.");
    } finally {
      setLoading(false);
    }
  };

  const view = async () => {
    try {
      setError(null);
      setLoading(true);

      // This should return the actual file bytes (blob) from backend
      const response = await api.get("/documentation/get/secondary_resume", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);
      window.open(url, "_blank", "noopener,noreferrer");
      // You can revoke later, but leaving it is fine for viewing.
      toast.success("Secondary Resume opened successfully");
    } catch (err) {
      console.error("Error opening secondary resume:", err);
      toast.error("Failed to open Secondary Resume");
      setError(err?.response?.data?.detail || "View failed.");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!documentationId) {
        toast.error("documentationId is missing.");
        return;
      }

      console.log("Fetching suggestions for doc ID:", documentationId);

      // FastAPI expects: { "id": <documentationId> }
      const response = await api.post("/bot/secondary_resume/suggestions", {
        id: documentationId,
      });

      // Handle multiple possible response formats
      const content =
        response?.data?.choices?.[0]?.message?.content ??
        response?.data?.content ??
        response?.data?.message ??
        (typeof response?.data === "string" ? response.data : null);

      if (!content) {
        console.log("Unexpected suggestions response:", response.data);
        toast.error("AI returned unexpected response format.");
        return;
      } 

      setSuggestionsData(content);
      setShowSuggestions(true);
      toast.success("Suggestions fetched successfully");
    } catch (err) {
      console.error("Error fetching suggestions for secondary resume:", err);
      toast.error("Failed to fetch suggestions for Secondary Resume");
      setError(err?.response?.data?.detail || "Suggestions failed.");
    } finally {
      setLoading(false);
    }
  };

  const copySuggestions = async () => {
    try {
      await navigator.clipboard.writeText(suggestionsData || "");
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="w-full h-full px-5 py-5 bg-gray-700 rounded-sm">
      <ToastContainer />

      {/* Header */}
      <div>
          {loading &&(
            <div className="flex  justify-center items-center mb-2">
            <MdOutlineGeneratingTokens className="animate-pulse text-3xl mr-3 text-amber-500" />
            <p className="text-purple-400 text-lg animate-pulse">Generating...</p>  
            </div>
          ) }
        <h1 className="text-white text-xl md:text-2xl font-bold text-center">
          {resumeHref ? (
            <a href={resumeHref} target="_blank" rel="noreferrer">
              Primary Resume
            </a>
          ) : (
            <span className="text-gray-300">Secondary Resume (not uploaded)</span>
          )}
        </h1>
      </div>

      {/* Controls */}
      <div className="mt-4 mx-auto">
        <div className="flex justify-center items-center">
          <ul className="flex flex-wrap gap-3 text-white font-semibold text-md md:text-lg justify-center">
            <li>
              <button
                disabled={loading}
                onClick={() => setAddState(true)}
                className="border-green-500 px-2 py-1 rounded-lg bg-green-500 hover:text-black hover:bg-green-900
                  hover:cursor-pointer duration-700 shadow-md shadow-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </li>

            <li>
              <button
                disabled={loading || !secondaryResume}
                onClick={() => setUpdateFileState(true)}
                className="border-amber-500 px-2 py-1 rounded-lg bg-amber-500 hover:text-black hover:bg-amber-900
                  hover:cursor-pointer duration-700 shadow-md shadow-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update
              </button>
            </li>

            <li>
              <button
                disabled={loading || !secondaryResume}
                onClick={remove}
                className="border-red-500 px-2 py-1 rounded-lg bg-red-500 hover:text-black hover:bg-red-900
                  hover:cursor-pointer duration-700 shadow-md shadow-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </li>

            <li>
              <button
                disabled={loading || !secondaryResume}
                onClick={download}
                className="border-blue-500 px-2 py-1 rounded-lg bg-blue-500 hover:text-black hover:bg-blue-900
                  hover:cursor-pointer duration-700 shadow-md shadow-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download
              </button>
            </li>

            <li>
              <button
                disabled={loading || !secondaryResume}
                onClick={view}
                className="border-purple-500 px-2 py-1 rounded-lg bg-purple-500 hover:text-black hover:bg-purple-900
                  hover:cursor-pointer duration-700 shadow-md shadow-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View
              </button>
            </li>

            <li>
              <button
                disabled={loading || !documentationId}
                onClick={suggestions}
                className="border-gray-500 px-2 py-1 rounded-lg bg-gray-500 hover:text-black hover:bg-gray-900
                  hover:cursor-pointer duration-700 shadow-md shadow-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Suggestions
              </button>
            </li>
          </ul>
        </div>

        {error && (
          <p className="text-red-200 text-sm mt-3 text-center">
            {typeof error === "string" ? error : "Something went wrong."}
          </p>
        )}
      </div>

      {/* Add Modal */}
      {addState && (
        <div className="inset-0 fixed flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-md p-5 w-11/12 md:w-2/5">
            <h2 className="text-2xl font-bold mb-4">Add Primary Resume</h2>

            <form onSubmit={add}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Resume File:</label>
                <input
                  accept=".pdf,.doc,.docx"
                  type="file"
                  onChange={(e) => setPrimaryResumeFile(e.target.files?.[0] ?? null)}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetFileAndClose}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700 duration-700 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 duration-700 disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateFileState && (
        <div className="inset-0 fixed flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-md p-5 w-11/12 md:w-2/5">
            <h2 className="text-2xl font-bold mb-4">Update Primary Resume</h2>

            <form onSubmit={update}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Resume File:</label>
                <input
                  accept=".pdf,.doc,.docx"
                  type="file"
                  onChange={(e) => setPrimaryResumeFile(e.target.files?.[0] ?? null)}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetFileAndClose}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700 duration-700 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 duration-700 disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Suggestions Modal */}
      {showSuggestions && (
        <div className="inset-0 fixed flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-md p-5 w-11/12 md:w-3/5 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Primary Resume Suggestions</h2>

              <div className="flex gap-2">
                <button
                  onClick={copySuggestions}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="prose max-w-none text-gray-800" >
              <ReactMarkdown remarkPlugins={[remarkGfm]} >{suggestionsData}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondaryResume;
