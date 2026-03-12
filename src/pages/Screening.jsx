import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

const API_URL = import.meta.env.VITE_API_URL;

export default function Screening() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if(selectedFiles.length > 5){
      alert("Maximum of 5 CVs allowed");
      return;
    }
    setCvs(selectedFiles);
  };

  const runScreening = async () => {

    if(!title || !description || cvs.length === 0){
      setError("Please fill all fields and upload CVs");
      return;
    }

    setLoading(true);
    setError("");

    try{
      const formData = new FormData();

      // Send fields with correct keys expected by backend
      formData.append("title", title);
      formData.append("description", description);

      cvs.forEach(file=>{
        formData.append("cvs", file); // Backend expects 'cvs' as array
      });

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_URL}/bulkscreening/upload`,
        formData,
        {
          headers:{
            // Let Axios handle multipart/form-data boundaries
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Upload response:", res.data);

      // Save sessionId for Results page
      localStorage.setItem("sessionId", res.data.sessionId);

      navigate("/history");

    }catch(err){
      console.log(err);
      setError("Screening failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">

        <h1>Candidate Screening</h1>

        <input
          placeholder="Job Title"
          className="input"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          placeholder="Paste Job Description"
          rows="6"
          className="textarea"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <div className="upload">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <p>Upload up to 5 CVs</p>
        </div>

        {cvs.length > 0 && (
          <div className="file-list">
            {cvs.map((file,index)=>(
              <p key={index}>{file.name}</p>
            ))}
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <button
          className="run-btn"
          onClick={runScreening}
        >
          Run AI Screening
        </button>

        {loading && <Loader />}

      </div>
    </div>
  );
}