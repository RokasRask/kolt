import ListScooter from './ListScooter';

const List = ({ scooters, editScooter, deleteScooter }) => {
    return (
        <div className="card p-3">
            <h2 className="card-title">Paspirtukų sąrašas</h2>
            <ul className="list-group">
                {scooters.map((scooter, index) => (
                    <ListScooter
                        key={scooter.id}
                        scooter={scooter}
                        index={index}
                        editScooter={editScooter}
                        deleteScooter={deleteScooter}
                    />
                ))}
            </ul>
        </div>
    );
};

export default List;