const ListScooter = ({ scooter, index, editScooter, deleteScooter }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <span>Kodas: {scooter.registrationCode}</span>
                <br />
                <span>Būsena: {scooter.isBusy ? 'Užimtas' : 'Laisvas'}</span>
                <br />
                <span>Paskutinis naudojimas: {new Date(scooter.lastUseTime).toLocaleString()}</span>
                <br />
                <span>Rida: {scooter.totalRideKilometres.toFixed(2)} km</span>
            </div>
            <div>
                <button className="btn blue me-2" onClick={_ => editScooter(index)}>Redaguoti</button>
                <button className="btn red" onClick={_ => deleteScooter(index)}>Trinti</button>
            </div>
        </li>
    );
};

export default ListScooter;