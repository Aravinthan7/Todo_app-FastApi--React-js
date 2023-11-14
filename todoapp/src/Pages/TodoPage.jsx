import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/Model";
import "../CSS/Todopage.css";
function TodoPage() {
 
  const [open, setOpen] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const refCurrentelement = useRef([]);
  const refnewtodo = useRef([]);
  const [refresh,setRefresh]=useState(false);

  useEffect(() => {
    gettodolistApi();
  }, []);

  const gettodolistApi = async () => {
    let response = fetch("http://127.0.0.1:8000/gettodolist");
    response.then((res) =>
      res.json().then((d) => {
        setTabledata(d.data)
    setRefresh(false)
    setRefresh(true)
      })
      
    );
  };
  const newtodoApi = () => {
    let lodate = new Date();
    let locreatedate =
      lodate.getDay() + "/" + lodate.getMonth() + "/" + lodate.getFullYear();
    let loobject = {
      id: 0,
      createdate: locreatedate,
      processtype: "Open",
      Detail: refnewtodo.current.value,
      updatedate: "",
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(loobject),
    };

    let fetchRes = fetch("http://127.0.0.1:8000/newtodo", options);
    fetchRes
      .then((res) => res.json())
      .then((d) => {
        alert(d.data)
        gettodolistApi()
    setRefresh(false)
    setRefresh(true)
      });
    refnewtodo.current.value = "";
    
  };
  const fnupdateprocess = () => {
    let options = { method: "PUT" };
    let lodate = new Date();
    let lotype = document.getElementById("prcs").value;
    let loobject = {
      updatedate:
        lodate.getDay() + "/" + lodate.getMonth() + "/" + lodate.getFullYear(),
      processtype: lotype,
      id: refCurrentelement.current.targetid,
    };
    let loupdateres = fetch(
      "http://127.0.0.1:8000/updatetodo?id=" +
        loobject.id +
        "&processtype=" +
        lotype +
        "&Detail=''&updatedate=" +
        loobject.updatedate,
      options
    );
    loupdateres.then((res) =>
      res.json().then((d) => {
        alert(d.data)
        gettodolistApi()
    setOpen(false)
    setRefresh(false)
    setRefresh(true)
      })
    );
    
  };
  const deleteTodoApi = (e) => {
    let options = { method: "DELETE" };
    let deletetodores = fetch(
      "http://127.0.0.1:8000/deletetodo?id=" + e.target.id,
      options
    );
    deletetodores.then((res) =>res.json().then((d) => {alert(d.data)
      gettodolistApi()
      setRefresh(false)
      setRefresh(true)
    }))
    
  };

  const handleOpen = (e) => {
    refCurrentelement.current = { targetid: e.target.id };
    setOpen(true);
  };

  const Todotable = () => {
    return (
      <div>
        <div className="container">
          <div
            className=""
            style={{ alignItems: "end", textAlign: "end", padding: "2px" }}
          >
            <input
              type="text"
              ref={refnewtodo}
              style={{ padding: "4px" }}
            ></input>
            <span>
              <i
                style={{ color: "white" }}
                className="bi bi-plus-circle-fill fs-4"
                onClick={() => newtodoApi()}
              ></i>
            </span>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Task Details</th>
                <th scope="col">Created Date</th>
                <th scope="col">Updated Date</th>
                <th scope="col">Process </th>
                <th scope="col">Actions </th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((i) => {
                return (
                  <tr>
                    <td>{i.Detail}</td>
                    <td>{i.createdate}</td>
                    <td>{i.updatedate}</td>
                    <td>{i.processtype}</td>
                    <td>
                      <i
                        className="bi bi-pencil-square"
                        style={{ color: "orange", padding: "5px" }}
                        id={i.id}
                        onClick={(e) => {
                          handleOpen(e);
                        }}
                      ></i>
                      <i
                        className="bi bi-trash-fill"
                        id={i.id}
                        style={{ color: "red", padding: "5px" }}
                        onClick={(e) => {
                          deleteTodoApi(e);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return (
    <div className="baseroot" style={{ height: "628px" }}>
      <div className="row">
        <div>
          <div
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "20px",
              paddingTop: "2px",
            }}
          >
            <i className="bi bi-check2-circle fs-4"></i> Todo List
          </div>
          <div className="row"></div>
        </div>
      </div>
      <Todotable />
      <Modal isOpen={open}>
        <label htmlFor="prcs">ProcessType:</label>
        <br></br>
        <br></br>
        <select name="prcs" id="prcs">
          <option value="Open">Open</option>
          <option value="Inprogress">Inprogress</option>
          <option value="Done">Done</option>
        </select>
        <hr></hr>
        <div>
          <footer>
            <button
              className="btn btn-primary"
              type="button"
              onClick={fnupdateprocess}
            >
              Submit
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </footer>
        </div>
      </Modal>
    </div>
  );
}

export default TodoPage;
