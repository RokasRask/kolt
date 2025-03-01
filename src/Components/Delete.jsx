const Delete = ({ scooter, index, confirmDelete, closeModal }) => {
    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Ar tikrai norite ištrinti šį paspirtuką?</h2>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Registracijos kodas:</strong> {scooter.registrationCode}</p>
                        <p><strong>Būsena:</strong> {scooter.isBusy ? 'Užimtas' : 'Laisvas'}</p>
                        <p><strong>Paskutinis naudojimas:</strong> {new Date(scooter.lastUseTime).toLocaleString()}</p>
                        <p><strong>Rida:</strong> {scooter.totalRideKilometres.toFixed(2)} km</p>
                        <div className="d-flex gap-2">
                            <button className="btn red" onClick={_ => confirmDelete(index)}>Taip</button>
                            <button className="btn btn-secondary" onClick={closeModal}>Ne</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Delete;