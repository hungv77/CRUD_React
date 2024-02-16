import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { React, useState, useEffect} from "react";
import { putUpdateUser } from "../services/UserService"
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal} = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if(res && res.updatedAt){
      //success 
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
    }
    handleClose();
    toast.success("Update User Succeed");
  }

  useEffect(()=> { 
    if(show){
      setName(dataUserEdit.first_name)
    }
  }, [dataUserEdit])

  // console.log(">>>check props: ", dataUserEdit)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
            <div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Job</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={job}
                    onChange={(event) => setJob(event.target.value)}
                  />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
