import { string, func } from 'prop-types';

export default function Modal({ title, body, onClose, onProceed }) {
  return (
    <div className="modal-background">
      <div className="modal">
        <div className="modal-title">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          <button
            onClick={async () => {
              await onProceed();
              onClose();
            }}>
            Продовжити
          </button>
          <button onClick={onClose} id="cancelBtn">
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: string,
  body: string,
  onClose: func,
  onProceed: func,
};
