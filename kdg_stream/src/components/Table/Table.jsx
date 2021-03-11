import React from 'react';
import '../../assets/css/table.css';

const Table = ({ dataHead, dataBody }) => {
    const renderTable = () => {
        if (dataHead && typeof dataHead === 'object') {
            return (
                <table className='table'>
                    <thead>
                        <tr>
                            {Object.keys(dataHead).map(key => (
                                <td key={key}>{dataHead[key]}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataBody.map((obj, i) => (
                            <tr key={i}>
                                {Object.keys(obj).map(key => (
                                    <td key={key}>
                                        {typeof obj[key] !== 'function' ? obj[key] : obj[key]()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        return <div>Not Valid Data Table</div>;
    };

    return renderTable();
};

export default Table;
