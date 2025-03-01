import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './crud.scss';
import './app.css';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';
import Delete from './Components/Delete';
import Statistics from './Components/Statistics';

const App = () => {
    const [scooters, setScooters] = useState([]);
    const [editData, setEditData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    useEffect(_ => {
        const storedScooters = JSON.parse(localStorage.getItem('scooters')) || [];
        setScooters(storedScooters);
    }, []);

    const saveScooters = newScooters => {
        localStorage.setItem('scooters', JSON.stringify(newScooters));
        setScooters(newScooters);
    };

    const addScooter = scooter => {
        const newScooters = [...scooters, scooter];
        saveScooters(newScooters);
    };

    const editScooter = index => {
        setEditData({ index, scooter: scooters[index] });
    };

    const updateScooter = (index, updatedScooter) => {
        const newScooters = [...scooters];
        newScooters[index] = updatedScooter;
        saveScooters(newScooters);
        setEditData(null);
    };

    const deleteScooter = index => {
        setDeleteData({ index, scooter: scooters[index] });
    };

    const confirmDelete = index => {
        const newScooters = scooters.filter((_, i) => i !== index);
        saveScooters(newScooters);
        setDeleteData(null);
        toast.success('Paspirtukas sėkmingai ištrintas!');
    };

    const sortScooters = key => {
        const sortedScooters = scooters.toSorted((a, b) => {
            if (key === 'totalRideKilometres') return b.totalRideKilometres - a.totalRideKilometres;
            if (key === 'lastUseTime') return new Date(b.lastUseTime) - new Date(a.lastUseTime);
            return 0;
        });
        setScooters(sortedScooters);
    };

    return (
        <>
            <ToastContainer />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Kolt paspirtukų administravimas</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="mb-4">
                            <Statistics scooters={scooters} />
                        </div>
                        <Create addScooter={addScooter} />
                    </div>
                    <div className="col-md-8">
                        <div className="d-flex gap-2 mb-3">
                            <button className="btn btn-secondary" onClick={_ => sortScooters('totalRideKilometres')}>
                                Rūšiuoti pagal ridą
                            </button>
                            <button className="btn btn-secondary" onClick={_ => sortScooters('lastUseTime')}>
                                Rūšiuoti pagal datą
                            </button>
                        </div>
                        <List
                            scooters={scooters}
                            editScooter={editScooter}
                            deleteScooter={deleteScooter}
                        />
                    </div>
                </div>
            </div>
            {editData !== null && (
                <Edit
                    scooter={editData.scooter}
                    index={editData.index}
                    updateScooter={updateScooter}
                    closeModal={_ => setEditData(null)}
                />
            )}
            {deleteData !== null && (
                <Delete
                    scooter={deleteData.scooter}
                    index={deleteData.index}
                    confirmDelete={confirmDelete}
                    closeModal={_ => setDeleteData(null)}
                />
            )}
        </>
    );
};

export default App;