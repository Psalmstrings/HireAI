import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import CandidateCard from "../components/CandidateCard";

export default function Results(){

  const [candidates,setCandidates] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchResults = async () => {

      try{

        const sessionId = localStorage.getItem("sessionId");
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://hirenaija.runasp.net/api/bulkscreening/session/${sessionId}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );

        console.log(res.data);

        setCandidates(res.data);

      }catch(err){

        console.log(err);

      }

      setLoading(false);
    };

    fetchResults();

  },[]);

  const suitable = candidates.filter(c=>c.score>75);
  const partial = candidates.filter(c=>c.score>=40 && c.score<=74);
  const notSuitable = candidates.filter(c=>c.score<40);

  if(loading){
    return (
      <div className="layout">
        <Sidebar/>
        <div className="main">
          <h2>Loading AI Results...</h2>
        </div>
      </div>
    );
  }

  return(

    <div className="layout">

      <Sidebar/>

      <div className="results">

        <div className="column green">
          <h2>🟢 Suitable</h2>

          {suitable.map((c,i)=>(
            <CandidateCard
              key={i}
              name={c.name}
              role={c.role}
              score={c.score}
              keywords={c.keywords || []}
              reason={c.reason}
            />
          ))}

        </div>

        <div className="column yellow">
          <h2>🟡 Partially Suitable</h2>

          {partial.map((c,i)=>(
            <CandidateCard
              key={i}
              name={c.name}
              role={c.role}
              score={c.score}
              keywords={c.keywords || []}
              reason={c.reason}
            />
          ))}

        </div>

        <div className="column red">
          <h2>🔴 Not Suitable</h2>

          {notSuitable.map((c,i)=>(
            <CandidateCard
              key={i}
              name={c.name}
              role={c.role}
              score={c.score}
              keywords={c.keywords || []}
              reason={c.reason}
            />
          ))}

        </div>

      </div>

    </div>

  );
}