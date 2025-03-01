import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = ({ scooter, index, updateScooter, closeModal }) => {
    const [distance, setDistance] = useState('');
    const [isBusy, setIsBusy] = useState(scooter.isBusy);

    const handleSubmit = e => {
        e.preventDefault();

        const isDistanceChanged = distance && parseFloat(distance) !== 0;
        const isBusyChanged = isBusy !== scooter.isBusy;

        if (!isDistanceChanged && !isBusyChanged) {
            closeModal();
            return;
        }

        if (distance && (isNaN(distance) || parseFloat(distance) < 0)) {
            toast.error('Rida negali būti neigiama!');
            return;
        }

        const updatedScooter = {
            ...scooter,
            isBusy: isBusy ? 1 : 0,
            lastUseTime: isDistanceChanged || isBusyChanged ? new Date().toISOString() : scooter.lastUseTime,
            totalRideKilometres: isDistanceChanged ? scooter.totalRideKilometres + parseFloat(distance) : scooter.totalRideKilometres,
        };

        updateScooter(index, updatedScooter);
        toast.success('Paspirtukas sėkmingai atnaujintas!');
        closeModal();
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Redaguoti paspirtuką</h2>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <p><strong>Registracijos kodas:</strong> {scooter.registrationCode}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pridėti ridą (km):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={distance}
                                    onChange={e => setDistance(e.target.value)}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Būsena:</label>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isBusy}
                                    onChange={e => setIsBusy(e.target.checked)}
                                /> Užimtas
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn green">Saugoti</button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Atšaukti</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;