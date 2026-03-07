import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Dashboard() {

  const navigate = useNavigate();

  const [jobTitle,setJobTitle] = useState("");
  const [description,setDescription] = useState("");
  const [files,setFiles] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleFileChange = (e) => {

    const selectedFiles = Array.from(e.target.files);

    if(selectedFiles.length > 5){
      alert("Maximum of 5 CVs allowed");
      return;
    }

    setFiles(selectedFiles);
  };

  const runScreening = async () => {

    if(!jobTitle || !description || files.length === 0){
      setError("Please fill all fields and upload CVs");
      return;
    }

    setLoading(true);
    setError("");

    try{

      const formData = new FormData();

      formData.append("jobTitle",jobTitle);
      formData.append("jobDescription",description);

      files.forEach(file=>{
        formData.append("files",file);
      });

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://hirenaija.runasp.net/api/bulkscreening/upload",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
          }
        }
      );

      console.log(res.data);
      localStorage.setItem("sessionId", res.data.sessionId);

      navigate("/results");

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

        <h1>AI Candidate Screening</h1>

        <input
          placeholder="Job Title"
          className="input"
          value={jobTitle}
          onChange={(e)=>setJobTitle(e.target.value)}
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

        {files.length > 0 && (
          <div className="file-list">
            {files.map((file,index)=>(
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