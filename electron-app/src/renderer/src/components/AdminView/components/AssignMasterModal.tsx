import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

const AssignMasterModal = ({ visible, onHide, onAssign, masters }) => {
    const [selectedMaster, setSelectedMaster] = useState(null);

    const handleAssign = () => {
        if (selectedMaster) {
            onAssign(selectedMaster);
            onHide();
        }
    };

    return (
        <Dialog
            header="Назначить мастера"
            visible={visible}
            onHide={onHide}
            style={{ width: '400px' }}
            footer={
                <div>
                    <Button label="Отмена" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                    <Button label="Назначить" icon="pi pi-check" onClick={handleAssign} autoFocus />
                </div>
            }
        >
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="master">Мастер</label>
                    <Dropdown
                        id="master"
                        value={selectedMaster}
                        options={masters}
                        onChange={(e) => setSelectedMaster(e.value)}
                        optionLabel="name"
                        placeholder="Выберите мастера"
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default AssignMasterModal;