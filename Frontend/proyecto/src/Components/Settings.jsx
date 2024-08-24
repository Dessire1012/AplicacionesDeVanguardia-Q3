import "./Styles/Settings.css";
import { FaUser, FaPen } from "react-icons/fa";

const Settings = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="settings-container">
          <div className="settings-left">
            <div className="user-icon">
              <FaUser />
              <button className="edit-icon">
                <FaPen />
              </button>
            </div>
            <button className="edit-face-id">Edit Face ID</button>
            <button className="delete-user">Delete User</button>
          </div>
          <div className="settings-right">
            <form>
              <label>
                Name:
                <input type="text" name="name" placeholder="Value" />
              </label>
              <label>
                Email:
                <input type="email" name="email" placeholder="Value" />
              </label>
              <label>
                Password:
                <input type="text" name="surname" placeholder="Value" />
              </label>
              <div className="right-buttons">
                <button type="button" className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
