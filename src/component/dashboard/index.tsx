import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Scene from '../scene';

export interface ModalDataProps {
  header: JSX.Element | null,
  body: JSX.Element | null,
  footer: JSX.Element | null,
  onShow: any,
}

function Dashboard(): JSX.Element {
  const [modalData, setModalData] = useState<ModalDataProps | undefined>(undefined);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Scene setModalData={setModalData} />
      <Modal
        size="xl"
        show={modalData !== undefined}
        onShow={() => {
          if (modalData?.onShow) {
            modalData.onShow();
          }
        }}
        onHide={() => {
          setModalData(undefined);
        }}
      >
        {
          modalData && (
            <>
              {modalData.header && <Modal.Header closeButton>{modalData.header}</Modal.Header>}
              {modalData.body && (<Modal.Body>{modalData.body}</Modal.Body>)}
              {modalData.footer && (<Modal.Footer>{modalData.footer}</Modal.Footer>)}
            </>
          )
        }
      </Modal>
    </div>
  );
}

export default Dashboard;
