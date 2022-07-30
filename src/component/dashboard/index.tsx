import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Scene from '../scene';
import { createLineChart } from '../scene/dataRender';

export interface ModalDataProps {
  header: JSX.Element | null,
  body: JSX.Element | null,
  footer: JSX.Element | null,
}

function Dashboard(): JSX.Element {
  const [modalData, setModalData] = useState<ModalDataProps | undefined>(undefined);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Scene setModalData={setModalData} />
      <Modal
        size="lg"
        show={modalData !== undefined}
        onShow={() => {
          createLineChart('.altitude-graph-container', '/sample-data/altitude.csv');
        }}
        onHide={() => { setModalData(undefined); }}
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
